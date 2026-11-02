import React from 'react';

export function CduSvg({ className = 'w-full h-full' }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900/80 via-slate-800/90 to-slate-950 p-4 rounded-xl overflow-hidden relative group">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:12px_12px]" />

      <svg
        className={className}
        viewBox="0 0 240 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cduHousing" x1="0" y1="0" x2="240" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1e293b" />
            <stop offset="1" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="coolantFlow" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0284c7" />
            <stop offset="1" stopColor="#0369a1" />
          </linearGradient>
          <linearGradient id="thermalHot" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ea580c" />
            <stop offset="1" stopColor="#c2410c" />
          </linearGradient>
        </defs>

        {/* Outer Cabinet Frame */}
        <rect x="45" y="15" width="150" height="110" rx="6" fill="url(#cduHousing)" stroke="#475569" strokeWidth="1.5" />

        {/* Display / PLC Screen */}
        <rect x="60" y="25" width="70" height="35" rx="3" fill="#020617" stroke="#38bdf8" strokeWidth="1" />
        <rect x="66" y="32" width="40" height="4" rx="1" fill="#38bdf8" />
        <rect x="66" y="40" width="28" height="3" rx="1" fill="#10b981" />
        <rect x="66" y="47" width="50" height="3" rx="1" fill="#64748b" />
        <circle cx="118" cy="38" r="4" fill="#0f172a" stroke="#10b981" strokeWidth="1" />

        {/* Status Indicator Lights */}
        <circle cx="145" cy="30" r="2.5" fill="#10b981" />
        <circle cx="145" cy="40" r="2.5" fill="#38bdf8" />
        <circle cx="145" cy="50" r="2.5" fill="#f97316" />

        {/* Dual Redundant VFD Pumps */}
        <rect x="60" y="72" width="55" height="40" rx="4" fill="#0f172a" stroke="#64748b" strokeWidth="1" />
        <circle cx="87" cy="92" r="14" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
        <circle cx="87" cy="92" r="6" fill="#0284c7" />
        {/* Impeller blades */}
        <line x1="87" y1="78" x2="87" y2="106" stroke="#0f172a" strokeWidth="1.5" />
        <line x1="73" y1="92" x2="101" y2="92" stroke="#0f172a" strokeWidth="1.5" />

        {/* Right side Manifold Pipe System */}
        {/* Chilled supply pipe */}
        <rect x="130" y="70" width="14" height="42" rx="2" fill="url(#coolantFlow)" stroke="#38bdf8" strokeWidth="1" />
        {/* Warm return pipe */}
        <rect x="155" y="70" width="14" height="42" rx="2" fill="url(#thermalHot)" stroke="#f97316" strokeWidth="1" />

        {/* Dial Pressure Gauges */}
        <circle cx="137" cy="62" r="7" fill="#ffffff" stroke="#334155" strokeWidth="1" />
        <line x1="137" y1="62" x2="141" y2="58" stroke="#0284c7" strokeWidth="1.5" strokeLinecap="round" />

        <circle cx="162" cy="62" r="7" fill="#ffffff" stroke="#334155" strokeWidth="1" />
        <line x1="162" y1="62" x2="166" y2="60" stroke="#ea580c" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}
