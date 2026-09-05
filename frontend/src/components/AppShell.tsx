import { Link, Outlet, useLocation } from 'react-router-dom'
import { StrategyWorkspaceHeader } from './StrategyWorkspaceHeader'

const steps = [
  { path: '/new/profile', label: 'Your profile' },
  { path: '/new/job', label: 'Target role' },
  { path: '/new/analysis', label: 'Analysis' },
]

export function AppShell() {
  const location = useLocation()
  const currentIndex = steps.findIndex((step) => location.pathname.startsWith(step.path))
  const showProgress = currentIndex >= 0
  const showStrategyNavigation = location.pathname.startsWith('/strategies/')

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link className="brand" to="/" aria-label="CareerCraft home">
          <span className="brand-mark" aria-hidden="true">C</span>
          <span>CareerCraft</span>
        </Link>
        <span className="topbar-note">Career strategy workspace</span>
      </header>

      {showProgress && (
        <nav className="workflow-nav" aria-label="Application progress">
          <ol>
            {steps.map((step, index) => {
              const state = index < currentIndex ? 'complete' : index === currentIndex ? 'current' : 'upcoming'
              return (
                <li key={step.path} className={state} aria-current={state === 'current' ? 'step' : undefined}>
                  <span className="step-number" aria-hidden="true">{state === 'complete' ? '✓' : index + 1}</span>
                  <span>{step.label}</span>
                </li>
              )
            })}
          </ol>
        </nav>
      )}

      {showStrategyNavigation && <StrategyWorkspaceHeader />}

      <main><Outlet /></main>
      <footer>CareerCraft · Your experience, focused on the role that matters.</footer>
    </div>
  )
}
