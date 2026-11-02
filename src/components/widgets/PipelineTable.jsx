import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { INITIAL_PIPELINE_FEED, ROTATING_PIPELINE_EVENTS } from '../../data/timeseries';
import { useInterval } from '../../hooks/useInterval';
import { Activity, ArrowUpRight, Zap, Info } from 'lucide-react';
import clsx from 'clsx';

export function PipelineTable({ className = '' }) {
  const [pipelineData, setPipelineData] = useState(INITIAL_PIPELINE_FEED);
  const [flashingRowId, setFlashingRowId] = useState(null);
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // Every 6s: either advance status of a row or push a rotating incoming event
  useInterval(() => {
    setPipelineData((prev) => {
      const copy = [...prev];
      const rand = Math.random();

      if (rand > 0.5) {
        // Advance status of a Review or Contracting row
        const targetIdx = copy.findIndex((r) => r.status === 'Review' || r.status === 'Contracting');
        if (targetIdx !== -1) {
          const item = copy[targetIdx];
          const newStatus = item.status === 'Review' ? 'Contracting' : 'Delivering';
          const newStatusClass = newStatus === 'Contracting' ? 'orange' : 'emerald';
          copy[targetIdx] = {
            ...item,
            status: newStatus,
            statusClass: newStatusClass,
          };
          setFlashingRowId(item.id);
          setTimeout(() => setFlashingRowId(null), 1200);
          return copy;
        }
      }

      // Or push a rotating event
      const now = new Date();
      const timeStr = `${String(now.getUTCHours()).padStart(2, '0')}:${String(now.getUTCMinutes()).padStart(2, '0')}:${String(now.getUTCSeconds()).padStart(2, '0')}`;
      const eventTemplate = ROTATING_PIPELINE_EVENTS[Math.floor(Math.random() * ROTATING_PIPELINE_EVENTS.length)];
      const newId = `pipe-${Date.now()}`;
      const newRow = {
        ...eventTemplate,
        id: newId,
        utc: timeStr,
      };

      setFlashingRowId(newId);
      setTimeout(() => setFlashingRowId(null), 1200);

      // Keep top 6 items in preview
      return [newRow, ...copy.slice(0, 7)];
    });
  }, 6000);

  const getBadgeVariant = (status) => {
    if (status === 'Delivering') return 'delivering';
    if (status === 'Contracting') return 'contracting';
    return 'review';
  };

  return (
    <>
      <Card className={clsx('flex flex-col justify-between', className)}>
        {/* Table Header */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-card-raised border border-border-subtle flex items-center justify-center text-tsecondary">
                <Activity className="w-4 h-4 text-thermal" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-tprimary tracking-tight">
                  Pipeline activity.
                </h3>
                <span className="micro-label">REAL-TIME TRADE FLOW & TELEMETRY</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsViewAllOpen(true)}
              className="text-xs font-mono font-medium text-thermal hover:text-thermal-hover inline-flex items-center gap-1 transition-colors"
            >
              <span>VIEW ALL</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto select-none">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border-subtle text-tmuted font-mono text-[10px] uppercase tracking-wider">
                  <th className="pb-2.5 font-medium">UTC</th>
                  <th className="pb-2.5 font-medium">Trade Route</th>
                  <th className="pb-2.5 font-medium text-right">Output</th>
                  <th className="pb-2.5 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle/50">
                {pipelineData.slice(0, 5).map((row) => {
                  const isFlashing = flashingRowId === row.id;

                  return (
                    <tr
                      key={row.id}
                      onClick={() => setSelectedRow(row)}
                      className={clsx(
                        'cursor-pointer transition-colors duration-300 hover:bg-card-raised group',
                        isFlashing && 'bg-thermal/10 dark:bg-thermal/15'
                      )}
                    >
                      <td className="py-2.5 font-mono text-tmuted tabular-nums">
                        {row.utc}
                      </td>
                      <td className="py-2.5 font-medium text-tprimary group-hover:text-thermal transition-colors">
                        {row.route}
                      </td>
                      <td className="py-2.5 font-mono text-right text-tprimary tabular-nums">
                        {row.outputMW.toFixed(2)} MW
                      </td>
                      <td className="py-2.5 text-right">
                        <Badge
                          variant={getBadgeVariant(row.status)}
                          dot={true}
                          size="xs"
                        >
                          {row.status}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer info note */}
        <div className="text-[11px] text-tmuted pt-3 border-t border-border-subtle mt-4 flex items-center justify-between">
          <span>Click any row for exchange telemetry detail</span>
          <span className="font-mono text-[10px]">SYNC: 6s INTERVAL</span>
        </div>
      </Card>

      {/* Row Detail Popover / Modal */}
      {selectedRow && (
        <Modal
          isOpen={Boolean(selectedRow)}
          onClose={() => setSelectedRow(null)}
          title={`Trade Route: ${selectedRow.route}`}
          subtitle={`Telemetry timestamp: ${selectedRow.utc} UTC`}
          size="sm"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-xs bg-card-raised p-4 rounded-element border border-border-subtle">
              <div>
                <span className="micro-label">Source Node</span>
                <div className="font-semibold text-tprimary mt-0.5">{selectedRow.source}</div>
              </div>
              <div>
                <span className="micro-label">Destination</span>
                <div className="font-semibold text-tprimary mt-0.5">{selectedRow.destination}</div>
              </div>
              <div>
                <span className="micro-label">Active Thermal Output</span>
                <div className="font-mono font-semibold text-thermal mt-0.5">{selectedRow.outputMW} MW</div>
              </div>
              <div>
                <span className="micro-label">Supply Temperature</span>
                <div className="font-mono font-semibold text-tprimary mt-0.5">{selectedRow.tempSupplyC}°C</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-element border border-border-subtle bg-card">
              <span className="text-xs text-tsecondary">Current Agreement Status</span>
              <Badge variant={getBadgeVariant(selectedRow.status)} dot={true}>
                {selectedRow.status}
              </Badge>
            </div>

            <p className="text-xs text-tmuted leading-relaxed">
              Note: {selectedRow.note || 'Nominal heat transfer loop with continuous temperature and pressure logging.'}
            </p>
          </div>
        </Modal>
      )}

      {/* View All Modal */}
      <Modal
        isOpen={isViewAllOpen}
        onClose={() => setIsViewAllOpen(false)}
        title="Active Pipeline Trade Feeds"
        subtitle="Complete Northern Virginia thermal loop network exchange telemetry"
        size="lg"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border-subtle text-tmuted font-mono text-[10px] uppercase tracking-wider">
                <th className="pb-3 font-medium">UTC</th>
                <th className="pb-3 font-medium">Route</th>
                <th className="pb-3 font-medium">Supply Temp</th>
                <th className="pb-3 font-medium text-right">Output</th>
                <th className="pb-3 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle/50">
              {pipelineData.map((row) => (
                <tr key={row.id} className="hover:bg-card-raised">
                  <td className="py-3 font-mono text-tmuted">{row.utc}</td>
                  <td className="py-3 font-medium text-tprimary">{row.route}</td>
                  <td className="py-3 font-mono text-tsecondary">{row.tempSupplyC}°C</td>
                  <td className="py-3 font-mono text-right text-tprimary font-semibold">
                    {row.outputMW.toFixed(2)} MW
                  </td>
                  <td className="py-3 text-right">
                    <Badge variant={getBadgeVariant(row.status)} dot={true} size="xs">
                      {row.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </>
  );
}
