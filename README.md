# DaisyCode

Terminal AI coding agent. Plan and build inside your local project with free-tier models — no accounts, no billing.

## Stack

- Bun
- OpenTUI + React CLI
- Hono API
- Prisma + local SQLite
- AI SDK + OpenCode Zen / xAI Grok / Cerebras

## Features

- **Terminal AI chat** — coding assistant in your terminal
- **Plan and Build modes** — read-only planning or write/edit/shell tools
- **Streaming responses** — persisted session history
- **Local project tools** — read, list, glob, grep, write, edit, bash
- **Multi-provider free tier** — OpenCode Zen, Grok (xAI), and Cerebras
- **Bring your own keys** — run with any one provider key, or mix them
- **No auth / no payments** — works immediately without an account

## Prerequisites

- [Bun](https://bun.sh) installed
- At least **one** provider API key:
  - [OpenCode Zen](https://opencode.ai/zen), and/or
  - [xAI Grok](https://console.x.ai), and/or
  - [Cerebras](https://cloud.cerebras.ai)

Sessions are stored in a local SQLite file automatically. No Postgres/Neon setup is required.

## Install

```bash
git clone https://github.com/Anurag13075/daisycode.git
cd daisycode
bun install
```

## Configure

```bash
cp .env.example .env
```

Fill in:

```bash
API_URL=http://localhost:3000

# Use any combination — only one is required for chat
OPENCODE_API_KEY=
XAI_API_KEY=
CEREBRAS_API_KEY=
```

`DATABASE_URL` is optional. By default DaisyCode uses
`packages/database/prisma/daisycode.db`.

DaisyCode starts as long as **at least one** of those keys is set:

| Situation | What happens |
|-----------|--------------|
| Only `OPENCODE_API_KEY` | OpenCode free models work |
| Only `XAI_API_KEY` (or `GROK_API_KEY`) | Grok models work |
| Only `CEREBRAS_API_KEY` | Cerebras models work |
| Multiple keys | All matching models are available; default prefers OpenCode → Grok → Cerebras |

## Database

```bash
bun run db:generate
bun run db:push
```

`bun run dev:server` also runs `db:push` automatically.

## Run

Terminal 1 — API:

```bash
bun run dev:server
```

API listens on `http://localhost:3000`.

Terminal 2 — CLI:

```bash
bun run dev:cli
```

Or build and link the binary:

```bash
bun run link:cli
daisycode
```

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev:cli` | CLI in watch mode |
| `bun run dev:server` | Hono server with hot reload |
| `bun run build:cli` | Build the CLI package |
| `bun run build:server` | Build the server package |
| `bun run link:cli` | Build and link the `daisycode` executable |
| `bun run db:generate` | Generate Prisma client |
| `bun run db:push` | Create/update the local SQLite database |

## Project structure

```
packages/
├── cli/        # OpenTUI + React terminal client
├── database/   # Prisma schema and client
├── server/     # Hono API + AI streaming
└── shared/     # Schemas, tools, free model registry
```

## Packages

| Package | Description |
|---------|-------------|
| `@daisycode/cli` | Terminal UI and local tool execution |
| `@daisycode/server` | Hono API and multi-provider streaming |
| `@daisycode/database` | Prisma client and schema |
| `@daisycode/shared` | Shared Zod schemas, tools, free models |

## Free models

### OpenCode Zen (`OPENCODE_API_KEY`)

- `opencode/deepseek-v4-flash-free`
- `opencode/mimo-v2.5-free`
- `opencode/nemotron-3-ultra-free`
- `opencode/laguna-s-2.1-free`
- `opencode/big-pickle`

### Grok / xAI (`XAI_API_KEY` or `GROK_API_KEY`)

- `grok/grok-code-fast-1`
- `grok/grok-3-mini`
- `grok/grok-4-1-fast-non-reasoning`

### Cerebras (`CEREBRAS_API_KEY`)

- `cerebras/gpt-oss-120b`
- `cerebras/gemma-4-31b`
- `cerebras/llama3.1-8b`

Default model is the first available provider in this order: OpenCode → Grok → Cerebras.

## CLI commands

| Command | Action |
|---------|--------|
| `/new` | New conversation |
| `/agents` | Switch Plan / Build |
| `/models` | Pick a free model |
| `/sessions` | Browse sessions |
| `/theme` | Change theme |
| `/exit` | Quit |

Press `tab` to toggle agents. Use `@` to mention files.
