<div align="center">

# 🌼 DaisyCode

**A free, open AI coding workspace — built as an alternative to OpenCode.**

Build, modify, debug, and understand software using natural language, powered by free AI models.

No mandatory authentication. No payments. No subscriptions.

![DaisyCode](./Screenshot%202026-08-13%20114444.png)

[![Made with Bun](https://img.shields.io/badge/Runtime-Bun-fbf0df?style=flat-square&logo=bun)](https://bun.sh)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/Frontend-React-61dafb?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-4169e1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-Open%20Source-brightgreen?style=flat-square)](#)
[![Built for AO Hackathon](https://img.shields.io/badge/Built%20for-AO%20Hackathon-purple?style=flat-square)](#)

</div>

---

## 📚 Table of Contents

- [Features](#-features)
- [How It Works](#-how-it-works)
- [System Architecture](#-system-architecture)
- [Agent Workflow](#-agent-workflow-sequence)
- [Free Models](#-free-models)
- [How AO Was Used](#-how-ao-was-used)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Run Locally](#-run-locally)
- [Troubleshooting](#-troubleshooting)
- [Security](#-security)
- [Roadmap](#-roadmap)
- [Links](#-links)
- [Author](#-author)

---

## ✨ Features

| Category | Capability |
|---|---|
| 🧠 AI Agent | Natural-language driven development |
| 🔍 Codebase Awareness | Understands existing project structure and logic |
| ✏️ File Operations | Creates and edits files directly |
| 💻 Terminal Access | Runs commands as part of the workflow |
| 🐛 Debugging | Detects, analyzes, and fixes errors |
| 🔁 Iteration | Repeats plan → act → verify until the task is done |
| 💸 Free Models | No OpenAI or Claude dependency required |
| 🔓 No Lock-in | No payment system, no mandatory authentication |
| 🛠️ Developer-First | Built for real coding workspaces, not demos |
| 🎛️ Flexible | Model selection and configurable agent workflow |

---

## 🧭 How It Works

```mermaid
flowchart LR
    A[👤 Developer] -->|Natural language prompt| B[🌼 DaisyCode]
    B --> C[🤖 AI Agent]
    C --> D[📂 Understand Codebase]
    D --> E[🗺️ Plan]
    E --> F[✏️ Edit Files]
    F --> G[💻 Run Commands]
    G --> H{Error?}
    H -->|Yes| C
    H -->|No| I[✅ Completed Task]

    style A fill:#fef3c7,stroke:#f59e0b
    style B fill:#fce7f3,stroke:#db2777
    style C fill:#dbeafe,stroke:#2563eb
    style I fill:#dcfce7,stroke:#16a34a
    style H fill:#fee2e2,stroke:#dc2626
```

The agent inspects a project, understands the existing implementation, makes changes, runs commands, analyzes errors, and iterates until the requested task is completed — without needing constant hand-holding.

---

## 🏗️ System Architecture

```mermaid
graph TB
    subgraph Client["🖥️ Client Layer"]
        UI[React + TypeScript UI]
    end

    subgraph Server["⚙️ Server Layer"]
        API[Bun Server / API_URL]
        Agent[Agent Orchestrator]
        Runner[Command Runner]
    end

    subgraph Data["🗄️ Data Layer"]
        DB[(PostgreSQL / Neon)]
    end

    subgraph Models["🧠 Model Providers"]
        Free[Free OpenCode Models]
    end

    UI <-->|HTTP/WebSocket| API
    API --> Agent
    Agent --> Runner
    Agent <--> Free
    API <--> DB
    Runner -->|reads/writes| Repo[(Local Repository)]

    style Client fill:#eff6ff,stroke:#3b82f6
    style Server fill:#fdf4ff,stroke:#a855f7
    style Data fill:#f0fdf4,stroke:#22c55e
    style Models fill:#fffbeb,stroke:#f59e0b
```

---

## 🔄 Agent Workflow (Sequence)

```mermaid
sequenceDiagram
    actor Dev as Developer
    participant UI as DaisyCode UI
    participant Agent as AI Agent
    participant FS as File System
    participant Term as Terminal

    Dev->>UI: Describe task in natural language
    UI->>Agent: Forward prompt + repo context
    Agent->>FS: Read relevant files
    FS-->>Agent: Return code/context
    Agent->>Agent: Plan implementation steps
    Agent->>FS: Create / edit files
    Agent->>Term: Run build / test commands
    Term-->>Agent: Output or error logs

    alt Error occurred
        Agent->>Agent: Analyze error
        Agent->>FS: Apply fix
        Agent->>Term: Re-run command
    else Success
        Agent-->>UI: Report completion
    end

    UI-->>Dev: ✅ Task completed
```

---

## 🆓 Free Models

DaisyCode is designed to work with free model providers instead of requiring paid OpenAI or Claude APIs.

```mermaid
pie title Model Selection Philosophy
    "Free OpenCode Models" : 70
    "Local Models (Planned)" : 20
    "Other Providers" : 10
```

Examples include free OpenCode models such as:

```
opencode/deepseek-v4-flash-free
opencode/mimo-v2.5-free
opencode/nemotron-3-ultra-free
opencode/laguna-s-2.1-free
opencode/big-pickle
```

> Model availability depends on the provider and can change over time.

---

## 🤝 How AO Was Used

DaisyCode was built as a solo project for the **AO Hackathon** using **Agent Orchestrator**.

```mermaid
flowchart TD
    A[Project Planning] --> B[Repository Exploration]
    B --> C[Feature Implementation]
    C --> D[File Creation & Editing]
    D --> E[Debugging]
    E --> F[Running Commands]
    F --> G[Testing]
    G --> H[UI Iteration]
    H --> I[Fixing Development Errors]
    I -->|Repeat as needed| C

    style A fill:#e0e7ff,stroke:#4f46e5
    style I fill:#dcfce7,stroke:#16a34a
```

AO was part of the **actual development process**, not just included as a demonstration — it was used throughout for planning, exploration, implementation, debugging, and iteration.

---

## 🧰 Tech Stack

```mermaid
mindmap
  root((DaisyCode))
    Frontend
      React
      TypeScript
    Runtime
      Bun
    Database
      PostgreSQL
      Neon
    AI
      OpenCode free models
      Agent Orchestrator
    Tooling
      Git
```

---

## 📁 Project Structure

```
daisycode/
├── packages/
│   ├── database/
│   ├── server/
│   └── ...
├── .env.example
├── package.json
├── bun.lock
└── README.md
```

---

## 🚀 Run Locally

### 1. Clone

```bash
git clone https://github.com/Anurag13075/daisycode.git
cd daisycode
```

### 2. Install dependencies

```bash
bun install
```

### 3. Create environment file

**Windows (PowerShell):**
```powershell
Copy-Item .env.example .env
```

**macOS/Linux:**
```bash
cp .env.example .env
```

### 4. Configure `.env`

```env
API_URL=http://localhost:3000
DATABASE_URL="your-postgresql-connection-string"
OPENCODE_API_KEY=
```

- Add your PostgreSQL connection string to `DATABASE_URL`.
- `.env.example` is only a template — the application reads values from `.env`.

### 5. Start the server

```bash
bun run dev:server
```

The development server runs on:

```
http://localhost:3000
```

---

## 🛠️ Troubleshooting

**`DATABASE_URL` is not set**

Make sure `.env` exists and contains:

```env
DATABASE_URL="your-postgresql-connection-string"
```

**Port 3000 is already in use**

Windows:
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

Then restart:
```bash
bun run dev:server
```

---

## 🔒 Security

Never commit `.env` or expose database credentials and API keys.

```
.env
.env.local
```

should remain private.

---

## 🗺️ Roadmap

```mermaid
timeline
    title DaisyCode Roadmap
    Now : More free model providers
        : Better repository indexing
    Next : Local models through Ollama
         : Git integration
         : Automated testing
    Later : Multiple agents
          : MCP support
          : Improved agent permissions
          : Better context management
```

- [ ] More free model providers
- [ ] Local models through Ollama
- [ ] Better repository indexing
- [ ] Git integration
- [ ] Automated testing
- [ ] Multiple agents
- [ ] MCP support
- [ ] Improved agent permissions
- [ ] Better context management

---

## 🔗 Links

- **GitHub:** [github.com/Anurag13075/daisycode](https://github.com/Anurag13075/daisycode)
- **X (Twitter):** [@AnuragShar74342](https://x.com/AnuragShar74342/status/2087897945320665182)

---

## 👤 Author

**Anurag Sharma**

DaisyCode was built independently as a solo project for the AO Hackathon.

> Open your project, describe what you want to build, and let a free AI coding agent help you ship it.

<div align="center">

**⭐ If you find this project useful, consider starring it on GitHub ⭐**

</div>
