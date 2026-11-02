import { FACILITIES } from '../data/facilities';
import { scoreFacility } from '../utils/thermo';

/**
 * Facility Service - Future MERN Architecture Integration
 *
 * Future REST Endpoint: GET /api/facilities/search
 * Future MongoDB Atlas Geospatial Aggregation:
 *   db.facilities.aggregate([
 *     {
 *       $geoNear: {
 *         near: { type: "Point", coordinates: [sourceLng, sourceLat] },
 *         distanceField: "distanceKm",
 *         maxDistance: maxDistanceMeters,
 *         spherical: true,
 *         query: { isOperational: true }
 *       }
 *     },
 *     { $match: { inletC: { $lte: supplyTempC + 5 } } }
 *   ])
 */

/**
 * Fetch compatible off-taker facilities with live thermodynamic scoring
 * @param {object} params
 * @param {number} params.supplyTempC
 * @param {number} params.flowLps
 * @param {number} params.maxDistanceKm
 * @param {string} [params.sortBy='fit'] 'fit' | 'distance' | 'offtake' | 'demand'
 * @returns {Promise<{ facilities: Array<object>, totalCount: number }>}
 */
export async function getFacilities({ supplyTempC = 64, flowLps = 28.6, maxDistanceKm = 10, sortBy = 'fit' }) {
  // Simulate network latency (250ms)
  await new Promise((resolve) => setTimeout(resolve, 250));

  // Score all facilities
  const scored = FACILITIES.map((fac) => {
    const scoreResult = scoreFacility(fac, supplyTempC, flowLps, maxDistanceKm);
    return {
      ...fac,
      matchPct: scoreResult.overallScore,
      isCompatible: scoreResult.isCompatible,
      subscores: scoreResult.subscores,
      estimatedLossPct: scoreResult.estimatedLossPct,
      deliveredMW: scoreResult.deliveredMW,
    };
  });

  // Filter facilities strictly within maximum connection distance
  const filtered = scored.filter((fac) => fac.distanceKm <= maxDistanceKm);

  // Sort based on criteria
  filtered.sort((a, b) => {
    if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
    if (sortBy === 'offtake') return b.offtakeRatePerMWh - a.offtakeRatePerMWh;
    if (sortBy === 'demand') return b.heatDemandMW - a.heatDemandMW;
    // Default: thermodynamic fit descending
    return b.matchPct - a.matchPct;
  });

  return {
    facilities: filtered,
    totalCount: filtered.length,
  };
}

/**
 * Future REST Endpoint: GET /api/facilities/:id
 * Future Mongo Query: db.facilities.findOne({ _id: ObjectId(id) })
 * @param {string} id
 */
export async function getFacilityById(id) {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return FACILITIES.find((f) => f.id === id) || null;
}
