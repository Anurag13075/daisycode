# DaisyCode

Terminal AI coding agent. Plan and build inside your local project with free OpenCode models — no accounts, no billing.

## Stack

- Bun
- OpenTUI + React CLI
- Hono API
- Prisma + PostgreSQL
- AI SDK + OpenCode Zen (free models only)

## Features

- **Terminal AI chat** — coding assistant in your terminal
- **Plan and Build modes** — read-only planning or write/edit/shell tools
- **Streaming responses** — persisted session history
- **Local project tools** — read, list, glob, grep, write, edit, bash
- **Free models only** — OpenCode Zen free tier (DeepSeek Flash Free, MiMo Free, Nemotron Ultra Free, Laguna Free, Big Pickle)
- **No auth / no payments** — works immediately without an account

## Prerequisites

- [Bun](https://bun.sh) installed
- PostgreSQL database (e.g. [Neon](https://neon.tech))
- Free [OpenCode Zen](https://opencode.ai/zen) API key

## Install

```bash
git clone <your-repo-url>
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
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
OPENCODE_API_KEY=your-opencode-zen-api-key
```

Get `OPENCODE_API_KEY` from [OpenCode Zen](https://opencode.ai/zen) (sign in and copy your API key). Free models do not require paid credits.

## Database

```bash
bun run --cwd packages/database db:generate
```

Apply the Prisma schema to your Postgres database (for example `bunx prisma db push` from `packages/database`).

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
| `bun run --cwd packages/database db:generate` | Generate Prisma client |

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
| `@daisycode/server` | Hono API and OpenCode streaming |
| `@daisycode/database` | Prisma client and schema |
| `@daisycode/shared` | Shared Zod schemas, tools, free models |

## Free models

The model selector includes only:

- `opencode/deepseek-v4-flash-free`
- `opencode/mimo-v2.5-free`
- `opencode/nemotron-3-ultra-free`
- `opencode/laguna-s-2.1-free`
- `opencode/big-pickle`

Default model: `opencode/deepseek-v4-flash-free`.

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
