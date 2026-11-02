import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { KpiCard } from '../components/widgets/KpiCard';
import { CarbonCard } from '../components/widgets/CarbonCard';
import { HeatInMotion } from '../components/widgets/HeatInMotion';
import { PipelineTable } from '../components/widgets/PipelineTable';
import { ThermalAreaChart } from '../components/charts/ThermalAreaChart';
import { CarbonCertificateModal } from '../components/modals/CarbonCertificateModal';
import { KPI_DATA_BY_RANGE } from '../data/kpis';
import { INITIAL_PIPELINE_FEED } from '../data/timeseries';
import { exportExecutiveCsvReport } from '../utils/download';
import { formatUtcTime } from '../utils/format';
import { useInterval } from '../hooks/useInterval';
import { useToast } from '../context/ToastContext';
import {
  Download,
  Flame,
  Calendar,
  Layers,
  ChevronDown,
  Activity,
  Check,
  TrendingUp,
  Cpu,
} from 'lucide-react';
import clsx from 'clsx';

export function Dashboard() {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [dateRange, setDateRange] = useState('30d'); // '7d' | '30d' | '90d'
  const [isRangeMenuOpen, setIsRangeMenuOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [syncedTime, setSyncedTime] = useState(() => formatUtcTime());

  // Live updating clock
  useInterval(() => {
    setSyncedTime(formatUtcTime());
  }, 1000);

  const kpis = KPI_DATA_BY_RANGE[dateRange] || KPI_DATA_BY_RANGE['30d'];

  const handleExport = () => {
    exportExecutiveCsvReport(
      {
        thermalRecapturedMWh: kpis.thermalRecaptured.value,
        co2AvoidedTonnes: kpis.co2Avoided.value,
        activeContracts: kpis.activeTrades.value,
        hardwareSavedUSD: kpis.hardwareSaved.value * 1000,
      },
      INITIAL_PIPELINE_FEED
    );
    addToast('Executive performance CSV report generated and downloaded', 'success');
  };

  const rangeOptions = [
    { id: '7d', label: 'Last 7 days (25 Oct – 31 Oct 2026)' },
    { id: '30d', label: 'Last 30 days (02 Oct – 31 Oct 2026)' },
    { id: '90d', label: 'Last 90 days (01 Aug – 31 Oct 2026)' },
  ];

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-150">
      {/* Breadcrumb + Live UTC Clock Sync Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-subtle pb-3">
        <div className="flex items-center gap-2 font-mono text-[10px] text-tmuted tracking-widest uppercase">
          <span className="text-tsecondary font-semibold">WORKSPACE</span>
          <span>/</span>
          <span>EXECUTIVE OVERVIEW</span>
        </div>

        <div className="font-mono text-[10px] text-tmuted flex items-center gap-1.5 self-start sm:self-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>SYNCED {syncedTime}</span>
        </div>
      </div>

      {/* Page Header Hero: H1 + Subtitle + Action Buttons */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-medium text-tprimary tracking-tight font-sans">
            A better use for every degree.
          </h1>
          <p className="text-sm text-tsecondary mt-1 max-w-2xl">
            Your energy, assets and impact — connected across the Northern Virginia network.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="secondary"
            size="md"
            onClick={handleExport}
            icon={Download}
          >
            Export report
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/matchmaker')}
            icon={Flame}
          >
            Find a thermal match
          </Button>
        </div>
      </div>

      {/* Sub-Header Bar: Network Performance + Date Range Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold text-tprimary">
            Network performance
          </h2>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            18 facilities online
          </span>
        </div>

        {/* Date Range Selector Pill with Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsRangeMenuOpen(!isRangeMenuOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-element bg-card border border-border-subtle hover:border-border-strong text-xs font-mono text-tprimary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-thermal"
          >
            <Calendar className="w-3.5 h-3.5 text-thermal" />
            <span>{kpis.rangeLabel}</span>
            <ChevronDown className="w-3.5 h-3.5 text-tmuted" />
          </button>

          {isRangeMenuOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-card border border-border-strong rounded-card shadow-xl z-30 p-1.5 animate-in fade-in zoom-in-95 duration-100 text-xs">
              <div className="px-3 py-1.5 text-[10px] font-mono uppercase text-tmuted border-b border-border-subtle mb-1">
                SELECT REPORTING PERIOD
              </div>
              <div className="space-y-0.5">
                {rangeOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setDateRange(opt.id);
                      setIsRangeMenuOpen(false);
                      addToast(`Reporting window updated: ${opt.label}`, 'info');
                    }}
                    className={clsx(
                      'w-full flex items-center justify-between px-3 py-2 rounded-element text-left transition-colors',
                      dateRange === opt.id
                        ? 'bg-card-raised text-thermal font-semibold'
                        : 'hover:bg-card-raised text-tprimary'
                    )}
                  >
                    <span>{opt.label}</span>
                    {dateRange === opt.id && <Check className="w-3.5 h-3.5 text-thermal" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4 Hero KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <KpiCard
          label="THERMAL ENERGY RECAPTURED"
          icon={Flame}
          value={kpis.thermalRecaptured.value}
          unit={kpis.thermalRecaptured.unit}
          delta={kpis.thermalRecaptured.delta}
          deltaText={kpis.thermalRecaptured.deltaText}
          isPositive={kpis.thermalRecaptured.isPositive}
          sparkline={kpis.thermalRecaptured.sparkline}
          accent="thermal"
        />

        <KpiCard
          label="CO₂E AVOIDED"
          icon={TrendingUp}
          value={kpis.co2Avoided.value}
          unit={kpis.co2Avoided.unit}
          delta={kpis.co2Avoided.delta}
          deltaText={kpis.co2Avoided.deltaText}
          isPositive={kpis.co2Avoided.isPositive}
          sparkline={kpis.co2Avoided.sparkline}
          accent="sustainability"
          decimals={1}
        />

        <KpiCard
          label="ACTIVE THERMAL TRADES"
          icon={Activity}
          value={kpis.activeTrades.value}
          unit={kpis.activeTrades.unit}
          delta={kpis.activeTrades.delta}
          deltaText={kpis.activeTrades.deltaText}
          isPositive={kpis.activeTrades.isPositive}
          sparkline={kpis.activeTrades.sparkline}
          accent="thermal"
        />

        <KpiCard
          label="HARDWARE VALUE SAVED"
          icon={Cpu}
          value={kpis.hardwareSaved.value}
          prefix="$"
          unit="k"
          delta={kpis.hardwareSaved.delta}
          deltaText={kpis.hardwareSaved.deltaText}
          isPositive={kpis.hardwareSaved.isPositive}
          sparkline={kpis.hardwareSaved.sparkline}
          accent="sustainability"
          decimals={1}
        />
      </div>

      {/* Main Chart + Carbon Side Card (2/3 and 1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 hover:border-border-strong transition-all duration-200">
          <ThermalAreaChart
            activeRange={dateRange}
            onRangeChange={(r) => setDateRange(r)}
          />
        </Card>

        <div className="lg:col-span-1">
          <CarbonCard onOpenCertificate={() => setIsCertModalOpen(true)} />
        </div>
      </div>

      {/* Bottom Row: Heat In Motion (Fluid Visualizer) + Pipeline Activity Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HeatInMotion />
        <PipelineTable />
      </div>

      {/* EPA Carbon Certificate Modal */}
      <CarbonCertificateModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
      />
    </div>
  );
}
