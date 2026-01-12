"use client";
import { useState, useEffect } from "react";

interface DashboardProps {
  employeeData: {
    name: string;
    designation: string;
    clearanceLevel: string;
    projects: Array<{
      id: string;
      name: string;
      status: string;
      progress: number;
      priority: string;
    }>;
  };
}

const quickStats = [
  { label: "ACTIVE PERSONNEL", value: "2,847", change: "+12", icon: "◉" },
  { label: "ACTIVE OPERATIONS", value: "47", change: "+3", icon: "◇" },
  { label: "SYSTEM UPTIME", value: "99.97%", change: "+0.02", icon: "△" },
  { label: "THREAT LEVEL", value: "LOW", change: "STABLE", icon: "⬡" },
];

const recentActivity = [
  { time: "14:32:07", event: "Personnel file accessed - EMP-2026-0847", type: "info" },
  { time: "14:28:15", event: "Security scan completed - All clear", type: "success" },
  { time: "14:15:33", event: "Operation NIGHTFALL status update received", type: "warning" },
  { time: "13:58:42", event: "New communication from Command HQ", type: "info" },
  { time: "13:45:00", event: "System backup completed successfully", type: "success" },
  { time: "13:30:22", event: "Anomaly detected in Sector 7 - Resolved", type: "warning" },
];

const alerts = [
  { severity: "HIGH", message: "Operation PHOENIX requires immediate attention", time: "10 MIN AGO" },
  { severity: "MEDIUM", message: "Database synchronization at 87%", time: "25 MIN AGO" },
  { severity: "LOW", message: "Scheduled maintenance in 6 hours", time: "1 HR AGO" },
];

