import { Link } from 'react-router-dom'

export function LandingPage() {
  return (
    <div className="landing page-width">
      <section className="landing-intro">
        <p className="eyebrow">A clearer path to your target role</p>
        <h1>Don’t just apply.<br />Become the stronger candidate.</h1>
        <p className="lede">CareerCraft compares your real experience with a role you want, then turns the gaps into specific changes you can review and act on.</p>
        <Link className="button button-primary button-large" to="/profile">Start your career strategy <span aria-hidden="true">→</span></Link>
      </section>

      <section className="how-it-works" aria-labelledby="how-heading">
        <div className="section-heading"><p className="eyebrow">How it works</p><h2 id="how-heading">One focused workflow</h2></div>
        <ol>
          <li><span>01</span><div><h3>Understand you</h3><p>Build a grounded profile from your resume and LinkedIn.</p></div></li>
          <li><span>02</span><div><h3>Understand the role</h3><p>Identify what the target company is really looking for.</p></div></li>
          <li><span>03</span><div><h3>Find the gaps</h3><p>See your fit, strengths, and the areas that need attention.</p></div></li>
          <li><span>04</span><div><h3>Choose your next moves</h3><p>Review practical recommendations. You decide what to accept.</p></div></li>
        </ol>
      </section>
    </div>
  )
}

