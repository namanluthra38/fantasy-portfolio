import { BookOpen, Code, Award, ScrollText, Mail, Medal } from 'lucide-react';

export const locations = [
  {
    id: 'education',
    label: 'Education',
    icon: BookOpen,
    x: 20, y: 30, xMobile: 20, yMobile: 25,
    content: {
      mainTitle: "The Citadel of Knowledge", 
      slides: [
        {
          subtitle: "B.E. in Computer Science and Engineering",
          body: [
            "Institution: Chandigarh University",
            "Duration: 2023 - 2027 (Expected)",
            "Current CGPA: 8.68/10",
            "Relevant Coursework: JAVA, DBMS, Operating Systems, Computer Networks."
          ]
        },
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
              "Duration: 2020 - 2021",
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
    x: 35, y: 25, xMobile: 45, yMobile: 35,
    content: {
      mainTitle: "The Forge of Creation",
      slides: [
        {
            subtitle: "Hostel Help (2025) | Hostel Management System",
            body: [
              "A microservices-based full-stack system for managing hostel rooms, students, staff, and operations.",
              "Technologies: React (frontend), Spring Boot microservices (backend), PostgreSQL + MongoDB (databases), Docker (deployment).",
              "Implemented secure authentication and authorization using JWT across all services.",
              "Developed modular microservices for student management, room allocation, payments, and admin operations.",
              "Used PostgreSQL for relational data and MongoDB for flexible document-based records.",
              "Containerized all services using Docker for portability, scalability, and simplified deployment.",
              { 
                label: "View Source Code on GitHub", 
                url: "https://github.com/namanluthra38/hostelhelp", 
                icon: "github" 
              },
            ]
        },
        {
            subtitle: "Verfalarm (2025) | Product Expiration Reminder",
            body: [
              "A full-stack application that helps users track product expiration dates and receive timely reminders.",              
              "Technologies: React (frontend), Spring Boot (backend), MongoDB (database).",
              "Engineered a scalable Spring Boot backend with MongoDB for efficient data handling.",
              "Designed RESTful APIs for authentication, product management, and reminder scheduling.",
              "Integrated JWT-based authentication to secure all user sessions and endpoints.",
              "Developed an email notification service using JavaMailSender with daily, weekly, and monthly reminders.",
              { 
                label: "View Source Code on GitHub", 
                url: "https://github.com/namanluthra38/Product-Expiration-Reminder", 
                icon: "github" 
              },
            ]
        }
      ]
    }
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: ScrollText,
    x: 78, y: 40, xMobile: 68, yMobile: 23,
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
    x: 30, y: 65, xMobile: 25, yMobile: 50,
    content: {
      mainTitle: "Hall of Triumphs",
      slides: [
        {
            subtitle: "Recognitions",
            body: [
               "Scored 100/100 in Automata Pro (Coding) and 86/100 in Automata Fix (Debugging) in the AMCAT assessment.",
                "Ranked 2nd among all CSE students at Chandigarh University (2027 PO batch) based on AMCAT performance.",
                "Ranked top 15% globally on LeetCode rankings."
            ]
        }
      ]
    }
  },
  {
    id: 'certifications',
    label: 'Certifications',
    icon: Medal,
    x: 58, y: 75, xMobile: 35, yMobile: 78,
    content: {
      mainTitle: "Guild Seals",
      slides: [
        {
            subtitle: "Professional Certificates",
            body: [
                "Linear Algebra for Machine Learning and Data Science - DeepLearning.AI.",
                "NPTEL Cloud Computing - IIT Kharagpur.",   
                "Programming with JavaScript - Meta."  
            ]
        }
      ]
    }
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: Mail,
    x: 85, y: 60, xMobile: 80, yMobile: 55,
    content: {
      mainTitle: "The Raven's Tower",
      slides: [
          {
            subtitle: "Connect with me",
            body: [
                { 
                    label: "Mail Me", 
                    url: "mailto:namanluthra70@gmail.com",
                    icon: "mail"
                },
                { 
                    label: "LinkedIn Profile", 
                    url: "https://www.linkedin.com/in/naman-luthra",
                    icon: "linkedin"
                },
                { 
                    label: "GitHub Profile", 
                    url: "https://github.com/namanluthra38",
                    icon: "github"
                }
            ]
          }
      ]
    }
  },
];