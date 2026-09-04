import { mockCareerProfile, mockJobMatch, mockRecommendations, mockTargetProfile } from '../data/mockData'
import type { CandidateInput, CareerProfile, JobMatch, JobStrategy, Recommendations, TargetProfile } from '../types/domain'

const delay = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms))
const clone = <T,>(value: T): T => structuredClone(value)

// Mock boundary: replace these implementations with HTTP calls without changing page components.
export async function buildCareerProfile(_input: CandidateInput): Promise<CareerProfile> {
  void _input
  await delay(450)
  return clone(mockCareerProfile)
}

export async function buildTargetProfile(_jobDescription: string): Promise<TargetProfile> {
  void _jobDescription
  await delay(450)
  return clone(mockTargetProfile)
}

export async function getJobMatch(_careerProfile: CareerProfile, _targetProfile: TargetProfile): Promise<JobMatch> {
  void _careerProfile
  void _targetProfile
  await delay(550)
  return clone(mockJobMatch)
}

export async function getRecommendations(
  _careerProfile: CareerProfile,
  _targetProfile: TargetProfile,
  _jobMatch: JobMatch,
): Promise<Recommendations> {
  void _careerProfile
  void _targetProfile
  void _jobMatch
  await delay(550)
  return clone(mockRecommendations)
}

export async function createJobStrategy(input: CandidateInput, jobDescription: string): Promise<JobStrategy> {
  const careerProfile = await buildCareerProfile(input)
  const targetProfile = await buildTargetProfile(jobDescription)
  const jobMatch = await getJobMatch(careerProfile, targetProfile)
  const recommendations = await getRecommendations(careerProfile, targetProfile, jobMatch)
  const now = new Date().toISOString()

  return {
    id: `strategy-${Date.now()}`,
    created_at: now,
    updated_at: now,
    candidate: { inputs: clone(input), career_profile: careerProfile },
    job_description: jobDescription,
    target_profile: targetProfile,
    job_match: jobMatch,
    recommendations,
  }
}
