#!/usr/bin/env node
// Rewrites the generated tables in README.md: tool stats from GitHub, npm and PyPI,
// model prices from OpenRouter. Fails on a missing repo, an archived repo or a delisted model.
// Usage: node scripts/refresh.mjs [--check]
// --check exits 1 when README.md is out of date instead of writing it.
import { readFile, writeFile } from "node:fs/promises";

const root = new URL("..", import.meta.url);
const tools = JSON.parse(await readFile(new URL("data/tools.json", root), "utf8"));
const models = JSON.parse(await readFile(new URL("data/models.json", root), "utf8"));
const readmeUrl = new URL("README.md", root);

const gh = { "user-agent": "best-stack-refresh", accept: "application/vnd.github+json" };
if (process.env.GITHUB_TOKEN) gh.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

// Retries network errors and 5xx/429 up to 3 times; a 404 or 403 fails at once.
async function getJson(url, headers = {}) {
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(url, { headers });
      if (res.ok) return res.json();
      if (attempt >= 3 || (res.status < 500 && res.status !== 429)) throw new Error(`${res.status} ${url}`);
    } catch (e) {
      if (attempt >= 3 || /^\d{3} /.test(e.message)) throw e;
    }
    await new Promise((r) => setTimeout(r, 1000 * attempt));
  }
}

async function version(pkg) {
  const [registry, name] = pkg.split(/:(.+)/);
  if (registry === "npm") return (await getJson(`https://registry.npmjs.org/${name}/latest`)).version;
  if (registry === "pypi") return (await getJson(`https://pypi.org/pypi/${name}/json`)).info.version;
  throw new Error(`unknown registry in ${pkg}`);
}

// Repos without a registry package show their latest GitHub release, or nothing.
async function releaseTag(repo) {
  const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, { headers: gh });
  if (res.status === 404) return "";
  if (!res.ok) throw new Error(`${res.status} releases of ${repo}`);
  return (await res.json()).tag_name;
}

const failures = [];
const rows = await Promise.all(tools.map(async (t) => {
  try {
    const [repo, v] = await Promise.all([getJson(`https://api.github.com/repos/${t.repo}`, gh), t.package ? version(t.package) : releaseTag(t.repo)]);
    if (repo.archived) failures.push(`${t.name}: ${repo.full_name} is archived`);
    return { ...t, key: t.repo, repo: repo.full_name, stars: repo.stargazers_count, pushed: repo.pushed_at.slice(0, 10), v };
  } catch (e) {
    failures.push(`${t.name}: ${e.message}`);
  }
}));

const catalog = new Map((await getJson("https://openrouter.ai/api/v1/models")).data.map((m) => [m.id, m]));
const perM = (p) => "$" + (Number(p) * 1e6).toFixed(2);
const modelRows = [];
for (const m of models) {
  const hit = catalog.get(m.id);
  if (!hit) failures.push(`model ${m.id} is no longer listed on OpenRouter`);
  else modelRows.push(`| ${m.tier} | ${hit.name} | \`${m.id}\` | ${perM(hit.pricing.prompt)} | ${perM(hit.pricing.completion)} | ${Math.round(hit.context_length / 1000).toLocaleString("en-US")}k |`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

const code = (s) => "`" + s + "`";
const date = new Date().toISOString().slice(0, 10);
const table = [
  `Read from the GitHub, npm and PyPI APIs on ${date} by \`scripts/refresh.mjs\`.`,
  "",
  "| Layer | Tool | Latest release | Stars | Last commit |",
  "|---|---|---|--:|---|",
  ...rows.map((r) => `| ${r.layer} | [${r.name}](https://github.com/${r.repo}) | ${r.v ? code(r.v) : "rolling"} | ${r.stars.toLocaleString("en-US")} | ${r.pushed} |`),
].join("\n");

const readme = await readFile(readmeUrl, "utf8");
function splice(text, name, body) {
  const start = `<!-- ${name}:start -->`;
  const end = `<!-- ${name}:end -->`;
  const a = text.indexOf(start);
  const b = text.indexOf(end);
  if (a < 0 || b < a) {
    console.error(`README.md is missing the ${name} markers`);
    process.exit(1);
  }
  return text.slice(0, a + start.length) + "\n" + body + "\n" + text.slice(b);
}
const modelTable = [
  `Prices in USD per million tokens, read from the [OpenRouter models API](https://openrouter.ai/api/v1/models) on ${date}.`,
  "",
  "| Tier | Model | OpenRouter id | Input | Output | Context |",
  "|---|---|---|--:|--:|--:|",
  ...modelRows,
].join("\n");
const next = splice(splice(readme, "stats", table), "models", modelTable);

if (process.argv.includes("--check")) {
  // Compare which tools and models are listed, not the live numbers, which move by the minute.
  const block = (s, name) => s.slice(s.indexOf(`<!-- ${name}:start -->`), s.indexOf(`<!-- ${name}:end -->`));
  const shape = (s) => ["stats", "models"].map((n) => block(s, n).split("\n").filter((l) => l.startsWith("| ")).map((l) => l.split("|").slice(1, 4).join("|")).join("\n")).join("\n--\n");
  const outside = (s) => s.replace(/<!-- (stats|models):start -->[\s\S]*?<!-- \1:end -->/g, "");
  if (shape(next) !== shape(readme) || outside(next) !== outside(readme)) {
    console.error("README.md tool or model tables are out of date. Run: node scripts/refresh.mjs");
    process.exit(1);
  }
  console.log(`stats current for ${rows.length} tools`);
} else {
  await writeFile(readmeUrl, next);
  const stats = Object.fromEntries(rows.map((r) => [r.key, { v: r.v || "", stars: r.stars }]));
  await writeFile(new URL("data/stats.json", root), JSON.stringify(stats, null, 1) + "\n");
  console.log(`wrote stats for ${rows.length} tools`);
}
