import { profile } from '@/data/profile';
import { commands, type Route, type Topic } from './types';

export function normalize(input: string) {
  return input.toLowerCase().trim().replace(/[^a-z0-9+#]+/g, ' ').replace(/\s+/g, ' ').trim();
}

export function containsPhrase(input: string, phrase: string) {
  return ` ${normalize(input)} `.includes(` ${normalize(phrase)} `);
}

const phrases: Record<Topic, string[]> = {
  about: ['who are you', 'tell me about yourself', 'summary', 'where are you based', 'location', 'introduce yourself'],
  experience: ['experience', 'career', 'current role', 'currently', 'work history', 'doing now', 'doing currently', 'worked at', 'working on', 'years'],
  skills: ['skills', 'tech stack', 'technologies', 'programming languages', 'speak', 'languages', 'ai experience', 'cloud', 'frontend', 'backend'],
  projects: ['projects', 'portfolio', 'built', 'building', 'open source'],
  education: ['education', 'degree', 'university', 'studied', 'study', 'certifications', 'certificates'],
  research: ['research', 'thesis', 'social bias', 'emotion interpretation'],
  contact: ['contact', 'reach you', 'get in touch', 'github', 'linkedin', 'website'],
  authorization: ['work permit', 'work authorization', 'authorized to work', 'eligible to work', 'right to work'],
};

export function routeCommand(input: string): Route | null {
  const command = input.trim().toLowerCase().replace(/^\//, '');
  if (commands.includes(command as typeof commands[number])) {
    return command === 'help' || command === 'clear'
      ? { command }
      : { topic: command as Topic };
  }
  if (command === 'compact' || command === 'whoami') return { topic: 'about' };
  return null;
}

export function routeLocally(input: string): Route | null {
  const command = routeCommand(input);
  if (command) return command;
  // These details aren't published. Never turn them into a seemingly factual answer.
  if (/\b(salary|compensation|available|availability|hiring|married|age|birthday|phone|email|address|sponsorship)\b/i.test(input)) return null;
  const entities: { topic: Topic; entity: string }[] = [
    ...profile.projects.map(p => ({ topic: 'projects' as const, entity: p.name })),
    ...profile.experience.map(p => ({ topic: 'experience' as const, entity: p.company })),
    ...[...new Set([...profile.skillGroups.flatMap(g => g.items), ...profile.techMarquee])]
      .map(entity => ({ topic: 'skills' as const, entity })),
  ];
  const matches = entities.filter(e => containsPhrase(input, e.entity));
  const matchedTopics = new Set(matches.map(e => e.topic));
  if (matchedTopics.size > 1) return null;
  if (matchedTopics.size === 1) {
    // A project/company match can be specific; multiple technologies get the full skills answer.
    return { topic: matches[0].topic, entity: matches.length === 1 ? matches[0].entity : undefined };
  }
  const hits = (Object.keys(phrases) as Topic[]).filter(topic =>
    phrases[topic].some(phrase => containsPhrase(input, phrase)));
  return hits.length === 1 ? { topic: hits[0] } : null;
}
