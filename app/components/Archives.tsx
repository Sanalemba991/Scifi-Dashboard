"use client";
import { useState, useEffect } from "react";

const archiveCategories = [
  { id: "cat-001", name: "MISSION REPORTS", count: 1247, icon: "◇" },
  { id: "cat-002", name: "PERSONNEL FILES", count: 2847, icon: "◉" },
  { id: "cat-003", name: "TECHNICAL DOCS", count: 892, icon: "△" },
  { id: "cat-004", name: "INTELLIGENCE", count: 456, icon: "◈" },
  { id: "cat-005", name: "TRAINING MATERIALS", count: 234, icon: "□" },
  { id: "cat-006", name: "CLASSIFIED", count: 78, icon: "⬡" },
];

const recentDocuments = [
  {
    id: "doc-001",
    name: "Operation NIGHTFALL - Phase 3 Report",
    category: "MISSION REPORTS",
    date: "2026-01-12",
    size: "2.4 MB",
    classification: "SECRET",
    author: "CDR. MITCHELL",
  },
  {
    id: "doc-002",
    name: "Personnel Evaluation Q4-2025",
    category: "PERSONNEL FILES",
    date: "2026-01-10",
    size: "1.8 MB",
    classification: "CONFIDENTIAL",
    author: "HR DIVISION",
  },
  {
    id: "doc-003",
    name: "Technical Specifications - Phoenix Protocol",
    category: "TECHNICAL DOCS",
    date: "2026-01-08",
    size: "5.2 MB",
    classification: "TOP SECRET",
    author: "R&D DEPARTMENT",
  },
  {
    id: "doc-004",
    name: "Threat Assessment Report - Sector Delta",
    category: "INTELLIGENCE",
    date: "2026-01-07",
    size: "890 KB",
    classification: "SECRET",
    author: "INTEL DIVISION",
  },
  {
    id: "doc-005",
    name: "Combat Training Manual v4.2",
    category: "TRAINING MATERIALS",
    date: "2026-01-05",
    size: "12.4 MB",
    classification: "UNCLASSIFIED",
    author: "TRAINING COMMAND",
  },
  {
    id: "doc-006",
    name: "Project AURORA - Final Summary",
    category: "MISSION REPORTS",
    date: "2026-01-03",
    size: "3.1 MB",
    classification: "CONFIDENTIAL",
    author: "CPT. WILLIAMS",
  },
];

const storageStats = {
  total: 500,
  used: 347,
  breakdown: [
    { type: "DOCUMENTS", size: 156, color: "cyan" },
    { type: "MEDIA", size: 89, color: "red" },
    { type: "BACKUPS", size: 67, color: "orange" },
    { type: "LOGS", size: 35, color: "green" },
  ],
};

