import { profile } from '@/data/profile';
import { containsPhrase, normalize } from './router';
import { commands, type Answer, type Message, type Topic } from './types';

export const welcome: Answer = {
  title: `Hello, I'm ${profile.name}.`,
  text: `${profile.summary}\n\nAsk me anything via this chat`,
  suggestions: ['Current role?', 'What have you built?', 'Tech stack?'],
};

export const help: Answer = {
  title: 'Ask a question or try a command.',
  text: commands.join(' · '),
  suggestions: welcome.suggestions,
};

export function clarification(reason?: string): Answer {
  return {
    title: 'Let’s clarify that directly.',
    text: reason ?? 'I couldn’t find that information on this website. Please send me a message on LinkedIn or by email for clarification.',
    links: [{ label: 'Message me on LinkedIn', href: profile.linkedin }],
    suggestions: ['Tech stack?', 'What have you built?', 'How can I contact you?'],
  };
}

/** Keep prompts self-contained: only the selected question is sent to the classifier. */
export function getFollowUps(messages: Message[]): string[] {
  const asked = new Set(messages.map(message => normalize(message.question)));
  const latest = messages[messages.length - 1]?.answer.suggestions ?? welcome.suggestions ?? [];
  const alternatives = [
    ...profile.projects.map(project => `Tell me about ${project.name}`),
    'Tell me about your research', 'Where did you study?', 'How can I contact you?',
    ...profile.experience.map(job => `Your work at ${job.company}?`),
    ...profile.skillGroups.flatMap(group => group.items.slice(0, 1).map(skill => `Your experience with ${skill}?`)),
  ];
  const candidates = [...new Set([...latest, ...welcome.suggestions!, ...alternatives])];
  const unseen = candidates.filter(prompt => !asked.has(normalize(prompt)));
  // Keep three actions even once every available prompt has been explored.
  return [...unseen, ...candidates.filter(prompt => asked.has(normalize(prompt)))].slice(0, 3);
}

export function buildAnswer(topic: Topic, entity?: string): Answer {
  switch (topic) {
    case 'about':
      return { title: `${profile.name} · ${profile.location}`, text: profile.summary, suggestions: welcome.suggestions };
    case 'experience': {
      const job = (entity && profile.experience.find(e => e.company === entity)) || profile.experience.find(e => e.current) || profile.experience[0];
      return {
        title: `${job.role} · ${job.company}`,
        text: `${job.period}\n${job.highlights[0]}`,
        links: [{ label: 'Full career timeline', href: '#experience' }],
        suggestions: [...new Set(profile.experience.filter(e => e.company !== job.company).map(e => `Your work at ${e.company}?`)), 'What have you built?', 'Tech stack?'],
      };
    }
    case 'skills': {
      if (entity) {
        const group = profile.skillGroups.find(g => g.items.some(i => containsPhrase(i, entity)));
        const evidence = profile.experience.flatMap(e => e.highlights.filter(h => containsPhrase(h, entity)))[0];
        return {
          title: `${entity}${group ? ` · ${group.title}` : ''}`,
          text: evidence ?? `${entity} is part of my published technology stack.`,
          suggestions: [...profile.projects.filter(p => p.stack.some(s => containsPhrase(s, entity))).slice(0, 2).map(p => `Tell me about ${p.name}`), 'Current role?', 'Tech stack?'],
        };
      }
      return {
        title: 'My core stack',
        text: profile.skillGroups.map(g => `${g.title}: ${g.items.slice(0, 3).join(', ')}`).join('\n'),
        suggestions: ['Your experience with React?', 'Your experience with OpenAI?', 'Your experience with AWS?'],
      };
    }
    case 'projects': {
      const project = entity ? profile.projects.find(p => p.name === entity) : undefined;
      if (project) {
        return {
          title: `${project.name} · ${project.tagline}`,
          text: `${project.description}\n${project.stack.slice(0, 4).join(' · ')}`,
          links: [{ label: 'View on GitHub', href: project.repo }],
          suggestions: [...profile.projects.filter(p => p.name !== project.name).slice(0, 2).map(p => `Tell me about ${p.name}`), `Your experience with ${project.stack[0]}?`],
        };
      }
      return {
        title: 'A few things I’ve built',
        text: profile.projects.map(p => `${p.name} — ${p.tagline}`).join('\n'),
        suggestions: profile.projects.map(p => `Tell me about ${p.name}`),
      };
    }
    case 'education':
      return {
        title: 'Education',
        text: profile.education.map(e => `${e.degree}\n${e.school} · ${e.period}`).join('\n\n'),
        links: [{ label: 'Education & certifications', href: '#education' }],
        suggestions: ['Tell me about your research', 'Tech stack?', 'Current role?'],
      };
    case 'research':
      return {
        title: profile.thesis.title,
        text: profile.thesis.points[0],
        suggestions: ['Your experience with OpenAI?', 'Tell me about ZEST', 'Where did you study?'],
      };
    case 'contact':
      return {
        title: 'Let’s connect.', text: `Based in ${profile.location}. Connect on LinkedIn or explore my code on GitHub.`,
        links: [{ label: 'LinkedIn', href: profile.linkedin }, { label: 'GitHub', href: profile.github }],
        suggestions: ['Are you authorized to work in Germany?', 'Current role?', 'What have you built?'],
      };
    case 'authorization':
      return { title: 'Work authorization', text: profile.workPermit, suggestions: ['How can I contact you?', 'Current role?', 'Tech stack?'] };
  }
}
