"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaRoad, FaCheckCircle, FaCircle, FaChevronDown, FaChevronUp, FaCode, FaServer, FaCloud, FaRobot, FaMobile } from "react-icons/fa";

const ROADMAPS = [
  {
    id: "frontend",
    title: "Frontend Developer",
    icon: "💻",
    color: "#3b82f6",
    steps: [
      { id: "html", label: "HTML5 Fundamentals", desc: "Semantic tags, forms, accessibility" },
      { id: "css", label: "CSS3 & Flexbox/Grid", desc: "Responsive design, animations" },
      { id: "js-basics", label: "JavaScript Basics", desc: "ES6+, DOM, events, async/await" },
      { id: "react", label: "React.js", desc: "Hooks, state, context, routing" },
      { id: "tailwind", label: "Tailwind CSS / Bootstrap", desc: "Utility-first CSS frameworks" },
      { id: "typescript", label: "TypeScript", desc: "Types, interfaces, generics" },
      { id: "nextjs", label: "Next.js", desc: "SSR, SSG, API routes, App Router" },
      { id: "testing-fe", label: "Testing (Jest + RTL)", desc: "Unit tests, integration tests" },
      { id: "vite", label: "Vite / Webpack", desc: "Build tools & bundlers" },
      { id: "perf", label: "Web Performance", desc: "Core Web Vitals, lazy loading, caching" },
    ],
  },
  {
    id: "backend",
    title: "Backend Developer",
    icon: "⚙️",
    color: "#10b981",
    steps: [
      { id: "node", label: "Node.js", desc: "Event loop, streams, npm ecosystem" },
      { id: "express", label: "Express.js / Fastify", desc: "REST APIs, middleware, routing" },
      { id: "db-sql", label: "SQL Databases", desc: "PostgreSQL, MySQL — queries & joins" },
      { id: "db-nosql", label: "NoSQL (MongoDB)", desc: "Documents, aggregation, indexing" },
      { id: "auth", label: "Auth (JWT + OAuth2)", desc: "Sessions, tokens, security" },
      { id: "redis", label: "Redis / Caching", desc: "In-memory caching, pub/sub" },
      { id: "api-design", label: "REST & GraphQL APIs", desc: "Design, versioning, best practices" },
      { id: "docker-be", label: "Docker", desc: "Containers, Dockerfile, docker-compose" },
      { id: "testing-be", label: "Testing (Jest / Mocha)", desc: "Unit, integration, E2E tests" },
      { id: "websockets", label: "WebSockets / gRPC", desc: "Real-time, streaming communication" },
    ],
  },
  {
    id: "devops",
    title: "DevOps Engineer",
    icon: "🚀",
    color: "#f59e0b",
    steps: [
      { id: "linux", label: "Linux & Shell Scripting", desc: "Bash, cron, file system" },
      { id: "git-ops", label: "Git & GitHub Actions", desc: "CI/CD pipelines, workflows" },
      { id: "docker-do", label: "Docker & Compose", desc: "Containerization, networking" },
      { id: "k8s", label: "Kubernetes", desc: "Pods, services, deployments, Helm" },
      { id: "cloud", label: "Cloud (AWS/GCP/Azure)", desc: "EC2, S3, Lambda, Cloud Run" },
      { id: "terraform", label: "Terraform / IaC", desc: "Infrastructure as Code" },
      { id: "monitoring", label: "Monitoring (Prometheus)", desc: "Grafana, logging, alerts" },
      { id: "nginx", label: "Nginx / Load Balancing", desc: "Reverse proxy, SSL" },
      { id: "security", label: "Security Basics", desc: "OWASP, firewalls, secrets management" },
      { id: "gitops", label: "GitOps / ArgoCD", desc: "Continuous deployment patterns" },
    ],
  },
  {
    id: "aiml",
    title: "AI / ML Engineer",
    icon: "🤖",
    color: "#8b5cf6",
    steps: [
      { id: "python-ai", label: "Python Proficiency", desc: "NumPy, Pandas, data handling" },
      { id: "math", label: "Math for ML", desc: "Linear algebra, calculus, probability" },
      { id: "sklearn", label: "Scikit-learn", desc: "Classical ML algorithms" },
      { id: "neural", label: "Neural Networks", desc: "Backprop, activation functions" },
      { id: "pytorch", label: "PyTorch / TensorFlow", desc: "Deep learning frameworks" },
      { id: "nlp", label: "NLP & Transformers", desc: "BERT, GPT, tokenization" },
      { id: "llm", label: "LLMs & Fine-tuning", desc: "LoRA, PEFT, prompt engineering" },
      { id: "mlops", label: "MLOps", desc: "Model deployment, monitoring, MLflow" },
      { id: "computer-vision", label: "Computer Vision", desc: "CNNs, YOLO, image processing" },
      { id: "rag", label: "RAG & Vector DBs", desc: "LangChain, Pinecone, embeddings" },
    ],
  },
  {
    id: "android",
    title: "Android Developer",
    icon: "📱",
    color: "#ef4444",
    steps: [
      { id: "kotlin", label: "Kotlin Fundamentals", desc: "Syntax, OOP, coroutines" },
      { id: "android-basics", label: "Android SDK Basics", desc: "Activities, fragments, lifecycle" },
      { id: "jetpack-compose", label: "Jetpack Compose", desc: "Declarative UI, state" },
      { id: "mvvm", label: "MVVM Architecture", desc: "ViewModel, LiveData, StateFlow" },
      { id: "room", label: "Room Database", desc: "Local SQLite with ORM" },
      { id: "retrofit", label: "Retrofit / API Calls", desc: "Networking, JSON parsing" },
      { id: "di", label: "Dependency Injection (Hilt)", desc: "Hilt, Dagger basics" },
      { id: "material3", label: "Material Design 3", desc: "Themes, components, motion" },
      { id: "firebase-android", label: "Firebase Integration", desc: "Auth, Firestore, FCM" },
      { id: "publish", label: "Play Store Publishing", desc: "Signing, release, ASO" },
    ],
  },
];

