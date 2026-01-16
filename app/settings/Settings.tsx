"use client";
import { useState, useEffect } from "react";

const settingsSections = [
  { id: "profile", label: "USER PROFILE", icon: "◉" },
  { id: "security", label: "SECURITY", icon: "🔒" },
  { id: "notifications", label: "NOTIFICATIONS", icon: "◈" },
  { id: "display", label: "DISPLAY", icon: "◇" },
  { id: "system", label: "SYSTEM", icon: "⬡" },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState("profile");
  const [settings, setSettings] = useState({
    theme: "dark",
    accentColor: "red",
    animations: true,
    sounds: false,
    notifications: {
      email: true,
      push: true,
      alerts: true,
      updates: false,
    },
    security: {
      twoFactor: true,
      biometric: true,
      sessionTimeout: 30,
      autoLock: true,
    },
    display: {
      compactMode: false,
      showTimestamps: true,
      language: "EN",
      timezone: "UTC",
    },
  });
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  const toggleSetting = (category: string, key: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...(prev[category as keyof typeof prev] as object),
        [key]: !(prev[category as keyof typeof prev] as Record<string, boolean>)[key],
      },
    }));
    // Simulate save
    setSaveStatus("saving");
    setTimeout(() => setSaveStatus("saved"), 1000);
    setTimeout(() => setSaveStatus("idle"), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Settings Header */}
      <div className="glass glow-border rounded-lg p-4 flex items-center justify-between fade-in-down corner-accent">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 glass rounded-lg flex items-center justify-center text-red-400 text-2xl float pulse-ring">
            ⬡
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-wider hover-glow">SYSTEM SETTINGS</h1>
            <p className="text-sm text-gray-500">Configure system preferences and security options</p>
          </div>
        </div>
        <button className={`glass-cyan px-6 py-2 rounded text-sm text-cyan-400 hover:bg-cyan-500/20 transition-all cyber-btn ${
          saveStatus === "saving" ? "animate-pulse" : ""
        }`}>
          {saveStatus === "saving" ? "SAVING..." : saveStatus === "saved" ? "✓ SAVED" : "SAVE CHANGES"}
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Settings Navigation */}
        <div className="col-span-3">
          <div className="glass glow-border rounded-lg overflow-hidden fade-in-left" style={{ animationDelay: '0.1s' }}>
            <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30">
              <span className="text-xs text-red-400 tracking-widest">◈ SETTINGS</span>
            </div>
            <div className="p-2 space-y-1">
              {settingsSections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full p-3 rounded text-left transition-all flex items-center gap-3 hover-lift fade-in-left ${
                    activeSection === section.id
                      ? "glass glow-border border-red-500/50 text-red-400"
                      : "text-gray-400 hover:bg-white/5 hover:text-gray-300"
                  }`}
                  style={{ animationDelay: `${0.2 + index * 0.05}s` }}
                >
                  <span className={`text-lg ${activeSection === section.id ? 'animate-pulse-glow' : ''}`}>{section.icon}</span>
                  <span className="text-sm">{section.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* System Info */}
          <div className="glass glow-border rounded-lg overflow-hidden mt-6 fade-in-left" style={{ animationDelay: '0.3s' }}>
            <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30">
              <span className="text-xs text-red-400 tracking-widest">◈ SYSTEM INFO</span>
            </div>
            <div className="p-4 space-y-3 text-xs">
              <div className="flex justify-between hover:bg-white/5 p-1 rounded transition-colors">
                <span className="text-gray-500">VERSION</span>
                <span className="text-cyan-400 neon-text-cyan">v4.2.1</span>
              </div>
              <div className="flex justify-between hover:bg-white/5 p-1 rounded transition-colors">
                <span className="text-gray-500">BUILD</span>
                <span className="text-cyan-400">2026.01.10</span>
              </div>
              <div className="flex justify-between hover:bg-white/5 p-1 rounded transition-colors">
                <span className="text-gray-500">LICENSE</span>
                <span className="text-green-400 animate-pulse">VALID</span>
              </div>
              <div className="flex justify-between hover:bg-white/5 p-1 rounded transition-colors">
                <span className="text-gray-500">LAST UPDATE</span>
                <span className="text-cyan-400">5 DAYS AGO</span>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="col-span-9">
          {/* Profile Section */}
          {activeSection === "profile" && (
            <div className="glass glow-border rounded-lg overflow-hidden fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30">
                <span className="text-xs text-red-400 tracking-widest">◈ USER PROFILE</span>
              </div>
              <div className="p-6">
                <div className="flex items-start gap-6 mb-8">
                  <div className="w-24 h-24 glass rounded-lg flex items-center justify-center text-3xl text-cyan-400 border-2 border-cyan-500/30 float holographic">
                    SM
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg text-white font-bold mb-1 hover-glow">COMMANDER SARAH J. MITCHELL</h3>
                    <p className="text-sm text-cyan-400 mb-2 neon-text-cyan">SENIOR TACTICAL OPERATIONS SPECIALIST</p>
                    <p className="text-xs text-gray-500 mb-4">Employee ID: EMP-2026-0847</p>
                    <button className="glass px-4 py-2 rounded text-xs text-cyan-400 hover:bg-cyan-500/10 transition-colors cyber-btn">
                      CHANGE AVATAR
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <label className="text-xs text-gray-500 mb-2 block">DISPLAY NAME</label>
                    <input
                      type="text"
                      defaultValue="CDR. MITCHELL"
                      className="w-full glass px-4 py-3 rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-500/50 transition-all"
                    />
                  </div>
                  <div className="fade-in-up" style={{ animationDelay: '0.35s' }}>
                    <label className="text-xs text-gray-500 mb-2 block">EMAIL</label>
                    <input
                      type="email"
                      defaultValue="s.mitchell@nexus.cmd"
                      className="w-full glass px-4 py-3 rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-500/50 transition-all"
                    />
                  </div>
                  <div className="fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <label className="text-xs text-gray-500 mb-2 block">DEPARTMENT</label>
                    <input
                      type="text"
                      defaultValue="STRATEGIC COMMAND DIVISION"
                      disabled
                      className="w-full glass px-4 py-3 rounded text-sm text-gray-500"
                    />
                  </div>
                  <div className="fade-in-up" style={{ animationDelay: '0.45s' }}>
                    <label className="text-xs text-gray-500 mb-2 block">CLEARANCE LEVEL</label>
                    <input
                      type="text"
                      defaultValue="OMEGA-7"
                      disabled
                      className="w-full glass px-4 py-3 rounded text-sm text-red-400 neon-text-red"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Section */}
          {activeSection === "security" && (
            <div className="space-y-6">
              <div className="glass glow-border rounded-lg overflow-hidden fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30">
                  <span className="text-xs text-red-400 tracking-widest">◈ AUTHENTICATION</span>
                </div>
                <div className="p-6 space-y-4">
                  {[
                    { key: "twoFactor", label: "TWO-FACTOR AUTHENTICATION", desc: "Require additional verification for login" },
                    { key: "biometric", label: "BIOMETRIC LOGIN", desc: "Use fingerprint or face recognition" },
                    { key: "autoLock", label: "AUTO-LOCK SESSION", desc: "Automatically lock after inactivity" },
                  ].map((item, index) => (
                    <div key={item.key} className={`flex items-center justify-between p-4 glass rounded hover-lift fade-in-up`} style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
                      <div>
                        <p className="text-sm text-white hover-glow">{item.label}</p>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => toggleSetting("security", item.key)}
                        className={`w-14 h-7 rounded-full transition-all relative ${
                          settings.security[item.key as keyof typeof settings.security]
                            ? "bg-green-500/30 border border-green-500/50"
                            : "bg-gray-700 border border-gray-600"
                        }`}
                      >
                        <div
                          className={`absolute top-1 w-5 h-5 rounded-full transition-all ${
                            settings.security[item.key as keyof typeof settings.security]
                              ? "right-1 bg-green-500"
                              : "left-1 bg-gray-500"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass glow-border rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30">
                  <span className="text-xs text-red-400 tracking-widest">◈ PASSWORD</span>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-xs text-gray-500 mb-2 block">CURRENT PASSWORD</label>
                      <input
                        type="password"
                        placeholder="••••••••••••"
                        className="w-full glass px-4 py-3 rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-500/50"
                      />
                    </div>
                    <div></div>
                    <div>
                      <label className="text-xs text-gray-500 mb-2 block">NEW PASSWORD</label>
                      <input
                        type="password"
                        placeholder="••••••••••••"
                        className="w-full glass px-4 py-3 rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-500/50"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-2 block">CONFIRM PASSWORD</label>
                      <input
                        type="password"
                        placeholder="••••••••••••"
                        className="w-full glass px-4 py-3 rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-500/50"
                      />
                    </div>
                  </div>
                  <button className="glass px-4 py-2 rounded text-xs text-orange-400 hover:bg-orange-500/10 transition-colors">
                    UPDATE PASSWORD
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Section */}
          {activeSection === "notifications" && (
            <div className="glass glow-border rounded-lg overflow-hidden">
              <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30">
                <span className="text-xs text-red-400 tracking-widest">◈ NOTIFICATION PREFERENCES</span>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { key: "email", label: "EMAIL NOTIFICATIONS", desc: "Receive updates via email" },
                  { key: "push", label: "PUSH NOTIFICATIONS", desc: "Browser and desktop alerts" },
                  { key: "alerts", label: "PRIORITY ALERTS", desc: "Critical system and security alerts" },
                  { key: "updates", label: "SYSTEM UPDATES", desc: "Notifications about system changes" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 glass rounded">
                    <div>
                      <p className="text-sm text-white">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => toggleSetting("notifications", item.key)}
                      className={`w-14 h-7 rounded-full transition-all relative ${
                        settings.notifications[item.key as keyof typeof settings.notifications]
                          ? "bg-green-500/30 border border-green-500/50"
                          : "bg-gray-700 border border-gray-600"
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-5 h-5 rounded-full transition-all ${
                          settings.notifications[item.key as keyof typeof settings.notifications]
                            ? "right-1 bg-green-500"
                            : "left-1 bg-gray-500"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Display Section */}
          {activeSection === "display" && (
            <div className="space-y-6">
              <div className="glass glow-border rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30">
                  <span className="text-xs text-red-400 tracking-widest">◈ THEME</span>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                      { id: "dark", label: "DARK", colors: ["#0a0a0f", "#1a1a2e", "#ff3333"] },
                      { id: "light", label: "LIGHT", colors: ["#f0f0f0", "#ffffff", "#ff3333"] },
                      { id: "midnight", label: "MIDNIGHT", colors: ["#000000", "#0a0a1a", "#00ffff"] },
                    ].map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => setSettings(prev => ({ ...prev, theme: theme.id }))}
                        className={`p-4 rounded transition-all ${
                          settings.theme === theme.id
                            ? "glass glow-border border-red-500/50"
                            : "glass hover:border-red-500/30 border border-transparent"
                        }`}
                      >
                        <div className="flex gap-1 mb-2">
                          {theme.colors.map((color, i) => (
                            <div key={i} className="w-6 h-6 rounded" style={{ backgroundColor: color }} />
                          ))}
                        </div>
                        <p className="text-xs text-gray-400">{theme.label}</p>
                      </button>
                    ))}
                  </div>

                  <div className="mb-6">
                    <label className="text-xs text-gray-500 mb-3 block">ACCENT COLOR</label>
                    <div className="flex gap-3">
                      {["red", "cyan", "green", "orange", "purple"].map((color) => (
                        <button
                          key={color}
                          onClick={() => setSettings(prev => ({ ...prev, accentColor: color }))}
                          className={`w-10 h-10 rounded-full transition-all ${
                            settings.accentColor === color ? "ring-2 ring-white ring-offset-2 ring-offset-[#0a0a0f]" : ""
                          }`}
                          style={{ backgroundColor: color === "red" ? "#ff3333" : color === "cyan" ? "#00ffff" : color === "green" ? "#22c55e" : color === "orange" ? "#ff8800" : "#a855f7" }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass glow-border rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30">
                  <span className="text-xs text-red-400 tracking-widest">◈ INTERFACE</span>
                </div>
                <div className="p-6 space-y-4">
                  {[
                    { key: "compactMode", label: "COMPACT MODE", desc: "Reduce spacing and padding" },
                    { key: "showTimestamps", label: "SHOW TIMESTAMPS", desc: "Display time on all entries" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 glass rounded">
                      <div>
                        <p className="text-sm text-white">{item.label}</p>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => toggleSetting("display", item.key)}
                        className={`w-14 h-7 rounded-full transition-all relative ${
                          settings.display[item.key as keyof typeof settings.display]
                            ? "bg-green-500/30 border border-green-500/50"
                            : "bg-gray-700 border border-gray-600"
                        }`}
                      >
                        <div
                          className={`absolute top-1 w-5 h-5 rounded-full transition-all ${
                            settings.display[item.key as keyof typeof settings.display]
                              ? "right-1 bg-green-500"
                              : "left-1 bg-gray-500"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* System Section */}
          {activeSection === "system" && (
            <div className="space-y-6">
              <div className="glass glow-border rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30">
                  <span className="text-xs text-red-400 tracking-widest">◈ SYSTEM STATUS</span>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "CPU USAGE", value: 42, unit: "%" },
                      { label: "MEMORY", value: 68, unit: "%" },
                      { label: "STORAGE", value: 54, unit: "%" },
                      { label: "NETWORK", value: 98, unit: "%" },
                    ].map((metric) => (
                      <div key={metric.label} className="glass p-4 rounded">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-gray-500">{metric.label}</span>
                          <span className={`text-sm font-mono ${metric.value > 80 ? "text-red-400" : "text-cyan-400"}`}>
                            {metric.value}{metric.unit}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded overflow-hidden">
                          <div
                            className={`h-full ${metric.value > 80 ? "bg-red-500" : "bg-gradient-to-r from-cyan-500 to-blue-500"} progress-glow`}
                            style={{ width: `${metric.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="glass glow-border rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30">
                  <span className="text-xs text-red-400 tracking-widest">◈ MAINTENANCE</span>
                </div>
                <div className="p-6 grid grid-cols-2 gap-4">
                  <button className="glass p-4 rounded text-left hover:bg-red-500/10 transition-colors group">
                    <p className="text-sm text-white group-hover:text-red-400">CLEAR CACHE</p>
                    <p className="text-xs text-gray-500">Free up temporary storage</p>
                  </button>
                  <button className="glass p-4 rounded text-left hover:bg-cyan-500/10 transition-colors group">
                    <p className="text-sm text-white group-hover:text-cyan-400">CHECK UPDATES</p>
                    <p className="text-xs text-gray-500">Look for system updates</p>
                  </button>
                  <button className="glass p-4 rounded text-left hover:bg-yellow-500/10 transition-colors group">
                    <p className="text-sm text-white group-hover:text-yellow-400">EXPORT DATA</p>
                    <p className="text-xs text-gray-500">Download your data backup</p>
                  </button>
                  <button className="glass p-4 rounded text-left hover:bg-orange-500/10 transition-colors group">
                    <p className="text-sm text-white group-hover:text-orange-400">VIEW LOGS</p>
                    <p className="text-xs text-gray-500">Access system logs</p>
                  </button>
                </div>
              </div>

              <div className="glass rounded-lg p-4 border border-red-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-red-400">DANGER ZONE</p>
                    <p className="text-xs text-gray-500">Irreversible actions - proceed with caution</p>
                  </div>
                  <button className="px-4 py-2 rounded text-xs text-red-400 border border-red-500/50 hover:bg-red-500/20 transition-colors">
                    RESET SETTINGS
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
