import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { CARBON_METRICS } from '../../data/carbon';
import { exportCertificateHtml } from '../../utils/download';
import { useToast } from '../../context/ToastContext';
import { Award, Download, AlertTriangle, FileCode, ShieldAlert } from 'lucide-react';

export function CarbonCertificateModal({ isOpen, onClose }) {
  const { addToast } = useToast();

  const handleDownload = () => {
    exportCertificateHtml({
      co2Avoided: CARBON_METRICS.monthlyCo2AvoidedTonnes,
      thermalRecaptured: CARBON_METRICS.monthlyThermalRecapturedMWh.toLocaleString(),
    });
    addToast('Downloaded illustrative sample certificate (HTML)', 'success');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      ariaLabel="EPA Carbon Certificate Sample Preview"
    >
      <div className="space-y-6">
        {/* Warning Bar */}
        <div className="bg-amber-500/15 border border-amber-500/30 rounded-element p-3.5 flex items-start gap-3 text-xs text-amber-500 dark:text-amber-400">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold">Illustrative sample only.</span> Not issued, endorsed, or validated by the U.S. Environmental Protection Agency (EPA). This artifact demonstrates future carbon accounting compliance formats.
          </div>
        </div>

        {/* Formal Certificate Certificate Container */}
        <div className="border-2 border-border-strong rounded-panel p-6 sm:p-8 bg-card-raised shadow-inner space-y-6 relative overflow-hidden">
          {/* Watermark */}
          <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none select-none">
            <Award className="w-64 h-64 text-tprimary" />
          </div>

          {/* Certificate Header */}
          <div className="flex items-center justify-between border-b border-border-subtle pb-5">
            <div>
              <div className="text-[10px] font-mono tracking-widest text-thermal uppercase">
                CINDER IMPACT RECORD
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif text-tprimary mt-1 tracking-tight font-medium">
                A measurable second life for heat.
              </h1>
              <p className="text-xs font-mono text-tmuted mt-1">
                Northern Virginia Network · 18 Participating Facilities
              </p>
            </div>

            <span className="font-mono text-[10px] px-3 py-1 rounded-full bg-card border border-border-subtle text-tmuted uppercase tracking-wider font-semibold">
              SAMPLE · NON-OFFICIAL
            </span>
          </div>

          {/* Two Big Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-2 border-b border-border-subtle pb-6">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-bold font-mono text-emerald-500 tabular-nums">
                {CARBON_METRICS.monthlyCo2AvoidedTonnes}
              </div>
              <div className="text-xs uppercase font-mono text-tmuted">
                tonnes CO₂e avoided (estimated)
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-bold font-mono text-thermal tabular-nums">
                {CARBON_METRICS.monthlyThermalRecapturedMWh.toLocaleString()}
              </div>
              <div className="text-xs uppercase font-mono text-tmuted">
                MWh thermal energy recaptured
              </div>
            </div>
          </div>

          {/* Detailed Calculation Table */}
          <div className="overflow-x-auto select-none">
            <table className="w-full text-xs font-mono">
              <tbody className="divide-y divide-border-subtle/60">
                <tr>
                  <td className="py-2.5 text-tmuted">Reporting Period</td>
                  <td className="py-2.5 text-right font-medium text-tprimary">
                    {CARBON_METRICS.reportingPeriod}
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 text-tmuted">Sample Reference ID</td>
                  <td className="py-2.5 text-right font-medium text-tprimary">
                    {CARBON_METRICS.sampleReference}
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 text-tmuted">Scenario Emission Factor</td>
                  <td className="py-2.5 text-right font-medium text-tprimary">
                    {CARBON_METRICS.emissionFactorPerMWh.toFixed(3)} tCO₂e / MWh displaced
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 text-tmuted">Calculation Worksheet</td>
                  <td className="py-2.5 text-right font-semibold text-emerald-500">
                    1,248 MWh × 0.390 = {CARBON_METRICS.monthlyCo2AvoidedTonnesExact} tCO₂e
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 text-tmuted">Equivalence Benchmark</td>
                  <td className="py-2.5 text-right font-medium text-tprimary">
                    {CARBON_METRICS.carsEquivalent} passenger cars removed for 1 year
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Meter Log & Worksheet Row */}
          <div className="flex items-center justify-between p-3 rounded-element bg-card border border-border-subtle text-xs">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-thermal" />
              <span className="font-mono text-tsecondary">
                Sample meter log + calculation worksheet
              </span>
            </div>
            <span className="font-mono text-[10px] text-tmuted">2 FILES VERIFIED</span>
          </div>

          {/* Legal Footer */}
          <div className="text-[10px] text-tmuted leading-relaxed pt-2 border-t border-border-subtle font-mono">
            Generated by CINDER Thermal Marketplace Engine v2.4. Intended exclusively for academic demonstration and system evaluation. Not valid for federal regulatory tax credits or formal EPA compliance filings.
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleDownload}
            icon={Download}
          >
            Download sample (HTML)
          </Button>
        </div>
      </div>
    </Modal>
  );
}
