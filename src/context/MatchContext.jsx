import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useWorkspace } from './WorkspaceContext';
import { useToast } from './ToastContext';
import { FACILITIES } from '../data/facilities';
import { calculateCapacityMW, calculatePipeLossPct, scoreFacility } from '../utils/thermo';

const MatchContext = createContext(null);

export function MatchProvider({ children }) {
  const { activeSite } = useWorkspace();
  const { addToast } = useToast();

  const [selectedSiteId, setSelectedSiteId] = useState(activeSite.id);
  const [coolingMedium, setCoolingMedium] = useState('Direct-to-chip liquid');
  const [supplyTempC, setSupplyTempC] = useState(64);
  const [flowLps, setFlowLps] = useState(28.6);
  const [maxDistanceKm, setMaxDistanceKm] = useState(10);
  const [continuousSupply, setContinuousSupply] = useState(true);
  const [sortBy, setSortBy] = useState('fit'); // 'fit' | 'distance' | 'offtake' | 'demand'
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [savedSearches, setSavedSearches] = useState([]);

  // Sync selected site when active site changes in workspace switcher
  useEffect(() => {
    setSelectedSiteId(activeSite.id);
    if (activeSite.activeSupplyTempC) {
      setSupplyTempC(activeSite.activeSupplyTempC);
    }
    if (activeSite.defaultFlowLps) {
      setFlowLps(activeSite.defaultFlowLps);
    }
    if (activeSite.coolingMedium) {
      setCoolingMedium(activeSite.coolingMedium);
    }
  }, [activeSite]);

  // Adjust parameters when cooling medium changes
  const handleCoolingMediumChange = (medium) => {
    setCoolingMedium(medium);
    if (medium === 'Direct-to-chip liquid') {
      setSupplyTempC(64);
      setFlowLps(28.6);
    } else if (medium === 'Rear-door heat exchanger') {
      setSupplyTempC(56);
      setFlowLps(34.0);
    } else if (medium === 'Immersion') {
      setSupplyTempC(52);
      setFlowLps(22.0);
    } else if (medium === 'Air-cooled') {
      setSupplyTempC(40);
      setFlowLps(45.0);
    }
  };

  // Live recoverable capacity computation in MW
  const capacityMW = useMemo(() => {
    return calculateCapacityMW(flowLps, 10);
  }, [flowLps]);

  // Live thermodynamic loss calculation for default route (Potomac 2.4 km)
  const defaultLossPct = useMemo(() => {
    return calculatePipeLossPct(2.4, supplyTempC);
  }, [supplyTempC]);

  const defaultDeliveredMW = useMemo(() => {
    return Number((capacityMW * (1 - defaultLossPct / 100)).toFixed(2));
  }, [capacityMW, defaultLossPct]);

  // Computed and sorted ranked facilities
  const rankedFacilities = useMemo(() => {
    const scored = FACILITIES.map((fac) => {
      const scoring = scoreFacility(fac, supplyTempC, flowLps, maxDistanceKm);
      return {
        ...fac,
        matchPct: scoring.overallScore,
        isCompatible: scoring.isCompatible,
        subscores: scoring.subscores,
        estimatedLossPct: scoring.estimatedLossPct,
        deliveredMW: scoring.deliveredMW,
      };
    });

    // Filter strictly by max connection distance
    const filtered = scored.filter((fac) => fac.distanceKm <= maxDistanceKm);

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
      if (sortBy === 'offtake') return b.offtakeRatePerMWh - a.offtakeRatePerMWh;
      if (sortBy === 'demand') return b.heatDemandMW - a.heatDemandMW;
      // Default: thermodynamic fit descending
      return b.matchPct - a.matchPct;
    });

    return filtered;
  }, [supplyTempC, flowLps, maxDistanceKm, sortBy]);

  const refreshMatches = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      addToast('Thermodynamic matches re-ranked and verified', 'success');
    }, 700);
  }, [addToast]);

  const saveCurrentSearch = useCallback(() => {
    const name = `${coolingMedium} (${supplyTempC}°C, ${maxDistanceKm}km)`;
    const newSaved = {
      id: `saved-${Date.now()}`,
      name,
      coolingMedium,
      supplyTempC,
      flowLps,
      maxDistanceKm,
      resultsCount: rankedFacilities.length,
      savedAt: new Date().toLocaleDateString(),
    };
    setSavedSearches((prev) => [newSaved, ...prev]);
    addToast(`Saved search parameters: "${name}"`, 'success');
  }, [coolingMedium, supplyTempC, flowLps, maxDistanceKm, rankedFacilities.length, addToast]);

  return (
    <MatchContext.Provider
      value={{
        selectedSiteId,
        setSelectedSiteId,
        coolingMedium,
        setCoolingMedium: handleCoolingMediumChange,
        supplyTempC,
        setSupplyTempC,
        flowLps,
        setFlowLps,
        maxDistanceKm,
        setMaxDistanceKm,
        continuousSupply,
        setContinuousSupply,
        sortBy,
        setSortBy,
        capacityMW,
        defaultLossPct,
        defaultDeliveredMW,
        rankedFacilities,
        compatibleCount: rankedFacilities.length,
        isRefreshing,
        refreshMatches,
        savedSearches,
        saveCurrentSearch,
      }}
    >
      {children}
    </MatchContext.Provider>
  );
}

export function useMatch() {
  const ctx = useContext(MatchContext);
  if (!ctx) {
    throw new Error('useMatch must be used within a MatchProvider');
  }
  return ctx;
}
