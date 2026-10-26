import { Link } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import Statistics from '../components/Statistics.jsx';
import { FLEET } from '../data/fleet.js';
import { SERVICES } from '../data/services.js';
import { BUSINESS } from '../data/business.js';
import { 
  ArrowRight, ShieldCheck, Wrench, Clock, Phone, CheckCircle, 
  Car, Sparkles, AlertTriangle, Key, Tag
} from 'lucide-react';

export default function HomePage({ onBookingOpen }) {
  // Select 4 showcase vehicles for homepage
  const featuredCars = FLEET.slice(0, 4);
  // Select top 4 core services for homepage
  const featuredServices = SERVICES.slice(0, 4);

  return (
    <div className="home-page">
      {/* Hero section */}
      <Hero />

      {/* ── Welcome & Overview Section ── */}
      <section className="section welcome-section" aria-labelledby="welcome-heading">
        <div className="container">
          <div className="welcome-grid">
            <div className="welcome-text reveal">
              <span className="section__eyebrow">Welcome to Blueline</span>
              <h2 id="welcome-heading" className="section__title" style={{ textAlign: 'left' }}>
                Your One-Stop Destination for <span className="highlight">Automotive Excellence</span>
              </h2>
              <div className="divider divider--left" />
              <p className="welcome-lead">
                Based in Doncaster, South Yorkshire, Blueline Auto Services Ltd provides complete, 
                high-standard vehicle services for motorists across the United Kingdom.
              </p>
              <p className="welcome-desc">
                Whether you need routine maintenance, MOT preparation, emergency breakdown recovery, 
                a reliable vehicle for hire, or your next quality car purchase — our certified team 
                combines technical expertise with transparent pricing and exceptional care.
              </p>

              <div className="welcome-points">
                <div className="welcome-point">
                  <CheckCircle size={18} className="point-icon" />
                  <span>Transparent, upfront pricing in GBP (£)</span>
                </div>
                <div className="welcome-point">
                  <CheckCircle size={18} className="point-icon" />
                  <span>24/7 emergency roadside recovery on-call</span>
                </div>
                <div className="welcome-point">
                  <CheckCircle size={18} className="point-icon" />
                  <span>Certified technicians and genuine parts</span>
                </div>
                <div className="welcome-point">
                  <CheckCircle size={18} className="point-icon" />
                  <span>Full UK insurance & breakdown cover on hire fleet</span>
                </div>
              </div>

              <div className="welcome-actions">
                <Link to="/about" className="btn btn--primary">
                  <span>Learn About Us</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/services" className="btn btn--outline-blue">
                  <span>Explore All Services</span>
                </Link>
              </div>
            </div>

            <div className="welcome-media reveal">
              <div className="welcome-card-showcase">
                <img
                  src="/images/gallery/modern-workshop-facility.jpg"
                  alt="Modern workshop facility at Blueline Auto Services Ltd"
                  className="welcome-main-img"
                  loading="lazy"
                />
                <div className="welcome-floating-badge">
                  <span className="floating-badge-icon">
                    <ShieldCheck size={28} />
                  </span>
                  <div>
                    <strong>Registered UK Business</strong>
                    <span>Company No. {BUSINESS.companyNumber}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Services Teaser Section ── */}
      <section className="section section--grey services-teaser-section" aria-labelledby="teaser-services-heading">
        <div className="container">
          <header className="section__header reveal">
            <span className="section__eyebrow">What We Do</span>
            <h2 id="teaser-services-heading" className="section__title">
              Our Comprehensive <span className="highlight">Services</span>
            </h2>
            <div className="divider" />
            <p className="section__subtitle" style={{ marginTop: 'var(--sp-md)' }}>
              From full mechanical repairs and maintenance to car hire and 24/7 recovery.
            </p>
          </header>

          <div className="services-teaser-grid">
            {featuredServices.map((service) => (
              <div key={service.id} className="service-teaser-card reveal">
                <div className="service-teaser-img-wrap">
                  <img src={service.image} alt={service.title} className="service-teaser-img" loading="lazy" />
                  <span className="service-teaser-badge">{service.category || 'Service'}</span>
                </div>
                <div className="service-teaser-body">
                  <h3 className="service-teaser-title">{service.title}</h3>
                  <p className="service-teaser-desc">{service.shortDesc}</p>
                  <Link to="/services" className="service-teaser-link">
                    <span>Learn More</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="section-footer-cta reveal">
            <Link to="/services" className="btn btn--primary btn--lg">
              <span>View All 8+ Automotive Services</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Key Statistics ── */}
      <Statistics />

      {/* ── Featured Cars Teaser Section ── */}
      <section className="section fleet-teaser-section" aria-labelledby="teaser-fleet-heading">
        <div className="container">
          <header className="section__header reveal">
            <span className="section__eyebrow">Our Showroom & Hire</span>
            <h2 id="teaser-fleet-heading" className="section__title">
              Featured <span className="highlight">Vehicles</span>
            </h2>
            <div className="divider" />
            <p className="section__subtitle" style={{ marginTop: 'var(--sp-md)' }}>
              Check out a selection of our clean, road-tested vehicles available for hire or purchase.
            </p>
          </header>

          <div className="featured-fleet-grid">
            {featuredCars.map((vehicle) => {
              const isFromPrice = vehicle.price.startsWith('From ');
              const rawNumber = vehicle.price.replace('From ', '').replace('£', '');

              return (
                <article key={vehicle.id} className="card fleet-card reveal">
                  <div className="fleet-card-img-wrap">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="fleet-card-img"
                      loading="lazy"
                    />
                    <span className="fleet-category-badge">{vehicle.category}</span>
                  </div>
                  <div className="fleet-card-body">
                    <h3 className="fleet-card-name">{vehicle.name}</h3>
                    <div className="fleet-card-price-row">
                      <div className="fleet-card-price-main">
                        {isFromPrice && <span className="price-from-label">From</span>}
                        <span className="price-currency">£</span>
                        <span className="price-amount">{rawNumber}</span>
                        {vehicle.pricePeriod && <span className="price-period">{vehicle.pricePeriod}</span>}
                      </div>
                      {vehicle.salePrice && (
                        <span className="fleet-card-sale-badge">
                          Sale: {vehicle.salePrice}
                        </span>
                      )}
                    </div>
                    <p className="fleet-card-desc">{vehicle.description}</p>
                    <div className="fleet-card-actions">
                      <button
                        className="btn btn--primary btn--sm"
                        onClick={() => onBookingOpen && onBookingOpen(vehicle)}
                        aria-label={`Enquire about ${vehicle.name}`}
                      >
                        <span>Book / Enquire</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="section-footer-cta reveal">
            <Link to="/cars" className="btn btn--primary btn--lg">
              <span>View Full Fleet & Showroom ({FLEET.length}+ Vehicles)</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Emergency Breakdown Banner ── */}
      <section className="emergency-banner" aria-label="24/7 Emergency Breakdown Assistance">
        <div className="container emergency-container">
          <div className="emergency-content">
            <div className="emergency-badge">
              <AlertTriangle size={16} />
              <span>24/7 Breakdown & Recovery</span>
            </div>
            <h2 className="emergency-title">Stranded or Broken Down? We're on Call 24/7.</h2>
            <p className="emergency-text">
              Rapid response vehicle recovery across Doncaster, South Yorkshire, and regional motorways. 
              Call our emergency line immediately for swift dispatch.
            </p>
          </div>
          <div className="emergency-actions">
            <a href={`tel:${BUSINESS.phone}`} className="btn btn--white btn--lg">
              <Phone size={18} />
              <span>Call Emergency Line</span>
            </a>
            <Link to="/contact" className="btn btn--outline-light btn--lg">
              <span>View Coverage & Rates</span>
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .welcome-section {
          padding: var(--sp-4xl) 0;
          background: #ffffff;
        }
        .welcome-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: var(--sp-3xl);
          align-items: center;
        }
        .welcome-lead {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--navy);
          line-height: 1.6;
          margin-bottom: var(--sp-md);
        }
        .welcome-desc {
          font-size: 0.98rem;
          color: var(--grey-700);
          line-height: 1.7;
          margin-bottom: var(--sp-lg);
        }
        .welcome-points {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.85rem;
          margin-bottom: var(--sp-xl);
        }
        .welcome-point {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--grey-800);
        }
        .welcome-point .point-icon {
          color: var(--accent);
          flex-shrink: 0;
        }
        .welcome-actions {
          display: flex;
          align-items: center;
          gap: var(--sp-md);
          flex-wrap: wrap;
        }
        .welcome-card-showcase {
          position: relative;
        }
        .welcome-main-img {
          width: 100%;
          height: 420px;
          object-fit: cover;
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-lg);
          border: 3px solid #ffffff;
        }
        .welcome-floating-badge {
          position: absolute;
          bottom: -20px;
          left: -20px;
          background: #ffffff;
          padding: 1rem 1.25rem;
          border-radius: var(--radius-lg);
          box-shadow: 0 12px 30px rgba(13, 27, 62, 0.15);
          display: flex;
          align-items: center;
          gap: 0.85rem;
          border: 1px solid var(--grey-200);
        }
        .floating-badge-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--blue-50);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .welcome-floating-badge strong {
          display: block;
          font-size: 0.9375rem;
          color: var(--navy);
        }
        .welcome-floating-badge span {
          display: block;
          font-size: 0.8125rem;
          color: var(--grey-600);
        }

        /* Services teaser grid */
        .services-teaser-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--sp-lg);
          margin-bottom: var(--sp-2xl);
        }
        .service-teaser-card {
          background: #ffffff;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          border: 1px solid var(--grey-200);
          display: flex;
          flex-direction: column;
        }
        .service-teaser-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }
        .service-teaser-img-wrap {
          position: relative;
          height: 180px;
          overflow: hidden;
        }
        .service-teaser-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.35s ease;
        }
        .service-teaser-card:hover .service-teaser-img {
          transform: scale(1.05);
        }
        .service-teaser-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(13, 27, 62, 0.8);
          color: #ffffff;
          font-size: 0.72rem;
          font-weight: 600;
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-sm);
          backdrop-filter: blur(4px);
        }
        .service-teaser-body {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .service-teaser-title {
          font-family: var(--font-display);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--navy);
          margin-bottom: 0.5rem;
        }
        .service-teaser-desc {
          font-size: 0.875rem;
          color: var(--grey-600);
          line-height: 1.55;
          margin-bottom: 1rem;
          flex: 1;
        }
        .service-teaser-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--accent);
          text-decoration: none;
          transition: gap 0.2s;
        }
        .service-teaser-link:hover {
          gap: 0.65rem;
          text-decoration: underline;
        }

        /* Featured fleet grid */
        .featured-fleet-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--sp-lg);
          margin-bottom: var(--sp-2xl);
        }

        .section-footer-cta {
          display: flex;
          justify-content: center;
        }

        /* Emergency banner */
        .emergency-banner {
          background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);
          color: #ffffff;
          padding: var(--sp-3xl) 0;
        }
        .emergency-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--sp-xl);
          flex-wrap: wrap;
        }
        .emergency-content {
          max-width: 680px;
        }
        .emergency-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }
        .emergency-title {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 3vw, 2.1rem);
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 0.5rem;
        }
        .emergency-text {
          font-size: 0.95rem;
          opacity: 0.92;
          line-height: 1.55;
        }
        .emergency-actions {
          display: flex;
          align-items: center;
          gap: var(--sp-md);
          flex-wrap: wrap;
        }
        .btn--white {
          background: #ffffff;
          color: #991b1b;
          font-weight: 700;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
        }
        .btn--white:hover {
          background: #f8fafc;
          transform: translateY(-2px);
        }

        @media (max-width: 1100px) {
          .services-teaser-grid,
          .featured-fleet-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 900px) {
          .welcome-grid {
            grid-template-columns: 1fr;
          }
          .welcome-floating-badge {
            left: 10px;
            bottom: -15px;
          }
        }
        @media (max-width: 600px) {
          .welcome-points {
            grid-template-columns: 1fr;
          }
          .services-teaser-grid,
          .featured-fleet-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
