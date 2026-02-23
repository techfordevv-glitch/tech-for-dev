export const DEVTOOLS = [
  {
    id: "vscode",
    name: "Visual Studio Code",
    category: "Editor",
    tagline: "The world's most popular free code editor.",
    desc: "The most popular free code editor with a rich extension ecosystem, built-in Git, debugging, and IntelliSense.",
    longDesc: `Visual Studio Code (VS Code) is a lightweight but powerful source code editor by Microsoft, available for Windows, macOS, and Linux. Since its release in 2015, it has grown to become the most widely used code editor in the world, favored by millions of developers across all disciplines.

VS Code comes with built-in support for JavaScript, TypeScript, and Node.js, and offers a rich extension ecosystem for nearly every other language and framework, including Python, C++, Java, Go, Rust, PHP, and more. Extensions can add language support, debuggers, linters, themes, and tools like Docker, remote SSH, and database clients.

The editor features IntelliSense for smart code completions, powerful refactoring tools, an integrated terminal, and a built-in git GUI. Its Live Share extension lets developers collaborate in real-time, making pair programming effortless over the internet.

One of VS Code's biggest strengths is its extensibility. The huge marketplace has over 50,000 extensions, giving developers the ability to customize every aspect of their environment. Combined with its speed, keyboard-centric navigation, and regular monthly updates from Microsoft, VS Code remains the top choice for developers worldwide.`,
    features: [
      "IntelliSense smart code completions",
      "Built-in Git and source control",
      "Integrated debugger for multiple languages",
      "Extensions marketplace with 50,000+ extensions",
      "Live Share collaborative editing",
      "Integrated terminal",
      "Remote development (SSH, Containers, WSL)",
      "Customizable keybindings & themes",
    ],
    pricing: "Free",
    platform: ["Windows", "macOS", "Linux"],
    tags: ["Editor", "Free", "Microsoft", "Open Source"],
    url: "https://code.visualstudio.com",
    github: "https://github.com/microsoft/vscode",
    stars: 4.9,
    badge: "🏆 Most Popular",
    related: ["cursor", "zed", "jetbrains", "neovim", "sublime"],
  },
  {
    id: "cursor",
    name: "Cursor",
    category: "Editor",
    tagline: "The AI-first code editor built on VS Code.",
    desc: "AI-powered code editor forked from VS Code with deep Copilot-style chat, multi-file edits, and codebase understanding.",
    longDesc: `Cursor is a next-generation AI-first code editor built as a fork of Visual Studio Code. It integrates AI directly into the editing experience — not just as a sidebar tool, but as a core part of how you write, refactor, and understand code.

With Cursor, you can chat with your entire codebase, ask questions about unfamiliar code, and get contextual suggestions that understand your project's structure. The "Composer" feature lets the AI edit multiple files at once based on a single natural-language instruction, making large refactors and feature implementations much faster.

Cursor supports all VS Code extensions, themes, and settings, so migration is instant for existing VS Code users. Under the hood it uses GPT-4, Claude, and other frontier models to power its AI features. The editor also supports codebase-wide semantic search, meaning the AI actually reads and understands your code — not just the open file.

For developers who want to stay in flow and write code faster, Cursor represents the cutting edge of AI-augmented development.`,
    features: [
      "AI chat with full codebase context",
      "Multi-file edit with single instruction (Composer)",
      "Tab autocomplete across the entire function",
      "Codebase semantic search",
      "Inline edit with Ctrl+K",
      "All VS Code extensions supported",
      "Supports GPT-4, Claude, and custom models",
      "Auto-import and refactor suggestions",
    ],
    pricing: "Free tier + $20/mo Pro",
    platform: ["Windows", "macOS", "Linux"],
    tags: ["Editor", "AI", "VS Code Fork", "Paid"],
    url: "https://www.cursor.com",
    stars: 4.8,
    badge: "🤖 AI-First",
    related: ["vscode", "copilot", "zed", "codeium", "tabnine"],
  },
  {
    id: "zed",
    name: "Zed Editor",
    category: "Editor",
    tagline: "High-performance multiplayer code editor.",
    desc: "Blazing-fast code editor written in Rust with built-in collaboration, AI, and minimal UI.",
    longDesc: `Zed is a high-performance, multiplayer code editor built from scratch in Rust by the creators of Atom and Tree-sitter. It is designed to be extremely fast — using the GPU for rendering, it starts in milliseconds and keeps latency near-zero even on large codebases.

Unlike Electron-based editors, Zed uses a custom GPU-accelerated UI framework (GPUI), making it feel snappier than almost anything else available. The editor has built-in collaboration features — multiple developers can edit the same file simultaneously with CRDTs, similar to Google Docs but for code.

Zed also integrates AI directly (via Claude and open models), supports Language Server Protocol (LSP), Tree-sitter syntax highlighting, and has Vim mode built in. Its minimal interface keeps focus on the code.

Currently macOS-first (Linux support in progress), Zed is rapidly gaining a reputation as the editor for developers who care about raw performance and clean design.`,
    features: [
      "GPU-accelerated rendering (near zero latency)",
      "Built-in real-time collaboration",
      "AI assistant (Claude, custom models)",
      "Native LSP support",
      "Tree-sitter syntax highlighting",
      "Vim mode built-in",
      "Project-wide search with regex",
      "Minimal, distraction-free UI",
    ],
    pricing: "Free",
    platform: ["macOS", "Linux (preview)"],
    tags: ["Editor", "Rust", "Fast", "Free", "Open Source"],
    url: "https://zed.dev",
    github: "https://github.com/zed-industries/zed",
    stars: 4.7,
    badge: "⚡ Blazing Fast",
    related: ["vscode", "cursor", "neovim", "sublime"],
  },
  {
    id: "neovim",
    name: "Neovim",
    category: "Editor",
    tagline: "Hyperextensible Vim-based text editor.",
    desc: "Modernized Vim fork with Lua-based configuration, built-in LSP, async I/O, and a thriving plugin ecosystem.",
    longDesc: `Neovim is a refactored, extensible version of the classic Vim editor. It modernizes Vim while preserving full backward compatibility. With a built-in Lua scripting engine, async job control, and a native LSP client, Neovim has become the go-to editor for power users who want ultimate keyboard-driven control.

The Neovim ecosystem has exploded with Lua-based plugins — from file explorers (nvim-tree), fuzzy finders (Telescope), syntax highlighting (nvim-treesitter), and LSP configs (nvim-lspconfig) to beautiful UI frameworks (Noice.nvim, Lualine). Distributions like LazyVim, AstroNvim, and NvChad give developers a stunning IDE-like setup in minutes.

Neovim runs in any terminal, making it perfect for remote server development, and has one of the most active and passionate communities in software. If you commit to learning modal editing, the productivity gains are permanent.`,
    features: [
      "Modal editing (Vim keybindings)",
      "Lua scripting for full customization",
      "Built-in Language Server Protocol (LSP)",
      "Treesitter syntax highlighting",
      "Async job control",
      "Floating windows and virtual text",
      "Powerful plugin ecosystem",
      "Runs in any terminal",
    ],
    pricing: "Free, Open Source",
    platform: ["Windows", "macOS", "Linux"],
    tags: ["Editor", "Terminal", "Vim", "Free", "Open Source"],
    url: "https://neovim.io",
    github: "https://github.com/neovim/neovim",
    stars: 4.7,
    badge: "⌨️ Power User",
    related: ["vscode", "zed", "sublime", "helix"],
  },
  {
    id: "jetbrains",
    name: "JetBrains IDEs",
    category: "Editor",
    tagline: "Professional IDEs for every language.",
    desc: "Suite of professional IDEs (IntelliJ, WebStorm, PyCharm, GoLand) with deep code analysis and refactoring.",
    longDesc: `JetBrains produces the most powerful professional IDEs available for nearly every programming language. The suite includes IntelliJ IDEA (Java/Kotlin), WebStorm (JavaScript/TypeScript), PyCharm (Python), GoLand (Go), Rider (.NET/C#), RubyMine, DataGrip, PHPStorm, CLion, and more.

What sets JetBrains IDEs apart is their deep code understanding. Rather than just indexing text, they parse your code into a full semantic model, enabling extremely accurate refactoring, navigation (Go to Definition, Find Usages), and code completion that understands your project's architecture.

JetBrains Fleet is their newer lightweight editor, and all IDEs now come with built-in AI Assistant. They also offer the JetBrains Toolbox for managing multiple IDE installations. Free community editions are available for IntelliJ (Java) and PyCharm (Python).`,
    features: [
      "Deep code analysis and smart refactoring",
      "Accurate code completion across the project",
      "Built-in debugger, profiler, test runner",
      "Database tools built-in",
      "Version control integration",
      "AI Assistant (built-in)",
      "Framework-specific support (Spring, Django, etc.)",
      "Free community editions available",
    ],
    pricing: "Free (Community) / ~$29/mo (Ultimate)",
    platform: ["Windows", "macOS", "Linux"],
    tags: ["Editor", "IDE", "Professional", "Paid"],
    url: "https://www.jetbrains.com",
    stars: 4.8,
    badge: "💼 Professional",
    related: ["vscode", "cursor", "neovim", "zed"],
  },
  {
    id: "copilot",
    name: "GitHub Copilot",
    category: "AI",
    tagline: "Your AI pair programmer.",
    desc: "AI pair programmer that suggests whole lines and functions in real-time, trained on billions of lines of code.",
    longDesc: `GitHub Copilot is an AI coding assistant developed by GitHub in partnership with OpenAI. Powered by OpenAI Codex (a model trained on billions of lines of public code), it integrates as an extension into VS Code, JetBrains, Neovim, and other editors.

Copilot suggests single lines, full functions, tests, documentation, and even entire file structures in real-time as you type. It understands context from comments, function names, and surrounding code, making it feel like a knowledgeable pair programmer that anticipates your next move.

GitHub Copilot Chat adds a conversational interface directly in the editor, allowing you to ask questions about code, get explanations, request refactoring, and debug issues. Copilot Workspace (in preview) takes it further by planning and implementing entire features from a GitHub issue.

For professional developers, Copilot has become an indispensable productivity tool, reportedly increasing coding speed by 55% according to GitHub's research.`,
    features: [
      "Real-time inline code suggestions",
      "Function and class generation from comments",
      "Multi-line completions",
      "Test generation",
      "Copilot Chat (conversational AI in editor)",
      "CLI integration (Copilot in terminal)",
      "Works in VS Code, JetBrains, Neovim, Vim",
      "Codebase-aware suggestions",
    ],
    pricing: "$10/mo Individual / Free for students",
    platform: ["VS Code", "JetBrains", "Neovim", "CLI"],
    tags: ["AI", "Coding", "GitHub", "Paid"],
    url: "https://github.com/features/copilot",
    stars: 4.7,
    badge: "🤖 AI",
    related: ["cursor", "codeium", "tabnine", "supermaven", "vscode"],
  },
  {
    id: "codeium",
    name: "Codeium",
    category: "AI",
    tagline: "Free AI code completion for any editor.",
    desc: "Fast, free AI code autocomplete supporting 70+ languages and 40+ editors — no usage limits.",
    longDesc: `Codeium is a free AI coding assistant that offers unlimited code completions, chat, and search across 70+ programming languages. It's one of the most popular free alternatives to GitHub Copilot, with no paywalls on autocomplete.

The tool works with over 40 editors including VS Code, JetBrains, Vim/Neovim, Emacs, Jupyter, and more. Its context-aware autocomplete engine is fast and produces high-quality suggestions across all major languages and frameworks.

Codeium also includes Codeium Chat (like Copilot Chat but free), inline code explanations, and a web search feature that allows the AI to browse the web for up-to-date answers. The enterprise tier offers self-hosted deployment and SSO for organizations requiring data privacy.`,
    features: [
      "Unlimited free autocomplete",
      "70+ languages supported",
      "40+ editor plugins",
      "Codeium Chat (free conversational AI)",
      "Inline code explanations and docstrings",
      "Codebase search (semantic)",
      "Web search in chat",
      "Enterprise self-hosted option",
    ],
    pricing: "Free / Enterprise plans",
    platform: ["VS Code", "JetBrains", "Neovim", "Emacs", "Jupyter", "40+ more"],
    tags: ["AI", "Free", "Autocomplete", "Multi-editor"],
    url: "https://codeium.com",
    stars: 4.6,
    badge: "🆓 Free AI",
    related: ["copilot", "cursor", "tabnine", "supermaven"],
  },
  {
    id: "tabnine",
    name: "Tabnine",
    category: "AI",
    tagline: "AI code completion with privacy first.",
    desc: "AI code assistant focused on privacy — local model option, no code leaves your machine.",
    longDesc: `Tabnine is one of the original AI code completion tools, predating GitHub Copilot. Its main differentiator is privacy: Tabnine offers a local AI model option that runs entirely on your own machine, ensuring no code is ever sent to external servers.

This makes Tabnine particularly attractive to enterprise teams working with proprietary or sensitive codebases. Organizations can configure Tabnine to run 100% on-premises, making it SOC 2, GDPR, and HIPAA compliant out of the box.

Tabnine integrates with all major editors and IDEs, supports 80+ languages, and uses a customizable model that can be fine-tuned on your own codebase to provide suggestions specific to your company's code style and patterns.`,
    features: [
      "Local AI model (no cloud required)",
      "Privacy-first architecture",
      "Custom model fine-tuning on your codebase",
      "80+ programming languages",
      "Works in all major editors",
      "SOC 2, GDPR, HIPAA compliant",
      "Team knowledge sharing via AI",
      "On-premises enterprise deployment",
    ],
    pricing: "Free / $12/mo Pro / Enterprise",
    platform: ["VS Code", "JetBrains", "Eclipse", "Vim", "40+ editors"],
    tags: ["AI", "Privacy", "Enterprise", "Local Model"],
    url: "https://www.tabnine.com",
    stars: 4.4,
    badge: "🔒 Privacy First",
    related: ["copilot", "codeium", "cursor", "supermaven"],
  },
  {
    id: "postman",
    name: "Postman",
    category: "API Testing",
    tagline: "The complete API development platform.",
    desc: "Build, test, document and share APIs with a powerful GUI platform trusted by 25 million developers.",
    longDesc: `Postman is the world's leading API platform, used by over 25 million developers. It provides a comprehensive suite of tools for designing, testing, documenting, and monitoring APIs throughout the development lifecycle.

With Postman, you can send HTTP requests, inspect responses, write automated test scripts in JavaScript, organize requests into Collections, and run them with Newman (the CLI runner). The collaborative features allow entire teams to share collections, environments, and documentation.

Postman's API documentation feature auto-generates beautiful, interactive docs directly from your collections. Mock servers let frontend developers build against API specifications before the backend is ready. The built-in API Monitor tracks endpoint performance over time.

Postman has also launched Postbot — an AI assistant that auto-generates test cases, writes documentation, and explains responses, making API testing faster and more thorough.`,
    features: [
      "Intuitive HTTP request builder",
      "Automated test scripts (JavaScript)",
      "Collection runner and Newman CLI",
      "API documentation generation",
      "Mock server creation",
      "Environment variables management",
      "Team collaboration and workspaces",
      "AI-powered Postbot for tests & docs",
    ],
    pricing: "Free / $14/mo Professional",
    platform: ["Windows", "macOS", "Linux", "Web"],
    tags: ["API", "Testing", "Documentation", "Freemium"],
    url: "https://www.postman.com",
    stars: 4.8,
    badge: null,
    related: ["httpie", "hoppscotch", "insomnia", "bruno"],
  },
  {
    id: "hoppscotch",
    name: "Hoppscotch",
    category: "API Testing",
    tagline: "Open source API testing tool.",
    desc: "Lightweight, open-source API client that runs in the browser. A modern, privacy-focused Postman alternative.",
    longDesc: `Hoppscotch (previously known as Postwoman) is a fast, free, and open-source API request builder. It runs directly in the browser, requires no installation, and is an excellent lightweight alternative to Postman for developers who prefer simplicity.

Hoppscotch supports REST, GraphQL, WebSocket, Server-Sent Events, and Socket.IO. It has a beautiful minimal UI with dark/light/system themes and keyboard shortcuts for everything. Authentication helpers, environment variables, pre-request scripts, and test scripts are all supported.

Being fully open-source, Hoppscotch can be self-hosted on your own infrastructure. The Pro/Team tier adds persistent workspaces, team collaboration, and admin access. For developers who hate how heavy Postman has become, Hoppscotch is a breath of fresh air.`,
    features: [
      "No installation — runs in the browser",
      "REST, GraphQL, WebSocket, SSE support",
      "Environment variables and secrets",
      "Authentication helpers (Bearer, OAuth, API Key)",
      "Pre-request and test scripts",
      "Self-hostable (Docker / Node)",
      "Open source (MIT License)",
      "Team collaboration (Pro tier)",
    ],
    pricing: "Free / $12/mo Pro",
    platform: ["Web (any browser)", "Self-hosted"],
    tags: ["API", "Testing", "Open Source", "Free"],
    url: "https://hoppscotch.io",
    github: "https://github.com/hoppscotch/hoppscotch",
    stars: 4.7,
    badge: "🌐 Open Source",
    related: ["postman", "httpie", "insomnia", "bruno"],
  },
  {
    id: "bruno",
    name: "Bruno",
    category: "API Testing",
    tagline: "Git-friendly API client.",
    desc: "Offline-first, open-source API client that stores collections as local files — Git-friendly by design.",
    longDesc: `Bruno is a new-generation API client designed to be stored in your Git repository. Unlike Postman or Insomnia, Bruno stores collections as plain-text files on your filesystem (in the .bru format), making them version-controllable and diffable like any other code.

This git-first approach is a major advantage for dev teams: API collections stay in sync with the codebase, pull requests can include API changes, and there's no need to sync via cloud services. Bruno works completely offline with no account required.

Bruno supports REST, GraphQL, and gRPC. It has a clean, fast Electron app and a CLI runner (bru) for CI/CD pipelines. The open-source community around Bruno is growing rapidly as developers look for a privacy-respecting, vendor-lock-free alternative to Postman.`,
    features: [
      "Collections stored as local .bru files",
      "Git-version-controlled API collections",
      "100% offline — no account required",
      "REST, GraphQL, gRPC support",
      "CLI runner (bru) for CI/CD",
      "JavaScript scripting for tests",
      "Environment variables",
      "Open source (MIT), completely free",
    ],
    pricing: "Free, Open Source",
    platform: ["Windows", "macOS", "Linux"],
    tags: ["API", "Testing", "Git", "Open Source", "Free"],
    url: "https://www.usebruno.com",
    github: "https://github.com/usebruno/bruno",
    stars: 4.7,
    badge: "🗂️ Git-Friendly",
    related: ["postman", "hoppscotch", "httpie", "insomnia"],
  },
  {
    id: "httpie",
    name: "HTTPie",
    category: "API Testing",
    tagline: "User-friendly HTTP client for the CLI.",
    desc: "Command-line HTTP client with intuitive syntax, syntax highlighting, and JSON support.",
    longDesc: `HTTPie is a user-friendly command-line HTTP client that makes working with APIs from the terminal much more pleasant than using curl. It features clean, human-readable syntax, automatic JSON formatting, colorful output, and persistent sessions.

Instead of curl's cryptic flags, HTTPie uses intuitive syntax: \`http POST api.example.com/login username=admin password=pass\`. JSON is automatically serialized from key=value pairs, and responses are syntax-highlighted and pretty-printed.

HTTPie also has a desktop app (HTTPie for Web & Desktop) with a GUI that shares the same simple design philosophy. It's loved by backend developers who live in the terminal and need quick API verification without switching to Postman.`,
    features: [
      "Intuitive CLI syntax (simpler than curl)",
      "Automatic JSON formatting",
      "Syntax-highlighted output",
      "Session persistence",
      "File upload support",
      "HTTP/2 support",
      "Plugin system for extensions",
      "HTTPie Desktop app also available",
    ],
    pricing: "Free, Open Source",
    platform: ["Windows", "macOS", "Linux"],
    tags: ["CLI", "API", "Terminal", "Free", "Open Source"],
    url: "https://httpie.io",
    github: "https://github.com/httpie/cli",
    stars: 4.7,
    badge: null,
    related: ["postman", "hoppscotch", "bruno", "curl"],
  },
  {
    id: "docker-desk",
    name: "Docker Desktop",
    category: "DevOps",
    tagline: "The #1 containerization platform.",
    desc: "The easiest way to build, run, and ship containerized applications locally with a visual dashboard.",
    longDesc: `Docker Desktop is the most widely used containerization tool, providing a native GUI application for building, running, and managing Docker containers on macOS and Windows. It includes Docker Engine, Docker CLI, Docker Compose, Docker Buildx, and Kubernetes in one package.

The visual dashboard lets developers see running containers, inspect logs, manage volumes and networks, and execute commands inside containers — all without touching the CLI. Docker Extensions add extra capabilities like database managers, monitoring dashboards, and code editors directly inside Docker Desktop.

Docker Compose is bundled in, letting teams define multi-container applications in a single \`docker-compose.yml\` file. The Scout feature analyzes container images for security vulnerabilities. For developers working with microservices, Docker Desktop is an essential local development tool.`,
    features: [
      "Visual container management dashboard",
      "Docker Compose built-in",
      "Kubernetes integration",
      "Docker Extensions marketplace",
      "Image vulnerability scanning (Scout)",
      "Volume and network management",
      "Dev Environments for reproducible setups",
      "WSL2 integration on Windows",
    ],
    pricing: "Free (personal) / $21/mo (Pro)",
    platform: ["Windows", "macOS"],
    tags: ["Docker", "DevOps", "Containers", "Freemium"],
    url: "https://www.docker.com/products/docker-desktop",
    stars: 4.6,
    badge: null,
    related: ["podman", "rancher", "kubernetes", "lazydocker"],
  },
  {
    id: "lazydocker",
    name: "Lazydocker",
    category: "DevOps",
    tagline: "Terminal UI for Docker management.",
    desc: "A beautiful terminal UI for managing Docker containers, images, and volumes without memorizing CLI commands.",
    longDesc: `Lazydocker is a simple terminal user interface (TUI) for Docker and Docker Compose. It provides a visual, keyboard-driven interface for managing containers, images, volumes, and networks — all from within the terminal, without a heavy desktop app.

Built by Jesse Duffield (the same developer who made Lazygit), Lazydocker lets you view running containers with live CPU/memory stats, stream logs, remove unused resources, inspect environment variables, and restart services — all with simple key presses.

It's ideal for SSH sessions into remote server where you need a visual overview of Docker without installing Docker Desktop. For developers who prefer working in the terminal, Lazydocker strikes the perfect balance between CLI power and visual clarity.`,
    features: [
      "Visual TUI for Docker in the terminal",
      "Live container metrics (CPU, memory, network)",
      "Log streaming per container",
      "One-keystroke container management",
      "Docker Compose support",
      "Remove unused images/volumes",
      "Environment variable inspection",
      "Keyboard shortcuts for everything",
    ],
    pricing: "Free, Open Source",
    platform: ["Windows", "macOS", "Linux"],
    tags: ["Docker", "Terminal", "TUI", "Free", "Open Source"],
    url: "https://github.com/jesseduffield/lazydocker",
    github: "https://github.com/jesseduffield/lazydocker",
    stars: 4.8,
    badge: "⌨️ Terminal UI",
    related: ["docker-desk", "lazygit", "k9s", "dive"],
  },
  {
    id: "lazygit",
    name: "Lazygit",
    category: "DevOps",
    tagline: "Simple terminal UI for Git.",
    desc: "A terminal UI for Git that makes staging hunks, rebasing, resolving conflicts, and more blazing fast.",
    longDesc: `Lazygit is a simple but powerful terminal user interface for Git operations. It makes complex Git workflows — like interactive rebasing, cherry-picking, staging individual lines (hunks), and resolving merge conflicts — accessible via a clean, keyboard-driven TUI.

The interface is divided into panels: status, branches, commits, stashes, and a diff view. You can stage/unstage individual files or line-level hunks, write commit messages, push/pull/fetch, and manage branches — all without memorizing Git command syntax.

Interactive rebase, which is notoriously tricky from the CLI, becomes visual and intuitive in Lazygit. The same developer also made Lazydocker, and both tools share the same philosophy: make complex tools approachable through a beautiful TUI.`,
    features: [
      "Visual TUI for all Git operations",
      "Hunk-level staging (stage individual lines)",
      "Interactive rebase made visual",
      "Merge conflict resolution UI",
      "Branch management and cherry-picking",
      "Stash management",
      "Log browsing with diff views",
      "Customizable keybindings",
    ],
    pricing: "Free, Open Source",
    platform: ["Windows", "macOS", "Linux"],
    tags: ["Git", "Terminal", "TUI", "Free", "Open Source"],
    url: "https://github.com/jesseduffield/lazygit",
    github: "https://github.com/jesseduffield/lazygit",
    stars: 4.9,
    badge: "🔥 Dev Favorite",
    related: ["git-fork", "sourcetree", "lazydocker", "gh-cli"],
  },
  {
    id: "figma",
    name: "Figma",
    category: "Design",
    tagline: "Collaborative UI/UX design for teams.",
    desc: "Collaborative UI design tool used by top product teams. Design, prototype, and hand off — all in the browser.",
    longDesc: `Figma is the leading UI/UX design tool, used by teams at Airbnb, Stripe, GitHub, Dropbox, and thousands of other companies. Unlike traditional desktop design tools (Sketch, Adobe XD), Figma runs entirely in the browser and is built for real-time collaboration.

Multiple designers can work on the same file simultaneously, see each other's cursors, and leave comments directly on designs. The handoff experience is excellent — developers can inspect every element's CSS properties, dimensions, spacing, and export assets without needing a Figma account.

Figma introduced Components and Variants that create a design system with reusable, overridable elements. Auto Layout lets components respond to content changes like CSS flexbox. The FigJam whiteboard product is included for brainstorming and planning.

With the FigJam AI and Figma AI (in preview), you can generate UI layouts, wireframes, and copy using natural language — making it the most powerful design tool in the world for modern product teams.`,
    features: [
      "Real-time collaborative editing",
      "Browser-based (no installation needed)",
      "Components, variants, and design systems",
      "Auto Layout (like CSS flexbox for designs)",
      "Prototyping and interactive flows",
      "Developer inspect mode with CSS values",
      "Plugins and widgets marketplace",
      "FigJam whiteboard included",
    ],
    pricing: "Free (2 editors) / $12/mo Professional",
    platform: ["Web", "macOS (desktop app)", "Windows (desktop app)"],
    tags: ["Design", "UI/UX", "Collaboration", "Freemium"],
    url: "https://www.figma.com",
    stars: 4.9,
    badge: "🎨 Design",
    related: ["excalidraw", "framer", "storybook", "penpot"],
  },
  {
    id: "excalidraw",
    name: "Excalidraw",
    category: "Diagramming",
    tagline: "Virtual collaborative whiteboard.",
    desc: "Virtual whiteboard for sketching hand-drawn style diagrams, system designs, and wireframes.",
    longDesc: `Excalidraw is an open-source, minimal virtual whiteboard tool with a hand-drawn aesthetic. It's loved by developers for quickly sketching architecture diagrams, system designs, wireframes, flowcharts, and ERDs without the complexity of full diagramming tools.

Everything on Excalidraw has a slightly imperfect, sketchy look that signals "this is a work in progress" — making it perfect for technical discussions where pixel-perfect design isn't the point. The tool runs entirely in the browser, requires no login, and files are stored locally or in the URL.

Real-time collaboration is built in — share a link and multiple people can draw together. Excalidraw has an extensive library of components (including AWS, GCP, and Azure icons) for drawing cloud architecture diagrams. Its VS Code extension lets you embed diagrams directly in your codebase.`,
    features: [
      "Hand-drawn aesthetic diagrams",
      "Real-time collaboration via shared link",
      "Export to PNG, SVG, JSON",
      "Component libraries (AWS, GCP, Azure, etc.)",
      "VS Code extension (diagrams in repo)",
      "Dark mode",
      "End-to-end encrypted collaboration",
      "Fully open source",
    ],
    pricing: "Free / $7/mo Excalidraw+",
    platform: ["Web", "Self-hosted"],
    tags: ["Diagram", "Whiteboard", "Free", "Open Source"],
    url: "https://excalidraw.com",
    github: "https://github.com/excalidraw/excalidraw",
    stars: 4.9,
    badge: "🔥 Trending",
    related: ["figma", "mermaid", "drawio", "whimsical"],
  },
  {
    id: "raycast",
    name: "Raycast",
    category: "Productivity",
    tagline: "Your shortcut to everything on macOS.",
    desc: "Blazing fast macOS launcher with extensions, snippets, window management, and AI built-in.",
    longDesc: `Raycast is the ultimate productivity launcher for macOS, replacing Spotlight with a dramatically more capable alternative. It opens instantly with a customizable shortcut and gives you access to apps, files, scripts, web searches, clipboard history, window management, and hundreds of extensions — all from the keyboard.

The extension ecosystem is where Raycast truly shines. Extensions for GitHub (create PRs, view issues), Linear (manage tasks), Vercel (check deployments), Figma, Notion, Jira, and hundreds more are community-built and available in the store. Developers can also build their own extensions in React/TypeScript.

Raycast AI (Pro feature) adds a built-in AI assistant with context from your clipboard, personalized commands, and the ability to search your entire screen content. For any developer who uses a Mac and values keyboard-first workflows, Raycast is essential.`,
    features: [
      "Instant app launching and file search",
      "Extension marketplace (1000+ extensions)",
      "Clipboard history manager",
      "Snippet expansion",
      "Window management",
      "Script commands (run shell scripts)",
      "Raycast AI assistant (Pro)",
      "Build custom extensions in React/TypeScript",
    ],
    pricing: "Free / $8/mo Pro (AI features)",
    platform: ["macOS only"],
    tags: ["Productivity", "macOS", "Launcher", "AI", "Freemium"],
    url: "https://www.raycast.com",
    stars: 4.8,
    badge: null,
    related: ["alfred", "warp", "obsidian", "linear"],
  },
  {
    id: "warp",
    name: "Warp Terminal",
    category: "Terminal",
    tagline: "The terminal reimagined for developers.",
    desc: "GPU-accelerated terminal with AI command suggestions, command palette, and IDE-like editing in the shell.",
    longDesc: `Warp is a modern, GPU-accelerated terminal emulator built from scratch in Rust. It reimagines everything about the traditional terminal: text entry works like a text editor with cursor positioning, selection, and copy-paste that actually makes sense. Command output is grouped into "blocks" so you always know which output belongs to which command.

Warp AI is built in — type a description in natural language and Warp generates the command. If a command fails, Warp can explain why and suggest a fix. The \`#\` shortcut opens an AI prompt from anywhere in the terminal.

Warp supports shareable workflows (reusable multi-step command sequences), a command palette, custom themes, and fast startup. While it started as macOS-only, Linux and Windows support have been added. It's one of the most ambitious attempts to modernize the terminal experience.`,
    features: [
      "GPU-accelerated rendering",
      "IDE-like text editing in the shell",
      "Command output grouped into blocks",
      "Warp AI (natural language → command)",
      "Error explanation and fix suggestions",
      "Reusable Workflows",
      "Session history and sharing",
      "Custom themes and prompt configuration",
    ],
    pricing: "Free / $15/mo Pro",
    platform: ["macOS", "Linux", "Windows"],
    tags: ["Terminal", "AI", "Rust", "GPU", "Freemium"],
    url: "https://www.warp.dev",
    stars: 4.7,
    badge: "⚡ Fast",
    related: ["iterm2", "kitty", "alacritty", "fish", "starship"],
  },
  {
    id: "starship",
    name: "Starship",
    category: "Terminal",
    tagline: "Minimal, blazing-fast shell prompt.",
    desc: "Cross-shell prompt written in Rust that shows Git status, language versions, and context — instantly.",
    longDesc: `Starship is a minimal, fast, and infinitely customizable prompt for any shell — bash, zsh, fish, PowerShell, and more. Written in Rust, it starts in milliseconds and shows relevant context based on what you're doing: the current Git branch and dirty status, the active programming language version, Kubernetes context, cloud environment, and more.

Unlike oh-my-zsh which can slow down your shell, Starship adds negligible overhead. Configuration is done via a simple TOML file. It uses Nerd Fonts for beautiful icons but works in text-only mode too.

Starship is one of the most-starred terminal tools on GitHub, loved by developers who want a beautiful, informative prompt without sacrificing shell startup speed.`,
    features: [
      "Shows Git branch, status, and divergence",
      "Language version detection (Node, Python, Go, Rust, etc.)",
      "Kubernetes and cloud context",
      "Extremely fast (written in Rust)",
      "Works with bash, zsh, fish, PowerShell",
      "Nerd Font icons support",
      "TOML-based configuration",
      "Hundreds of built-in modules",
    ],
    pricing: "Free, Open Source",
    platform: ["Windows", "macOS", "Linux (any shell)"],
    tags: ["Terminal", "Shell", "Prompt", "Rust", "Free"],
    url: "https://starship.rs",
    github: "https://github.com/starship/starship",
    stars: 4.8,
    badge: "🚀 Must Have",
    related: ["warp", "fish", "zsh", "oh-my-zsh", "iterm2"],
  },
  {
    id: "tableplus",
    name: "TablePlus",
    category: "Database",
    tagline: "Modern database GUI for all databases.",
    desc: "Modern, native database management tool with a clean UI supporting PostgreSQL, MySQL, SQLite, Redis, and more.",
    longDesc: `TablePlus is a modern, native database management GUI that supports nearly every major database: PostgreSQL, MySQL, MariaDB, SQLite, Microsoft SQL Server, Redis, MongoDB, CockroachDB, Cassandra, and more — all in one app.

Unlike web-based tools, TablePlus is a native macOS/Windows/Linux app that feels fast and responsive. The interface is clean and minimalist with a spreadsheet-like row editor, built-in SQL editor with syntax highlighting, and a safe mode that prevents accidental data destruction.

TablePlus streams large query results without loading everything into memory, has a code review mode for reviewing SQL before execution, and supports SSH tunneling and multiple simultaneous connections. It's become the go-to database tool for any developer who has used Sequel Pro and found it lacking.`,
    features: [
      "Supports 20+ databases in one app",
      "Native app (fast, no Electron)",
      "Spreadsheet-like row editor",
      "Built-in SQL editor with syntax highlighting",
      "Safe mode (review before executing DML)",
      "SSH tunneling and SSL support",
      "Multiple tabs and connections",
      "Dark and light themes",
    ],
    pricing: "Free (limited) / $69 one-time",
    platform: ["Windows", "macOS", "Linux"],
    tags: ["Database", "GUI", "Native", "SQL"],
    url: "https://tableplus.com",
    stars: 4.8,
    badge: null,
    related: ["prisma", "dbeaver", "datagrip", "redis-insight"],
  },
  {
    id: "prisma",
    name: "Prisma ORM",
    category: "Database",
    tagline: "Next-gen TypeScript ORM for Node.js.",
    desc: "Type-safe ORM for Node.js with auto-generated queries, migrations, and a visual database browser.",
    longDesc: `Prisma is the next-generation ORM for Node.js and TypeScript. Rather than writing raw SQL or using a traditional ORM's query builder, Prisma provides a fully type-safe client generated from your schema — meaning TypeScript catches database query errors at compile time.

The Prisma workflow revolves around three tools: Prisma Schema (define your data model in a readable DSL), Prisma Migrate (auto-generate SQL migrations from schema changes), and Prisma Client (the type-safe query builder).

Prisma Studio is a visual database browser bundled with Prisma that lets developers view and edit database records with a GUI. Prisma Accelerate provides a global edge-cached connection pool, and Prisma Pulse enables real-time database events.

Prisma supports PostgreSQL, MySQL, MySQL, MariaDB, SQLite, SQL Server, CockroachDB, and MongoDB. It's the default ORM choice for most Next.js and modern TypeScript projects.`,
    features: [
      "100% type-safe database queries",
      "Auto-generated TypeScript client from schema",
      "Declarative schema language",
      "Auto-generated SQL migrations",
      "Prisma Studio (visual database browser)",
      "Supports PostgreSQL, MySQL, SQLite, MongoDB",
      "Connection pooling (Prisma Accelerate)",
      "Real-time database events (Prisma Pulse)",
    ],
    pricing: "Free / Pay-as-you-go for cloud features",
    platform: ["Node.js", "Edge runtimes"],
    tags: ["ORM", "TypeScript", "Node.js", "Database", "Free"],
    url: "https://www.prisma.io",
    github: "https://github.com/prisma/prisma",
    stars: 4.7,
    badge: null,
    related: ["tableplus", "drizzle", "typeorm", "mongoose"],
  },
  {
    id: "drizzle",
    name: "Drizzle ORM",
    category: "Database",
    tagline: "Lightweight TypeScript SQL ORM.",
    desc: "Headless TypeScript ORM that feels like SQL — lightweight, fast, and perfect for edge runtimes.",
    longDesc: `Drizzle ORM is a TypeScript-first ORM that takes a different philosophy than Prisma: instead of abstracting SQL, it embraces it. Drizzle's query builder closely mirrors SQL syntax, making queries feel natural and giving developers full control with type safety.

Drizzle is extremely lightweight (no heavy abstractions), works with edge runtimes (Cloudflare Workers, Vercel Edge, Deno), and generates zero-overhead SQL at compile time. Drizzle Kit provides schema migrations, and Drizzle Studio offers a visual database browser.

For developers who want type-safe SQL without magic, who work at the edge, or who have performance-critical applications where every kilobyte counts, Drizzle has become the preferred ORM in the modern TypeScript ecosystem.`,
    features: [
      "SQL-like TypeScript query builder",
      "Full type inference on all queries",
      "Works in Edge runtimes (Cloudflare, Vercel Edge)",
      "Zero overhead abstractions",
      "Drizzle Kit for schema migrations",
      "Drizzle Studio (visual browser)",
      "Supports PG, MySQL, SQLite, D1",
      "Extremely small bundle size",
    ],
    pricing: "Free, Open Source",
    platform: ["Node.js", "Edge runtimes", "Deno"],
    tags: ["ORM", "TypeScript", "Edge", "Free", "Open Source"],
    url: "https://orm.drizzle.team",
    github: "https://github.com/drizzle-team/drizzle-orm",
    stars: 4.7,
    badge: "⚡ Edge Ready",
    related: ["prisma", "tableplus", "typeorm", "planetscale"],
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "Deployment",
    tagline: "Deploy frontend apps instantly.",
    desc: "The platform for frontend developers. Deploy Next.js and other frontend apps with zero configuration.",
    longDesc: `Vercel is the deployment and hosting platform built by the creators of Next.js. It provides the fastest way to deploy frontend applications — connect your Git repository, and every push triggers an automatic deployment with a unique preview URL.

Vercel's infrastructure uses a global Edge Network to serve your static assets and serverless functions from the closest point to each user, giving your app low latency worldwide. Features like Image Optimization, Incremental Static Regeneration (ISR), and Edge Middleware are all built for Next.js but work with any framework (React, Vue, Svelte, Astro, etc.).

Vercel Preview Deployments are one of its killer features: every pull request gets its own live URL, enabling teams to review changes before merging. The Vercel Analytics dashboard tracks performance (Core Web Vitals) per page. For any Next.js project, Vercel is the natural choice.`,
    features: [
      "Zero-config deployments from Git",
      "Preview deployments for every PR",
      "Global Edge Network (low latency worldwide)",
      "Serverless Functions",
      "Edge Middleware and Edge Functions",
      "Image Optimization built-in",
      "Vercel Analytics (Core Web Vitals)",
      "Environment variables management",
    ],
    pricing: "Free (Hobby) / $20/mo Pro",
    platform: ["Web (SaaS)", "CLI"],
    tags: ["Deployment", "Frontend", "Hosting", "Next.js", "Freemium"],
    url: "https://vercel.com",
    stars: 4.8,
    badge: null,
    related: ["netlify", "cloudflare-pages", "railway", "render"],
  },
  {
    id: "railway",
    name: "Railway",
    category: "Deployment",
    tagline: "Deploy anything in one click.",
    desc: "Infrastructure platform that deploys backends, databases, and full-stack apps from Git with zero config.",
    longDesc: `Railway is a modern infrastructure platform that makes deploying backends, databases, and full-stack applications as easy as pushing to Git. Unlike Vercel (which focuses on frontends), Railway excels at deploying any server-side application — Node.js, Python (FastAPI, Django), Go, Rust, Rails, Java — along with databases like PostgreSQL, MySQL, Redis, and MongoDB.

Railway automatically detects your framework, provisions the right resources, and deploys. You can spin up a PostgreSQL database in seconds, connect it to your app via environment variables, and have a complete backend running in minutes. The pricing model is usage-based — you only pay for what you use.

For indie developers and small teams, Railway is one of the most developer-friendly ways to host full-stack applications without managing servers. It competes with Heroku (now expensive) and Render, offering a superior experience.`,
    features: [
      "Deploy any backend from Git",
      "One-click database provisioning (PG, MySQL, Redis, Mongo)",
      "Automatic framework detection",
      "Environment variables and secrets",
      "Usage-based pricing (no idle charges on Pro)",
      "Private networking between services",
      "Custom domains and auto SSL",
      "Cron jobs and scheduled tasks",
    ],
    pricing: "Free $5 credit / $20/mo Pro",
    platform: ["Web (SaaS)", "CLI"],
    tags: ["Deployment", "Backend", "Database", "Hosting", "Freemium"],
    url: "https://railway.app",
    stars: 4.7,
    badge: "🚂 Full Stack",
    related: ["vercel", "render", "netlify", "fly-io"],
  },
  {
    id: "bun",
    name: "Bun",
    category: "Runtime",
    tagline: "Ultra-fast JavaScript runtime.",
    desc: "All-in-one JavaScript runtime: bundler, test runner, and npm-compatible package manager — written in Zig.",
    longDesc: `Bun is a fast all-in-one JavaScript toolkit designed to replace Node.js, npm/yarn, and bundlers like Webpack or esbuild — all in one tool. Written in Zig with JavaScriptCore (instead of V8), Bun is dramatically faster than Node.js for many workloads.

Bun includes a bundler (blazing fast), a test runner (Jest-compatible), a package manager (npm-compatible, much faster than npm/yarn/pnpm), and a Node.js-compatible runtime with first-class TypeScript and JSX support out of the box (no transpilation needed).

Where Bun shines most is in developer tooling speed: installing packages, running scripts, bundling code, and running tests are all significantly faster. It's fully compatible with the npm ecosystem and supports most Node.js APIs. Many teams are adopting Bun for CI/CD where speed matters most.`,
    features: [
      "Runs TypeScript natively (no transpile step)",
      "npm-compatible package manager (3x faster)",
      "Built-in bundler (faster than esbuild)",
      "Jest-compatible test runner",
      "Node.js API compatibility",
      "Built-in SQLite driver",
      "Hot reloading",
      "Excellent startup time and performance",
    ],
    pricing: "Free, Open Source",
    platform: ["macOS", "Linux", "Windows (WSL)"],
    tags: ["JavaScript", "Runtime", "Bundler", "Fast", "Open Source"],
    url: "https://bun.sh",
    github: "https://github.com/oven-sh/bun",
    stars: 4.6,
    badge: "⚡ Fast",
    related: ["nodejs", "deno", "vite", "esbuild"],
  },
  {
    id: "vite",
    name: "Vite",
    category: "Build Tool",
    tagline: "Next-gen frontend build tool.",
    desc: "Instant dev server start and lightning-fast HMR with native ESM. The build tool for modern frontend.",
    longDesc: `Vite (French for "fast") is a next-generation frontend build tool that dramatically improves the developer experience for modern web projects. Created by Evan You (the creator of Vue.js), it has become the standard build tool for React, Vue, Svelte, and other frontend frameworks.

In development, Vite serves files using native ESM, meaning it doesn't bundle your code — the browser loads modules on demand. This gives near-instant server start times regardless of project size, and Hot Module Replacement (HMR) that updates in milliseconds. Traditional webpack-based setups slow down as your project grows; Vite does not.

For production builds, Vite uses Rollup (pre-configured for tree-shaking, code splitting, and asset optimization). The plugin ecosystem is huge and compatible with Rollup plugins. Vite also powers Vitest, a Jest-compatible test runner, keeping the entire toolchain fast.`,
    features: [
      "Instant dev server start (native ESM)",
      "Lightning-fast HMR",
      "Pre-configured Rollup for production",
      "TypeScript, JSX, CSS out of the box",
      "Code splitting and tree shaking",
      "Plugin ecosystem (Rollup-compatible)",
      "Library mode for building npm packages",
      "SSR support",
    ],
    pricing: "Free, Open Source",
    platform: ["Windows", "macOS", "Linux"],
    tags: ["Build Tool", "Frontend", "Fast", "ESM", "Open Source"],
    url: "https://vitejs.dev",
    github: "https://github.com/vitejs/vite",
    stars: 4.9,
    badge: "🔥 Trending",
    related: ["webpack", "esbuild", "bun", "turbopack", "rollup"],
  },
  {
    id: "zod",
    name: "Zod",
    category: "Validation",
    tagline: "TypeScript-first schema validation.",
    desc: "TypeScript-first schema validation with static type inference — the standard for input validation in TypeScript.",
    longDesc: `Zod is a TypeScript-first schema declaration and validation library. Define a schema once, and Zod will automatically infer the TypeScript type from it — you write your validation and your TypeScript types in one place.

Zod is used extensively in full-stack TypeScript projects to validate API inputs, form data, environment variables, and config files. Libraries like tRPC, React Hook Form (with zodResolver), and Next.js server actions integrate deeply with Zod. It's become the standard way to handle runtime validation in the TypeScript ecosystem.

Zod schemas are composable — you can combine, extend, pick, omit, and transform schemas to build complex types. Error messages are developer-friendly by default but fully customizable. Compared to Yup (a popular alternative), Zod has better TypeScript inference and an API that feels more natural.`,
    features: [
      "Automatically infers TypeScript types from schema",
      "Composable schema primitives",
      "Transforms (parse and convert data)",
      "Custom error messages",
      "Works with React Hook Form, tRPC, Next.js",
      "Schema for objects, arrays, unions, enums",
      "Parse unknown data safely (API responses)",
      "Zero runtime dependencies",
    ],
    pricing: "Free, Open Source",
    platform: ["Node.js", "Browser", "Edge Runtimes"],
    tags: ["TypeScript", "Validation", "Open Source", "Free"],
    url: "https://zod.dev",
    github: "https://github.com/colinhacks/zod",
    stars: 4.8,
    badge: null,
    related: ["valibot", "yup", "typebox", "trpc"],
  },
  {
    id: "clerk",
    name: "Clerk Auth",
    category: "Auth",
    tagline: "Complete user management for modern apps.",
    desc: "Drop-in authentication with pre-built UI components, social login, MFA, and user management for React/Next.js.",
    longDesc: `Clerk is a complete user management platform that provides drop-in authentication and user management for modern web applications. Instead of spending weeks building auth flows, Clerk gives you pre-built, customizable UI components for sign-up, sign-in, user profiles, and organization management.

Clerk handles the hard parts: secure password storage, social OAuth (Google, GitHub, Discord, and 20+ more), magic links, passkeys, multi-factor authentication (TOTP, SMS), session management, and bot protection. It integrates natively with Next.js, Remix, and other React frameworks with a few lines of code.

The Clerk dashboard shows all users, their sessions, active devices, and audit logs. Organizations (for multi-tenant B2B SaaS) are built-in. Clerk SDK is available for React, Next.js, Node.js, Go, Ruby, Python, and more.`,
    features: [
      "Pre-built sign-in/sign-up UI components",
      "Social OAuth (Google, GitHub, Discord, 20+)",
      "Magic links, passkeys, TOTP MFA",
      "Multi-tenant Organizations support",
      "User management dashboard",
      "Session management and device tracking",
      "Next.js App Router integration",
      "Webhooks for user events",
    ],
    pricing: "Free (10k MAU) / $25/mo Pro",
    platform: ["Next.js", "React", "Remix", "Node.js", "Go", "Python"],
    tags: ["Auth", "Authentication", "React", "Next.js", "Freemium"],
    url: "https://clerk.com",
    stars: 4.6,
    badge: null,
    related: ["auth0", "supabase", "nextauth", "lucia"],
  },
  {
    id: "supabase",
    name: "Supabase",
    category: "Database",
    tagline: "The open source Firebase alternative.",
    desc: "Open source backend platform with PostgreSQL, Auth, Storage, Realtime, and Edge Functions.",
    longDesc: `Supabase is an open source Firebase alternative that provides a complete backend platform built on PostgreSQL. In minutes, you get a hosted Postgres database, authentication, file storage, real-time subscriptions, and edge functions — all with a generous free tier.

Unlike Firebase (a NoSQL document database), Supabase uses PostgreSQL — a relational database with full SQL support, row-level security, stored procedures, and foreign keys. This makes it suitable for applications where data relationships and integrity matter.

Supabase Auth supports email/password, magic links, and 20+ OAuth providers. Storage handles file uploads with access control. Realtime lets you subscribe to database changes with WebSockets. Edge Functions are Deno-based serverless functions deployed globally.

The Supabase Studio dashboard provides a table editor, SQL editor, API docs, logs, and more. It can be self-hosted, making deployment to your own infrastructure possible.`,
    features: [
      "Hosted PostgreSQL database",
      "Auth (email, OAuth, magic links, phone)",
      "File storage with access policies",
      "Real-time database subscriptions",
      "Edge Functions (Deno-based)",
      "Auto-generated REST and GraphQL APIs",
      "Row Level Security (RLS)",
      "Self-hostable",
    ],
    pricing: "Free (generous) / $25/mo Pro",
    platform: ["Web (SaaS)", "Self-hosted"],
    tags: ["Database", "Auth", "Backend", "PostgreSQL", "Open Source"],
    url: "https://supabase.com",
    github: "https://github.com/supabase/supabase",
    stars: 4.8,
    badge: "🔥 Trending",
    related: ["prisma", "firebase", "clerk", "railway", "planetscale"],
  },
  {
    id: "obsidian",
    name: "Obsidian",
    category: "Notes",
    tagline: "Your private, extensible knowledge base.",
    desc: "Knowledge base app backed by plain Markdown files with a graph view, linking, and 1000+ plugins.",
    longDesc: `Obsidian is a powerful knowledge management and note-taking app that stores your notes as plain Markdown files on your own device. Unlike Notion (cloud-based), Obsidian is fully local-first — your notes are just \`.md\` files you own and control.

The key concept in Obsidian is linking thoughts: you can [[wiki-link]] between notes to build a personal knowledge graph. The Graph View visualizes all your notes and their connections, revealing patterns in your thinking. The Canvas feature lets you lay out notes spatially like a whiteboard.

The plugin ecosystem is enormous — over 1,500 community plugins add features like daily notes, task management, Kanban boards, spaced repetition flashcards, and code execution. Sync and Publish are paid cloud services for sharing vaults privately across devices or publishing notes to the web.

For developers who want a second brain that they fully own, with no lock-in, Obsidian has become the tool of choice.`,
    features: [
      "Notes stored as local Markdown files",
      "Bi-directional note linking ([[wikilinks]])",
      "Graph View of all note connections",
      "Canvas (spatial note layout)",
      "1,500+ community plugins",
      "Vim mode",
      "Sync across devices (paid cloud service)",
      "Publish notes as website (paid)",
    ],
    pricing: "Free / $8/mo Sync & Publish",
    platform: ["Windows", "macOS", "Linux", "iOS", "Android"],
    tags: ["Notes", "Markdown", "Local-first", "Knowledge Base"],
    url: "https://obsidian.md",
    stars: 4.8,
    badge: "📝 Dev Favorite",
    related: ["notion", "logseq", "roam", "anytype"],
  },
  {
    id: "linear",
    name: "Linear",
    category: "Productivity",
    tagline: "Issue tracking built for speed.",
    desc: "Beautifully fast issue tracker designed for modern software teams. Built for speed with keyboard shortcuts.",
    longDesc: `Linear is a project management and issue tracker designed specifically for software development teams. It's built with an obsession for speed — every action has a keyboard shortcut, the UI is instant, and workflows are designed around a developer's mental model rather than a generic project manager's.

Linear's interface is minimal and clean. Issues have priorities, assignees, statuses, labels, estimates, and can be organized into cycles (sprints) and projects. GitHub, GitLab, and Figma integrations keep issues in sync with pull requests and design changes automatically.

Linear's data model is opinionated and intentional — it doesn't try to be everything to everyone like Jira. This focus on developer ergonomics means modern tech companies (Raycast, Vercel, Loom, etc.) trust it over Jira for their engineering teams.`,
    features: [
      "Extremely fast UI (keyboard-driven)",
      "Issue cycles (sprints) and milestones",
      "GitHub/GitLab PR sync",
      "Figma, Slack, Intercom integrations",
      "Roadmaps and project planning",
      "Priority system and SLA tracking",
      "Triage, backlog, and bulk actions",
      "API for automation",
    ],
    pricing: "Free (up to 250 issues) / $8/user/mo",
    platform: ["Web", "macOS", "iOS"],
    tags: ["Productivity", "Issue Tracker", "Project Management"],
    url: "https://linear.app",
    stars: 4.8,
    badge: "💜 Dev Favorite",
    related: ["jira", "github-issues", "notion", "asana"],
  },
  {
    id: "storybook",
    name: "Storybook",
    category: "Design",
    tagline: "UI component workshop.",
    desc: "Frontend workshop for building, testing, and documenting UI components in isolation.",
    longDesc: `Storybook is a tool for building and testing UI components in isolation from the rest of your application. It lets you render any component with different props (called "stories"), creating a living documentation of your design system.

Storybook works with React, Vue, Angular, Svelte, Web Components, and more. Each "story" is a small scenario demonstrating the component in a specific state. This allows developers to test every variant without navigating the full application, and enables designers and QA to review components independently.

Storybook addons extend functionality: automated accessibility testing (with @storybook/a11y), interaction testing, mocking APIs, responsive viewports, and more. It integrates with Chromatic (visual regression testing) for catching unintended UI changes in CI.

For teams building design systems or working with component-driven development, Storybook is an essential part of the workflow.`,
    features: [
      "Component isolation for development and testing",
      "Visual documentation of all component states",
      "Works with React, Vue, Angular, Svelte",
      "Interaction testing with play() functions",
      "Accessibility testing add-on",
      "Chromatic visual regression testing",
      "Auto-generated docs from source code",
      "Embed stories in design tools (Figma plugin)",
    ],
    pricing: "Free, Open Source",
    platform: ["Web (runs alongside your app)"],
    tags: ["UI", "Design System", "Testing", "Documentation", "Open Source"],
    url: "https://storybook.js.org",
    github: "https://github.com/storybookjs/storybook",
    stars: 4.7,
    badge: "🎨 UI Dev",
    related: ["figma", "chromatic", "vitest", "playwright"],
  },
  {
    id: "datadog",
    name: "Datadog",
    category: "Monitoring",
    tagline: "Cloud-scale observability platform.",
    desc: "Unified monitoring platform for metrics, logs, APM traces, and infrastructure at scale.",
    longDesc: `Datadog is the leading cloud monitoring and observability platform. It provides unified visibility into the entire technology stack — infrastructure metrics, application performance monitoring (APM), log management, real user monitoring (RUM), security monitoring, and more — all in a single platform.

Datadog Agent can be deployed as a container, VM, or serverless function to collect metrics, logs, and traces. Its APM feature creates flame graphs and distributed traces across microservices, making it easy to find the bottleneck in a complex request. The integration library includes 600+ integrations with cloud providers, databases, frameworks, and services.

Dashboards in Datadog are highly customizable and can combine metrics, logs, and traces in a single view. Monitors and alerts can be configured with anomaly detection, forecasting, and composite conditions. For engineering teams running production systems at scale, Datadog is often the primary operational intelligence tool.`,
    features: [
      "Infrastructure monitoring (metrics, events)",
      "Application Performance Monitoring (APM)",
      "Distributed tracing and flame graphs",
      "Log management and search",
      "Real User Monitoring (RUM)",
      "600+ integrations",
      "Custom dashboards",
      "Anomaly detection and alerting",
    ],
    pricing: "$15/host/mo Infrastructure / APM additional",
    platform: ["SaaS (any cloud/on-prem via Agent)"],
    tags: ["Monitoring", "Observability", "APM", "Logs", "Paid"],
    url: "https://www.datadoghq.com",
    stars: 4.5,
    badge: null,
    related: ["grafana", "prometheus", "sentry", "newrelic"],
  },
  {
    id: "sentry",
    name: "Sentry",
    category: "Monitoring",
    tagline: "Error tracking and performance monitoring.",
    desc: "Application monitoring platform that captures errors, performance issues, and crashes with full context.",
    longDesc: `Sentry is the leading error tracking and application monitoring tool for developers. It captures exceptions and crashes from web, mobile, and backend applications with full context — the stack trace, the user's session, the breadcrumb trail of events leading to the error, and the exact code line.

Sentry integrates with every major language and framework: JavaScript, Python, Ruby, PHP, Go, Java, Kotlin, Swift, Flutter, and more. The Release Tracking feature lets you see error rates before and after deploys. Performance Monitoring tracks transaction durations, database queries, and frontend Web Vitals.

Source maps support means you see original TypeScript code in error reports, not minified bundles. Sentry automatically groups similar errors, de-duplicates them, and assigns them to the responsible team member via Git blame. For any production application, Sentry is essential for knowing when things break.`,
    features: [
      "Error capture with full stack traces",
      "Session replay (video of user session at error)",
      "Performance monitoring (transactions, spans)",
      "Release health tracking",
      "Source maps support (see original code)",
      "Git integration (blame, commit linking)",
      "Alerts and workflows",
      "Supports 100+ platforms and frameworks",
    ],
    pricing: "Free (5k errors/mo) / $26/mo Team",
    platform: ["SaaS", "Self-hosted"],
    tags: ["Monitoring", "Error Tracking", "Performance", "Freemium"],
    url: "https://sentry.io",
    github: "https://github.com/getsentry/sentry",
    stars: 4.7,
    badge: "🐛 Error Tracking",
    related: ["datadog", "grafana", "logrocket", "bugsnag"],
  },
  {
    id: "nx",
    name: "Nx Monorepo",
    category: "Build Tool",
    tagline: "Smart build system for monorepos.",
    desc: "Monorepo build system with intelligent caching, task orchestration, and code generation for JS/TS projects.",
    longDesc: `Nx is a powerful build system and monorepo tool for JavaScript and TypeScript projects. It enables organizations to have all their frontend apps, backend services, shared libraries, and tools in a single repository while keeping build times fast through intelligent caching and task orchestration.

Nx's computation caching works locally and in the cloud (Nx Cloud) — if a task has run before with the same inputs, it replays the cached output instantly. The task graph ensures tasks run in the correct order, in parallel where possible. This can reduce CI times from hours to minutes for large codebases.

Nx generators (code scaffolding) let teams create new apps, libraries, and components that follow established patterns with a single command. The Nx Console VS Code extension provides a GUI for all these operations. Nx supports React, Angular, Vue, Node.js, Remix, Next.js, and more.`,
    features: [
      "Computation caching (local & cloud)",
      "Smart task orchestration (only runs affected)",
      "Code generators for consistent scaffolding",
      "Affected task detection (only rebuild changed)",
      "Nx Cloud for distributed caching",
      "Module federation support",
      "Import graph visualization",
      "Nx Console VS Code extension",
    ],
    pricing: "Free / Nx Cloud $0-enterprise",
    platform: ["Windows", "macOS", "Linux"],
    tags: ["Monorepo", "Build Tool", "JavaScript", "TypeScript", "Free"],
    url: "https://nx.dev",
    github: "https://github.com/nrwl/nx",
    stars: 4.5,
    badge: null,
    related: ["vite", "turbopack", "lerna", "turborepo"],
  },
  {
    id: "gh-cli",
    name: "GitHub CLI",
    category: "DevOps",
    tagline: "GitHub from the command line.",
    desc: "Official CLI to create PRs, manage issues, browse repos, run workflows, and more — without leaving the terminal.",
    longDesc: `GitHub CLI (gh) is the official command-line tool for GitHub, bringing the full GitHub experience to your terminal. With it you can create and review pull requests, manage issues, check workflow runs, clone repos, create gists, manage releases, and perform nearly every GitHub action without opening a browser.

The \`gh pr create\` command drafts a PR with the current branch, fills in the template, sets reviewers, and opens it — all in seconds. \`gh run watch\` streams CI logs in real-time in your terminal. \`gh issue list\` and \`gh issue create\` bring issue management to the terminal too.

GitHub CLI also supports GitHub Copilot in the CLI, letting you ask \`gh copilot explain\` and \`gh copilot suggest\` to get AI-generated explanations and command suggestions. For developers who want to maximize time in the terminal, gh is essential.`,
    features: [
      "Create and review pull requests from terminal",
      "Manage issues, labels, and milestones",
      "View and re-run workflow runs",
      "Clone repos, fork, and manage remotes",
      "GitHub Copilot in CLI integration",
      "GitHub Actions management",
      "Release management",
      "Extensible with custom gh extensions",
    ],
    pricing: "Free, Open Source",
    platform: ["Windows", "macOS", "Linux"],
    tags: ["Git", "GitHub", "CLI", "DevOps", "Free"],
    url: "https://cli.github.com",
    github: "https://github.com/cli/cli",
    stars: 4.8,
    badge: "⌨️ CLI",
    related: ["lazygit", "git-fork", "sourcetree", "gitbutler"],
  },
];

export const CATEGORIES = ["All", ...new Set(DEVTOOLS.map((t) => t.category))];
