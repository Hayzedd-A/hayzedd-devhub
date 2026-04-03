const myInfo = {
  brandName: "Hayzedd",
  fullname: "Adebayo Azeez",
  location: {
    country: "Nigeria",
    state: "Lagos",
    city: "Epe",
  },
  stacks: ["React", "Express", "node", "Next"], // I'm a full stack web developer, add all neccessary skill including databases
  portfoioWebsite: "https://hayzedd-the-developer.vercel.app/portfolio",
  contact: {
    phone: "08081602424",
    email: "adebayoazeez37@yahoo.com",
    linkendIn: "https://www.linkedin.com/in/azeez-adebayo-ola",
    github: "https://github.com/hayzedd-a",
  },
};

const questionnaire = [
  {
    key: "serviceType",
    question: "What type of service are you looking for?",
    optType: "multi",
    options: [
      "Web application development",
      "Mobile app development",
      "API / backend development",
      "Website redesign",
      "Website maintenance",
      "UI/UX design",
      "AI integration / automation",
      "Other",
    ],
  },
  {
    key: "stage",
    question: "What stage is your project currently in?",
    optType: "single",
    options: [
      "Just an idea",
      "Planning / requirements defined",
      "Design phase",
      "Development in progress",
      "Already built, needs improvements",
      "Other",
    ],
  },
  {
    key: "designAssets",
    question: "Do you already have design assets or wireframes?",
    optType: "single",
    options: [
      "Yes (final designs ready)",
      "Yes (wireframes / drafts)",
      "No, I need design services",
    ],
  },
  // {
  //   key: "platforms",
  //   question: "What platforms should this project support?",
  //   optType: "multi",
  //   options: ["Web", "Android app", "iOS app", "API only"],
  // },
  {
    key: "technologies",
    question: "What technologies do you prefer (if any)?",
    optType: "multi",
    options: [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "Django / Flask",
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "No preference (open to recommendations)",
      "Other",
    ],
  },
  {
    key: "keyFeatures",
    question: "What key features do you need?",
    optType: "multi",
    options: [
      "User authentication",
      "Payment integration",
      "Admin dashboard",
      "Real-time features (chat, notifications)",
      "Third-party API integrations",
      "Analytics / reporting",
      "File uploads",
      "Other",
    ],
  },
  // {
  //   key: "expectedUsers",
  //   question: "How many users do you expect?",
  //   optType: "single",
  //   options: [
  //     "Less than 100",
  //     "100 – 1,000",
  //     "1,000 – 10,000",
  //     "10,000+",
  //     "Not sure yet",
  //   ],
  // },
  {
    key: "budget",
    question: "What is your estimated budget for this project?",
    optType: "single",
    options: [
      "₦100,000 – ₦300,000",
      "₦300,000 – ₦700,000",
      "₦700,000 – ₦1,500,000",
      "₦1,500,000+",
      "Not sure yet",
    ],
  },
  {
    key: "timeline",
    question: "What is your expected timeline?",
    optType: "single",
    options: [
      "Less than 1 week",
      "1 – 4 weeks",
      "1 – 3 months",
      "3 – 6 months",
      "Flexible",
    ],
  },
  // {
  //   key: "ongoingSupport",
  //   question: "Will you need ongoing support after launch?",
  //   optType: "single",
  //   options: [
  //     "Yes (long-term support)",
  //     "Yes (short-term support)",
  //     "No",
  //     "Not sure",
  //   ],
  // },
  {
    key: "helpWith",
    question: "Do you need help with any of the following?",
    optType: "multi",
    options: [
      "Hosting setup",
      "Domain registration",
      "SEO optimization",
      "Performance optimization",
      "Consultation / technical guidance",
    ],
  },
  {
    key: "projectDescription",
    question: "Any other information you'll like to brief us?",
    optType: "text",
    placeholder:
      "Tell us what you're building, your goals, and any important details...",
  },
  //  CONTACT INFO (Missing in your version)
  {
    key: "name",
    question: "Name",
    optType: "fullname",
  },
  {
    key: "email",
    question: "Email",
    optType: "email",
  },
  {
    key: "phone",
    question: "Phone / WhatsApp number",
    optType: "phone",
  },
];
