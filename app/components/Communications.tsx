"use client";
import { useState, useEffect } from "react";

const channels = [
  { id: "ch-001", name: "COMMAND HQ", status: "ACTIVE", unread: 3, priority: "HIGH" },
  { id: "ch-002", name: "ALPHA TEAM", status: "ACTIVE", unread: 12, priority: "NORMAL" },
  { id: "ch-003", name: "INTELLIGENCE", status: "ACTIVE", unread: 0, priority: "SECURE" },
  { id: "ch-004", name: "LOGISTICS", status: "IDLE", unread: 5, priority: "NORMAL" },
  { id: "ch-005", name: "EMERGENCY", status: "STANDBY", unread: 0, priority: "CRITICAL" },
];

const messages = [
  {
    id: "msg-001",
    sender: "COMMAND HQ",
    senderId: "CMD-001",
    content: "All units be advised: Operation NIGHTFALL status update required within 0600 hours.",
    time: "14:28:15",
    priority: "HIGH",
    encrypted: false,
  },
  {
    id: "msg-002",
    sender: "CDR. MITCHELL",
    senderId: "EMP-2026-0847",
    content: "Acknowledged. Progress report submitted. Team Alpha in position. Awaiting further orders.",
    time: "14:30:42",
    priority: "NORMAL",
    encrypted: false,
  },
  {
    id: "msg-003",
    sender: "INTELLIGENCE",
    senderId: "INT-007",
    content: "[ENCRYPTED] ████████████████████████████████████████",
    time: "14:31:05",
    priority: "SECURE",
    encrypted: true,
  },
  {
    id: "msg-004",
    sender: "MAJ. RODRIGUEZ",
    senderId: "EMP-2026-0312",
    content: "Project PHOENIX infrastructure upgrade at 47%. Systems nominal. No anomalies detected.",
    time: "14:32:18",
    priority: "NORMAL",
    encrypted: false,
  },
  {
    id: "msg-005",
    sender: "SECURITY ALERT",
    senderId: "SYS-AUTO",
    content: "Perimeter scan complete. All sectors secure. Next scan scheduled: 15:00:00",
    time: "14:33:00",
    priority: "LOW",
    encrypted: false,
  },
];

const broadcasts = [
  { id: "bc-001", title: "SYSTEM MAINTENANCE", time: "16:00", date: "2026-01-12", status: "SCHEDULED" },
  { id: "bc-002", title: "SECURITY BRIEFING", time: "09:00", date: "2026-01-13", status: "UPCOMING" },
  { id: "bc-003", title: "OPERATION DEBRIEF", time: "14:00", date: "2026-01-14", status: "UPCOMING" },
];

const contacts = [
  { id: "c-001", name: "GEN. HAWKINS", role: "SUPREME COMMANDER", status: "ONLINE", clearance: "OMEGA-9" },
  { id: "c-002", name: "COL. TORRES", role: "OPERATIONS CHIEF", status: "ONLINE", clearance: "OMEGA-8" },
  { id: "c-003", name: "MAJ. RODRIGUEZ", role: "PROJECT LEAD", status: "BUSY", clearance: "OMEGA-7" },
  { id: "c-004", name: "LT. CHEN", role: "SECURITY OFFICER", status: "AWAY", clearance: "OMEGA-6" },
  { id: "c-005", name: "CPT. WILLIAMS", role: "TRAINING COORD", status: "OFFLINE", clearance: "OMEGA-5" },
];

