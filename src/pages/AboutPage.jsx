import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import About from '../components/About.jsx';
import Statistics from '../components/Statistics.jsx';
import { BUSINESS } from '../data/business.js';
import { 
  ShieldCheck, Award, HeartHandshake, Zap, 
  MapPin, CheckCircle, ArrowRight, UserCheck, PhoneCall 
} from 'lucide-react';

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Integrity & Transparency',
    desc: 'Every quote is clear, itemised, and fair. No hidden fees, surprise charges, or unapproved work — ever.',
  },
  {
    icon: Award,
    title: 'Certified Craftsmanship',
    desc: 'Our experienced automotive specialists adhere strictly to manufacturer standards and OEM-grade components.',
  },
  {
    icon: HeartHandshake,
    title: 'Customer-First Approach',
    desc: 'We listen to your requirements, give honest recommendations, and treat every vehicle with the highest level of care.',
  },
  {
    icon: Zap,
    title: 'Swift 24/7 Turnaround',
    desc: 'From our rapid roadside recovery to efficient workshop turnaround times, we get you safely back on the road fast.',
  },
];

export default function AboutPage() {
  return (
    <div className="about-page">
      <PageHeader
        badge="ABOUT BLUELINE AUTO SERVICES"
        title="Driven by Trust."
        highlight="Focused on You."
        subtitle="Learn more about our heritage, company values, and our unwavering commitment to British motorists."
        breadcrumbs={[{ label: 'About Us' }]}
      />

      {/* Main About Component */}
      <About />

      {/* ── Official Company Credentials & Story ── */}
      <section className="section section--grey credentials-section" aria-labelledby="credentials-title">
        <div className="container">
          <header className="section__header reveal">
            <span className="section__eyebrow">Official Registration</span>
            <h2 id="credentials-title" className="section__title">
              Built on Professional <span className="highlight">Standards</span>
            </h2>
            <div className="divider" />
            <p className="section__subtitle" style={{ marginTop: 'var(--sp-md)' }}>
              A fully registered UK automotive enterprise dedicated to accountability, safety, and customer satisfaction.
            </p>
          </header>

          <div className="credentials-grid reveal">
            <div className="credential-card">
              <div className="credential-icon">
                <ShieldCheck size={28} />
              </div>
              <div className="credential-content">
                <span className="credential-label">Registered Company</span>
                <h3 className="credential-val">{BUSINESS.name}</h3>
                <p className="credential-sub">Company Registration No: <strong>{BUSINESS.companyNumber}</strong></p>
              </div>
            </div>

            <div className="credential-card">
              <div className="credential-icon">
                <UserCheck size={28} />
              </div>
              <div className="credential-content">
                <span className="credential-label">Company Leadership</span>
                <h3 className="credential-val">{BUSINESS.director}</h3>
                <p className="credential-sub">Company Director & General Operations</p>
              </div>
            </div>

            <div className="credential-card">
              <div className="credential-icon">
                <MapPin size={28} />
              </div>
              <div className="credential-content">
                <span className="credential-label">Workshop & Showroom</span>
                <h3 className="credential-val">Doncaster Facility</h3>
                <p className="credential-sub">{BUSINESS.fullAddress}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <Statistics />

      {/* ── Core Values Section ── */}
      <section className="section values-section" aria-labelledby="values-heading">
        <div className="container">
          <header className="section__header reveal">
            <span className="section__eyebrow">Our Guiding Pillars</span>
            <h2 id="values-heading" className="section__title">
              Why Motorists <span className="highlight">Trust Blueline</span>
            </h2>
            <div className="divider" />
          </header>

          <div className="values-grid">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="value-card reveal">
                <div className="value-icon-wrap">
                  <Icon size={24} />
                </div>
                <h3 className="value-title">{title}</h3>
                <p className="value-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ready to Work CTA ── */}
      <section className="about-cta-strip">
        <div className="container about-cta-inner">
          <div>
            <h2 className="about-cta-title">Need Advice or Assistance?</h2>
            <p className="about-cta-sub">
              Our Doncaster automotive team is ready to answer questions, book your car in, or arrange vehicle hire.
            </p>
          </div>
          <div className="about-cta-buttons">
            <Link to="/contact" className="btn btn--primary btn--lg">
              <span>Contact Us Today</span>
              <ArrowRight size={18} />
            </Link>
            <a href={`tel:${BUSINESS.phone}`} className="btn btn--outline btn--lg">
              <PhoneCall size={18} />
              <span>Call {BUSINESS.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>

      <style>{`
        .credentials-section {
          padding: var(--sp-3xl) 0;
        }
        .credentials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--sp-lg);
        }
        .credential-card {
          background: #ffffff;
          border-radius: var(--radius-lg);
          padding: 1.75rem;
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          border: 1px solid var(--grey-200);
          box-shadow: var(--shadow-sm);
        }
        .credential-icon {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          background: var(--blue-50);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .credential-label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--grey-500);
          display: block;
          margin-bottom: 0.25rem;
        }
        .credential-val {
          font-family: var(--font-display);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--navy);
          margin-bottom: 0.25rem;
        }
        .credential-sub {
          font-size: 0.875rem;
          color: var(--grey-600);
          line-height: 1.4;
        }

        /* Values Grid */
        .values-section {
          padding: var(--sp-4xl) 0;
          background: #ffffff;
        }
        .values-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--sp-lg);
        }
        .value-card {
          background: var(--grey-100);
          border-radius: var(--radius-lg);
          padding: 2rem 1.5rem;
          border: 1px solid var(--grey-200);
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .value-card:hover {
          transform: translateY(-4px);
          border-color: var(--blue-300);
        }
        .value-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          background: var(--blue-100);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }
        .value-title {
          font-family: var(--font-display);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--navy);
          margin-bottom: 0.6rem;
        }
        .value-desc {
          font-size: 0.875rem;
          color: var(--grey-600);
          line-height: 1.6;
        }

        /* About CTA Strip */
        .about-cta-strip {
          background: linear-gradient(135deg, var(--navy) 0%, var(--accent-dark) 100%);
          color: #ffffff;
          padding: var(--sp-3xl) 0;
        }
        .about-cta-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--sp-xl);
          flex-wrap: wrap;
        }
        .about-cta-title {
          font-family: var(--font-display);
          font-size: clamp(1.4rem, 2.8vw, 1.9rem);
          font-weight: 800;
          margin-bottom: 0.4rem;
        }
        .about-cta-sub {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.8);
          max-width: 600px;
        }
        .about-cta-buttons {
          display: flex;
          align-items: center;
          gap: var(--sp-md);
          flex-wrap: wrap;
        }

        @media (max-width: 1024px) {
          .credentials-grid { grid-template-columns: 1fr; }
          .values-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .values-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
