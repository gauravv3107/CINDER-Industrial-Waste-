import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Cpu, Thermometer, Compass, Clock, Zap } from 'lucide-react';

export function HowMatchingWorksModal({ isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="How Thermodynamic Matching Works"
      subtitle="Engineering methodology powering the CINDER Matchmaker Model v2.4"
      size="lg"
      ariaLabel="How Thermodynamic Matching Works"
    >
      <div className="space-y-5 text-xs">
        {/* Intro */}
        <p className="text-tsecondary leading-relaxed text-sm">
          Unlike traditional energy brokering, low-grade data center waste heat (35–65°C) cannot travel long distances economically without substantial thermodynamic distribution losses. CINDER uses a multi-factor physics model to evaluate off-taker viability before commercial engagement.
        </p>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="p-4 rounded-card bg-card-raised border border-border-subtle space-y-2">
            <div className="flex items-center gap-2 text-thermal font-semibold">
              <Thermometer className="w-4 h-4" />
              <span>Temperature Delta Fit (48% weight)</span>
            </div>
            <p className="text-tmuted leading-relaxed text-[11px]">
              Evaluates if your data center's coolant supply temp exceeds the off-taker's required hydronic inlet by at least 2–6°C. If supply is below inlet, supplementary heat pump lift is factored into the score.
            </p>
          </div>

          <div className="p-4 rounded-card bg-card-raised border border-border-subtle space-y-2">
            <div className="flex items-center gap-2 text-sky-400 font-semibold">
              <Compass className="w-4 h-4" />
              <span>Pipeline Distance & Loss (25% weight)</span>
            </div>
            <p className="text-tmuted leading-relaxed text-[11px]">
              Computes thermodynamic heat loss based on distance in kilometers, pipe insulation class (DN150 pre-insulated polyurethane), and ambient soil temperatures (~15°C baseline).
            </p>
          </div>

          <div className="p-4 rounded-card bg-card-raised border border-border-subtle space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <Clock className="w-4 h-4" />
              <span>Demand Continuity (20% weight)</span>
            </div>
            <p className="text-tmuted leading-relaxed text-[11px]">
              Rewards continuous, 24/7/365 baseload consumers (district loops, wastewater digesters, hospital clinics) over highly seasonal or batch-oriented industrial processes.
            </p>
          </div>

          <div className="p-4 rounded-card bg-card-raised border border-border-subtle space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-semibold">
              <Zap className="w-4 h-4" />
              <span>Capacity Alignment (15% weight)</span>
            </div>
            <p className="text-tmuted leading-relaxed text-[11px]">
              Calculates mass flow rate: <code className="font-mono text-tprimary">Q = m * cp * ΔT</code>. Penalizes mismatches where the off-taker requires significantly more or less than your available thermal output.
            </p>
          </div>
        </div>

        {/* Formula Box */}
        <div className="p-4 rounded-element bg-canvas border border-border-subtle space-y-2 font-mono text-[11px]">
          <div className="text-tmuted uppercase">CORE THERMODYNAMIC EQUATION:</div>
          <div className="text-thermal font-bold text-sm">
            Q_dot (MW) = mass_flow (L/s) × 4.184 kJ/(kg·K) × ΔT_usable (10°C) / 1000
          </div>
          <div className="text-tmuted">
            For defaults (28.6 L/s @ 10°C drop) = 1.20 MW thermal capacity.
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-border-subtle">
          <Button variant="primary" size="sm" onClick={onClose}>
            Understood
          </Button>
        </div>
      </div>
    </Modal>
  );
}
