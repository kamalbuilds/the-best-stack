# Contributing

This list stays useful by being opinionated and sourced. A good PR changes one pick and links the evidence.

## Change a pick

1. Edit the row in `README.md` (and the deep dive in `stacks/` if it has one).
2. Link evidence: a migration write-up, a production post-mortem, a benchmark with its method, a high-signal thread. "It's popular" is not evidence. "We moved off X because Y" is.
3. Say what the old pick is still right for.

## Add a tool to the live table

Add an entry to `data/tools.json`:

```json
{ "layer": "Retrieval", "name": "Qdrant", "repo": "qdrant/qdrant", "package": "pypi:qdrant-client" }
```

`package` is `npm:<name>` or `pypi:<name>`; leave it out and the table shows the latest GitHub release. Then run:

```bash
GITHUB_TOKEN=$(gh auth token) node scripts/refresh.mjs
```

The script exits non-zero if a repo is missing, archived, or a package does not resolve. CI runs the same script on every PR.

## Add a model

Add `{ "tier": "...", "id": "<openrouter id>" }` to `data/models.json`. Ids come from `https://openrouter.ai/api/v1/models`.

## Style

Plain sentences. No hype words. Numbers only with a link to where they came from.
