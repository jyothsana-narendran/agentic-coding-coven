import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { WorkflowProvider } from './context/WorkflowContext'
import { AnalysisPage } from './pages/AnalysisPage'
import { CandidateProfileDetailPage } from './pages/CandidateProfileDetailPage'
import { CareerProfilePage } from './pages/CareerProfilePage'
import { CreatedStrategyPage } from './pages/CreatedStrategyPage'
import { DashboardPage } from './pages/DashboardPage'
import { InterviewPage } from './pages/InterviewPage'
import { JobTargetPage } from './pages/JobTargetPage'
import { MatchPage } from './pages/MatchPage'
import { RecommendationsPage } from './pages/RecommendationsPage'
import { StrategyNotFoundPage } from './pages/StrategyNotFoundPage'
import { StrategyOverviewPage } from './pages/StrategyOverviewPage'
import { TargetJobDetailPage } from './pages/TargetJobDetailPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <WorkflowProvider>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<DashboardPage />} />
            <Route path="new/profile" element={<CareerProfilePage />} />
            <Route path="new/job" element={<JobTargetPage />} />
            <Route path="new/analysis" element={<AnalysisPage />} />
            <Route path="new/result/:strategyId" element={<CreatedStrategyPage />} />
            <Route path="strategies/:strategyId" element={<StrategyOverviewPage />} />
            <Route path="strategies/:strategyId/profile" element={<CandidateProfileDetailPage />} />
            <Route path="strategies/:strategyId/target" element={<TargetJobDetailPage />} />
            <Route path="strategies/:strategyId/match" element={<MatchPage />} />
            <Route path="strategies/:strategyId/recommendations" element={<RecommendationsPage />} />
            <Route path="strategies/:strategyId/interview" element={<InterviewPage />} />
            <Route path="strategy-not-found" element={<StrategyNotFoundPage />} />
            <Route path="*" element={<DashboardPage />} />
          </Route>
        </Routes>
      </WorkflowProvider>
    </BrowserRouter>
  )
}

export default App
