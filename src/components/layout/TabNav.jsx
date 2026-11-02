import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { StatusDot } from '../ui/StatusDot';
import { LayoutDashboard, Flame, Cpu, Briefcase } from 'lucide-react';
import clsx from 'clsx';

export function TabNav() {
  const location = useLocation();

  const navItems = [
    {
      to: '/',
      label: 'Overview',
      icon: LayoutDashboard,
      exact: true,
    },
    {
      to: '/matchmaker',
      label: 'Thermal matchmaker',
      icon: Flame,
    },
    {
      to: '/marketplace',
      label: 'Hardware marketplace',
      icon: Cpu,
    },
    {
      to: '/jobs',
      label: 'Green jobs',
      icon: Briefcase,
      badge: '24',
    },
  ];

  return (
    <nav className="w-full bg-card/60 border-b border-border-subtle transition-colors duration-150">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Horizontal scrollable tab buttons */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-1">
          {navItems.map((item) => {
            const isActive = item.exact
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);

            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={clsx(
                  'relative flex items-center gap-2 px-3.5 py-2.5 text-xs font-medium rounded-t-lg transition-all duration-150 select-none shrink-0 group',
                  isActive
                    ? 'text-thermal font-semibold'
                    : 'text-tsecondary hover:text-tprimary hover:bg-card-raised/50'
                )}
              >
                <Icon
                  className={clsx(
                    'w-4 h-4 transition-colors',
                    isActive ? 'text-thermal' : 'text-tmuted group-hover:text-tsecondary'
                  )}
                />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={clsx(
                      'font-mono text-[10px] px-1.5 py-0.2 rounded-full border',
                      isActive
                        ? 'bg-thermal/15 text-thermal border-thermal/30'
                        : 'bg-card-raised text-tmuted border-border-subtle'
                    )}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Animated active underline bar */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-thermal rounded-full" />
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Far Right: Status dot + NETWORK NOMINAL */}
        <div className="hidden md:flex items-center gap-2 pl-4 shrink-0 font-mono text-[10px] text-tmuted select-none">
          <StatusDot status="nominal" />
          <span className="tracking-wider uppercase text-emerald-500 font-semibold">
            NETWORK NOMINAL
          </span>
        </div>
      </div>
    </nav>
  );
}
