/**
 * AI Rationale Service - Thermodynamic Match Reasoning
 *
 * TODO (Future Backend Integration):
 *   Endpoint: POST /api/matches/:id/rationale
 *   AI Model: Google Gemini 1.5 Pro via Google AI SDK
 *   Prompt Context:
 *     "Given data center source parameters (supplyTempC, flowLps, distanceKm)
 *      and off-taker thermodynamic profile (inletC, heatDemandMW, operatingProfile),
 *      generate an engineering-grade thermodynamic match rationale and risk analysis."
 */

/**
 * Generate engineering rationale for a facility match
 * @param {object} facility
 * @param {number} supplyTempC
 * @param {number} flowLps
 * @param {number} capacityMW
 * @returns {Promise<{
 *   rationale: string,
 *   confidence: string,
 *   modelVer: string,
 *   subscores: Array<{ label: string, score: number, weight: string, weightPct: number }>,
 *   lossPct: number,
 *   deliveredMW: number,
 *   inputs: object
 * }>}
 */
export async function getMatchRationale(facility, supplyTempC, flowLps, capacityMW) {
  // Simulate AI model inference latency (350ms)
  await new Promise((resolve) => setTimeout(resolve, 350));

  const lossPct = facility.estimatedLossPct || 7.4;
  const deliveredMW = facility.deliveredMW || Number((capacityMW * (1 - lossPct / 100)).toFixed(2));
  const sub = facility.subscores || { temp: 98, distance: 94, continuity: 96, capacity: 93 };

  // Plain-language deterministic rationale synthesis
  const rationale = `Your ${supplyTempC}°C supply meets ${facility.name}'s ${facility.inletC}°C inlet requirement with a short, insulated pipe route (${facility.distanceKm} km) and consistent heat demand (${facility.heatDemandMW} MW). The estimated ${lossPct}% distribution loss remains well within acceptable operational thresholds for DN150 pre-insulated piping.`;

  const subscores = [
    { label: 'Temperature compatibility', score: sub.temp, weight: '48% weight', weightPct: 48 },
    { label: 'Connection distance', score: sub.distance, weight: '25% weight', weightPct: 25 },
    { label: 'Demand continuity', score: sub.continuity, weight: '20% weight', weightPct: 20 },
    { label: 'Capacity alignment', score: sub.capacity, weight: '15% weight', weightPct: 15 },
  ];

  return {
    rationale,
    confidence: 'High data confidence',
    modelVer: 'THERMAL MODEL v2.4',
    subscores,
    lossPct,
    deliveredMW,
    inputs: {
      sourceTemp: `${supplyTempC}°C`,
      facilityInlet: `${facility.inletC}°C`,
      distance: `${facility.distanceKm} km`,
      flowRate: `${flowLps} L/s`,
      usableDeltaT: '10°C usable drop',
      pipeSpecification: 'Insulated DN150 hydronic trunk',
      groundTempBaseline: '15°C soil ambient',
    },
  };
}
