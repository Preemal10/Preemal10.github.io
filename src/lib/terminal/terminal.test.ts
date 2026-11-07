import { afterEach, describe, expect, it, vi } from 'vitest';
import { profile } from '@/data/profile';
import { buildAnswer, getFollowUps, welcome } from './answers';
import { classifyQuestion, parseClassification, UNSUPPORTED } from './classifier';
import { routeCommand, routeLocally } from './router';
import { commands, MAX_INPUT, topics, type Topic } from './types';

afterEach(() => vi.unstubAllGlobals());

describe('local routing and profile answers', () => {
  it.each(['Tell me about yourself', 'Have you worked with React?', 'Tell me about ZEST', 'What is the weather?'])('sends natural questions to core classification rather than command routing: %s', question => {
    expect(routeCommand(question)).toBeNull();
  });
  it.each(commands)('keeps the explicit %s command local', command => {
    expect(routeCommand(command)).not.toBeNull();
  });
  it.each(commands)('recognizes /%s', command => {
    expect(routeLocally(`/${command}`)).toEqual(command === 'clear' || command === 'help' ? { command } : { topic: command });
  });
  it.each([
    ['Tell me about yourself', 'about'],
    ['What are you doing currently?', 'experience'],
    ['What is your tech stack?', 'skills'],
    ['What have you built?', 'projects'],
    ['Tell me about your education', 'education'],
    ['Are you authorized to work in Germany?', 'authorization'],
    ['Tell me about your thesis', 'research'],
    ['How can I get in touch?', 'contact'],
  ])('routes %s locally', (question, topic) => {
    expect(routeLocally(question)).toMatchObject({ topic });
  });
  it('matches profile entities without matching substrings', () => {
    expect(routeLocally('Have you worked with React?')).toEqual({ topic: 'skills', entity: 'React' });
    expect(routeLocally('Tell me about ZEST')).toEqual({ topic: 'projects', entity: 'ZEST' });
    expect(routeLocally('What is your reaction?')).toBeNull();
  });
  it.each(['What is the weather?', 'What salary at Infosys?', 'Skills and education?', 'Are you available for React work?'])('does not guess: %s', question => {
    expect(routeLocally(question)).toBeNull();
  });
  it('builds every topic from current profile content', () => {
    for (const topic of Object.keys(topics) as Topic[]) {
      const answer = buildAnswer(topic);
      expect(answer.title).toBeTruthy();
      expect(answer.text).toBeTruthy();
      expect(answer.text).not.toContain('undefined');
    }
    expect(buildAnswer('about').text).toContain(profile.summary);
    expect(buildAnswer('authorization').text).toBe(profile.workPermit);
    expect(buildAnswer('research').title).toBe(profile.thesis.title);
    expect(buildAnswer('projects', 'ZEST').links).toHaveLength(1);
    expect(buildAnswer('skills', 'React').title).toContain('Frontend');
  });
});

describe('concise answers and contextual follow-ups', () => {
  it('starts with the three welcome prompts', () => {
    expect(getFollowUps([])).toEqual(['Current role?', 'What have you built?', 'Tech stack?']);
  });
  it('offers project details after the project overview', () => {
    const answer = buildAnswer('projects');
    const prompts = getFollowUps([{ id: 1, question: 'What have you built?', answer, source: 'classifier' }]);
    expect(prompts).toEqual(profile.projects.slice(0, 3).map(p => `Tell me about ${p.name}`));
  });
  it('uses conversation history to avoid repeated prompts', () => {
    const prompts = getFollowUps([
      { id: 1, question: 'Tell me about ZEST', answer: buildAnswer('projects', 'ZEST'), source: 'classifier' },
      { id: 2, question: 'What have you built?', answer: buildAnswer('projects'), source: 'classifier' },
    ]);
    expect(prompts).not.toContain('Tell me about ZEST');
    expect(prompts).toHaveLength(3);
    expect(new Set(prompts).size).toBe(3);
  });
  it('keeps follow-ups available after clarification or help', () => {
    expect(getFollowUps([{ id: 1, question: 'help', answer: { title: 'Help', text: 'Commands' }, source: 'local' }])).toEqual(welcome.suggestions);
  });
  it('keeps each topic short with drill-down suggestions', () => {
    for (const topic of Object.keys(topics) as Topic[]) {
      const answer = buildAnswer(topic);
      expect(answer.text.length).toBeLessThan(600);
      expect(answer.suggestions!.length).toBeGreaterThanOrEqual(3);
    }
    expect(buildAnswer('experience').text).not.toContain(profile.experience[1].company);
  });
});

describe('classifier boundary', () => {
  it('accepts a supported high-confidence topic', () => {
    expect(parseClassification({ results: [{ label: 'technical skills', confidence: 0.8 }] })).toBe('skills');
  });
  it.each([null, {}, { results: [] }, { results: [null] },
    { results: [{ label: 'technical skills', confidence: null }] },
    { results: [{ label: 'technical skills', confidence: 0.79 }] },
    { results: [{ label: 'technical skills', confidence: 2 }] },
    { results: [{ label: 'technical skills', confidence: NaN }] },
    { results: [{ label: 'technical skills', confidence: '0.99' }] },
    { results: [{ label: UNSUPPORTED, confidence: 0.99 }] },
    { results: [{ label: 'invented', confidence: 0.99 }] },
  ])('rejects unsafe/uncertain results: %j', response => {
    expect(parseClassification(response)).toBeNull();
  });
  it('sends only one question with explicit privacy settings', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ results: [{ label: 'projects', confidence: 0.9 }] })));
    vi.stubGlobal('fetch', fetchMock);
    const signal = new AbortController().signal;
    expect(await classifyQuestion('What have you shipped?', signal)).toBe('projects');
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe('https://classifier.dev');
    expect(options).toMatchObject({ method: 'POST', credentials: 'omit', referrerPolicy: 'no-referrer', signal });
    expect(options.headers['X-Classifier-Share-Data']).toBe('false');
    const payload = JSON.parse(options.body);
    expect(payload).toMatchObject({ share_data: false, tier: 'fast', input: 'What have you shipped?' });
    expect(payload.labels).toContain(UNSUPPORTED);
    expect(payload).not.toHaveProperty('profile');
    expect(payload).not.toHaveProperty('history');
  });
  it.each([403, 429, 500])('fails gracefully on HTTP %s', async status => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('', { status })));
    await expect(classifyQuestion('Question', new AbortController().signal)).rejects.toThrow('Classifier');
  });
  it('propagates invalid JSON and network errors for the UI to handle', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('<html>error</html>')));
    await expect(classifyQuestion('Question', new AbortController().signal)).rejects.toThrow();
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
    await expect(classifyQuestion('Question', new AbortController().signal)).rejects.toThrow();
  });
  it('never fetches empty or oversized input', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    for (const question of [' ', 'a'.repeat(MAX_INPUT + 1)]) {
      await expect(classifyQuestion(question, new AbortController().signal)).rejects.toThrow();
    }
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
