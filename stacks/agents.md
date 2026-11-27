# Agents

[Back to the stack](../README.md)

## Pick the smallest loop that works

| You need | Use | Notes |
|---|---|---|
| A model that calls a few tools inside one request | AI SDK `ToolLoopAgent` or a Pydantic AI agent | No framework. Most production agents are this plus a schedule |
| The same loop, but it must survive restarts, retries and waits for a human | AI SDK `WorkflowAgent` on [Workflow SDK](https://github.com/vercel/workflow), or Pydantic AI with [DBOS](https://github.com/dbos-inc/dbos-transact-py) or Temporal | AI SDK 7 ships tool approvals and timeouts in the same API ([release post](https://vercel.com/blog/ai-sdk-7)) |
| Explicit state, branches, checkpoints and time travel | [LangGraph](https://github.com/langchain-ai/langgraph) | The graph is the product; pay for it only when you have one |
| A batteries-included TypeScript framework (agents, workflows, memory, evals, vector adapters) | [Mastra](https://github.com/mastra-ai/mastra) | Mastra's own [factory](https://news.ycombinator.com/item?id=50548660) runs on it |
| Claude Code's file and shell loop embedded in your product | [Claude Agent SDK](https://github.com/anthropics/claude-agent-sdk-python) | Governed by Anthropic's commercial terms rather than a plain OSS license, and Claude-only |
| Google Cloud or Gemini-native deploys | [Google ADK](https://github.com/google/adk-python) | Python, TypeScript, Go and Java SDKs |
| OpenAI-native handoffs and guardrails | [OpenAI Agents SDK](https://github.com/openai/openai-agents-python) | Used by 24% of respondents for orchestration in the [Stack Overflow 2026 survey](https://survey.stackoverflow.co/2026/ai), behind LangChain at 30% |
| Agents on Cloudflare with Durable Objects state | [Cloudflare Agents](https://github.com/cloudflare/agents) | |
| Optimized prompts as compiled programs | [DSPy](https://github.com/stanfordnlp/dspy) | |

## The five things that kill an always-on agent

From the [top r/AI_Agents post of the month](https://reddit.com/r/AI_Agents/comments/1xxhtk5/anthropic_just_mapped_out_the_5_primitives_of/) and the threads around it:

1. **Credentials expire overnight.** Refresh tokens inside a durable step, not at process start.
2. **A step runs twice.** Make side effects idempotent: write the result, keyed by step id, before acting on it.
3. **The agent waits for a human and the process dies.** Waiting belongs in the workflow engine, not in memory.
4. **Context grows until quality falls off.** Summarize into a Postgres row and start fresh contexts per task.
5. **Nobody notices it failed.** Trace every run (Langfuse or Logfire) and alert on the run, not just the HTTP status.

## Tools: MCP, done the 2026 way

- Use MCP for tools you do not own. Write plain functions for tools you do.
- Large APIs go behind **Code Mode**: the agent writes code against a typed API instead of loading one tool per endpoint. Cloudflare reports [2,500 endpoints in about 1,000 tokens](https://x.com/suraj_sharma14/status/2124752307631865914).
- **Skills over MCP** (beta) lets servers ship playbooks that load only when needed ([announcement](https://x.com/ClaudeDevs/status/2125289797199511594)).
- The **Events extension** (beta) adds webhooks, streams and polling ([working group post](https://x.com/Poita_/status/2123812640254251472)).
- Agent-facing UI: [AG-UI](https://github.com/ag-ui-protocol/ag-ui). Agent-to-agent across organizations: [A2A](https://github.com/a2aproject/A2A).

## Sandboxes

Run anything the model writes in [E2B](https://github.com/e2b-dev/E2B), Vercel Sandbox or a Cloudflare container. For the web, [agent-browser](https://github.com/vercel-labs/agent-browser) gives a CLI an agent can drive, and [Browser Use](https://github.com/browser-use/browser-use) or [Stagehand](https://github.com/browserbase/stagehand) handle open-ended tasks.
