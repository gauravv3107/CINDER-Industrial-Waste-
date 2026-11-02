import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { Dashboard } from './pages/Dashboard';
import { Matchmaker } from './pages/Matchmaker';
import { Marketplace } from './pages/Marketplace';
import { Jobs } from './pages/Jobs';
import { NotFound } from './pages/NotFound';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<Dashboard />} />
        <Route path="matchmaker" element={<Matchmaker />} />
        <Route path="marketplace" element={<Marketplace />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
