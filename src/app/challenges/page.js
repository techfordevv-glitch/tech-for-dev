"use client";
import { useState, useEffect } from "react";
import { FaCode, FaLightbulb, FaCheckCircle, FaLock } from "react-icons/fa";

const CHALLENGES = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    tags: ["Array", "Hash Map"],
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers that add up to `target`. You may assume each input has exactly one solution.",
    example: `Input: nums = [2, 7, 11, 15], target = 9\nOutput: [0, 1]\nExplanation: Because nums[0] + nums[1] == 9`,
    hint: "Use a hash map to store each number and its index. For each number, check if (target - number) exists in the map.",
    solution: `function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) return [map.get(complement), i];\n    map.set(nums[i], i);\n  }\n}`,
    link: "https://leetcode.com/problems/two-sum/",
  },
  {
    id: "reverse-string",
    title: "Reverse a String",
    difficulty: "Easy",
    tags: ["String", "Two Pointers"],
    description: "Write a function that reverses a string in-place. The input is an array of characters `s`.",
    example: `Input: s = ["h","e","l","l","o"]\nOutput: ["o","l","l","e","h"]`,
    hint: "Use two pointers — one at start, one at end. Swap characters and move them towards the center.",
    solution: `function reverseString(s) {\n  let l = 0, r = s.length - 1;\n  while (l < r) {\n    [s[l], s[r]] = [s[r], s[l]];\n    l++; r--;\n  }\n}`,
    link: "https://leetcode.com/problems/reverse-string/",
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    tags: ["Stack", "String"],
    description: "Given a string `s` containing '(', ')', '{', '}', '[', ']', determine if the input string is valid. An input string is valid if brackets are closed in the correct order.",
    example: `Input: s = "()[]{}"  →  Output: true\nInput: s = "(]"      →  Output: false`,
    hint: "Use a stack. Push opening brackets, and for closing brackets, check if the top of the stack matches.",
    solution: `function isValid(s) {\n  const map = { ')': '(', '}': '{', ']': '[' };\n  const stack = [];\n  for (const ch of s) {\n    if (!map[ch]) stack.push(ch);\n    else if (stack.pop() !== map[ch]) return false;\n  }\n  return stack.length === 0;\n}`,
    link: "https://leetcode.com/problems/valid-parentheses/",
  },
  {
    id: "fibonacci",
    title: "Fibonacci Number",
    difficulty: "Easy",
    tags: ["Dynamic Programming", "Recursion"],
    description: "Given `n`, calculate F(n) of the Fibonacci sequence where F(0)=0 and F(1)=1. F(n) = F(n-1) + F(n-2) for n > 1.",
    example: `Input: n = 4  →  Output: 3\nExplanation: F(4) = F(3) + F(2) = 2 + 1 = 3`,
    hint: "Use dynamic programming (bottom-up) with two variables to avoid O(n) space. Or use memoized recursion.",
    solution: `function fib(n) {\n  if (n <= 1) return n;\n  let a = 0, b = 1;\n  for (let i = 2; i <= n; i++) [a, b] = [b, a + b];\n  return b;\n}`,
    link: "https://leetcode.com/problems/fibonacci-number/",
  },
  {
    id: "max-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    tags: ["Array", "Dynamic Programming", "Kadane's Algorithm"],
    description: "Given an integer array `nums`, find the contiguous subarray (at least one element) which has the largest sum and return its sum.",
    example: `Input: nums = [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6\nExplanation: [4,-1,2,1] has the largest sum = 6`,
    hint: "Kadane's Algorithm: Track current sum and maximum sum. At each position, decide: extend the current subarray or start fresh.",
    solution: `function maxSubArray(nums) {\n  let max = nums[0], cur = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    cur = Math.max(nums[i], cur + nums[i]);\n    max = Math.max(max, cur);\n  }\n  return max;\n}`,
    link: "https://leetcode.com/problems/maximum-subarray/",
  },
  {
    id: "climb-stairs",
    title: "Climbing Stairs",
    difficulty: "Easy",
    tags: ["Dynamic Programming", "Math"],
    description: "You are climbing a staircase. It takes `n` steps to reach the top. Each time you can climb 1 or 2 steps. How many distinct ways can you climb to the top?",
    example: `Input: n = 3  →  Output: 3\nExplanation: 1+1+1, 1+2, 2+1`,
    hint: "This is basically Fibonacci! ways(n) = ways(n-1) + ways(n-2). Use DP.",
    solution: `function climbStairs(n) {\n  if (n <= 2) return n;\n  let a = 1, b = 2;\n  for (let i = 3; i <= n; i++) [a, b] = [b, a + b];\n  return b;\n}`,
    link: "https://leetcode.com/problems/climbing-stairs/",
  },
  {
    id: "binary-search",
    title: "Binary Search",
    difficulty: "Easy",
    tags: ["Array", "Binary Search"],
    description: "Given a sorted array of integers `nums` and an integer `target`, write a function to search `target` in `nums`. Return the index if found, else return -1.",
    example: `Input: nums = [-1,0,3,5,9,12], target = 9  →  Output: 4\nInput: nums = [-1,0,3,5,9,12], target = 2  →  Output: -1`,
    hint: "Maintain two pointers (left, right). Check the middle element. If it equals target, return. If less, search right half. If more, search left half.",
    solution: `function search(nums, target) {\n  let l = 0, r = nums.length - 1;\n  while (l <= r) {\n    const mid = (l + r) >> 1;\n    if (nums[mid] === target) return mid;\n    if (nums[mid] < target) l = mid + 1;\n    else r = mid - 1;\n  }\n  return -1;\n}`,
    link: "https://leetcode.com/problems/binary-search/",
  },
  {
    id: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "Medium",
    tags: ["Array", "Sorting"],
    description: "Given an array of `intervals` where intervals[i] = [starti, endi], merge all overlapping intervals and return an array of all non-overlapping intervals.",
    example: `Input: [[1,3],[2,6],[8,10],[15,18]]\nOutput: [[1,6],[8,10],[15,18]]`,
    hint: "Sort intervals by start time. Then iterate and merge if the current interval's start <= previous end.",
    solution: `function merge(intervals) {\n  intervals.sort((a, b) => a[0] - b[0]);\n  const res = [intervals[0]];\n  for (const [s, e] of intervals.slice(1)) {\n    if (s <= res.at(-1)[1]) res.at(-1)[1] = Math.max(res.at(-1)[1], e);\n    else res.push([s, e]);\n  }\n  return res;\n}`,
    link: "https://leetcode.com/problems/merge-intervals/",
  },
  {
    id: "lru-cache",
    title: "LRU Cache",
    difficulty: "Hard",
    tags: ["Design", "Hash Map", "Doubly Linked List"],
    description: "Design a data structure that follows Least Recently Used (LRU) cache constraints. Implement `get(key)` and `put(key, value)` both in O(1) time.",
    example: `LRUCache(2)\nput(1, 1) → cache: {1=1}\nput(2, 2) → cache: {1=1, 2=2}\nget(1)   → 1 (cache: {2=2, 1=1})\nput(3, 3) → evicts 2, cache: {1=1, 3=3}`,
    hint: "Use a HashMap + Doubly Linked List. HashMap provides O(1) lookup; DLL maintains LRU order. Move accessed nodes to the head.",
    solution: `class LRUCache {\n  constructor(cap) {\n    this.cap = cap; this.map = new Map();\n    this.head = {}; this.tail = {};\n    this.head.next = this.tail; this.tail.prev = this.head;\n  }\n  get(key) {\n    if (!this.map.has(key)) return -1;\n    const node = this.map.get(key);\n    this._remove(node); this._add(node);\n    return node.val;\n  }\n  put(key, val) {\n    if (this.map.has(key)) this._remove(this.map.get(key));\n    const node = { key, val };\n    this._add(node); this.map.set(key, node);\n    if (this.map.size > this.cap) {\n      const lru = this.tail.prev;\n      this._remove(lru); this.map.delete(lru.key);\n    }\n  }\n  _add(node) {\n    node.next = this.head.next; node.prev = this.head;\n    this.head.next.prev = node; this.head.next = node;\n  }\n  _remove(node) {\n    node.prev.next = node.next; node.next.prev = node.prev;\n  }\n}`,
    link: "https://leetcode.com/problems/lru-cache/",
  },
  {
    id: "word-search",
    title: "Word Search",
    difficulty: "Hard",
    tags: ["DFS", "Backtracking", "Matrix"],
    description: "Given an `m x n` grid of characters and a string `word`, return true if `word` exists in the grid. The word must be formed from letters of sequentially adjacent cells (horizontally or vertically).",
    example: `Grid: [["A","B","C"],["S","F","C"],["A","D","E"]]\nword = "ABCCED"  →  true`,
    hint: "Use DFS with backtracking. Mark visited cells temporarily (e.g., '#'), explore all 4 directions, then restore.",
    solution: `function exist(board, word) {\n  const dfs = (i, j, k) => {\n    if (k === word.length) return true;\n    if (i<0||j<0||i>=board.length||j>=board[0].length||board[i][j]!==word[k]) return false;\n    const tmp = board[i][j]; board[i][j] = '#';\n    const found = dfs(i+1,j,k+1)||dfs(i-1,j,k+1)||dfs(i,j+1,k+1)||dfs(i,j-1,k+1);\n    board[i][j] = tmp;\n    return found;\n  };\n  for (let i=0;i<board.length;i++)\n    for (let j=0;j<board[0].length;j++)\n      if (dfs(i,j,0)) return true;\n  return false;\n}`,
    link: "https://leetcode.com/problems/word-search/",
  },
];

