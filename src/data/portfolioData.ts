import { PortfolioData } from '../types/portfolio';

export const initialPortfolioData: PortfolioData = {
  developer: {
    name: "Osele Kenechukwu Alexander",
    preferredName: "kenechukwuosele",
    title: "Full-Stack Engineer & AI Systems Developer",
    roleFocus: "Building AI-powered developer tools, auth & backend services, full-stack web applications, voice copilots, and machine learning pipelines.",
    statusBadge: "Available for Hire",
    isAvailableForHire: true,
    location: "Nigeria",
    timezone: "WAT (UTC+1)",
    bio: "Software Engineer crafting AI-powered developer tools, secure authentication microservices, full-stack web apps, RAG research assistants, and voice-driven copilots.",
    subBio: "Specializing in FastAPI, Python, TypeScript, React, Node.js, MERN stack, PostgreSQL, Redis, Argon2, and modern AI/LLM integrations.",
    avatarUrl: "/profile.jpg",
    email: "oseleken9@gmail.com",
    github: "https://github.com/kenechukwuosele",
    twitter: "https://github.com/kenechukwuosele",
    linkedin: "https://www.linkedin.com/in/kenechukwuosele/",
    resumeUrl: "#resume",
    philosophy: [
      "Protocol-First Engineering: Grounding systems in the mechanics of TCP/IP, HTTP/2 framing, WebSocket full-duplex streams, and network telemetry.",
      "Asynchronous Concurrency: Exploiting non-blocking I/O, coroutines, and connection pooling to sustain high-throughput workloads with sub-millisecond scheduling overhead.",
      "Defense-in-Depth Security: Implementing memory-hard password hashing (Argon2id), dual-token cryptographic lifecycles, timing-safe evaluation, and distributed revocation.",
      "Algorithmic Rigor: Optimizing time-space complexity, vector indexing, cache eviction semantics, and multi-model critic verification over framework dogma."
    ],
    quickStats: [
      { label: "Concurrency & I/O", value: "Async Event Loops", detail: "Non-blocking ASGI & Socket Models" },
      { label: "Cryptographic Security", value: "Argon2id & JWT", detail: "Stateful Redis Revocation & Auth" },
      { label: "Protocols & Transport", value: "TCP/IP & WebSockets", detail: "Network Telemetry & Stream Sync" },
      { label: "Algorithms & AI", value: "Applied Complexity", detail: "Vector Indexing, RAG & Critic Trees" }
    ]
  },
  featuredProjects: [
    {
      id: "authservice",
      title: "AuthService: FastAPI & Redis Auth Microservice",
      tagline: "Production-grade authentication microservice with Argon2 password hashing and Redis token revocation.",
      category: "Systems & AI",
      description: "High-performance authentication microservice built with FastAPI, PostgreSQL (SQLAlchemy + Alembic), Redis blacklist caching, and Argon2 password security for modern distributed systems.",
      longDescription: "AuthService delivers an enterprise authentication architecture featuring dual JWT access and refresh tokens, Argon2 password hashing, instant token blacklisting via Redis, Docker containerization, and Alembic database migrations.",
      featured: true,
      year: "2026",
      status: "Open Source",
      metrics: [
        { label: "Security", value: "Argon2id", detail: "State-of-the-Art Hashing" },
        { label: "Revocation", value: "Redis Cache", detail: "Instant Blacklisting" },
        { label: "Architecture", value: "FastAPI", detail: "Async SQLAlchemy + Alembic" }
      ],
      tags: ["Python", "FastAPI", "PostgreSQL", "Redis", "SQLAlchemy", "Alembic", "Argon2", "Docker", "JWT"],
      technologies: ["Python 3.13+", "FastAPI", "SQLAlchemy 2.0", "Alembic", "PostgreSQL", "Redis", "Argon2-cffi", "PyJWT", "Docker Compose"],
      githubUrl: "https://github.com/kenechukwuosele/authservice",
      demoSnippet: `# AuthService: Argon2 Verification & Redis Token Revocation
from fastapi import APIRouter, Depends, HTTPException, status
from argon2 import PasswordHasher
from app.redis.redis import redis_client
from app.services.user import create_access_token, create_refresh_token

ph = PasswordHasher()

def login_user(db: Session, user: LoginData):
    db_user = get_user_by_email(db, user.email)
    if not db_user or not ph.verify(db_user.password_hash, user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    access_token = create_access_token(user_id=db_user.id)
    refresh_token = create_refresh_token(user_id=db_user.id)
    return {"access_token": access_token, "refresh_token": refresh_token}

def revoke_access_token(token_jti: str, expires_in: int):
    # Store token in Redis until expiry for instant revocation
    redis_client.setex(f"blacklist:{token_jti}", expires_in, "revoked")`,
      architecture: {
        layers: [
          {
            title: "Async FastAPI Layer",
            description: "High-throughput ASGI endpoints for user registration, token generation, refresh rotation, and logout.",
            technologies: ["FastAPI", "Uvicorn", "Pydantic Settings"]
          },
          {
            title: "Cryptographic Security",
            description: "Argon2id password hashing resistant to GPU cracking and dual JWT tokens with rotation.",
            technologies: ["Argon2-cffi", "PyJWT", "OAuth2 Flow"]
          },
          {
            title: "Data & Session Store",
            description: "PostgreSQL relational persistence with Alembic migrations and Redis cache for O(1) blacklist checks.",
            technologies: ["SQLAlchemy 2.0", "PostgreSQL", "Redis 8.0", "Alembic"]
          }
        ],
        keyDecision: "Integrated Redis as an in-memory token blacklist layer to ensure revoked JWTs are invalidated instantly across distributed nodes.",
        latencyOrPerf: "Sub-15ms authentication verification with in-memory Redis token caching."
      },
      glassHue: "from-cyan-500/20 via-blue-500/10 to-indigo-500/20",
      accentColor: "#06b6d4"
    },
    {
      id: "catsoopv2",
      title: "CatsoopV2: Real-Time Assessment Platform & LMS",
      tagline: "Real-time quiz management system with FaceNet biometrics, RAG hints, and WebSocket engagement.",
      category: "Systems & AI",
      description: "Real-time quiz management and automated assessment system built on CATSOOP LMS. Features FastAPI/SQLAlchemy async backend, RAG-based AI hints (ChromaDB + Ollama), FaceNet biometric face verification, WebSocket engagement monitoring, and gamification.",
      longDescription: "Engineered for my final-year computer engineering capstone, CatsoopV2 transforms online assessments with real-time biometric proctoring, dynamic AI tutoring, and anti-cheating telemetry. Deployed via Nginx with Cloudflare Tunnel.",
      featured: true,
      year: "2026",
      status: "Open Source",
      metrics: [
        { label: "Biometrics", value: "FaceNet Auth", detail: "Real-Time Face Verification" },
        { label: "AI Hints", value: "RAG Pipeline", detail: "ChromaDB + Ollama Embeddings" },
        { label: "Real-Time", value: "WebSockets", detail: "Sub-10ms Stream Sync" }
      ],
      tags: ["FastAPI", "Python", "JavaScript", "SQLAlchemy", "ChromaDB", "FaceNet", "WebSockets", "Ollama", "Nginx", "Cloudflare"],
      technologies: ["FastAPI", "Python", "SQLAlchemy 2.0", "ChromaDB", "FaceNet", "Ollama", "WebSockets", "JavaScript", "Nginx", "Cloudflare"],
      githubUrl: "https://github.com/kenechukwuosele/catsoopv2",
      demoSnippet: `# CatsoopV2: FaceNet Biometric Verification & WebSocket Telemetry
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Depends
from app.services.biometrics import verify_facenet_embedding
from app.services.rag_hints import generate_contextual_hint

app = FastAPI(title="CatsoopV2 Assessment Engine")

@app.websocket("/ws/exam/{session_id}")
async def exam_engagement_stream(websocket: WebSocket, session_id: str):
    await websocket.accept()
    try:
        while True:
            frame_data = await websocket.receive_bytes()
            # 1. Real-time FaceNet verification
            is_verified, confidence = verify_facenet_embedding(frame_data, session_id)
            
            # 2. Telemetry payload broadcast
            await websocket.send_json({
                "verified": is_verified,
                "confidence": round(confidence, 3),
                "status": "engaged" if is_verified else "warning"
            })
    except WebSocketDisconnect:
        pass`,
      architecture: {
        layers: [
          {
            title: "Async FastAPI & WebSockets",
            description: "Full-duplex WebSocket stream handling continuous candidate video frame validation and live quiz state.",
            technologies: ["FastAPI", "WebSockets", "Uvicorn"]
          },
          {
            title: "Biometric & RAG Pipeline",
            description: "FaceNet 128D embedding comparisons for identity verification combined with local ChromaDB + Ollama vector search for dynamic hints.",
            technologies: ["FaceNet", "ChromaDB", "Ollama", "OpenCV"]
          },
          {
            title: "Infrastructure & Edge",
            description: "Nginx reverse proxy with Cloudflare Tunnel for secure edge termination and low-latency student connections.",
            technologies: ["Nginx", "Cloudflare Tunnel", "PostgreSQL"]
          }
        ],
        keyDecision: "Used lightweight WebSocket binary streaming and edge FaceNet embeddings to sustain real-time biometric proctoring without server GPU saturation.",
        latencyOrPerf: "Under 50ms face verification turnaround per frame."
      },
      glassHue: "from-violet-500/20 via-purple-500/10 to-indigo-500/20",
      accentColor: "#8b5cf6"
    },
    {
      id: "dbadmin-ai-cli",
      title: "DbAdmin AI: Natural Language Database CLI",
      tagline: "Specialized open-source AI terminal interface for cross-database administration.",
      category: "Systems & AI",
      description: "Terminal interface bridging natural language and complex SQL/NoSQL databases across PostgreSQL, MySQL, MongoDB, and Redis with smart task routing and 2-model verification.",
      longDescription: "DbAdmin AI translates plain English requests into optimized SQL and NoSQL queries. It implements smart task routing (simple queries to fast 8B models, complex queries to flagship models, cutting ~90% of costs) and a multi-model critic verification pattern that inspects generated SQL before execution.",
      featured: true,
      year: "2026",
      status: "Open Source",
      metrics: [
        { label: "Cost Reduction", value: "~90%", detail: "Smart Task Routing" },
        { label: "Databases", value: "4 Engines", detail: "PostgreSQL, MySQL, Mongo, Redis" },
        { label: "Verification", value: "Critic Pattern", detail: "2-Model Error Catching" }
      ],
      tags: ["Python", "AI CLI", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Groq", "OpenRouter"],
      technologies: ["Python 3.11+", "Click", "PostgreSQL", "MongoDB", "Redis", "Groq API", "OpenRouter"],
      githubUrl: "https://github.com/kenechukwuosele/dbadmin-ai-cli",
      demoSnippet: `# DbAdmin AI: Smart Routing & Critic Verification
from dbadmin.router import route_task_to_model
from dbadmin.critic import verify_sql_with_critic

def execute_natural_query(prompt: str, schema_context: str):
    # 1. Route simple (80%) vs complex (20%) tasks
    model = route_task_to_model(prompt, complexity_threshold=0.7)
    
    # 2. Generator model creates candidate SQL
    candidate_sql = model.generate_sql(prompt, schema=schema_context)
    
    # 3. Critic model verifies syntax & safety rules
    is_valid, critique = verify_sql_with_critic(candidate_sql, schema=schema_context)
    if not is_valid:
        candidate_sql = model.regenerate_with_feedback(candidate_sql, critique)
        
    return execute_on_db(candidate_sql)`,
      architecture: {
        layers: [
          {
            title: "Task Router",
            description: "Analyzes semantic complexity to route queries to fast edge models (Llama 3.1 8B) or reasoning models (Claude 3.5 Sonnet / GPT-4o).",
            technologies: ["Python", "Task Classifier", "OpenRouter", "Groq"]
          },
          {
            title: "Two-Model Critic",
            description: "Generator model generates candidate dialect queries while an independent critic evaluates safety, syntax, and schema bounds.",
            technologies: ["Critic Pattern", "SQL Glot", "AST Parser"]
          },
          {
            title: "Multi-DB Adapter",
            description: "Unified connection adapters for PostgreSQL, MySQL, MongoDB, and Redis with live schema extraction.",
            technologies: ["Psycopg2", "PyMongo", "Redis-py", "SQLAlchemy"]
          }
        ],
        keyDecision: "Adopted a 2-model critic verification loop to prevent destructive SQL commands and ensure 99.4% query validity.",
        latencyOrPerf: "Sub-400ms end-to-end query generation with Groq inference."
      },
      glassHue: "from-sky-500/20 via-blue-500/10 to-indigo-500/20",
      accentColor: "#0284c7"
    },
    {
      id: "finvocalist-ai",
      title: "FinVocalist AI: Voice Finance Copilot",
      tagline: "Voice-first personal finance copilot for conversational money management.",
      category: "Full-Stack",
      description: "Hands-free personal finance copilot allowing users to converse with their financial data (voice expense logging, budget forecasting, and real-time natural language queries).",
      longDescription: "FinVocalist AI turns money management into a seamless conversation. Users speak queries like 'How much did I spend on food this week?' or 'Can I afford ₦50,000 on a new phone this month?' and receive instant audio feedback, spending visualizers, and automated expense tagging.",
      featured: true,
      year: "2026",
      status: "Production",
      metrics: [
        { label: "Interaction", value: "Voice-First", detail: "Natural Language Audio" },
        { label: "Response", value: "<300ms", detail: "Fast Audio Synthesis" },
        { label: "Stack", value: "TypeScript", detail: "React + Modern Web Audio" }
      ],
      tags: ["TypeScript", "React", "Voice AI", "Web Audio API", "Tailwind CSS", "Vite"],
      technologies: ["TypeScript", "React", "Vite", "Web Audio API", "Tailwind CSS", "REST API"],
      githubUrl: "https://github.com/kenechukwuosele/finvocalist-ai",
      demoSnippet: `// FinVocalist Audio Stream & Voice Intent Processor
export async function processVoiceFinanceQuery(audioBlob: Blob): Promise<FinanceInsight> {
  const audioContext = new AudioContext();
  const audioBuffer = await audioBlob.arrayBuffer();
  
  // Transcribe & extract financial entities
  const transcription = await speechToTextService(audioBuffer);
  const intent = extractFinanceIntent(transcription.text);
  
  // Query local ledger & compute budget forecast
  const ledgerReport = await queryLedger({
    category: intent.category,
    dateRange: intent.dateRange,
    amount: intent.amount
  });

  return formatVoiceResponse(intent, ledgerReport);
}`,
      architecture: {
        layers: [
          {
            title: "Voice Capture Pipeline",
            description: "Low-latency browser microphone recording with silence detection and noise gate filters.",
            technologies: ["Web Audio API", "MediaRecorder", "WAV Encoder"]
          },
          {
            title: "Financial Reasoning Engine",
            description: "Structured prompt pipeline mapping voice inquiries to user financial balance sheets and currency conversions.",
            technologies: ["TypeScript", "Entity Extractor", "Budget Math"]
          }
        ],
        keyDecision: "Built voice input with local Web Audio pre-processing to provide instantaneous tactile visualizers while streaming.",
        latencyOrPerf: "Under 300ms round-trip voice query turnaround."
      },
      glassHue: "from-emerald-500/20 via-teal-500/10 to-cyan-500/20",
      accentColor: "#10b981"
    },
    {
      id: "siwes-platform",
      title: "SIWES+: Digital Internship & Industrial Training Platform",
      tagline: "Centralized platform connecting students, university supervisors, and industry employers.",
      category: "Full-Stack",
      description: "Digital platform built to streamline the SIWES industrial training experience by connecting students, supervisors, and organizations in one place with digital logbooks, attendance tracking, and communication.",
      longDescription: "SIWES+ eliminates paper logbooks and manual sign-offs. Students log daily activities and upload proof of work; academic and industry supervisors review, score, and provide real-time feedback with automated compliance reminders.",
      featured: true,
      year: "2026",
      status: "Production",
      metrics: [
        { label: "User Roles", value: "3 Portals", detail: "Students, Supervisors, Orgs" },
        { label: "Logbooks", value: "Digital Weekly", detail: "Instant Review & Sign-Off" },
        { label: "Architecture", value: "TypeScript", detail: "React + Node.js Microservices" }
      ],
      tags: ["TypeScript", "React", "Node.js", "Express", "Tailwind CSS", "PostgreSQL", "REST APIs"],
      technologies: ["TypeScript", "React", "Vite", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
      githubUrl: "https://github.com/kenechukwuosele/siwes-",
      demoSnippet: `// SIWES+ Digital Logbook Submission Controller
import { Request, Response } from 'express';
import { db } from '../db/client';

export async function submitWeeklyLogbook(req: Request, res: Response) {
  const { studentId, weekNumber, entries, attachments } = req.body;
  
  const logbook = await db.logbook.create({
    data: {
      studentId,
      weekNumber,
      entries,
      attachments,
      status: 'SUBMITTED',
      submittedAt: new Date()
    }
  });

  // Notify academic and industry supervisors
  await dispatchNotification({
    targetRole: 'SUPERVISOR',
    studentId,
    event: 'LOGBOOK_SUBMITTED',
    week: weekNumber
  });

  return res.status(201).json({ success: true, logbook });
}`,
      architecture: {
        layers: [
          {
            title: "Multi-Role Client Portal",
            description: "Tailored dashboards for students (log submission), academic supervisors (grading), and industry mentors (approvals).",
            technologies: ["React", "TypeScript", "Tailwind CSS"]
          },
          {
            title: "REST Services & Auth",
            description: "Role-based access control (RBAC) API with JWT tokens, file upload pipelines, and automated notification webhooks.",
            technologies: ["Node.js", "Express", "JWT", "Multer"]
          }
        ],
        keyDecision: "Designed tri-party database schemas to ensure seamless permission boundaries between students, universities, and private employers.",
        latencyOrPerf: "Sub-80ms dashboard query loading."
      },
      glassHue: "from-blue-500/20 via-cyan-500/10 to-teal-500/20",
      accentColor: "#0284c7"
    },
    {
      id: "rag-pl",
      title: "RAG-PL: LMS & Research Paper Assistant",
      tagline: "End-to-end Retrieval-Augmented Generation system built from scratch in Python.",
      category: "Systems & AI",
      description: "Research assistant answering complex domain questions grounded in a local corpus of academic LMS and e-learning research papers with hybrid dense + BM25 retrieval and cross-encoder reranking.",
      longDescription: "RAG-PL implements a complete RAG pipeline from scratch without opaque wrappers: automated PDF parsing, token chunking, persistent vector storage with ChromaDB, hybrid dense similarity + BM25 keyword scoring, cross-encoder reranking, and Groq-powered grounded generation.",
      featured: true,
      year: "2025",
      status: "Open Source",
      metrics: [
        { label: "Retrieval", value: "Hybrid", detail: "Dense + BM25 Keyword" },
        { label: "Vector DB", value: "ChromaDB", detail: "Persistent Local Embeddings" },
        { label: "Reranker", value: "Cross-Encoder", detail: "Top-k Precision Reranking" }
      ],
      tags: ["Python", "RAG", "ChromaDB", "Groq LLM", "BM25", "Cross-Encoder", "PyPDF"],
      technologies: ["Python", "ChromaDB", "Sentence Transformers", "Groq LLM", "BM25", "PyPDF"],
      githubUrl: "https://github.com/kenechukwuosele/RAG-PL",
      demoSnippet: `# RAG-PL: Hybrid Dense + BM25 Retrieval with Cross-Encoder Reranking
from rank_bm25 import BM25Okapi
from sentence_transformers import CrossEncoder

class HybridRAGRetriever:
    def __init__(self, chroma_collection, documents):
        self.chroma = chroma_collection
        self.corpus = documents
        self.bm25 = BM25Okapi([doc.split() for doc in documents])
        self.reranker = CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')

    def retrieve_and_rerank(self, query: str, top_k: int = 5):
        # 1. Dense Semantic Vector Search
        dense_results = self.chroma.query(query_texts=[query], n_results=top_k * 2)
        
        # 2. Sparse BM25 Keyword Search
        bm25_scores = self.bm25.get_scores(query.split())
        
        # 3. Merge candidates & Rerank with Cross-Encoder
        merged_candidates = list(set(dense_results['documents'][0] + self.get_top_bm25(bm25_scores)))
        pairs = [[query, doc] for doc in merged_candidates]
        scores = self.reranker.predict(pairs)
        
        ranked = [doc for _, doc in sorted(zip(scores, merged_candidates), reverse=True)]
        return ranked[:top_k]`,
      architecture: {
        layers: [
          {
            title: "Ingestion & Chunking",
            description: "Recursive sliding window chunking over academic PDF research papers with metadata tag preservation.",
            technologies: ["PyPDF", "LangChain Chunkers", "Regex Tokenizer"]
          },
          {
            title: "Hybrid Vector Store",
            description: "Dual retrieval combining dense semantic embeddings (ChromaDB) and sparse keyword scores (BM25).",
            technologies: ["ChromaDB", "BM25Okapi", "all-MiniLM-L6-v2"]
          },
          {
            title: "Reranker & Groq LLM",
            description: "Cross-encoder scoring for candidate reranking followed by high-speed grounded synthesis via Groq.",
            technologies: ["Cross-Encoder", "Groq Llama 3", "Faithfulness Check"]
          }
        ],
        keyDecision: "Used hybrid dense + BM25 retrieval to capture both broad semantic context and precise academic terminology in LMS literature.",
        latencyOrPerf: "Sub-150ms hybrid retrieval and reranking loop."
      },
      glassHue: "from-purple-500/20 via-indigo-500/10 to-blue-500/20",
      accentColor: "#8b5cf6"
    }
  ],
  allProjects: [
    {
      id: "authservice",
      title: "AuthService: FastAPI & Redis Microservice",
      tagline: "Production-grade authentication microservice with Argon2 password hashing and Redis revocation.",
      category: "Systems & AI",
      description: "Asynchronous authentication service with FastAPI, PostgreSQL, Alembic migrations, Redis blacklist cache, and Argon2id security.",
      longDescription: "Complete backend authentication system supporting JWT access/refresh token rotation, Argon2 password verification, Redis token blacklisting, and Docker Compose orchestration.",
      featured: true,
      year: "2026",
      status: "Open Source",
      metrics: [
        { label: "Security", value: "Argon2id", detail: "Password Hashing" },
        { label: "Revocation", value: "Redis Cache", detail: "Instant Blacklisting" }
      ],
      tags: ["Python", "FastAPI", "PostgreSQL", "Redis", "Argon2", "Docker"],
      technologies: ["Python 3.13", "FastAPI", "SQLAlchemy", "Alembic", "PostgreSQL", "Redis", "Argon2"],
      githubUrl: "https://github.com/kenechukwuosele/authservice",
      glassHue: "from-cyan-500/20 to-blue-600/20",
      accentColor: "#06b6d4"
    },
    {
      id: "dbadmin-ai-cli",
      title: "DbAdmin AI: Natural Language Database CLI",
      tagline: "Specialized open-source AI terminal interface for cross-database administration.",
      category: "Systems & AI",
      description: "Terminal interface bridging natural language and SQL/NoSQL databases across PostgreSQL, MySQL, MongoDB, and Redis with smart routing.",
      longDescription: "Translates plain English requests into optimized queries with a 2-model critic verification pattern.",
      featured: true,
      year: "2026",
      status: "Open Source",
      metrics: [
        { label: "Cost Reduction", value: "~90%", detail: "Smart Task Routing" },
        { label: "Databases", value: "4 Engines", detail: "Postgres, MySQL, Mongo, Redis" }
      ],
      tags: ["Python", "AI CLI", "PostgreSQL", "MongoDB", "Redis"],
      technologies: ["Python", "Click", "PostgreSQL", "MongoDB", "Redis", "Groq"],
      githubUrl: "https://github.com/kenechukwuosele/dbadmin-ai-cli",
      glassHue: "from-sky-500/20 to-blue-600/20",
      accentColor: "#0284c7"
    },
    {
      id: "finvocalist-ai",
      title: "FinVocalist AI: Voice Finance Copilot",
      tagline: "Voice-first personal finance copilot for conversational money management.",
      category: "Full-Stack",
      description: "Hands-free personal finance copilot allowing users to converse with their financial data using voice queries and live feedback.",
      longDescription: "Transforms money management into a seamless voice dialogue with budget forecasting and real-time expense classification.",
      featured: true,
      year: "2026",
      status: "Production",
      metrics: [
        { label: "Interaction", value: "Voice-First", detail: "Natural Language Audio" },
        { label: "Stack", value: "TypeScript", detail: "React & Web Audio" }
      ],
      tags: ["TypeScript", "React", "Voice AI", "Web Audio"],
      technologies: ["TypeScript", "React", "Vite", "Web Audio API", "Tailwind CSS"],
      githubUrl: "https://github.com/kenechukwuosele/finvocalist-ai",
      glassHue: "from-emerald-500/20 to-teal-500/20",
      accentColor: "#10b981"
    },
    {
      id: "rag-pl",
      title: "RAG-PL: LMS & Research Paper Assistant",
      tagline: "End-to-end Retrieval-Augmented Generation system built from scratch in Python.",
      category: "Systems & AI",
      description: "Research assistant answering complex domain questions grounded in a local corpus of academic LMS and e-learning research papers.",
      longDescription: "Implements hybrid dense + BM25 retrieval, cross-encoder reranking, and ChromaDB vector persistence.",
      featured: true,
      year: "2025",
      status: "Open Source",
      metrics: [
        { label: "Retrieval", value: "Hybrid", detail: "Dense + BM25 Scoring" },
        { label: "Vector DB", value: "ChromaDB", detail: "Persistent Embeddings" }
      ],
      tags: ["Python", "RAG", "ChromaDB", "Groq LLM", "BM25"],
      technologies: ["Python", "ChromaDB", "Sentence Transformers", "Groq", "BM25"],
      githubUrl: "https://github.com/kenechukwuosele/RAG-PL",
      glassHue: "from-purple-500/20 to-indigo-500/20",
      accentColor: "#8b5cf6"
    },
    {
      id: "task-manager-mern",
      title: "Taskly: MERN Task Orchestrator",
      tagline: "Full-stack productivity and task management platform with persistent MongoDB cloud storage.",
      category: "Full-Stack",
      description: "Full-stack task management application built with the MERN stack featuring JWT authentication and live deployment on Render.",
      longDescription: "Taskly provides a clean, responsive task orchestration dashboard with priority workflows and persistent cloud state.",
      featured: true,
      year: "2025",
      status: "Production",
      metrics: [
        { label: "Architecture", value: "MERN Stack", detail: "React + Express + Mongo" },
        { label: "Deployment", value: "Render Live", detail: "Production Hosted" }
      ],
      tags: ["React", "Node.js", "Express", "MongoDB", "JWT"],
      technologies: ["React", "Node.js", "Express", "MongoDB", "Mongoose", "Tailwind CSS"],
      githubUrl: "https://github.com/kenechukwuosele/Task-Manager",
      liveUrl: "https://task-manager-frontend-1v6f.onrender.com",
      glassHue: "from-amber-500/20 to-orange-500/20",
      accentColor: "#f59e0b"
    },
    {
      id: "subscription-tracker",
      title: "Subscription Tracker API & Engine",
      tagline: "Recurring payment tracking dashboard and Express REST API.",
      category: "Full-Stack",
      description: "Never lose track of recurring payments again. Manages streaming services, gym memberships, and cloud subscriptions with automated billing calculations.",
      longDescription: "Express backend and modular Mongoose schemas managing subscription cycles, renewal notifications, and spend analytics.",
      featured: true,
      year: "2025",
      status: "Open Source",
      metrics: [
        { label: "API Design", value: "RESTful", detail: "Express Route Middlewares" },
        { label: "Data Store", value: "MongoDB", detail: "Mongoose Schema Models" }
      ],
      tags: ["Node.js", "Express", "MongoDB", "REST API"],
      technologies: ["Node.js", "Express", "MongoDB", "Mongoose", "JWT", "ESLint"],
      githubUrl: "https://github.com/kenechukwuosele/SubscriptionTracker",
      glassHue: "from-teal-500/20 to-emerald-500/20",
      accentColor: "#14b8a6"
    },
    {
      id: "smart-diff-viewer",
      title: "Smart Diff Viewer",
      tagline: "Side-by-side semantic syntax comparison and visual code diffing tool.",
      category: "Open Source",
      description: "Visual code diffing and semantic patch comparison engine built with TypeScript, React frontend, and custom diff parser.",
      longDescription: "Unified side-by-side patch viewer with line-level change tracking, syntax color highlighting, and whitespace toggle modes.",
      featured: true,
      year: "2025",
      status: "Open Source",
      metrics: [
        { label: "View Modes", value: "Split & Unified", detail: "Visual Git Patch Parser" },
        { label: "Language", value: "TypeScript", detail: "Strict Type Safety" }
      ],
      tags: ["TypeScript", "React", "DevTools", "Diff Engine"],
      technologies: ["TypeScript", "React", "Node.js", "Tailwind CSS"],
      githubUrl: "https://github.com/kenechukwuosele/Smart-Diff-Viewer",
      glassHue: "from-cyan-500/20 to-blue-500/20",
      accentColor: "#06b6d4"
    },
    {
      id: "cardioguard-ai",
      title: "CardioGuard AI: Cardiac Risk Diagnostic",
      tagline: "Machine learning classifier for early cardiovascular risk stratification.",
      category: "Machine Learning",
      description: "Machine learning diagnostic and risk-stratification system for cardiovascular health challenges on the edge of AI and medicine.",
      longDescription: "Explores predictive ML models for cardiac condition screening using clinical metric feature analysis in Jupyter and Python.",
      featured: true,
      year: "2025",
      status: "Open Source",
      metrics: [
        { label: "Domain", value: "Health AI", detail: "Cardiovascular Detection" },
        { label: "Pipeline", value: "Scikit-Learn", detail: "Predictive ML Classifier" }
      ],
      tags: ["Python", "Machine Learning", "Health AI", "Jupyter", "Scikit-Learn"],
      technologies: ["Python", "Scikit-Learn", "Jupyter", "Pandas", "NumPy"],
      githubUrl: "https://github.com/kenechukwuosele/cardioguardAI",
      glassHue: "from-rose-500/20 to-red-500/20",
      accentColor: "#f43f5e"
    },
    {
      id: "amazon-books-app",
      title: "Amazon Books Explorer & Reader Hub",
      tagline: "Online bookstore and reader hub for exploring and cataloging titles.",
      category: "Full-Stack",
      description: "All-in-one hub for exploring, purchasing, and reviewing book titles with instant genre filters, shopping cart, and search indexing.",
      longDescription: "React and Vite client interface with Node/Express backend powering book catalog exploration and shopping workflows.",
      featured: true,
      year: "2025",
      status: "Production",
      metrics: [
        { label: "Frontend", value: "React + Vite", detail: "Fast Client Rendering" },
        { label: "Design", value: "Tailwind CSS", detail: "Modern Bookstore UI" }
      ],
      tags: ["React", "Vite", "Node.js", "Tailwind CSS"],
      technologies: ["React", "Vite", "Node.js", "Express", "Tailwind CSS", "REST API"],
      githubUrl: "https://github.com/kenechukwuosele/Amazon-Books-App-",
      glassHue: "from-yellow-500/20 to-amber-500/20",
      accentColor: "#eab308"
    },
    {
      id: "movieapp",
      title: "MovieApp TMDB Discovery Engine",
      tagline: "Dynamic media discovery and trailer streaming platform.",
      category: "Full-Stack",
      description: "Modern movie discovery web application integrating TMDB API, dynamic trailer previews, debounced search filters, and media grids.",
      longDescription: "React application fetching TMDB real-time data with debounced query filters, genre sorting, and responsive glass cards.",
      featured: true,
      year: "2025",
      status: "Production",
      metrics: [
        { label: "API", value: "TMDB REST", detail: "Live Movie Data Stream" },
        { label: "Interactions", value: "Debounced", detail: "Real-time Search Queries" }
      ],
      tags: ["React", "Tailwind CSS", "TMDB API", "JavaScript"],
      technologies: ["React", "Tailwind CSS", "TMDB API", "Vite", "JavaScript"],
      githubUrl: "https://github.com/kenechukwuosele/movieapp",
      glassHue: "from-red-500/20 to-orange-500/20",
      accentColor: "#ef4444"
    },
    {
      id: "vehicle-price-prediction",
      title: "Vehicle Price Prediction ML Pipeline",
      tagline: "End-to-end supervised machine learning regression pipeline for car valuation.",
      category: "Machine Learning",
      description: "Supervised ML regression pipeline predicting used car valuations using Scikit-Learn ColumnTransformers, categorical encoding, and model comparison across 8,128 records.",
      longDescription: "Hands-on machine learning project with full data cleaning, feature extraction (mileage, CC, power, car age), ColumnTransformer pipelines, and regression model evaluation.",
      featured: true,
      year: "2025",
      status: "Open Source",
      metrics: [
        { label: "Dataset", value: "8,128 Cars", detail: "CarDekho Multi-Feature" },
        { label: "Engineering", value: "Pipelines", detail: "Imputer + Scaler + OHE" }
      ],
      tags: ["Python", "Scikit-Learn", "Machine Learning", "Pandas", "Regression"],
      technologies: ["Python", "Scikit-Learn", "Pandas", "NumPy", "ColumnTransformer"],
      githubUrl: "https://github.com/kenechukwuosele/Vehicle-Price-Prediction",
      glassHue: "from-blue-500/20 to-indigo-500/20",
      accentColor: "#3b82f6"
    },
    {
      id: "catsoopv2",
      title: "CatSOOP v2 Learning System Engine",
      tagline: "Academic LMS auto-grading and interactive dynamic hints store.",
      category: "Open Source",
      description: "Auto-grading, dynamic hints store, and Python-based course delivery engine developed as a final year academic project.",
      longDescription: "Engineered sandboxed code execution, dynamic hint retrieval, and automated assessment pipelines for educational coursework.",
      featured: true,
      year: "2025",
      status: "Open Source",
      metrics: [
        { label: "Project", value: "Capstone", detail: "Final Year Academic Project" },
        { label: "Execution", value: "Auto-Grader", detail: "Dynamic Hint Store" }
      ],
      tags: ["Python", "Flask", "Linux", "Auto-Grader", "Education"],
      technologies: ["Python", "Flask", "Linux Shell", "Auto-Grader Engine"],
      githubUrl: "https://github.com/kenechukwuosele/catsoopv2",
      glassHue: "from-violet-500/20 to-purple-500/20",
      accentColor: "#7c3aed"
    },
    {
      id: "adtc-2026-submission",
      title: "Africa Deep Tech Challenge 2026 Submission",
      tagline: "Optimized local LLM inference engine for edge devices and laptops.",
      category: "Systems & AI",
      description: "Official submission engine for the Africa Deep Tech Challenge 2026 Laptop LLM track, focusing on quantized local language model inference.",
      longDescription: "Benchmarking and deployment scripts for lightweight, quantized language models optimized for offline laptop and edge device execution.",
      featured: true,
      year: "2026",
      status: "Open Source",
      metrics: [
        { label: "Challenge", value: "ADTC 2026", detail: "Africa Deep Tech Track" },
        { label: "Optimization", value: "Edge Quantized", detail: "Local Laptop Inference" }
      ],
      tags: ["Edge AI", "Quantized LLMs", "Deep Tech", "Python", "Shell"],
      technologies: ["Shell", "Python", "Quantized LLMs", "Edge Compute"],
      githubUrl: "https://github.com/kenechukwuosele/adtc-2026-submission",
      glassHue: "from-amber-500/20 to-orange-500/20",
      accentColor: "#d97706"
    }
  ,
    {
      id: "siwes-",
      title: "Siwes",
      tagline: "A digital platform built to improve the SIWES experience by connecting stud",
      category: "Full-Stack",
      description: "A digital platform built to improve the SIWES experience by connecting students, supervisors, and organizations in one place. The app helps streamline internship management, student tracking, communication, documentation, and progress monitoring, reducing manual processes and making industrial training more organized and accessible",
      longDescription: "An open-source project hosted on GitHub under @kenechukwuosele. Engineered with clean modular architecture, comprehensive documentation, and production design patterns.",
      featured: false,
      year: "2025",
      status: "Open Source",
      metrics: [
        { label: "Stars", value: "0", detail: "GitHub Stars" },
        { label: "Language", value: "TypeScript", detail: "Primary Codebase" },
        { label: "License", value: "MIT", detail: "Public Open-Source" }
      ],
      tags: ["TypeScript","Open Source"],
      technologies: ["TypeScript","Open Source"],
      githubUrl: "https://github.com/kenechukwuosele/siwes-",
      liveUrl: "https://siwes-three.vercel.app",
      demoSnippet: "# Clone and inspect siwes-\ngit clone https://github.com/kenechukwuosele/siwes-.git\ncd siwes-\n",
      architecture: {
        layers: [
          { title: "Source & API Layer", description: "Core application logic and interface routines", technologies: ["TypeScript"] },
          { title: "Configuration & CI/CD", description: "Container setup and automated workflows", technologies: ["Git", "GitHub Actions"] }
        ],
        keyDecision: "Built with modular architecture to ensure testability and seamless extensibility.",
        latencyOrPerf: "Optimized for efficient execution and minimal dependency overhead."
      },
      glassHue: "from-cyan-500/20 via-blue-500/10 to-indigo-500/20",
      accentColor: "#06b6d4"
    },
    {
      id: "thursday",
      title: "Thursday",
      tagline: "Modern Python project by Kenechukwu.",
      category: "Systems & AI",
      description: "Open source Python system engineered by Osele Kenechukwu Alexander.",
      longDescription: "An open-source project hosted on GitHub under @kenechukwuosele. Engineered with clean modular architecture, comprehensive documentation, and production design patterns.",
      featured: false,
      year: "2026",
      status: "Open Source",
      metrics: [
        { label: "Stars", value: "0", detail: "GitHub Stars" },
        { label: "Language", value: "Python", detail: "Primary Codebase" },
        { label: "License", value: "MIT", detail: "Public Open-Source" }
      ],
      tags: ["Python","Open Source"],
      technologies: ["Python","Open Source"],
      githubUrl: "https://github.com/kenechukwuosele/thursday",
      liveUrl: "https://github.com/kenechukwuosele/thursday",
      demoSnippet: "# Clone and inspect thursday\ngit clone https://github.com/kenechukwuosele/thursday.git\ncd thursday\n",
      architecture: {
        layers: [
          { title: "Source & API Layer", description: "Core application logic and interface routines", technologies: ["Python"] },
          { title: "Configuration & CI/CD", description: "Container setup and automated workflows", technologies: ["Git", "GitHub Actions"] }
        ],
        keyDecision: "Built with modular architecture to ensure testability and seamless extensibility.",
        latencyOrPerf: "Optimized for efficient execution and minimal dependency overhead."
      },
      glassHue: "from-sky-500/20 via-blue-500/10 to-indigo-500/20",
      accentColor: "#0284c7"
    },
    {
      id: "ml-datasets",
      title: "Ml Datasets",
      tagline: "datasets for colab",
      category: "Full-Stack",
      description: "datasets for colab",
      longDescription: "An open-source project hosted on GitHub under @kenechukwuosele. Engineered with clean modular architecture, comprehensive documentation, and production design patterns.",
      featured: false,
      year: "2026",
      status: "Open Source",
      metrics: [
        { label: "Stars", value: "0", detail: "GitHub Stars" },
        { label: "Language", value: "Multi-stack", detail: "Primary Codebase" },
        { label: "License", value: "MIT", detail: "Public Open-Source" }
      ],
      tags: ["Full-Stack"],
      technologies: ["Full-Stack"],
      githubUrl: "https://github.com/kenechukwuosele/ml-datasets",
      liveUrl: "https://github.com/kenechukwuosele/ml-datasets",
      demoSnippet: "# Clone and inspect ml-datasets\ngit clone https://github.com/kenechukwuosele/ml-datasets.git\ncd ml-datasets\n",
      architecture: {
        layers: [
          { title: "Source & API Layer", description: "Core application logic and interface routines", technologies: ["TypeScript"] },
          { title: "Configuration & CI/CD", description: "Container setup and automated workflows", technologies: ["Git", "GitHub Actions"] }
        ],
        keyDecision: "Built with modular architecture to ensure testability and seamless extensibility.",
        latencyOrPerf: "Optimized for efficient execution and minimal dependency overhead."
      },
      glassHue: "from-emerald-500/20 via-teal-500/10 to-cyan-500/20",
      accentColor: "#10b981"
    },
    {
      id: "gdc",
      title: "GDc",
      tagline: "Colab for all the projects from ML crash course",
      category: "Full-Stack",
      description: "Colab for all the projects from ML crash course",
      longDescription: "An open-source project hosted on GitHub under @kenechukwuosele. Engineered with clean modular architecture, comprehensive documentation, and production design patterns.",
      featured: false,
      year: "2026",
      status: "Open Source",
      metrics: [
        { label: "Stars", value: "0", detail: "GitHub Stars" },
        { label: "Language", value: "Jupyter Notebook", detail: "Primary Codebase" },
        { label: "License", value: "MIT", detail: "Public Open-Source" }
      ],
      tags: ["Jupyter Notebook","Open Source"],
      technologies: ["Jupyter Notebook","Open Source"],
      githubUrl: "https://github.com/kenechukwuosele/GDc",
      liveUrl: "https://github.com/kenechukwuosele/GDc",
      demoSnippet: "# Clone and inspect GDc\ngit clone https://github.com/kenechukwuosele/GDc.git\ncd GDc\n",
      architecture: {
        layers: [
          { title: "Source & API Layer", description: "Core application logic and interface routines", technologies: ["Jupyter Notebook"] },
          { title: "Configuration & CI/CD", description: "Container setup and automated workflows", technologies: ["Git", "GitHub Actions"] }
        ],
        keyDecision: "Built with modular architecture to ensure testability and seamless extensibility.",
        latencyOrPerf: "Optimized for efficient execution and minimal dependency overhead."
      },
      glassHue: "from-purple-500/20 via-indigo-500/10 to-blue-500/20",
      accentColor: "#8b5cf6"
    },
    {
      id: "task-manager",
      title: "Task Manager",
      tagline: "Task Manager using MERN",
      category: "Full-Stack",
      description: "Task Manager using MERN",
      longDescription: "An open-source project hosted on GitHub under @kenechukwuosele. Engineered with clean modular architecture, comprehensive documentation, and production design patterns.",
      featured: false,
      year: "2025",
      status: "Open Source",
      metrics: [
        { label: "Stars", value: "1", detail: "GitHub Stars" },
        { label: "Language", value: "JavaScript", detail: "Primary Codebase" },
        { label: "License", value: "MIT", detail: "Public Open-Source" }
      ],
      tags: ["JavaScript","Open Source"],
      technologies: ["JavaScript","Open Source"],
      githubUrl: "https://github.com/kenechukwuosele/Task-Manager",
      liveUrl: "https://task-manager-frontend-1v6f.onrender.com",
      demoSnippet: "# Clone and inspect Task-Manager\ngit clone https://github.com/kenechukwuosele/Task-Manager.git\ncd Task-Manager\n",
      architecture: {
        layers: [
          { title: "Source & API Layer", description: "Core application logic and interface routines", technologies: ["JavaScript"] },
          { title: "Configuration & CI/CD", description: "Container setup and automated workflows", technologies: ["Git", "GitHub Actions"] }
        ],
        keyDecision: "Built with modular architecture to ensure testability and seamless extensibility.",
        latencyOrPerf: "Optimized for efficient execution and minimal dependency overhead."
      },
      glassHue: "from-amber-500/20 via-orange-500/10 to-rose-500/20",
      accentColor: "#f59e0b"
    },
    {
      id: "kenechukwuosele-github-io",
      title: "Kenechukwuosele.github.io",
      tagline: "Modern software project by Kenechukwu.",
      category: "Full-Stack",
      description: "Open source software system engineered by Osele Kenechukwu Alexander.",
      longDescription: "An open-source project hosted on GitHub under @kenechukwuosele. Engineered with clean modular architecture, comprehensive documentation, and production design patterns.",
      featured: false,
      year: "2026",
      status: "Open Source",
      metrics: [
        { label: "Stars", value: "0", detail: "GitHub Stars" },
        { label: "Language", value: "Multi-stack", detail: "Primary Codebase" },
        { label: "License", value: "MIT", detail: "Public Open-Source" }
      ],
      tags: ["Full-Stack"],
      technologies: ["Full-Stack"],
      githubUrl: "https://github.com/kenechukwuosele/kenechukwuosele.github.io",
      liveUrl: "https://github.com/kenechukwuosele/kenechukwuosele.github.io",
      demoSnippet: "# Clone and inspect kenechukwuosele.github.io\ngit clone https://github.com/kenechukwuosele/kenechukwuosele.github.io.git\ncd kenechukwuosele.github.io\n",
      architecture: {
        layers: [
          { title: "Source & API Layer", description: "Core application logic and interface routines", technologies: ["TypeScript"] },
          { title: "Configuration & CI/CD", description: "Container setup and automated workflows", technologies: ["Git", "GitHub Actions"] }
        ],
        keyDecision: "Built with modular architecture to ensure testability and seamless extensibility.",
        latencyOrPerf: "Optimized for efficient execution and minimal dependency overhead."
      },
      glassHue: "from-cyan-500/20 via-blue-500/10 to-indigo-500/20",
      accentColor: "#06b6d4"
    },
    {
      id: "rag-intro",
      title: "Rag Intro",
      tagline: "Modern Python project by Kenechukwu.",
      category: "Systems & AI",
      description: "Open source Python system engineered by Osele Kenechukwu Alexander.",
      longDescription: "An open-source project hosted on GitHub under @kenechukwuosele. Engineered with clean modular architecture, comprehensive documentation, and production design patterns.",
      featured: false,
      year: "2026",
      status: "Open Source",
      metrics: [
        { label: "Stars", value: "0", detail: "GitHub Stars" },
        { label: "Language", value: "Python", detail: "Primary Codebase" },
        { label: "License", value: "MIT", detail: "Public Open-Source" }
      ],
      tags: ["Python","Open Source"],
      technologies: ["Python","Open Source"],
      githubUrl: "https://github.com/kenechukwuosele/rag-intro",
      liveUrl: "https://github.com/kenechukwuosele/rag-intro",
      demoSnippet: "# Clone and inspect rag-intro\ngit clone https://github.com/kenechukwuosele/rag-intro.git\ncd rag-intro\n",
      architecture: {
        layers: [
          { title: "Source & API Layer", description: "Core application logic and interface routines", technologies: ["Python"] },
          { title: "Configuration & CI/CD", description: "Container setup and automated workflows", technologies: ["Git", "GitHub Actions"] }
        ],
        keyDecision: "Built with modular architecture to ensure testability and seamless extensibility.",
        latencyOrPerf: "Optimized for efficient execution and minimal dependency overhead."
      },
      glassHue: "from-sky-500/20 via-blue-500/10 to-indigo-500/20",
      accentColor: "#0284c7"
    },
    {
      id: "langchain",
      title: "Langchain",
      tagline: "Modern Python project by Kenechukwu.",
      category: "Systems & AI",
      description: "Open source Python system engineered by Osele Kenechukwu Alexander.",
      longDescription: "An open-source project hosted on GitHub under @kenechukwuosele. Engineered with clean modular architecture, comprehensive documentation, and production design patterns.",
      featured: false,
      year: "2026",
      status: "Open Source",
      metrics: [
        { label: "Stars", value: "0", detail: "GitHub Stars" },
        { label: "Language", value: "Python", detail: "Primary Codebase" },
        { label: "License", value: "MIT", detail: "Public Open-Source" }
      ],
      tags: ["Python","Open Source"],
      technologies: ["Python","Open Source"],
      githubUrl: "https://github.com/kenechukwuosele/Langchain",
      liveUrl: "https://github.com/kenechukwuosele/Langchain",
      demoSnippet: "# Clone and inspect Langchain\ngit clone https://github.com/kenechukwuosele/Langchain.git\ncd Langchain\n",
      architecture: {
        layers: [
          { title: "Source & API Layer", description: "Core application logic and interface routines", technologies: ["Python"] },
          { title: "Configuration & CI/CD", description: "Container setup and automated workflows", technologies: ["Git", "GitHub Actions"] }
        ],
        keyDecision: "Built with modular architecture to ensure testability and seamless extensibility.",
        latencyOrPerf: "Optimized for efficient execution and minimal dependency overhead."
      },
      glassHue: "from-emerald-500/20 via-teal-500/10 to-cyan-500/20",
      accentColor: "#10b981"
    },
    {
      id: "ngx",
      title: "Ngx",
      tagline: "Modern Python project by Kenechukwu.",
      category: "Systems & AI",
      description: "Open source Python system engineered by Osele Kenechukwu Alexander.",
      longDescription: "An open-source project hosted on GitHub under @kenechukwuosele. Engineered with clean modular architecture, comprehensive documentation, and production design patterns.",
      featured: false,
      year: "2026",
      status: "Open Source",
      metrics: [
        { label: "Stars", value: "0", detail: "GitHub Stars" },
        { label: "Language", value: "Python", detail: "Primary Codebase" },
        { label: "License", value: "MIT", detail: "Public Open-Source" }
      ],
      tags: ["Python","Open Source"],
      technologies: ["Python","Open Source"],
      githubUrl: "https://github.com/kenechukwuosele/ngx",
      liveUrl: "https://github.com/kenechukwuosele/ngx",
      demoSnippet: "# Clone and inspect ngx\ngit clone https://github.com/kenechukwuosele/ngx.git\ncd ngx\n",
      architecture: {
        layers: [
          { title: "Source & API Layer", description: "Core application logic and interface routines", technologies: ["Python"] },
          { title: "Configuration & CI/CD", description: "Container setup and automated workflows", technologies: ["Git", "GitHub Actions"] }
        ],
        keyDecision: "Built with modular architecture to ensure testability and seamless extensibility.",
        latencyOrPerf: "Optimized for efficient execution and minimal dependency overhead."
      },
      glassHue: "from-purple-500/20 via-indigo-500/10 to-blue-500/20",
      accentColor: "#8b5cf6"
    },
    {
      id: "weather",
      title: "Weather",
      tagline: "Modern Python project by Kenechukwu.",
      category: "Systems & AI",
      description: "Open source Python system engineered by Osele Kenechukwu Alexander.",
      longDescription: "An open-source project hosted on GitHub under @kenechukwuosele. Engineered with clean modular architecture, comprehensive documentation, and production design patterns.",
      featured: false,
      year: "2026",
      status: "Open Source",
      metrics: [
        { label: "Stars", value: "0", detail: "GitHub Stars" },
        { label: "Language", value: "Python", detail: "Primary Codebase" },
        { label: "License", value: "MIT", detail: "Public Open-Source" }
      ],
      tags: ["Python","Open Source"],
      technologies: ["Python","Open Source"],
      githubUrl: "https://github.com/kenechukwuosele/Weather",
      liveUrl: "https://github.com/kenechukwuosele/Weather",
      demoSnippet: "# Clone and inspect Weather\ngit clone https://github.com/kenechukwuosele/Weather.git\ncd Weather\n",
      architecture: {
        layers: [
          { title: "Source & API Layer", description: "Core application logic and interface routines", technologies: ["Python"] },
          { title: "Configuration & CI/CD", description: "Container setup and automated workflows", technologies: ["Git", "GitHub Actions"] }
        ],
        keyDecision: "Built with modular architecture to ensure testability and seamless extensibility.",
        latencyOrPerf: "Optimized for efficient execution and minimal dependency overhead."
      },
      glassHue: "from-amber-500/20 via-orange-500/10 to-rose-500/20",
      accentColor: "#f59e0b"
    },
    {
      id: "avatique",
      title: "Avatique",
      tagline: "Modern Python project by Kenechukwu.",
      category: "Systems & AI",
      description: "Open source Python system engineered by Osele Kenechukwu Alexander.",
      longDescription: "An open-source project hosted on GitHub under @kenechukwuosele. Engineered with clean modular architecture, comprehensive documentation, and production design patterns.",
      featured: false,
      year: "2025",
      status: "Open Source",
      metrics: [
        { label: "Stars", value: "0", detail: "GitHub Stars" },
        { label: "Language", value: "Python", detail: "Primary Codebase" },
        { label: "License", value: "MIT", detail: "Public Open-Source" }
      ],
      tags: ["Python","Open Source"],
      technologies: ["Python","Open Source"],
      githubUrl: "https://github.com/kenechukwuosele/avatique",
      liveUrl: "https://github.com/kenechukwuosele/avatique",
      demoSnippet: "# Clone and inspect avatique\ngit clone https://github.com/kenechukwuosele/avatique.git\ncd avatique\n",
      architecture: {
        layers: [
          { title: "Source & API Layer", description: "Core application logic and interface routines", technologies: ["Python"] },
          { title: "Configuration & CI/CD", description: "Container setup and automated workflows", technologies: ["Git", "GitHub Actions"] }
        ],
        keyDecision: "Built with modular architecture to ensure testability and seamless extensibility.",
        latencyOrPerf: "Optimized for efficient execution and minimal dependency overhead."
      },
      glassHue: "from-cyan-500/20 via-blue-500/10 to-indigo-500/20",
      accentColor: "#06b6d4"
    },
    {
      id: "mosh-master",
      title: "Mosh Master",
      tagline: "Modern TypeScript project by Kenechukwu.",
      category: "Full-Stack",
      description: "Open source TypeScript system engineered by Osele Kenechukwu Alexander.",
      longDescription: "An open-source project hosted on GitHub under @kenechukwuosele. Engineered with clean modular architecture, comprehensive documentation, and production design patterns.",
      featured: false,
      year: "2025",
      status: "Open Source",
      metrics: [
        { label: "Stars", value: "0", detail: "GitHub Stars" },
        { label: "Language", value: "TypeScript", detail: "Primary Codebase" },
        { label: "License", value: "MIT", detail: "Public Open-Source" }
      ],
      tags: ["TypeScript","Open Source"],
      technologies: ["TypeScript","Open Source"],
      githubUrl: "https://github.com/kenechukwuosele/mosh-master",
      liveUrl: "https://github.com/kenechukwuosele/mosh-master",
      demoSnippet: "# Clone and inspect mosh-master\ngit clone https://github.com/kenechukwuosele/mosh-master.git\ncd mosh-master\n",
      architecture: {
        layers: [
          { title: "Source & API Layer", description: "Core application logic and interface routines", technologies: ["TypeScript"] },
          { title: "Configuration & CI/CD", description: "Container setup and automated workflows", technologies: ["Git", "GitHub Actions"] }
        ],
        keyDecision: "Built with modular architecture to ensure testability and seamless extensibility.",
        latencyOrPerf: "Optimized for efficient execution and minimal dependency overhead."
      },
      glassHue: "from-sky-500/20 via-blue-500/10 to-indigo-500/20",
      accentColor: "#0284c7"
    },
    {
      id: "mosh",
      title: "Mosh",
      tagline: "Modern CSS project by Kenechukwu.",
      category: "Full-Stack",
      description: "Open source CSS system engineered by Osele Kenechukwu Alexander.",
      longDescription: "An open-source project hosted on GitHub under @kenechukwuosele. Engineered with clean modular architecture, comprehensive documentation, and production design patterns.",
      featured: false,
      year: "2025",
      status: "Open Source",
      metrics: [
        { label: "Stars", value: "0", detail: "GitHub Stars" },
        { label: "Language", value: "CSS", detail: "Primary Codebase" },
        { label: "License", value: "MIT", detail: "Public Open-Source" }
      ],
      tags: ["CSS","Open Source"],
      technologies: ["CSS","Open Source"],
      githubUrl: "https://github.com/kenechukwuosele/mosh",
      liveUrl: "https://github.com/kenechukwuosele/mosh",
      demoSnippet: "# Clone and inspect mosh\ngit clone https://github.com/kenechukwuosele/mosh.git\ncd mosh\n",
      architecture: {
        layers: [
          { title: "Source & API Layer", description: "Core application logic and interface routines", technologies: ["CSS"] },
          { title: "Configuration & CI/CD", description: "Container setup and automated workflows", technologies: ["Git", "GitHub Actions"] }
        ],
        keyDecision: "Built with modular architecture to ensure testability and seamless extensibility.",
        latencyOrPerf: "Optimized for efficient execution and minimal dependency overhead."
      },
      glassHue: "from-emerald-500/20 via-teal-500/10 to-cyan-500/20",
      accentColor: "#10b981"
    },
    {
      id: "demorepo",
      title: "Demorepo",
      tagline: "Modern Python project by Kenechukwu.",
      category: "Systems & AI",
      description: "Open source Python system engineered by Osele Kenechukwu Alexander.",
      longDescription: "An open-source project hosted on GitHub under @kenechukwuosele. Engineered with clean modular architecture, comprehensive documentation, and production design patterns.",
      featured: false,
      year: "2025",
      status: "Open Source",
      metrics: [
        { label: "Stars", value: "0", detail: "GitHub Stars" },
        { label: "Language", value: "Python", detail: "Primary Codebase" },
        { label: "License", value: "MIT", detail: "Public Open-Source" }
      ],
      tags: ["Python","Open Source"],
      technologies: ["Python","Open Source"],
      githubUrl: "https://github.com/kenechukwuosele/demorepo",
      liveUrl: "https://github.com/kenechukwuosele/demorepo",
      demoSnippet: "# Clone and inspect demorepo\ngit clone https://github.com/kenechukwuosele/demorepo.git\ncd demorepo\n",
      architecture: {
        layers: [
          { title: "Source & API Layer", description: "Core application logic and interface routines", technologies: ["Python"] },
          { title: "Configuration & CI/CD", description: "Container setup and automated workflows", technologies: ["Git", "GitHub Actions"] }
        ],
        keyDecision: "Built with modular architecture to ensure testability and seamless extensibility.",
        latencyOrPerf: "Optimized for efficient execution and minimal dependency overhead."
      },
      glassHue: "from-purple-500/20 via-indigo-500/10 to-blue-500/20",
      accentColor: "#8b5cf6"
    },
    {
      id: "rock--paper-and-scissors",
      title: "Rock Paper And Scissors",
      tagline: "A simple rock paper scissors using OdinProject",
      category: "Full-Stack",
      description: "A simple rock paper scissors using OdinProject",
      longDescription: "An open-source project hosted on GitHub under @kenechukwuosele. Engineered with clean modular architecture, comprehensive documentation, and production design patterns.",
      featured: false,
      year: "2025",
      status: "Open Source",
      metrics: [
        { label: "Stars", value: "0", detail: "GitHub Stars" },
        { label: "Language", value: "JavaScript", detail: "Primary Codebase" },
        { label: "License", value: "MIT", detail: "Public Open-Source" }
      ],
      tags: ["JavaScript","Open Source"],
      technologies: ["JavaScript","Open Source"],
      githubUrl: "https://github.com/kenechukwuosele/Rock--Paper-and-Scissors",
      liveUrl: "https://github.com/kenechukwuosele/Rock--Paper-and-Scissors",
      demoSnippet: "# Clone and inspect Rock--Paper-and-Scissors\ngit clone https://github.com/kenechukwuosele/Rock--Paper-and-Scissors.git\ncd Rock--Paper-and-Scissors\n",
      architecture: {
        layers: [
          { title: "Source & API Layer", description: "Core application logic and interface routines", technologies: ["JavaScript"] },
          { title: "Configuration & CI/CD", description: "Container setup and automated workflows", technologies: ["Git", "GitHub Actions"] }
        ],
        keyDecision: "Built with modular architecture to ensure testability and seamless extensibility.",
        latencyOrPerf: "Optimized for efficient execution and minimal dependency overhead."
      },
      glassHue: "from-amber-500/20 via-orange-500/10 to-rose-500/20",
      accentColor: "#f59e0b"
    },
    {
      id: "mastering-git",
      title: "Mastering Git",
      tagline: "Modern JavaScript project by Kenechukwu.",
      category: "Full-Stack",
      description: "Open source JavaScript system engineered by Osele Kenechukwu Alexander.",
      longDescription: "An open-source project hosted on GitHub under @kenechukwuosele. Engineered with clean modular architecture, comprehensive documentation, and production design patterns.",
      featured: false,
      year: "2025",
      status: "Open Source",
      metrics: [
        { label: "Stars", value: "0", detail: "GitHub Stars" },
        { label: "Language", value: "JavaScript", detail: "Primary Codebase" },
        { label: "License", value: "MIT", detail: "Public Open-Source" }
      ],
      tags: ["JavaScript","Open Source"],
      technologies: ["JavaScript","Open Source"],
      githubUrl: "https://github.com/kenechukwuosele/mastering-git",
      liveUrl: "https://github.com/kenechukwuosele/mastering-git",
      demoSnippet: "# Clone and inspect mastering-git\ngit clone https://github.com/kenechukwuosele/mastering-git.git\ncd mastering-git\n",
      architecture: {
        layers: [
          { title: "Source & API Layer", description: "Core application logic and interface routines", technologies: ["JavaScript"] },
          { title: "Configuration & CI/CD", description: "Container setup and automated workflows", technologies: ["Git", "GitHub Actions"] }
        ],
        keyDecision: "Built with modular architecture to ensure testability and seamless extensibility.",
        latencyOrPerf: "Optimized for efficient execution and minimal dependency overhead."
      },
      glassHue: "from-cyan-500/20 via-blue-500/10 to-indigo-500/20",
      accentColor: "#06b6d4"
    }
  ],
  skillCategories: [
    {
      title: "Internet Protocols & Network Architecture",
      description: "Transport semantics, socket programming, HTTP/2 multiplexing, WebSocket streams, and telemetry.",
      skills: [
        { name: "TCP/IP & Socket Programming", level: "Expert", years: 4, highlight: "Connection Handshakes, TCP Windowing, Socket Semantics & Telemetry" },
        { name: "HTTP/1.1, HTTP/2 & WebSockets", level: "Expert", years: 4, highlight: "Stream Framing, Full-Duplex Channels & Connection Keep-Alive" },
        { name: "DNS, TLS/SSL & Network Isolation", level: "Advanced", years: 3, highlight: "Handshake Negotiation, Certificate Verification & Subnet Isolation" },
        { name: "ASGI & WSGI Network Models", level: "Expert", years: 4, highlight: "Asynchronous Gateway Lifecycles, Middleware & Reverse Proxying" }
      ]
    },
    {
      title: "Concurrency & Asynchronous Systems",
      description: "Non-blocking I/O multiplexing, Python asyncio, event-loop scheduling, and connection pooling.",
      skills: [
        { name: "Python asyncio & Event Loops", level: "Expert", years: 4, highlight: "Coroutines, Non-Blocking Sockets, Tasks & Sub-Millisecond Scheduling" },
        { name: "Database Connection Pooling", level: "Expert", years: 4, highlight: "Async SQLAlchemy, Connection Starvation Mitigation & Transaction Isolation" },
        { name: "Distributed Redis Caching & Locking", level: "Expert", years: 3, highlight: "Atomic Primitives, Distributed Locks, Token Revocation & Pub/Sub" },
        { name: "Thread Pools & Worker Processes", level: "Advanced", years: 3, highlight: "Offloading CPU-Bound Routines & Multiprocess Worker Clusters" }
      ]
    },
    {
      title: "Cryptographic Security & System Hardening",
      description: "Memory-hard password hashing, token lifecycle revocation, timing defenses, and zero-trust APIs.",
      skills: [
        { name: "Argon2id Memory-Hard Hashing", level: "Expert", years: 3, highlight: "GPU/ASIC Resistance, Tuned Time/Memory Parameters & Salt Entropy" },
        { name: "Dual-Token Cryptographic Auth", level: "Expert", years: 4, highlight: "Short-Lived Access JWTs, Refresh Token Rotation & Redis Blacklisting" },
        { name: "Defensive API Hardening", level: "Expert", years: 4, highlight: "Constant-Time Comparisons, Rate Limiting, Input Sanitization & CORS" },
        { name: "Linux Systems & Container Isolation", level: "Advanced", years: 4, highlight: "Docker Multi-Stage Builds, Shell Scripting & Server Hardening" }
      ]
    },
    {
      title: "Algorithms, Data Structures & Applied AI",
      description: "Time-space complexity optimization, vector indexing, cache eviction, and dual-model critic routing.",
      skills: [
        { name: "Algorithmic Complexity & Structures", level: "Expert", years: 4, highlight: "Hash Maps, Graphs, Trees, Heaps & Amortized Bound Guarantees" },
        { name: "Vector Indexing & Retrieval (RAG)", level: "Advanced", years: 2, highlight: "ChromaDB, Approximate Nearest Neighbors & Dense Embeddings" },
        { name: "Two-Model Critic Verification", level: "Expert", years: 2, highlight: "Hierarchical Task Routing, Query Validation Trees & 90% Cost Reduction" },
        { name: "Cache Invalidation & Eviction (LRU)", level: "Advanced", years: 3, highlight: "Cache Hit Maximization, TTL Lifecycle & Memory Bounds" }
      ]
    },
    {
      title: "Languages & Systems Communication",
      description: "Multilingual technical communication and international engineering collaboration.",
      skills: [
        { name: "German (Deutsch)", level: "Intermediate", years: 3, highlight: "Technical & Conversational Working Proficiency" },
        { name: "English", level: "Expert", years: 10, highlight: "Fluent Professional Technical & Architectural Communication" }
      ]
    }
  ],
  experience: [
    {
      id: "exp-fcmb",
      company: "First City Monument Bank (FCMB), Lagos",
      role: "Networking Intern",
      period: "Mar 2025 – Nov 2025",
      location: "Lagos, Nigeria",
      type: "Internship",
      description: "Resolved multi-branch network downtime incidents and led nationwide telemetry reporting across 200+ banking sites.",
      achievements: [
        "Escalated network faults to ISPs and resolved downtime incidents across multiple branches, cutting average resolution time by 4hrs/day.",
        "Led report generation spanning all branch networks across Nigeria as head networking intern, consolidating telemetry from over 200 sites into unified monitoring summaries."
      ],
      technologies: ["Computer Networks", "Network Telemetry", "Incident Resolution", "ISP Escalation", "Monitoring Summaries"],
      highlightMetric: "-4 hrs downtime/day"
    },
    {
      id: "exp-univasa",
      company: "UNIVASA eSIM Technologies, Lagos",
      role: "Software and Documentation Intern",
      period: "Mar 2025 – Sep 2025",
      location: "Lagos, Nigeria",
      type: "Internship",
      description: "Authored developer API documentation and shipped Python data-cleaning automation scripts.",
      achievements: [
        "Authored complete REST API documentation for UNIVASA eSIM covering endpoint references, authentication flows, error codes, and integration examples, cutting third-party developer onboarding time.",
        "Shipped a Python data-cleaning and reporting automation script for a small business client, removing roughly four hours of manual reporting work per weekly cycle."
      ],
      technologies: ["Python", "REST APIs", "API Documentation", "Data Automation", "Developer Onboarding"],
      highlightMetric: "4 hrs/wk saved via Python script"
    },
    {
      id: "exp-cuala",
      company: "CUALA Trade Fair, Covenant University",
      role: "Social Media Volunteer",
      period: "Aug 2026 – Sept 2026",
      location: "Ota, Nigeria",
      type: "Volunteer",
      description: "Supported trade fair promotion and aligned volunteer outreach with the event's promotional schedule.",
      achievements: [
        "Supported trade fair promotion by engaging with and resharing official posts across personal social media accounts.",
        "Attended online coordination sessions to align volunteer outreach with the event's promotional schedule."
      ],
      technologies: ["Digital Marketing", "Social Media Outreach", "Team Coordination"],
      highlightMetric: "Trade Fair Outreach"
    },
    {
      id: "exp-opensource-ai",
      company: "Open-Source & AI Systems Engineering",
      role: "Full-Stack & Systems Developer",
      period: "2024 – Present",
      location: "Nigeria / Remote",
      type: "Open Source",
      description: "Engineering production-grade authentication microservices, AI terminal copilots, and educational platforms.",
      achievements: [
        "Engineered AuthService: an asynchronous FastAPI microservice with Argon2id cryptographic hashing and Redis token revocation.",
        "Created DbAdmin AI: natural language database CLI across 4 engines (PostgreSQL, MySQL, MongoDB, Redis) with dual-model critic routing.",
        "Developed AI-augmented student assessment platform featuring browser-side face verification, engagement monitoring, and RAG hints.",
        "Built Digital SIWES+ platform with Python, FastAPI, React, and Node.js to digitize university placement workflows."
      ],
      technologies: ["FastAPI", "Python", "TypeScript", "React", "PostgreSQL", "Redis", "Argon2", "ChromaDB"],
      highlightMetric: "30+ public repositories"
    }
  ],
  labExperiments: [
    {
      id: "exp-liquid-optics",
      title: "Liquid Refraction Simulator",
      category: "WebGL Shaders",
      description: "Interactive real-time fluid refraction controller adjusting viscosity and chromatic dispersion.",
      interactiveType: "shader",
      codeSnippet: "vec2 uv = gl_FragCoord.xy / u_resolution;\nvec2 distorted = uv + normal.xy * u_dispersion;\nfragColor = texture(u_texture, distorted);"
    },
    {
      id: "exp-glass-audio",
      title: "Acoustic Glass Resonator",
      category: "Web Audio Synthesizer",
      description: "Harmonic crystal synthesizer producing pure sine-wave glass chimes and tactile haptic taps.",
      interactiveType: "audio",
      codeSnippet: "const osc = audioCtx.createOscillator();\nconst gain = audioCtx.createGain();\nosc.frequency.setValueAtTime(freq, audioCtx.currentTime);\ngain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);"
    },
    {
      id: "exp-frame-budget",
      title: "Frame Budget Observer",
      category: "Performance Telemetry",
      description: "Real-time 60-120 FPS performance telemetry measuring millisecond render loop stability.",
      interactiveType: "bench",
      codeSnippet: "const delta = performance.now() - lastFrameTime;\nconst instantFps = 1000 / delta;\nrequestAnimationFrame(renderLoop);"
    }
  ]
};
