import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { WorkspaceProvider } from './context/WorkspaceContext';
import { NotificationsProvider } from './context/NotificationsContext';
import { MatchProvider } from './context/MatchContext';
import { MarketplaceProvider } from './context/MarketplaceContext';
import { JobsProvider } from './context/JobsContext';
import { SearchProvider } from './context/SearchContext';
import { AppRoutes } from './routes';

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <WorkspaceProvider>
          <NotificationsProvider>
            <MatchProvider>
              <MarketplaceProvider>
                <JobsProvider>
                  <BrowserRouter>
                    <SearchProvider>
                      <AppRoutes />
                    </SearchProvider>
                  </BrowserRouter>
                </JobsProvider>
              </MarketplaceProvider>
            </MatchProvider>
          </NotificationsProvider>
        </WorkspaceProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
