import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Leaf, Award, Car, FileText } from 'lucide-react';
import { CARBON_METRICS } from '../../data/carbon';

export function CarbonCard({ onOpenCertificate }) {
  return (
    <Card className="flex flex-col justify-between h-full hover:border-border-strong transition-all duration-200">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
              <Leaf className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-tprimary tracking-tight">
                Lower carbon. Lasting value.
              </h3>
              <span className="micro-label">EMISSION OFFSET VALIDATION</span>
            </div>
          </div>
          <Award className="w-5 h-5 text-emerald-500/80" />
        </div>

        {/* Big Number */}
        <div className="my-3">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl md:text-5xl font-bold font-mono text-emerald-500 tabular-nums tracking-tight">
              {CARBON_METRICS.monthlyCo2AvoidedTonnes}
            </span>
            <span className="text-xs font-semibold text-tsecondary uppercase tracking-wider font-mono">
              tonnes CO₂e
            </span>
          </div>
          <p className="text-xs text-tmuted mt-1">
            avoided across 18 participating facilities this month
          </p>
        </div>

        {/* Callout Box: 113 cars off the road */}
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-element p-3.5 my-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
            <Car className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <div className="font-semibold text-tprimary">
              Equivalent to {CARBON_METRICS.carsEquivalent} cars off the road for a year
            </div>
            <div className="text-[11px] text-tsecondary mt-0.5">
              Based on EPA GHG Equivalencies Calculator (4.3 tCO₂e/vehicle/yr).
            </div>
          </div>
        </div>

        {/* Methodology Footnote */}
        <div className="text-[11px] text-tmuted leading-relaxed border-t border-border-subtle pt-3">
          Methodology: {CARBON_METRICS.methodologyFootnote}
        </div>
      </div>

      {/* Certificate Box */}
      <div className="mt-5 pt-4 border-t border-border-subtle">
        <div className="flex items-center justify-between text-xs mb-3">
          <div className="flex items-center gap-1.5 text-tmuted font-mono text-[10px]">
            <FileText className="w-3.5 h-3.5 text-thermal" />
            <span>CARBON IMPACT CERTIFICATE</span>
          </div>
          <span className="text-[9px] uppercase tracking-wider font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
            DEMO ARTIFACT
          </span>
        </div>

        <p className="text-[11px] text-tmuted mb-3">
          Illustrative impact record for October 2026. Non-official sample for evaluation.
        </p>

        <Button
          variant="secondary"
          size="sm"
          className="w-full justify-between group"
          onClick={onOpenCertificate}
          iconRight={FileText}
        >
          <span>View certificate preview</span>
        </Button>
      </div>
    </Card>
  );
}
