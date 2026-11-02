import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Drawer } from '../components/ui/Drawer';
import { Modal } from '../components/ui/Modal';
import { ContractModal } from '../components/modals/ContractModal';
import { PostContractModal } from '../components/modals/PostContractModal';
import { useJobs, JOB_CATEGORIES } from '../context/JobsContext';
import {
  Briefcase,
  PlusCircle,
  Bookmark,
  CheckCircle2,
  AlertCircle,
  FileText,
  Upload,
  ExternalLink,
  MapPin,
  Clock,
  Sparkles,
  LayoutList,
  LayoutGrid,
  Check,
  ChevronRight,
  ShieldCheck,
  Loader2,
} from 'lucide-react';
import clsx from 'clsx';

export function Jobs() {
  const {
    jobs,
    totalContracts,
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
    isJobSaved,
  } = useJobs();

  // Modals state
  const [selectedContractForModal, setSelectedContractForModal] = useState(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);

  // Pagination / expansion (4 initial, "More contracts")
  const [visibleCount, setVisibleCount] = useState(4);
  const visibleJobs = jobs.slice(0, visibleCount);
  const hasMore = visibleCount < jobs.length;

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-150">
      {/* Breadcrumb Header */}
      <div className="flex items-center justify-between border-b border-border-subtle pb-3">
        <div className="flex items-center gap-2 font-mono text-[10px] text-tmuted tracking-widest uppercase">
          <span className="text-tsecondary font-semibold">MARKETPLACE</span>
          <span>/</span>
          <span>GREEN INFRASTRUCTURE JOBS</span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-medium text-tprimary tracking-tight font-sans">
            Good work. Real-world impact.
          </h1>
          <p className="text-sm text-tsecondary mt-1">
            The skilled people behind circular infrastructure. Find your next HVAC, cooling or thermal piping contract.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="secondary"
            size="md"
            onClick={() => setIsSavedDrawerOpen(true)}
            icon={Bookmark}
          >
            Saved jobs · {savedJobs.length}
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={() => setIsPostModalOpen(true)}
            icon={PlusCircle}
          >
            Post a contract
          </Button>
        </div>
      </div>

      {/* Category Chips Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {JOB_CATEGORIES.map((cat) => {
          const isSelected = activeCategory === cat;
          const count = cat === 'All contracts'
            ? totalContracts
            : jobs.filter((j) => j.category === cat).length;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
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

      {/* Filters and View Controls Bar */}
      <div className="p-4 rounded-card bg-card border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Distance & Contract type & Match summary */}
        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={maxDistanceKm}
            onChange={(e) => setMaxDistanceKm(Number(e.target.value))}
            className="bg-card-raised border border-border-subtle rounded-element px-3 py-1.5 text-xs text-tprimary font-medium focus:outline-none focus:border-thermal"
          >
            <option value={15}>Within 15 km</option>
            <option value={25}>Within 25 km</option>
            <option value={50}>Within 50 km</option>
          </select>

          <select
            value={contractTypeFilter}
            onChange={(e) => setContractTypeFilter(e.target.value)}
            className="bg-card-raised border border-border-subtle rounded-element px-3 py-1.5 text-xs text-tprimary font-medium focus:outline-none focus:border-thermal"
          >
            <option value="All types">Contract & Full-time</option>
            <option value="Contract">Contract only</option>
            <option value="Full-time">Full-time only</option>
          </select>

          <div className="h-4 w-px bg-border-subtle hidden sm:block" />

          <span className="text-xs text-tmuted font-mono">
            {totalContracts} contracts · <span className="text-emerald-500 font-semibold">{strongMatchesCount} strongly match</span> your experience
          </span>
        </div>

        {/* Right: Sort & List/Grid View Toggle (Required by brief) */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-card-raised border border-border-subtle rounded-element px-3 py-1.5 text-xs text-tprimary font-medium focus:outline-none focus:border-thermal"
          >
            <option value="match">Best skill match</option>
            <option value="rate">Highest rate ($/hr)</option>
            <option value="newest">Newest posted</option>
          </select>

          {/* List / Grid Toggle */}
          <div className="flex items-center bg-card-raised border border-border-subtle rounded-element p-0.5 select-none">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              aria-label="List view"
              className={clsx(
                'p-1.5 rounded-lg transition-colors',
                viewMode === 'list'
                  ? 'bg-card text-thermal shadow-sm'
                  : 'text-tmuted hover:text-tsecondary'
              )}
            >
              <LayoutList className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
              className={clsx(
                'p-1.5 rounded-lg transition-colors',
                viewMode === 'grid'
                  ? 'bg-card text-thermal shadow-sm'
                  : 'text-tmuted hover:text-tsecondary'
              )}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout: Left Contracts (8 cols) | Right Sidebar (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Job Cards */}
        <div className="lg:col-span-8 space-y-4">
          <div
            className={clsx(
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 gap-4 space-y-0'
                : 'space-y-4'
            )}
          >
            {visibleJobs.map((contract) => {
              const isSaved = isJobSaved(contract.id);

              return (
                <Card
                  key={contract.id}
                  className="flex flex-col justify-between hover:border-border-strong transition-all duration-200 p-5 group"
                >
                  <div className="space-y-3">
                    {/* Top Row: Meta, Urgent pill, Bookmark, Match % */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] text-tmuted">
                            {contract.id}
                          </span>
                          {contract.urgent && (
                            <Badge variant="urgent" size="xs" dot={true}>
                              Urgent
                            </Badge>
                          )}
                          <span className="text-[10px] font-mono text-tmuted">
                            · {contract.postedAgo}
                          </span>
                        </div>

                        <h3 className="text-base font-semibold text-tprimary tracking-tight leading-snug group-hover:text-thermal transition-colors">
                          {contract.title}
                        </h3>

                        <div className="flex items-center gap-2 text-xs text-tsecondary">
                          <span className="font-medium">{contract.company}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1 text-tmuted">
                            <MapPin className="w-3 h-3" />
                            {contract.city} ({contract.distanceKm} km)
                          </span>
                        </div>
                      </div>

                      {/* Top Right: Match % & Bookmark */}
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => toggleSaveJob(contract.id)}
                          aria-label="Save job"
                          className={clsx(
                            'p-1.5 rounded-lg border transition-colors',
                            isSaved
                              ? 'bg-thermal text-white border-thermal'
                              : 'bg-card-raised border-border-subtle text-tmuted hover:text-tprimary'
                          )}
                        >
                          <Bookmark className={clsx('w-3.5 h-3.5', isSaved && 'fill-current')} />
                        </button>

                        <div className="text-right">
                          <div className="text-lg font-bold font-mono text-thermal tabular-nums">
                            {contract.matchPct}%
                          </div>
                          <span className="micro-label text-[9px] -mt-1 block">
                            AI SKILL MATCH
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Rate & Terms Row */}
                    <div className="flex items-baseline gap-3 text-xs font-mono pt-1">
                      <span className="text-base font-bold text-emerald-500">
                        ${contract.rateMin}–${contract.rateMax} /hr
                      </span>
                      <span className="text-tmuted">
                        {contract.durationWeeks} weeks · {contract.hoursPerWeek} h/wk ({contract.contractType})
                      </span>
                    </div>

                    {/* Skill Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {contract.requiredSkills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="font-mono text-[10px] px-2 py-0.5 rounded bg-card-raised border border-border-subtle text-tsecondary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Match statement line */}
                    <div className="flex items-center gap-1.5 text-xs pt-1">
                      {contract.matchPct >= 90 ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span className="text-emerald-500 font-medium">All required skills matched</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span className="text-amber-500 font-medium">{contract.skillNotice}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-4 mt-4 border-t border-border-subtle flex items-center justify-between">
                    <span className="font-mono text-[10px] text-tmuted">
                      {contract.category}
                    </span>

                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setSelectedContractForModal(contract)}
                      iconRight={ChevronRight}
                    >
                      View contract
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Expand More Contracts Button */}
          {hasMore && (
            <div className="pt-3 flex justify-center">
              <Button
                variant="outline"
                size="md"
                onClick={() => setVisibleCount((prev) => prev + 4)}
              >
                More contracts ({jobs.length - visibleCount} remaining)
              </Button>
            </div>
          )}
        </div>

        {/* Right Sidebar: Candidate Profile, Resume chip, Skills, Training */}
        <div className="lg:col-span-4 space-y-6">
          {/* Candidate Field Experience Card */}
          <Card className="space-y-4">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <h3 className="text-sm font-semibold text-tprimary">
                Your field experience
              </h3>
              <span className="micro-label">PROFILE VERIFIED</span>
            </div>

            {/* Candidate Header */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-thermal/20 text-thermal font-mono font-bold text-base flex items-center justify-center shrink-0 border border-thermal/30">
                {userProfile.initials}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-tprimary">
                  {userProfile.name}
                </h4>
                <div className="text-xs text-tsecondary">
                  {userProfile.role} · {userProfile.experienceYears} yrs
                </div>
                <div className="text-[10px] font-mono text-tmuted">
                  {userProfile.location}
                </div>
              </div>
            </div>

            {/* Resume File Chip */}
            <div className="p-3 rounded-element bg-card-raised border border-border-subtle flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 overflow-hidden">
                <FileText className="w-4 h-4 text-thermal shrink-0" />
                <div className="truncate">
                  <div className="font-mono font-medium text-tprimary truncate">
                    {userProfile.resumeFileName}
                  </div>
                  <div className="text-[10px] text-tmuted">
                    Parsed · {userProfile.skills.length} skills extracted · {userProfile.resumeParsedDate}
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Strength Bar */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between items-center text-tsecondary">
                <span>Profile match strength</span>
                <span className="font-mono font-bold text-emerald-500 tabular-nums">
                  {userProfile.profileStrengthPct}%
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-card-raised border border-border-subtle overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${userProfile.profileStrengthPct}%` }}
                />
              </div>
            </div>

            {/* Update Resume Button (Simulates file upload + re-parsing) */}
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-center"
              isLoading={isUpdatingResume}
              onClick={triggerResumeUpdate}
              icon={Upload}
            >
              {isUpdatingResume ? 'Extracting skills...' : 'Update resume'}
            </Button>
          </Card>

          {/* Skills That Travel Well Card */}
          <Card className="space-y-3">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <h3 className="text-sm font-semibold text-tprimary">
                Skills that travel well
              </h3>
              <span className="micro-label">CERTIFIED CORE</span>
            </div>

            <div className="space-y-2 text-xs">
              {userProfile.topTravelSkills.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-tprimary">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span className="font-medium">{item.name}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-border-subtle">
              <button
                type="button"
                onClick={() => setIsSkillsModalOpen(true)}
                className="text-xs font-mono text-thermal hover:text-thermal-hover inline-flex items-center gap-1 transition-colors"
              >
                <span>View all {userProfile.skills.length} skills</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </Card>

          {/* Green Card: Upskilling / Training CTA */}
          <div className="p-4 rounded-card bg-emerald-500/10 border border-emerald-500/25 space-y-2">
            <h4 className="text-sm font-semibold text-tprimary">
              One skill. More open doors.
            </h4>
            <p className="text-xs text-tsecondary leading-relaxed">
              Adding <span className="font-semibold text-tprimary">Orbital welding</span> or <span className="font-semibold text-tprimary">Two-phase immersion</span> qualifies you for +6 high-rate data center commissioning contracts.
            </p>
            <a
              href="#training"
              onClick={(e) => {
                e.preventDefault();
                triggerResumeUpdate();
              }}
              className="text-xs font-mono font-medium text-emerald-500 hover:text-emerald-400 inline-flex items-center gap-1 transition-colors pt-1"
            >
              <span>Explore training partners ↗</span>
            </a>
          </div>

          {/* Guidance Footnote */}
          <p className="text-[11px] text-tmuted leading-relaxed">
            Skill matches are guidance, not hiring decisions. Employers verify credentials, safety records, and local trade union affiliations.
          </p>
        </div>
      </div>

      {/* Contract Detail & Apply Modal */}
      <ContractModal
        isOpen={Boolean(selectedContractForModal)}
        onClose={() => setSelectedContractForModal(null)}
        contract={selectedContractForModal}
      />

      {/* Post Contract Modal */}
      <PostContractModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
      />

      {/* View All Candidate Skills Modal */}
      <Modal
        isOpen={isSkillsModalOpen}
        onClose={() => setIsSkillsModalOpen(false)}
        title={`Extracted Skills for ${userProfile.name}`}
        subtitle={`14 verified competencies parsed from ${userProfile.resumeFileName}`}
        size="md"
      >
        <div className="space-y-4 text-xs">
          <div className="flex flex-wrap gap-2">
            {userProfile.skills.map((s, idx) => (
              <span
                key={idx}
                className="font-mono text-xs px-3 py-1.5 rounded-element bg-card-raised border border-border-subtle text-tprimary"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="pt-3 border-t border-border-subtle">
            <div className="micro-label mb-2">VERIFIED CERTIFICATIONS</div>
            <ul className="space-y-1.5 text-tsecondary">
              {userProfile.certifications.map((c, i) => (
                <li key={i} className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Modal>

      {/* Saved Jobs Drawer */}
      <Drawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        title="Saved Contracts"
        subtitle={`Tracking ${savedJobs.length} saved infrastructure jobs`}
        width="md"
        ariaLabel="Saved Contracts Drawer"
      >
        <div className="space-y-4 text-xs">
          {savedJobs.length === 0 ? (
            <div className="py-12 text-center text-tmuted">
              No contracts bookmarked yet.
            </div>
          ) : (
            <div className="space-y-3">
              {jobs
                .filter((j) => savedJobs.includes(j.id))
                .map((job) => (
                  <div
                    key={job.id}
                    className="p-4 rounded-card bg-card-raised border border-border-subtle space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-tmuted">
                        {job.id}
                      </span>
                      <span className="font-mono font-bold text-thermal">
                        {job.matchPct}% MATCH
                      </span>
                    </div>

                    <h4 className="font-semibold text-tprimary text-sm">
                      {job.title}
                    </h4>

                    <div className="text-xs text-tsecondary">
                      {job.company} · ${job.rateMin}–${job.rateMax}/hr
                    </div>

                    <div className="pt-2 flex justify-end">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setIsSavedDrawerOpen(false);
                          setSelectedContractForModal(job);
                        }}
                      >
                        View Details
                      </Button>
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
