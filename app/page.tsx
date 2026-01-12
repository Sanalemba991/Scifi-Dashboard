"use client";
import { useState, useEffect, useRef } from "react";
import Dashboard from "./components/Dashboard";
import Personnel from "./components/Personnel";
import Operations from "./components/Operations";
import Analytics from "./components/Analytics";
import Communications from "./components/Communications";
import Archives from "./components/Archives";
import Settings from "./components/Settings";

// Particle component for animated background
const Particles = () => {
  return (
    <div className="particles">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${8 + Math.random() * 12}s`,
            animationDelay: `${Math.random() * 8}s`,
            background: i % 3 === 0 ? '#ff3333' : i % 3 === 1 ? '#00ffff' : '#9933ff',
          }}
        />
      ))}
    </div>
  );
};

// Floating hex background
const FloatingHex = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute text-9xl text-red-500/10 font-mono float"
          style={{
            left: `${15 + i * 15}%`,
            top: `${10 + (i % 3) * 30}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${8 + i}s`,
          }}
        >
          ⬡
        </div>
      ))}
    </div>
  );
};

// Employee data
const employeeData = {
  id: "EMP-2026-0847",
  name: "COMMANDER SARAH J. MITCHELL",
  designation: "SENIOR TACTICAL OPERATIONS SPECIALIST",
  department: "STRATEGIC COMMAND DIVISION",
  clearanceLevel: "OMEGA-7",
  status: "ACTIVE",
  bloodType: "O-NEGATIVE",
  dob: "1989-03-15",
  height: "5'9\" / 175cm",
  weight: "145 lbs / 66kg",
  eyeColor: "BLUE",
  hairColor: "BROWN",
  nationality: "UNITED FEDERATION",
  joinDate: "2015-06-22",
  lastActive: "2026-01-12 14:32:07",
  biometricId: "BIO-9X7K-MITCH-2847",
  skills: [
    { name: "Combat Tactics", level: 95 },
    { name: "Strategic Planning", level: 92 },
    { name: "Weapons Systems", level: 88 },
    { name: "Leadership", level: 97 },
    { name: "Crisis Management", level: 91 },
  ],
  certifications: [
    "Advanced Combat Training",
    "Zero-G Operations",
    "Hazmat Response",
    "Cybersecurity Protocol",
    "Emergency Medical",
  ],
  projects: [
    {
      id: "PRJ-001",
      name: "OPERATION NIGHTFALL",
      status: "IN PROGRESS",
      progress: 67,
      priority: "HIGH",
      deadline: "2026-02-15",
      team: 12,
      description: "Classified tactical operation - Alpha sector deployment",
    },
    {
      id: "PRJ-002",
      name: "PROJECT PHOENIX",
      status: "IN PROGRESS",
      progress: 45,
      priority: "CRITICAL",
      deadline: "2026-03-01",
      team: 8,
      description: "System reconstruction and protocol upgrade initiative",
    },
    {
      id: "PRJ-003",
      name: "SENTINEL PROTOCOL",
      status: "PENDING REVIEW",
      progress: 89,
      priority: "MEDIUM",
      deadline: "2026-01-30",
      team: 5,
      description: "Security enhancement and threat assessment program",
    },
    {
      id: "PRJ-004",
      name: "AURORA INITIATIVE",
      status: "COMPLETED",
      progress: 100,
      priority: "LOW",
      deadline: "2026-01-10",
      team: 3,
      description: "Training simulation and personnel evaluation",
    },
  ],
  serviceRecord: [
    { year: "2015", event: "Enlisted - Basic Training Completed" },
    { year: "2017", event: "Promoted to Lieutenant" },
    { year: "2019", event: "Special Operations Certification" },
    { year: "2021", event: "Promoted to Commander" },
    { year: "2023", event: "Awarded Medal of Distinction" },
    { year: "2025", event: "Assigned to Strategic Command" },
  ],
};

// Sidebar menu items
const menuItems = [
  { icon: "◈", label: "DASHBOARD", id: "dashboard" },
  { icon: "◉", label: "PERSONNEL", id: "personnel" },
  { icon: "◇", label: "OPERATIONS", id: "operations" },
  { icon: "△", label: "ANALYTICS", id: "analytics" },
  { icon: "□", label: "COMMUNICATIONS", id: "comms" },
  { icon: "○", label: "ARCHIVES", id: "archives" },
  { icon: "⬡", label: "SETTINGS", id: "settings" },
];

// System status data
const systemStatus = [
  { name: "NETWORK", value: 98, status: "ONLINE" },
  { name: "SECURITY", value: 100, status: "SECURE" },
  { name: "DATABASE", value: 87, status: "SYNCING" },
  { name: "COMMS", value: 95, status: "ACTIVE" },
];

// Header titles for each section
const sectionTitles: Record<string, string> = {
  dashboard: "COMMAND CENTER OVERVIEW",
  personnel: "PERSONNEL DATABASE ACCESS",
  operations: "TACTICAL OPERATIONS CENTER",
  analytics: "DATA ANALYTICS TERMINAL",
  comms: "SECURE COMMUNICATIONS HUB",
  archives: "CLASSIFIED ARCHIVES ACCESS",
  settings: "SYSTEM CONFIGURATION",
};

export default function Home() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoaded, setIsLoaded] = useState(false);
  const [glitchText, setGlitchText] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    setIsLoaded(true);
    
    // Random glitch effect
    const glitchInterval = setInterval(() => {
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), 200);
    }, 5000);
    
    return () => {
      clearInterval(timer);
      clearInterval(glitchInterval);
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", { hour12: false });
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0].replace(/-/g, ".");
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return <Dashboard employeeData={employeeData} />;
      case "personnel":
        return <Personnel employeeData={employeeData} />;
      case "operations":
        return <Operations />;
      case "analytics":
        return <Analytics />;
      case "comms":
        return <Communications />;
      case "archives":
        return <Archives />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard employeeData={employeeData} />;
    }
  };

  return (
    <div className="scanlines min-h-screen bg-[#050508] grid-bg hex-pattern">
      {/* Animated Particles */}
      <Particles />
      
      {/* Floating Hexagons */}
      <FloatingHex />
      
      {/* Matrix-style overlay */}
      <div className="matrix-bg" />

      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-red-500/30 to-transparent animate-pulse" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        
        {/* Animated corner accents */}
        <div className="absolute top-4 left-4 w-20 h-20 border-l-2 border-t-2 border-red-500/50 animate-pulse" />
        <div className="absolute top-4 right-4 w-20 h-20 border-r-2 border-t-2 border-cyan-500/50 animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-4 left-4 w-20 h-20 border-l-2 border-b-2 border-cyan-500/50 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-4 right-4 w-20 h-20 border-r-2 border-b-2 border-red-500/50 animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-6 left-6 z-50 glass glow-border p-3 rounded-lg text-red-500 hover-glow transition-all duration-300"
        style={{ transform: isSidebarOpen ? 'translateX(288px)' : 'translateX(0)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Fixed Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-72 glass border-r border-red-500/30 flex flex-col z-40 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo */}
        <div className="p-6 border-b border-red-500/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 glass glow-border flex items-center justify-center text-red-500 text-2xl pulse-ring float">
              ⬡
            </div>
            <div>
              <h1 className={`text-red-500 font-bold tracking-widest text-lg neon-text-red ${glitchText ? 'glitch' : ''}`} data-text="NEXUS">
                NEXUS
              </h1>
              <p className="text-xs text-gray-500 tracking-wider">
                COMMAND SYSTEM v4.2
              </p>
            </div>
          </div>
        </div>

        {/* User Quick Info */}
        <div className="p-4 border-b border-red-500/30">
          <div className="glass p-3 rounded holographic card-shine">
            <p className="text-xs text-cyan-400">OPERATOR STATUS</p>
            <p className="text-sm text-white mt-1">ADMIN_ROOT</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse-glow" />
              <span className="text-xs text-green-400">AUTHENTICATED</span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <p className="text-xs text-gray-500 mb-4 tracking-widest">
            MAIN NAVIGATION
          </p>
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={item.id} className={`fade-in-left stagger-${index + 1}`}>
                <button
                  onClick={() => {
                    setActiveMenu(item.id);
                    setIsSidebarOpen(false); // Close sidebar after selection
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-all duration-300 hover-lift cyber-btn ${
                    activeMenu === item.id
                      ? "glass glow-border text-red-400 border-red-500/50"
                      : "text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                  }`}
                >
                  <span className={`text-lg ${activeMenu === item.id ? 'animate-pulse-glow' : ''}`}>{item.icon}</span>
                  <span className="text-sm tracking-wider">{item.label}</span>
                  {activeMenu === item.id && (
                    <span className="ml-auto w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse-glow" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* System Status */}
        <div className="p-4 border-t border-red-500/30">
          <p className="text-xs text-gray-500 mb-3 tracking-widest">
            SYSTEM STATUS
          </p>
          <div className="space-y-2">
            {systemStatus.map((sys, index) => (
              <div
                key={sys.name}
                className={`flex items-center justify-between text-xs fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="text-gray-400">{sys.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1 bg-gray-800 rounded overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-orange-500 progress-glow energy-bar"
                      style={{ width: `${sys.value}%`, transition: 'width 1s ease-out' }}
                    />
                  </div>
                  <span
                    className={`${
                      sys.value === 100 ? "text-green-400" : "text-cyan-400"
                    }`}
                  >
                    {sys.value}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timestamp */}
        <div className="p-4 border-t border-red-500/30 text-center">
          <p className="text-xs text-gray-600">SYSTEM TIME</p>
          <p className="text-sm text-cyan-400 font-mono neon-text-cyan">
            {formatDate(currentTime)} | {formatTime(currentTime)}
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 p-6 overflow-auto transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-0'}`}>
        {/* Header Bar */}
        <header className="glass glow-border rounded-lg p-4 mb-6 flex items-center justify-between fade-in-down corner-accent">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-red-500 animate-pulse-glow">●</span>
              <span className="text-xs text-gray-400 tracking-widest">
                LIVE FEED
              </span>
            </div>
            <div className="h-4 w-px bg-red-500/30" />
            <span className={`text-sm text-white tracking-wider ${glitchText ? 'glitch' : ''}`} data-text={sectionTitles[activeMenu]}>
              {sectionTitles[activeMenu]}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="glass-cyan px-4 py-2 rounded text-xs text-cyan-400 hover-scale">
              CLEARANCE: OMEGA-7
            </div>
            <div className="glass px-4 py-2 rounded text-xs text-red-400 animate-border-pulse border border-red-500/50 hover-glow">
              ◈ SECURE CONNECTION
            </div>
          </div>
        </header>

        {/* Dynamic Content with transition */}
        <div className="fade-in-up" key={activeMenu}>
          {renderContent()}
        </div>

        {/* Data Stream Footer */}
        <div className="mt-6 fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="glass rounded-lg overflow-hidden border border-red-500/20">
            <div className="flex items-center gap-4 px-4 py-2 bg-red-900/20 border-b border-red-500/20">
              <span className="text-red-500 animate-pulse-glow text-xs">● REC</span>
              <span className="text-xs text-gray-500 tracking-widest">SYSTEM DATA STREAM</span>
              <div className="flex-1" />
              <span className="text-xs text-gray-600 font-mono">
                7A:3F:B2:E9:4C:8D:1A:5E
              </span>
            </div>
            <div className="flex gap-2 px-4 py-2 overflow-hidden">
              <div className="flex gap-2 data-stream whitespace-nowrap">
                {["█7A3F", "░B2E9", "█4C8D", "░1A5E", "█9F2B", "░C4E7", "█8D3A", "░2E6F", "█5B9C", "░A1D8",
                  "█F3E2", "░6C9A", "█D4B7", "░8E1F", "█3A5C", "░9B2D", "█E7F4", "░1C8A", "█6D3E", "░B5F9",
                  "█7A3F", "░B2E9", "█4C8D", "░1A5E", "█9F2B", "░C4E7", "█8D3A", "░2E6F", "█5B9C", "░A1D8"].map((code, i) => (
                  <span key={i} className={`text-xs font-mono ${i % 2 === 0 ? 'text-red-500/60' : 'text-cyan-500/60'}`}>
                    {code}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}