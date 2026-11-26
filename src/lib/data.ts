export const profile = {
  name: "Hariharan S",
  role: "Software Developer | AI & Full Stack",
  tagline:
    "Building modern web applications and intelligent AI-powered solutions using React, Python, SQL, and AWS. Exploring Generative AI, LLMs, Prompt Engineering, RAG, and AI Automation. Developing clean, scalable, and responsive applications by combining full-stack development with Generative AI.",
  location: "Salem, Tamil Nadu, India",
  email: "hariharansakthivel18@gmail.com",
  phone: "+91 9894830391",
  github: "https://github.com/HariharanSakthi18",
  linkedin: "https://www.linkedin.com/in/hariharan-s-30031a248/",
  codechef: "https://codechef.com/users/hariharann25",
  resumeUrl: "/Hariharan_S_Resume.pdf",
  about:
    "I am a B.Sc. Information Technology graduate currently pursuing my Master of Computer Applications (MCA), with a strong interest in Full Stack Development, Artificial Intelligence, and modern web technologies. Currently, I am working as an AI Full Stack Engineer Intern at Artificial Augment Technologies, gaining practical experience in developing web applications and exploring AI-powered solutions. I previously completed a Full Stack Development internship at Besant Technologies, where I strengthened my frontend and backend development skills through hands-on projects.\n\nMy technical skills include Python, Flask, React.js, JavaScript, HTML, CSS, Bootstrap, SQL, REST APIs, Git, GitHub, and AWS fundamentals. I am also exploring Generative AI, Large Language Models (LLMs), Prompt Engineering, Retrieval-Augmented Generation (RAG), and AI Automation. I enjoy building responsive applications, solving real-world problems, and combining full-stack development with AI to create practical and intelligent solutions.",
};

export const mailtoLink = `mailto:${profile.email}?subject=${encodeURIComponent("Hello Hariharan")}&body=${encodeURIComponent("Hi Hariharan,\n\n")}`;

export const aboutCards = [
  {
    id: "artificial-augment",
    kind: "internship",
    label: "Internship",
    meta: "20/10/26 - 19/04/27",
    value: "Artificial Augment Technologies — AI Full Stack Engineer Intern",
  },
  {
    id: "besant",
    kind: "internship",
    label: "Internship",
    meta: "01/08/25 - 01/02/26",
    value: "Besant Technologies — Full Stack Development Internship",
  },
  {
    id: "mca",
    kind: "education",
    label: "Education",
    meta: "Currently Pursuing",
    value: "Master of Computer Applications (MCA) — K.S. Rangasamy College of Technology (KSRCT)",
  },
  {
    id: "bsc",
    kind: "education",
    label: "Education",
    meta: "Batch 2025 / CGPA 7.7",
    value: "B.Sc ( IT ) - KPR College of Arts Science and Research",
  },
  {
    id: "recognition",
    kind: "recognition",
    label: "Recognition",
    meta: "2024",
    value: "Best Program Organiser — KPR CAS",
  },
] as const;

export const certificationsDriveUrl = "https://drive.google.com/drive/folders/1-sNTXPcJyjaYuBRg8asiCnmXSwderC4R";

import webforgeCertificate from "@/assets/certificates/webforge.pdf.asset.json";
import a2InternshipOffer from "@/assets/certificates/a2-internship.pdf.asset.json";
import fullStackCertificate from "@/assets/certificates/full-stack.pdf.asset.json";
import uiUxCertificate from "@/assets/certificates/ui-ux.pdf.asset.json";
import awsCertificate from "@/assets/certificates/aws.pdf.asset.json";

export type Certification = {
  title: string;
  issuer: string;
  description: string;
  link: string;
  previewUrl?: string;
  linkLabel?: string;
};

export const certifications: Certification[] = [
  {
    title: "UI/UX Developer Certification",
    issuer: "L&T EduTech",
    description: "Completed UI/UX Developer certification with First Class.",
    link: uiUxCertificate.url,
    previewUrl: uiUxCertificate.url,
  },
  {
    title: "Full Stack Development with Python",
    issuer: "E&ICT Academy, IIT Guwahati",
    description: "Advanced Certification in Full Stack Development, in association with Besant Technologies.",
    link: fullStackCertificate.url,
    previewUrl: fullStackCertificate.url,
  },
  {
    title: "AWS Training",
    issuer: "Besant Technologies",
    description: "Successfully completed Amazon Web Services (AWS) Training.",
    link: awsCertificate.url,
    previewUrl: awsCertificate.url,
  },
  {
    title: "Webforge — Second Prize",
    issuer: "KPR College of Arts Science and Research",
    description: "Awarded second prize in the Webforge competition at TechRaga ’26, held on 23–24 September 2026.",
    link: webforgeCertificate.url,
    previewUrl: webforgeCertificate.url,
  },
  {
    title: "AI Full Stack Engineer — Internship Offer",
    issuer: "Artificial Augment Technologies (A² Technologies)",
    description: "Six-month remote internship offer for the AI Full Stack Engineer role, from 20 October 2026 to 19 April 2027.",
    link: a2InternshipOffer.url,
    previewUrl: a2InternshipOffer.url,
    linkLabel: "View Offer Letter",
  },
];

