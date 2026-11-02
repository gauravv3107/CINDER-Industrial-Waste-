import React from 'react';

export function ServerSvg({ className = 'w-full h-full' }) {
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
          <linearGradient id="chassisGrad" x1="0" y1="0" x2="240" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#334155" />
            <stop offset="1" stopColor="#1e293b" />
          </linearGradient>
        </defs>

        {/* 4U Server Enclosure */}
        <rect x="25" y="25" width="190" height="90" rx="6" fill="url(#chassisGrad)" stroke="#64748b" strokeWidth="1.5" />

        {/* Rack Mounting Ears & Screw Holes */}
        <rect x="15" y="25" width="10" height="90" rx="2" fill="#1e293b" stroke="#475569" strokeWidth="1" />
        <circle cx="20" cy="35" r="2.5" fill="#0f172a" />
        <circle cx="20" cy="70" r="2.5" fill="#0f172a" />
        <circle cx="20" cy="105" r="2.5" fill="#0f172a" />

        <rect x="215" y="25" width="10" height="90" rx="2" fill="#1e293b" stroke="#475569" strokeWidth="1" />
        <circle cx="220" cy="35" r="2.5" fill="#0f172a" />
        <circle cx="220" cy="70" r="2.5" fill="#0f172a" />
        <circle cx="220" cy="105" r="2.5" fill="#0f172a" />

        {/* Front Drive Bays / Hot-Swap Caddies (Top Row) */}
        {Array.from({ length: 6 }).map((_, i) => (
          <g key={i}>
            <rect
              x={35 + i * 27}
              y="35"
              width="24"
              height="32"
              rx="2"
              fill="#0f172a"
              stroke="#475569"
              strokeWidth="1"
            />
            {/* Latch */}
            <rect x={38 + i * 27} y="40" width="18" height="4" rx="1" fill="#334155" />
            {/* Drive Activity LED */}
            <circle cx={40 + i * 27} cy="58" r="1.5" fill={i % 2 === 0 ? '#10b981' : '#f97316'} />
          </g>
        ))}

        {/* Front Air Intake Honeycomb Mesh Plenum */}
        <rect x="35" y="75" width="135" height="30" rx="3" fill="#0f172a" stroke="#475569" strokeWidth="1" />
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1={42 + i * 11}
            y1="78"
            x2={42 + i * 11}
            y2="102"
            stroke="#334155"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
        ))}

        {/* Control Panel / Power / Status Button Cluster */}
        <rect x="178" y="75" width="30" height="30" rx="3" fill="#0f172a" stroke="#475569" strokeWidth="1" />
        <circle cx="193" cy="84" r="3.5" fill="#334155" stroke="#f97316" strokeWidth="1" />
        <circle cx="186" cy="95" r="1.5" fill="#10b981" />
        <circle cx="193" cy="95" r="1.5" fill="#38bdf8" />
        <circle cx="200" cy="95" r="1.5" fill="#f59e0b" />
      </svg>
    </div>
  );
}
