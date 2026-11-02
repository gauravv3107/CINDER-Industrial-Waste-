import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Home, Compass } from 'lucide-react';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="py-20 flex flex-col items-center justify-center text-center px-4 animate-in fade-in duration-150">
      <div className="w-16 h-16 rounded-full bg-card-raised border border-border-strong flex items-center justify-center text-thermal mb-6">
        <Compass className="w-8 h-8" />
      </div>

      <div className="font-mono text-xs text-thermal uppercase tracking-widest mb-1">
        ERROR 404 · LOOP NOT FOUND
      </div>

      <h1 className="text-3xl sm:text-4xl font-semibold text-tprimary tracking-tight font-sans mb-3">
        Hydronic route terminated.
      </h1>

      <p className="text-sm text-tsecondary max-w-md mb-8">
        The requested pipeline endpoint or marketplace address does not exist within the active Northern Virginia infrastructure exchange.
      </p>

      <div className="flex items-center gap-3">
        <Button variant="primary" size="md" onClick={() => navigate('/')} icon={Home}>
          Return to overview
        </Button>
        <Button variant="secondary" size="md" onClick={() => navigate('/matchmaker')}>
          Explore matches
        </Button>
      </div>
    </div>
  );
}
