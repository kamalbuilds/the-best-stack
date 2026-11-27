# Local dev

[Back to the stack](../README.md)

## Containers: use Kiri

[Kiri](https://github.com/libracoder/kiri) is an Apache-2.0 Docker Desktop replacement written in Rust for macOS, Windows and Linux. It speaks the Docker Engine API, so the `docker` CLI, Compose and buildx keep working, and it adds local HTTPS domains (`<name>.kiri.local`), a one-command k3s cluster, Linux machines and `kiri share` tunnels. The VM sleeps after 60 seconds idle.

```bash
brew install --cask libracoder/kiri/kiri      # macOS; .msi, .deb and .rpm at runkiri.com/releases
docker --context kiri run --rm alpine echo hello
docker context use kiri                      # make it the default
kiri import                                  # bring images and volumes over from Docker Desktop or OrbStack
```

Install command from the [project README](https://github.com/libracoder/kiri#step-1-install-and-start-kiri). It reached [10,000 stars in two weeks](https://x.com/libracoder/status/2122867887472017775), and 0.3.0 is next, with 53 stability fixes and a new builder ([announcement](https://x.com/libracoder/status/2125208458681065678)).

### Read the benchmarks with care

Kiri's README reports a 2.55 ms container start through the Docker API on Apple silicon against 213 ms for Docker Desktop. The [HN discussion](https://news.ycombinator.com/item?id=50504077) raised fair points: the test runs a cached `alpine` image, so it measures warm starts, and published-port throughput is lower than Docker Engine because Kiri relays it in user space. The project publishes its suite as [kiri-bench](https://github.com/libracoder/kiri-bench), so you can run it against your own engines.

## Alternatives

| Tool | Pick it when |
|---|---|
| [OrbStack](https://orbstack.dev) | You want a mature, polished macOS app and your company pays for it |
| [Colima](https://github.com/abiosoft/colima) | Free, MIT, minimal, macOS and Linux |
| [Podman](https://github.com/containers/podman) | Daemonless and rootless, Red Hat lineage |
| Docker Desktop | Your company standardizes on it and needs its enterprise controls |

## The rest of the local loop

- **JavaScript runtime and package manager:** [Bun](https://github.com/oven-sh/bun), or Node with pnpm.
- **Python:** [uv](https://github.com/astral-sh/uv) for interpreters, environments and lockfiles.
- **Lint and format:** [Biome](https://github.com/biomejs/biome).
- **Tests:** [Vitest](https://github.com/vitest-dev/vitest) and Playwright.
- **Local Postgres for tests:** [PGlite](https://github.com/electric-sql/pglite) in process, or a Kiri container.
- **Local models:** [Ollama](https://github.com/ollama/ollama) or [llama.cpp](https://github.com/ggml-org/llama.cpp); [MLX LM](https://github.com/ml-explore/mlx-lm) on Apple silicon.
