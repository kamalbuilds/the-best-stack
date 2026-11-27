# Best Stack

**The AI app stack builders are shipping with in November 2026.** Opinionated defaults for every layer, each pick linked to the thread, post or registry read behind it, and a live table of 95 tools whose versions, stars and model prices regenerate from public APIs.

[![refresh](https://github.com/kamalbuilds/best-stack/actions/workflows/refresh.yml/badge.svg)](https://github.com/kamalbuilds/best-stack/actions/workflows/refresh.yml)
[![stars](https://img.shields.io/github/stars/kamalbuilds/best-stack?style=social)](https://github.com/kamalbuilds/best-stack/stargazers)

Sources for this edition: 210 X posts from October 15 to November 27 read with a signed-in client, top-of-month threads from ten subreddits, Hacker News front-page stories since September 15, the [Stack Overflow 2026 AI survey](https://survey.stackoverflow.co/2026/ai), and the GitHub, npm, PyPI and OpenRouter APIs.

**Jump to:** [Start here](#start-here) · [The default stack](#the-default-stack) · [What changed this month](#what-changed-in-november-2026) · [Opinions](#opinions-this-list-holds) · [Trust watch](#trust-watch) · [Model prices](#model-prices) · [All 95 tools](#every-tool-live) · [Deep dives](#deep-dives)

## Start here

Pick the row that matches what you are building. Each one is a complete stack, not a menu.

| You are building | Use this | Why this shape |
|---|---|---|
| **A weekend MVP** | Next.js 16, AI SDK 7, shadcn/ui, Supabase, Vercel | One language, one database with auth and pgvector built in, and the stack coding agents write best |
| **An AI SaaS with agents (TypeScript)** | The MVP stack plus AI SDK `ToolLoopAgent`, Workflow SDK for anything that outlives a request, Langfuse | Durable steps and tool approvals ship in AI SDK 7, so you add a workflow, not a framework |
| **An AI backend in Python** | FastAPI, Pydantic AI, Postgres with pgvector, DBOS or Temporal, Logfire | Typed agents and validated outputs, with durability as a library instead of a cluster |
| **An agent that runs unattended** | A durable workflow, an E2B sandbox, MCP tools with approvals, promptfoo evals in CI | The failure is never the model. It is the expired token at 3am and the step that ran twice |
| **Search or chat over your documents** | Docling to parse, Postgres hybrid search (pgvector plus full text), a reranker, then turbopuffer or Qdrant when Postgres strains | Hybrid retrieval with reranking is the 2026 default; vector-only search is the thing people are migrating off |
| **Private or local** | llama.cpp or Ollama, open weights (Kimi K3.1, Qwen, GLM, Gemma 4), vLLM or SGLang to serve, Kiri for containers | Open weights are now close enough that teams cut coding spend by self-hosting |

## The default stack

The first column is what to reach for when you have no strong reason otherwise. The second is the signal that you have outgrown it.

| Layer | Default | Switch when | Why |
|---|---|---|---|
| **Frontend** | [Next.js 16](https://github.com/vercel/next.js) + Tailwind 4 + [shadcn/ui](https://github.com/shadcn-ui/ui) | You want a client-first app without server components: [TanStack Start](https://github.com/TanStack/router). Content site: [Astro](https://github.com/withastro/astro) | shadcn already demos [WebMCP through AI SDK](https://x.com/shadcn/status/2125396779591925850), where the model calls the page's own tools |
| **Chat and agent UI** | AI SDK UI hooks | You need a full chat surface fast: [assistant-ui](https://github.com/assistant-ui/assistant-ui). Agent state in the UI: [CopilotKit](https://github.com/CopilotKit/CopilotKit) on [AG-UI](https://github.com/ag-ui-protocol/ag-ui) | Keeps streaming, tool calls and approvals in one library |
| **AI layer** | [AI SDK 7](https://vercel.com/blog/ai-sdk-7) | Your backend is Python: [Pydantic AI](https://github.com/pydantic/pydantic-ai) | AI SDK 7 added tool approvals, `WorkflowAgent` durability, MCP Apps, sandbox support and adapters for Claude Code, Codex, OpenCode and Pi as harnesses |
| **Agent loop** | A plain tool loop (`ToolLoopAgent` or a Pydantic AI agent) | Branching state, checkpoints and human review: [LangGraph](https://github.com/langchain-ai/langgraph). A full TS framework with memory and evals: [Mastra](https://github.com/mastra-ai/mastra). Claude Code's own loop inside your product: [Claude Agent SDK](https://github.com/anthropics/claude-agent-sdk-python) | r/AI_Agents' top thread on production agents: [most are cron jobs with a chatbot attached](https://reddit.com/r/AI_Agents/comments/1y3j3wz/uncomfortable_truth_most_ai_agents_ive_seen_in/). Start there and earn the graph |
| **Durable execution** | [Workflow SDK](https://github.com/vercel/workflow) (TS) or [DBOS](https://github.com/dbos-inc/dbos-transact-py) (Python) | Many services, long histories, strict replay: [Temporal](https://github.com/temporalio/temporal). Managed queues and crons: [Trigger.dev](https://github.com/triggerdotdev/trigger.dev) or [Inngest](https://github.com/inngest/inngest) | The usual way a 24/7 agent dies is [an auth token that quietly expires overnight](https://reddit.com/r/AI_Agents/comments/1xxhtk5/anthropic_just_mapped_out_the_5_primitives_of/) |
| **Tools** | [MCP](https://github.com/modelcontextprotocol/typescript-sdk) with Code Mode and Skills | Agent to agent across companies: [A2A](https://github.com/a2aproject/A2A) | MCP [turned two this week](https://x.com/ClaudeDevs/status/2125289794871963935) with Skills over MCP in beta, and Pi, which once refused MCP, [put it in core](https://earendil.com/posts/you-said-no-mcp/) |
| **Sandboxes and browsers** | [E2B](https://github.com/e2b-dev/E2B) for code, [agent-browser](https://github.com/vercel-labs/agent-browser) for the web | Open-ended browsing tasks: [Browser Use](https://github.com/browser-use/browser-use) or [Stagehand](https://github.com/browserbase/stagehand). Debugging your own frontend: [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp) | Never run model-written code on the host |
| **Database and auth** | [Supabase](https://github.com/supabase/supabase) | You want parts, not a platform: Neon + [Drizzle](https://github.com/drizzle-team/drizzle-orm) + [Better Auth](https://github.com/better-auth/better-auth). Reactive TypeScript end to end: [Convex](https://github.com/get-convex/convex-backend) | Postgres underneath either way, so pgvector, SQL and transactions come along |
| **Retrieval** | Postgres hybrid search: [pgvector](https://github.com/pgvector/pgvector) plus full text, fused, then reranked | Filtered recall collapses or the index outgrows RAM: [turbopuffer](https://turbopuffer.com/blog/rip-vector-database) or [Qdrant](https://github.com/qdrant/qdrant). Embedded or on device: [LanceDB](https://github.com/lancedb/lancedb) | pgvector applies filters after the approximate scan: a filter matching 10% of rows returns about 4 results at default settings ([pgvector docs](https://github.com/pgvector/pgvector#filtering)). Watch [pg_vectorsearch](https://github.com/timescale/pg_vectorsearch), still alpha |
| **Documents in** | [Docling](https://github.com/docling-project/docling) for files, [Firecrawl](https://github.com/firecrawl/firecrawl) for the web | | Parsing quality caps answer quality |
| **Memory** | Postgres rows: a profile, a running summary, the last few turns | Cross-session facts at scale: [Mem0](https://github.com/mem0ai/mem0). Temporal knowledge graphs: [Graphiti](https://github.com/getzep/graphiti) | One r/AI_Agents builder [replaced vector RAG with Markdown and a knowledge graph](https://reddit.com/r/AI_Agents/comments/1xpjfau/i_replaced_vectorsearch_rag_with_markdown/) |
| **Models** | A frontier model to plan, a cheap fast model for the bulk | See [Model prices](#model-prices) | Google passed [50% of OpenRouter spend](https://x.com/OpenRouter/status/2124925631012209137) in the week before November 23, on the back of Gemini 4 Neon and Carbon |
| **Gateway** | OpenRouter or Vercel AI Gateway | Self-hosted keys, budgets and logs: [LiteLLM](https://github.com/BerriAI/litellm) or [Portkey](https://github.com/Portkey-AI/gateway) | One API, one bill, failover between providers |
| **Local inference** | [llama.cpp](https://github.com/ggml-org/llama.cpp) (now [v1.0](https://reddit.com/r/LocalLLaMA/comments/1xv8t2e/llamacpp_v10_is_here/)) or [Ollama](https://github.com/ollama/ollama) | Serving many users: [vLLM](https://github.com/vllm-project/vllm) or [SGLang](https://github.com/sgl-project/sglang). Apple silicon: [MLX LM](https://github.com/ml-explore/mlx-lm). Fine-tuning: [Unsloth](https://github.com/unslothai/unsloth) | Revolut [cut AI coding costs 10x by going self-hosted](https://reddit.com/r/LocalLLaMA/comments/1xn568h/british_fintech_revolut_slashes_ai_coding_costs/) |
| **Observability** | [Langfuse](https://github.com/langfuse/langfuse) for traces, [Sentry](https://github.com/getsentry/sentry) for errors | Python-first and OpenTelemetry-native: [Logfire](https://github.com/pydantic/logfire). Alternatives: [Opik](https://github.com/comet-ml/opik), [Phoenix](https://github.com/Arize-ai/phoenix) | Open source and self-hostable |
| **Evals** | [promptfoo](https://github.com/promptfoo/promptfoo) in CI | | An eval that runs on every PR beats a dashboard nobody opens |
| **Coding agent** | [Claude Code](https://github.com/anthropics/claude-code) | Any model, your own keys: [OpenCode](https://github.com/anomalyco/opencode) or [Pi](https://github.com/earendil-works/pi). Bundled with ChatGPT: [Codex](https://github.com/openai/codex) | Claude Code leads coding agents at 66% of respondents in the [Stack Overflow 2026 survey](https://survey.stackoverflow.co/2026/ai), GitHub Copilot is next at 59% |
| **Local containers** | [Kiri](https://github.com/libracoder/kiri) | You need a mature, paid, supported tool on a work Mac: [OrbStack](https://orbstack.dev). Free and boring: [Colima](https://github.com/abiosoft/colima) or [Podman](https://github.com/containers/podman) | Same `docker` CLI and Compose, sleeps when idle. Details and the open questions in [local dev](stacks/local-dev.md) |
| **Hosting** | Vercel (Python [went GA](https://x.com/1st1/status/2110793128903164229) in October) | Edge-first with Durable Objects: [Cloudflare Agents](https://github.com/cloudflare/agents). Your own boxes: [Coolify](https://github.com/coollabsio/coolify) | |
| **Tooling** | [Bun](https://github.com/oven-sh/bun) or pnpm, [uv](https://github.com/astral-sh/uv) for Python, [Biome](https://github.com/biomejs/biome), [Vitest](https://github.com/vitest-dev/vitest) | | Fast feedback is what lets an agent check its own work |

## What changed in November 2026

- **MCP grew up.** Anthropic marked [MCP's second birthday](https://x.com/ClaudeDevs/status/2125289794871963935) with Skills over MCP in beta, the [Events extension](https://x.com/Poita_/status/2123812640254251472) reached beta, and Cloudflare showed [2,500 API endpoints exposed in about 1,000 tokens](https://x.com/suraj_sharma14/status/2124752307631865914) with Code Mode. The backlash post ["MCP was always a bad idea?"](https://news.ycombinator.com/item?id=49779329) drew 335 points; ["You said no MCP"](https://news.ycombinator.com/item?id=49906637) drew 687.
- **Open weights closed the gap.** [Kimi K3.1 Pro](https://news.ycombinator.com/item?id=50212065) launched to 1,096 points and its [weights followed](https://news.ycombinator.com/item?id=50366999). Qwen [committed to open weights](https://reddit.com/r/LocalLLaMA/comments/1xm28e6/official_statement_qwen_models_will_stick_to_open/), and llama.cpp shipped v1.0.
- **Vector databases became search engines.** turbopuffer's ["RIP, vector database"](https://news.ycombinator.com/item?id=49923466) (405 points) moves ANN to a secondary index under v3. Timescale's [pg_vectorsearch](https://news.ycombinator.com/item?id=50086165) (213 points) claims to beat pgvector's HNSW and IVFFlat inside Postgres.
- **Software factories went public.** [Mastra Factory](https://news.ycombinator.com/item?id=50548660) open-sourced the agent kanban that maintains Mastra itself; one week of it merged [238 agent PRs](https://x.com/nyxienyxie/status/2123460854519664985).
- **Verification beat prompting.** The most-liked coding post of the month, at 14,978 likes, was the Claude Code team on [why agents write better code when they can check their own work](https://x.com/ClaudeDevs/status/2122457608963395586). The counterweight: [Harvard researchers](https://news.ycombinator.com/item?id=50538303) found the bottleneck moved to code review (472 comments).
- **Docker Desktop got a Rust rival.** Kiri reached [10,000 stars in two weeks](https://x.com/libracoder/status/2122867887472017775), hit the [HN front page](https://news.ycombinator.com/item?id=50504077), and announced 0.3.0 with 53 stability fixes and a new builder, [Kiri Forge](https://x.com/libracoder/status/2125208458681065678).
- **Agent skills joined the most-starred repos on GitHub.** [mattpocock/skills](https://github.com/mattpocock/skills) and [obra/superpowers](https://github.com/obra/superpowers) both passed 325,000 stars; Google's [modern-web-guidance](https://github.com/GoogleChrome/modern-web-guidance) teaches agents to stop writing 2019 JavaScript.

## Opinions this list holds

**Build the cron job first.** An agent that runs a scheduled job, calls one model with three tools and writes a row is most of what ships. Add a graph when a real branch needs one.

**Durability comes before multi-agent.** A second agent doubles your failure surface; a durable step makes every failure resumable. Spend on the second.

**Hybrid retrieval plus a reranker is the floor.** Vectors plus a metadata filter is not hybrid search. Keyword (BM25) and dense results fused with reciprocal rank fusion, then reranked, is what teams in production describe ([Pinecone's relevance guide](https://docs.pinecone.io/guides/optimize/increase-relevance), [r/Rag after a year in production](https://reddit.com/r/Rag/comments/1xqvb1r/what_ive_learned_about_rag_and_agentic_rag_after/)).

**Give the agent a way to be wrong.** Tests, type checks and an end-to-end run the agent can execute itself are worth more than a longer prompt. Then review the diff like it came from a stranger, because the review is now the slow part.

**Postgres until it hurts.** Auth, rows, vectors, queues and memory all fit in one Postgres for longer than you think.

## Trust watch

Tools with shell access read your repo, your keys and your history. Threads from this month worth knowing about before you install:

- [ZCode, the GLM coding agent, silently uploads your Git history](https://news.ycombinator.com/item?id=49752422) (262 points).
- [Windows 11 records which coding agents and developer tools you use](https://news.ycombinator.com/item?id=50524736) (738 points, 626 comments).
- [T3 Code GDPR concerns](https://reddit.com/r/vibecoding/comments/1y57vta/is_this_the_downfall_of_t3code/) over hashed account data uploads (954 upvotes, 266 comments).

Read what a CLI sends before you give it a token, and pin agent tools to versions you have read.

## Model prices

Generated by `scripts/refresh.mjs`. Edit `data/models.json` to change the list.

<!-- models:start -->
Prices in USD per million tokens, read from the [OpenRouter models API](https://openrouter.ai/api/v1/models) on 2026-11-27.

| Tier | Model | OpenRouter id | Input | Output | Context |
|---|---|---|--:|--:|--:|
| Frontier | Anthropic: Claude Fable 5.2 | `anthropic/claude-fable-5.2` | $8.00 | $40.00 | 1,000k |
| Frontier | Anthropic: Claude Opus 5.5 | `anthropic/claude-opus-5.5` | $4.00 | $20.00 | 1,000k |
| Frontier | OpenAI: GPT-6.2 Astra | `openai/gpt-6.2-astra` | $8.00 | $40.00 | 1,050k |
| Frontier | Google: Gemini 4 Neon | `google/gemini-4-neon` | $3.00 | $15.00 | 1,049k |
| Workhorse | Anthropic: Claude Sonnet 5.5 | `anthropic/claude-sonnet-5.5` | $2.00 | $10.00 | 1,000k |
| Workhorse | OpenAI: GPT-6.2 Sol | `openai/gpt-6.2-sol` | $2.00 | $10.00 | 1,050k |
| Workhorse | Google: Gemini 4 Carbon | `google/gemini-4-carbon` | $2.00 | $10.00 | 1,049k |
| Workhorse | Google: Gemini 4 Hydrogen | `google/gemini-4-hydrogen` | $1.50 | $7.50 | 1,049k |
| Workhorse | SpaceXSI: Grok 4.7 | `x-ai/grok-4.7` | $2.00 | $6.00 | 500k |
| Workhorse | Qwen: Qwen4 Max | `qwen/qwen4-max` | $1.42 | $4.27 | 1,000k |
| Fast and cheap | Anthropic: Claude Haiku 5.5 | `anthropic/claude-haiku-5.5` | $0.10 | $0.50 | 1,000k |
| Fast and cheap | OpenAI: GPT-6 Luna | `openai/gpt-6-luna` | $0.10 | $0.50 | 1,050k |
| Fast and cheap | Google: Gemini 3.8 Flash | `google/gemini-3.8-flash` | $0.83 | $4.13 | 1,049k |
| Fast and cheap | DeepSeek: DeepSeek V4.1 Flash | `deepseek/deepseek-v4.1-flash` | $0.05 | $0.20 | 1,049k |
| Open-weight labs | MoonshotAI: Kimi K3.1 Pro | `moonshotai/kimi-k3.1-pro` | $0.24 | $8.40 | 1,049k |
| Open-weight labs | Z.ai: GLM 5.3 | `z-ai/glm-5.3` | $0.07 | $1.40 | 1,049k |
| Open-weight labs | DeepSeek: DeepSeek V4 Pro 0423 | `deepseek/deepseek-v4-pro` | $0.86 | $1.52 | 1,049k |
| Open-weight labs | Google: Gemma 4 31B | `google/gemma-4-31b-it` | $0.20 | $0.40 | 262k |
<!-- models:end -->

## Every tool, live

Generated by `scripts/refresh.mjs` from `data/tools.json`. The refresh fails, and the monthly PR does not open, if any repo is missing or archived, which is how dead picks get caught.

<!-- stats:start -->
Read from the GitHub, npm and PyPI APIs on 2026-11-27 by `scripts/refresh.mjs`.

| Layer | Tool | Latest release | Stars | Last commit |
|---|---|---|--:|---|
| Frontend | [Next.js](https://github.com/vercel/next.js) | `16.4.6` | 143,754 | 2026-11-27 |
| Frontend | [TanStack Start](https://github.com/TanStack/router) | `1.169.7` | 15,380 | 2026-11-27 |
| Frontend | [Astro](https://github.com/withastro/astro) | `7.4.13` | 64,257 | 2026-11-27 |
| Frontend | [SvelteKit](https://github.com/sveltejs/kit) | `3.4.1` | 20,929 | 2026-11-27 |
| UI | [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) | `4.3.5` | 98,873 | 2026-11-27 |
| UI | [shadcn/ui](https://github.com/shadcn-ui/ui) | `4.23.1` | 129,240 | 2026-11-27 |
| UI | [assistant-ui](https://github.com/assistant-ui/assistant-ui) | `0.15.38` | 13,452 | 2026-11-27 |
| UI | [CopilotKit](https://github.com/CopilotKit/CopilotKit) | `1.90.2` | 39,012 | 2026-11-27 |
| AI SDK | [AI SDK](https://github.com/vercel/ai) | `7.0.183` | 28,250 | 2026-11-26 |
| AI SDK | [TanStack AI](https://github.com/TanStack/ai) | `1.8.0` | 3,392 | 2026-11-27 |
| AI SDK | [Pydantic AI](https://github.com/pydantic/pydantic-ai) | `2.76.0` | 21,427 | 2026-11-27 |
| Agents | [LangGraph](https://github.com/langchain-ai/langgraph) | `1.2.24` | 45,507 | 2026-11-26 |
| Agents | [LangGraph.js](https://github.com/langchain-ai/langgraphjs) | `1.7.5` | 3,430 | 2026-11-26 |
| Agents | [Deep Agents](https://github.com/langchain-ai/deepagents) | `0.7.42` | 31,643 | 2026-11-27 |
| Agents | [Mastra](https://github.com/mastra-ai/mastra) | `1.86.0` | 29,855 | 2026-11-27 |
| Agents | [OpenAI Agents SDK](https://github.com/openai/openai-agents-python) | `0.26.0` | 30,896 | 2026-11-27 |
| Agents | [Claude Agent SDK](https://github.com/anthropics/claude-agent-sdk-python) | `0.2.189` | 8,655 | 2026-11-25 |
| Agents | [Google ADK](https://github.com/google/adk-python) | `2.15.1` | 22,368 | 2026-11-26 |
| Agents | [Cloudflare Agents](https://github.com/cloudflare/agents) | `0.34.1` | 6,158 | 2026-11-27 |
| Agents | [Agno](https://github.com/agno-agi/agno) | `3.2.1` | 43,324 | 2026-11-27 |
| Agents | [smolagents](https://github.com/huggingface/smolagents) | `1.26.0` | 30,568 | 2026-11-26 |
| Agents | [CrewAI](https://github.com/crewAIInc/crewAI) | `1.15.45` | 61,324 | 2026-11-26 |
| Agents | [DSPy](https://github.com/stanfordnlp/dspy) | `3.5.0` | 39,260 | 2026-11-25 |
| Protocols | [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) | `1.32.2` | 13,831 | 2026-11-27 |
| Protocols | [AG-UI](https://github.com/ag-ui-protocol/ag-ui) | `1.0.5` | 21,908 | 2026-11-27 |
| Protocols | [A2A](https://github.com/a2aproject/A2A) | `1.3.1` | 26,711 | 2026-11-27 |
| Protocols | [Agent Skills](https://github.com/anthropics/skills) | rolling | 201,306 | 2026-11-16 |
| Durable execution | [Workflow SDK](https://github.com/vercel/workflow) | `5.8.0` | 2,537 | 2026-11-27 |
| Durable execution | [Trigger.dev](https://github.com/triggerdotdev/trigger.dev) | `4.8.10` | 16,834 | 2026-11-27 |
| Durable execution | [Inngest](https://github.com/inngest/inngest) | `4.27.0` | 6,081 | 2026-11-27 |
| Durable execution | [Temporal](https://github.com/temporalio/temporal) | `1.27.0` | 24,632 | 2026-11-27 |
| Durable execution | [Restate](https://github.com/restatedev/restate) | `1.18.4` | 4,752 | 2026-11-27 |
| Durable execution | [DBOS](https://github.com/dbos-inc/dbos-transact-py) | `3.7.0` | 1,706 | 2026-11-26 |
| Sandboxes | [E2B](https://github.com/e2b-dev/E2B) | `2.66.0` | 15,035 | 2026-11-27 |
| Browser agents | [Browser Use](https://github.com/browser-use/browser-use) | `1.0.9` | 122,204 | 2026-11-27 |
| Browser agents | [Stagehand](https://github.com/browserbase/stagehand) | `4.5.0` | 26,167 | 2026-11-26 |
| Browser agents | [agent-browser](https://github.com/vercel-labs/agent-browser) | `0.45.0` | 54,262 | 2026-11-27 |
| Browser agents | [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp) | `1.14.0` | 59,574 | 2026-11-27 |
| Web data | [Firecrawl](https://github.com/firecrawl/firecrawl) | `4.54.0` | 211,360 | 2026-11-27 |
| Web data | [Docling](https://github.com/docling-project/docling) | `2.154.0` | 71,136 | 2026-11-27 |
| Memory | [Mem0](https://github.com/mem0ai/mem0) | `2.2.1` | 69,540 | 2026-11-27 |
| Memory | [Graphiti](https://github.com/getzep/graphiti) | `0.32.1` | 33,140 | 2026-11-26 |
| Memory | [Letta](https://github.com/letta-ai/letta) | `0.34.12` | 25,567 | 2026-10-18 |
| Memory | [cognee](https://github.com/topoteretes/cognee) | `1.6.11` | 33,669 | 2026-11-27 |
| Backend | [Hono](https://github.com/honojs/hono) | `4.13.23` | 33,117 | 2026-11-26 |
| Backend | [FastAPI](https://github.com/fastapi/fastapi) | `0.165.0` | 105,099 | 2026-11-24 |
| Data | [Supabase](https://github.com/supabase/supabase) | `2.119.2` | 115,610 | 2026-11-27 |
| Data | [Convex](https://github.com/convex/convex-backend) | `1.51.0` | 12,816 | 2026-11-27 |
| Data | [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm) | `0.45.4` | 36,422 | 2026-11-25 |
| Data | [Prisma](https://github.com/prisma/orm) | `8.0.0-rc.36` | 47,775 | 2026-11-27 |
| Data | [PGlite](https://github.com/electric-sql/pglite) | `0.6.0` | 16,383 | 2026-11-27 |
| Auth | [Better Auth](https://github.com/better-auth/better-auth) | `1.7.28` | 30,907 | 2026-11-26 |
| Retrieval | [pgvector](https://github.com/pgvector/pgvector) | rolling | 23,842 | 2026-11-27 |
| Retrieval | [pg_vectorsearch](https://github.com/timescale/pg_vectorsearch) | `v0.2.0` | 456 | 2026-11-26 |
| Retrieval | [Qdrant](https://github.com/qdrant/qdrant) | `1.20.0` | 35,741 | 2026-11-27 |
| Retrieval | [LanceDB](https://github.com/lancedb/lancedb) | `0.41.0` | 11,996 | 2026-11-27 |
| Retrieval | [Weaviate](https://github.com/weaviate/weaviate) | `4.25.0` | 16,970 | 2026-11-27 |
| Retrieval | [Milvus](https://github.com/milvus-io/milvus) | `3.0.3` | 46,751 | 2026-11-27 |
| Retrieval | [Chroma](https://github.com/chroma-core/chroma) | `1.5.9` | 29,797 | 2026-11-27 |
| Retrieval | [LlamaIndex](https://github.com/run-llama/llama_index) | `0.14.26` | 53,024 | 2026-11-26 |
| Gateways | [LiteLLM](https://github.com/BerriAI/litellm) | `1.111.0` | 64,017 | 2026-11-27 |
| Gateways | [Portkey Gateway](https://github.com/Portkey-AI/gateway) | `1.15.2` | 13,458 | 2026-11-20 |
| Local inference | [llama.cpp](https://github.com/ggml-org/llama.cpp) | `v1.1.0` | 136,494 | 2026-11-27 |
| Local inference | [Ollama](https://github.com/ollama/ollama) | `v0.40.18` | 188,296 | 2026-11-27 |
| Local inference | [vLLM](https://github.com/vllm-project/vllm) | `0.34.0` | 97,697 | 2026-11-27 |
| Local inference | [SGLang](https://github.com/sgl-project/sglang) | `0.5.23` | 39,129 | 2026-11-27 |
| Local inference | [MLX LM](https://github.com/ml-explore/mlx-lm) | `0.32.2` | 7,775 | 2026-11-24 |
| Local inference | [Unsloth](https://github.com/unslothai/unsloth) | `2026.11.12` | 80,347 | 2026-11-27 |
| Observability | [Langfuse](https://github.com/langfuse/langfuse) | `3.39.2` | 37,919 | 2026-11-27 |
| Observability | [Opik](https://github.com/comet-ml/opik) | `2.3.7` | 23,522 | 2026-11-27 |
| Observability | [Arize Phoenix](https://github.com/Arize-ai/phoenix) | `22.1.0` | 12,454 | 2026-11-27 |
| Observability | [Pydantic Logfire](https://github.com/pydantic/logfire) | `6.0.1` | 4,570 | 2026-11-27 |
| Observability | [Sentry](https://github.com/getsentry/sentry) | `11.19.0` | 45,890 | 2026-11-27 |
| Evals | [promptfoo](https://github.com/promptfoo/promptfoo) | `0.126.0` | 27,741 | 2026-11-27 |
| Coding agents | [Claude Code](https://github.com/anthropics/claude-code) | `2.1.332` | 157,282 | 2026-11-27 |
| Coding agents | [Codex CLI](https://github.com/openai/codex) | `0.172.0` | 136,650 | 2026-11-27 |
| Coding agents | [OpenCode](https://github.com/anomalyco/opencode) | `1.19.6` | 229,558 | 2026-11-27 |
| Coding agents | [Pi](https://github.com/earendil-works/pi) | `v1.6.1` | 124,233 | 2026-11-27 |
| Coding agents | [Gemini CLI](https://github.com/google-gemini/gemini-cli) | `0.71.1` | 109,229 | 2026-11-27 |
| Coding agents | [Qwen Code](https://github.com/QwenLM/qwen-code) | `0.28.7` | 30,979 | 2026-11-27 |
| Coding agents | [Cline](https://github.com/cline/cline) | `v4.1.28` | 71,947 | 2026-11-26 |
| Coding agents | [Kilo Code](https://github.com/Kilo-Org/kilocode) | `v7.8.40` | 28,143 | 2026-11-27 |
| Coding agents | [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) | rolling | 287,935 | 2026-11-22 |
| Agent skills | [Superpowers](https://github.com/obra/superpowers) | `v7.0.2` | 327,985 | 2026-11-26 |
| Agent skills | [mattpocock/skills](https://github.com/mattpocock/skills) | `v1.3.2` | 334,025 | 2026-11-25 |
| Agent skills | [Modern Web Guidance](https://github.com/GoogleChrome/modern-web-guidance) | `v1.0.2` | 26,937 | 2026-11-23 |
| Local runtime | [Kiri](https://github.com/libracoder/kiri) | `v0.2.2` | 13,967 | 2026-11-27 |
| Local runtime | [OrbStack](https://github.com/orbstack/orbstack) | rolling | 9,625 | 2025-08-15 |
| Local runtime | [Colima](https://github.com/abiosoft/colima) | `v0.10.3` | 31,858 | 2026-10-13 |
| Local runtime | [Podman](https://github.com/podman-container-tools/podman) | `v6.2.1` | 33,407 | 2026-11-27 |
| Hosting | [Coolify](https://github.com/coollabsio/coolify) | `v4.7.9` | 66,653 | 2026-11-26 |
| Tooling | [Bun](https://github.com/oven-sh/bun) | `1.4.5` | 97,018 | 2026-11-27 |
| Tooling | [uv](https://github.com/astral-sh/uv) | `0.13.10` | 92,754 | 2026-11-26 |
| Tooling | [Biome](https://github.com/biomejs/biome) | `2.6.9` | 26,231 | 2026-11-27 |
| Tooling | [Vitest](https://github.com/vitest-dev/vitest) | `5.1.2` | 17,493 | 2026-11-27 |
<!-- stats:end -->

## Deep dives

- [Agents](stacks/agents.md): which loop, which framework, and how to keep an agent alive overnight
- [Retrieval](stacks/retrieval.md): hybrid search, rerankers, and when to leave Postgres
- [Coding agents](stacks/coding-agents.md): harnesses, skills, and the verification loop
- [Local dev](stacks/local-dev.md): Kiri, OrbStack, Colima and Podman

## How this stays current

A [GitHub Action](.github/workflows/refresh.yml) runs `node scripts/refresh.mjs` on the first of every month and opens a pull request with new versions, stars and prices. Picks and opinions change by hand, with the evidence linked in the PR. See [CHANGELOG.md](CHANGELOG.md).

## Contributing

Suggest a pick by opening a PR that changes one row and links the evidence: a thread, a benchmark, a migration post, a production write-up. "It's popular" is not evidence; "we moved off X because Y" is. Details in [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
