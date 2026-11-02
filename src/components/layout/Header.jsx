import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../illustrations/Logo';
import { WorkspaceSwitcher } from './WorkspaceSwitcher';
import { GlobalSearch } from './GlobalSearch';
import { ThemeToggle } from './ThemeToggle';
import { NotificationBell } from './NotificationBell';
import { UserMenu } from './UserMenu';

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-card/85 backdrop-blur-md border-b border-border-subtle transition-colors duration-150">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Left: Logo & Workspace Switcher */}
        <div className="flex items-center gap-3 sm:gap-6 shrink-0">
          <Link to="/" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-thermal rounded-lg">
            <Logo size="md" />
          </Link>

          <div className="hidden lg:block h-5 w-px bg-border-subtle" />

          <WorkspaceSwitcher className="hidden sm:block" />
        </div>

        {/* Center / Right: Global Search, Theme Toggle, Bell, User */}
        <div className="flex items-center gap-2 sm:gap-3">
          <GlobalSearch />

          <div className="h-5 w-px bg-border-subtle hidden sm:block" />

          <ThemeToggle />

          <NotificationBell />

          <UserMenu />
        </div>
      </div>
    </header>
  );
}
