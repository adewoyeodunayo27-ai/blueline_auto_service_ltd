import { ShieldCheck, Wrench, Tag, Heart, ChevronDown } from 'lucide-react';
import heroCarImg from '../assets/hero-car.jpg';

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
          src={heroCarImg}
          alt="Premium executive car in modern automotive showroom and specialist service center"
          className="hero-bg-img"
          loading="eager"
          fetchPriority="high"
          onError={(e) => {
            e.target.src = '/hero-car.jpg';
          }}
        />
        <div className="hero-overlay" />
      </div>

      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-welcome-badge">
            <span className="welcome-pulse-dot" aria-hidden="true" />
            <span>Welcome to BLUELINE AUTO SERVICES LTD</span>
          </div>

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
              aria-label="Explore our automotive services"
            >
              Explore Our Services
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
          object-position: 55% 45%;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            rgba(10, 22, 53, 0.90) 0%,
            rgba(10, 22, 53, 0.76) 42%,
            rgba(10, 22, 53, 0.42) 75%,
            rgba(10, 22, 53, 0.58) 100%
          );
        }

        .hero-container {
          position: relative;
          z-index: 1;
          padding-top: clamp(2rem, 4vw, 4rem);
          padding-bottom: clamp(2.5rem, 5vw, 5rem);
          width: 100%;
        }

        .hero-welcome-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(29, 111, 235, 0.22);
          border: 1px solid rgba(59, 130, 246, 0.45);
          backdrop-filter: blur(8px);
          color: #93C5FD;
          font-family: var(--font-body);
          font-size: clamp(0.72rem, 1.8vw, 0.85rem);
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 0.35rem 0.95rem;
          border-radius: var(--radius-full);
          margin-bottom: var(--sp-md);
          max-width: 100%;
          line-height: 1.3;
        }

        .welcome-pulse-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #38BDF8;
          box-shadow: 0 0 8px #38BDF8;
          flex-shrink: 0;
          animation: topbarDotPulse 2s infinite ease-in-out;
        }

        .hero-content {
          max-width: 720px;
          margin-bottom: clamp(2rem, 4vw, var(--sp-4xl));
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5.2vw, 4.25rem);
          font-weight: 900;
          color: var(--white);
          line-height: 1.1;
          margin-bottom: var(--sp-md);
          letter-spacing: -0.02em;
          word-wrap: break-word;
        }

        .hero-highlight {
          color: var(--blue-400);
          position: relative;
          display: inline-block;
        }

        .hero-subtitle {
          font-size: clamp(0.9375rem, 1.8vw, 1.25rem);
          color: rgba(255,255,255,.86);
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
          .hero-bg-img {
            object-position: 50% 45%;
          }
          .hero-overlay {
            background: linear-gradient(
              180deg,
              rgba(10, 22, 53, 0.90) 0%,
              rgba(10, 22, 53, 0.72) 42%,
              rgba(10, 22, 53, 0.85) 100%
            );
          }
          .hero-trust {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 560px) {
          .hero-bg-img {
            object-position: 48% 45%;
          }
          .hero-welcome-badge {
            font-size: 0.71875rem;
            padding: 0.3rem 0.75rem;
            letter-spacing: 0.03em;
          }
          .hero-trust {
            grid-template-columns: 1fr;
          }
          .trust-item {
            padding: var(--sp-md);
          }
          .hero-actions {
            flex-direction: column;
            width: 100%;
          }
          .hero-actions .btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 360px) {
          .hero-welcome-badge {
            font-size: 0.65rem;
            padding: 0.25rem 0.6rem;
          }
        }
      `}</style>
    </section>
  );
}
