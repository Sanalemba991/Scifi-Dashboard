"use client";
import { useState, useEffect } from "react";

const analyticsData = {
  overview: {
    totalOperations: 247,
    successRate: 94.7,
    avgResponseTime: 1.2,
    activePersonnel: 2847,
  },
  monthlyData: [
    { month: "JAN", operations: 18, success: 17, personnel: 2450 },
    { month: "FEB", operations: 22, success: 21, personnel: 2520 },
    { month: "MAR", operations: 19, success: 18, personnel: 2580 },
    { month: "APR", operations: 25, success: 24, personnel: 2610 },
    { month: "MAY", operations: 21, success: 20, personnel: 2680 },
    { month: "JUN", operations: 28, success: 26, personnel: 2720 },
    { month: "JUL", operations: 24, success: 23, personnel: 2750 },
    { month: "AUG", operations: 20, success: 19, personnel: 2790 },
    { month: "SEP", operations: 26, success: 25, personnel: 2810 },
    { month: "OCT", operations: 23, success: 22, personnel: 2830 },
    { month: "NOV", operations: 21, success: 20, personnel: 2840 },
    { month: "DEC", operations: 20, success: 19, personnel: 2847 },
  ],
  departmentStats: [
    { name: "STRATEGIC COMMAND", personnel: 542, efficiency: 96.2, missions: 45 },
    { name: "TACTICAL OPS", personnel: 834, efficiency: 94.8, missions: 78 },
    { name: "INTELLIGENCE", personnel: 423, efficiency: 97.1, missions: 52 },
    { name: "LOGISTICS", personnel: 612, efficiency: 92.4, missions: 34 },
    { name: "COMMUNICATIONS", personnel: 287, efficiency: 98.5, missions: 23 },
    { name: "SECURITY", personnel: 149, efficiency: 95.7, missions: 15 },
  ],
  threatLevels: [
    { sector: "ALPHA", level: 12, status: "LOW" },
    { sector: "BETA", level: 34, status: "MODERATE" },
    { sector: "GAMMA", level: 8, status: "LOW" },
    { sector: "DELTA", level: 56, status: "ELEVATED" },
    { sector: "EPSILON", level: 23, status: "LOW" },
    { sector: "ZETA", level: 67, status: "HIGH" },
  ],
};

