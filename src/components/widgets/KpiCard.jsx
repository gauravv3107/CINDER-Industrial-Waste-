import React from 'react';
import { Card } from '../ui/Card';
import { Sparkline } from '../charts/Sparkline';
import { useCountUp } from '../../hooks/useCountUp';
import clsx from 'clsx';
import { ArrowUpRight } from 'lucide-react';

export function KpiCard({
  label,
  icon: Icon,
  value,
  prefix = '',
  unit = '',
  delta,
  deltaText,
  isPositive = true,
  sparkline = [],
  accent = 'thermal', // 'thermal' | 'sustainability'
  decimals = 0,
}) {
  const animatedValue = useCountUp(value, 800, decimals);

  const formattedDisplay = decimals > 0 ? animatedValue.toFixed(decimals) : animatedValue.toLocaleString();

  return (
    <Card className="flex flex-col justify-between hover:border-border-strong transition-all duration-200">
      {/* Top Header: Label + Top-right Icon */}
      <div className="flex items-center justify-between mb-3">
        <span className="micro-label font-medium">{label}</span>
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-card-raised border border-border-subtle flex items-center justify-center text-tmuted">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Main Metric Value & Unit */}
      <div className="flex items-baseline gap-1.5 my-1">
        {prefix && (
          <span className="text-xl md:text-2xl font-semibold text-tprimary font-mono select-none">
            {prefix}
          </span>
        )}
        <span className="text-2xl md:text-3xl lg:text-4xl font-bold font-mono text-tprimary tabular-nums tracking-tight">
          {formattedDisplay}
        </span>
        {unit && (
          <span className="text-xs md:text-sm font-medium text-tmuted font-mono">
            {unit}
          </span>
        )}
      </div>

      {/* Bottom Row: Delta indicator + Sparkline */}
      <div className="flex items-end justify-between gap-2 mt-4 pt-3 border-t border-border-subtle/60">
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span
              className={clsx(
                'inline-flex items-center text-xs font-semibold font-mono',
                isPositive ? 'text-emerald-500' : 'text-rose-500'
              )}
            >
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              {delta}
            </span>
          </div>
          {deltaText && (
            <span className="text-[10px] text-tmuted leading-tight mt-0.5">
              {deltaText}
            </span>
          )}
        </div>

        {sparkline.length > 0 && (
          <Sparkline data={sparkline} color={accent} height={32} />
        )}
      </div>
    </Card>
  );
}
