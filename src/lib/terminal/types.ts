export const topics = {
  about: 'profile overview',
  experience: 'work experience',
  skills: 'technical skills',
  projects: 'projects',
  education: 'education and certifications',
  research: 'research',
  contact: 'contact information',
  authorization: 'work authorization',
} as const;

export type Topic = keyof typeof topics;
export type Command = Topic | 'help' | 'clear';
export type Answer = {
  title: string;
  text: string;
  links?: { label: string; href: string }[];
  suggestions?: string[];
};
export type Message = {
  id: number;
  question: string;
  answer: Answer;
  source: 'local' | 'classifier';
};
export type Route = { topic: Topic; entity?: string } | { command: 'help' | 'clear' };
export const commands: Command[] = ['help', ...Object.keys(topics) as Topic[], 'clear'];
export const MAX_INPUT = 400;
