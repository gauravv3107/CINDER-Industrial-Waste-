import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { StatusDot } from '../ui/StatusDot';
import { useMatch } from '../../context/MatchContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useInterval } from '../../hooks/useInterval';
import { Activity, Flame, ArrowRight, Gauge } from 'lucide-react';
import clsx from 'clsx';

export function HeatInMotion({ className = '' }) {
  const { flowLps = 28.6, supplyTempC = 64 } = useMatch();
  const prefersReduced = useReducedMotion();

  // Dynamic temperature jitter ±0.3°C every 2s
  const [jitter, setJitter] = useState(0);
  const [lastUpdated, setLastUpdated] = useState('2s ago');
  const [isTabVisible, setIsTabVisible] = useState(true);

  // Monitor document visibility to pause animation when tab is inactive
  useEffect(() => {
    const handleVisibility = () => {
      setIsTabVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Safe periodic jitter
  useInterval(() => {
    if (!isTabVisible) return;
    const delta = (Math.random() - 0.5) * 0.6; // -0.3 to +0.3
    setJitter(Number(delta.toFixed(1)));
    setLastUpdated('Just now');
  }, 2000);

  // Calculate speed: faster flow = shorter animation duration
  // At 28.6 L/s, duration = 1.4s
  const animDuration = Math.max(0.6, Math.min(3.0, (28.6 / Math.max(flowLps, 5)) * 1.4));

  const tNode1 = (supplyTempC + jitter).toFixed(1);
  const tNode2 = (supplyTempC - 3.0 + jitter * 0.8).toFixed(1);
  const tNode3 = (supplyTempC - 6.0 + jitter * 0.6).toFixed(1);
  const tReturn = (supplyTempC - 10.0 + jitter * 0.5).toFixed(1);

  const shouldAnimate = !prefersReduced && isTabVisible;

  return (
    <Card className={clsx('flex flex-col justify-between overflow-hidden relative', className)}>
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-thermal/10 border border-thermal/20 flex items-center justify-center text-thermal">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-tprimary tracking-tight">
              Heat in motion.
            </h3>
            <span className="micro-label">LIVE FLUID VELOCITY TELEMETRY</span>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px] bg-card-raised px-2.5 py-1 rounded-full border border-border-subtle">
          <StatusDot status="nominal" />
          <span className="text-tsecondary">Live · {lastUpdated}</span>
        </div>
      </div>

      {/* Main Schematic Graphic Area */}
      <div className="bg-canvas border border-border-subtle rounded-card p-4 sm:p-5 my-2 relative select-none">
        {/* Telemetry Flow Badges Top */}
        <div className="flex justify-between items-center text-xs font-mono mb-4 text-tmuted">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-thermal" />
            <span className="text-tprimary font-semibold">{flowLps} L/s SUPPLY</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-emerald-500 font-semibold">1.11 MW DELIVERED</span>
          </div>
        </div>

        {/* 3 Pipeline Nodes + Fluid Loop Vector */}
        <div className="relative py-4">
          <svg
            className="w-full h-28 overflow-visible"
            viewBox="0 0 540 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="pipeHeatGrad" x1="0" y1="0" x2="540" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="50%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#eab308" />
              </linearGradient>
              <linearGradient id="pipeReturnGrad" x1="540" y1="0" x2="0" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
            </defs>

            {/* Top Supply Pipe Tube (Background track) */}
            <path
              d="M 70 30 L 470 30"
              stroke="var(--border-subtle)"
              strokeWidth="10"
              strokeLinecap="round"
            />

            {/* Top Animated Supply Fluid Pulse */}
            <path
              d="M 70 30 L 470 30"
              stroke="url(#pipeHeatGrad)"
              strokeWidth="6"
              strokeDasharray="14 12"
              strokeLinecap="round"
              className={shouldAnimate ? 'animate-fluid-flow' : ''}
              style={{
                animationDuration: `${animDuration}s`,
              }}
            />

            {/* Bottom Return Pipe Tube (Background track) */}
            <path
              d="M 470 70 L 70 70"
              stroke="var(--border-subtle)"
              strokeWidth="8"
              strokeLinecap="round"
            />

            {/* Bottom Animated Return Fluid Pulse */}
            <path
              d="M 470 70 L 70 70"
              stroke="url(#pipeReturnGrad)"
              strokeWidth="4"
              strokeDasharray="10 10"
              strokeLinecap="round"
              className={shouldAnimate ? 'animate-fluid-flow' : ''}
              style={{
                animationDuration: `${animDuration * 1.2}s`,
              }}
            />

            {/* Node 1: ASH-01 AI Compute Source */}
            <g transform="translate(40, 10)">
              <rect x="0" y="0" width="60" height="80" rx="8" fill="var(--bg-card)" stroke="#f97316" strokeWidth="2" />
              <text x="30" y="24" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">
                ASH-01
              </text>
              <text x="30" y="38" textAnchor="middle" fill="var(--text-muted)" fontSize="8" fontFamily="Inter">
                AI COMPUTE
              </text>
              <rect x="10" y="48" width="40" height="20" rx="4" fill="#f97316" fillOpacity="0.15" />
              <text x="30" y="62" textAnchor="middle" fill="#f97316" fontSize="12" fontWeight="bold" fontFamily="JetBrains Mono">
                {tNode1}°C
              </text>
            </g>

            {/* Flow Arrow Mid 1 */}
            <g transform="translate(160, 22)">
              <circle cx="10" cy="8" r="10" fill="var(--bg-card-raised)" stroke="var(--border-subtle)" strokeWidth="1" />
              <path d="M 7 8 L 13 8 M 10 5 L 13 8 L 10 11" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* Node 2: HX-04 Heat Exchanger */}
            <g transform="translate(240, 10)">
              <rect x="0" y="0" width="60" height="80" rx="8" fill="var(--bg-card)" stroke="#fb923c" strokeWidth="2" />
              <text x="30" y="24" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">
                HX-04
              </text>
              <text x="30" y="38" textAnchor="middle" fill="var(--text-muted)" fontSize="8" fontFamily="Inter">
                SUBSTATION
              </text>
              <rect x="10" y="48" width="40" height="20" rx="4" fill="#fb923c" fillOpacity="0.15" />
              <text x="30" y="62" textAnchor="middle" fill="#fb923c" fontSize="12" fontWeight="bold" fontFamily="JetBrains Mono">
                {tNode2}°C
              </text>
            </g>

            {/* Flow Arrow Mid 2 */}
            <g transform="translate(360, 22)">
              <circle cx="10" cy="8" r="10" fill="var(--bg-card-raised)" stroke="var(--border-subtle)" strokeWidth="1" />
              <path d="M 7 8 L 13 8 M 10 5 L 13 8 L 10 11" stroke="#eab308" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* Node 3: Potomac District Loop Off-taker */}
            <g transform="translate(440, 10)">
              <rect x="0" y="0" width="60" height="80" rx="8" fill="var(--bg-card)" stroke="#10b981" strokeWidth="2" />
              <text x="30" y="24" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">
                POTOMAC
              </text>
              <text x="30" y="38" textAnchor="middle" fill="var(--text-muted)" fontSize="8" fontFamily="Inter">
                DISTRICT LOOP
              </text>
              <rect x="10" y="48" width="40" height="20" rx="4" fill="#10b981" fillOpacity="0.15" />
              <text x="30" y="62" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold" fontFamily="JetBrains Mono">
                {tNode3}°C
              </text>
            </g>
          </svg>
        </div>

        {/* Return Line Telemetry Label */}
        <div className="flex justify-between items-center text-[11px] font-mono text-tmuted pt-1">
          <span className="text-sky-500 font-medium">RETURN LOOP {tReturn}°C</span>
          <span>DN150 INSULATED TRUNK · 2.4 KM</span>
        </div>
      </div>

      {/* Telemetry Status Strip Bottom */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-border-subtle text-[11px] font-mono text-tmuted">
        <div className="flex items-center gap-1.5">
          <Gauge className="w-3.5 h-3.5 text-tsecondary" />
          <span>ΔT 18.0°C · PRESSURE 3.2 BAR</span>
        </div>
        <div className="text-emerald-500 font-semibold tracking-wide">
          VALVES OPEN — STABLE
        </div>
      </div>
    </Card>
  );
}
