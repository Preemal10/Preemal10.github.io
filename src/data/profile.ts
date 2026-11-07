export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
  current?: boolean;
}

export interface ProjectItem {
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  repo: string;
  icon: 'bot' | 'activity' | 'users' | 'messages';
  accent: 'emerald' | 'cyan' | 'amber' | 'sky';
}

export interface SkillGroup {
  title: string;
  icon: 'code' | 'layout' | 'server' | 'database' | 'cloud' | 'sparkles';
  items: string[];
}

export interface EducationItem {
  degree: string;
  school: string;
  period: string;
  location: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export const profile = {
  name: 'Preemal Monis',
  title: 'Senior Full Stack Developer',
  image: `${import.meta.env.BASE_URL}profile.jpg`,
  location: 'Germany',
  linkedin: 'https://www.linkedin.com/in/preemal-monis-112972277/',
  github: 'https://github.com/Preemal10',
  website: 'https://preemal10.github.io',
  roles: [
    'Senior Full Stack Developer',
    'AI-Powered Product Builder',
    'Cloud-Native Architect',
  ],
  intro:
    'I build cloud-native apps and AI-powered products, from interface to infrastructure.',
  summary:
    'Full Stack Developer with 5+ years across enterprise and startup teams. I turn React, cloud infrastructure, and AI workflows into reliable products.',
  workPermit: 'Authorized to work in Germany',
  stats: [
    { value: 6, suffix: '+', label: 'Years building products' },
    { value: 85, suffix: '%', label: 'Test coverage on critical flows' },
    { value: 40, suffix: '%', label: 'Faster API response times' },
    { value: 10, suffix: '+', label: 'Engineers mentored' },
  ] satisfies StatItem[],
  techMarquee: [
    'React', 'TypeScript', 'Next.js', 'NestJS', 'Node.js', 'PostgreSQL',
    'Kafka', 'Docker', 'Kubernetes', 'Terraform', 'AWS', 'Azure',
    'OpenAI', 'Anthropic', 'RAG', 'Redis', 'GraphQL', 'Playwright',
  ],
  experience: [
    {
      role: 'Founding Engineer, Full Stack',
      company: 'NextGen.LX',
      period: '04/2026 - Present',
      location: 'Winterbach, Germany',
      current: true,
      highlights: [
        'Launched a multilingual React website with automated deployments.',
        'Migrating a low-code app to React, NestJS, and PostgreSQL.',
        'Building AI-powered workshops and learning tools with OpenAI, Anthropic, and RAG.',
      ],
    },
    {
      role: 'Technology Analyst',
      company: 'Infosys Limited',
      period: '10/2021 - 03/2023',
      location: 'Karnataka, India',
      highlights: [
        'Built enterprise frontends and cloud-native APIs with React, TypeScript, and NestJS.',
        'Integrated 10+ services with secure authentication and role-based access.',
        'Reached 85% test coverage using Jest and Playwright.',
        'Deployed on AWS and Azure with Docker, Kubernetes, and Terraform.',
        'Mentored 10+ engineers and cut onboarding time by 30%.',
      ],
    },
    {
      role: 'Senior Systems Engineer',
      company: 'Infosys Limited',
      period: '07/2018 - 09/2021',
      location: 'Karnataka, India',
      highlights: [
        'Built 4+ enterprise apps and improved API response times by 40%.',
        'Optimized database queries by 70%, cutting processing from 7 hours to under 1.',
        'Delivered 20+ releases annually with automated tests and code reviews.',
      ],
    },
  ] satisfies ExperienceItem[],
  projects: [
    {
      name: 'ZEST',
      tagline: 'AI-Powered Recipe Assistant',
      description:
        'An AI recipe assistant for conversational search, personalized recipes, and cooking guidance.',
      stack: ['React', 'TypeScript', 'NestJS', 'PostgreSQL', 'OpenAI', 'Docker'],
      repo: 'https://github.com/Preemal10/Zest',
      icon: 'bot',
      accent: 'emerald',
    },
    {
      name: 'Hivebeat',
      tagline: 'Real-Time Mood Streaming Platform',
      description:
        'Live sentiment dashboards with WebSocket updates and a React Native companion app.',
      stack: ['Kafka', 'Node.js', 'Prisma', 'PostgreSQL', 'React Native', 'Zod'],
      repo: 'https://github.com/Preemal10/Hivebeat',
      icon: 'activity',
      accent: 'cyan',
    },
    {
      name: 'CollabNest',
      tagline: 'Real-Time Project Management',
      description:
        'A real-time Kanban platform with live tasks, team presence, and activity feeds.',
      stack: ['React 18', 'Express', 'Apollo', 'MongoDB', 'Redis', 'Socket.io'],
      repo: 'https://github.com/Preemal10/CollabNest',
      icon: 'users',
      accent: 'amber',
    },
    {
      name: 'DIALOGIC',
      tagline: 'Restaurant Recommendation Dialogue System',
      description:
        'A restaurant recommendation chatbot that handles context, typos, and negations.',
      stack: ['Python', 'Dialogue State', 'NLU', 'Relational DB'],
      repo: 'https://github.com/Preemal10/Dialogue-Systems',
      icon: 'messages',
      accent: 'sky',
    },
  ] satisfies ProjectItem[],
  skillGroups: [
    {
      title: 'Frontend',
      icon: 'layout',
      items: ['React', 'Next.js', 'Vue.js', 'Angular', 'Tailwind CSS', 'Material UI', 'Redux Toolkit'],
    },
    {
      title: 'Backend',
      icon: 'server',
      items: ['Node.js', 'Express.js', 'NestJS', 'REST', 'GraphQL', 'RabbitMQ', 'Kafka', 'Microservices'],
    },
    {
      title: 'Data',
      icon: 'database',
      items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Prisma', 'Oracle', 'SQL / PL/SQL'],
    },
    {
      title: 'Cloud & DevOps',
      icon: 'cloud',
      items: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'CI/CD'],
    },
    {
      title: 'AI & LLM',
      icon: 'sparkles',
      items: ['OpenAI API', 'Anthropic API', 'RAG', 'Prompt Engineering', 'Agentic AI', 'MCP', 'Claude Code'],
    },
    {
      title: 'Languages',
      icon: 'code',
      items: ['JavaScript (ES6+)', 'TypeScript', 'Python', 'HTML5', 'CSS3', 'English (C2)', 'German (B1)'],
    },
  ] satisfies SkillGroup[],
  education: [
    {
      degree: "Master's in Software Systems Science",
      school: 'Otto-Friedrich University',
      period: '04/2023 - 03/2026',
      location: 'Bamberg, Germany',
    },
    {
      degree: "Bachelor's in Computer Science & Engineering",
      school: 'Visvesvaraya Technological University',
      period: '07/2014 - 07/2018',
      location: 'Karnataka, India',
    },
  ] satisfies EducationItem[],
  thesis: {
    title: 'LLMs and the Social Mind: Emotion Interpretation Based on Perceived Speaker Identity',
    period: '06/2025 - 03/2026',
    points: [
      'Compared GPT-4, Claude, and Perplexity on speaker identity and emotion interpretation.',
      'Evaluated contextual consistency and social bias across LLMs.',
      'Developed guidance for fairer, human-centered AI.',
    ],
  },
  certifications: [
    { name: 'Claude 101', issuer: 'Anthropic', date: '06/2026' },
    { name: 'AI Fluency Framework & Foundations', issuer: 'Anthropic', date: '06/2026' },
    { name: 'Advanced React', issuer: 'Meta', date: '03/2025' },
    { name: 'Programming with JavaScript', issuer: 'Meta', date: '08/2024' },
    { name: 'Microsoft Certified: Azure Fundamentals (AZ-900)', issuer: 'Microsoft', date: '02/2022' },
    { name: 'Oracle Certified Foundations Associate', issuer: 'Oracle', date: '02/2022' },
  ],
};
