import { ShieldCheck, Wrench, Tag, Heart, ChevronDown } from 'lucide-react';

const TRUST_POINTS = [
  {
    icon: ShieldCheck,
    title: 'Reliable Service',
    desc: 'Consistently professional results you can count on.',
  },
  {
    icon: Wrench,
    title: 'Expert Team',
    desc: 'Skilled automotive professionals with years of experience.',
  },
  {
    icon: Tag,
    title: 'Competitive Prices',
    desc: 'Transparent, fair pricing with no hidden charges.',
  },
  {
    icon: Heart,
    title: 'Customer Focused',
    desc: 'Your satisfaction is at the heart of everything we do.',
  },
];

export default function Hero() {
  const scrollTo = (target) => {
    const el = document.querySelector(target);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero" aria-label="Hero section">
      {/* Background imagery with dark blue tint */}
      <div className="hero-bg" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1800&q=85"
          alt=""
          className="hero-bg-img"
          loading="eager"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1800&q=85';
          }}
        />
        <div className="hero-overlay" />
      </div>

      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Your Trusted <span className="hero-highlight">Automotive</span> Partner
          </h1>

          <p className="hero-subtitle">
            Vehicle sales, hire, servicing, repairs, recovery, valeting and more —{' '}
            <strong>all under one roof.</strong>
          </p>

          <div className="hero-actions">
            <button
              className="btn btn--primary btn--lg"
              onClick={() => scrollTo('#services')}
              aria-label="View our services"
            >
              Our Services
            </button>
            <button
              className="btn btn--outline btn--lg"
              onClick={() => scrollTo('#contact')}
              aria-label="Go to contact section"
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* 4 Trust Points Banner */}
        <div className="hero-trust" role="list" aria-label="Why choose us">
          {TRUST_POINTS.map(({ icon: Icon, title, desc }) => (
            <div className="trust-item" role="listitem" key={title}>
              <div className="trust-icon" aria-hidden="true">
                <Icon size={22} />
              </div>
              <div>
                <p className="trust-title">{title}</p>
                <p className="trust-desc">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        className="hero-scroll"
        onClick={() => scrollTo('#services')}
        aria-label="Scroll to services section"
      >
        <ChevronDown size={24} />
      </button>

      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: var(--header-total);
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .hero-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 40%;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(13,27,62,.88) 0%,
            rgba(13,27,62,.75) 50%,
            rgba(13,27,62,.55) 100%
          );
        }

        .hero-container {
          position: relative;
          z-index: 1;
          padding-top: var(--sp-4xl);
          padding-bottom: calc(var(--sp-4xl) + 2rem);
        }

        .hero-content {
          max-width: 720px;
          margin-bottom: var(--sp-4xl);
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(2.25rem, 5.5vw, 4.25rem);
          font-weight: 900;
          color: var(--white);
          line-height: 1.08;
          margin-bottom: var(--sp-lg);
          letter-spacing: -0.02em;
        }

        .hero-highlight {
          color: var(--blue-400);
          position: relative;
          display: inline-block;
        }

        .hero-subtitle {
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: rgba(255,255,255,.82);
          line-height: 1.65;
          margin-bottom: var(--sp-xl);
          max-width: 580px;
        }

        .hero-subtitle strong {
          color: var(--white);
          font-weight: 700;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: var(--sp-md);
        }

        /* Trust strip */
        .hero-trust {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(255,255,255,.12);
          border: 1px solid rgba(255,255,255,.15);
          border-radius: var(--radius-lg);
          overflow: hidden;
          backdrop-filter: blur(8px);
        }

        .trust-item {
          display: flex;
          align-items: flex-start;
          gap: 0.875rem;
          padding: var(--sp-lg);
          background: rgba(13,27,62,.5);
          transition: background var(--transition-fast);
        }

        .trust-item:hover {
          background: rgba(29,111,235,.18);
        }

        .trust-icon {
          width: 44px;
          height: 44px;
          background: rgba(29,111,235,.25);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--blue-300);
          flex-shrink: 0;
        }

        .trust-title {
          font-size: 0.9375rem;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 0.2rem;
        }

        .trust-desc {
          font-size: 0.8125rem;
          color: rgba(255,255,255,.65);
          line-height: 1.5;
        }

        /* Scroll indicator */
        .hero-scroll {
          position: absolute;
          bottom: var(--sp-xl);
          left: 50%;
          transform: translateX(-50%);
          color: rgba(255,255,255,.6);
          animation: bounceY 2s ease-in-out infinite;
          z-index: 1;
          padding: 0.5rem;
        }

        @keyframes bounceY {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(8px); }
        }

        @media (max-width: 900px) {
          .hero-trust {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 560px) {
          .hero-trust {
            grid-template-columns: 1fr;
          }
          .hero-actions {
            flex-direction: column;
          }
          .hero-actions .btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
