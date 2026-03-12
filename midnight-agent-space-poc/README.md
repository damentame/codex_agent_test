# Midnight Agent Space PoC

A minimal Node.js + TypeScript proof of concept that creates one agent, sends one prompt through the OpenAI Responses API, and prints both raw and cleaned output.

## Purpose

This PoC validates that:

- agent initialization works,
- a prompt can be sent successfully,
- repo/runtime settings can be passed dynamically,
- provider logic is abstracted so another backend can be swapped in later.

## Project structure

```text
midnight-agent-space-poc/
  src/
    config/
      agentConfig.ts
    providers/
      AgentProvider.ts
      OpenAIAgentProvider.ts
    app/
      runAgentTest.ts
    index.ts
  .env.example
  package.json
  tsconfig.json
  README.md
```

## Install

```bash
npm install
```

## Configure environment

1. Copy `.env.example` to `.env`.
2. Set your OpenAI API key and any optional repo/runtime overrides.

```bash
cp .env.example .env
```

Required:

- `OPENAI_API_KEY`

Recommended defaults:

- `OPENAI_MODEL=gpt-5.2-codex`

## Run the PoC

```bash
npm run dev
```

Expected console output includes:

- selected provider,
- selected model,
- loaded repo name/branch,
- raw response object,
- final short text response.

## Where to change repo config

- Defaults and env wiring: `src/config/agentConfig.ts`
- Runtime flow using repo config: `src/app/runAgentTest.ts`

## Where to swap providers later

- Provider contract: `src/providers/AgentProvider.ts`
- Current OpenAI implementation: `src/providers/OpenAIAgentProvider.ts`

To add a second backend, implement `AgentProvider` and replace construction logic in `runAgentTest.ts`.

## Security note

- Never commit `.env`.
- Keep only `.env.example` in version control.
