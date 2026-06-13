---
title: PromptTokenizer
tagline: Visualise how LLMs tokenize your prompt — across 49+ models.
featured: true
order: 1
tags: ["GenAI", "Backend", "Full-Stack"]
problem: >-
  Developers building on LLMs constantly guess at token counts and costs. PromptTokenizer makes
  tokenization visible and comparable across providers, so prompt and pricing decisions are grounded
  in real numbers instead of estimates.
architecture: >-
  A FastAPI microservice exposes tokenization, model-comparison and pricing-estimation APIs behind a
  pluggable adapter layer that wraps multiple tokenizer engines (tiktoken and friends) and model
  registries. Tokenizers, registries and pricing services are preloaded at startup and cached as
  lru_cache-backed singletons, so requests avoid cold-start cost. A React/TypeScript + shadcn UI
  consumes the API; the whole thing ships as a multi-stage Docker build with a Pytest suite.
highlights:
  - "Supports 49+ LLMs through one unified API surface for tokenization, comparison and pricing."
  - "Pluggable adapter architecture integrating multiple tokenizer engines and model registries."
  - "Startup preloading + lru_cache singleton caching for low-latency responses."
  - "Multi-stage Docker build, Pytest suite, and a developer-focused React/shadcn UI."
tech: ["FastAPI", "Python", "tiktoken", "Docker", "Pytest", "React", "TypeScript", "Tailwind CSS"]
demo: "https://www.prompt-tokenizer.site/"
---

PromptTokenizer turns an opaque step of LLM development — tokenization — into something you can see,
compare and price out before you ship a prompt to production.
