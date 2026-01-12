"use client";
import { useState, useEffect } from "react";

interface PersonnelProps {
  employeeData: {
    id: string;
    name: string;
    designation: string;
    department: string;
    clearanceLevel: string;
    status: string;
    bloodType: string;
    dob: string;
    height: string;
    weight: string;
    eyeColor: string;
    hairColor: string;
    nationality: string;
    joinDate: string;
    lastActive: string;
    biometricId: string;
    skills: Array<{ name: string; level: number }>;
    certifications: string[];
    projects: Array<{
      id: string;
      name: string;
      status: string;
      progress: number;
      priority: string;
      deadline: string;
      team: number;
      description: string;
    }>;
    serviceRecord: Array<{ year: string; event: string }>;
  };
}

export default function Personnel({ employeeData }: PersonnelProps) {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"profile" | "projects" | "history">("profile");
  const [scanEffect, setScanEffect] = useState(false);
  const [skillAnimations, setSkillAnimations] = useState<number[]>(employeeData.skills.map(() => 0));

  useEffect(() => {
    // Trigger scan effect periodically
    const scanTimer = setInterval(() => {
      setScanEffect(true);
      setTimeout(() => setScanEffect(false), 2000);
    }, 8000);

    // Animate skill bars
    setTimeout(() => {
      setSkillAnimations(employeeData.skills.map(s => s.level));
    }, 500);

    return () => clearInterval(scanTimer);
  }, [employeeData.skills]);

  // Team member data for projects
  const teamMembers = {
    "PRJ-001": [
      {
        id: "EMP-2026-0456",
        name: "LT. MARCUS REED",
        designation: "TACTICAL SPECIALIST",
        avatar: "◉",
        status: "ACTIVE",
        role: "Team Lead"
      },
      {
        id: "EMP-2026-0789",
        name: "SGT. LENA CHEN",
        designation: "COMMS OPERATOR",
        avatar: "□",
        status: "ACTIVE",
        role: "Communications"
      },
      {
        id: "EMP-2026-0321",
        name: "CPL. DAVID KIM",
        designation: "WEAPONS SPECIALIST",
        avatar: "△",
        status: "INJURED",
        role: "Weapons"
      }
    ],
    "PRJ-002": [
      {
        id: "EMP-2026-0654",
        name: "DR. AMANDA ROSS",
        designation: "SYSTEMS ENGINEER",
        avatar: "◇",
        status: "ACTIVE",
        role: "Lead Engineer"
      },
      {
        id: "EMP-2026-0912",
        name: "MAJ. VIKTOR VOLKOV",
        designation: "SECURITY ANALYST",
        avatar: "⬡",
        status: "ACTIVE",
        role: "Security"
      }
    ],
    "PRJ-003": [
      {
        id: "EMP-2026-0543",
        name: "CAPT. SARAH MITCHELL",
        designation: "SENIOR TACTICAL OPS",
        avatar: "◈",
        status: "ACTIVE",
        role: "Project Lead"
      }
    ],
    "PRJ-004": [
      {
        id: "EMP-2026-0765",
        name: "LT. JAMES HARPER",
        designation: "TRAINING OFFICER",
        avatar: "○",
        status: "ACTIVE",
        role: "Instructor"
      }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="glass rounded-lg p-1 flex gap-1 fade-in-down">
        {[
          { id: "profile", label: "PERSONNEL PROFILE", icon: "◉" },
          { id: "projects", label: "ASSIGNMENTS", icon: "◇" },
          { id: "history", label: "SERVICE HISTORY", icon: "△" },
        ].map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex-1 py-3 px-4 rounded text-sm tracking-wider transition-all cyber-btn ${
              activeTab === tab.id
                ? "glass glow-border text-red-400"
                : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span className={`mr-2 ${activeTab === tab.id ? 'animate-pulse-glow' : ''}`}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="grid grid-cols-12 gap-6">
          {/* Employee Photo ID Card */}
          <div className="col-span-4">
            <div className="glass glow-border rounded-lg overflow-hidden corner-accent fade-in-left">
              <div className="bg-gradient-to-r from-red-900/50 to-red-800/30 px-4 py-3 border-b border-red-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-red-400 tracking-widest">◈ PERSONNEL FILE</span>
                  <span className="text-xs text-green-400 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse-glow" />
                    VERIFIED
                  </span>
                </div>
              </div>

              <div className="p-6">
                {/* Photo Frame */}
                <div className="relative mb-6">
                  <div className={`aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 rounded border-2 border-red-500/50 overflow-hidden relative ${scanEffect ? 'animate-pulse' : ''}`}>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/10 to-transparent animate-[scan-line_3s_linear_infinite]" />
                    <svg className="w-full h-full text-gray-700" viewBox="0 0 100 133" fill="currentColor">
                      <rect width="100" height="133" fill="#1a1a2e" />
                      <circle cx="50" cy="40" r="25" fill="#2d2d44" />
                      <ellipse cx="50" cy="100" rx="35" ry="30" fill="#2d2d44" />
                      <text x="50" y="125" textAnchor="middle" fill="#ff3333" fontSize="6" fontFamily="monospace" className="animate-pulse">CLASSIFIED</text>
                    </svg>
                    <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-cyan-400 animate-pulse" />
                    <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-cyan-400 animate-pulse" style={{ animationDelay: '0.25s' }} />
                    <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-cyan-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
                    <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-cyan-400 animate-pulse" style={{ animationDelay: '0.75s' }} />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 glass px-4 py-1 rounded border border-red-500/50">
                    <span className="text-xs text-red-400 font-mono">{employeeData.id}</span>
                  </div>
                </div>

                {/* Name & Designation */}
                <div className="text-center mb-6">
                  <h2 className="text-lg text-white font-bold tracking-wider mb-1 hover-glow">{employeeData.name}</h2>
                  <p className="text-xs text-cyan-400 tracking-wider neon-text-cyan">{employeeData.designation}</p>
                  <p className="text-xs text-gray-500 mt-1">{employeeData.department}</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="glass p-3 rounded text-center hover-lift holographic">
                    <p className="text-xs text-gray-500">CLEARANCE</p>
                    <p className="text-sm text-red-400 font-bold neon-text-red">{employeeData.clearanceLevel}</p>
                  </div>
                  <div className="glass p-3 rounded text-center hover-lift holographic">
                    <p className="text-xs text-gray-500">STATUS</p>
                    <p className="text-sm text-green-400 font-bold">{employeeData.status}</p>
                  </div>
                </div>

                {/* Biometric ID */}
                <div className="glass p-3 rounded border border-cyan-500/30 mb-4 hover-lift">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">BIOMETRIC ID</span>
                    <span className="text-xs text-cyan-400 font-mono animate-pulse">{employeeData.biometricId}</span>
                  </div>
                </div>

                {/* Last Active */}
                <div className="text-center">
                  <p className="text-xs text-gray-600">LAST ACTIVE</p>
                  <p className="text-xs text-orange-400 font-mono">{employeeData.lastActive}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="col-span-8">
            <div className="glass glow-border rounded-lg overflow-hidden h-full fade-in-right card-shine">
              <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30">
                <span className="text-xs text-red-400 tracking-widest">◈ PERSONNEL DATA MATRIX</span>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  {/* Physical Profile */}
                  <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <h3 className="text-sm text-cyan-400 tracking-widest mb-4 flex items-center gap-2 neon-text-cyan">
                      <span className="w-4 h-px bg-cyan-400 animate-pulse" />
                      PHYSICAL PROFILE
                    </h3>
                    <div className="space-y-3">
                      {[
                        { label: "DATE OF BIRTH", value: employeeData.dob },
                        { label: "HEIGHT", value: employeeData.height },
                        { label: "WEIGHT", value: employeeData.weight },
                        { label: "EYE COLOR", value: employeeData.eyeColor },
                        { label: "HAIR COLOR", value: employeeData.hairColor },
                        { label: "BLOOD TYPE", value: employeeData.bloodType },
                      ].map((item, idx) => (
                        <div key={item.label} className="flex justify-between items-center text-sm hover:bg-white/5 p-1 rounded transition-all" style={{ animationDelay: `${idx * 0.05}s` }}>
                          <span className="text-gray-500 data-line">{item.label}</span>
                          <span className="text-white font-mono hover-glow">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Service Information */}
                  <div className="fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <h3 className="text-sm text-cyan-400 tracking-widest mb-4 flex items-center gap-2 neon-text-cyan">
                      <span className="w-4 h-px bg-cyan-400 animate-pulse" />
                      SERVICE RECORD
                    </h3>
                    <div className="space-y-3">
                      {[
                        { label: "NATIONALITY", value: employeeData.nationality },
                        { label: "JOIN DATE", value: employeeData.joinDate },
                        { label: "SERVICE YEARS", value: "10 YEARS" },
                        { label: "RANK", value: "COMMANDER" },
                        { label: "UNIT", value: "ALPHA-7" },
                        { label: "MISSIONS", value: "147 COMPLETED" },
                      ].map((item, idx) => (
                        <div key={item.label} className="flex justify-between items-center text-sm hover:bg-white/5 p-1 rounded transition-all" style={{ animationDelay: `${idx * 0.05}s` }}>
                          <span className="text-gray-500 data-line">{item.label}</span>
                          <span className="text-white font-mono hover-glow">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Skills Assessment */}
                <div className="mt-8 fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <h3 className="text-sm text-cyan-400 tracking-widest mb-4 flex items-center gap-2 neon-text-cyan">
                    <span className="w-4 h-px bg-cyan-400 animate-pulse" />
                    SKILLS ASSESSMENT
                  </h3>
                  <div className="grid grid-cols-5 gap-4">
                    {employeeData.skills.map((skill, index) => (
                      <div key={skill.name} className="glass p-3 rounded text-center hover-lift holographic" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="relative w-16 h-16 mx-auto mb-2">
                          <svg className="w-full h-full -rotate-90">
                            <circle cx="32" cy="32" r="28" fill="none" stroke="#1f1f2e" strokeWidth="4" />
                            <circle
                              cx="32"
                              cy="32"
                              r="28"
                              fill="none"
                              stroke={skill.level >= 90 ? "#00ffff" : "#ff3333"}
                              strokeWidth="4"
                              strokeDasharray={`${(skillAnimations[index] / 100) * 176} 176`}
                              className="progress-glow transition-all duration-1000"
                              style={{ filter: `drop-shadow(0 0 6px ${skill.level >= 90 ? "#00ffff" : "#ff3333"})` }}
                            />
                          </svg>
                          <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
                            {skillAnimations[index]}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 truncate">{skill.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="mt-6 fade-in-up" style={{ animationDelay: '0.5s' }}>
                  <h3 className="text-sm text-cyan-400 tracking-widest mb-3 flex items-center gap-2 neon-text-cyan">
                    <span className="w-4 h-px bg-cyan-400 animate-pulse" />
                    CERTIFICATIONS
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {employeeData.certifications.map((cert, idx) => (
                      <span
                        key={cert}
                        className="glass-cyan px-3 py-1 rounded text-xs text-cyan-400 border border-cyan-500/30 hover-scale cyber-btn"
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      >
                        ✓ {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Projects Tab */}
      {activeTab === "projects" && (
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8">
            <div className="glass glow-border rounded-lg overflow-hidden fade-in-left card-shine">
              <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30 flex items-center justify-between">
                <span className="text-xs text-red-400 tracking-widest">◈ ACTIVE PROJECTS & ASSIGNMENTS</span>
                <span className="text-xs text-gray-500 animate-pulse">{employeeData.projects.length} TOTAL</span>
              </div>

              <div className="p-4">
                <div className="space-y-3">
                  {employeeData.projects.map((project, idx) => (
                    <div
                      key={project.id}
                      className={`glass p-4 rounded cursor-pointer transition-all duration-300 border hover-lift ${
                        selectedProject === project.id
                          ? "border-cyan-500/50 glow-border-cyan holographic"
                          : "border-transparent hover:border-red-500/30"
                      }`}
                      onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-xs text-gray-500 font-mono">{project.id}</span>
                            <span
                              className={`text-xs px-2 py-0.5 rounded animate-pulse ${
                                project.priority === "CRITICAL"
                                  ? "bg-red-500/20 text-red-400"
                                  : project.priority === "HIGH"
                                  ? "bg-orange-500/20 text-orange-400"
                                  : project.priority === "MEDIUM"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-green-500/20 text-green-400"
                              }`}
                            >
                              {project.priority}
                            </span>
                          </div>
                          <h4 className="text-white font-bold tracking-wider hover-glow">{project.name}</h4>
                        </div>
                        <span
                          className={`text-xs px-3 py-1 rounded ${
                            project.status === "COMPLETED"
                              ? "bg-green-500/20 text-green-400 border border-green-500/30"
                              : project.status === "IN PROGRESS"
                              ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 animate-pulse"
                              : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>

                      <div className="mb-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-500">PROGRESS</span>
                          <span className={project.progress === 100 ? "text-green-400" : "text-cyan-400"}>
                            {project.progress}%
                          </span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded overflow-hidden">
                          <div
                            className={`h-full transition-all duration-1000 energy-bar ${
                              project.progress === 100
                                ? "bg-gradient-to-r from-green-500 to-green-400"
                                : "bg-gradient-to-r from-red-500 to-orange-500"
                            } progress-glow`}
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>

                      {selectedProject === project.id && (
                        <div className="mt-4 pt-4 border-t border-red-500/20 fade-in-up">
                          <p className="text-sm text-gray-400 mb-3">{project.description}</p>
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="glass p-2 rounded text-center hover-lift">
                              <p className="text-xs text-gray-500">DEADLINE</p>
                              <p className="text-sm text-orange-400 font-mono neon-text-orange">{project.deadline}</p>
                            </div>
                            <div className="glass p-2 rounded text-center hover-lift">
                              <p className="text-xs text-gray-500">TEAM SIZE</p>
                              <p className="text-sm text-cyan-400 font-mono neon-text-cyan">{project.team} MEMBERS</p>
                            </div>
                            <div className="glass p-2 rounded text-center hover-lift">
                              <p className="text-xs text-gray-500">DAYS LEFT</p>
                              <p className="text-sm text-red-400 font-mono neon-text-red">
                                {Math.max(0, Math.ceil((new Date(project.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))}
                              </p>
                            </div>
                          </div>

                          {/* Team Members */}
                          {teamMembers[project.id] && (
                            <div className="mt-4 fade-in-up">
                              <h5 className="text-xs text-cyan-400 tracking-widest mb-3 flex items-center gap-2 neon-text-cyan">
                                <span className="w-4 h-px bg-cyan-400 animate-pulse" />
                                TEAM MEMBERS
                              </h5>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {teamMembers[project.id].map((member, memberIdx) => (
                                  <div key={member.id} className="glass glow-border rounded-lg p-4 hover:border-cyan-500/30 transition-all hover-lift holographic" style={{ animationDelay: `${memberIdx * 0.1}s` }}>
                                    <div className="flex items-start gap-3">
                                      <div className="w-12 h-12 glass rounded-lg flex items-center justify-center text-red-400 text-xl flex-shrink-0 float">
                                        {member.avatar}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                          <span className="text-xs text-gray-500 font-mono">{member.id}</span>
                                          <span className={`w-2 h-2 rounded-full ${
                                            member.status === "ACTIVE" ? "bg-green-500" : "bg-red-500"
                                          } animate-pulse-glow`} />
                                        </div>
                                        <h6 className="text-sm text-white font-bold tracking-wider truncate hover-glow">{member.name}</h6>
                                        <p className="text-xs text-cyan-400 truncate">{member.designation}</p>
                                        <p className="text-xs text-gray-500 mt-1">{member.role}</p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Project Stats Sidebar */}
          <div className="col-span-4 space-y-6 fade-in-right">
            <div className="glass glow-border rounded-lg overflow-hidden card-shine">
              <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30">
                <span className="text-xs text-red-400 tracking-widest">◈ PROJECT STATISTICS</span>
              </div>
              <div className="p-4 grid grid-cols-2 gap-3">
                <div className="glass p-3 rounded text-center hover-lift holographic">
                  <p className="text-2xl font-bold text-cyan-400 neon-text-cyan">
                    {employeeData.projects.filter(p => p.status === "IN PROGRESS").length}
                  </p>
                  <p className="text-xs text-gray-500">IN PROGRESS</p>
                </div>
                <div className="glass p-3 rounded text-center hover-lift holographic">
                  <p className="text-2xl font-bold text-green-400">
                    {employeeData.projects.filter(p => p.status === "COMPLETED").length}
                  </p>
                  <p className="text-xs text-gray-500">COMPLETED</p>
                </div>
                <div className="glass p-3 rounded text-center hover-lift holographic">
                  <p className="text-2xl font-bold text-yellow-400">
                    {employeeData.projects.filter(p => p.status === "PENDING REVIEW").length}
                  </p>
                  <p className="text-xs text-gray-500">PENDING</p>
                </div>
                <div className="glass p-3 rounded text-center hover-lift holographic">
                  <p className="text-2xl font-bold text-red-400 neon-text-red animate-pulse">
                    {employeeData.projects.filter(p => p.priority === "CRITICAL").length}
                  </p>
                  <p className="text-xs text-gray-500">CRITICAL</p>
                </div>
              </div>
            </div>

            <div className="glass glow-border rounded-lg overflow-hidden hover-lift card-shine" style={{ animationDelay: '0.2s' }}>
              <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30">
                <span className="text-xs text-red-400 tracking-widest">◈ PERFORMANCE METRICS</span>
              </div>
              <div className="p-4 space-y-4">
                {[
                  { label: "COMPLETION RATE", value: 94, color: "cyan" },
                  { label: "ON-TIME DELIVERY", value: 87, color: "green" },
                  { label: "TEAM COLLABORATION", value: 92, color: "cyan" },
                ].map((metric, idx) => (
                  <div key={metric.label} className="fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">{metric.label}</span>
                      <span className={`text-${metric.color}-400 neon-text-cyan`}>{metric.value}%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${
                          metric.color === "cyan" ? "from-cyan-500 to-blue-500" : "from-green-500 to-emerald-500"
                        } progress-glow energy-bar`}
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Overview */}
            <div className="glass glow-border rounded-lg overflow-hidden hover-lift card-shine" style={{ animationDelay: '0.3s' }}>
              <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30">
                <span className="text-xs text-red-400 tracking-widest">◈ TEAM OVERVIEW</span>
              </div>
              <div className="p-4">
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {Object.entries(teamMembers).map(([projectId, members], idx) => (
                    <div key={projectId} className="glass p-3 rounded hover-lift holographic" style={{ animationDelay: `${idx * 0.1}s` }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-cyan-400 font-mono neon-text-cyan">{projectId}</span>
                        <span className="text-xs text-gray-500">{members.length} members</span>
                      </div>
                      <div className="space-y-2">
                        {members.slice(0, 2).map((member) => (
                          <div key={member.id} className="flex items-center gap-2 hover:bg-white/5 p-1 rounded transition-all">
                            <span className="text-lg float">{member.avatar}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-white truncate hover-glow">{member.name.split(' ').slice(-1)[0]}</p>
                              <p className="text-xs text-gray-500 truncate">{member.role}</p>
                            </div>
                            <span className={`w-2 h-2 rounded-full ${
                              member.status === "ACTIVE" ? "bg-green-500" : "bg-red-500"
                            } animate-pulse-glow`} />
                          </div>
                        ))}
                        {members.length > 2 && (
                          <p className="text-xs text-gray-600">+{members.length - 2} more</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === "history" && (
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-6 fade-in-left">
            <div className="glass glow-border rounded-lg overflow-hidden card-shine">
              <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30">
                <span className="text-xs text-red-400 tracking-widest">◈ SERVICE TIMELINE</span>
              </div>
              <div className="p-4">
                <div className="relative">
                  <div className="absolute left-2 top-0 bottom-0 w-px bg-gradient-to-b from-red-500 via-cyan-500 to-red-500 animate-pulse" />
                  <div className="space-y-4">
                    {employeeData.serviceRecord.map((record, index) => (
                      <div key={index} className="flex items-start gap-4 pl-6 relative fade-in-up" style={{ animationDelay: `${index * 0.15}s` }}>
                        <div className="absolute left-0 w-4 h-4 rounded-full bg-gray-900 border-2 border-red-500 flex items-center justify-center pulse-ring">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        </div>
                        <div className="glass p-3 rounded flex-1 hover-lift holographic">
                          <span className="text-xs text-cyan-400 font-mono neon-text-cyan">{record.year}</span>
                          <p className="text-sm text-gray-300 mt-1">{record.event}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-6 fade-in-right space-y-6">
            <div className="glass glow-border rounded-lg overflow-hidden card-shine">
              <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30">
                <span className="text-xs text-red-400 tracking-widest">◈ CAREER METRICS</span>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "EFFICIENCY", value: "94.7", unit: "%" },
                    { label: "RELIABILITY", value: "98.2", unit: "%" },
                    { label: "RESPONSE", value: "1.2", unit: "SEC" },
                    { label: "ACCURACY", value: "96.5", unit: "%" },
                  ].map((metric, idx) => (
                    <div key={metric.label} className="glass p-3 rounded text-center hover-lift holographic" style={{ animationDelay: `${idx * 0.1}s` }}>
                      <p className="text-2xl font-bold text-cyan-400 neon-text-cyan">{metric.value}</p>
                      <p className="text-xs text-gray-500">
                        {metric.unit} <span className="text-gray-600">• {metric.label}</span>
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 glass p-3 rounded holographic">
                  <p className="text-xs text-gray-500 mb-2">ACTIVITY MONITOR</p>
                  <div className="flex items-end gap-1 h-16">
                    {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-red-500 to-orange-500 rounded-t opacity-80 progress-glow energy-bar"
                        style={{ height: `${height}%`, animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mt-2">
                    <span>JAN</span>
                    <span>DEC</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass glow-border rounded-lg overflow-hidden card-shine">
              <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30">
                <span className="text-xs text-red-400 tracking-widest">◈ COMMENDATIONS</span>
              </div>
              <div className="p-4 space-y-3">
                {[
                  { title: "Medal of Distinction", date: "2023", type: "gold" },
                  { title: "Excellence in Leadership", date: "2022", type: "silver" },
                  { title: "Outstanding Service Award", date: "2021", type: "bronze" },
                ].map((award, index) => (
                  <div key={index} className="glass p-3 rounded flex items-center gap-3 hover-lift holographic" style={{ animationDelay: `${index * 0.15}s` }}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center float ${
                      award.type === "gold" ? "bg-yellow-500/20 text-yellow-400" :
                      award.type === "silver" ? "bg-gray-400/20 text-gray-300" :
                      "bg-orange-700/20 text-orange-400"
                    }`}>
                      ★
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white hover-glow">{award.title}</p>
                      <p className="text-xs text-gray-500">{award.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
