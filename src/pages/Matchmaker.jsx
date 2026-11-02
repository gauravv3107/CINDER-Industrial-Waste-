import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Slider } from '../components/ui/Slider';
import { Checkbox } from '../components/ui/Checkbox';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import { Skeleton } from '../components/ui/Skeleton';
import { LossGauge } from '../components/charts/LossGauge';
import { RationaleModal } from '../components/modals/RationaleModal';
import { HowMatchingWorksModal } from '../components/modals/HowMatchingWorksModal';
import { FacilityDrawer } from '../components/modals/FacilityDrawer';
import { RouteModal } from '../components/modals/RouteModal';
import { useMatch } from '../context/MatchContext';
import { useWorkspace } from '../context/WorkspaceContext';
import {
  HelpCircle,
  BookmarkPlus,
  RefreshCw,
  Sparkles,
  ArrowRight,
  Flame,
  Building,
  Leaf,
  Droplets,
  Landmark,
  Factory,
  GraduationCap,
  ChevronRight,
  MapPin,
  Compass,
} from 'lucide-react';
import clsx from 'clsx';

export function Matchmaker() {
  const { sites } = useWorkspace();
  const {
    selectedSiteId,
    setSelectedSiteId,
    coolingMedium,
    setCoolingMedium,
    supplyTempC,
    setSupplyTempC,
    flowLps,
    setFlowLps,
    maxDistanceKm,
    setMaxDistanceKm,
    continuousSupply,
    setContinuousSupply,
    sortBy,
    setSortBy,
    capacityMW,
    defaultLossPct,
    defaultDeliveredMW,
    rankedFacilities,
    compatibleCount,
    isRefreshing,
    refreshMatches,
    saveCurrentSearch,
  } = useMatch();

  // Modals state
  const [selectedFacilityForRationale, setSelectedFacilityForRationale] = useState(null);
  const [selectedFacilityForDrawer, setSelectedFacilityForDrawer] = useState(null);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);

  // Pagination for facility cards (3 per view)
  const [visibleCount, setVisibleCount] = useState(3);

  const visibleFacilities = rankedFacilities.slice(0, visibleCount);
  const hasMore = visibleCount < rankedFacilities.length;

  const getFacilityIcon = (iconType) => {
    switch (iconType) {
      case 'leaf':
        return <Leaf className="w-5 h-5 text-emerald-400" />;
      case 'droplets':
        return <Droplets className="w-5 h-5 text-sky-400" />;
      case 'factory':
        return <Factory className="w-5 h-5 text-amber-500" />;
      case 'landmark':
        return <Landmark className="w-5 h-5 text-indigo-400" />;
      case 'graduation-cap':
        return <GraduationCap className="w-5 h-5 text-purple-400" />;
      default:
        return <Building className="w-5 h-5 text-thermal" />;
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-150">
      {/* Breadcrumb Header */}
      <div className="flex items-center justify-between border-b border-border-subtle pb-3">
        <div className="flex items-center gap-2 font-mono text-[10px] text-tmuted tracking-widest uppercase">
          <span className="text-tsecondary font-semibold">MARKETPLACE</span>
          <span>/</span>
          <span>THERMAL MATCHMAKER</span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-medium text-tprimary tracking-tight font-sans">
            Your heat has a next destination.
          </h1>
          <p className="text-sm text-tsecondary mt-1">
            Thermodynamic matching engine connecting data center effluent to industrial & municipal district loops.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="secondary"
            size="md"
            onClick={() => setIsHowItWorksOpen(true)}
            icon={HelpCircle}
          >
            How matching works
          </Button>

          <Button
            variant="outline"
            size="md"
            onClick={saveCurrentSearch}
            icon={BookmarkPlus}
          >
            Save search
          </Button>
        </div>
      </div>

      {/* Two Column Layout: Left Parameters (~340px) | Right Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Source Parameters & Loss Gauge */}
        <div className="lg:col-span-4 space-y-6">
          {/* Source Parameters Card */}
          <Card className="space-y-5">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <h2 className="text-sm font-semibold text-tprimary tracking-tight">
                Source parameters
              </h2>
              <span className="micro-label">HYDRAULIC INPUT</span>
            </div>

            {/* Source Facility Select */}
            <Select
              label="Source facility"
              value={selectedSiteId}
              onChange={(e) => setSelectedSiteId(e.target.value)}
              options={sites.map((s) => ({ value: s.id, label: s.facilityName }))}
            />

            {/* Cooling Medium Selector */}
            <Select
              label="Cooling medium technology"
              value={coolingMedium}
              onChange={(e) => setCoolingMedium(e.target.value)}
              options={[
                'Direct-to-chip liquid',
                'Rear-door heat exchanger',
                'Immersion',
                'Air-cooled',
              ]}
            />

            {/* Supply Temperature Slider 35°C–65°C */}
            <Slider
              label="Supply temperature"
              value={supplyTempC}
              onChange={setSupplyTempC}
              min={35}
              max={65}
              step={1}
              unit="°C"
              minLabel="35°C MIN"
              maxLabel="65°C MAX"
            />

            {/* Flow Rate Numeric Input (L/s) */}
            <Input
              label="Flow rate (L/s)"
              type="number"
              min={5}
              max={150}
              step={0.5}
              value={flowLps}
              onChange={(e) => setFlowLps(Number(e.target.value))}
              suffix="L/s"
              helperText="Primary hydronic distribution loop flow"
            />

            {/* Maximum Connection Distance Slider */}
            <Slider
              label="Maximum connection distance"
              value={maxDistanceKm}
              onChange={setMaxDistanceKm}
              min={1}
              max={50}
              step={1}
              unit=" km"
              minLabel="1 km"
              maxLabel="50 km RADIUS"
            />

            {/* Continuous Supply Checkbox */}
            <Checkbox
              label="Continuous supply baseline"
              subLabel="8,760 h / year uninterrupted thermal availability"
              checked={continuousSupply}
              onChange={setContinuousSupply}
            />

            {/* Amber-tinted "Recoverable Thermal Capacity" Panel */}
            <div className="p-4 rounded-element bg-orange-500/10 border border-orange-500/25 space-y-1">
              <div className="flex items-center justify-between">
                <span className="micro-label text-thermal font-semibold">
                  RECOVERABLE THERMAL CAPACITY
                </span>
                <Flame className="w-4 h-4 text-thermal" />
              </div>
              <div className="text-2xl font-bold font-mono text-thermal tabular-nums">
                {capacityMW.toFixed(2)} MW
              </div>
              <p className="text-[11px] text-tmuted leading-tight pt-1">
                Based on 10°C usable temperature drop (<code className="font-mono text-tprimary">Q = m * cp * ΔT</code>).
              </p>
            </div>

            {/* Refresh Matches Primary Button */}
            <Button
              variant="primary"
              size="md"
              className="w-full"
              isLoading={isRefreshing}
              onClick={refreshMatches}
              icon={RefreshCw}
            >
              Refresh matches
            </Button>
          </Card>

          {/* Left Below: "Every degree counts." Card */}
          <Card className="space-y-4">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <h2 className="text-sm font-semibold text-tprimary tracking-tight">
                Every degree counts.
              </h2>
              <span className="micro-label">PIPELINE INTEGRITY</span>
            </div>

            {/* Horizontal Loss Gauge */}
            <LossGauge
              lossPct={defaultLossPct}
              sourceMW={capacityMW}
              deliveredMW={defaultDeliveredMW}
              variant="horizontal"
              showStatus={true}
              footnote="Potomac route estimate · insulated DN150 pipe · 2.4 km. Validate with a site survey."
            />
          </Card>
        </div>

        {/* Right Column: Results & Ranked Cards */}
        <div className="lg:col-span-8 space-y-5">
          {/* Header Row: Match count & Sort select */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-card p-4 rounded-card border border-border-subtle">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-tprimary">
                {compatibleCount} compatible facilities
              </span>
              <span className="text-xs text-tmuted">
                · within {maxDistanceKm} km
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-tmuted whitespace-nowrap">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-card-raised border border-border-subtle rounded-element px-2.5 py-1 text-xs text-tprimary font-medium focus:outline-none focus:border-thermal"
              >
                <option value="fit">Thermodynamic fit</option>
                <option value="distance">Distance (nearest)</option>
                <option value="offtake">Offtake rate ($/MWh)</option>
                <option value="demand">Heat demand (MW)</option>
              </select>
            </div>
          </div>

          {/* Model Disclaimer Bar */}
          <div className="flex items-center justify-between p-3 rounded-card bg-card-raised border border-border-subtle text-xs text-tmuted">
            <p className="text-[11px] leading-relaxed">
              Ranked on temperature fit, usable capacity, pipe loss and demand continuity — not a commercial guarantee.
            </p>
            <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-card border border-border-subtle text-tsecondary font-semibold shrink-0 ml-3">
              MODEL v2.4
            </span>
          </div>

          {/* Skeleton loading simulation */}
          {isRefreshing ? (
            <div className="space-y-4">
              <Skeleton className="h-44 w-full" />
              <Skeleton className="h-44 w-full" />
              <Skeleton className="h-44 w-full" />
            </div>
          ) : rankedFacilities.length === 0 ? (
            /* Empty State */
            <EmptyState
              title={`No facilities within ${maxDistanceKm} km`}
              description="Expand your maximum connection distance slider or increase your coolant supply temperature to discover off-takers across Northern Virginia."
              actionLabel="Expand radius to 25 km"
              onAction={() => setMaxDistanceKm(25)}
            />
          ) : (
            /* Ranked Facility Cards */
            <div className="space-y-4">
              {visibleFacilities.map((facility, index) => {
                const isBestFit = index === 0;

                return (
                  <Card
                    key={facility.id}
                    className={clsx(
                      'relative transition-all duration-200 hover:border-border-strong',
                      isBestFit && 'border-thermal/60 shadow-soft'
                    )}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      {/* Left: Icon Tile + Facility Meta */}
                      <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-card-raised border border-border-subtle flex items-center justify-center shrink-0 mt-0.5">
                          {getFacilityIcon(facility.iconType)}
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-tmuted font-medium">
                              #{index + 1}
                            </span>
                            <h3 className="text-base font-semibold text-tprimary tracking-tight">
                              {facility.name}
                            </h3>
                            {isBestFit && (
                              <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-thermal text-white font-bold shadow-sm">
                                BEST FIT
                              </span>
                            )}
                          </div>

                          <div className="text-xs text-tsecondary flex items-center gap-1.5">
                            <span>{facility.type}</span>
                            <span>·</span>
                            <span>{facility.city}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Large Match % Badge */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 shrink-0">
                        <span className="font-mono text-sm sm:text-base font-bold text-thermal tabular-nums px-3 py-1 rounded-full bg-thermal/15 border border-thermal/25">
                          {facility.matchPct}% THERMAL MATCH
                        </span>
                        <span className="text-[10px] font-mono text-tmuted hidden sm:inline">
                          DATA CONFIDENCE: HIGH
                        </span>
                      </div>
                    </div>

                    {/* Metrics Strip */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-3 rounded-element bg-canvas border border-border-subtle mt-4 text-xs font-mono">
                      <div>
                        <span className="micro-label">DISTANCE</span>
                        <div className="font-semibold text-tprimary mt-0.5">
                          {facility.distanceKm} km
                        </div>
                      </div>
                      <div>
                        <span className="micro-label">HEAT DEMAND</span>
                        <div className="font-semibold text-tprimary mt-0.5">
                          {facility.heatDemandMW} MW
                        </div>
                      </div>
                      <div>
                        <span className="micro-label">INLET REQ.</span>
                        <div className="font-semibold text-tprimary mt-0.5">
                          {facility.inletC}°C
                        </div>
                      </div>
                      <div>
                        <span className="micro-label">EST. LOSS ΔT</span>
                        <div className="font-semibold text-emerald-500 mt-0.5">
                          {facility.estimatedLossPct}%
                        </div>
                      </div>
                      <div>
                        <span className="micro-label">OFFTAKE RATE</span>
                        <div className="font-semibold text-thermal mt-0.5">
                          ${facility.offtakeRatePerMWh}/MWh
                        </div>
                      </div>
                    </div>

                    {/* Tag Chips */}
                    <div className="flex flex-wrap items-center gap-2 mt-4">
                      {facility.tags?.map((tag, i) => (
                        <span
                          key={i}
                          className="text-[11px] px-2.5 py-0.5 rounded-full bg-card-raised border border-border-subtle text-tsecondary font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer Actions: "Why this match?" + "View facility" */}
                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-border-subtle text-xs">
                      <button
                        type="button"
                        onClick={() => setSelectedFacilityForRationale(facility)}
                        className="font-medium text-thermal hover:text-thermal-hover inline-flex items-center gap-1.5 transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Why this match?</span>
                      </button>

                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setSelectedFacilityForDrawer(facility)}
                        iconRight={ChevronRight}
                      >
                        View facility
                      </Button>
                    </div>
                  </Card>
                );
              })}

              {/* Paginate Next Facilities Button */}
              {hasMore && (
                <div className="pt-2 flex justify-center">
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => setVisibleCount((prev) => prev + 3)}
                  >
                    Next 3 facilities ({rankedFacilities.length - visibleCount} remaining)
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Bottom Green Banner: Explore Route */}
          <div className="p-5 rounded-card bg-emerald-500/10 border border-emerald-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-tprimary">
                A 2.4 km connection. A longer life for your heat.
              </h3>
              <p className="text-xs text-tsecondary">
                Insulated right-of-way easement corridor to Potomac District Energy verified.
              </p>
            </div>

            <Button
              variant="primary"
              size="sm"
              className="shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={() => setIsRouteModalOpen(true)}
              iconRight={Compass}
            >
              Explore route
            </Button>
          </div>
        </div>
      </div>

      {/* Rationale Modal */}
      <RationaleModal
        isOpen={Boolean(selectedFacilityForRationale)}
        onClose={() => setSelectedFacilityForRationale(null)}
        facility={selectedFacilityForRationale}
        supplyTempC={supplyTempC}
        flowLps={flowLps}
        capacityMW={capacityMW}
      />

      {/* How Matching Works Modal */}
      <HowMatchingWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
      />

      {/* Facility Drawer */}
      <FacilityDrawer
        isOpen={Boolean(selectedFacilityForDrawer)}
        onClose={() => setSelectedFacilityForDrawer(null)}
        facility={selectedFacilityForDrawer}
        supplyTempC={supplyTempC}
      />

      {/* Route Schematic Modal */}
      <RouteModal
        isOpen={isRouteModalOpen}
        onClose={() => setIsRouteModalOpen(false)}
      />
    </div>
  );
}
