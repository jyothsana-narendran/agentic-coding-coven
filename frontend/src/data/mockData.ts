import type {
  CareerProfile,
  JobMatch,
  JobStrategy,
  Recommendations,
  TargetProfile,
} from '../types/domain'

export const mockCareerProfile: CareerProfile = {
  id: 'candidate_001',
  candidate_name: 'Alex Morgan',
  summary:
    'Product-minded software engineer with four years of experience building reliable web products and data-informed user experiences.',
  education: [
    {
      institution: 'National University of Singapore',
      degree: 'Bachelor of Computing',
      field: 'Computer Science',
      end_date: '2022',
      evidence: 'Education section of resume',
    },
  ],
  skills: [
    { name: 'TypeScript', category: 'technical', proficiency: 'advanced', evidence: [{ source: 'resume', text: 'Built TypeScript applications across three product teams.' }] },
    { name: 'React', category: 'technical', proficiency: 'advanced', evidence: [{ source: 'resume', text: 'Led the migration of a customer portal to React.' }] },
    { name: 'Python', category: 'technical', proficiency: 'intermediate', evidence: [{ source: 'linkedin', text: 'Lists Python in skills and recent project work.' }] },
    { name: 'AWS', category: 'tool', proficiency: 'intermediate', evidence: [{ source: 'resume', text: 'Deployed services using Lambda and ECS.' }] },
    { name: 'Cross-functional collaboration', category: 'soft', proficiency: 'advanced', evidence: [{ source: 'linkedin', text: 'Recommendations cite close work with product and design.' }] },
  ],
  experience: [
    {
      company: 'Northstar Labs',
      role: 'Software Engineer',
      start_date: '2022',
      description: 'Built workflow and analytics products for B2B teams.',
      achievements: [
        'Reduced dashboard load time by 38%.',
        'Shipped an onboarding redesign that improved activation by 16%.',
      ],
      skills_used: ['React', 'TypeScript', 'Python', 'AWS'],
      evidence: [{ source: 'resume', text: 'Most recent experience entry.' }],
    },
  ],
  projects: [
    {
      name: 'Support Insight',
      description: 'A tool that groups customer feedback into actionable product themes.',
      technologies: ['Python', 'React'],
      achievements: ['Processed more than 10,000 feedback records.'],
      evidence: [{ source: 'linkedin', text: 'Featured project.' }],
    },
  ],
  achievements: [
    { description: 'Improved customer activation', metric: '16%', evidence: [{ source: 'resume', text: 'Northstar Labs achievement.' }] },
  ],
  certifications: [],
}

export const mockTargetProfile: TargetProfile = {
  company: 'Orbit',
  role: 'Senior Product Engineer',
  seniority: 'Senior',
  responsibilities: [
    { description: 'Own customer-facing features from discovery to launch.', evidence_from_jd: 'Own features end-to-end with product and design.' },
    { description: 'Build scalable web applications and APIs.', evidence_from_jd: 'Design and ship scalable React and Python systems.' },
  ],
  required_skills: [
    { name: 'React', importance: 'critical', evidence_from_jd: 'Deep production experience with React.' },
    { name: 'TypeScript', importance: 'critical', evidence_from_jd: 'Fluency with TypeScript is required.' },
    { name: 'Python', importance: 'high', evidence_from_jd: 'Experience building Python APIs.' },
    { name: 'System design', importance: 'high', evidence_from_jd: 'Make sound architectural decisions as systems scale.' },
  ],
  preferred_skills: [
    { name: 'GraphQL', importance: 'medium', evidence_from_jd: 'GraphQL experience is a plus.' },
    { name: 'Mentoring', importance: 'medium', evidence_from_jd: 'Help grow engineers through feedback and mentoring.' },
  ],
  soft_skills: ['Communication', 'Product judgment', 'Collaboration'],
  experience_requirements: ['5+ years of software engineering experience', 'Experience owning product outcomes'],
  education_requirements: [],
  keywords: ['system design', 'GraphQL', 'mentoring', 'product strategy'],
  signals: ['Comfort with ambiguity', 'Strong customer empathy'],
}

