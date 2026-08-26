import { STEPS } from '../data';

export default function Craft() {
  return (
    <section className="craft" id="craft">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow on-dark">How We Work</span>
            <h2 style={{ color: 'var(--text-light)' }}>
              How a shawl reaches our shelf
            </h2>
          </div>
          <p>Every piece passes through four checks before it reaches you.</p>
        </div>
        <div className="steps">
          {STEPS.map((step) => (
            <div className="step" key={step.stage}>
              <span className="stage">{step.stage}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
