import { BookOpen, Code, Award, ScrollText, Mail, Medal } from 'lucide-react';

export const locations = [
  {
    id: 'education',
    label: 'Education',
    icon: BookOpen,
    x: 20, y: 30,
    content: {
      mainTitle: "The Citadel of Knowledge", // The overarching title
      slides: [
        // Slide 1: University
        {
          subtitle: "B.E. in Computer Science and Engineering",
          body: [
            "Institution: Chandigarh University",
            "Duration: 2023 - 2027 (Expected)",
            "Current CGPA: 8.68/10",
            "Relevant Coursework: JAVA, DBMS, Operating Systems, Computer Networks."
          ]
        },
         // Slide 2: High School (Example added to show functionality)
        {
            subtitle: "Class 12th (CBSE)",
            body: [
              "Institution: National Public School, Yamunanagar",
              "Duration: 2022 - 2023",
              "Stream: PCM",
              "Marks: 92.8%",
            ]
        },
        {
            subtitle: "Class 10th (CBSE)",
            body: [
              "Institution: National Public School, Yamunanagar",
              "Duration: 2021 - 2022",
              "Marks: 92.2%",
            ]
        }


      ]
    }
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: Code,
    x: 45, y: 25,
    content: {
      mainTitle: "The Forge of Creation",
      slides: [
        {
          subtitle: "Verfalarm (2025) | Spring Boot, React, MongoDB",
          body: [
            "Engineered and deployed a scalable backend with Spring Boot and MongoDB for efficient storage and retrieval of user and product data.",
            "Designed and implemented RESTful APIs for authentication, product lifecycle management, and reminder scheduling, ensuring modular and maintainable services.",
            "Integrated JWT-based authentication to secure user sessions and protect sensitive endpoints.",
           // "Developed a notification service using JavaMailSender with customizable delivery frequencies (daily, weekly, monthly) and optimized engagement through behavioral analysis.",
            //"Focused on performance, reliability, and user-centric workflows following industry best practices in backend development."
          ]
        },
        {
            subtitle: "Project 'Palantir' - Real-time Dashboard",
            body: [
              "Built using React and D3.js for complex data visualization.",
              "Uses WebSockets for real-time data updates.",
              "Reduced data loading time by 40% through optimized API calls."
            ]
        }
      ]
    }
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: ScrollText,
    x: 75, y: 40,
    // For single-entry items, we just have an array of one slide object
    content: {
      mainTitle: "The Arsenal of Skills",
      slides: [
        {
            subtitle: "Technical Proficiencies",
            body: [
                "Programming Languages: Java, JavaScript, Python, C++.",
                "Frontend: React JS, HTML, CSS",
                "Backend: Spring Boot, Microservices Architecture, REST APIs,",
                "Database: MongoDB, PostgreSQL.",
                "Tools: Git, Github, VS Code, Postman, Docker",
                "Problem Solving: 600+ DSA problems solved on LeetCode and 100+ on other platforms."
            ]
        }
      ]
    }
  },
  {
    id: 'achievements',
    label: 'Achievements',
    icon: Award,
    x: 30, y: 65,
    content: {
      mainTitle: "Hall of Triumphs",
      slides: [
        {
            subtitle: "Hackathons & Competitions",
            body: [
                "Winner of Smart India Hackathon (Internal Round) 2024.",
                "Runner-up in university-level coding contest 'CodeWars'."
            ]
        },
        {
            subtitle: "Recognitions",
            body: [
                "Earned 5-star badge in Problem Solving on HackerRank.",
                "Ranked top 5% globally in LeetCode weekly contest."
            ]
        }
      ]
    }
  },
  {
    id: 'certifications',
    label: 'Certifications',
    icon: Medal,
    x: 60, y: 75,
    content: {
      mainTitle: "Guild Seals",
      slides: [
        {
            subtitle: "Professional Certificates",
            body: [
                "Meta Frontend Developer Professional Certificate (Coursera).",
                "AWS Certified Cloud Practitioner."
            ]
        }
      ]
    }
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: Mail,
    x: 85, y: 60,
    content: {
      mainTitle: "The Raven's Tower",
      slides: [
          {
            subtitle: "Connect with me",
            body: [
                "Email: namanluthra70@example.com",
                "LinkedIn: www.linkedin.com/in/naman-luthra",
                "GitHub: github.com/namanluthra38"
            ]
          }
      ]
    }
  },
];