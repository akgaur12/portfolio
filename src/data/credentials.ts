export type Education = {
  institution: string;
  credential: string;
  period: string;
  score: string;
  /** Path to the institution logo in /public */
  logo: string;
};

export const education: Education[] = [
  {
    institution: "Madhav Institute of Technology & Science, Gwalior, MP",
    credential: "B.Tech — Mathematics & Computing",
    period: "2020 — 2024",
    score: "CGPA 9.45",
    logo: "/mits-logo.jpeg",
  },
  {
    institution: "Govt. School of Excellence No.1, Gwalior, MP",
    credential: "Senior Secondary (12th), PCM, MP Board",
    period: "2019 — 2020",
    score: "91.2%",
    logo: "/soe-logo.jpg",
  },
  {
    institution: "Govt. School of Excellence No.1, Gwalior, MP",
    credential: "High School (10th), MP Board",
    period: "2017 — 2018",
    score: "93.2%",
    logo: "/soe-logo.jpg",
  },
];

export type Achievement = {
  title: string;
  detail: string;
  year: string;
  kind: "award" | "research" | "hackathon" | "exam";
};

export const achievements: Achievement[] = [
  {
    title: "GATE Qualified",
    detail: "Cleared the Graduate Aptitude Test in Engineering — India's top national exam for CS/Engineering.",
    year: "2023",
    kind: "exam",
  },
  {
    title: "Published ML Research Paper",
    detail: "Authored \"Diabetes Prediction using Supervised Machine Learning,\" published in the MITS college journal.",
    year: "2023",
    kind: "research",
  },
  {
    title: "Hackathon Team Lead",
    detail: "Led a team of 4 in a Microsoft-sponsored hackathon at MITS.",
    year: "2022",
    kind: "hackathon",
  },
];

export type Certification = {
  name: string;
  issuer?: string;
  year?: string;
  /** Path to the certificate image in /public */
  image: string;
};

export const certifications: Certification[] = [
  {
    name: "Prompt Engineering for Developers",
    issuer: "Udemy",
    year: "2024",
    image: "/certificates/Prompt-Engineering-for-Developers.jpg",
  },
  {
    name: "Machine Learning",
    issuer: "SkillUp",
    year: "2023",
    image: "/certificates/Machine-Learning.png",
  },
  {
    name: "Complete Python Programming",
    issuer: "Udemy",
    year: "2023",
    image: "/certificates/Complete-Python-Programming.jpg",
  },
  {
    name: "Introduction to Programming in C",
    issuer: "NPTEL",
    year: "2023",
    image: "/certificates/Introduction-To-Programming-In-C.jpg",
  },
  {
    name: "Research Paper Certificate — ISCMCTR",
    issuer: "MITS",
    year: "2023",
    image: "/certificates/Paper-ID-97-Certificate-ISCMCTR.jpg",
  },
];
