import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Sparkles, ArrowUpRight, ChevronDown, ChevronUp, Cpu } from 'lucide-react';
import { getMatchRationale } from '../../services/rationaleService';
import clsx from 'clsx';

export function RationaleModal({
  isOpen,
  onClose,
  facility,
  supplyTempC = 64,
  flowLps = 28.6,
  capacityMW = 1.20,
}) {
  const [data, setData] = useState(null);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showInputs, setShowInputs] = useState(false);

  useEffect(() => {
    if (!isOpen || !facility) {
      setData(null);
      setDisplayedText('');
      setIsTyping(true);
      setShowInputs(false);
      return;
    }

    let isMounted = true;
    setIsTyping(true);
    setDisplayedText('');

    getMatchRationale(facility, supplyTempC, flowLps, capacityMW).then((res) => {
      if (!isMounted) return;
      setData(res);

      // Simulated streaming typing effect
      let idx = 0;
      const fullText = res.rationale;
      const interval = setInterval(() => {
        if (idx < fullText.length) {
          setDisplayedText(fullText.slice(0, idx + 1));
          idx++;
        } else {
          setIsTyping(false);
          clearInterval(interval);
        }
      }, 14);

      return () => clearInterval(interval);
    });

    return () => {
      isMounted = false;
    };
  }, [isOpen, facility, supplyTempC, flowLps, capacityMW]);

  if (!facility) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      ariaLabel={`AI Thermodynamic Rationale for ${facility.name}`}
    >
      <div className="space-y-6">
        {/* Modal Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-subtle pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-thermal/15 border border-thermal/30 flex items-center justify-center text-thermal">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-tprimary tracking-tight">
                Why this match?
              </h2>
              <p className="text-xs text-tsecondary">
                {facility.name} · {facility.city}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 font-semibold">
              {facility.matchPct}% THERMAL MATCH · HIGH DATA CONFIDENCE
            </span>
          </div>
        </div>

        {/* AI Rationale Streaming Text Block */}
        <div className="bg-card-raised/80 border border-border-subtle rounded-card p-4 sm:p-5 relative">
          <div className="flex items-center gap-2 font-mono text-[10px] text-thermal uppercase tracking-wider mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>AI THERMODYNAMIC SYNTHESIS</span>
            {isTyping && <span className="animate-pulse">● ANALYZING...</span>}
          </div>

          <p className="text-sm text-tprimary leading-relaxed font-sans min-h-[4rem]">
            {displayedText}
            {isTyping && (
              <span className="inline-block w-1.5 h-4 bg-thermal ml-1 animate-pulse align-middle" />
            )}
          </p>
        </div>

        {/* Four Weighted Score Bars */}
        {data && (
          <div className="space-y-3.5">
            <div className="text-xs font-mono text-tmuted uppercase tracking-wider">
              MULTI-FACTOR SCORING WEIGHTS
            </div>

            <div className="grid grid-cols-1 gap-3">
              {data.subscores.map((sub, idx) => (
                <div key={idx} className="space-y-1 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-tsecondary">
                      {sub.label}
                    </span>
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="text-tmuted text-[11px]">{sub.weight}</span>
                      <span className="font-bold text-tprimary tabular-nums">
                        {sub.score}/100
                      </span>
                    </div>
                  </div>

                  {/* Score bar */}
                  <div className="w-full h-2 rounded-full bg-card-raised border border-border-subtle overflow-hidden">
                    <div
                      className="h-full bg-thermal rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${sub.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Boxed Performance Note */}
        <div className="p-3.5 rounded-element bg-amber-500/10 border border-amber-500/25 text-xs text-tsecondary leading-relaxed">
          <span className="font-semibold text-tprimary">Note:</span> A fit score, not a commercial performance guarantee. Estimated pipeline distribution loss is {facility.estimatedLossPct || 7.4}%. Hydraulic parameters must be validated with an on-site physical engineering survey.
        </div>

        {/* Expandable Inputs Section */}
        <div>
          <button
            type="button"
            onClick={() => setShowInputs(!showInputs)}
            className="flex items-center gap-1.5 text-xs font-mono text-thermal hover:text-thermal-hover transition-colors"
          >
            <span>VIEW INPUTS</span>
            {showInputs ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showInputs && data?.inputs && (
            <div className="mt-3 p-4 rounded-card bg-canvas border border-border-subtle text-xs overflow-hidden animate-in fade-in duration-150">
              <table className="w-full text-left font-mono">
                <tbody className="divide-y divide-border-subtle">
                  {Object.entries(data.inputs).map(([key, val]) => (
                    <tr key={key} className="py-1.5">
                      <td className="text-tmuted py-1.5 capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </td>
                      <td className="text-tprimary font-semibold py-1.5 text-right">
                        {val}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer info strip */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-4 border-t border-border-subtle text-[11px] font-mono text-tmuted">
          <div>
            <span>THERMAL MODEL v2.4 · UPDATED 01 NOV · 09:42 UTC</span>
          </div>
          <div>
            <span>Based on facility-supplied operating data</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
