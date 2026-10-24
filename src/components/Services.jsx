import { useState } from 'react';
import { SERVICES } from '../data/services.js';
import {
  Car, Key, Truck, Settings, Wrench, AlertTriangle, Sparkles, Search,
  ArrowRight, X, CheckCircle
} from 'lucide-react';

const ICON_MAP = { Car, Key, Truck, Settings, Wrench, AlertTriangle, Sparkles, Search };

function ServiceModal({ service, onClose }) {
  if (!service) return null;
  const Icon = ICON_MAP[service.icon] || Car;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="service-modal-title" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal service-modal">
        <div className="service-modal-header">
          <img src={service.image} alt={service.title} className="service-modal-img" />
          <div className="service-modal-overlay" />
          <button className="service-modal-close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
          <div className="service-modal-title-area">
            <div className="service-modal-icon-wrap"><Icon size={24} /></div>
            <h2 id="service-modal-title" className="service-modal-name">{service.title}</h2>
          </div>
        </div>
        <div className="service-modal-body">
          <p className="service-modal-desc">{service.longDesc}</p>
          <h3 className="service-modal-features-title">What's included</h3>
          <ul className="service-modal-features">
            {service.features.map(f => (
              <li key={f}>
                <CheckCircle size={16} className="feature-check" />
                {f}
              </li>
            ))}
          </ul>
          <div className="service-modal-actions">
            <button
              className="btn btn--primary"
              onClick={() => {
                onClose();
                setTimeout(() => {
                  const el = document.querySelector('#quote');
                  if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
                }, 300);
              }}
            >
              Request a Quote <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .service-modal { padding: 0; max-width: 600px; }
        .service-modal-header {
          position: relative;
          height: 220px;
          overflow: hidden;
          border-radius: var(--radius-xl) var(--radius-xl) 0 0;
        }
        .service-modal-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .service-modal-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(13,27,62,.8) 0%, rgba(13,27,62,.1) 60%);
        }
        .service-modal-close {
          position: absolute;
          top: var(--sp-md);
          right: var(--sp-md);
          width: 36px;
          height: 36px;
          background: rgba(0,0,0,.4);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
          transition: background var(--transition-fast);
        }
        .service-modal-close:hover { background: rgba(0,0,0,.65); }
        .service-modal-title-area {
          position: absolute;
          bottom: var(--sp-lg);
          left: var(--sp-lg);
          display: flex;
          align-items: center;
          gap: var(--sp-md);
          z-index: 1;
        }
        .service-modal-icon-wrap {
          width: 48px;
          height: 48px;
          background: var(--accent);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }
        .service-modal-name {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 800;
          color: white;
        }
        .service-modal-body {
          padding: var(--sp-xl);
        }
        .service-modal-desc {
          color: var(--grey-700);
          line-height: 1.7;
          margin-bottom: var(--sp-lg);
          font-size: 0.9375rem;
        }
        .service-modal-features-title {
          font-size: 0.875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--grey-600);
          margin-bottom: var(--sp-sm);
        }
        .service-modal-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--sp-sm);
          margin-bottom: var(--sp-xl);
        }
        @media (max-width: 500px) {
          .service-modal-features { grid-template-columns: 1fr; }
        }
        .service-modal-features li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--grey-700);
        }
        .feature-check { color: var(--accent); flex-shrink: 0; }
        .service-modal-actions { display: flex; gap: var(--sp-sm); }
      `}</style>
    </div>
  );
}

export default function Services() {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <section id="services" className="section section--grey services-section" aria-labelledby="services-title">
      <div className="container">
        <header className="section__header reveal">
          <span className="section__eyebrow">What We Do</span>
          <h2 id="services-title" className="section__title">Our <span className="highlight">Services</span></h2>
          <div className="divider" />
          <p className="section__subtitle" style={{ marginTop: 'var(--sp-md)' }}>
            Complete automotive solutions, all in one place.
          </p>
        </header>

        <div className="services-grid">
          {SERVICES.map((service, idx) => {
            const Icon = ICON_MAP[service.icon] || Car;
            return (
              <article
                key={service.id}
                className="card service-card reveal"
                style={{ transitionDelay: `${idx * 60}ms` }}
              >
                <div className="service-card-img-wrap">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="service-card-img"
                    loading="lazy"
                    onError={e => { e.target.src = `https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=70`; }}
                  />
                  <div className="service-card-img-overlay" />
                  <div className="service-number">0{service.id}</div>
                </div>
                <div className="service-card-body">
                  <div className="service-card-icon">
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-desc">{service.shortDesc}</p>
                  <button
                    className="btn btn--ghost"
                    onClick={() => setActiveModal(service)}
                    aria-label={`Learn more about ${service.title}`}
                  >
                    Learn More <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {activeModal && (
        <ServiceModal
          service={activeModal}
          onClose={() => setActiveModal(null)}
        />
      )}

      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--sp-lg);
        }
        @media (max-width: 1100px) {
          .services-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .services-grid { grid-template-columns: 1fr; }
        }

        .service-card {
          display: flex;
          flex-direction: column;
          border: 1px solid var(--grey-200);
        }

        .service-card-img-wrap {
          position: relative;
          height: 180px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .service-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .service-card:hover .service-card-img {
          transform: scale(1.08);
        }

        .service-card-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(13,27,62,.55) 0%, transparent 60%);
          transition: opacity var(--transition);
        }

        .service-card:hover .service-card-img-overlay {
          opacity: 0.7;
        }

        .service-number {
          position: absolute;
          top: var(--sp-sm);
          right: var(--sp-sm);
          background: var(--accent);
          color: white;
          font-size: 0.75rem;
          font-weight: 800;
          width: 30px;
          height: 30px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          letter-spacing: 0.02em;
        }

        .service-card-body {
          padding: var(--sp-lg);
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .service-card-icon {
          width: 44px;
          height: 44px;
          background: var(--blue-50);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
          margin-bottom: var(--sp-md);
          transition: background var(--transition-fast), color var(--transition-fast);
        }

        .service-card:hover .service-card-icon {
          background: var(--accent);
          color: white;
        }

        .service-card-title {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 700;
          color: var(--dark);
          margin-bottom: var(--sp-xs);
        }

        .service-card-desc {
          font-size: 0.875rem;
          color: var(--grey-600);
          line-height: 1.6;
          flex: 1;
          margin-bottom: var(--sp-md);
        }
      `}</style>
    </section>
  );
}
