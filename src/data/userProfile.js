export const INITIAL_USER_PROFILE = {
  name: 'Alex Morgan',
  initials: 'AM',
  role: 'Mechanical Systems Lead',
  experienceYears: 8,
  profileStrengthPct: 86,
  resumeFileName: 'Alex_Morgan_Resume.pdf',
  resumeParsedDate: '30 Oct 2026',
  email: 'alex.morgan@thermalops.io',
  location: 'Loudoun County, VA',
  skills: [
    'EPA 608 Universal',
    'Hydronic systems',
    'BMS controls',
    'Pressure testing',
    'Pre-insulated piping',
    'Plate heat exchangers',
    'Variable frequency drives (VFD)',
    'Direct-to-chip liquid cooling',
    'Chilled water commissioning',
    'HVAC retrofit',
    'Cooling distribution units (CDU)',
    'Thermal balance verification',
    'SCADA / Modbus telemetry',
    'Helium leak detection',
  ],
  certifications: [
    'EPA Section 608 Universal Certification (#VA-89102)',
    'OSHA 30-Hour Construction Safety',
    'ASHRAE Certified Commissioning Professional (BCxP)',
    'Victaulic Certified Mechanical Piping Installer',
  ],
  topTravelSkills: [
    { name: 'EPA 608 Universal', active: true },
    { name: 'Hydronic systems', active: true },
    { name: 'BMS controls', active: true },
    { name: 'Pressure testing', active: true },
  ],
};

// Alternative updated resume profile with orbital welding and advanced cryogenic/immersion skills
export const UPDATED_USER_PROFILE_SKILLS = [
  ...INITIAL_USER_PROFILE.skills,
  'Orbital welding (ASME Section IX)',
  'Two-phase immersion cooling',
  'Secondary loop balancing',
];