export const mockJobMatch: JobMatch = {
  overall_score: 76,
  matched_skills: [
    { skill: 'React', candidate_level: 'advanced', target_importance: 'critical', evidence: 'Led a React migration and shipped customer-facing workflows.' },
    { skill: 'TypeScript', candidate_level: 'advanced', target_importance: 'critical', evidence: 'Used TypeScript across three product teams.' },
    { skill: 'Python', candidate_level: 'intermediate', target_importance: 'high', evidence: 'Built Python services and a feedback analysis project.' },
    { skill: 'AWS', candidate_level: 'intermediate', target_importance: 'medium', evidence: 'Deployed production services with Lambda and ECS.' },
  ],
  missing_skills: [
    { skill: 'System design', importance: 'high', reason: 'Your experience implies architectural work, but the resume does not state your decisions or scale clearly.', recommended_action: 'Add one architecture example with constraints, decision, scale, and measurable result.' },
    { skill: 'GraphQL', importance: 'medium', reason: 'The role lists GraphQL as preferred and it does not appear in your profile.', recommended_action: 'Build a small GraphQL API or identify adjacent API design experience.' },
    { skill: 'Mentoring', importance: 'medium', reason: 'The role expects senior engineers to support team growth.', recommended_action: 'Add examples of onboarding, review, pairing, or technical leadership.' },
  ],
  strengths: [
    { strength: 'Strong product engineering track record', evidence: 'You connect technical delivery to activation and performance outcomes.' },
    { strength: 'Relevant modern web stack', evidence: 'Advanced React and TypeScript align with the role’s critical requirements.' },
    { strength: 'Cross-functional delivery', evidence: 'Your profile shows close partnership with product and design.' },
  ],
  experience_gaps: ['The role requests 5+ years; your profile currently demonstrates about 4 years.', 'No explicit people-mentoring example is documented.'],
  keyword_gaps: ['system design', 'GraphQL', 'mentoring', 'product strategy'],
}

export const mockRecommendations: Recommendations = {
  recommendations: [
    {
      id: 'rec_001', category: 'resume', priority: 'critical', title: 'Make your ownership and architecture work explicit',
      current: 'Built workflow and analytics products for B2B teams.',
      suggested: 'Owned architecture and delivery of B2B workflow products used by 40+ customer teams, partnering with product and design from discovery through launch.',
      reason: 'The role prioritizes end-to-end ownership and system design, but your current summary understates both.',
      evidence: [{ source: 'candidate_profile', text: 'Your experience shows product delivery but does not name architectural decisions.' }, { source: 'job_description', text: 'The role asks engineers to own features and make sound architectural decisions.' }],
      status: 'pending',
    },
    {
      id: 'rec_002', category: 'linkedin', priority: 'high', title: 'Lead with product engineering outcomes',
      current: 'Software Engineer at Northstar Labs',
      suggested: 'Product-focused Software Engineer | React, TypeScript & Python | Turning customer problems into measurable outcomes',
      reason: 'A more specific headline makes your strongest alignment visible before a recruiter reads your full profile.',
      evidence: [{ source: 'job_match', text: 'Product engineering and the modern web stack are your strongest areas of alignment.' }],
      status: 'pending',
    },
    {
      id: 'rec_003', category: 'skills', priority: 'high', title: 'Create evidence of system design ability',
      suggested: 'Write a one-page case study covering a system constraint, options considered, your decision, trade-offs, and the outcome.',
      reason: 'System design is a high-importance gap and can be addressed with evidence from work you may already have done.',
      evidence: [{ source: 'job_match', text: 'System design is missing as an explicit, evidenced skill.' }],
      status: 'pending',
    },
    {
      id: 'rec_004', category: 'projects', priority: 'medium', title: 'Extend Support Insight with GraphQL',
      current: 'Support Insight uses Python and React.',
      suggested: 'Add a small GraphQL layer, document the schema decisions, and publish a concise architecture note.',
      reason: 'This turns a preferred-skill gap into a concrete portfolio signal without requiring a new project.',
      evidence: [{ source: 'candidate_profile', text: 'Support Insight is an existing Python and React project.' }, { source: 'job_description', text: 'GraphQL experience is preferred.' }],
      status: 'pending',
    },
    {
      id: 'rec_005', category: 'interview', priority: 'medium', title: 'Prepare a senior ownership story',
      suggested: 'Use the activation redesign to explain how you framed the problem, aligned stakeholders, chose a solution, and measured the 16% improvement.',
      reason: 'A structured ownership story will demonstrate senior-level scope despite the one-year experience gap.',
      evidence: [{ source: 'candidate_profile', text: 'You improved activation by 16%.' }, { source: 'job_match', text: 'Your profile is about one year below the stated experience requirement.' }],
      status: 'pending',
    },
    {
      id: 'rec_006', category: 'career', priority: 'low', title: 'Document informal mentoring',
      suggested: 'List two examples where you helped a teammate through onboarding, code review, pairing, or technical feedback.',
      reason: 'Relevant informal experience may already exist but is not visible in your profile.',
      evidence: [{ source: 'job_match', text: 'No explicit people-mentoring example is documented.' }],
      status: 'pending',
    },
  ],
}