export default function Communications() {
  const [activeChannel, setActiveChannel] = useState("ch-001");
  const [messageInput, setMessageInput] = useState("");
  const [showEncryption, setShowEncryption] = useState(false);
  const [signalStrength, setSignalStrength] = useState(98.7);
  const [typingIndicator, setTypingIndicator] = useState(false);

  useEffect(() => {
    // Simulate signal fluctuation
    const signalTimer = setInterval(() => {
      setSignalStrength(prev => {
        const fluctuation = (Math.random() - 0.5) * 2;
        return Math.max(95, Math.min(100, prev + fluctuation));
      });
    }, 2000);

    // Simulate typing indicator
    const typingTimer = setInterval(() => {
      setTypingIndicator(prev => !prev);
    }, 3000);

    return () => {
      clearInterval(signalTimer);
      clearInterval(typingTimer);
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Communications Header */}
      <div className="glass glow-border rounded-lg p-4 flex items-center justify-between fade-in-down corner-accent">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 glass rounded-lg flex items-center justify-center text-red-400 text-2xl float pulse-ring">
            □
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-wider hover-glow">COMMUNICATIONS HUB</h1>
            <p className="text-sm text-gray-500">Secure inter-departmental messaging system</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass px-4 py-2 rounded flex items-center gap-2 holographic">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse-glow" />
            <span className="text-xs text-green-400">ENCRYPTED CHANNEL</span>
          </div>
          <div className="glass px-4 py-2 rounded flex items-center gap-2">
            <span className="text-xs text-cyan-400 animate-pulse">SIGNAL: {signalStrength.toFixed(1)}%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Channels & Contacts */}
        <div className="col-span-3 space-y-6">
          {/* Channels */}
          <div className="glass glow-border rounded-lg overflow-hidden fade-in-left" style={{ animationDelay: '0.1s' }}>
            <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30">
              <span className="text-xs text-red-400 tracking-widest">◈ CHANNELS</span>
            </div>
            <div className="p-2 space-y-1">
              {channels.map((channel, index) => (
                <button
                  key={channel.id}
                  onClick={() => setActiveChannel(channel.id)}
                  className={`w-full p-3 rounded text-left transition-all hover-lift fade-in-left ${
                    activeChannel === channel.id
                      ? "glass glow-border border-red-500/50"
                      : "hover:bg-white/5"
                  }`}
                  style={{ animationDelay: `${0.2 + index * 0.05}s` }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-white hover-glow">{channel.name}</span>
                    {channel.unread > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
                        {channel.unread}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                      channel.status === "ACTIVE" ? "bg-green-500" :
                      channel.status === "IDLE" ? "bg-yellow-500" :
                      "bg-gray-500"
                    }`} />
                    <span className="text-xs text-gray-500">{channel.status}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Online Contacts */}
          <div className="glass glow-border rounded-lg overflow-hidden fade-in-left" style={{ animationDelay: '0.2s' }}>
            <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30">
              <span className="text-xs text-red-400 tracking-widest">◈ CONTACTS</span>
            </div>
            <div className="p-2 space-y-1 max-h-60 overflow-auto">
              {contacts.map((contact, index) => (
                <div 
                  key={contact.id} 
                  className={`p-2 rounded hover:bg-white/5 cursor-pointer hover-lift card-shine fade-in-left`}
                  style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-8 h-8 glass rounded-full flex items-center justify-center text-xs text-cyan-400 float">
                        {contact.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#0a0a0f] animate-pulse ${
                        contact.status === "ONLINE" ? "bg-green-500" :
                        contact.status === "BUSY" ? "bg-red-500" :
                        contact.status === "AWAY" ? "bg-yellow-500" :
                        "bg-gray-500"
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate hover-glow">{contact.name}</p>
                      <p className="text-xs text-gray-500 truncate">{contact.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Message Area */}
        <div className="col-span-6">
          <div className="glass glow-border rounded-lg overflow-hidden h-full flex flex-col fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs text-red-400 tracking-widest">◈ SECURE CHANNEL</span>
                <span className="text-sm text-white">
                  {channels.find(c => c.id === activeChannel)?.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowEncryption(!showEncryption)}
                  className={`px-3 py-1 rounded text-xs transition-all cyber-btn ${
                    showEncryption ? "bg-green-500/20 text-green-400" : "glass text-gray-500"
                  }`}
                >
                  🔒 E2E
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-auto max-h-[400px]">
              {messages.map((message, index) => (
                <div key={message.id} className={`flex gap-3 fade-in-up`} style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
                  <div className="w-10 h-10 glass rounded-lg flex items-center justify-center text-xs text-cyan-400 shrink-0 float">
                    {message.sender.split(" ").slice(0, 2).map(n => n[0]).join("")}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-white font-bold">{message.sender}</span>
                      <span className="text-xs text-gray-600">{message.senderId}</span>
                      <span className="text-xs text-gray-500">{message.time}</span>
                      {message.priority === "HIGH" && (
                        <span className="text-xs px-2 py-0.5 rounded bg-red-500/20 text-red-400">HIGH</span>
                      )}
                      {message.encrypted && (
                        <span className="text-xs px-2 py-0.5 rounded bg-green-500/20 text-green-400">🔒</span>
                      )}
                    </div>
                    <div className={`glass p-3 rounded ${message.priority === "HIGH" ? "border-l-2 border-red-500" : ""}`}>
                      <p className={`text-sm ${message.encrypted ? "text-green-400 font-mono" : "text-gray-300"}`}>
                        {message.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-red-500/30">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Enter secure message..."
                  className="flex-1 glass px-4 py-3 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-red-500/50"
                />
                <button className="glass-cyan px-6 py-3 rounded text-sm text-cyan-400 hover:bg-cyan-500/20 transition-colors">
                  TRANSMIT
                </button>
              </div>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
                <span>◈ ENCRYPTION: AES-256</span>
                <span>◈ LATENCY: 12ms</span>
                <span>◈ CHANNEL: SECURE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Broadcasts & Status */}
        <div className="col-span-3 space-y-6">
          {/* System Broadcasts */}
          <div className="glass glow-border rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30">
              <span className="text-xs text-red-400 tracking-widest">◈ BROADCASTS</span>
            </div>
            <div className="p-3 space-y-2">
              {broadcasts.map((broadcast) => (
                <div key={broadcast.id} className="glass p-3 rounded">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-white">{broadcast.title}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      broadcast.status === "SCHEDULED" ? "bg-cyan-500/20 text-cyan-400" : "bg-yellow-500/20 text-yellow-400"
                    }`}>
                      {broadcast.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{broadcast.date}</span>
                    <span>•</span>
                    <span>{broadcast.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Network Status */}
          <div className="glass glow-border rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30">
              <span className="text-xs text-red-400 tracking-widest">◈ NETWORK STATUS</span>
            </div>
            <div className="p-4 space-y-3">
              {[
                { name: "PRIMARY RELAY", status: 100, latency: "8ms" },
                { name: "BACKUP RELAY", status: 98, latency: "15ms" },
                { name: "SAT UPLINK", status: 95, latency: "120ms" },
                { name: "LOCAL MESH", status: 100, latency: "2ms" },
              ].map((network) => (
                <div key={network.name}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-500">{network.name}</span>
                    <span className="text-cyan-400">{network.latency}</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded overflow-hidden">
                    <div
                      className={`h-full ${network.status === 100 ? "bg-green-500" : "bg-gradient-to-r from-cyan-500 to-blue-500"} progress-glow`}
                      style={{ width: `${network.status}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass glow-border rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-red-900/50 to-transparent px-4 py-3 border-b border-red-500/30">
              <span className="text-xs text-red-400 tracking-widest">◈ QUICK ACTIONS</span>
            </div>
            <div className="p-3 grid grid-cols-2 gap-2">
              {[
                { label: "BROADCAST", icon: "◈" },
                { label: "ENCRYPT", icon: "🔒" },
                { label: "ARCHIVE", icon: "◉" },
                { label: "ALERT", icon: "⚠" },
              ].map((action) => (
                <button
                  key={action.label}
                  className="glass p-3 rounded text-center hover:bg-red-500/10 transition-colors"
                >
                  <div className="text-xl mb-1">{action.icon}</div>
                  <span className="text-xs text-gray-400">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
