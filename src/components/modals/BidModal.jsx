import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useMarketplace } from '../../context/MarketplaceContext';
import { formatCurrency } from '../../utils/format';
import { Gavel, FileCheck, ShieldCheck, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';

export function BidModal({ isOpen, onClose, listing }) {
  const { placeBid } = useMarketplace();

  const [activeTab, setActiveTab] = useState('bid'); // 'bid' | 'report'
  const [quantity, setQuantity] = useState(1);
  const minIncrementPct = listing?.minIncrementPct || 2;
  const minAcceptableBid = listing
    ? Math.ceil(listing.currentBid * (1 + minIncrementPct / 100))
    : 0;

  const [bidAmount, setBidAmount] = useState(minAcceptableBid);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // Update initial bid when listing changes
  React.useEffect(() => {
    if (listing) {
      const minBid = Math.ceil(listing.currentBid * (1 + (listing.minIncrementPct || 2) / 100));
      setBidAmount(minBid);
      setQuantity(1);
      setError('');
      setIsSuccess(false);
      setActiveTab('bid');
    }
  }, [listing]);

  if (!listing) return null;

  const totalValue = bidAmount * quantity;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bidAmount < minAcceptableBid) {
      setError(`Minimum bid is ${formatCurrency(minAcceptableBid)}`);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      placeBid(listing.id, bidAmount, quantity);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      ariaLabel={`Place bid on ${listing.title}`}
    >
      <div className="space-y-5">
        {/* Header Tabs: Bid / Test Report */}
        <div className="flex items-center justify-between border-b border-border-subtle pb-3">
          <div>
            <h2 className="text-base font-semibold text-tprimary tracking-tight">
              {listing.title}
            </h2>
            <div className="font-mono text-xs text-tmuted mt-0.5">
              {listing.id} · {listing.seller}
            </div>
          </div>

          <div className="flex rounded-element bg-card-raised p-1 border border-border-subtle text-xs select-none">
            <button
              type="button"
              onClick={() => setActiveTab('bid')}
              className={clsx(
                'px-3 py-1 rounded-lg font-medium transition-colors',
                activeTab === 'bid'
                  ? 'bg-card text-tprimary shadow-sm font-semibold'
                  : 'text-tmuted hover:text-tsecondary'
              )}
            >
              Place Bid
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('report')}
              className={clsx(
                'px-3 py-1 rounded-lg font-medium transition-colors flex items-center gap-1',
                activeTab === 'report'
                  ? 'bg-card text-tprimary shadow-sm font-semibold'
                  : 'text-tmuted hover:text-tsecondary'
              )}
            >
              <FileCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Test Report</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Place Bid */}
        {activeTab === 'bid' && (
          <>
            {isSuccess ? (
              <div className="py-8 flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold text-tprimary">Bid Successfully Placed!</h3>
                <p className="text-xs text-tsecondary max-w-xs">
                  Your bid of <span className="font-mono font-bold text-thermal">{formatCurrency(bidAmount)}</span> per unit ({quantity} unit{quantity > 1 ? 's' : ''}) is now leading the auction.
                </p>
                <div className="pt-4">
                  <Button variant="primary" size="sm" onClick={onClose}>
                    Done
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Current Bid Summary Box */}
                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-element bg-card-raised border border-border-subtle text-xs">
                  <div>
                    <span className="micro-label">Current Leading Bid</span>
                    <div className="text-lg font-bold font-mono text-tprimary mt-0.5">
                      {formatCurrency(listing.currentBid)}
                    </div>
                  </div>
                  <div>
                    <span className="micro-label">Min. Increment (+{minIncrementPct}%)</span>
                    <div className="text-lg font-semibold font-mono text-emerald-500 mt-0.5">
                      {formatCurrency(minAcceptableBid)}
                    </div>
                  </div>
                </div>

                {/* Bid input */}
                <div>
                  <Input
                    label="Your Bid Per Unit (USD)"
                    type="number"
                    min={minAcceptableBid}
                    step={50}
                    value={bidAmount}
                    onChange={(e) => {
                      setBidAmount(Number(e.target.value));
                      setError('');
                    }}
                    prefix="$"
                    suffix="USD"
                    error={error}
                    helperText={`Must be at least ${formatCurrency(minAcceptableBid)}`}
                  />
                </div>

                {/* Quantity Stepper */}
                <div className="flex items-center justify-between p-3.5 rounded-element border border-border-subtle bg-card">
                  <div>
                    <div className="text-xs font-medium text-tprimary">Quantity</div>
                    <div className="text-[11px] text-tmuted">
                      {listing.unitsAvailable} available in this lot
                    </div>
                  </div>

                  <div className="flex items-center gap-2 select-none">
                    <button
                      type="button"
                      disabled={quantity <= 1}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg border border-border-subtle bg-card-raised text-tprimary flex items-center justify-center font-bold disabled:opacity-40"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-mono font-bold text-sm">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      disabled={quantity >= listing.unitsAvailable}
                      onClick={() => setQuantity(Math.min(listing.unitsAvailable, quantity + 1))}
                      className="w-8 h-8 rounded-lg border border-border-subtle bg-card-raised text-tprimary flex items-center justify-center font-bold disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total Value Bar */}
                <div className="flex items-center justify-between p-3.5 rounded-element bg-canvas border border-border-subtle text-xs font-mono">
                  <span className="text-tmuted">TOTAL BID COMMITMENT:</span>
                  <span className="text-base font-bold text-thermal">
                    {formatCurrency(totalValue)}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <Button variant="outline" size="sm" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    isLoading={isSubmitting}
                    icon={Gavel}
                  >
                    Confirm & Place Bid
                  </Button>
                </div>
              </form>
            )}
          </>
        )}

        {/* Tab 2: Test Report Preview */}
        {activeTab === 'report' && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-card bg-card-raised border border-border-subtle space-y-3">
              <div className="flex items-center justify-between border-b border-border-subtle pb-2.5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span className="font-semibold text-tprimary">Independent QA Certification</span>
                </div>
                <span className="font-mono text-[10px] text-emerald-500 font-semibold uppercase">
                  STATUS: PASSED
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono text-[11px]">
                <div>
                  <span className="text-tmuted">REPORT ID:</span>
                  <div className="text-tprimary font-semibold">{listing.testReport?.id}</div>
                </div>
                <div>
                  <span className="text-tmuted">DATE TESTED:</span>
                  <div className="text-tprimary">{listing.testReport?.date}</div>
                </div>
                <div>
                  <span className="text-tmuted">CERTIFIED BY:</span>
                  <div className="text-tprimary">{listing.testReport?.certifiedBy}</div>
                </div>
                <div>
                  <span className="text-tmuted">BURN-IN DURATION:</span>
                  <div className="text-tprimary">{listing.testReport?.burnInHours} hours continuous</div>
                </div>
              </div>

              <div className="pt-2 border-t border-border-subtle space-y-2">
                <div className="flex justify-between">
                  <span className="text-tsecondary">Thermal Performance:</span>
                  <span className="font-mono text-thermal font-semibold">
                    {listing.testReport?.thermalDeltaT}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-tsecondary">Leakage / Grounding:</span>
                  <span className="font-mono text-emerald-500">
                    {listing.testReport?.leakageRate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-tsecondary">Diagnostic Compliance:</span>
                  <span className="font-mono text-tprimary font-semibold">
                    {listing.testReport?.benchScore}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button variant="secondary" size="sm" onClick={() => setActiveTab('bid')}>
                Return to Bid Form
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
