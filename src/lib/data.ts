export const profile = {
  name: "Hariharan S",
  role: "Software Developer | Fresher",
  tagline:
    "Building modern web applications with React, Python, SQL, and AWS. I develop clean, scalable, and responsive solutions, turning ideas into reliable software from development to deployment.",
  location: "Salem, Tamil Nadu, India",
  email: "hariharansakthivel18@gmail.com",
  phone: "+91 9894830391",
  github: "https://github.com/HariharanSakthi18",
  linkedin: "https://www.linkedin.com/in/hariharan-s-30031a248/",
  codechef: "https://codechef.com/users/hariharann25",
  resumeUrl: "/Hariharan_S_Resume.pdf",
  about:
    "I am a B.Sc. Information Technology graduate with a strong interest in software development and modern web technologies. During my Full Stack Development internship at Besant Technologies, I gained practical experience in developing web applications and working across frontend and backend development. I also worked on real-world projects that helped me strengthen my problem-solving and development skills.\n\nMy technical skills include Python, Flask, React.js, JavaScript, HTML, CSS, Bootstrap, SQL, REST APIs, Git, GitHub, and basic AWS. I enjoy creating responsive and user-friendly applications, learning new technologies, and turning ideas into practical solutions. As I begin my professional career, I am looking for opportunities where I can contribute to development projects while continuously growing as an engineer.",
};

export const mailtoLink = `mailto:${profile.email}?subject=${encodeURIComponent("Hello Hariharan")}&body=${encodeURIComponent("Hi Hariharan,\n\n")}`;

export const certificationsDriveUrl = "https://drive.google.com/drive/folders/1-sNTXPcJyjaYuBRg8asiCnmXSwderC4R";

export const certifications = [
  {
    title: "UI/UX Developer Certification",
    issuer: "L&T EduTech",
    description: "Completed UI/UX Developer certification with First Class.",
    link: certificationsDriveUrl,
  },
  {
    title: "Full Stack Development with Python",
    issuer: "E&ICT Academy, IIT Guwahati",
    description: "Advanced Certification in Full Stack Development, in association with Besant Technologies.",
    link: certificationsDriveUrl,
  },
  {
    title: "AWS Training",
    issuer: "Besant Technologies",
    description: "Successfully completed Amazon Web Services (AWS) Training.",
    link: certificationsDriveUrl,
  },
];

const nexusImg = "/projects/nexus.jpg";
const posterImg = "/projects/poster.jpg";
const dmartImg = "/projects/dmart.jpg";
const gamingImg = "/projects/gaminghub.jpg";
import cannyImg from "@/assets/canny.jpg";


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
