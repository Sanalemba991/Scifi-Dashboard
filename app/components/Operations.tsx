"use client";
import { useState, useEffect } from "react";

const missions = [
  {
    id: "OP-2026-001",
    codename: "OPERATION NIGHTFALL",
    status: "ACTIVE",
    priority: "CRITICAL",
    location: "SECTOR 7-ALPHA",
    commander: "CDR. MITCHELL",
    team: 12,
    startDate: "2025-12-15",
    eta: "2026-02-15",
    progress: 67,
    description: "High-priority tactical deployment in Alpha sector. Requires stealth approach and coordinated team movement.",
    objectives: [
      { id: 1, name: "Establish perimeter security", status: "COMPLETED" },
      { id: 2, name: "Deploy reconnaissance units", status: "COMPLETED" },
      { id: 3, name: "Secure primary objectives", status: "IN PROGRESS" },
      { id: 4, name: "Extract VIP assets", status: "PENDING" },
    ],
  },
  {
    id: "OP-2026-002",
    codename: "PROJECT PHOENIX",
    status: "ACTIVE",
    priority: "HIGH",
    location: "CENTRAL COMMAND",
    commander: "MAJ. RODRIGUEZ",
    team: 8,
    startDate: "2025-11-01",
    eta: "2026-03-01",
    progress: 45,
    description: "System reconstruction initiative. Complete overhaul of legacy protocols and security infrastructure.",
    objectives: [
      { id: 1, name: "Phase 1: Assessment complete", status: "COMPLETED" },
      { id: 2, name: "Phase 2: Infrastructure upgrade", status: "IN PROGRESS" },
      { id: 3, name: "Phase 3: Testing protocols", status: "PENDING" },
      { id: 4, name: "Phase 4: Full deployment", status: "PENDING" },
    ],
  },
  {
    id: "OP-2026-003",
    codename: "SENTINEL PROTOCOL",
    status: "REVIEW",
    priority: "MEDIUM",
    location: "PERIMETER GRID",
    commander: "LT. CHEN",
    team: 5,
    startDate: "2025-10-20",
    eta: "2026-01-30",
    progress: 89,
    description: "Security enhancement program. Comprehensive threat assessment and countermeasure implementation.",
    objectives: [
      { id: 1, name: "Threat analysis completed", status: "COMPLETED" },
      { id: 2, name: "Defense grid upgraded", status: "COMPLETED" },
      { id: 3, name: "Personnel training", status: "COMPLETED" },
      { id: 4, name: "Final review pending", status: "IN PROGRESS" },
    ],
  },
  {
    id: "OP-2026-004",
    codename: "AURORA INITIATIVE",
    status: "COMPLETED",
    priority: "LOW",
    location: "TRAINING FACILITY",
    commander: "CPT. WILLIAMS",
    team: 3,
    startDate: "2025-09-01",
    eta: "2026-01-10",
    progress: 100,
    description: "Training simulation and personnel evaluation program. Successfully completed ahead of schedule.",
    objectives: [
      { id: 1, name: "Simulation deployment", status: "COMPLETED" },
      { id: 2, name: "Personnel testing", status: "COMPLETED" },
      { id: 3, name: "Performance evaluation", status: "COMPLETED" },
      { id: 4, name: "Report submission", status: "COMPLETED" },
    ],
  },
];

const resources = [
  { name: "PERSONNEL", available: 847, deployed: 234, status: "OPTIMAL" },
  { name: "VEHICLES", available: 128, deployed: 45, status: "OPTIMAL" },
  { name: "EQUIPMENT", available: 2450, deployed: 890, status: "WARNING" },
  { name: "SUPPLIES", available: 15000, deployed: 4200, status: "OPTIMAL" },
];

