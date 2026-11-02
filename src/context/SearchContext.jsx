import React, { createContext, useContext, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FACILITIES } from '../data/facilities';
import { HARDWARE_LISTINGS } from '../data/hardware';
import { INITIAL_JOBS } from '../data/jobs';

const SearchContext = createContext(null);

export function SearchProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const openSearch = () => setIsOpen(true);
  const closeSearch = () => {
    setIsOpen(false);
    setQuery('');
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return { facilities: [], hardware: [], jobs: [], total: 0 };
    }

    const matchedFacilities = FACILITIES.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.city.toLowerCase().includes(q) ||
        f.type.toLowerCase().includes(q)
    ).slice(0, 4);

    const matchedHardware = HARDWARE_LISTINGS.filter(
      (h) =>
        h.title.toLowerCase().includes(q) ||
        h.id.toLowerCase().includes(q) ||
        h.category.toLowerCase().includes(q)
    ).slice(0, 4);

    const matchedJobs = INITIAL_JOBS.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.category.toLowerCase().includes(q)
    ).slice(0, 4);

    return {
      facilities: matchedFacilities,
      hardware: matchedHardware,
      jobs: matchedJobs,
      total: matchedFacilities.length + matchedHardware.length + matchedJobs.length,
    };
  }, [query]);

  const selectResult = (type, item) => {
    closeSearch();
    if (type === 'facility') {
      navigate(`/matchmaker?facility=${item.id}`);
    } else if (type === 'hardware') {
      navigate(`/marketplace?id=${item.id}`);
    } else if (type === 'job') {
      navigate(`/jobs?id=${item.id}`);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        isOpen,
        query,
        setQuery,
        openSearch,
        closeSearch,
        results,
        selectResult,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return ctx;
}
