"use client";
import { useState, useMemo } from "react";
import { FaBook, FaSearch } from "react-icons/fa";

const TERMS = [
  { term: "API", category: "Backend", definition: "Application Programming Interface — a set of rules that allows programs to communicate with each other. Like a waiter who takes your order to the kitchen and brings back the food." },
  { term: "REST", category: "Backend", definition: "Representational State Transfer — an architectural style for designing networked APIs using HTTP methods (GET, POST, PUT, DELETE) on resources identified by URLs." },
  { term: "GraphQL", category: "Backend", definition: "A query language for APIs where the client specifies exactly what data it needs. Unlike REST, there's one endpoint and you ask for specific fields." },
  { term: "Microservices", category: "Backend", definition: "An architectural pattern where an application is built as a collection of small, independent services each running in its own process and communicating via APIs." },
  { term: "ORM", category: "Backend", definition: "Object-Relational Mapper — a technique that lets developers query and manipulate a database using an object-oriented language instead of SQL. Examples: Prisma, Sequelize, TypeORM." },
  { term: "Middleware", category: "Backend", definition: "Software that sits between a request and a response, processing or modifying them. In Express.js, middleware functions execute during the request-response lifecycle." },
  { term: "JWT", category: "Security", definition: "JSON Web Token — a compact, URL-safe way to securely transmit information between parties as a JSON object. Commonly used for authentication." },
  { term: "OAuth", category: "Security", definition: "An open standard for authorization that lets users grant third-party apps access to their resources without sharing passwords. Powers 'Sign in with Google/GitHub'." },
  { term: "CORS", category: "Security", definition: "Cross-Origin Resource Sharing — a browser security mechanism that controls which domains can access your API. Prevents unauthorized cross-origin requests." },
  { term: "SQL Injection", category: "Security", definition: "A code injection attack that inserts malicious SQL queries into input fields, allowing attackers to read, modify, or delete database data." },
  { term: "React", category: "Frontend", definition: "A JavaScript library by Meta for building user interfaces using reusable components and a virtual DOM for efficient updates." },
  { term: "Virtual DOM", category: "Frontend", definition: "A lightweight copy of the real DOM kept in memory. React uses it to calculate minimal DOM updates needed, making UI rendering more efficient." },
  { term: "SSR", category: "Frontend", definition: "Server-Side Rendering — the page HTML is generated on the server for each request. Improves SEO and initial load time. Used in Next.js." },
  { term: "SSG", category: "Frontend", definition: "Static Site Generation — HTML pages are generated at build time, not request time. Super fast since pages are pre-built. Great for blogs." },
  { term: "Hydration", category: "Frontend", definition: "The process where client-side JavaScript 'takes over' a server-rendered HTML page, attaching event listeners to make it interactive." },
  { term: "CSS-in-JS", category: "Frontend", definition: "A technique where CSS styles are written inside JavaScript files. Libraries include styled-components and Emotion. Enables scoped, dynamic styles." },
  { term: "PWA", category: "Frontend", definition: "Progressive Web App — a web app with native-like features such as offline support, push notifications, and home screen installation via Service Workers." },
  { term: "Docker", category: "DevOps", definition: "A containerization platform that packages an application and its dependencies into a portable container, ensuring it runs the same everywhere." },
  { term: "Kubernetes", category: "DevOps", definition: "An open-source container orchestration system that automates deploying, scaling, and managing containerized applications across clusters of machines." },
  { term: "CI/CD", category: "DevOps", definition: "Continuous Integration/Continuous Deployment — automating the building, testing, and deployment of code changes so releases happen frequently and reliably." },
  { term: "IaC", category: "DevOps", definition: "Infrastructure as Code — managing and provisioning infrastructure through code (like Terraform, Ansible) instead of manual processes." },
  { term: "Service Mesh", category: "DevOps", definition: "A dedicated infrastructure layer for handling service-to-service communication in microservices, providing load balancing, observability, and security." },
  { term: "LLM", category: "AI/ML", definition: "Large Language Model — a type of AI model trained on massive text datasets to understand and generate human-like text. Examples: GPT-4, LLaMA, Gemini." },
  { term: "Transformer", category: "AI/ML", definition: "A neural network architecture based on attention mechanisms, foundational to modern NLP models. Introduced in 'Attention Is All You Need' (2017)." },
  { term: "Fine-tuning", category: "AI/ML", definition: "Taking a pre-trained AI model and training it further on a smaller, specific dataset to specialize its capabilities for a particular task." },
  { term: "RAG", category: "AI/ML", definition: "Retrieval-Augmented Generation — enhancing LLM responses by first retrieving relevant documents from a knowledge base and including them in the context." },
  { term: "Embeddings", category: "AI/ML", definition: "Dense numerical vector representations of data (text, images) that capture semantic meaning, enabling similarity search and clustering." },
  { term: "Big O Notation", category: "DSA", definition: "A mathematical notation describing the upper bound of algorithm complexity in terms of time and space as input size (n) grows. E.g., O(n), O(log n), O(n²)." },
  { term: "Binary Search", category: "DSA", definition: "A search algorithm that finds a target in a sorted array by repeatedly dividing the search interval in half. Time complexity: O(log n)." },
  { term: "Hash Table", category: "DSA", definition: "A data structure that maps keys to values using a hash function for O(1) average-case lookups. JavaScript objects and Maps use this internally." },
  { term: "Recursion", category: "DSA", definition: "A function that calls itself to solve smaller instances of the same problem. Requires a base case to prevent infinite loops. Powers DFS, tree traversal, etc." },
  { term: "Dynamic Programming", category: "DSA", definition: "A technique for solving complex problems by breaking them into simpler overlapping subproblems and storing results to avoid recomputation (memoization/tabulation)." },
  { term: "Git", category: "Tools", definition: "A distributed version control system that tracks changes in source code. Allows multiple developers to collaborate and maintains complete project history." },
  { term: "Monorepo", category: "Tools", definition: "A single repository containing multiple projects or packages. Tools like Turborepo, Nx, and Lerna manage monorepos. Used by Google, Meta, and Microsoft." },
  { term: "Webpack", category: "Tools", definition: "A module bundler for JavaScript applications that processes assets (JS, CSS, images) and bundles them into optimized files for production." },
  { term: "TypeScript", category: "Frontend", definition: "A superset of JavaScript that adds static type definitions. Helps catch errors at compile time instead of runtime. Compiles down to plain JavaScript." },
  { term: "WebSocket", category: "Backend", definition: "A protocol providing full-duplex (two-way) communication over a single TCP connection. Powers real-time features like chats, live updates, and multiplayer games." },
  { term: "Idempotent", category: "Backend", definition: "An operation that produces the same result regardless of how many times it's performed. GET and PUT requests should be idempotent; POST generally isn't." },
  { term: "Caching", category: "Backend", definition: "Storing copies of data in a fast-access layer (memory, CDN) to reduce expensive operations. Redis, Memcached, and HTTP cache headers are common tools." },
  { term: "CDN", category: "Backend", definition: "Content Delivery Network — a geographically distributed network of servers that delivers content from the nearest location to the user, reducing latency." },
  { term: "Event Loop", category: "Frontend", definition: "JavaScript's mechanism for executing code, collecting events, and executing queued sub-tasks. It's why JS can handle async operations despite being single-threaded." },
  { term: "Closure", category: "Frontend", definition: "A function that 'remembers' variables from its outer scope even after the outer function has returned. Fundamental to JavaScript's functional patterns." },
  { term: "Memoization", category: "DSA", definition: "An optimization technique that caches function results for given inputs. If called again with the same inputs, returns the cached result instead of recalculating." },
  { term: "Load Balancer", category: "DevOps", definition: "A component that distributes incoming network traffic across multiple servers to ensure no single server bears too much load. Improves reliability and scalability." },
  { term: "Latency", category: "DevOps", definition: "The time delay between a request being made and the response being received. Measured in milliseconds. Affected by network distance, server processing, and more." },
  { term: "Throughput", category: "DevOps", definition: "The number of operations a system can process per unit of time. Often measured in requests per second (RPS) or transactions per second (TPS)." },
  { term: "ACID", category: "Backend", definition: "Atomicity, Consistency, Isolation, Durability — four properties that guarantee database transactions are processed reliably, even in the event of failures." },
  { term: "CAP Theorem", category: "Backend", definition: "States that a distributed system can only guarantee two of three properties simultaneously: Consistency, Availability, and Partition Tolerance." },
  { term: "Serverless", category: "DevOps", definition: "A cloud execution model where the cloud provider manages server infrastructure. You write functions that auto-scale on demand. Examples: AWS Lambda, Vercel Functions." },
  { term: "Semantic Versioning", category: "Tools", definition: "A versioning scheme (MAJOR.MINOR.PATCH) where changes follow rules: MAJOR for breaking changes, MINOR for new features, PATCH for bug fixes. E.g., 2.1.3." },
];