export default function Operations() {
  const [selectedMission, setSelectedMission] = useState<string | null>("OP-2026-001");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [radarAngle, setRadarAngle] = useState(0);

  useEffect(() => {
    const radarTimer = setInterval(() => {
      setRadarAngle(prev => (prev + 2) % 360);
    }, 50);
    return () => clearInterval(radarTimer);
  }, []);

  const activeMission = missions.find((m) => m.id === selectedMission);

  return (
    <div className="space-y-6">
      {/* Operations Header */}
      <div className="glass glow-border rounded-lg p-4 flex items-center justify-between fade-in-down corner-accent">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 glass rounded-lg flex items-center justify-center text-red-400 text-2xl float pulse-ring">
            ◇
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-wider hover-glow">OPERATIONS CENTER</h1>
            <p className="text-sm text-gray-500">Real-time mission monitoring and control</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass px-4 py-2 rounded flex items-center gap-2 holographic">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse-glow" />
            <span className="text-xs text-green-400">ALL SYSTEMS NOMINAL</span>
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

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "ACTIVE OPERATIONS", value: missions.filter(m => m.status === "ACTIVE").length, icon: "◈", color: "red" },
          { label: "IN REVIEW", value: missions.filter(m => m.status === "REVIEW").length, icon: "◉", color: "yellow" },
          { label: "COMPLETED", value: missions.filter(m => m.status === "COMPLETED").length, icon: "✓", color: "green" },
          { label: "TOTAL PERSONNEL", value: resources[0].deployed, icon: "◇", color: "cyan" },
        ].map((stat, index) => (
          <div key={stat.label} className={`glass glow-border rounded-lg p-4 hover-lift card-shine fade-in-up`} style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs tracking-wider">{stat.label}</p>
                <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className={`w-10 h-10 glass rounded-lg flex items-center justify-center text-${stat.color}-400 text-xl float`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Mission List */}
        <div className="col-span-5">
          <div className="glass glow-border rounded-lg overflow-hidden fade-in-left" style={{ animationDelay: '0.2s' }}>
            <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30">
              <span className="text-xs text-red-400 tracking-widest">◈ ACTIVE MISSIONS</span>
            </div>
            <div className="p-3 space-y-2 max-h-[500px] overflow-auto">
              {missions.map((mission, index) => (
                <div
                  key={mission.id}
                  onClick={() => setSelectedMission(mission.id)}
                  className={`glass p-3 rounded cursor-pointer transition-all border hover-lift card-shine fade-in-left ${
                    selectedMission === mission.id
                      ? "border-cyan-500/50 glow-border-cyan"
                      : "border-transparent hover:border-red-500/30"
                  }`}
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-xs text-gray-500 font-mono">{mission.id}</span>
                      <h4 className="text-white font-bold text-sm tracking-wider hover-glow">{mission.codename}</h4>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded animate-pulse ${
                        mission.status === "ACTIVE"
                          ? "bg-green-500/20 text-green-400"
                          : mission.status === "REVIEW"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-cyan-500/20 text-cyan-400"
                      }`}
                    >
                      {mission.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{mission.location}</span>
                    <span>•</span>
                    <span>{mission.team} OPERATORS</span>
                  </div>
                  <div className="mt-2">
                    <div className="h-1 bg-gray-800 rounded overflow-hidden">
                      <div
                        className={`h-full ${mission.progress === 100 ? "bg-green-500" : "bg-gradient-to-r from-red-500 to-orange-500"} progress-glow energy-bar`}
                        style={{ width: `${mission.progress}%`, transition: 'width 1s ease-out' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission Details */}
        <div className="col-span-7">
          {activeMission ? (
            <div className="glass glow-border rounded-lg overflow-hidden">
              <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-red-400 tracking-widest">◈ MISSION BRIEFING</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    activeMission.priority === "CRITICAL" ? "bg-red-500/20 text-red-400" :
                    activeMission.priority === "HIGH" ? "bg-orange-500/20 text-orange-400" :
                    activeMission.priority === "MEDIUM" ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-green-500/20 text-green-400"
                  }`}>
                    {activeMission.priority} PRIORITY
                  </span>
                </div>
                <span className="text-xs text-gray-500 font-mono">{activeMission.id}</span>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white tracking-wider mb-1">{activeMission.codename}</h2>
                    <p className="text-sm text-gray-400">{activeMission.description}</p>
                  </div>
                </div>

                {/* Mission Stats */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                  <div className="glass p-3 rounded text-center">
                    <p className="text-xs text-gray-500">LOCATION</p>
                    <p className="text-sm text-cyan-400 font-mono mt-1">{activeMission.location}</p>
                  </div>
                  <div className="glass p-3 rounded text-center">
                    <p className="text-xs text-gray-500">COMMANDER</p>
                    <p className="text-sm text-white font-mono mt-1">{activeMission.commander}</p>
                  </div>
                  <div className="glass p-3 rounded text-center">
                    <p className="text-xs text-gray-500">TEAM SIZE</p>
                    <p className="text-sm text-cyan-400 font-mono mt-1">{activeMission.team} OPERATORS</p>
                  </div>
                  <div className="glass p-3 rounded text-center">
                    <p className="text-xs text-gray-500">ETA</p>
                    <p className="text-sm text-orange-400 font-mono mt-1">{activeMission.eta}</p>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">MISSION PROGRESS</span>
                    <span className={`text-lg font-bold ${activeMission.progress === 100 ? "text-green-400" : "text-cyan-400"}`}>
                      {activeMission.progress}%
                    </span>
                  </div>
                  <div className="h-3 bg-gray-800 rounded overflow-hidden">
                    <div
                      className={`h-full ${activeMission.progress === 100 ? "bg-gradient-to-r from-green-500 to-emerald-400" : "bg-gradient-to-r from-red-500 to-orange-500"} progress-glow transition-all duration-500`}
                      style={{ width: `${activeMission.progress}%` }}
                    />
                  </div>
                </div>

                {/* Objectives */}
                <div>
                  <h3 className="text-sm text-cyan-400 tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-4 h-px bg-cyan-400" />
                    MISSION OBJECTIVES
                  </h3>
                  <div className="space-y-2">
                    {activeMission.objectives.map((obj) => (
                      <div key={obj.id} className="glass p-3 rounded flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded flex items-center justify-center text-xs ${
                            obj.status === "COMPLETED" ? "bg-green-500/20 text-green-400" :
                            obj.status === "IN PROGRESS" ? "bg-cyan-500/20 text-cyan-400" :
                            "bg-gray-500/20 text-gray-400"
                          }`}>
                            {obj.status === "COMPLETED" ? "✓" : obj.id}
                          </div>
                          <span className="text-sm text-gray-300">{obj.name}</span>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          obj.status === "COMPLETED" ? "bg-green-500/20 text-green-400" :
                          obj.status === "IN PROGRESS" ? "bg-cyan-500/20 text-cyan-400" :
                          "bg-gray-500/20 text-gray-400"
                        }`}>
                          {obj.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass glow-border rounded-lg h-full flex items-center justify-center">
              <p className="text-gray-500">Select a mission to view details</p>
            </div>
          )}
        </div>

        {/* Resource Allocation */}
        <div className="col-span-12">
          <div className="glass glow-border rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30">
              <span className="text-xs text-red-400 tracking-widest">◈ RESOURCE ALLOCATION</span>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-4 gap-4">
                {resources.map((resource) => (
                  <div key={resource.name} className="glass p-4 rounded">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-white tracking-wider">{resource.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        resource.status === "OPTIMAL" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                      }`}>
                        {resource.status}
                      </span>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs text-gray-500">AVAILABLE</p>
                        <p className="text-xl font-bold text-cyan-400">{resource.available.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">DEPLOYED</p>
                        <p className="text-xl font-bold text-orange-400">{resource.deployed.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="h-2 bg-gray-800 rounded overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 progress-glow"
                          style={{ width: `${(resource.deployed / resource.available) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-600 mt-1 text-right">
                        {Math.round((resource.deployed / resource.available) * 100)}% UTILIZATION
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
