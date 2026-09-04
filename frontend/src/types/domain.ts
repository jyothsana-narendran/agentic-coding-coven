export type Importance = 'critical' | 'high' | 'medium' | 'low'
export type SkillCategory = 'technical' | 'soft' | 'language' | 'tool' | 'other'
export type Proficiency = 'beginner' | 'intermediate' | 'advanced'

export interface Evidence {
  source: string
  text: string
  confidence?: number
}

export interface Education {
  institution: string
  degree?: string
  field?: string
  start_date?: string
  end_date?: string
  description?: string
  evidence: string
}

export interface Skill {
  name: string
  category: SkillCategory
  proficiency?: Proficiency
  evidence: Evidence[]
}

export interface Experience {
  company: string
  role: string
  start_date?: string
  end_date?: string
  description?: string
  achievements: string[]
  skills_used: string[]
  evidence: Evidence[]
}

export interface Project {
  name: string
  description: string
  technologies: string[]
  achievements: string[]
  url?: string
  evidence: Evidence[]
}

export interface Achievement {
  description: string
  metric?: string
  evidence: Evidence[]
}

export interface Certification {
  name: string
  issuer?: string
  issue_date?: string
  expiry_date?: string
  credential_id?: string
  url?: string
  evidence: Evidence[]
}

export interface CareerProfile {
  id: string
  candidate_name: string
  education: Education[]
  skills: Skill[]
  experience: Experience[]
  projects: Project[]
  achievements: Achievement[]
  certifications: Certification[]
  summary: string
}

export interface Responsibility {
  description: string
  evidence_from_jd: string
}

export interface TargetSkill {
  name: string
  importance: Importance
  evidence_from_jd: string
}

export interface TargetProfile {
  company: string
  role: string
  seniority?: string
  responsibilities: Responsibility[]
  required_skills: TargetSkill[]
  preferred_skills: TargetSkill[]
  soft_skills: string[]
  experience_requirements: string[]
  education_requirements: string[]
  keywords: string[]
  signals: string[]
}

export interface SkillMatch {
  skill: string
  candidate_level?: Proficiency
  target_importance: Importance
  evidence: string
}

export interface SkillGap {
  skill: string
  importance: Importance
  reason: string
  recommended_action: string
}

export interface MatchStrength {
  strength: string
  evidence: string
}

export interface JobMatch {
  overall_score: number
  matched_skills: SkillMatch[]
  missing_skills: SkillGap[]
  strengths: MatchStrength[]
  experience_gaps: string[]
  keyword_gaps: string[]
}

export type RecommendationCategory =
  | 'resume'
  | 'linkedin'
  | 'skills'
  | 'projects'
  | 'interview'
  | 'career'
export type RecommendationStatus = 'pending' | 'accepted' | 'rejected'
export type RecommendationEvidenceSource =
  | 'candidate_profile'
  | 'job_description'
  | 'job_match'

export interface RecommendationEvidence {
  source: RecommendationEvidenceSource
  text: string
}

export interface Recommendation {
  id: string
  category: RecommendationCategory
  priority: Importance
  title: string
  current?: string
  suggested?: string
  reason: string
  evidence: RecommendationEvidence[]
  status: RecommendationStatus
}

export interface Recommendations {
  recommendations: Recommendation[]
}

export interface CandidateInput {
  resume_text: string
  linkedin_text: string
}

// A snapshot keeps every strategy historically accurate. Later, profile_id can
// point to a reusable/versioned candidate profile without changing JobStrategy.
export interface CandidateSnapshot {
  profile_id?: string
  inputs: CandidateInput
  career_profile: CareerProfile
}

export interface JobStrategy {
  id: string
  created_at: string
  updated_at: string
  candidate: CandidateSnapshot
  job_description: string
  target_profile: TargetProfile
  job_match: JobMatch
  recommendations: Recommendations
}
