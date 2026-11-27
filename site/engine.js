// Turns a plain-English idea into a stack, using the rules in data/stack.json.
// Runs in the browser and in Node (site/engine.test.mjs).

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function detect(text, signals) {
  const t = " " + text.toLowerCase() + " ";
  const found = new Set();
  for (const [id, s] of Object.entries(signals)) {
    if (s.words.some((w) => new RegExp("(^|[^a-z])" + escape(w.toLowerCase())).test(t))) found.add(id);
  }
  return found;
}

export function matches(cond, active) {
  if (!cond) return true;
  if (cond.any && !cond.any.some((s) => active.has(s))) return false;
  if (cond.all && !cond.all.every((s) => active.has(s))) return false;
  if (cond.none && cond.none.some((s) => active.has(s))) return false;
  return true;
}

export function recommend(active, stack) {
  const layers = [];
  for (const layer of stack.layers) {
    if (!matches(layer.include, active)) continue;
    const pick = layer.picks.find((p) => matches(p.when, active));
    if (pick) layers.push({ id: layer.id, layer: layer.name, ...pick });
  }
  const starters = stack.starters.filter((s) => matches(s.when, active)).map((s) => s.cmd);
  return { layers, starters };
}
