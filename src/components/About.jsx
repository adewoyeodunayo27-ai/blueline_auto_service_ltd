import { ArrowRight, CheckCircle } from 'lucide-react';

const HIGHLIGHTS = [
  'Vehicle sales, hire, and fleet management',
  'Comprehensive mechanical servicing and repairs',
  'Professional vehicle valeting and detailing',
  'Reliable recovery and transportation services',
  'Delivery and collection at your convenience',
  'Specialist vehicle sourcing on your behalf',
];

export default function About() {
  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
  };

  return (
    <section id="about" className="section about-section" aria-labelledby="about-title">
      <div className="container">
        <div className="about-grid">
          {/* Image column */}
          <div className="about-image-col reveal">
            <div className="about-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1632823471565-1ecdf5c6da4a?w=900&q=80"
                alt="Automotive workshop with vehicles being serviced by professional mechanics"
                className="about-main-img"
                loading="lazy"
                onError={e => {
                  e.target.src = 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=900&q=80';
                }}
              />
              <img
                src="https://images.unsplash.com/photo-1591293836027-c8cddc6b0b94?w=500&q=80"
                alt="Mechanic carrying out vehicle inspection"
                className="about-secondary-img"
                loading="lazy"
                onError={e => { e.target.style.display = 'none'; }}
              />
              <div className="about-badge">
                <span className="about-badge-number">10+</span>
                <span className="about-badge-text">Years Serving<br/>UK Motorists</span>
              </div>
            </div>
          </div>

          {/* Text column */}
          <div className="about-text-col reveal">
            <span className="section__eyebrow">About Us</span>
            <h2 id="about-title" className="section__title" style={{ textAlign: 'left' }}>
              Driven by Trust.<br /><span className="highlight">Focused on You.</span>
            </h2>
            <div className="divider divider--left" />

            <p className="about-paragraph">
              At Blueline Auto Services Ltd, we are committed to delivering a comprehensive range of
              automotive services under one roof — making it easier for our customers to keep their vehicles
              running at their best.
            </p>
            <p className="about-paragraph">
              From quality vehicle sales and flexible hire options to expert mechanical servicing, professional
              valeting, and reliable recovery, our experienced team is here to support you every step of the way.
              We take pride in offering honest advice, transparent pricing, and work carried out to a consistently
              high standard.
            </p>
            <p className="about-paragraph">
              Whether you are an individual motorist, a business managing a fleet, or someone in need of
              roadside assistance, Blueline Auto Services Ltd has the expertise and resources to help.
            </p>

            <ul className="about-highlights" aria-label="Our capabilities">
              {HIGHLIGHTS.map(item => (
                <li key={item} className="about-highlight-item">
                  <CheckCircle size={16} className="about-check" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="about-actions">
              <button className="btn btn--primary" onClick={scrollToContact}>
                Get in Touch <ArrowRight size={16} />
              </button>
              <button
                className="btn btn--outline-blue"
                onClick={() => {
                  const el = document.querySelector('#services');
                  if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
                }}
              >
                Our Services
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-section {
          background: var(--white);
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--sp-4xl);
          align-items: center;
        }

        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: var(--sp-2xl);
          }
        }

        /* Image column */
        .about-image-col {
          position: relative;
        }

        .about-image-wrap {
          position: relative;
          border-radius: var(--radius-xl);
          overflow: visible;
        }

        .about-main-img {
          width: 100%;
          height: clamp(260px, 45vw, 480px);
          object-fit: cover;
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-xl);
        }

        .about-secondary-img {
          position: absolute;
          width: clamp(140px, 25vw, 200px);
          height: clamp(100px, 18vw, 145px);
          object-fit: cover;
          bottom: 1rem;
          right: 1rem;
          border-radius: var(--radius-lg);
          border: 4px solid var(--white);
          box-shadow: var(--shadow-lg);
        }

        @media (max-width: 540px) {
          .about-secondary-img { display: none; }
        }

        .about-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: var(--accent);
          color: white;
          padding: 0.65rem 1.15rem;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-blue);
          display: flex;
          flex-direction: column;
          align-items: center;
          line-height: 1.2;
        }

        .about-badge-number {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 900;
        }

        .about-badge-text {
          font-size: 0.75rem;
          font-weight: 600;
          text-align: center;
          opacity: 0.9;
        }

        /* Text column */
        .about-text-col { }

        .about-paragraph {
          color: var(--grey-600);
          line-height: 1.75;
          margin-top: var(--sp-md);
          font-size: 0.9375rem;
        }

        .about-paragraph:first-of-type {
          margin-top: var(--sp-lg);
        }

        .about-highlights {
          margin: var(--sp-lg) 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--sp-sm);
        }

        @media (max-width: 540px) {
          .about-highlights { grid-template-columns: 1fr; }
        }

        .about-highlight-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--grey-700);
          font-weight: 500;
        }

        .about-check {
          color: var(--accent);
          flex-shrink: 0;
        }

        .about-actions {
          display: flex;
          flex-wrap: wrap;
          gap: var(--sp-md);
          margin-top: var(--sp-xl);
        }

        @media (max-width: 540px) {
          .about-actions {
            flex-direction: column;
            width: 100%;
          }
          .about-actions .btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