export default function Archives() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [storageUsed, setStorageUsed] = useState(0);

  useEffect(() => {
    // Animate storage gauge
    const timer = setTimeout(() => {
      setStorageUsed(storageStats.used);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredDocs = recentDocuments.filter(doc => 
    (selectedCategory === null || doc.category === selectedCategory) &&
    (searchQuery === "" || doc.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Archives Header */}
      <div className="glass glow-border rounded-lg p-4 flex items-center justify-between fade-in-down corner-accent">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 glass rounded-lg flex items-center justify-center text-red-400 text-2xl float pulse-ring">
            ○
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-wider hover-glow">SECURE ARCHIVES</h1>
            <p className="text-sm text-gray-500">Document management and retrieval system</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass px-4 py-2 rounded holographic">
            <span className="text-xs text-cyan-400">{storageStats.used} GB / {storageStats.total} GB USED</span>
          </div>
          <div className="flex glass rounded overflow-hidden">
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-2 text-xs transition-all ${viewMode === "list" ? "bg-red-500/20 text-red-400" : "text-gray-500 hover:text-gray-300"}`}
            >
              LIST
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-2 text-xs transition-all ${viewMode === "grid" ? "bg-red-500/20 text-red-400" : "text-gray-500 hover:text-gray-300"}`}
            >
              GRID
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="glass glow-border rounded-lg p-4 fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search archives..."
              className="w-full glass px-4 py-3 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-red-500/50 pl-10 transition-all"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 animate-pulse">◈</span>
          </div>
          <button className="glass px-6 py-3 rounded text-sm text-cyan-400 hover:bg-cyan-500/10 transition-colors cyber-btn">
            ADVANCED SEARCH
          </button>
          <button className="glass-cyan px-6 py-3 rounded text-sm text-cyan-400 hover:bg-cyan-500/20 transition-colors cyber-btn">
            UPLOAD
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Categories */}
        <div className="col-span-3">
          <div className="glass glow-border rounded-lg overflow-hidden fade-in-left" style={{ animationDelay: '0.2s' }}>
            <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30">
              <span className="text-xs text-red-400 tracking-widest">◈ CATEGORIES</span>
            </div>
            <div className="p-2 space-y-1">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`w-full p-3 rounded text-left transition-all flex items-center justify-between hover-lift ${
                  selectedCategory === null ? "glass glow-border border-red-500/50" : "hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg text-red-400 float">◈</span>
                  <span className="text-sm text-white">ALL DOCUMENTS</span>
                </div>
                <span className="text-xs text-gray-500">
                  {recentDocuments.length}
                </span>
              </button>
              {archiveCategories.map((category, index) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`w-full p-3 rounded text-left transition-all flex items-center justify-between hover-lift fade-in-left ${
                    selectedCategory === category.name ? "glass glow-border border-red-500/50" : "hover:bg-white/5"
                  }`}
                  style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg text-cyan-400 float">{category.icon}</span>
                    <span className="text-sm text-white">{category.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">{category.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Storage Breakdown */}
          <div className="glass glow-border rounded-lg overflow-hidden mt-6 fade-in-left" style={{ animationDelay: '0.4s' }}>
            <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30">
              <span className="text-xs text-red-400 tracking-widest">◈ STORAGE</span>
            </div>
            <div className="p-4">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="64" cy="64" r="56" fill="none" stroke="#1f1f2e" strokeWidth="12" />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="url(#storageGradient)"
                    strokeWidth="12"
                    strokeDasharray={`${(storageStats.used / storageStats.total) * 352} 352`}
                    strokeLinecap="round"
                    className="progress-glow"
                  />
                  <defs>
                    <linearGradient id="storageGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ff3333" />
                      <stop offset="100%" stopColor="#ff8800" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-white">{Math.round((storageStats.used / storageStats.total) * 100)}%</span>
                  <span className="text-xs text-gray-500">USED</span>
                </div>
              </div>
              <div className="space-y-2">
                {storageStats.breakdown.map((item) => (
                  <div key={item.type} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded bg-${item.color}-500`} />
                      <span className="text-gray-400">{item.type}</span>
                    </div>
                    <span className="text-white">{item.size} GB</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Documents List */}
        <div className="col-span-9">
          <div className="glass glow-border rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30 flex items-center justify-between">
              <span className="text-xs text-red-400 tracking-widest">◈ DOCUMENTS</span>
              <span className="text-xs text-gray-500">{filteredDocs.length} FILES</span>
            </div>
            
            {viewMode === "list" ? (
              <div className="divide-y divide-red-500/10">
                {/* Header */}
                <div className="grid grid-cols-12 gap-4 px-4 py-3 text-xs text-gray-500 bg-black/20">
                  <div className="col-span-5">NAME</div>
                  <div className="col-span-2">CATEGORY</div>
                  <div className="col-span-2">CLASSIFICATION</div>
                  <div className="col-span-2">DATE</div>
                  <div className="col-span-1">SIZE</div>
                </div>
                {/* Documents */}
                {filteredDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors items-center"
                  >
                    <div className="col-span-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 glass rounded flex items-center justify-center text-cyan-400 text-xs">
                          📄
                        </div>
                        <div>
                          <p className="text-sm text-white">{doc.name}</p>
                          <p className="text-xs text-gray-500">{doc.author}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <span className="text-xs text-gray-400">{doc.category}</span>
                    </div>
                    <div className="col-span-2">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        doc.classification === "TOP SECRET" ? "bg-red-500/20 text-red-400" :
                        doc.classification === "SECRET" ? "bg-orange-500/20 text-orange-400" :
                        doc.classification === "CONFIDENTIAL" ? "bg-yellow-500/20 text-yellow-400" :
                        "bg-green-500/20 text-green-400"
                      }`}>
                        {doc.classification}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-xs text-gray-400">{doc.date}</span>
                    </div>
                    <div className="col-span-1">
                      <span className="text-xs text-cyan-400">{doc.size}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 grid grid-cols-3 gap-4">
                {filteredDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="glass p-4 rounded cursor-pointer hover:border-red-500/30 border border-transparent transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 glass rounded-lg flex items-center justify-center text-cyan-400 text-2xl">
                        📄
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        doc.classification === "TOP SECRET" ? "bg-red-500/20 text-red-400" :
                        doc.classification === "SECRET" ? "bg-orange-500/20 text-orange-400" :
                        doc.classification === "CONFIDENTIAL" ? "bg-yellow-500/20 text-yellow-400" :
                        "bg-green-500/20 text-green-400"
                      }`}>
                        {doc.classification}
                      </span>
                    </div>
                    <h4 className="text-sm text-white mb-1 line-clamp-2">{doc.name}</h4>
                    <p className="text-xs text-gray-500 mb-2">{doc.author}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{doc.date}</span>
                      <span className="text-cyan-400">{doc.size}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="glass glow-border rounded-lg overflow-hidden mt-6">
            <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30">
              <span className="text-xs text-red-400 tracking-widest">◈ RECENT ACTIVITY</span>
            </div>
            <div className="p-4 flex gap-4">
              {[
                { action: "VIEWED", doc: "Operation NIGHTFALL Report", time: "2 min ago", user: "CDR. MITCHELL" },
                { action: "UPLOADED", doc: "Personnel Evaluation Q4", time: "15 min ago", user: "HR DIVISION" },
                { action: "MODIFIED", doc: "Phoenix Protocol Specs", time: "1 hr ago", user: "R&D DEPT" },
              ].map((activity, index) => (
                <div key={index} className="flex-1 glass p-3 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      activity.action === "VIEWED" ? "bg-cyan-500/20 text-cyan-400" :
                      activity.action === "UPLOADED" ? "bg-green-500/20 text-green-400" :
                      "bg-yellow-500/20 text-yellow-400"
                    }`}>
                      {activity.action}
                    </span>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                  <p className="text-sm text-white truncate">{activity.doc}</p>
                  <p className="text-xs text-gray-500">{activity.user}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
