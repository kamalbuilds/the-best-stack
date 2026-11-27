import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";
import { detect, recommend } from "./engine.js";

const stack = JSON.parse(await readFile(new URL("../data/stack.json", import.meta.url), "utf8"));
const run = (idea) => {
  const active = detect(idea, stack.signals);
  const { layers, starters } = recommend(active, stack);
  return { active, pick: Object.fromEntries(layers.map((l) => [l.id, l.name])), starters };
};

const pdf = run("A chatbot that answers questions from our company's PDF handbook");
assert.ok(pdf.active.has("docs") && pdf.active.has("chat"));
assert.equal(pdf.pick.ingest, "Docling");
assert.match(pdf.pick.retrieval, /hybrid/);
assert.equal(pdf.pick.sandbox, undefined);

const offline = run("a private journaling coach that runs offline on my laptop");
assert.ok(offline.active.has("local") && offline.active.has("memory"));
assert.match(offline.pick.inference, /llama\.cpp/);
assert.equal(offline.pick.gateway, undefined);
assert.match(offline.pick.models, /Open weights/);

const py = run("Python agent that checks competitor prices every morning and alerts me");
assert.equal(py.pick.ai, "Pydantic AI");
assert.equal(py.pick.durable, "DBOS");
assert.equal(py.pick.web, "Firecrawl");
assert.ok(py.starters.some((s) => s.startsWith("uv init")));

const mobile = run("an iOS app where kids talk to a voice tutor");
assert.match(mobile.pick.frontend, /Expo/);
assert.equal(mobile.pick.voice, "LiveKit Agents");
assert.ok(mobile.starters.includes("npx create-expo-app@latest my-app"));

const landing = run("a landing page for my bakery");
assert.equal(landing.pick.retrieval, undefined);
assert.equal(landing.pick.agent, undefined);
assert.match(landing.pick.frontend, /Next\.js/);

assert.ok(run("multi agents that work locally").active.has("agent"));
assert.ok(run("runs locally").active.has("local"));

console.log("engine: 6 ideas, all picks as expected");
