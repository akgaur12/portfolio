export type SkillGroup = {
  category: string;
  /** short id used for filtering */
  id: string;
  icon: string; // 24x24 path
  skills: string[];
};

// Icons are simple 24x24 line glyphs (stroke-based) reused across cards.
const ICONS = {
  spark:
    "M12 2v4m0 12v4m10-10h-4M6 12H2m15.07-7.07-2.83 2.83M9.76 14.24l-2.83 2.83m0-10.14 2.83 2.83m4.48 4.48 2.83 2.83",
  layers: "M12 2 2 7l10 5 10-5-10-5Zm10 11-10 5L2 13m20 4-10 5-10-5",
  server:
    "M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5Zm0 11a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3Zm4-9h.01M7 18h.01",
  database:
    "M12 3c4.97 0 9 1.34 9 3s-4.03 3-9 3-9-1.34-9-3 4.03-3 9-3Zm9 6c0 1.66-4.03 3-9 3s-9-1.34-9-3m18 6c0 1.66-4.03 3-9 3s-9-1.34-9-3M3 6v12m18-12v12",
  chart: "M3 3v18h18M8 17V9m5 8V5m5 12v-6",
  code: "m16 18 6-6-6-6M8 6l-6 6 6 6",
  brain:
    "M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 1 5 3 3 0 0 0 5 1.5V4Zm6 0a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-1 5 3 3 0 0 1-5 1.5V4Z",
  cloud:
    "M7 18a5 5 0 0 1-.5-9.97A6 6 0 0 1 18 8.5a4.5 4.5 0 0 1-.5 9H7Z",
};

export const skillGroups: SkillGroup[] = [
  {
    category: "GenAI & LLMs",
    id: "genai",
    icon: ICONS.spark,
    skills: ["LangChain", "LangGraph", "LlamaIndex", "DeepAgents", "RAG", "Prompt Engineering", "MCP", "n8n"],
  },
  {
    category: "LLM Ops & Serving",
    id: "llmops",
    icon: ICONS.server,
    skills: ["vLLM", "Ollama", "AWS Bedrock", "Model Serving", "GPU Inference", "Paged Attention"],
  },
  {
    category: "Backend",
    id: "backend",
    icon: ICONS.code,
    skills: ["FastAPI", "Flask", "REST APIs", "Async APIs", "JWT Auth", "SSE Streaming"],
  },
  {
    category: "Databases",
    id: "data",
    icon: ICONS.database,
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Elasticsearch", "Vector Databases"],
  },
  {
    category: "ML & Data",
    id: "ml",
    icon: ICONS.brain,
    skills: ["Pandas", "Scikit-learn", "PyCaret", "Keras", "NLTK"],
  },
  {
    category: "Languages",
    id: "lang",
    icon: ICONS.layers,
    skills: ["Python", "C / C++", "SQL", "TypeScript"],
  },
  {
    category: "DevOps & Tools",
    id: "devops",
    icon: ICONS.cloud,
    skills: ["Linux", "Docker", "Git", "GitHub", "Bitbucket", "Pytest"],
  },
  {
    category: "Visualization",
    id: "viz",
    icon: ICONS.chart,
    skills: ["Matplotlib", "Seaborn", "Plotly"],
  },
];
