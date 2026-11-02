import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { TabNav } from './TabNav';
import { Footer } from './Footer';
import { ToastContainer } from '../ui/Toast';

export function AppShell() {
  return (
    <div className="min-h-screen flex flex-col bg-canvas text-tprimary selection:bg-thermal/30 selection:text-tprimary font-sans antialiased">
      {/* Sticky Top Header */}
      <Header />

      {/* Primary Sub-Navigation Tab Bar */}
      <TabNav />

      {/* Main Page Body Canvas */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 py-6 md:py-8">
        <Outlet />
      </main>

      {/* Institutional Network Footer */}
      <Footer />

      {/* Global Toast Floating Container */}
      <ToastContainer />
    </div>
  );
}
