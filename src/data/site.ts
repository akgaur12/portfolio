export const site = {
  name: "Akash Gaur",
  title: "GenAI & Backend Engineer",
  tagline:
    "GenAI & Backend Engineer, specializing in LLM-powered systems, RAG pipelines, agentic AI, and scalable machine learning infrastructure. Passionate about transforming cutting-edge AI research into reliable, production-ready applications.",
  summary:
    "Software Developer at Kloudspot specialising in production GenAI. I build end-to-end systems — from LangGraph agents and RAG pipelines to vLLM/Ollama deployments — backed by FastAPI and vector-database infrastructure. I've shipped LLM-powered natural-language analytics for airport operations serving 100+ daily users, and I care as much about backend product quality as I do about LLM engineering rigour.",
  location: "Gwalior, MP, India",
  availability: "Open for new opportunities",
  email: "akgaur.mits@gmail.com",
  phone: "+91 xxxxxxxxxx",
  // Replace with the real PDF in /public; button is wired to this path.
  resumeUrl: "/Akash-Gaur-Resume.pdf",
  // Get a free access key at https://web3forms.com (sent to your email).
  // This key is public by design — it only identifies which inbox receives the form.
  web3formsKey: "3662caf2-3420-47fe-b67d-deff74e312b4",
  url: "https://akashgaur.dev",
  ogImage: "/og-image.png",
} as const;

export type SocialLink = {
  label: string;
  href: string;
  /** inline SVG path data (24x24 viewBox) */
  icon: string;
};

export const socials: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/akgaur12",
    icon: "M12 .5C5.73.5.5 5.74.5 12.04c0 5.1 3.29 9.42 7.86 10.95.58.11.79-.25.79-.56v-2.02c-3.2.7-3.88-1.38-3.88-1.38-.53-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.78 2.7 1.26 3.36.97.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.5 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A11.54 11.54 0 0 0 23.5 12.04C23.5 5.74 18.27.5 12 .5Z",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/akgaur12",
    icon: "M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z",
  },
  {
    label: "Medium",
    href: "https://medium.com/@ak_gaur",
    icon: "M2.85 7.13c.02-.21-.06-.41-.21-.55L1.07 4.71v-.27h4.96l3.83 8.4 3.37-8.4h4.73v.27l-1.34 1.28a.39.39 0 0 0-.15.38v9.39c-.02.14.04.28.15.37l1.31 1.28v.27h-6.59v-.27l1.36-1.31c.13-.13.13-.17.13-.38V7.78l-3.78 9.6h-.51L4.86 7.78v6.43c-.04.28.06.56.25.76l1.77 2.15v.27H1.85v-.27l1.77-2.15c.19-.2.28-.49.23-.76V7.13Z",
  },
  {
    label: "Email",
    href: "mailto:akgaur.mits@gmail.com",
    icon: "M1.5 5.25A2.25 2.25 0 0 1 3.75 3h16.5a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 20.25 21H3.75a2.25 2.25 0 0 1-2.25-2.25V5.25Zm2.06-.31 8.44 6.18 8.44-6.18a.75.75 0 0 0-.69-.44H4.25a.75.75 0 0 0-.69.44ZM21 6.65l-8.55 6.26a.75.75 0 0 1-.9 0L3 6.65v12.1c0 .14.11.25.25.25h17.5c.14 0 .25-.11.25-.25V6.65Z",
  },
];

/** In-page navigation */
export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
] as const;

