export type Role = {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  blurb?: string;
  highlights: { title: string; points: string[]; tech?: string[] }[];
};

export const experience: Role[] = [
  {
    company: "Kloudspot",
    role: "Software Developer",
    period: "Jun 2024 — Present",
    current: true,
    blurb: "Building production GenAI platforms and agentic systems end-to-end.",
    highlights: [
      {
        title: "KSpot AI Console — Local-First AI Agent Platform",
        points: [
          "Built a self-hosted, Claude-Console-compatible AI agent platform with FastAPI, DeepAgents, PostgreSQL and Docker, enabling teams to create and manage production-grade agents and skills.",
          "Developed real-time SSE streaming, human-in-the-loop workflows, multi-agent orchestration, and a secure Docker sandbox for isolated execution of agent-generated code.",
          "Implemented provider-agnostic model integration (AWS Bedrock, vLLM, Ollama), encrypted MCP credential management, and persistent LangGraph state in PostgreSQL.",
        ],
        tech: ["FastAPI", "DeepAgents", "LangGraph", "PostgreSQL", "Docker", "AWS Bedrock", "MCP"],
      },
      {
        title: "LISA AI — Airport Operations Assistant",
        points: [
          "Built an AI assistant delivering real-time operational insights to 100+ daily users, sharply cutting manual query-resolution time.",
          "Orchestrated multi-step reasoning workflows with LangGraph, reducing average task-completion steps by ~40%.",
          "Implemented text-to-MongoDB and text-to-SQL generation with fine-tuned Llama models so non-technical staff could query live data in natural language.",
          "Used the Model Context Protocol (MCP) for secure tool integration, and generated dynamic bar/line/pie visualisations from natural-language queries — removing manual BI reporting.",
        ],
        tech: ["LangGraph", "Llama (fine-tuned)", "MCP", "MongoDB", "SQL", "Plotly"],
      },
      {
        title: "AI-Driven Dashboard Analytics (TTD)",
        points: [
          "Integrated LLM-based natural-language querying into analytics dashboards, cutting time-to-insight from minutes to seconds.",
          "Designed workflows to generate dynamic charts and insights directly from user queries.",
          "Optimised query-execution pipelines for real-time dashboard performance under production load.",
        ],
        tech: ["LLM", "FastAPI", "SQL", "Data Viz"],
      },
      {
        title: "vLLM Inference Server Deployment",
        points: [
          "Deployed a vLLM server with OpenAI-compatible APIs for scalable LLM inference, supporting concurrent multi-user request handling.",
          "Optimised inference via paged attention and GPU memory management, achieving ~2× throughput improvement over baseline.",
        ],
        tech: ["vLLM", "Paged Attention", "OpenAI-compatible APIs", "GPU"],
      },
      {
        title: "AI Workflow Automation (n8n) & vLLM Inference",
        points: [
          "Built 5+ event-driven automation pipelines integrating AI services, APIs and internal systems — saving an estimated 10+ hours/week of manual processing.",
          "Deployed a vLLM server with OpenAI-compatible APIs for scalable, concurrent multi-user inference.",
          "Optimised inference via paged attention and GPU memory management, achieving ~2× throughput over baseline.",
        ],
        tech: ["n8n", "vLLM", "Paged Attention", "OpenAI-compatible APIs"],
      },
    ],
  },
  {
    company: "Kloudspot",
    role: "Software Developer Intern",
    period: "Jan 2024 — May 2024",
    blurb: "Machine-learning proof-of-concept work in building energy analytics.",
    highlights: [
      {
        title: "Building Energy Prediction PoC",
        points: [
          "Built a PoC for building-energy prediction across commercial and residential properties, achieving ~85% model accuracy on test data.",
          "Trained and compared ML models with Scikit-learn and PyCaret across three meter types (electricity, water, thermal).",
        ],
        tech: ["Scikit-learn", "PyCaret", "Pandas"],
      },
    ],
  },
];