const northstarCareerProfile: CareerProfile = {
  ...mockCareerProfile,
  id: 'candidate_002',
  summary: 'Frontend engineer focused on accessible design systems, React applications, and dependable product delivery.',
}

const northstarTargetProfile: TargetProfile = {
  ...mockTargetProfile,
  company: 'Northstar Health',
  role: 'Frontend Engineer',
  seniority: 'Mid-level',
  keywords: ['accessibility', 'design systems', 'React', 'testing'],
}

const northstarJobMatch: JobMatch = {
  ...mockJobMatch,
  overall_score: 68,
  missing_skills: [
    { skill: 'Automated accessibility testing', importance: 'high', reason: 'The posting calls for a mature accessibility practice, while your profile shows accessible UI work without naming testing methods.', recommended_action: 'Add an example using automated and manual accessibility checks in a shipped workflow.' },
    { skill: 'Design system governance', importance: 'medium', reason: 'You have component experience but do not yet show how you maintained standards across teams.', recommended_action: 'Document one contribution that improved component consistency or adoption.' },
  ],
  experience_gaps: ['No healthcare or regulated-product experience is stated.'],
  keyword_gaps: ['WCAG', 'design system governance', 'Playwright'],
}

const northstarRecommendations: Recommendations = {
  recommendations: mockRecommendations.recommendations.slice(0, 4).map((recommendation, index) => ({
    ...recommendation,
    id: `northstar_rec_${index + 1}`,
    status: index === 0 ? 'accepted' : index === 1 ? 'rejected' : 'pending',
  })),
}

export const mockJobStrategies: JobStrategy[] = [
  {
    id: 'orbit-senior-product-engineer',
    created_at: '2026-09-04T10:00:00.000Z',
    updated_at: '2026-09-05T08:30:00.000Z',
    candidate: {
      profile_id: 'profile-alex-v1',
      inputs: {
        resume_text: 'Alex Morgan — Software Engineer\n\nNorthstar Labs, Software Engineer (2022–Present)\nBuilt workflow and analytics products for B2B teams. Reduced dashboard load time by 38%. Shipped an onboarding redesign that improved activation by 16%.\n\nSkills: React, TypeScript, Python, AWS.\nEducation: Bachelor of Computing, National University of Singapore.',
        linkedin_text: 'Alex Morgan\nSoftware Engineer at Northstar Labs\n\nAbout\nProduct-minded engineer who enjoys turning customer problems into dependable software.\n\nExperience\nPartner with product and design to build analytics and workflow tools.\n\nFeatured\nSupport Insight — grouped more than 10,000 feedback records into product themes.',
      },
      career_profile: mockCareerProfile,
    },
    job_description: 'Orbit is hiring a Senior Product Engineer to own customer-facing features from discovery through launch. You will design and ship scalable React and Python systems, make sound architectural decisions, and help grow other engineers through feedback and mentoring. Deep React and TypeScript experience is required. Python API experience is strongly preferred; GraphQL experience is a plus.',
    target_profile: mockTargetProfile,
    job_match: mockJobMatch,
    recommendations: {
      recommendations: mockRecommendations.recommendations.map((recommendation, index) => ({
        ...recommendation,
        status: index < 2 ? 'accepted' : 'pending',
      })),
    },
  },
  {
    id: 'northstar-frontend-engineer',
    created_at: '2026-09-01T09:15:00.000Z',
    updated_at: '2026-09-02T14:20:00.000Z',
    candidate: {
      profile_id: 'profile-alex-v1',
      inputs: {
        resume_text: 'Alex Morgan — Software Engineer\nReact and TypeScript engineer with experience delivering accessible customer workflows and performance improvements.',
        linkedin_text: 'Alex Morgan\nFrontend-focused software engineer. Experience collaborating with product and design on reusable UI systems.',
      },
      career_profile: northstarCareerProfile,
    },
    job_description: 'Northstar Health is looking for a Frontend Engineer to build accessible clinical workflows in React and TypeScript. You will contribute to a shared design system, partner with designers, and establish reliable UI testing. Knowledge of WCAG and Playwright is preferred.',
    target_profile: northstarTargetProfile,
    job_match: northstarJobMatch,
    recommendations: northstarRecommendations,
  },
]
