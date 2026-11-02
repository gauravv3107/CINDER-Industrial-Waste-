import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Slider } from '../components/ui/Slider';
import { Drawer } from '../components/ui/Drawer';
import { Pagination } from '../components/ui/Pagination';
import { EmptyState } from '../components/ui/EmptyState';
import { BidModal } from '../components/modals/BidModal';
import { ListEquipmentModal } from '../components/modals/ListEquipmentModal';
import { GpuSvg } from '../components/illustrations/GpuSvg';
import { ServerSvg } from '../components/illustrations/ServerSvg';
import { CduSvg } from '../components/illustrations/CduSvg';
import { TankSvg } from '../components/illustrations/TankSvg';
import { useMarketplace, CATEGORIES } from '../context/MarketplaceContext';
import { useCountdown } from '../hooks/useCountdown';
import { formatCurrency } from '../../src/utils/format';
import {
  Gavel,
  PlusCircle,
  Bookmark,
  FileCheck,
  CheckCircle,
  MapPin,
  Clock,
  SlidersHorizontal,
  ShieldCheck,
  Package,
  Layers,
  Sparkles,
  Search,
  ExternalLink,
} from 'lucide-react';
import clsx from 'clsx';

// Hardware Card Sub-component with individual ticking countdown
function HardwareCard({ listing, onBidClick, onBookmarkToggle, isBookmarked }) {
  const countdown = useCountdown(listing.endsAt);

  const renderIllustration = (type) => {
    switch (type) {
      case 'server':
        return <ServerSvg />;
      case 'cdu':
        return <CduSvg />;
      case 'tank':
        return <TankSvg />;
      default:
        return <GpuSvg />;
    }
  };

  return (
    <Card className="flex flex-col justify-between hover:border-border-strong transition-all duration-200 group p-5">
      <div>
        {/* Visual Illustration Container */}
        <div className="relative w-full h-44 rounded-card overflow-hidden mb-4 border border-border-subtle bg-slate-950 flex items-center justify-center">
          {renderIllustration(listing.illustration)}

          {/* Top Left Grade Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-slate-900/90 text-slate-200 border border-slate-700/80 backdrop-blur-md font-medium select-none shadow-sm">
              {listing.condition}
            </span>
          </div>

          {/* Top Right Bookmark Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onBookmarkToggle(listing.id);
            }}
            aria-label="Bookmark equipment"
            className={clsx(
              'absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-150',
              isBookmarked
                ? 'bg-thermal text-white shadow-md'
                : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-900'
            )}
          >
            <Bookmark className={clsx('w-3.5 h-3.5', isBookmarked && 'fill-current')} />
          </button>

          {/* Bottom Countdown Strip */}
          <div className="absolute bottom-2 left-3 right-3 z-10 flex items-center justify-between font-mono text-[10px] text-slate-300 bg-slate-900/85 backdrop-blur-md px-2.5 py-1 rounded-element border border-slate-700/50">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <Clock className="w-3 h-3" />
              <span>{countdown.formatted}</span>
            </span>
            <span>{listing.unitsAvailable} units available</span>
          </div>
        </div>

        {/* Identification & Category */}
        <div className="flex items-center justify-between text-[10px] font-mono text-tmuted mb-1.5">
          <span>{listing.id} / {listing.category.toUpperCase()}</span>
          {listing.sellerVerified && (
            <span className="text-emerald-500 flex items-center gap-1 font-sans">
              <CheckCircle className="w-3 h-3" /> Verified Seller
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-tprimary tracking-tight leading-snug line-clamp-1 group-hover:text-thermal transition-colors">
          {listing.title}
        </h3>

        {/* Specs Badges */}
        <div className="flex flex-wrap gap-1.5 my-3">
          {listing.specs.slice(0, 3).map((spec, idx) => (
            <span
              key={idx}
              className="font-mono text-[10px] px-2 py-0.5 rounded bg-card-raised border border-border-subtle text-tsecondary"
            >
              {spec}
            </span>
          ))}
        </div>

        {/* Location & Discount line */}
        <div className="flex items-center justify-between text-xs text-tsecondary pt-2 border-t border-border-subtle/50">
          <div className="flex items-center gap-1 text-tmuted">
            <MapPin className="w-3.5 h-3.5" />
            <span>{listing.location} ({listing.distanceKm} km)</span>
          </div>

          <span className="font-mono text-[11px] font-semibold text-emerald-500">
            {listing.belowNewPct}% below new
          </span>
        </div>
      </div>

      {/* Pricing & Bid Action Bottom */}
      <div className="pt-4 mt-4 border-t border-border-subtle">
        <div className="flex items-end justify-between mb-3">
          <div>
            <span className="micro-label">CURRENT BID / UNIT</span>
            <div className="text-xl font-bold font-mono text-tprimary tabular-nums mt-0.5">
              {formatCurrency(listing.currentBid)}
            </div>
          </div>

          <div className="text-right font-mono text-xs text-tmuted">
            <span>{listing.bidsCount} bids</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            className="w-full justify-center"
            onClick={() => onBidClick(listing)}
            icon={Gavel}
          >
            Place bid
          </Button>
        </div>

        {/* Test Report Notice */}
        <div className="flex items-center gap-1.5 text-[10px] text-tmuted font-mono mt-2.5">
          <FileCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Test report included · {listing.testReport?.certifiedBy}</span>
        </div>
      </div>
    </Card>
  );
}

export function Marketplace() {
  const {
    listings,
    rawListingsCount,
    totalFound,
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
    isBookmarked,
    myBids,
  } = useMarketplace();

  // Modals state
  const [selectedListingForBid, setSelectedListingForBid] = useState(null);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isBidsDrawerOpen, setIsBidsDrawerOpen] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Pagination (6 per page)
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const totalPages = Math.ceil(totalFound / pageSize) || 1;
  const paginatedListings = listings.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-150">
      {/* Breadcrumb Header */}
      <div className="flex items-center justify-between border-b border-border-subtle pb-3">
        <div className="flex items-center gap-2 font-mono text-[10px] text-tmuted tracking-widest uppercase">
          <span className="text-tsecondary font-semibold">MARKETPLACE</span>
          <span>/</span>
          <span>CIRCULAR HARDWARE</span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-medium text-tprimary tracking-tight font-sans">
            Built for more than one lifecycle.
          </h1>
          <p className="text-sm text-tsecondary mt-1">
            Enterprise-grade GPUs, servers and cooling systems. Tested, traceable and ready for their next deployment.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="secondary"
            size="md"
            onClick={() => setIsBidsDrawerOpen(true)}
            icon={Gavel}
          >
            My bids · {myBids.length}
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={() => setIsListModalOpen(true)}
            icon={PlusCircle}
          >
            List equipment
          </Button>
        </div>
      </div>

      {/* Trust Strip */}
      <div className="p-3.5 rounded-card bg-card border border-border-subtle flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-tsecondary">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Verified enterprise sellers</span>
          </span>
          <span className="hidden sm:inline text-border-strong">·</span>
          <span className="flex items-center gap-1.5">
            <FileCheck className="w-4 h-4 text-thermal" />
            <span>Independent test reports</span>
          </span>
          <span className="hidden sm:inline text-border-strong">·</span>
          <span className="flex items-center gap-1.5">
            <Package className="w-4 h-4 text-sky-400" />
            <span>Insured logistics available</span>
          </span>
        </div>

        <div className="font-mono text-emerald-500 font-semibold text-[11px]">
          $284.6k saved across your network
        </div>
      </div>

      {/* Category Filter Chips with Dynamic Counts */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {CATEGORIES.map((cat) => {
          const isSelected = activeCategory === cat;
          const count = categoryCounts[cat] || 0;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryChange(cat)}
              className={clsx(
                'flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150 select-none shrink-0 border',
                isSelected
                  ? 'bg-thermal text-white border-thermal shadow-sm font-semibold'
                  : 'bg-card text-tsecondary border-border-subtle hover:border-border-strong hover:text-tprimary'
              )}
            >
              <span>{cat}</span>
              <span
                className={clsx(
                  'font-mono text-[10px] px-1.5 py-0.2 rounded-full',
                  isSelected ? 'bg-white/20 text-white' : 'bg-card-raised text-tmuted'
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-card bg-card border border-border-subtle space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Left: Condition + Distance + Filters toggle */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Condition select */}
            <select
              value={conditionFilter}
              onChange={(e) => {
                setConditionFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-card-raised border border-border-subtle rounded-element px-3 py-1.5 text-xs text-tprimary font-medium focus:outline-none focus:border-thermal"
            >
              <option value="All conditions">All conditions</option>
              <option value="Refurbished · Grade A">Refurbished · Grade A</option>
              <option value="Tested · Grade A">Tested · Grade A</option>
              <option value="Tested · Grade B">Tested · Grade B</option>
            </select>

            {/* Distance select */}
            <select
              value={maxDistanceKm}
              onChange={(e) => {
                setMaxDistanceKm(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-card-raised border border-border-subtle rounded-element px-3 py-1.5 text-xs text-tprimary font-medium focus:outline-none focus:border-thermal"
            >
              <option value={20}>Within 20 km</option>
              <option value={50}>Within 50 km</option>
              <option value={100}>Within 100 km</option>
            </select>

            {/* Filters panel toggle */}
            <button
              type="button"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={clsx(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-element border text-xs font-medium transition-colors',
                showAdvancedFilters
                  ? 'bg-card-raised text-thermal border-thermal'
                  : 'bg-card-raised text-tsecondary border-border-subtle hover:text-tprimary'
              )}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Right: Listings Count & Sort */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-tmuted font-mono">
              {totalFound} listings in Northern Virginia
            </span>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-card-raised border border-border-subtle rounded-element px-3 py-1.5 text-xs text-tprimary font-medium focus:outline-none focus:border-thermal"
            >
              <option value="endingSoon">Ending soonest</option>
              <option value="priceAsc">Price: low → high</option>
              <option value="priceDesc">Price: high → low</option>
              <option value="discount">Biggest discount (% off)</option>
            </select>
          </div>
        </div>

        {/* Collapsible Advanced Filters Panel */}
        {showAdvancedFilters && (
          <div className="pt-3 border-t border-border-subtle grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs animate-in fade-in duration-100">
            <div>
              <label className="text-[11px] text-tmuted block mb-1">Max Price: ${maxPrice.toLocaleString()}</label>
              <input
                type="range"
                min={2000}
                max={100000}
                step={2000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-thermal cursor-pointer"
              />
            </div>

            <div>
              <label className="text-[11px] text-tmuted block mb-1">Min. Units Available: {minUnits}</label>
              <input
                type="range"
                min={1}
                max={20}
                value={minUnits}
                onChange={(e) => setMinUnits(Number(e.target.value))}
                className="w-full accent-thermal cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-2 pt-4">
              <input
                type="checkbox"
                id="verifiedCheck"
                checked={onlyVerified}
                onChange={(e) => setOnlyVerified(e.target.checked)}
                className="accent-thermal cursor-pointer"
              />
              <label htmlFor="verifiedCheck" className="text-xs text-tprimary cursor-pointer select-none">
                Only show verified enterprise sellers
              </label>
            </div>
          </div>
        )}
      </div>

      {/* 3-Column Product Grid */}
      {paginatedListings.length === 0 ? (
        <EmptyState
          title="No circular equipment listings match your filters"
          description="Try broadening your category selection, distance radius, or price filter."
          actionLabel="Reset filters"
          onAction={() => {
            setActiveCategory('All equipment');
            setConditionFilter('All conditions');
            setMaxDistanceKm(50);
            setMaxPrice(100000);
            setMinUnits(1);
            setOnlyVerified(false);
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedListings.map((listing) => (
            <HardwareCard
              key={listing.id}
              listing={listing}
              onBidClick={(l) => setSelectedListingForBid(l)}
              onBookmarkToggle={toggleBookmark}
              isBookmarked={isBookmarked(listing.id)}
            />
          ))}
        </div>
      )}

      {/* Real Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={totalFound}
        pageSize={pageSize}
        itemNoun="listings"
        disclaimer="Bids in USD, excluding logistics"
      />

      {/* Place Bid Modal */}
      <BidModal
        isOpen={Boolean(selectedListingForBid)}
        onClose={() => setSelectedListingForBid(null)}
        listing={selectedListingForBid}
      />

      {/* List Equipment Form Modal */}
      <ListEquipmentModal
        isOpen={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
      />

      {/* My Bids Drawer */}
      <Drawer
        isOpen={isBidsDrawerOpen}
        onClose={() => setIsBidsDrawerOpen(false)}
        title="My Active Bids"
        subtitle={`Tracking ${myBids.length} active equipment auction bids`}
        width="md"
        ariaLabel="My active equipment bids drawer"
      >
        <div className="space-y-4 text-xs">
          {myBids.length === 0 ? (
            <div className="py-12 text-center text-tmuted">
              You have not placed any equipment bids yet.
            </div>
          ) : (
            <div className="space-y-3">
              {myBids.map((bid, i) => (
                <div
                  key={i}
                  className="p-4 rounded-card bg-card-raised border border-border-subtle space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-tmuted">
                      {bid.listingId}
                    </span>
                    <Badge variant="delivering" size="xs" dot={true}>
                      {bid.status}
                    </Badge>
                  </div>

                  <h4 className="font-semibold text-tprimary text-sm">
                    {bid.title}
                  </h4>

                  <div className="grid grid-cols-2 gap-2 font-mono text-[11px] pt-1 border-t border-border-subtle">
                    <div>
                      <span className="text-tmuted">BID / UNIT:</span>
                      <div className="font-semibold text-tprimary">{formatCurrency(bid.bidAmount)}</div>
                    </div>
                    <div>
                      <span className="text-tmuted">TOTAL VALUE:</span>
                      <div className="font-bold text-thermal">{formatCurrency(bid.totalAmount)}</div>
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-tmuted">
                    Placed: {bid.placedAt} ({bid.quantity} unit{bid.quantity > 1 ? 's' : ''})
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
}
