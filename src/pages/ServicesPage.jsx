import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import Services from '../components/Services.jsx';
import { BUSINESS } from '../data/business.js';
import { 
  Wrench, CheckCircle, Clock, ShieldCheck, 
  ArrowRight, PhoneCall, FileText, Sparkles, Tag 
} from 'lucide-react';

const WORKFLOW = [
  {
    step: '01',
    title: 'Book or Get in Touch',
    desc: 'Reach out by phone, WhatsApp, or through our website form. Tell us your vehicle details and requirements.',
  },
  {
    step: '02',
    title: 'Expert Diagnostic Check',
    desc: 'Our certified mechanics carry out a thorough initial diagnostic or multi-point vehicle inspection.',
  },
  {
    step: '03',
    title: 'Transparent Upfront Quote',
    desc: 'We present an itemised quotation in British pounds (£). We only proceed once you have approved the work.',
  },
  {
    step: '04',
    title: 'Precision Work & Handover',
    desc: 'We complete the repair or service using OEM-standard parts, road-test your vehicle, and return it ready to drive.',
  },
];

export default function ServicesPage() {
  return (
    <div className="services-page">
      <PageHeader
        badge="FULL AUTOMOTIVE CARE"
        title="Comprehensive"
        highlight="Services"
        subtitle="Vehicle sales, car hire, servicing, MOT preparation, mechanical repairs, valeting, and 24/7 recovery in Doncaster."
        breadcrumbs={[{ label: 'Services' }]}
      />

      {/* ── Main Services Component with Details Modal ── */}
      <Services />

      {/* ── 4-Step Process Section ── */}
      <section className="section section--grey workflow-section" aria-labelledby="workflow-title">
        <div className="container">
          <header className="section__header reveal">
            <span className="section__eyebrow">How We Work</span>
            <h2 id="workflow-title" className="section__title">
              Our 4-Step <span className="highlight">Service Process</span>
            </h2>
            <div className="divider" />
            <p className="section__subtitle" style={{ marginTop: 'var(--sp-md)' }}>
              From your initial inquiry to collecting your vehicle, we make the process smooth and transparent.
            </p>
          </header>

          <div className="workflow-grid reveal">
            {WORKFLOW.map((item) => (
              <div key={item.step} className="workflow-card">
                <div className="workflow-step-num">{item.step}</div>
                <h3 className="workflow-card-title">{item.title}</h3>
                <p className="workflow-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing Link Strip ── */}
      <section className="pricing-banner-strip">
        <div className="container pbs-inner">
          <div className="pbs-text">
            <div className="pbs-badge">
              <Tag size={14} />
              <span>Transparent Pricing</span>
            </div>
            <h2 className="pbs-title">Looking for Clear, Upfront Service Prices?</h2>
            <p className="pbs-sub">
              Check out our complete itemised price list in British pounds (£) for interim servicing, full servicing, MOT prep, diagnostics, and recovery.
            </p>
          </div>
          <div className="pbs-actions">
            <Link to="/pricing" className="btn btn--primary btn--lg">
              <span>View Full Price List</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn btn--outline-light btn--lg">
              <span>Request Custom Quote</span>
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .workflow-section {
          padding: var(--sp-4xl) 0;
        }
        .workflow-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--sp-lg);
        }
        .workflow-card {
          background: #ffffff;
          border-radius: var(--radius-lg);
          padding: 2rem 1.5rem;
          border: 1px solid var(--grey-200);
          box-shadow: var(--shadow-sm);
          position: relative;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .workflow-card:hover {
          transform: translateY(-4px);
          border-color: var(--blue-300);
        }
        .workflow-step-num {
          font-family: var(--font-display);
          font-size: 2.2rem;
          font-weight: 900;
          color: var(--blue-200);
          line-height: 1;
          margin-bottom: 1rem;
        }
        .workflow-card-title {
          font-family: var(--font-display);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--navy);
          margin-bottom: 0.6rem;
        }
        .workflow-card-desc {
          font-size: 0.875rem;
          color: var(--grey-600);
          line-height: 1.6;
        }

        /* Pricing Banner Strip */
        .pricing-banner-strip {
          background: linear-gradient(135deg, var(--navy) 0%, #152d6a 100%);
          color: #ffffff;
          padding: var(--sp-3xl) 0;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .pbs-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--sp-xl);
          flex-wrap: wrap;
        }
        .pbs-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(29, 111, 235, 0.3);
          border: 1px solid rgba(59, 130, 246, 0.45);
          color: #93c5fd;
          padding: 0.2rem 0.65rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
        }
        .pbs-title {
          font-family: var(--font-display);
          font-size: clamp(1.4rem, 2.8vw, 1.9rem);
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }
        .pbs-sub {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.8);
          max-width: 620px;
        }
        .pbs-actions {
          display: flex;
          align-items: center;
          gap: var(--sp-md);
          flex-wrap: wrap;
        }

        @media (max-width: 1024px) {
          .workflow-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .workflow-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
