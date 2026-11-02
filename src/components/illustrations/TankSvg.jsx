import React from 'react';

export function TankSvg({ className = 'w-full h-full' }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900/80 via-slate-800/90 to-slate-950 p-4 rounded-xl overflow-hidden relative group">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:12px_12px]" />

      <svg
        className={className}
        viewBox="0 0 240 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="tankBody" x1="0" y1="0" x2="240" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1e293b" />
            <stop offset="1" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="fluidGradient" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0284c7" stopOpacity="0.8" />
            <stop offset="1" stopColor="#0369a1" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* Immersion Tank Exterior Frame */}
        <rect x="30" y="25" width="180" height="95" rx="8" fill="url(#tankBody)" stroke="#64748b" strokeWidth="1.5" />

        {/* Dielectric Fluid Level Window */}
        <rect x="42" y="38" width="156" height="70" rx="4" fill="url(#fluidGradient)" stroke="#0284c7" strokeWidth="1" />

        {/* Submerged Server Blade Vertical Modules */}
        {Array.from({ length: 8 }).map((_, i) => (
          <g key={i}>
            <rect
              x={50 + i * 18}
              y="46"
              width="12"
              height="54"
              rx="1.5"
              fill="#0f172a"
              stroke="#38bdf8"
              strokeWidth="0.8"
            />
            {/* Blade Extraction Handle */}
            <rect x={52 + i * 18} y="42" width="8" height="4" rx="1" fill="#94a3b8" />
            {/* Activity Micro-LED */}
            <circle cx={56 + i * 18} cy="52" r="1" fill="#10b981" />
          </g>
        ))}

        {/* Top Hydraulic Tank Cover Bar */}
        <rect x="25" y="20" width="190" height="8" rx="2" fill="#334155" stroke="#475569" strokeWidth="1" />

        {/* Hydraulic Hinges */}
        <circle cx="35" cy="24" r="3" fill="#cbd5e1" />
        <circle cx="205" cy="24" r="3" fill="#cbd5e1" />

        {/* Fluid Level Scale Marks */}
        <line x1="190" y1="45" x2="195" y2="45" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
        <line x1="188" y1="58" x2="195" y2="58" stroke="#ffffff" strokeWidth="1.5" opacity="0.8" />
        <line x1="190" y1="71" x2="195" y2="71" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
      </svg>
    </div>
  );
}
