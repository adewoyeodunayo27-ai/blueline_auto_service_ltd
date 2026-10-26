import { useState } from 'react';
import { FLEET, FLEET_CATEGORIES } from '../data/fleet.js';
import { ArrowRight, Info } from 'lucide-react';

function FleetCard({ vehicle, onEnquire }) {
  const isFromPrice = vehicle.price.startsWith('From ');
  const rawNumber = vehicle.price.replace('From ', '').replace('£', '');

  return (
    <article className="fleet-card">
      <div className="fleet-card-img-wrap">
        <img
          src={vehicle.image}
          alt={`${vehicle.name} — illustrative sample`}
          className="fleet-card-img"
          loading="lazy"
          onError={e => {
            if (e.currentTarget.dataset.fallbackTried) return;
            e.currentTarget.dataset.fallbackTried = 'true';
            e.currentTarget.src = '/hero-car.jpg';
          }}
        />
        <div className="fleet-card-scrim" aria-hidden="true" />
        <span className="fleet-category-badge">{vehicle.category}</span>
        {vehicle.salePrice ? (
          <span className="fleet-sale-badge">For Sale</span>
        ) : (
          <span className="fleet-hire-badge">Hire</span>
        )}
      </div>
      <div className="fleet-card-body">
        <h3 className="fleet-card-name">{vehicle.name}</h3>

        {/* Displayed Price */}
        <div className="fleet-card-price-row">
          <div className="fleet-card-price-main">
            {isFromPrice && <span className="price-from-label">From</span>}
            <span className="price-currency">£</span>
            <span className="price-amount">{rawNumber}</span>
            {vehicle.pricePeriod && <span className="price-period">{vehicle.pricePeriod}</span>}
          </div>
          {vehicle.salePrice && (
            <span className="fleet-card-sale-badge" title="Purchase price available">
              Sale: {vehicle.salePrice}
            </span>
          )}
        </div>

        <p className="fleet-card-desc">{vehicle.description}</p>
        
        {vehicle.note && (
          <div className="fleet-card-note">
            <Info size={13} aria-hidden="true" />
            <span>{vehicle.note}</span>
          </div>
        )}

        <div className="fleet-card-actions">
          <button
            className="fleet-card-cta"
            onClick={() => onEnquire(vehicle)}
            aria-label={`Book or enquire about ${vehicle.name} for ${vehicle.priceDisplay}`}
          >
            <span>Book / Enquire</span>
            <ArrowRight size={15} className="fleet-card-cta-arrow" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Fleet({ onBookingOpen }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? FLEET
    : FLEET.filter(v => v.category === activeCategory);

  return (
    <section id="fleet" className="section section--grey fleet-section" aria-labelledby="fleet-title">
      <div className="container">
        <header className="section__header reveal">
          <span className="section__eyebrow">Our Fleet</span>
          <h2 id="fleet-title" className="section__title">
            Vehicles <span className="highlight">Available</span>
          </h2>
          <div className="divider" />
          <p className="section__subtitle" style={{ marginTop: 'var(--sp-md)' }}>
            Explore our vehicle inventory available for hire, purchase, and professional transport.
            Clear rates in British pounds (£) with full UK insurance and roadside assistance.
          </p>
        </header>

        {/* Category filters */}
        <div className="filter-tabs" role="tablist" aria-label="Filter vehicles by category">
          {FLEET_CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`filter-tab${activeCategory === cat ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              role="tab"
              aria-selected={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="fleet-grid" role="tabpanel">
          {filtered.map(vehicle => (
            <FleetCard
              key={vehicle.id}
              vehicle={vehicle}
              onEnquire={() => onBookingOpen && onBookingOpen(vehicle)}
            />
          ))}
        </div>
      </div>

      <style>{`
        .fleet-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--sp-lg);
        }
        @media (max-width: 1200px) {
          .fleet-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 860px) {
          .fleet-grid { grid-template-columns: repeat(2, 1fr); gap: var(--sp-md); }
        }
        @media (max-width: 540px) {
          .fleet-grid { grid-template-columns: 1fr; }
        }

        .fleet-card { 
          border: 1px solid #e8edf5; 
          display: flex;
          flex-direction: column;
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(11,21,40,0.06), 0 4px 16px rgba(11,21,40,0.06);
          transition: transform 0.32s cubic-bezier(0.22,1,0.36,1), box-shadow 0.32s cubic-bezier(0.22,1,0.36,1);
        }

        .fleet-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 2px 4px rgba(11,21,40,0.04), 0 16px 36px rgba(29,111,235,0.16);
        }

        .fleet-card-img-wrap {
          position: relative;
          height: clamp(200px, 34vw, 230px);
          overflow: hidden;
          background: #0a1628;
        }

        .fleet-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
          display: block;
        }
        .fleet-card:hover .fleet-card-img { transform: scale(1.07); }

        .fleet-card-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(10,22,40,0.15) 0%, rgba(10,22,40,0) 45%, rgba(10,22,40,0.35) 100%);
          pointer-events: none;
        }

        .fleet-category-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(11, 21, 40, 0.75);
          color: #ffffff;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 0.25rem 0.65rem;
          border-radius: 999px;
          text-transform: uppercase;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
        }

        .fleet-sale-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(220, 38, 38, 0.88);
          color: #ffffff;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 0.25rem 0.65rem;
          border-radius: 999px;
          text-transform: uppercase;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 150, 150, 0.3);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
        }

        .fleet-hire-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(29, 111, 235, 0.85);
          color: #ffffff;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 0.25rem 0.65rem;
          border-radius: 999px;
          text-transform: uppercase;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(100, 160, 255, 0.3);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
        }

        .fleet-card-body {
          padding: 1.25rem 1.25rem 1.4rem;
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
          flex: 1;
        }

        @media (max-width: 480px) {
          .fleet-card-body {
            padding: 1.15rem 1rem;
          }
        }

        .fleet-card-name {
          font-family: var(--font-display);
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--dark, #0B1528);
          margin: 0;
          line-height: 1.25;
        }

        /* ── Price Row Directly Below Vehicle Name ── */
        .fleet-card-price-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.35rem 0.5rem;
          padding: 0.15rem 0 0.55rem;
          margin-bottom: 0.15rem;
          border-bottom: 1px solid #F1F5F9;
        }

        .fleet-card-price-main {
          display: inline-flex;
          align-items: baseline;
          gap: 0.15rem;
          font-family: var(--font-display);
        }

        .price-from-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #64748B;
          margin-right: 0.25rem;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .price-currency {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--accent, #1D6FEB);
        }

        .price-amount {
          font-size: 1.65rem;
          font-weight: 900;
          line-height: 1;
          color: var(--accent, #1D6FEB);
          letter-spacing: -0.03em;
        }

        .price-period {
          font-size: 0.8rem;
          font-weight: 600;
          color: #64748B;
          margin-left: 0.2rem;
        }

        .fleet-card-sale-badge {
          font-size: 0.72rem;
          font-weight: 700;
          color: #dc2626;
          background: #fef2f2;
          border: 1px solid #fecaca;
          padding: 0.2rem 0.55rem;
          border-radius: 999px;
          white-space: nowrap;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .fleet-card-desc {
          font-size: 0.855rem;
          color: var(--grey-600, #475569);
          line-height: 1.55;
          margin: 0;
          flex: 1;
        }

        .fleet-card-note {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          color: #1d6feb;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          border-radius: 8px;
          padding: 0.45rem 0.65rem;
          margin-top: 0.2rem;
        }
        .fleet-card-note svg {
          flex-shrink: 0;
          color: #1d6feb;
        }

        .fleet-card-actions {
          margin-top: 0.4rem;
        }

        .fleet-card-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.75rem 1.25rem;
          border-radius: 10px;
          background: linear-gradient(135deg, #1d6feb 0%, #1557bf 100%);
          color: #ffffff;
          font-family: var(--font-display);
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          border: none;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.18s ease, box-shadow 0.2s ease;
        }

        .fleet-card-cta:hover {
          background: linear-gradient(135deg, #1557bf 0%, #1048a8 100%);
          box-shadow: 0 4px 16px rgba(29,111,235,0.4);
          transform: translateY(-1px);
        }

        .fleet-card-cta-arrow {
          transition: transform 0.2s ease;
        }

        .fleet-card-cta:hover .fleet-card-cta-arrow {
          transform: translateX(4px);
        }
      `}</style>
    </section>
  );
}
