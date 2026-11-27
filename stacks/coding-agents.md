# Coding agents

[Back to the stack](../README.md)

## Who uses what

From the [Stack Overflow 2026 AI survey](https://survey.stackoverflow.co/2026/ai): Claude Code is used by 66% of respondents using coding agents and GitHub Copilot by 59%. The [Ask HN on agentic setups](https://news.ycombinator.com/item?id=50366117) (718 comments) is the best single read on how people actually combine them.

| Agent | Pick it when |
|---|---|
| [Claude Code](https://github.com/anthropics/claude-code) | You want the strongest default and Claude models |
| [Codex](https://github.com/openai/codex) | You already pay for ChatGPT and want parallel cloud tasks |
| [OpenCode](https://github.com/anomalyco/opencode) | Any provider, your own keys, MIT licensed |
| [Pi](https://github.com/earendil-works/pi) | A minimal harness you can rewrite, now with MCP in core |
| [Gemini CLI](https://github.com/google-gemini/gemini-cli) / [Qwen Code](https://github.com/QwenLM/qwen-code) | You live on Gemini or Qwen models |
| [Cline](https://github.com/cline/cline) / [Kilo Code](https://github.com/Kilo-Org/kilocode) | You want the agent inside VS Code with approval before every edit |

## Make the agent check its own work

The most-liked coding post of November ([14,978 likes](https://x.com/ClaudeDevs/status/2122457608963395586)) makes one point: agents write better code when tests, benchmarks and end-to-end runs are cheap for them to execute. In practice:

- Keep the fast test command in `AGENTS.md` (the [shared format](https://github.com/agentsmd/agents.md)) so every harness finds it.
- Give the agent a browser it can drive ([Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp), [agent-browser](https://github.com/vercel-labs/agent-browser)) so frontend work gets checked too.
- Load skills for the stack you use: [Superpowers](https://github.com/obra/superpowers), [mattpocock/skills](https://github.com/mattpocock/skills), and Google's [modern-web-guidance](https://github.com/GoogleChrome/modern-web-guidance) to keep agents off outdated web patterns.

## Then review like it came from a stranger

Agents [produce more code but not more software](https://news.ycombinator.com/item?id=50059523), and [review is the new bottleneck](https://news.ycombinator.com/item?id=50538303). Small PRs, a second model as reviewer, and tests written before the change keep the bottleneck moving.

## Before you install one

Check what it sends home. This month's threads: [ZCode uploading Git history](https://news.ycombinator.com/item?id=49752422), [Windows 11 logging which agents you run](https://news.ycombinator.com/item?id=50524736), and [T3 Code's GDPR questions](https://reddit.com/r/vibecoding/comments/1y57vta/is_this_the_downfall_of_t3code/).
