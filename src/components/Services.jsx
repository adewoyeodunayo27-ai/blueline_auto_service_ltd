import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVICES } from '../data/services.js';
import {
  Car, Key, Truck, Settings, Wrench, AlertTriangle, Sparkles, Search,
  ArrowRight, X, CheckCircle, Info
} from 'lucide-react';
import { WhatsAppIcon } from './SocialIcons.jsx';

const ICON_MAP = { Car, Key, Truck, Settings, Wrench, AlertTriangle, Sparkles, Search };

function ServiceModal({ service, onClose }) {
  const navigate = useNavigate();
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
          {service.price && (
            <div className="service-modal-price-card">
              <div className="service-modal-price-row">
                <span className="modal-price-label">Starting Price:</span>
                <span className="modal-price-highlight">{service.priceDisplay || service.price}</span>
              </div>
              {service.priceNote && (
                <div className="modal-price-note">
                  <Info size={15} className="modal-note-icon" aria-hidden="true" />
                  <span>{service.priceNote}</span>
                </div>
              )}
            </div>
          )}

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
            {service.whatsappUrl ? (
              <a
                href={service.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="service-whatsapp-btn"
                aria-label={`${service.whatsappCta || 'Book on WhatsApp'} on +44 7757 772952`}
              >
                <WhatsAppIcon size={18} />
                <span>{service.whatsappCta || 'Book on WhatsApp'}</span>
              </a>
            ) : (
              <button
                className="btn btn--primary"
                onClick={() => {
                  onClose();
                  navigate('/pricing');
                }}
              >
                Request a Quote <ArrowRight size={16} />
              </button>
            )}
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
          right: var(--sp-lg);
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
          font-size: 1.35rem;
          font-weight: 800;
          color: white;
          line-height: 1.25;
        }
        .service-modal-body {
          padding: var(--sp-xl);
        }
        .service-modal-price-card {
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          border-radius: var(--radius-md);
          padding: 1rem 1.15rem;
          margin-bottom: var(--sp-lg);
        }
        .service-modal-price-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 0.45rem;
        }
        .modal-price-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: #1e3a8a;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .modal-price-highlight {
          font-family: var(--font-display);
          font-size: 1.35rem;
          font-weight: 900;
          color: #1d6feb;
        }
        .modal-price-note {
          display: flex;
          align-items: flex-start;
          gap: 0.45rem;
          font-size: 0.8rem;
          line-height: 1.45;
          color: #1e40af;
          border-top: 1px dashed #bfdbfe;
          padding-top: 0.5rem;
        }
        .modal-note-icon {
          flex-shrink: 0;
          color: #1d6feb;
          margin-top: 2px;
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
            Complete automotive and transportation solutions, all in one place.
          </p>
        </header>

        <div className="services-grid">
          {SERVICES.map((service, idx) => {
            const Icon = ICON_MAP[service.icon] || Car;
            return (
              <article
                key={service.id}
                className={`card service-card reveal${service.price ? ' service-card--has-price' : ''}`}
                style={{ transitionDelay: `${idx * 60}ms` }}
              >
                <div className="service-card-img-wrap">
                  <img
                    src={service.image}
                    alt={`${service.title} - Blueline Auto Services Ltd`}
                    className="service-card-img"
                    loading="lazy"
                    onError={e => { e.target.src = `https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=70`; }}
                  />
                  <div className="service-card-img-overlay" />
                  <div className="service-number">0{service.id}</div>
                  {service.price && (
                    <div className="service-card-img-badge">
                      <span>{service.price}</span>
                    </div>
                  )}
                </div>
                <div className="service-card-body">
                  <div className="service-card-icon">
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <h3 className="service-card-title">{service.title}</h3>

                  {/* Prominent Price Display on Service Card */}
                  {service.price && (
                    <div className="service-card-price-prominent" aria-label={`Pricing: ${service.priceDisplay || service.price}`}>
                      <span className="price-prefix">From</span>
                      <span className="price-currency">€</span>
                      <span className="price-amount">80</span>
                      <span className="price-suffix">upwards</span>
                    </div>
                  )}

                  <p className="service-card-desc">{service.shortDesc}</p>

                  {/* Pricing Note */}
                  {service.priceNote && (
                    <div className="service-card-pricing-note">
                      <Info size={14} className="pricing-note-icon" aria-hidden="true" />
                      <p className="pricing-note-text">{service.priceNote}</p>
                    </div>
                  )}

                  {/* Booking Buttons */}
                  {service.whatsappCta ? (
                    <div className="service-card-actions-group">
                      <a
                        href={service.whatsappUrl || "https://wa.me/447757772952"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="service-whatsapp-btn"
                        aria-label={`${service.whatsappCta} on +44 7757 772952`}
                      >
                        <WhatsAppIcon size={18} />
                        <span>{service.whatsappCta}</span>
                      </a>
                      <button
                        className="btn btn--ghost service-learn-more-btn"
                        onClick={() => setActiveModal(service)}
                        aria-label={`View full details about ${service.title}`}
                      >
                        <span>View Service Details</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn btn--ghost"
                      onClick={() => setActiveModal(service)}
                      aria-label={`Learn more about ${service.title}`}
                    >
                      Learn More <ArrowRight size={14} />
                    </button>
                  )}
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
        @media (max-width: 1200px) {
          .services-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 860px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); gap: var(--sp-md); }
        }
        @media (max-width: 540px) {
          .services-grid { grid-template-columns: 1fr; }
        }

        .service-card {
          display: flex;
          flex-direction: column;
          border: 1px solid var(--grey-200);
          background: #ffffff;
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
        }

        .service-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(13, 27, 62, 0.1);
          border-color: var(--blue-300);
        }

        .service-card--has-price {
          border-color: #bfdbfe;
          box-shadow: 0 4px 18px rgba(29, 111, 235, 0.08);
        }

        .service-card-img-wrap {
          position: relative;
          height: 190px;
          overflow: hidden;
          flex-shrink: 0;
          background: #0d1b3e;
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
          background: linear-gradient(to top, rgba(13,27,62,.6) 0%, transparent 60%);
          transition: opacity var(--transition);
        }

        .service-card:hover .service-card-img-overlay {
          opacity: 0.75;
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
          z-index: 1;
        }

        .service-card-img-badge {
          position: absolute;
          bottom: 12px;
          left: 12px;
          background: #10b981;
          color: #ffffff;
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.03em;
          padding: 0.3rem 0.75rem;
          border-radius: 999px;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.35);
          z-index: 1;
        }

        .service-card-body {
          padding: 1.35rem;
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
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--dark);
          margin-bottom: var(--sp-xs);
          line-height: 1.3;
        }

        /* Prominent Price Display */
        .service-card-price-prominent {
          display: flex;
          align-items: baseline;
          gap: 0.25rem;
          padding: 0.4rem 0 0.55rem;
          margin-bottom: 0.4rem;
          border-bottom: 1px solid #f1f5f9;
        }

        .service-card-price-prominent .price-prefix {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #64748b;
          margin-right: 0.15rem;
        }

        .service-card-price-prominent .price-currency {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--accent);
        }

        .service-card-price-prominent .price-amount {
          font-family: var(--font-display);
          font-size: 1.85rem;
          font-weight: 900;
          line-height: 1;
          color: var(--accent);
          letter-spacing: -0.02em;
        }

        .service-card-price-prominent .price-suffix {
          font-size: 0.825rem;
          font-weight: 600;
          color: #64748b;
          margin-left: 0.25rem;
        }

        .service-card-desc {
          font-size: 0.875rem;
          color: var(--grey-600);
          line-height: 1.6;
          margin-bottom: var(--sp-md);
          flex: 1;
        }

        /* Pricing Note on Card */
        .service-card-pricing-note {
          display: flex;
          align-items: flex-start;
          gap: 0.45rem;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          border-radius: 8px;
          padding: 0.6rem 0.75rem;
          margin-bottom: 1rem;
        }

        .service-card-pricing-note .pricing-note-icon {
          flex-shrink: 0;
          color: #1d6feb;
          margin-top: 2px;
        }

        .service-card-pricing-note .pricing-note-text {
          margin: 0;
          color: #1e40af;
          font-size: 0.775rem;
          line-height: 1.45;
          font-weight: 500;
        }

        /* Action Buttons */
        .service-card-actions-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-top: auto;
        }

        .service-whatsapp-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.8rem 1rem;
          border-radius: 10px;
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
          color: #ffffff;
          font-family: var(--font-display);
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(37, 211, 102, 0.35);
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          border: none;
          cursor: pointer;
        }

        .service-whatsapp-btn:hover {
          background: linear-gradient(135deg, #22bf5b 0%, #0e7266 100%);
          box-shadow: 0 6px 18px rgba(37, 211, 102, 0.45);
          transform: translateY(-2px);
          color: #ffffff;
        }

        .service-learn-more-btn {
          justify-content: center;
          padding: 0.5rem 0.75rem;
          font-size: 0.825rem;
        }

        @media (max-width: 640px) {
          .service-card-body {
            padding: 1.15rem 1rem;
          }
          .service-card-title {
            font-size: 1rem;
          }
          .service-card-price-prominent .price-amount {
            font-size: 1.65rem;
          }
          .service-whatsapp-btn {
            padding: 0.75rem 0.85rem;
            font-size: 0.825rem;
          }
        }
      `}</style>
    </section>
  );
}
