/**
 * Carbon emission factors, equivalencies, and certificate data constants
 */
export const CARBON_METRICS = {
  // Emission factor for natural gas boiler displacement on PJM grid
  emissionFactorPerMWh: 0.390, // tonnes CO2e / MWh
  monthlyThermalRecapturedMWh: 1248,
  // 1248 * 0.390 = 486.72 tonnes CO2e
  monthlyCo2AvoidedTonnes: 486.7,
  monthlyCo2AvoidedTonnesExact: 486.72,
  // EPA passenger vehicle equivalence: approx 4.3 tonnes CO2e/car/yr
  carsEquivalent: 113,
  reportingPeriod: '02 Oct – 31 Oct 2026',
  sampleReference: 'CND-VA-2026-10',
  networkFacilityCount: 18,
  disclaimer: 'Illustrative sample only. Not issued, endorsed or validated by the U.S. Environmental Protection Agency (EPA).',
  methodologyFootnote: '0.390 tCO₂e / MWh displaced based on regional natural gas boiler fuel displacement factor in PJM interconnection territory.',
};
