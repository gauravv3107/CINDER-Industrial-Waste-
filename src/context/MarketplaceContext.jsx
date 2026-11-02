import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { HARDWARE_LISTINGS } from '../data/hardware';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';

const MarketplaceContext = createContext(null);

export const CATEGORIES = [
  'All equipment',
  'Enterprise GPUs',
  'AI servers',
  'Liquid cooling rigs',
  'Server chassis',
  'Power units',
];

export function MarketplaceProvider({ children }) {
  const { addToast } = useToast();
  const [listings, setListings] = useState(HARDWARE_LISTINGS);
  const [activeCategory, setActiveCategory] = useState('All equipment');
  const [conditionFilter, setConditionFilter] = useState('All conditions');
  const [maxDistanceKm, setMaxDistanceKm] = useState(50);
  const [sortBy, setSortBy] = useState('endingSoon'); // 'endingSoon' | 'priceAsc' | 'priceDesc' | 'discount'
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [minUnits, setMinUnits] = useState(1);

  // Bookmarks persisted in localStorage
  const [bookmarks, setBookmarks] = useLocalStorage('cinder_hardware_bookmarks', ['GPU-0024']);
  // My bids persisted in localStorage
  const [myBids, setMyBids] = useLocalStorage('cinder_my_bids', [
    {
      listingId: 'GPU-0019',
      title: 'NVIDIA H100 80GB PCIe Gen5',
      bidAmount: 18900,
      quantity: 2,
      totalAmount: 37800,
      placedAt: '30 Oct 2026',
      status: 'Leading',
    },
  ]);

  const toggleBookmark = useCallback((id) => {
    setBookmarks((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];
      addToast(exists ? 'Removed from saved hardware' : 'Saved to bookmarks', 'info');
      return updated;
    });
  }, [setBookmarks, addToast]);

  const placeBid = useCallback((listingId, bidAmount, quantity = 1) => {
    const item = listings.find((h) => h.id === listingId);
    if (!item) return false;

    // Update listing price and bidsCount
    setListings((prev) =>
      prev.map((l) =>
        l.id === listingId
          ? { ...l, currentBid: bidAmount, bidsCount: l.bidsCount + 1 }
          : l
      )
    );

    // Add to My Bids
    const newBidRecord = {
      listingId,
      title: item.title,
      bidAmount,
      quantity,
      totalAmount: bidAmount * quantity,
      placedAt: 'Just now',
      status: 'Leading',
    };

    setMyBids((prev) => [newBidRecord, ...prev.filter((b) => b.listingId !== listingId)]);
    addToast(`Bid of $${bidAmount.toLocaleString()} placed on ${item.title}!`, 'success');
    return true;
  }, [listings, setMyBids, addToast]);

  const addListing = useCallback((newListingData) => {
    const newListing = {
      id: `EQ-${Math.floor(1000 + Math.random() * 9000)}`,
      ...newListingData,
      currentBid: Number(newListingData.startingBid) || 5000,
      bidsCount: 0,
      belowNewPct: Number(newListingData.belowNewPct) || 35,
      endsAt: new Date(Date.now() + 7 * 24 * 3600000).toISOString(),
      sellerVerified: true,
      unitsAvailable: Number(newListingData.unitsAvailable) || 1,
      minIncrementPct: 2,
      specs: Array.isArray(newListingData.specs) ? newListingData.specs : [newListingData.specs || 'Enterprise Grade'],
      testReport: {
        id: `TR-${Math.floor(100 + Math.random() * 900)}`,
        date: '02 Nov 2026',
        certifiedBy: 'Verified Technical Certification',
        thermalDeltaT: 'Δ1.5°C Normal',
        leakageRate: 'Nominal',
        benchScore: '100% Passed',
        burnInHours: 48,
      },
    };

    setListings((prev) => [newListing, ...prev]);
    addToast(`Listing created: "${newListing.title}"`, 'success');
  }, [addToast]);

  // Dynamic category counts
  const categoryCounts = useMemo(() => {
    const counts = { 'All equipment': listings.length };
    CATEGORIES.slice(1).forEach((cat) => {
      counts[cat] = listings.filter((l) => l.category === cat).length;
    });
    return counts;
  }, [listings]);

  // Filtered and sorted listings
  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      // Category
      if (activeCategory !== 'All equipment' && item.category !== activeCategory) {
        return false;
      }
      // Condition
      if (conditionFilter !== 'All conditions' && !item.condition.includes(conditionFilter)) {
        return false;
      }
      // Distance
      if (item.distanceKm > maxDistanceKm) {
        return false;
      }
      // Verified seller
      if (onlyVerified && !item.sellerVerified) {
        return false;
      }
      // Max price
      if (item.currentBid > maxPrice) {
        return false;
      }
      // Min units
      if (item.unitsAvailable < minUnits) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesId = item.id.toLowerCase().includes(q);
        const matchesSeller = item.seller.toLowerCase().includes(q);
        if (!matchesTitle && !matchesId && !matchesSeller) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'priceAsc') return a.currentBid - b.currentBid;
      if (sortBy === 'priceDesc') return b.currentBid - a.currentBid;
      if (sortBy === 'discount') return b.belowNewPct - a.belowNewPct;
      // Default: ending soonest
      return new Date(a.endsAt).getTime() - new Date(b.endsAt).getTime();
    });
  }, [
    listings,
    activeCategory,
    conditionFilter,
    maxDistanceKm,
    onlyVerified,
    maxPrice,
    minUnits,
    searchQuery,
    sortBy,
  ]);

  return (
    <MarketplaceContext.Provider
      value={{
        listings: filteredListings,
        rawListingsCount: listings.length,
        totalFound: filteredListings.length,
        activeCategory,
        setActiveCategory,
        categoryCounts,
        conditionFilter,
        setConditionFilter,
        maxDistanceKm,
        setMaxDistanceKm,
        sortBy,
        setSortBy,
        searchQuery,
        setSearchQuery,
        onlyVerified,
        setOnlyVerified,
        maxPrice,
        setMaxPrice,
        minUnits,
        setMinUnits,
        bookmarks,
        toggleBookmark,
        isBookmarked: (id) => bookmarks.includes(id),
        myBids,
        placeBid,
        addListing,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const ctx = useContext(MarketplaceContext);
  if (!ctx) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return ctx;
}
