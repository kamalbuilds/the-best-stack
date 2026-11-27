# Retrieval

[Back to the stack](../README.md)

## The default pipeline

1. **Parse** with [Docling](https://github.com/docling-project/docling) (PDF, DOCX, slides, tables) or [Firecrawl](https://github.com/firecrawl/firecrawl) (web). Bad parsing cannot be fixed downstream.
2. **Chunk by structure** (headings, sections, table rows), not by fixed character counts.
3. **Store in Postgres**: a `vector` column with an HNSW index ([pgvector](https://github.com/pgvector/pgvector)) and a `tsvector` column for full text, side by side in the same table.
4. **Query both**, fuse the ranked lists with reciprocal rank fusion, then rerank the fused list with a cross-encoder or a hosted rerank endpoint.
5. **Cite**: return chunk ids with the answer and only show a source when the answer's text overlaps it.

## Known pgvector limits

- Filters run after the approximate scan. With HNSW at the default `ef_search` of 40, a filter that matches 10% of rows returns about 4 results. Turn on iterative index scans (0.8.0+) ([docs](https://github.com/pgvector/pgvector#iterative-index-scans)).
- HNSW indexes need to fit in memory to stay fast. When they do not, that is your signal to move.

## When to leave Postgres

| Signal | Move to |
|---|---|
| Tens of millions of vectors with heavy tenant or metadata filtering | [Qdrant](https://github.com/qdrant/qdrant) (filter-aware search) |
| Very large, mostly cold corpora where cost per GB matters most | turbopuffer (object storage first; search for Notion, Linear and Cursor per its [v3 post](https://turbopuffer.com/blog/rip-vector-database)) |
| On-device, embedded or columnar data lake workloads | [LanceDB](https://github.com/lancedb/lancedb) |
| Billions of vectors on your own cluster | [Milvus](https://github.com/milvus-io/milvus) |
| You want vectors inside Postgres but faster indexes | [pg_vectorsearch](https://github.com/timescale/pg_vectorsearch), alpha, pgvector-compatible columns ([HN thread](https://news.ycombinator.com/item?id=50086165)) |

## Beyond vectors

For agents over a codebase or a small, well-structured corpus, plain files plus grep often beat embeddings, and some teams now pair Markdown with a knowledge graph instead ([r/AI_Agents thread](https://reddit.com/r/AI_Agents/comments/1xpjfau/i_replaced_vectorsearch_rag_with_markdown/)). For entities and relationships that change over time, [Graphiti](https://github.com/getzep/graphiti) and [cognee](https://github.com/topoteretes/cognee) build the graph for you.