const DIFFICULTY_COLORS = { Easy: "#10b981", Medium: "#f59e0b", Hard: "#ef4444" };

export default function ChallengesPage() {
  const [filter, setFilter] = useState("All");
  const [solved, setSolved] = useState({});
  const [hints, setHints] = useState({});
  const [solutions, setSolutions] = useState({});

  useEffect(() => {
    try { setSolved(JSON.parse(localStorage.getItem("challenges_solved") || "{}")); } catch {}
  }, []);

  const markSolved = (id) => {
    setSolved((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem("challenges_solved", JSON.stringify(next));
      return next;
    });
  };

  const filtered = filter === "All" ? CHALLENGES : CHALLENGES.filter((c) => c.difficulty === filter);
  const totalSolved = Object.values(solved).filter(Boolean).length;

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center gap-3 mb-2">
        <FaCode size={28} className="text-primary" />
        <h1 className="h2 mb-0 fw-bold">Daily Coding Challenges</h1>
      </div>
      <p className="text-secondary mb-1">Practice DSA problems, sharpen your skills. Click ✅ to mark as solved.</p>

      {/* Stats */}
      <div className="d-flex gap-3 mb-4 flex-wrap">
        <span className="badge bg-success px-3 py-2 rounded-pill">✅ {totalSolved} Solved</span>
        <span className="badge px-3 py-2 rounded-pill" style={{ background: "#10b981" }}>Easy: {CHALLENGES.filter(c => c.difficulty==="Easy").length}</span>
        <span className="badge px-3 py-2 rounded-pill" style={{ background: "#f59e0b" }}>Medium: {CHALLENGES.filter(c => c.difficulty==="Medium").length}</span>
        <span className="badge px-3 py-2 rounded-pill" style={{ background: "#ef4444" }}>Hard: {CHALLENGES.filter(c => c.difficulty==="Hard").length}</span>
      </div>

      {/* Filter */}
      <div className="d-flex gap-2 mb-4 flex-wrap">
        {["All", "Easy", "Medium", "Hard"].map((d) => (
          <button key={d} onClick={() => setFilter(d)}
            className="btn btn-sm rounded-pill"
            style={{ background: filter === d ? (DIFFICULTY_COLORS[d] || "#3b82f6") : "var(--bg-card)", color: filter === d ? "#fff" : "var(--text-secondary)", border: "1px solid var(--border-color)" }}>
            {d}
          </button>
        ))}
      </div>

      {/* Challenge Cards */}
      <div className="row g-3">
        {filtered.map((c) => (
          <div key={c.id} className="col-md-6 col-lg-4">
            <div className="card h-100 p-3" style={{ border: solved[c.id] ? "1px solid #10b981" : "1px solid var(--border-color)" }}>
              <div className="d-flex justify-content-between align-items-start mb-2">
                <span className="badge rounded-pill" style={{ background: DIFFICULTY_COLORS[c.difficulty], color: "#fff", fontSize: "0.7rem" }}>{c.difficulty}</span>
                <button onClick={() => markSolved(c.id)} className="btn btn-sm p-0" style={{ color: solved[c.id] ? "#10b981" : "var(--text-secondary)" }} title="Mark solved">
                  <FaCheckCircle size={18} />
                </button>
              </div>
              <h6 className="fw-bold mb-2">{c.title}</h6>
              <div className="d-flex gap-1 flex-wrap mb-2">
                {c.tags.map((t) => <span key={t} className="badge" style={{ background: "rgba(59,130,246,0.12)", color: "#3b82f6", fontSize: "0.65rem", borderRadius: 10 }}>{t}</span>)}
              </div>
              <p className="text-secondary small mb-3">{c.description}</p>
              <pre className="rounded p-2 mb-3" style={{ background: "var(--bg-primary)", fontSize: "0.7rem", color: "#10b981", whiteSpace: "pre-wrap", maxHeight: 80, overflow: "auto" }}>{c.example}</pre>
              <div className="d-flex gap-2 flex-wrap">
                <button className="btn btn-sm" style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.3)", fontSize: "0.75rem" }}
                  onClick={() => setHints((p) => ({ ...p, [c.id]: !p[c.id] }))}>
                  <FaLightbulb size={11} className="me-1" />{hints[c.id] ? "Hide Hint" : "Show Hint"}
                </button>
                <button className="btn btn-sm" style={{ background: "rgba(139,92,246,0.1)", color: "#8b5cf6", border: "1px solid rgba(139,92,246,0.3)", fontSize: "0.75rem" }}
                  onClick={() => setSolutions((p) => ({ ...p, [c.id]: !p[c.id] }))}>
                  <FaLock size={10} className="me-1" />{solutions[c.id] ? "Hide" : "Solution"}
                </button>
                <a href={c.link} target="_blank" rel="noopener noreferrer" className="btn btn-sm" style={{ background: "rgba(59,130,246,0.1)", color: "#3b82f6", border: "1px solid rgba(59,130,246,0.3)", fontSize: "0.75rem" }}>
                  LeetCode ↗
                </a>
              </div>
              {hints[c.id] && <div className="mt-3 p-2 rounded small" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", color: "#f59e0b" }}>💡 {c.hint}</div>}
              {solutions[c.id] && <pre className="mt-3 p-2 rounded" style={{ background: "var(--bg-primary)", color: "#10b981", fontSize: "0.68rem", overflow: "auto", maxHeight: 200 }}>{c.solution}</pre>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