export default function Analytics() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("year");
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [animatedSuccessRate, setAnimatedSuccessRate] = useState(0);
  const [barHeights, setBarHeights] = useState<number[]>(analyticsData.monthlyData.map(() => 0));

  useEffect(() => {
    // Animate success rate gauge
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      setAnimatedSuccessRate(analyticsData.overview.successRate * Math.min(progress, 1));
      if (currentStep >= steps) clearInterval(timer);
    }, stepTime);

    // Animate bar chart
    setTimeout(() => {
      setBarHeights(analyticsData.monthlyData.map(d => d.operations));
    }, 300);

    return () => clearInterval(timer);
  }, []);

  const maxOperations = Math.max(...analyticsData.monthlyData.map(d => d.operations));

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="glass glow-border rounded-lg p-4 flex items-center justify-between fade-in-down corner-accent">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 glass rounded-lg flex items-center justify-center text-red-400 text-2xl float pulse-ring">
            △
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-wider hover-glow">ANALYTICS DASHBOARD</h1>
            <p className="text-sm text-gray-500">Comprehensive data analysis and insights</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex glass rounded overflow-hidden">
            {(["week", "month", "year"] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 text-xs tracking-wider transition-all ${
                  timeRange === range ? "bg-red-500/20 text-red-400" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "TOTAL OPERATIONS", value: analyticsData.overview.totalOperations, suffix: "", icon: "◈", color: "cyan", trend: "+12%" },
          { label: "SUCCESS RATE", value: analyticsData.overview.successRate, suffix: "%", icon: "✓", color: "green", trend: "+2.3%" },
          { label: "AVG RESPONSE TIME", value: analyticsData.overview.avgResponseTime, suffix: "s", icon: "◇", color: "yellow", trend: "-0.3s" },
          { label: "ACTIVE PERSONNEL", value: analyticsData.overview.activePersonnel.toLocaleString(), suffix: "", icon: "◉", color: "red", trend: "+156" },
        ].map((metric, index) => (
          <div key={metric.label} className={`glass glow-border rounded-lg p-4 hover-lift card-shine fade-in-up`} style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-xs tracking-wider">{metric.label}</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {metric.value}{metric.suffix}
                </p>
                <p className="text-green-400 text-xs mt-2">{metric.trend}</p>
              </div>
              <div className={`w-10 h-10 glass rounded-lg flex items-center justify-center text-${metric.color}-400 text-xl float`}>
                {metric.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Operations Chart */}
        <div className="col-span-8">
          <div className="glass glow-border rounded-lg overflow-hidden fade-in-left" style={{ animationDelay: '0.2s' }}>
            <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30 flex items-center justify-between">
              <span className="text-xs text-red-400 tracking-widest">◈ OPERATIONS OVERVIEW</span>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-gradient-to-t from-red-500 to-orange-500 rounded animate-pulse" />
                  TOTAL
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-gradient-to-t from-green-500 to-emerald-400 rounded animate-pulse" />
                  SUCCESS
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-end gap-2 h-48">
                {analyticsData.monthlyData.map((data, index) => (
                  <div key={data.month} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex gap-1 items-end h-40">
                      <div
                        className="flex-1 bg-gradient-to-t from-red-500/60 to-orange-500/60 rounded-t transition-all duration-1000 hover:from-red-500 hover:to-orange-500"
                        style={{ 
                          height: `${(barHeights[index] / maxOperations) * 100}%`,
                          transitionDelay: `${index * 50}ms`
                        }}
                      />
                      <div
                        className="flex-1 bg-gradient-to-t from-green-500/60 to-emerald-400/60 rounded-t transition-all duration-1000 hover:from-green-500 hover:to-emerald-400"
                        style={{ 
                          height: `${(data.success / maxOperations) * 100}%`,
                          transitionDelay: `${index * 50 + 25}ms`
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Success Rate Gauge */}
        <div className="col-span-4">
          <div className="glass glow-border rounded-lg overflow-hidden h-full fade-in-right" style={{ animationDelay: '0.2s' }}>
            <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30">
              <span className="text-xs text-red-400 tracking-widest">◈ SUCCESS RATE</span>
            </div>
            <div className="p-4 flex flex-col items-center justify-center h-[calc(100%-52px)]">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="80" cy="80" r="70" fill="none" stroke="#1f1f2e" strokeWidth="12" />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="url(#successGradient)"
                    strokeWidth="12"
                    strokeDasharray={`${(animatedSuccessRate / 100) * 440} 440`}
                    strokeLinecap="round"
                    className="progress-glow transition-all duration-100"
                  />
                  <defs>
                    <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-white neon-text-cyan">{animatedSuccessRate.toFixed(1)}%</span>
                  <span className="text-xs text-gray-500">SUCCESS</span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 w-full">
                <div className="text-center glass p-2 rounded holographic">
                  <p className="text-2xl font-bold text-green-400">234</p>
                  <p className="text-xs text-gray-500">SUCCESSFUL</p>
                </div>
                <div className="text-center glass p-2 rounded holographic">
                  <p className="text-2xl font-bold text-red-400">13</p>
                  <p className="text-xs text-gray-500">FAILED</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Department Statistics */}
        <div className="col-span-7">
          <div className="glass glow-border rounded-lg overflow-hidden fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30">
              <span className="text-xs text-red-400 tracking-widest">◈ DEPARTMENT STATISTICS</span>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {analyticsData.departmentStats.map((dept, index) => (
                  <div
                    key={dept.name}
                    onClick={() => setSelectedDepartment(selectedDepartment === dept.name ? null : dept.name)}
                    className={`glass p-3 rounded cursor-pointer transition-all border hover-lift card-shine fade-in-left ${
                      selectedDepartment === dept.name ? "border-cyan-500/50" : "border-transparent hover:border-red-500/30"
                    }`}
                    style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white tracking-wider hover-glow">{dept.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        dept.efficiency >= 97 ? "bg-green-500/20 text-green-400" :
                        dept.efficiency >= 94 ? "bg-cyan-500/20 text-cyan-400" :
                        "bg-yellow-500/20 text-yellow-400"
                      }`}>
                        {dept.efficiency}% EFFICIENCY
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="text-gray-500">PERSONNEL</span>
                        <p className="text-cyan-400 font-mono">{dept.personnel}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">MISSIONS</span>
                        <p className="text-orange-400 font-mono">{dept.missions}</p>
                      </div>
                      <div>
                        <div className="h-2 bg-gray-800 rounded overflow-hidden mt-2">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 progress-glow energy-bar"
                            style={{ width: `${dept.efficiency}%`, transition: 'width 1s ease-out' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Threat Assessment */}
        <div className="col-span-5">
          <div className="glass glow-border rounded-lg overflow-hidden h-full fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30">
              <span className="text-xs text-red-400 tracking-widest">◈ SECTOR THREAT LEVELS</span>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {analyticsData.threatLevels.map((sector, index) => (
                  <div key={sector.sector} className={`glass p-3 rounded hover-lift fade-in-right`} style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white">SECTOR {sector.sector}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        sector.status === "LOW" ? "bg-green-500/20 text-green-400" :
                        sector.status === "MODERATE" ? "bg-yellow-500/20 text-yellow-400" :
                        sector.status === "ELEVATED" ? "bg-orange-500/20 text-orange-400" :
                        "bg-red-500/20 text-red-400"
                      }`}>
                        {sector.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-800 rounded overflow-hidden">
                        <div
                          className={`h-full ${
                            sector.level < 25 ? "bg-green-500" :
                            sector.level < 50 ? "bg-yellow-500" :
                            sector.level < 75 ? "bg-orange-500" :
                            "bg-red-500"
                          } progress-glow`}
                          style={{ width: `${sector.level}%` }}
                        />
                      </div>
                      <span className={`text-sm font-mono ${
                        sector.level < 25 ? "text-green-400" :
                        sector.level < 50 ? "text-yellow-400" :
                        sector.level < 75 ? "text-orange-400" :
                        "text-red-400"
                      }`}>
                        {sector.level}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Activity Heatmap */}
        <div className="col-span-12">
          <div className="glass glow-border rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30">
              <span className="text-xs text-red-400 tracking-widest">◈ ACTIVITY HEATMAP - LAST 30 DAYS</span>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-30 gap-1">
                {[85, 42, 68, 25, 92, 55, 78, 35, 88, 45, 72, 28, 95, 58, 82, 38, 75, 48, 62, 32, 88, 52, 78, 42, 65, 85, 55, 72, 45, 92].map((intensity, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded ${
                      intensity > 80 ? "bg-red-500" :
                      intensity > 60 ? "bg-orange-500" :
                      intensity > 40 ? "bg-yellow-500/60" :
                      intensity > 20 ? "bg-cyan-500/40" :
                      "bg-gray-700/30"
                    }`}
                    title={`Day ${i + 1}: ${intensity}% activity`}
                  />
                ))}
              </div>
              <div className="flex items-center justify-end gap-2 mt-3 text-xs text-gray-500">
                <span>LESS</span>
                <div className="flex gap-1">
                  {["bg-gray-700/30", "bg-cyan-500/40", "bg-yellow-500/60", "bg-orange-500", "bg-red-500"].map((color, i) => (
                    <div key={i} className={`w-4 h-4 rounded ${color}`} />
                  ))}
                </div>
                <span>MORE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