const nexusImg = "/projects/nexus.jpg";
const posterImg = "/projects/poster.jpg";
const dmartImg = "/projects/dmart.jpg";
const gamingImg = "/projects/gaminghub.jpg";
import cannyImg from "@/assets/canny.jpg";
import dreamDestinationImg from "@/assets/dream-destination.jpg";


export const projects = [
  {
    title: "Nexus Mission Control Todo",
    description:
      "A futuristic task management application with task priorities, due dates, reminders, progress tracking, and a responsive cyberpunk-style interface.",
    stack: ["HTML", "CSS", "JavaScript"],
    repo: "https://github.com/HariharanSakthi18/nexus-mission-control-todo",
    live: "https://nexus-mission-control.netlify.app/",
    image: nexusImg,
    accent: "primary" as const,
  },
  {
    title: "Poster Website",
    description:
      "A responsive e-commerce website for browsing and purchasing wall posters, featuring product listings, reviews, and a user-friendly interface.",
    stack: ["HTML", "CSS", "JavaScript", "Python", "Flask", "SQL"],
    repo: "https://github.com/HariharanSakthi18/Poster-Website",
    live: "https://github.com/HariharanSakthi18/Poster-Website",
    image: posterImg,
    accent: "accent" as const,
  },
  {
    title: "DMart Website",
    description:
      "A responsive supermarket website featuring product categories, product listings, and a clean shopping interface optimized for different screen sizes.",
    stack: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    repo: "https://github.com/HariharanSakthi18/DMart-Website",
    live: "https://dmart-clonee.netlify.app/",
    image: dmartImg,
    accent: "primary" as const,
  },
  {
    title: "Gaming Hub",
    description:
      "A responsive web-based gaming application with interactive gameplay, dynamic difficulty, and a user-friendly interface.",
    stack: ["HTML", "CSS", "JavaScript"],
    repo: "https://github.com/HariharanSakthi18/Gaming-Hub",
    live: "https://gaming-hub-18.netlify.app/",
    image: gamingImg,
    accent: "accent" as const,
  },
  {
    title: "Canny Algorithm for Edge Detection",
    description:
      "An image-processing project that applies Canny and Sobel edge detection techniques to identify and analyze edges in images.",
    stack: ["Python", "OpenCV", "MATLAB"],
    repo: "https://github.com/HariharanSakthi18/Canny-Algorithm-for-Edge-Detection",
    live: "https://github.com/HariharanSakthi18/Canny-Algorithm-for-Edge-Detection",
    image: cannyImg,
    accent: "primary" as const,
  },
  {
    title: "Dream Destination",
    description:
      "A travel discovery website for exploring destinations, experiences, and travel guides, with country filters and a trip-planning interface.",
    stack: ["React", "TypeScript", "Tailwind CSS"],
    repo: "https://github.com/HariharanSakthi18/Dream-Destination",
    live: "https://dream-destination-psi.vercel.app/",
    image: dreamDestinationImg,
    accent: "accent" as const,
  },
];

export const skills = {
  "Programming Languages": [
    { name: "Python" },
    { name: "JavaScript" },
    { name: "SQL" },
    { name: "HTML5" },
    { name: "CSS3" },
  ],
  "Core CS Fundamentals": [
    { name: "Data Structures & Algorithms" },
    { name: "Object-Oriented Programming (OOP)" },
    { name: "DBMS" },
    { name: "Operating Systems" },
    { name: "Computer Networks" },
  ],
  "Frameworks & Libraries": [{ name: "React.js" }, { name: "Flask" }, { name: "REST APIs" }, { name: "Bootstrap" }],
  "Cloud & Tools": [
    { name: "AWS" },
    { name: "Microsoft Excel & Word" },
    { name: "Render & Vercel" },
    { name: "Git & GitHub" },
    { name: "VS Code & Jupyter Notebook" },
  ],
};
