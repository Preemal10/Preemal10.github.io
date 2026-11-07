import { useCallback, useEffect, useRef, useState } from 'react';
import { buildAnswer, clarification, help } from '@/lib/terminal/answers';
import { classifyQuestion } from '@/lib/terminal/classifier';
import { routeCommand, routeLocally } from '@/lib/terminal/router';
import { MAX_INPUT, type Answer, type Message, type Topic } from '@/lib/terminal/types';

export function useTerminal() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [pending, setPending] = useState<string | null>(null);
  const controller = useRef<AbortController | null>(null);
  const cache = useRef(new Map<string, Topic | null>());
  const lastRequest = useRef(0);
  const nextId = useRef(0);

  useEffect(() => () => controller.current?.abort(), []);

  const cancel = useCallback(() => {
    controller.current?.abort();
    controller.current = null;
    setPending(null);
  }, []);

  const clear = useCallback(() => {
    cancel();
    setMessages([]);
    cache.current.clear();
  }, [cancel]);

  async function submit(raw: string) {
    const question = raw.trim();
    if (!question || question.length > MAX_INPUT) return;
    const route = routeCommand(question);
    if (route && 'command' in route && route.command === 'clear') { clear(); return; }
    if (controller.current) return;
    const append = (answer: Answer, source: Message['source'] = 'local') => {
      const message = { id: nextId.current++, question, answer, source };
      setMessages(previous => [...previous, message].slice(-30));
    };
    // Explicit commands are deterministic. Every natural-language question uses the classifier.
    if (route) {
      append('command' in route ? help : buildAnswer(route.topic, route.entity));
      return;
    }
    const local = routeLocally(question);
    const classifiedAnswer = (topic: Topic | null) => topic
      ? buildAnswer(topic, local && 'topic' in local && local.topic === topic ? local.entity : undefined)
      : clarification();
    const recoverLocally = (reason: string) => {
      if (local && 'topic' in local) {
        const answer = buildAnswer(local.topic, local.entity);
        append({ ...answer, text: `${reason}\nShowing a local profile match instead.\n\n${answer.text}` });
      } else {
        append(clarification(reason));
      }
    };
    // Exact trimmed questions only: don't conflate punctuation-sensitive technologies.
    if (cache.current.has(question)) {
      append(classifiedAnswer(cache.current.get(question) ?? null), 'classifier');
      return;
    }
    if (Date.now() - lastRequest.current < 3000) {
      recoverLocally('Please wait a few seconds before another classifier lookup.');
      return;
    }
    const request = new AbortController();
    controller.current = request;
    lastRequest.current = Date.now();
    setPending(question);
    const timeout = window.setTimeout(() => request.abort(), 6000);
    try {
      const topic = await classifyQuestion(question, request.signal);
      if (controller.current !== request) return;
      if (cache.current.size >= 50) cache.current.delete(cache.current.keys().next().value!);
      cache.current.set(question, topic);
      append(classifiedAnswer(topic), 'classifier');
    } catch (error) {
      if (controller.current !== request) return;
      const reason = request.signal.aborted ? 'Classifier timed out. Local commands still work.'
        : error instanceof Error && error.message.startsWith('Classifier') ? error.message
        : 'Couldn’t reach the classifier. Local commands still work.';
      recoverLocally(reason);
    } finally {
      window.clearTimeout(timeout);
      if (controller.current === request) {
        controller.current = null;
        setPending(null);
      }
    }
  }

  return { messages, pending, submit, clear, cancel };
}
