import React, { useState } from 'react';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';
import { LossGauge } from '../charts/LossGauge';
import { useToast } from '../../context/ToastContext';
import {
  MapPin,
  Building,
  Thermometer,
  Zap,
  Clock,
  Send,
  CheckCircle2,
  PhoneCall,
  GitCommit,
} from 'lucide-react';

export function FacilityDrawer({ isOpen, onClose, facility, supplyTempC = 64 }) {
  const { addToast } = useToast();
  const [requested, setRequested] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    setRequested(false);
  }, [facility]);

  if (!facility) return null;

  const handleRequestIntro = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setRequested(true);
      addToast(`Introduction request transmitted to ${facility.name} operations!`, 'success');
    }, 450);
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={facility.name}
      subtitle={`${facility.type} · ${facility.city}`}
      width="lg"
      ariaLabel={`Facility details for ${facility.name}`}
    >
      <div className="space-y-6 text-xs">
        {/* Top Header Card with Radial Loss Gauge */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-card bg-card-raised border border-border-subtle items-center">
          <div className="sm:col-span-2 space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-thermal text-white font-semibold">
                {facility.matchPct}% MATCH
              </span>
              <span className="font-mono text-xs text-tmuted">
                {facility.distanceKm} km away
              </span>
            </div>
            <h3 className="text-base font-semibold text-tprimary">
              Thermodynamic Suitability
            </h3>
            <p className="text-tmuted text-[11px] leading-relaxed">
              {facility.summary}
            </p>
          </div>

          {/* Radial Loss Ring Variant (§6.1) */}
          <div className="flex justify-center border-t sm:border-t-0 sm:border-l border-border-subtle pt-4 sm:pt-0 sm:pl-4">
            <LossGauge
              variant="radial"
              lossPct={facility.estimatedLossPct || 7.4}
              showStatus={true}
            />
          </div>
        </div>

        {/* Operating Specifications Grid */}
        <div className="space-y-3">
          <h4 className="font-mono text-xs text-tmuted uppercase tracking-wider">
            FACILITY OPERATING METRICS
          </h4>

          <div className="grid grid-cols-2 gap-3 font-mono">
            <div className="p-3.5 rounded-element bg-canvas border border-border-subtle space-y-1">
              <span className="text-[10px] text-tmuted uppercase flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-thermal" />
                Inlet Temperature
              </span>
              <div className="text-base font-bold text-tprimary">
                {facility.inletC}°C Required
              </div>
              <div className="text-[10px] text-emerald-500 font-sans">
                Supply: {supplyTempC}°C (ΔT +{supplyTempC - facility.inletC}°C)
              </div>
            </div>

            <div className="p-3.5 rounded-element bg-canvas border border-border-subtle space-y-1">
              <span className="text-[10px] text-tmuted uppercase flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                Heat Demand Capacity
              </span>
              <div className="text-base font-bold text-tprimary">
                {facility.heatDemandMW} MW
              </div>
              <div className="text-[10px] text-tmuted font-sans">
                Max flow: {facility.flowCapacityLps || 30} L/s
              </div>
            </div>

            <div className="p-3.5 rounded-element bg-canvas border border-border-subtle space-y-1">
              <span className="text-[10px] text-tmuted uppercase flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                Continuity Profile
              </span>
              <div className="text-base font-bold text-tprimary">
                {facility.continuityPct || 94}% Baseload
              </div>
              <div className="text-[10px] text-tmuted font-sans">
                {facility.operatingProfile}
              </div>
            </div>

            <div className="p-3.5 rounded-element bg-canvas border border-border-subtle space-y-1">
              <span className="text-[10px] text-tmuted uppercase flex items-center gap-1">
                <GitCommit className="w-3.5 h-3.5 text-emerald-500" />
                Offtake Rate
              </span>
              <div className="text-base font-bold text-emerald-500">
                ${facility.offtakeRatePerMWh}/MWh
              </div>
              <div className="text-[10px] text-tmuted font-sans">
                Standard long-term PPA
              </div>
            </div>
          </div>
        </div>

        {/* Pipeline Corridor Notes */}
        <div className="space-y-2 p-4 rounded-card bg-card border border-border-subtle">
          <h4 className="font-semibold text-tprimary">Pipeline Right-of-Way Corridor</h4>
          <p className="text-tsecondary leading-relaxed">
            {facility.pipeCorridor}
          </p>
          <div className="text-[11px] font-mono text-tmuted pt-1">
            ESTIMATED INTERCONNECTION LEAD TIME: {facility.leadTimeWeeks || 4} WEEKS
          </div>
        </div>

        {/* Facility Contact Rep */}
        <div className="p-4 rounded-card bg-card-raised border border-border-subtle flex items-center justify-between">
          <div>
            <div className="micro-label">PRIMARY FACILITY CONTACT</div>
            <div className="font-semibold text-tprimary text-sm mt-0.5">
              {facility.contactPerson || 'Site Facility Director'}
            </div>
            <div className="text-tmuted text-[11px] mt-0.5">
              Authorized signatory for hydronic interconnections
            </div>
          </div>
          <PhoneCall className="w-5 h-5 text-tmuted" />
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-border-subtle flex items-center justify-end gap-3">
          <Button variant="outline" size="sm" onClick={onClose}>
            Back
          </Button>

          {requested ? (
            <Button variant="secondary" size="sm" disabled icon={CheckCircle2}>
              Introduction Requested
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              isLoading={isSubmitting}
              onClick={handleRequestIntro}
              icon={Send}
            >
              Request Commercial Introduction
            </Button>
          )}
        </div>
      </div>
    </Drawer>
  );
}
