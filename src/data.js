import { BookOpen, Code, Award, ScrollText, Mail, Medal } from 'lucide-react';

export const locations = [
  {
    id: 'education',
    label: 'Education',
    icon: BookOpen,
    // Position percentages relative to the map container
    x: 20, y: 30, 
    content: {
      title: "The Citadel of Knowledge",
      subtitle: "Bachelor of Engineering (Computer Science & Engineering), Chandigarh University (2023-2027)",
      body: [
        "Current CGPA: 8.68/10",
        "Relevant Coursework: JAVA, DBMS, OS, CN etc."
      ],
      subtitle: "Bachelor of Engineering (Computer Science & Engineering), Chandigarh University (2023-2027)",
      body: [
        "Current CGPA: 8.68/10",
        "Relevant Coursework: JAVA, DBMS, OS, CN etc."
      ]
    }
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: Code,
    x: 45, y: 25,
    content: {
      title: "The Forge of Creation",
      subtitle: "Notable Personal & Professional Work",
      body: [
        "Project 'Valyria': A full-stack MERN eCommerce application handling 10k+ simulated concurrent users.",
        "Project 'Palantir': A real-time data visualization dashboard using React and D3.js.",
        "Open Source contributions to React UI libraries."
      ]
    }
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: ScrollText,
    x: 75, y: 40,
    content: {
      title: "The Arsenal",
      subtitle: "Technical Proficiencies",
      body: [
        "Frontend: React JS (Hooks, Context), Redux, Tailwind CSS, Framer Motion, Next.js.",
        "Backend: Node.js, Express, MongoDB, PostgreSQL.",
        "Tools: Git, Docker, AWS (S3, EC2), Jest/RTL."
      ]
    }
  },
  {
    id: 'achievements',
    label: 'Achievements',
    icon: Award,
    x: 30, y: 65,
    content: {
      title: "Hall of Triumphs",
      subtitle: "Awards and Recognitions",
      body: [
        "Winner of the 2023 Global Hackathon (FinTech track).",
        "Employee of the Quarter - Q4 2023 at TechCorp.",
        "Published technical article featured on Hashnode weekly top stories."
      ]
    }
  },
  {
    id: 'certifications',
    label: 'Certifications',
    icon: Medal,
    x: 60, y: 75,
    content: {
      title: "Guild Seals",
      subtitle: "Verified Credentials",
      body: [
        "AWS Certified Solutions Architect – Associate.",
        "Meta Frontend Developer Professional Certificate.",
        "MongoDB Certified Developer Associate."
      ]
    }
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: Mail,
    x: 85, y: 60,
    content: {
      title: "The Raven's Tower",
      subtitle: "Send a raven (or an email)",
      body: [
        "Email: your.email@example.com",
        "LinkedIn: linkedin.com/in/yourprofile",
        "GitHub: github.com/yourusername",
        "Location: Available for Remote Worldwide"
      ]
    }
  },
];