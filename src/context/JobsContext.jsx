import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { INITIAL_JOBS } from '../data/jobs';
import { INITIAL_USER_PROFILE, UPDATED_USER_PROFILE_SKILLS } from '../data/userProfile';
import { calculateJobSkillMatch } from '../utils/jobMatch';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';

const JobsContext = createContext(null);

export const JOB_CATEGORIES = [
  'All contracts',
  'HVAC',
  'Thermal piping',
  'Commissioning',
  'Electrical',
  'Controls',
];

export function JobsProvider({ children }) {
  const { addToast } = useToast();
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [activeCategory, setActiveCategory] = useState('All contracts');
  const [contractTypeFilter, setContractTypeFilter] = useState('All types');
  const [maxDistanceKm, setMaxDistanceKm] = useState(25);
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'grid'
  const [sortBy, setSortBy] = useState('match'); // 'match' | 'rate' | 'newest'
  const [isUpdatingResume, setIsUpdatingResume] = useState(false);

  // User Profile with parsed skills
  const [userProfile, setUserProfile] = useState(INITIAL_USER_PROFILE);

  // Saved jobs persisted in localStorage
  const [savedJobs, setSavedJobs] = useLocalStorage('cinder_saved_jobs', ['JOB-041']);

  const toggleSaveJob = useCallback((id) => {
    setSavedJobs((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];
      addToast(exists ? 'Job removed from saved contracts' : 'Job saved to contracts', 'info');
      return updated;
    });
  }, [setSavedJobs, addToast]);

  // Simulate resume upload & parsing
  const triggerResumeUpdate = useCallback(() => {
    setIsUpdatingResume(true);
    addToast('Parsing updated resume (Alex_Morgan_Resume_v2.pdf)...', 'info');

    setTimeout(() => {
      setUserProfile((prev) => ({
        ...prev,
        resumeFileName: 'Alex_Morgan_Resume_v2.pdf',
        resumeParsedDate: 'Just now',
        profileStrengthPct: 95,
        skills: UPDATED_USER_PROFILE_SKILLS,
        experienceYears: 8.5,
      }));
      setIsUpdatingResume(false);
      addToast('Resume parsed! Extracted 17 skills. Match scores re-ranked.', 'success');
    }, 1200);
  }, [addToast]);

  const postNewContract = useCallback((contractData) => {
    const newContract = {
      id: `JOB-${Math.floor(100 + Math.random() * 900)}`,
      ...contractData,
      postedAgo: 'Just now',
      urgent: false,
      skillNotice: 'Custom posted contract',
    };
    setJobs((prev) => [newContract, ...prev]);
    addToast(`Contract posted: "${newContract.title}"`, 'success');
  }, [addToast]);

  // Scored and filtered jobs
  const scoredJobs = useMemo(() => {
    const scored = jobs.map((job) => {
      const match = calculateJobSkillMatch(
        userProfile.skills,
        job.requiredSkills,
        job.preferredSkills
      );
      return {
        ...job,
        matchPct: match.matchPct,
        matchedRequired: match.matchedRequired,
        missingRequired: match.missingRequired,
        matchedPreferred: match.matchedPreferred,
      };
    });

    return scored.filter((job) => {
      // Category
      if (activeCategory !== 'All contracts' && job.category !== activeCategory) {
        return false;
      }
      // Contract type
      if (contractTypeFilter !== 'All types' && job.contractType !== contractTypeFilter) {
        return false;
      }
      // Distance
      if (job.distanceKm > maxDistanceKm) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'rate') return b.rateMax - a.rateMax;
      if (sortBy === 'newest') return a.postedAgo.localeCompare(b.postedAgo);
      // Default: best skill match
      return b.matchPct - a.matchPct;
    });
  }, [jobs, userProfile.skills, activeCategory, contractTypeFilter, maxDistanceKm, sortBy]);

  const strongMatchesCount = useMemo(() => {
    return scoredJobs.filter((j) => j.matchPct >= 80).length;
  }, [scoredJobs]);

  return (
    <JobsContext.Provider
      value={{
        jobs: scoredJobs,
        totalContracts: scoredJobs.length,
        strongMatchesCount,
        activeCategory,
        setActiveCategory,
        contractTypeFilter,
        setContractTypeFilter,
        maxDistanceKm,
        setMaxDistanceKm,
        viewMode,
        setViewMode,
        sortBy,
        setSortBy,
        userProfile,
        isUpdatingResume,
        triggerResumeUpdate,
        savedJobs,
        toggleSaveJob,
        isJobSaved: (id) => savedJobs.includes(id),
        postNewContract,
      }}
    >
      {children}
    </JobsContext.Provider>
  );
}

export function useJobs() {
  const ctx = useContext(JobsContext);
  if (!ctx) {
    throw new Error('useJobs must be used within a JobsProvider');
  }
  return ctx;
}
