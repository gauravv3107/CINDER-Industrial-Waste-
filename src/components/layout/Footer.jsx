import React from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';

export function Footer() {
  const { networkId, regionLabel } = useWorkspace();

  return (
    <footer className="w-full border-t border-border-subtle bg-card/30 mt-auto select-none transition-colors duration-150">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-tmuted">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-tsecondary">CINDER</span>
          <span>/</span>
          <span>{networkId} · {regionLabel.toUpperCase()} NETWORK</span>
        </div>

        <div className="flex items-center gap-2">
          <span>ALL TIMES UTC</span>
          <span>·</span>
          <span>MARKET DATA DELAYED BY 60s</span>
        </div>
      </div>
    </footer>
  );
}
