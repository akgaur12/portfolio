---
title: AIChatApp
tagline: Multi-provider LLM chat platform with persistent memory and agentic routing.
featured: true
order: 2
tags: ["GenAI", "Backend"]
problem: >-
  Switching between LLM providers usually means rewriting integration code and losing conversational
  history. AIChatApp provides one backend that talks to any provider, remembers conversations, and
  routes each message to the right pipeline.
architecture: >-
  An asynchronous FastAPI backend uses MongoDB (Motor) for persistent conversational memory and a
  unified abstraction layer over 8+ LLM providers for seamless model switching. A LangGraph agent
  workflow routes messages intelligently across chat, search and reasoning pipelines. Security is
  production-grade — JWT, bcrypt, RBAC and email-OTP recovery — and it ships with a Pytest suite and a
  containerised Docker/Gunicorn deployment.
highlights:
  - "Async FastAPI + MongoDB (Motor) backend with persistent conversational memory."
  - "Unified abstraction over 8+ LLM providers for seamless model switching."
  - "LangGraph agent workflow routing across chat, search and reasoning pipelines."
  - "JWT, bcrypt, RBAC and email-OTP recovery; Pytest suite; Dockerised Gunicorn deploy."
tech: ["Python", "FastAPI", "LangChain", "LangGraph", "MongoDB (Motor)", "JWT"]
github: "https://github.com/akgaur12/AIChatApp"
githubUi: "https://github.com/akgaur12/AIChatApp-UI"
---

AIChatApp is a production-shaped chat backend: bring any provider, keep your history, and let an agent
graph decide whether a message needs a plain answer, a search, or a reasoning chain.
