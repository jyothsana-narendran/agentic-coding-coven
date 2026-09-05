import type {
  CareerProfile,
  JobMatch,
  JobStrategy,
  RecommendationResult,
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
  match_score: 76,
  strengths: ['Strong product engineering track record', 'Relevant modern web stack', 'Cross-functional delivery'],
  skill_gaps: ['System design evidence is not explicit.', 'GraphQL does not appear in the profile.', 'Mentoring experience is not documented.'],
  evidence: ['Led a React migration and shipped customer-facing workflows.', 'Used TypeScript across three product teams.', 'Built Python services and deployed production services with AWS.'],
  recommendations: ['Add an architecture example with constraints, decisions, scale, and results.', 'Document onboarding, review, pairing, or technical leadership examples.'],
}

export const mockRecommendations: RecommendationResult = {
  priority_actions: ['Make your ownership and architecture work explicit.', 'Create evidence of system design ability.'],
  resume_recommendations: ['Describe an architecture decision with constraints, trade-offs, scale, and a measurable result.'],
  linkedin_recommendations: ['Lead your headline and summary with product engineering outcomes.'],
  skill_recommendations: ['Build or document a small GraphQL API to demonstrate adjacent API design experience.'],
  interview_recommendations: ['Prepare a structured ownership story using the activation redesign and its 16% improvement.'],
  rationale: ['The role prioritizes end-to-end ownership and system design.', 'Your product delivery and web-stack experience are strong, but the evidence for architecture and mentoring needs to be more explicit.'],
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
  match_score: 68,
  skill_gaps: ['Automated accessibility testing is not evidenced.', 'Design system governance experience is not explicit.', 'No healthcare or regulated-product experience is stated.'],
  recommendations: ['Add an example using automated and manual accessibility checks.', 'Document one contribution that improved component consistency or adoption.'],
}

const northstarRecommendations: RecommendationResult = {
  ...mockRecommendations,
  priority_actions: ['Show accessibility testing evidence.', 'Clarify your design-system contribution.'],
  rationale: ['Your React delivery experience aligns well.', 'Accessibility testing and design-system governance need clearer evidence.'],
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
    recommendations: mockRecommendations,
    recommendation_decisions: { 'priority:0': 'accepted', 'priority:1': 'accepted' },
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
    recommendation_decisions: { 'priority:0': 'accepted', 'priority:1': 'rejected' },
  },
]
