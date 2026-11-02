import React, { createContext, useContext, useState } from 'react';
import { SOURCE_SITES } from '../data/sourceSites';
import { useToast } from './ToastContext';

const WorkspaceContext = createContext(null);

export function WorkspaceProvider({ children }) {
  const { addToast } = useToast();
  const [activeSite, setActiveSite] = useState(SOURCE_SITES[0]);

  const selectSite = (siteId) => {
    const found = SOURCE_SITES.find((s) => s.id === siteId);
    if (found && found.id !== activeSite.id) {
      setActiveSite(found);
      addToast(`Switched active workspace to ${found.name}`, 'info');
    }
  };

  return (
    <WorkspaceContext.Provider
      value={{
        activeSite,
        sites: SOURCE_SITES,
        selectSite,
        regionLabel: 'Northern Virginia',
        networkId: activeSite.code,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return ctx;
}
