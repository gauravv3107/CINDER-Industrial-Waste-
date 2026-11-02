import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useJobs } from '../../context/JobsContext';
import { useToast } from '../../context/ToastContext';
import { CheckCircle2, Clock, MapPin, DollarSign, Send, AlertCircle } from 'lucide-react';

export function ContractModal({ isOpen, onClose, contract }) {
  const { userProfile } = useJobs();
  const { addToast } = useToast();
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  React.useEffect(() => {
    setHasApplied(false);
  }, [contract]);

  if (!contract) return null;

  const handleApply = () => {
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      setHasApplied(true);
      addToast(`Application submitted for ${contract.title} at ${contract.company}!`, 'success');
    }, 450);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      ariaLabel={`Contract details for ${contract.title}`}
    >
      <div className="space-y-5 text-xs">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-subtle pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[10px] text-tmuted">{contract.id}</span>
              {contract.urgent && <Badge variant="urgent" size="xs" dot={true}>Urgent</Badge>}
            </div>
            <h2 className="text-base sm:text-lg font-semibold text-tprimary tracking-tight">
              {contract.title}
            </h2>
            <div className="flex items-center gap-3 text-tsecondary mt-1">
              <span className="font-medium">{contract.company}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-tmuted" />
                {contract.city} ({contract.distanceKm} km)
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-xl font-bold font-mono text-emerald-500 tabular-nums">
              ${contract.rateMin}–${contract.rateMax}/hr
            </span>
            <span className="text-[10px] font-mono text-tmuted mt-0.5">
              {contract.durationWeeks} WEEKS · {contract.hoursPerWeek} HRS/WK
            </span>
          </div>
        </div>

        {/* AI Skill Match Breakdown Banner */}
        <div className="p-4 rounded-card bg-card-raised border border-border-subtle space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-semibold text-tprimary">
              AI RESUME SKILL COMPATIBILITY: {contract.matchPct}%
            </span>
            <span className="text-[10px] font-mono text-emerald-500 font-semibold">
              {contract.skillNotice}
            </span>
          </div>

          {/* Matched Required Skills */}
          <div>
            <div className="micro-label mb-1.5">Matched Required Skills ({contract.matchedRequired?.length || 0})</div>
            <div className="flex flex-wrap gap-1.5">
              {contract.matchedRequired?.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Missing Required Skills */}
          {contract.missingRequired?.length > 0 && (
            <div>
              <div className="micro-label mb-1.5 text-amber-500">Skills to Confirm ({contract.missingRequired.length})</div>
              <div className="flex flex-wrap gap-1.5">
                {contract.missingRequired.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] bg-amber-500/15 text-amber-400 border border-amber-500/25"
                  >
                    <AlertCircle className="w-3 h-3 text-amber-500" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h3 className="font-semibold text-tprimary text-sm">Contract Scope</h3>
          <p className="text-tsecondary leading-relaxed">
            {contract.description}
          </p>
        </div>

        {/* Key Responsibilities */}
        {contract.responsibilities?.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold text-tprimary text-sm">Key Responsibilities</h3>
            <ul className="space-y-1.5 text-tsecondary">
              {contract.responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-thermal font-mono font-bold mt-0.5">•</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
          <div className="text-[11px] font-mono text-tmuted">
            POSTED: {contract.postedAgo}
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
            {hasApplied ? (
              <Button variant="secondary" size="sm" disabled={true} icon={CheckCircle2}>
                Applied
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                isLoading={isApplying}
                onClick={handleApply}
                icon={Send}
              >
                Submit Application
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
