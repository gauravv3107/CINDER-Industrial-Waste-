import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { MapPin, Navigation, Compass, Layers } from 'lucide-react';

export function RouteModal({ isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Potomac Interconnection Route Schematic"
      subtitle="Insulated hydronic pipe corridor between ASH-01 Ashburn and Potomac District Energy"
      size="lg"
      ariaLabel="Route schematic modal"
    >
      <div className="space-y-5 text-xs">
        {/* SVG Route Schematic Map */}
        <div className="bg-slate-950 border border-border-strong rounded-panel p-6 relative overflow-hidden select-none">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:16px_16px]" />

          <svg
            className="w-full h-64 overflow-visible"
            viewBox="0 0 600 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Topography elevation curves */}
            <path
              d="M 20 180 Q 150 120 300 160 T 580 140"
              stroke="#334155"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <path
              d="M 20 210 Q 200 170 380 200 T 580 190"
              stroke="#1e293b"
              strokeWidth="1"
            />

            {/* Pipeline corridor path (glow + core) */}
            <path
              d="M 80 80 C 180 80, 240 160, 360 140 S 460 70, 520 70"
              stroke="#f97316"
              strokeWidth="6"
              strokeLinecap="round"
              strokeOpacity="0.3"
            />
            <path
              d="M 80 80 C 180 80, 240 160, 360 140 S 460 70, 520 70"
              stroke="#f97316"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="8 6"
              className="animate-fluid-flow"
              style={{ animationDuration: '2s' }}
            />

            {/* Roadway reference marker */}
            <line x1="280" y1="20" x2="310" y2="220" stroke="#475569" strokeWidth="2" strokeDasharray="3 3" />
            <text x="315" y="210" fill="#64748b" fontSize="9" fontFamily="JetBrains Mono">
              ROUTE 28 UTILITY CORRIDOR
            </text>

            {/* Waypoint 1: Equinix ASH-01 */}
            <g transform="translate(80, 80)">
              <circle cx="0" cy="0" r="14" fill="#0f172a" stroke="#f97316" strokeWidth="2" />
              <circle cx="0" cy="0" r="5" fill="#f97316" />
              <rect x="-60" y="-45" width="120" height="28" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1" />
              <text x="0" y="-32" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">
                ASH-01 COMPUTE
              </text>
              <text x="0" y="-21" textAnchor="middle" fill="#f97316" fontSize="8" fontFamily="JetBrains Mono">
                64°C SUPPLY · 0.0 KM
              </text>
            </g>

            {/* Waypoint Mid: Valve Substation 02 */}
            <g transform="translate(330, 145)">
              <circle cx="0" cy="0" r="8" fill="#0f172a" stroke="#eab308" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="3" fill="#eab308" />
              <rect x="-45" y="16" width="90" height="22" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1" />
              <text x="0" y="28" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="JetBrains Mono">
                ISOLATION VALVE #2
              </text>
              <text x="0" y="36" textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="JetBrains Mono">
                PRESSURE 3.4 BAR
              </text>
            </g>

            {/* Waypoint 2: Potomac District Loop */}
            <g transform="translate(520, 70)">
              <circle cx="0" cy="0" r="14" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
              <circle cx="0" cy="0" r="5" fill="#10b981" />
              <rect x="-65" y="-45" width="130" height="28" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1" />
              <text x="0" y="-32" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">
                POTOMAC DISTRICT
              </text>
              <text x="0" y="-21" textAnchor="middle" fill="#10b981" fontSize="8" fontFamily="JetBrains Mono">
                58°C INLET · 2.4 KM
              </text>
            </g>
          </svg>
        </div>

        {/* Route Details Box */}
        <div className="grid grid-cols-3 gap-3 p-3.5 rounded-card bg-card-raised border border-border-subtle font-mono text-[11px]">
          <div>
            <span className="text-tmuted">CORRIDOR LENGTH:</span>
            <div className="text-tprimary font-bold text-sm mt-0.5">2.4 km</div>
          </div>
          <div>
            <span className="text-tmuted">PIPE SPECIFICATION:</span>
            <div className="text-tprimary font-bold text-sm mt-0.5">DN150 Polyurethane</div>
          </div>
          <div>
            <span className="text-tmuted">ESTIMATED THERMAL LOSS:</span>
            <div className="text-emerald-500 font-bold text-sm mt-0.5">7.4% (0.09 MW)</div>
          </div>
        </div>

        <p className="text-[11px] text-tmuted leading-relaxed">
          The proposed pipeline utilizes existing municipal right-of-way easements along the Route 28 transportation corridor, minimizing open-trench civic disruption and reducing permitting lead time to under 4 weeks.
        </p>

        <div className="flex justify-end pt-2 border-t border-border-subtle">
          <Button variant="primary" size="sm" onClick={onClose}>
            Close Route View
          </Button>
        </div>
      </div>
    </Modal>
  );
}
