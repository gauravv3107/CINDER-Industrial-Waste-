/**
 * Computes resume skill match percentage against job contract requirements
 * @param {string[]} candidateSkills
 * @param {string[]} requiredSkills
 * @param {string[]} [preferredSkills=[]]
 * @returns {{
 *   matchPct: number,
 *   matchedRequired: string[],
 *   missingRequired: string[],
 *   matchedPreferred: string[]
 * }}
 */
export function calculateJobSkillMatch(candidateSkills, requiredSkills = [], preferredSkills = []) {
  if (!requiredSkills.length) {
    return {
      matchPct: 100,
      matchedRequired: [],
      missingRequired: [],
      matchedPreferred: [],
    };
  }

  const normalizedCandidate = candidateSkills.map((s) => s.toLowerCase().trim());

  const matchedRequired = requiredSkills.filter((req) =>
    normalizedCandidate.includes(req.toLowerCase().trim())
  );
  const missingRequired = requiredSkills.filter(
    (req) => !normalizedCandidate.includes(req.toLowerCase().trim())
  );

  const matchedPreferred = preferredSkills.filter((pref) =>
    normalizedCandidate.includes(pref.toLowerCase().trim())
  );

  // Weight required skills 80%, preferred skills 20%
  const reqPct = (matchedRequired.length / requiredSkills.length) * 80;
  const prefPct = preferredSkills.length > 0
    ? (matchedPreferred.length / preferredSkills.length) * 20
    : 20;

  const matchPct = Math.round(reqPct + prefPct);

  return {
    matchPct: Math.min(Math.max(matchPct, 20), 99),
    matchedRequired,
    missingRequired,
    matchedPreferred,
  };
}
