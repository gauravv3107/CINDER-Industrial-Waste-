import { HARDWARE_LISTINGS } from '../data/hardware';

/**
 * Marketplace Service - Future MERN Architecture Integration
 *
 * Future REST Endpoints:
 *   GET  /api/marketplace/listings
 *   POST /api/marketplace/listings/:id/bids
 *   POST /api/marketplace/listings
 *
 * Future MongoDB Queries:
 *   Listings: db.hardware.find({ status: "active", category: categoryRegex, currentBid: { $gte: min, $lte: max } }).sort(...)
 *   Bidding:  db.hardware.updateOne({ _id: ObjectId(id), currentBid: { $lt: newBid } }, { $set: { currentBid: newBid }, $inc: { bidsCount: 1 }, $push: { bidHistory: ... } })
 */

/**
 * Fetch marketplace equipment listings with filtering and pagination
 * @param {object} filters
 * @returns {Promise<{ listings: Array<object>, totalCount: number }>}
 */
export async function getHardwareListings(filters = {}) {
  await new Promise((resolve) => setTimeout(resolve, 200));

  let items = [...HARDWARE_LISTINGS];

  // Category filter
  if (filters.category && filters.category !== 'All equipment') {
    items = items.filter((item) => item.category === filters.category);
  }

  // Condition filter
  if (filters.condition && filters.condition !== 'All conditions') {
    items = items.filter((item) => item.condition.includes(filters.condition));
  }

  // Max distance filter
  if (filters.maxDistanceKm) {
    items = items.filter((item) => item.distanceKm <= filters.maxDistanceKm);
  }

  // Verified seller filter
  if (filters.onlyVerified) {
    items = items.filter((item) => item.sellerVerified);
  }

  // Price range
  if (filters.maxPrice) {
    items = items.filter((item) => item.currentBid <= filters.maxPrice);
  }

  // Min units
  if (filters.minUnits) {
    items = items.filter((item) => item.unitsAvailable >= filters.minUnits);
  }

  // Search query
  if (filters.search) {
    const q = filters.search.toLowerCase();
    items = items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        item.seller.toLowerCase().includes(q) ||
        item.specs.some((s) => s.toLowerCase().includes(q))
    );
  }

  // Sorting
  if (filters.sortBy === 'priceAsc') {
    items.sort((a, b) => a.currentBid - b.currentBid);
  } else if (filters.sortBy === 'priceDesc') {
    items.sort((a, b) => b.currentBid - a.currentBid);
  } else if (filters.sortBy === 'discount') {
    items.sort((a, b) => b.belowNewPct - a.belowNewPct);
  } else {
    // Default: ending soonest
    items.sort((a, b) => new Date(a.endsAt).getTime() - new Date(b.endsAt).getTime());
  }

  return {
    listings: items,
    totalCount: items.length,
  };
}

/**
 * Place a bid on an equipment listing
 * @param {string} listingId
 * @param {number} bidAmount
 * @param {number} quantity
 * @returns {Promise<{ success: boolean, updatedBid: number, totalBids: number }>}
 */
export async function placeListingBid(listingId, bidAmount, quantity = 1) {
  await new Promise((resolve) => setTimeout(resolve, 350));

  const item = HARDWARE_LISTINGS.find((h) => h.id === listingId);
  if (!item) {
    throw new Error('Listing not found');
  }

  const minAcceptable = Math.ceil(item.currentBid * (1 + item.minIncrementPct / 100));
  if (bidAmount < minAcceptable) {
    throw new Error(`Bid must be at least ${minAcceptable}`);
  }

  item.currentBid = bidAmount;
  item.bidsCount += 1;

  return {
    success: true,
    updatedBid: bidAmount,
    totalBids: item.bidsCount,
    totalValue: bidAmount * quantity,
  };
}

/**
 * Create a new equipment listing
 * @param {object} listingData
 */
export async function createEquipmentListing(listingData) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const newListing = {
    id: `EQ-${String(Math.floor(1000 + Math.random() * 9000))}`,
    ...listingData,
    bidsCount: 0,
    endsAt: new Date(Date.now() + 7 * 24 * 3600000).toISOString(),
    sellerVerified: true,
  };
  HARDWARE_LISTINGS.unshift(newListing);
  return newListing;
}
