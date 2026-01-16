'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function BiometricLoader() {
  const [progress, setProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Show loader on first render
    setShowLoader(true);
    document.body.style.overflow = 'hidden';
    
    // Start progress animation with faster speed
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanComplete(true);
          
          // Hide loader quickly after completion
          setTimeout(() => {
            setShowLoader(false);
            document.body.style.overflow = 'unset';
          }, 300); // Reduced from 1000ms to 300ms
          
          return 100;
        }
        return prev + 5; // Increased from 1 to 5 for faster progress
      });
    }, 10); // Reduced from 30ms to 10ms for faster updates

    return () => {
      clearInterval(interval);
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!showLoader) return null;

  return (
    <div className="fixed inset-0 bg-slate-950 flex items-center justify-center z-[9999] w-screen h-screen overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 10s linear infinite' // Faster animation (20s to 10s)
        }} />
      </div>

      {/* Corner Brackets */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-cyan-500 animate-pulse" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-cyan-500 animate-pulse" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-cyan-500 animate-pulse" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-cyan-500 animate-pulse" />

      {/* Main Loader Container */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* Biometric Scanner Circle */}
        <div className="relative w-64 h-64">
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30" />
          
          {/* Rotating Ring */}
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-cyan-400 border-r-cyan-400 animate-spin" style={{ animationDuration: '1.5s' }} /> {/* Faster rotation (3s to 1.5s) */}
          
          {/* Middle Ring */}
          <div className="absolute inset-6 rounded-full border border-cyan-500/50" />
          
          {/* Inner Pulse Ring */}
          <div className="absolute inset-10 rounded-full border border-cyan-400 animate-ping" />
          
          {/* Fingerprint/Eye Center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-32 h-32">
              {/* Animated Scan Lines */}
              <div 
                className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent"
                style={{
                  animation: 'scan 1s ease-in-out infinite', // Faster scan (2s to 1s)
                  height: '4px',
                  transformOrigin: 'center'
                }}
              />
              
              {/* Biometric Pattern */}
              <svg viewBox="0 0 100 100" className="w-full h-full opacity-80">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400" />
                <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400" />
                <circle cx="50" cy="50" r="24" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400" />
                <circle cx="50" cy="50" r="16" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400" />
                <circle cx="50" cy="50" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400" />
                {[...Array(8)].map((_, i) => (
                  <line
                    key={i}
                    x1="50"
                    y1="50"
                    x2={50 + 40 * Math.cos(i * Math.PI / 4)}
                    y2={50 + 40 * Math.sin(i * Math.PI / 4)}
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-cyan-400"
                  />
                ))}
              </svg>
              
              {/* Center Glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50" />
              </div>
            </div>
          </div>
          
          {/* Progress Arc */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="120"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="text-cyan-500"
              strokeDasharray={2 * Math.PI * 120}
              strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
              style={{ transition: 'stroke-dashoffset 0.1s ease' }} // Faster transition (0.3s to 0.1s)
            />
          </svg>
        </div>

        {/* Status Text */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <p className="text-cyan-400 text-lg font-mono tracking-wider">
              {scanComplete ? 'AUTHENTICATION COMPLETE' : 'BIOMETRIC SCAN IN PROGRESS'}
            </p>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          </div>
          
          {/* Progress Percentage */}
          <div className="text-5xl font-bold text-cyan-300 font-mono tabular-nums">
            {progress}%
          </div>
          
          {/* Status Messages - Updated thresholds for faster messages */}
          <div className="h-6">
            {progress < 20 && (
              <p className="text-cyan-500/70 text-sm font-mono animate-pulse">
                Initializing scanner...
              </p>
            )}
            {progress >= 20 && progress < 40 && (
              <p className="text-cyan-500/70 text-sm font-mono animate-pulse">
                Analyzing biometric data...
              </p>
            )}
            {progress >= 40 && progress < 70 && (
              <p className="text-cyan-500/70 text-sm font-mono animate-pulse">
                Verifying identity...
              </p>
            )}
            {progress >= 70 && !scanComplete && (
              <p className="text-cyan-500/70 text-sm font-mono animate-pulse">
                Finalizing authentication...
              </p>
            )}
            {scanComplete && (
              <p className="text-green-400 text-sm font-mono">
                ✓ Access granted
              </p>
            )}
          </div>
        </div>

        {/* Data Stream Effect */}
        <div className="flex space-x-1 opacity-50">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-cyan-400"
              style={{
                height: `${Math.random() * 30 + 10}px`,
                animation: `pulse ${Math.random() * 1 + 0.5}s ease-in-out infinite`, // Faster pulse (1-2s to 0.5-1.5s)
                animationDelay: `${i * 0.05}s` // Reduced delay (0.1s to 0.05s)
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
        
        @keyframes scan {
          0%, 100% { transform: translateY(-64px); }
          50% { transform: translateY(64px); }
        }
      `}</style>
    </div>
  );
}