const CATEGORIES = ["All", "Frontend", "Backend", "DevOps", "AI/ML", "Security", "DSA", "Tools"];
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function GlossaryPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [expanded, setExpanded] = useState(null);
  const [jumpLetter, setJumpLetter] = useState("");

  const filtered = useMemo(() =>
    TERMS.filter(t =>
      (category === "All" || t.category === category) &&
      (t.term.toLowerCase().includes(search.toLowerCase()) || t.definition.toLowerCase().includes(search.toLowerCase())) &&
      (!jumpLetter || t.term.toUpperCase().startsWith(jumpLetter))
    ).sort((a, b) => a.term.localeCompare(b.term)), [search, category, jumpLetter]);

  const CATEGORY_COLORS = { Frontend: "#3b82f6", Backend: "#8b5cf6", DevOps: "#f59e0b", "AI/ML": "#ec4899", Security: "#ef4444", DSA: "#22c55e", Tools: "#06b6d4" };

  return (
    <div className="container py-5" style={{ maxWidth: 900 }}>
      <div className="text-center mb-5">
        <div className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle" style={{ width: 64, height: 64, background: "linear-gradient(135deg, #06b6d4, #3b82f6)" }}>
          <FaBook size={26} color="#fff" />
        </div>
        <h1 className="fw-bold" style={{ color: "var(--text-primary)" }}>Tech Glossary</h1>
        <p className="text-secondary">{TERMS.length} essential developer terms explained simply</p>
      </div>

      {/* Search + filter */}
      <div className="rounded-4 p-4 mb-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color, #333)" }}>
        <div className="input-group mb-3">
          <span className="input-group-text border-secondary bg-transparent"><FaSearch className="text-secondary" size={14} /></span>
          <input className="form-control border-secondary" style={{ backgroundColor: "var(--bg-card)", color: "var(--text-primary)" }}
            placeholder="Search terms or definitions..." value={search} onChange={e => { setSearch(e.target.value); setJumpLetter(""); }} />
        </div>
        <div className="d-flex flex-wrap gap-2">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={`btn btn-sm ${category === c ? "btn-primary" : "btn-outline-secondary"}`}
              style={{ borderRadius: 20, fontSize: 12 }}>{c}</button>
          ))}
        </div>
      </div>

      {/* Alphabet jump */}
      <div className="d-flex flex-wrap gap-1 mb-4 justify-content-center">
        <button className={`btn btn-sm ${!jumpLetter ? "btn-primary" : "btn-outline-secondary"}`} style={{ minWidth: 32, fontSize: 12 }} onClick={() => setJumpLetter("")}>All</button>
        {ALPHABET.map(l => {
          const has = TERMS.some(t => t.term.toUpperCase().startsWith(l));
          return (
            <button key={l} onClick={() => has && setJumpLetter(l === jumpLetter ? "" : l)}
              className={`btn btn-sm ${jumpLetter === l ? "btn-primary" : "btn-outline-secondary"}`}
              style={{ minWidth: 32, fontSize: 12, opacity: has ? 1 : 0.3 }}>{l}</button>
          );
        })}
      </div>

      {/* Terms */}
      <p className="text-secondary small mb-3">{filtered.length} terms</p>
      <div className="d-flex flex-column gap-2">
        {filtered.map(t => (
          <div key={t.term} className="rounded-3 overflow-hidden" style={{ border: "1px solid var(--border-color, #333)", cursor: "pointer" }}
            onClick={() => setExpanded(expanded === t.term ? null : t.term)}>
            <div className="d-flex align-items-center justify-content-between px-4 py-3"
              style={{ backgroundColor: expanded === t.term ? "rgba(59,130,246,0.06)" : "var(--bg-card)" }}>
              <div className="d-flex align-items-center gap-3">
                <code className="fw-bold" style={{ fontSize: 15, color: "var(--text-primary)" }}>{t.term}</code>
                <span className="badge" style={{
                  backgroundColor: (CATEGORY_COLORS[t.category] || "#6b7280") + "22",
                  color: CATEGORY_COLORS[t.category] || "#6b7280",
                  border: `1px solid ${(CATEGORY_COLORS[t.category] || "#6b7280")}44`,
                  fontSize: 11,
                }}>{t.category}</span>
              </div>
              <span style={{ color: "var(--text-secondary)", fontSize: 18 }}>{expanded === t.term ? "−" : "+"}</span>
            </div>
            {expanded === t.term && (
              <div className="px-4 py-3" style={{ backgroundColor: "var(--bg-card)", borderTop: "1px solid var(--border-color, #333)" }}>
                <p className="mb-0" style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: 14 }}>{t.definition}</p>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-5 text-secondary">
            <FaBook size={40} className="mb-3 opacity-25" />
            <p>No terms found for &ldquo;{search}&rdquo;</p>
          </div>
        )}
      </div>
    </div>
  );
}