export default function RoadmapsPage() {
  const [checked, setChecked] = useState({});
  const [open, setOpen] = useState("frontend");

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("roadmap_progress") || "{}");
      setChecked(saved);
    } catch {}
  }, []);

  const toggle = (stepId) => {
    setChecked((prev) => {
      const next = { ...prev, [stepId]: !prev[stepId] };
      localStorage.setItem("roadmap_progress", JSON.stringify(next));
      return next;
    });
  };

  const progress = (roadmap) => {
    const done = roadmap.steps.filter((s) => checked[s.id]).length;
    return Math.round((done / roadmap.steps.length) * 100);
  };

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center gap-3 mb-2">
        <FaRoad size={28} className="text-primary" />
        <h1 className="h2 mb-0 fw-bold">Developer Roadmaps</h1>
      </div>
      <p className="text-secondary mb-4">
        Track your learning journey. Check off topics as you master them — progress auto-saves in your browser.
      </p>

      {/* Roadmap overview cards */}
      <div className="row g-3 mb-4">
        {ROADMAPS.map((rm) => {
          const pct = progress(rm);
          return (
            <div key={rm.id} className="col-6 col-md-4 col-lg-2" style={{ minWidth: 150 }}>
              <button
                className={`card w-100 text-start p-3 border-0 ${open === rm.id ? "bg-opacity-20" : ""}`}
                style={{ background: open === rm.id ? `color-mix(in srgb, ${rm.color} 15%, var(--bg-card))` : "var(--bg-card)", cursor: "pointer", borderRadius: 12, border: `1px solid ${open === rm.id ? rm.color : "var(--border-color)"}` }}
                onClick={() => setOpen(rm.id)}
              >
                <div style={{ fontSize: "1.6rem" }}>{rm.icon}</div>
                <div className="fw-600 small mt-1" style={{ color: "var(--text-primary)" }}>{rm.title}</div>
                <div className="d-flex align-items-center gap-1 mt-2">
                  <div className="flex-grow-1 rounded" style={{ height: 4, background: "var(--border-color)", overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: rm.color, transition: "width 0.4s" }} />
                  </div>
                  <span className="text-secondary" style={{ fontSize: "0.65rem", whiteSpace: "nowrap" }}>{pct}%</span>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Active roadmap */}
      {ROADMAPS.filter((rm) => rm.id === open).map((rm) => {
        const pct = progress(rm);
        const done = rm.steps.filter((s) => checked[s.id]).length;
        return (
          <div key={rm.id} className="card p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="h4 mb-0 fw-bold">{rm.icon} {rm.title} Roadmap</h2>
              <span className="badge" style={{ background: rm.color, color: "#fff", fontSize: "0.8rem", padding: "6px 14px", borderRadius: 20 }}>
                {done}/{rm.steps.length} done
              </span>
            </div>
            <div className="mb-4 rounded" style={{ height: 8, background: "var(--border-color)", overflow: "hidden" }}>
              <div style={{ width: `${pct}%`, height: "100%", background: rm.color, transition: "width 0.5s ease" }} />
            </div>
            <div className="row g-3">
              {rm.steps.map((step, i) => (
                <div key={step.id} className="col-md-6 col-lg-4">
                  <div
                    className="d-flex align-items-start gap-3 p-3 rounded-3"
                    style={{
                      background: checked[step.id] ? `color-mix(in srgb, ${rm.color} 10%, var(--bg-card))` : "var(--bg-card)",
                      border: `1px solid ${checked[step.id] ? rm.color : "var(--border-color)"}`,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onClick={() => toggle(step.id)}
                  >
                    <span style={{ color: checked[step.id] ? rm.color : "var(--text-secondary)", marginTop: 2, flexShrink: 0 }}>
                      {checked[step.id] ? <FaCheckCircle size={18} /> : <FaCircle size={18} />}
                    </span>
                    <div>
                      <div className="fw-600 small" style={{ textDecoration: checked[step.id] ? "line-through" : "none", opacity: checked[step.id] ? 0.6 : 1 }}>
                        <span className="text-secondary me-1" style={{ fontSize: "0.65rem" }}>#{i + 1}</span>
                        {step.label}
                      </div>
                      <div className="text-secondary" style={{ fontSize: "0.72rem", marginTop: 2 }}>{step.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {pct === 100 && (
              <div className="text-center mt-4 p-3 rounded-3" style={{ background: `color-mix(in srgb, ${rm.color} 15%, transparent)`, border: `1px solid ${rm.color}` }}>
                <div style={{ fontSize: "2rem" }}>🎉</div>
                <div className="fw-bold mt-1" style={{ color: rm.color }}>Roadmap Complete! You&apos;re a {rm.title}!</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
