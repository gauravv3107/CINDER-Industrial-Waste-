import React from 'react';

export function GpuSvg({ className = 'w-full h-full' }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900/80 via-slate-800/90 to-slate-950 p-4 rounded-xl overflow-hidden relative group">
      {/* Background technical grid pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:12px_12px]" />

      <svg
        className={className}
        viewBox="0 0 240 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gpuPcb" x1="0" y1="0" x2="240" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1e293b" />
            <stop offset="1" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="shroud" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#334155" />
            <stop offset="1" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="thermalCopper" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ea580c" />
            <stop offset="0.5" stopColor="#f97316" />
            <stop offset="1" stopColor="#c2410c" />
          </linearGradient>
          <linearGradient id="goldPins" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#eab308" />
            <stop offset="1" stopColor="#ca8a04" />
          </linearGradient>
        </defs>

        {/* Outer PCB Board */}
        <rect x="20" y="15" width="200" height="105" rx="8" fill="url(#gpuPcb)" stroke="#475569" strokeWidth="1.5" />

        {/* Heat Sink Fins & Shroud */}
        <rect x="35" y="25" width="160" height="85" rx="6" fill="url(#shroud)" stroke="#64748b" strokeWidth="1" />

        {/* Copper Heatpipes */}
        <line x1="50" y1="42" x2="180" y2="42" stroke="url(#thermalCopper)" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="50" y1="65" x2="180" y2="65" stroke="url(#thermalCopper)" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="50" y1="88" x2="180" y2="88" stroke="url(#thermalCopper)" strokeWidth="3.5" strokeLinecap="round" />

        {/* Silicon Die Core / Vapor Chamber Center */}
        <rect x="95" y="45" width="45" height="45" rx="4" fill="#0f172a" stroke="#f97316" strokeWidth="1.5" />
        <rect x="103" y="53" width="29" height="29" rx="2" fill="#1e293b" stroke="#38bdf8" strokeWidth="0.8" />
        {/* Core Grid Matrix */}
        <line x1="110" y1="53" x2="110" y2="82" stroke="#38bdf8" strokeWidth="0.5" strokeOpacity="0.6" />
        <line x1="117" y1="53" x2="117" y2="82" stroke="#38bdf8" strokeWidth="0.5" strokeOpacity="0.6" />
        <line x1="124" y1="53" x2="124" y2="82" stroke="#38bdf8" strokeWidth="0.5" strokeOpacity="0.6" />

        {/* HBM3 Stacks around Die */}
        <rect x="83" y="48" width="8" height="16" rx="1.5" fill="#334155" />
        <rect x="83" y="70" width="8" height="16" rx="1.5" fill="#334155" />
        <rect x="144" y="48" width="8" height="16" rx="1.5" fill="#334155" />
        <rect x="144" y="70" width="8" height="16" rx="1.5" fill="#334155" />

        {/* PCIe Gold Edge Connector Finger Pads */}
        <rect x="45" y="120" width="130" height="7" rx="1" fill="url(#goldPins)" />
        {Array.from({ length: 22 }).map((_, i) => (
          <line
            key={i}
            x1={50 + i * 5.6}
            y1="120"
            x2={50 + i * 5.6}
            y2="127"
            stroke="#713f12"
            strokeWidth="0.8"
          />
        ))}

        {/* Status Micro-LED */}
        <circle cx="185" cy="35" r="2" fill="#10b981" />
        <circle cx="185" cy="35" r="4" fill="#10b981" opacity="0.3" className="animate-ping" />
      </svg>
    </div>
  );
}
