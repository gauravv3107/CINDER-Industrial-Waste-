import { INITIAL_JOBS } from '../data/jobs';
import { calculateJobSkillMatch } from '../utils/jobMatch';

/**
 * Green Jobs Service - Future MERN Architecture Integration
 *
 * Future REST Endpoints:
 *   GET  /api/jobs
 *   POST /api/jobs
 *   POST /api/jobs/:id/apply
 *   POST /api/profile/parse-resume
 *
 * Future MongoDB Queries:
 *   Jobs: db.jobs.find({ status: "open", category: categoryRegex })
 */

/**
 * Fetch green infrastructure job contracts with live resume match scoring
 * @param {string[]} candidateSkills
 * @param {object} filters
 */
export async function getJobs(candidateSkills = [], filters = {}) {
  await new Promise((resolve) => setTimeout(resolve, 200));

  let items = INITIAL_JOBS.map((job) => {
    const match = calculateJobSkillMatch(candidateSkills, job.requiredSkills, job.preferredSkills);
    return {
      ...job,
      matchPct: match.matchPct,
      matchedRequired: match.matchedRequired,
      missingRequired: match.missingRequired,
      matchedPreferred: match.matchedPreferred,
    };
  });

  // Filter category
  if (filters.category && filters.category !== 'All contracts') {
    items = items.filter((j) => j.category === filters.category);
  }

  // Filter contract type
  if (filters.contractType && filters.contractType !== 'All types') {
    items = items.filter((j) => j.contractType === filters.contractType);
  }

  // Filter distance
  if (filters.maxDistanceKm) {
    items = items.filter((j) => j.distanceKm <= filters.maxDistanceKm);
  }

  // Sorting
  if (filters.sortBy === 'rate') {
    items.sort((a, b) => b.rateMax - a.rateMax);
  } else if (filters.sortBy === 'newest') {
    items.sort((a, b) => a.postedAgo.localeCompare(b.postedAgo));
  } else {
    // Default: best skill match
    items.sort((a, b) => b.matchPct - a.matchPct);
  }

  return {
    jobs: items,
    totalCount: items.length,
    strongMatchesCount: items.filter((j) => j.matchPct >= 80).length,
  };
}

/**
 * Simulate resume re-parsing with updated extracted skill list
 * @param {File | string} file
 */
export async function parseResumeFile(file) {
  // Simulate AI document extraction latency (800ms)
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    success: true,
    fileName: typeof file === 'string' ? file : file?.name || 'Alex_Morgan_Resume_Updated.pdf',
    extractedSkillsCount: 17,
    parsedDate: '02 Nov 2026',
    profileStrengthPct: 94,
    newSkillsFound: [
      'Orbital welding (ASME Section IX)',
      'Two-phase immersion cooling',
      'Secondary loop balancing',
    ],
  };
}

/**
 * Submit job application
 * @param {string} jobId
 * @param {object} applicationData
 */
export async function submitJobApplication(jobId, applicationData) {
  await new Promise((resolve) => setTimeout(resolve, 350));
  return {
    success: true,
    referenceId: `APP-${jobId}-${Math.floor(100 + Math.random() * 900)}`,
    submittedAt: new Date().toISOString(),
  };
}

/**
 * Post a new contract to the board
 * @param {object} contractData
 */
export async function postJobContract(contractData) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const newContract = {
    id: `JOB-${String(Math.floor(100 + Math.random() * 900))}`,
    ...contractData,
    postedAgo: 'Just now',
    urgent: false,
  };
  INITIAL_JOBS.unshift(newContract);
  return newContract;
}
