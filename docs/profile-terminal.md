# Profile terminal

The About terminal uses classifier.dev as its core natural-language question router. It runs on static hosting without a backend, runtime SDK, generative model, or API key.

## Routing

1. Explicit commands (`help`, `projects`, `/skills`, `clear`, etc.) run locally without a network call.
2. Natural-language questions go to `https://classifier.dev` using the fast tier. There is no opt-in toggle or input hint footer. No request is made on mount, typing, or reload.
3. Only the current question is sent, with fixed routing labels/instructions. Both `share_data: false` and `X-Classifier-Share-Data: false` disable training data sharing. Credentials and referrers are omitted.
4. Known labels with numeric confidence >= 0.8 select curated, profile-backed answers. Local entity matching can narrow that answer only when its topic agrees with the classifier. Unsupported, unknown, malformed, low-confidence, or null-confidence results return clarification, not a local override.
5. Network failures, timeouts, and rate limits degrade to a local match where possible, clearly labeled as local recovery. Otherwise the terminal suggests commands. Exact repeated questions reuse session-cached classification results.

Classification is not fact verification or generative answering. Profile facts always come from `src/data/profile.ts`.

## Concise conversation

Answers show a short overview or one focused profile item instead of full lists of highlights. Three follow-up buttons sit outside the scrolling transcript, directly above the input. They update from the latest answer, prefer prompts not yet asked in the current conversation, and reset to the welcome prompts on clear. Prompts are self-contained, so no conversation history needs to be sent to the classifier. The buttons remain visible (disabled while a request is pending).

The API's OPTIONS and POST responses were checked during initial implementation: CORS permits browser requests and POST confirmed `X-Classifier-Data-Sharing: off`. Availability, CORS policy, and anonymous limits can change. There is no hidden proxy or paid API fallback.

## Boundaries

- 400 characters per question, one network request at a time, six-second timeout.
- Three-second client-side cooldown; no automatic retries. Client limits are UX safeguards, not server-side abuse protection.
- At most 30 transcript exchanges and 50 cached classification results, held in memory only. There is no separate command history or Up/Down recall.
- Cancel and clear abort in-flight work. Cancellation cannot retract a question already sent to the provider.
- Clear resets transcript/cache; reload also discards all session state.
- Input is rendered as React text, not HTML, and never executed. Answer links come only from profile data or fixed internal section links.
- No fabricated token meter. The classifier has its own usage accounting and anonymous service limits; answers do not invoke a generative LLM.

## Files

- `src/components/terminal/`: terminal UI and answer rendering.
- `src/hooks/useTerminal.ts`: transcript, cancellation, caching, request lifecycle.
- `src/lib/terminal/`: command/local recovery routing, classifier adapter, answer builders, tests.
- `src/data/profile.ts`: authoritative public profile facts.

## Validation

Run `npm test`, `npm run typecheck`, `npm run lint`, and `npm run build`.

Manual browser checks:

- Try `help` and `/projects`: neither should call the classifier.
- Submit “Have you worked with React?”: the classifier should be called without enabling anything, sending only that question with sharing disabled.
- Repeat that exact question: the session cache should prevent another request.
- Try an unrelated or ambiguous question and confirm clarification rather than invented facts.
- Check offline recovery, cancel, and clear while waiting.
- Check Enter submission, normal Up/Down behavior (no command recall), Tab completion then focus movement, mobile widths, and reduced motion.
- Scroll up before submitting: responses should not pull you away from older messages; use Jump to latest.

Browser automation was intentionally not used at the user's request.
