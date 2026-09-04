import { Link } from 'react-router-dom'

export function StrategyNotFoundPage() {
  return <div className="not-found page-width-narrow"><p className="eyebrow">Strategy not found</p><h1>This job strategy isn’t available.</h1><p>It may have been removed, or the link may be incomplete.</p><Link className="button button-primary" to="/">Return to job strategies</Link></div>
}