export default function Dashboard({ employeeData }: DashboardProps) {
  const [sessionTime, setSessionTime] = useState(0);
  const [animatedStats, setAnimatedStats] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    const timer = setInterval(() => setSessionTime(prev => prev + 1), 1000);
    
    // Animate stat counters
    const targetValues = [2847, 47, 99.97, 0];
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    
    let currentStep = 0;
    const animationTimer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      setAnimatedStats(targetValues.map((target, i) => 
        i === 3 ? 0 : Math.floor(target * Math.min(progress, 1))
      ));
      if (currentStep >= steps) clearInterval(animationTimer);
    }, stepTime);
    
    return () => {
      clearInterval(timer);
      clearInterval(animationTimer);
    };
  }, []);

  const formatSessionTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="glass glow-border rounded-lg p-6 fade-in-up corner-accent holographic">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm tracking-widest mb-1">WELCOME BACK</p>
            <h1 className="text-2xl font-bold text-white tracking-wider hover-glow">{employeeData.name}</h1>
            <p className="text-cyan-400 text-sm mt-1 neon-text-cyan">{employeeData.designation}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-xs">CURRENT SESSION</p>
            <p className="text-xl font-mono text-red-400 neon-text-red">{formatSessionTime(sessionTime)}</p>
            <p className="text-gray-600 text-xs mt-1">CLEARANCE: {employeeData.clearanceLevel}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <div 
            key={stat.label} 
            className={`glass glow-border rounded-lg p-4 hover-lift card-shine fade-in-up`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-xs tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {index === 0 ? animatedStats[0].toLocaleString() :
                   index === 1 ? animatedStats[1] :
                   index === 2 ? `${(animatedStats[2] / 100 * 100).toFixed(2)}%` :
                   stat.value}
                </p>
                <p className="text-green-400 text-xs mt-1">{stat.change}</p>
              </div>
              <div className="w-10 h-10 glass rounded-lg flex items-center justify-center text-red-400 text-xl float">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Active Operations Overview */}
        <div className="col-span-8">
          <div className="glass glow-border rounded-lg overflow-hidden fade-in-left" style={{ animationDelay: '0.2s' }}>
            <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30">
              <div className="flex items-center justify-between">
                <span className="text-xs text-red-400 tracking-widest">◈ ACTIVE OPERATIONS OVERVIEW</span>
                <span className="text-xs text-gray-500">{employeeData.projects.length} ASSIGNMENTS</span>
              </div>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                {employeeData.projects.slice(0, 4).map((project, index) => (
                  <div 
                    key={project.id} 
                    className={`glass p-4 rounded-lg border border-transparent hover:border-red-500/30 transition-all hover-lift card-shine fade-in-up`}
                    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500 font-mono">{project.id}</span>
                      <span className={`text-xs px-2 py-0.5 rounded animate-pulse ${
                        project.priority === "CRITICAL" ? "bg-red-500/20 text-red-400" :
                        project.priority === "HIGH" ? "bg-orange-500/20 text-orange-400" :
                        project.priority === "MEDIUM" ? "bg-yellow-500/20 text-yellow-400" :
                        "bg-green-500/20 text-green-400"
                      }`}>
                        {project.priority}
                      </span>
                    </div>
                    <h4 className="text-white font-bold text-sm tracking-wider mb-3 hover-glow">{project.name}</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Progress</span>
                        <span className={project.progress === 100 ? "text-green-400" : "text-cyan-400"}>{project.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-800 rounded overflow-hidden">
                        <div
                          className={`h-full ${project.progress === 100 ? "bg-green-500" : "bg-gradient-to-r from-red-500 to-orange-500"} progress-glow energy-bar`}
                          style={{ width: `${project.progress}%`, transition: 'width 1s ease-out' }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Alerts Panel */}
        <div className="col-span-4">
          <div className="glass glow-border rounded-lg overflow-hidden h-full fade-in-right" style={{ animationDelay: '0.2s' }}>
            <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30">
              <div className="flex items-center justify-between">
                <span className="text-xs text-red-400 tracking-widest">◈ PRIORITY ALERTS</span>
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse-glow" />
              </div>
            </div>
            <div className="p-4 space-y-3">
              {alerts.map((alert, index) => (
                <div 
                  key={index} 
                  className={`glass p-3 rounded border-l-2 hover-lift fade-in-right ${
                    alert.severity === "HIGH" ? "border-red-500" :
                    alert.severity === "MEDIUM" ? "border-yellow-500" :
                    "border-green-500"
                  }`}
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-bold animate-pulse ${
                      alert.severity === "HIGH" ? "text-red-400" :
                      alert.severity === "MEDIUM" ? "text-yellow-400" :
                      "text-green-400"
                    }`}>{alert.severity}</span>
                    <span className="text-xs text-gray-600">{alert.time}</span>
                  </div>
                  <p className="text-sm text-gray-300">{alert.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-span-6">
          <div className="glass glow-border rounded-lg overflow-hidden fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30">
              <span className="text-xs text-red-400 tracking-widest">◈ RECENT ACTIVITY LOG</span>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                {recentActivity.map((activity, index) => (
                  <div 
                    key={index} 
                    className={`flex items-start gap-3 p-2 rounded hover:bg-white/5 transition-colors hover-lift fade-in-left`}
                    style={{ animationDelay: `${0.5 + index * 0.05}s` }}
                  >
                    <span className={`w-2 h-2 rounded-full mt-1.5 animate-pulse ${
                      activity.type === "success" ? "bg-green-500" :
                      activity.type === "warning" ? "bg-yellow-500" :
                      "bg-cyan-500"
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm text-gray-300">{activity.event}</p>
                    </div>
                    <span className="text-xs text-gray-600 font-mono">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="col-span-6">
          <div className="glass glow-border rounded-lg overflow-hidden fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30">
              <span className="text-xs text-red-400 tracking-widest">◈ SYSTEM HEALTH MONITOR</span>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "CPU LOAD", value: 42, max: 100 },
                  { name: "MEMORY", value: 68, max: 100 },
                  { name: "STORAGE", value: 54, max: 100 },
                  { name: "BANDWIDTH", value: 23, max: 100 },
                ].map((metric, index) => (
                  <div key={metric.name} className={`glass p-3 rounded hover-lift fade-in-up`} style={{ animationDelay: `${0.5 + index * 0.1}s` }}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-gray-500">{metric.name}</span>
                      <span className={`text-sm font-mono ${metric.value > 80 ? "text-red-400 animate-pulse" : "text-cyan-400"}`}>
                        {metric.value}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded overflow-hidden">
                      <div
                        className={`h-full ${metric.value > 80 ? "bg-red-500" : "bg-gradient-to-r from-cyan-500 to-blue-500"} progress-glow energy-bar`}
                        style={{ width: `${metric.value}%`, transition: 'width 1s ease-out' }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Network Activity Graph */}
              <div className="mt-4 p-3 glass rounded fade-in-up" style={{ animationDelay: '0.7s' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500">NETWORK TRAFFIC</span>
                  <span className="text-xs text-cyan-400 animate-pulse">2.4 GB/s</span>
                </div>
                <div className="flex items-end gap-0.5 h-12">
                  {[45, 62, 38, 75, 52, 68, 42, 85, 55, 72, 48, 78, 58, 65, 40, 88, 50, 70, 45, 82, 55, 68, 42, 75, 60, 72, 48, 85, 52, 78].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-cyan-500/80 to-cyan-400/40 rounded-t transition-all duration-300 hover:from-cyan-400 hover:to-cyan-300"
                      style={{ 
                        height: `${height}%`,
                        animation: `pulse ${1 + Math.random()}s ease-in-out infinite`,
                        animationDelay: `${i * 0.05}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Personnel */}
      <div className="glass glow-border rounded-lg overflow-hidden fade-in-up" style={{ animationDelay: '0.6s' }}>
        <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30">
          <span className="text-xs text-red-400 tracking-widest">◈ KEY PERSONNEL</span>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                id: "EMP-2026-0847",
                name: "COMMANDER SARAH J. MITCHELL",
                designation: "SENIOR TACTICAL OPS",
                avatar: "◈",
                status: "ACTIVE",
                clearance: "OMEGA-7"
              },
              {
                id: "EMP-2026-0456",
                name: "LT. MARCUS REED",
                designation: "TACTICAL SPECIALIST",
                avatar: "◉",
                status: "ACTIVE",
                clearance: "DELTA-5"
              },
              {
                id: "EMP-2026-0654",
                name: "DR. AMANDA ROSS",
                designation: "SYSTEMS ENGINEER",
                avatar: "◇",
                status: "ACTIVE",
                clearance: "GAMMA-3"
              },
              {
                id: "EMP-2026-0765",
                name: "CAPT. JAMES HARPER",
                designation: "TRAINING OFFICER",
                avatar: "○",
                status: "ACTIVE",
                clearance: "BETA-4"
              }
            ].map((person, index) => (
              <div 
                key={person.id} 
                className={`glass glow-border rounded-lg p-4 hover:border-cyan-500/30 transition-all hover-lift card-shine fade-in-up`}
                style={{ animationDelay: `${0.7 + index * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 glass rounded-lg flex items-center justify-center text-red-400 text-xl float pulse-ring">
                    {person.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-500 font-mono">{person.id}</span>
                      <span className={`w-2 h-2 rounded-full ${
                        person.status === "ACTIVE" ? "bg-green-500" : "bg-red-500"
                      } animate-pulse-glow`} />
                    </div>
                    <h6 className="text-sm text-white font-bold tracking-wider truncate hover-glow">{person.name}</h6>
                    <p className="text-xs text-cyan-400 truncate">{person.designation}</p>
                  </div>
                </div>
                <div className="glass p-2 rounded text-center holographic">
                  <p className="text-xs text-gray-500">CLEARANCE</p>
                  <p className="text-sm text-red-400 font-bold">{person.clearance}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
