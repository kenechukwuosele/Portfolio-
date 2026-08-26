<div align="center">

# Osele Kenechukwu Alexander
### Backend & Systems Engineer

[![Website](https://img.shields.io/badge/Live_Portfolio-kenechukwuosele.me-00f0ff?style=for-the-badge&logo=vercel&logoColor=white)](https://kenechukwuosele.me/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/kenechukwuosele/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/kenechukwuosele)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)

<p align="center">
  <em>High-performance systems showcase driven by first-principles understanding of internet protocols, asynchronous concurrency, applied algorithms, and memory-hard cryptographic security.</em>
</p>

</div>

---

## 🌟 Overview

This repository houses the personal portfolio and systems showcase of **Osele Kenechukwu Alexander**, a Backend & Systems Engineer focused on **Internet Protocols (TCP/IP, HTTP/2, WebSockets)**, **Asynchronous Concurrency (Python asyncio, Non-Blocking I/O)**, **Applied Algorithms & Data Structures**, and **Cryptographic Security (Argon2id, Stateful Redis Revocation)**.

Rather than relying on framework-counting, this portfolio highlights fundamental system design, packet transport semantics, event-loop execution, zero-trust perimeter defense, and verified engineering case studies.

---

## 🚀 Key Architectural Pillars

- **Internet Protocols & Socket Transport**: TCP connection handshakes, windowing, HTTP/1.1 vs HTTP/2 multiplexing, WebSocket full-duplex streams, and network telemetry.
- **Asynchronous Concurrency & I/O**: Python asyncio event loops, non-blocking I/O multiplexing, async connection pooling, and distributed Redis mutexes.
- **Cryptographic Security & Identity**: Memory-hard password hashing (Argon2id), dual-token cryptographic rotation, constant-time verification, and zero-trust API boundaries.
- **Algorithmic Rigor & Applied AI**: Time-space complexity optimization, vector embeddings & HNSW indexing (ChromaDB), and two-model critic query verification (90% inference cost savings).
- **Passcode-Protected Content Manager (`⌘E`)**: In-browser CRUD administration with instant `localStorage` persistence and automatic weekly GitHub sync.

---

## 🛠️ Core Engineering Focus

### Systems, Protocols & Security
- **Protocols & Transport**: TCP/IP socket programming, HTTP/1.1 & HTTP/2 framing, WebSockets, ASGI/WSGI network models, TLS handshake verification
- **Concurrency & Asynchrony**: Python `asyncio`, coroutines, event-loop scheduling, connection pool leases, non-blocking socket I/O
- **Security & Cryptography**: Argon2id memory-hard hashing, dual-token JWT rotation, Redis blacklist caching, rate limiting, constant-time validation
- **Persistence & Caching**: PostgreSQL (SQLAlchemy 2.0 async + Alembic), Redis in-memory key-value store, MongoDB, MySQL
- **Algorithms & AI**: Vector similarity search (ChromaDB), hybrid dense/sparse retrieval (RAG), hierarchical critic verification trees
- **Security & Auth**: Argon2id password hashing, Dual JWT (Access + Refresh Rotation), OAuth2
- **AI & Machine Learning**: Retrieval-Augmented Generation (RAG), ChromaDB, Groq API, OpenRouter, Scikit-Learn

---

## 📁 Featured Projects

| Project | Description | Stack | Link |
| :--- | :--- | :--- | :--- |
| **[AuthService](https://github.com/kenechukwuosele/authservice)** | Production-grade FastAPI authentication microservice with Argon2id hashing & Redis token revocation. | FastAPI, PostgreSQL, Redis, Argon2 | [Repository](https://github.com/kenechukwuosele/authservice) |
| **[DbAdmin AI CLI](https://github.com/kenechukwuosele/dbadmin-ai-cli)** | Natural language database CLI supporting PostgreSQL, MySQL, MongoDB, and Redis with 2-model critic verification. | Python, Click, Groq, OpenRouter | [Repository](https://github.com/kenechukwuosele/dbadmin-ai-cli) |
| **[FinVocalist AI](https://github.com/kenechukwuosele/finvocalist-ai)** | Voice-driven financial copilot for real-time portfolio analysis and multi-source market queries. | React, Web Audio API, LLMs | [Repository](https://github.com/kenechukwuosele/finvocalist-ai) |
| **[RAG-PL](https://github.com/kenechukwuosele/RAG-PL)** | Retrieval-Augmented Generation pipeline grounded in vector embeddings with multi-hop document synthesis. | Python, LangChain, ChromaDB | [Repository](https://github.com/kenechukwuosele/RAG-PL) |
| **[Taskly](https://github.com/kenechukwuosele/Task-Manager)** | Full-stack MERN task management application with role-based auth and status workflows. | React, Node.js, Express, MongoDB | [Live App](https://task-manager-frontend-1v6f.onrender.com) |
| **[Subscription Tracker](https://github.com/kenechukwuosele/SubscriptionTracker)** | Automated recurring subscription and billing tracker with alert dispatching. | Node.js, Express, MongoDB | [Repository](https://github.com/kenechukwuosele/SubscriptionTracker) |

---

## 💻 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kenechukwuosele/Portfolio-.git
   cd Portfolio-
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:3000` (or the port indicated in terminal).

### Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts local development server with instant HMR |
| `npm run build` | Builds optimized production bundle into `dist/` |
| `npm run preview` | Previews production build locally |
| `npm run lint` | Runs TypeScript type checking (`tsc --noEmit`) |

---

## 🔐 Admin Panel Usage

The portfolio includes an in-browser Admin Panel to create, edit, feature, and delete projects visually:

1. Press **`⌘E`** (or **`Ctrl+E`**) on your keyboard (or click **"Admin"** in the footer / type `admin` in the terminal).
2. Enter your master passcode (Default: `2026`).
3. Manage projects, customize bio/profile details, and export updated code to commit to git.

---

## 🌐 Custom Domain & Deployment

This project is configured for seamless deployment on [Vercel](https://vercel.com/):

1. Import the repository into **Vercel**.
2. Vercel automatically detects the Vite framework and applies routing rules from [`vercel.json`](./vercel.json).
3. Connect your custom domain (e.g. `kenechukwuosele.me`) via standard `A` (`76.76.21.21`) and `CNAME` (`cname.vercel-dns.com`) DNS records.

---

## 📬 Contact & Connect

- **Portfolio**: [kenechukwuosele.me](https://kenechukwuosele.me/)
- **LinkedIn**: [linkedin.com/in/kenechukwuosele](https://www.linkedin.com/in/kenechukwuosele/)
- **GitHub**: [@kenechukwuosele](https://github.com/kenechukwuosele)
- **Email**: [oseleken9@gmail.com](mailto:oseleken9@gmail.com)

---

<div align="center">
  <sub>Designed & Developed by <b>Osele Kenechukwu Alexander</b> • Open Source Under MIT License</sub>
</div>