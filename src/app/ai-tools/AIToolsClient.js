"use client";

import { useState, useMemo } from "react";
import { FaRobot, FaSearch } from "react-icons/fa";
import { aiTools, aiCategories } from "@/lib/aitools";
import AIToolCard from "@/components/AIToolCard";

export default function AIToolsClient() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = useMemo(() => {
    let tools = aiTools;

    if (selectedCategory !== "All") {
      tools = tools.filter((t) => t.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      tools = tools.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.company.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    return tools;
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>
            <FaRobot className="text-info me-2" />
            AI Tools Directory
          </h1>
          <p className="mb-0">
            Explore {aiTools.length}+ AI tools across {aiCategories.length - 1} categories — with details, pricing, and features
          </p>
        </div>
      </div>

      <div className="container py-4">
        {/* Search */}
        <div className="mb-4" style={{ maxWidth: 500 }}>
          <div className="input-group">
            <span className="input-group-text border-0" style={{ background: "rgba(255,255,255,0.06)" }}>
              <FaSearch className="text-muted" />
            </span>
            <input
              type="text"
              className="form-control search-input border-start-0"
              placeholder="Search AI tools... (e.g., ChatGPT, image, coding)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="d-flex flex-wrap gap-2 mb-4">
          {aiCategories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
              {cat !== "All" && (
                <span className="ms-1 opacity-75">
                  ({aiTools.filter((t) => t.category === cat).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-muted small mb-4">
          Showing <strong>{filteredTools.length}</strong> tool{filteredTools.length !== 1 ? "s" : ""}
          {selectedCategory !== "All" && (
            <> in <strong className="text-info">{selectedCategory}</strong></>
          )}
          {searchQuery && (
            <> matching <strong className="text-primary">&quot;{searchQuery}&quot;</strong></>
          )}
        </p>

        {/* Tools Grid */}
        <div className="row g-4">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool) => (
              <div key={tool.id} className="col-md-6 col-lg-4">
                <AIToolCard tool={tool} />
              </div>
            ))
          ) : (
            <div className="col-12 text-center text-muted py-5">
              <FaRobot size={50} className="mb-3 opacity-25" />
              <h5>No tools found</h5>
              <p>Try a different search or category</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
