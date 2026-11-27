import { detect, recommend } from "./engine.js";

const REPO = "kamalbuilds/the-best-stack";
const SITE = location.origin + location.pathname;
const $ = (id) => document.getElementById(id);
const EXAMPLES = [
  "a chatbot that answers questions from our company's PDFs",
  "an agent that reads my inbox every morning and drafts replies",
  "an iOS app where kids talk to a voice tutor",
  "a private journaling coach that runs offline",
  "a python tool that tracks competitor prices daily",
  "a SaaS that turns spreadsheets into charts",
];

const [stack, stats] = await Promise.all([
  fetch("data/stack.json").then((r) => r.json()),
  fetch("data/stats.json").then((r) => (r.ok ? r.json() : {})).catch(() => ({})),
]);

let active = new Set();
let idea = "";

const el = (tag, attrs = {}, ...kids) => {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) k === "class" ? (n.className = v) : n.setAttribute(k, v);
  n.append(...kids);
  return n;
};

const issueUrl = (l) => {
  const title = `Better pick for ${l.layer}`;
  const body = `Idea: ${idea}\nCurrent pick: ${l.name}\n\nWhat I'd use instead, and why (links to evidence help):\n`;
  return `https://github.com/${REPO}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
};

function render() {
  const { layers, starters } = recommend(active, stack);
  $("signals").replaceChildren(...Object.entries(stack.signals).map(([id, s]) => {
    const on = active.has(id);
    const b = el("button", { type: "button", class: on ? "chip on" : "chip", "aria-pressed": String(on) }, s.label);
    b.onclick = () => { on ? active.delete(id) : active.add(id); render(); };
    return b;
  }));
  $("layers").replaceChildren(...layers.map((l) => {
    const s = l.repo && stats[l.repo];
    return el("li", {},
      el("span", { class: "layer" }, l.layer),
      el("div", { class: "pick" },
        el("div", { class: "line" },
          el("a", { href: l.link, target: "_blank", rel: "noopener" }, l.name),
          s ? el("span", { class: "meta" }, (s.v ? s.v + " · " : "") + "★ " + s.stars.toLocaleString("en-US")) : ""),
        el("p", {}, l.why),
        el("a", { class: "better", href: issueUrl(l), target: "_blank", rel: "noopener" }, "better pick?")));
  }));
  $("cardIdea").textContent = idea || "your idea";
  $("cardGrid").replaceChildren(...layers.flatMap((l) => [el("dt", {}, l.layer), el("dd", {}, l.short || l.name)]));
  $("cmds").textContent = starters.join("\n");
  $("result").hidden = false;
  const url = new URL(SITE);
  if (idea) url.searchParams.set("idea", idea);
  history.replaceState(null, "", url);
}

function run(text) {
  idea = text.trim();
  active = detect(idea, stack.signals);
  render();
  $("result").scrollIntoView({ behavior: "smooth", block: "start" });
}

const markdown = () => {
  const { layers, starters } = recommend(active, stack);
  return [`Stack for: ${idea}`, "", ...layers.map((l) => `- **${l.layer}**: [${l.name}](${l.link}). ${l.why}`), "", "```sh", ...starters, "```", "", `via ${location.href}`].join("\n");
};

const flash = (btn, text) => { const t = btn.textContent; btn.textContent = text; setTimeout(() => (btn.textContent = t), 1400); };

$("form").onsubmit = (e) => { e.preventDefault(); if ($("idea").value.trim()) run($("idea").value); };
$("idea").onkeydown = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); $("form").requestSubmit(); } };
$("examples").replaceChildren(...EXAMPLES.map((x) => {
  const b = el("button", { type: "button", class: "example" }, x);
  b.onclick = () => { $("idea").value = x; run(x); };
  return b;
}));
$("copyCmds").onclick = async (e) => { await navigator.clipboard.writeText($("cmds").textContent); flash(e.target, "copied"); };
$("copyLink").onclick = async (e) => { await navigator.clipboard.writeText(location.href); flash(e.target, "Copied"); };
$("copyMd").onclick = async (e) => { await navigator.clipboard.writeText(markdown()); flash(e.target, "Copied"); };
$("shareX").onclick = () => {
  const picks = recommend(active, stack).layers.slice(0, 4).map((l) => l.name).join(", ");
  const text = `asked best-stack what to build "${idea.slice(0, 90)}" with\n\nit said: ${picks}\n\n`;
  window.open(`https://x.com/intent/post?text=${encodeURIComponent(text)}&url=${encodeURIComponent(location.href)}`, "_blank", "noopener");
};

fetch(`https://api.github.com/repos/${REPO}`).then((r) => r.json()).then((j) => { if (j.stargazers_count != null) $("stars").textContent = j.stargazers_count; }).catch(() => {});

const params = new URLSearchParams(location.search);
if (params.has("card")) document.body.classList.add("cardonly");
const q = params.get("idea");
if (q) { $("idea").value = q; run(q); }
