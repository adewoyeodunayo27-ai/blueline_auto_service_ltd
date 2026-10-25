import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import Fleet from '../components/Fleet.jsx';
import { BUSINESS } from '../data/business.js';
import { 
  ShieldCheck, Car, Key, Sparkles, CheckCircle2, 
  Search, ArrowRight, PhoneCall, HelpCircle 
} from 'lucide-react';

const HIRE_BENEFITS = [
  {
    icon: ShieldCheck,
    title: 'Full UK Insurance Included',
    desc: 'Comprehensive road cover and 24/7 nationwide roadside assistance with all hire agreements.',
  },
  {
    icon: Sparkles,
    title: 'Multi-Point Checked & Valeted',
    desc: 'Every car leaves our Doncaster depot freshly sanitised, fully valeted, and mechanically inspected.',
  },
  {
    icon: Key,
    title: 'Flexible Hire Terms',
    desc: 'Daily, weekend, weekly, and commercial long-term contract hire available with simple paperwork.',
  },
  {
    icon: Car,
    title: 'Transparent Pricing in GBP',
    desc: 'No sneaky add-ons. Clear mileage allowances and honest terms clearly explained upfront.',
  },
];

export default function CarsPage({ onBookingOpen }) {
  return (
    <div className="cars-page">
      <PageHeader
        badge="SHOWROOM & FLEET"
        title="Quality Vehicles for"
        highlight="Sale & Hire"
        subtitle="Browse our carefully selected, thoroughly inspected vehicles in Doncaster. Available for self-drive hire, corporate use, or outright purchase."
        breadcrumbs={[{ label: 'Our Cars' }]}
      />

      {/* ── Hire & Purchase Assurance Bar ── */}
      <section className="fleet-assurances">
        <div className="container">
          <div className="assurances-grid">
            {HIRE_BENEFITS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="assurance-item reveal">
                <div className="assurance-icon" aria-hidden="true">
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="assurance-title">{title}</h3>
                  <p className="assurance-desc">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Fleet Component ── */}
      <Fleet onBookingOpen={onBookingOpen} />

      {/* ── Vehicle Sourcing Service ── */}
      <section className="section section--grey sourcing-section" aria-labelledby="sourcing-heading">
        <div className="container">
          <div className="sourcing-card reveal">
            <div className="sourcing-text">
              <span className="section__eyebrow">Bespoke Sourcing Service</span>
              <h2 id="sourcing-heading" className="sourcing-title">
                Looking for a Specific <span className="highlight">Make or Model?</span>
              </h2>
              <p className="sourcing-desc">
                If the exact car, van, or luxury executive vehicle you desire isn't listed in our current inventory, 
                our team will source it for you through our extensive verified automotive dealer network across the UK. 
                We inspect, HPI check, and deliver it directly to your door.
              </p>
              <ul className="sourcing-list">
                <li><CheckCircle2 size={16} className="sourcing-check" /> Verified history and mileage guarantee</li>
                <li><CheckCircle2 size={16} className="sourcing-check" /> 128-point pre-delivery mechanical inspection</li>
                <li><CheckCircle2 size={16} className="sourcing-check" /> Part exchange and competitive financing assistance</li>
              </ul>
              <div className="sourcing-actions">
                <Link to="/contact" className="btn btn--primary">
                  <span>Enquire About Vehicle Sourcing</span>
                  <ArrowRight size={16} />
                </Link>
                <a href={`tel:${BUSINESS.phone}`} className="btn btn--outline-blue">
                  <PhoneCall size={16} />
                  <span>Call {BUSINESS.phoneDisplay}</span>
                </a>
              </div>
            </div>

            <div className="sourcing-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80"
                alt="Luxury executive vehicle sourced by Blueline Auto Services Ltd"
                className="sourcing-img"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .fleet-assurances {
          background: #ffffff;
          padding: var(--sp-2xl) 0;
          border-bottom: 1px solid var(--grey-200);
        }
        .assurances-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--sp-lg);
        }
        .assurance-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }
        .assurance-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: var(--blue-50);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .assurance-title {
          font-family: var(--font-display);
          font-size: 0.98rem;
          font-weight: 700;
          color: var(--navy);
          margin-bottom: 0.25rem;
        }
        .assurance-desc {
          font-size: 0.8125rem;
          color: var(--grey-600);
          line-height: 1.5;
        }

        /* Sourcing Card */
        .sourcing-section {
          padding: var(--sp-4xl) 0;
        }
        .sourcing-card {
          background: #ffffff;
          border-radius: var(--radius-xl);
          border: 1px solid var(--grey-200);
          box-shadow: var(--shadow-md);
          overflow: hidden;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          align-items: center;
        }
        .sourcing-text {
          padding: clamp(2rem, 4vw, 3.5rem);
        }
        .sourcing-title {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 800;
          color: var(--navy);
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        .sourcing-desc {
          font-size: 0.95rem;
          color: var(--grey-700);
          line-height: 1.65;
          margin-bottom: 1.25rem;
        }
        .sourcing-list {
          list-style: none;
          margin-bottom: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .sourcing-list li {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--grey-800);
        }
        .sourcing-check {
          color: #10b981;
          flex-shrink: 0;
        }
        .sourcing-actions {
          display: flex;
          align-items: center;
          gap: var(--sp-md);
          flex-wrap: wrap;
        }
        .sourcing-image-wrap {
          height: 100%;
          min-height: 380px;
        }
        .sourcing-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        @media (max-width: 1024px) {
          .assurances-grid { grid-template-columns: repeat(2, 1fr); }
          .sourcing-card { grid-template-columns: 1fr; }
          .sourcing-image-wrap { min-height: 260px; max-height: 320px; }
        }
        @media (max-width: 600px) {
          .assurances-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
