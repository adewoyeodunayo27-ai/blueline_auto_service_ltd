import { useState } from 'react';
import { FLEET, FLEET_CATEGORIES } from '../data/fleet.js';
import { ArrowRight, Info } from 'lucide-react';

function FleetCard({ vehicle, onEnquire }) {
  const isFromPrice = vehicle.price.startsWith('From ');
  const rawNumber = vehicle.price.replace('From ', '').replace('£', '');

  return (
    <article className="card fleet-card">
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
        <span className="fleet-category-badge">{vehicle.category}</span>
      </div>
      <div className="fleet-card-body">
        <h3 className="fleet-card-name">{vehicle.name}</h3>

        {/* Displayed Price — Directly below car name */}
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
        
        <div className="fleet-card-note">
          <Info size={12} aria-hidden="true" />
          <span>{vehicle.note}</span>
        </div>

        <div className="fleet-card-actions">
          <button
            className="btn btn--primary btn--sm"
            onClick={() => onEnquire(vehicle)}
            aria-label={`Book or enquire about ${vehicle.name} for ${vehicle.priceDisplay}`}
          >
            <span>Book / Enquire</span>
            <ArrowRight size={14} />
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
          border: 1px solid var(--grey-200); 
          display: flex;
          flex-direction: column;
          background: #ffffff;
          border-radius: var(--radius-lg, 12px);
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .fleet-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(15, 23, 42, 0.1);
        }

        .fleet-card-img-wrap {
          position: relative;
          height: clamp(180px, 32vw, 210px);
          overflow: hidden;
          background: #0f1d38;
        }

        .fleet-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .fleet-card:hover .fleet-card-img { transform: scale(1.07); }

        .fleet-category-badge {
          position: absolute;
          top: var(--sp-sm);
          left: var(--sp-sm);
          background: var(--accent);
          color: white;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          padding: 0.2rem 0.65rem;
          border-radius: var(--radius-full);
          text-transform: uppercase;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
        }

        .fleet-card-body {
          padding: var(--sp-lg);
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          flex: 1;
        }

        @media (max-width: 480px) {
          .fleet-card-body {
            padding: 1.15rem 1rem;
          }
        }

        .fleet-card-name {
          font-family: var(--font-display);
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--dark, #0B1528);
          margin: 0;
        }

        /* ── Price Row Directly Below Vehicle Name ── */
        .fleet-card-price-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.35rem 0.5rem;
          padding: 0.15rem 0 0.45rem;
          margin-bottom: 0.2rem;
          border-bottom: 1px solid #F1F5F9;
        }

        .fleet-card-price-main {
          display: inline-flex;
          align-items: baseline;
          gap: 0.15rem;
          font-family: var(--font-display);
        }

        .price-from-label {
          font-size: 0.8125rem;
          font-weight: 600;
          color: #64748B;
          margin-right: 0.25rem;
        }

        .price-currency {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--accent, #1D6FEB);
        }

        .price-amount {
          font-size: 1.5rem;
          font-weight: 800;
          line-height: 1;
          color: var(--accent, #1D6FEB);
          letter-spacing: -0.02em;
        }

        .price-period {
          font-size: 0.8125rem;
          font-weight: 600;
          color: #64748B;
          margin-left: 0.2rem;
        }

        .fleet-card-sale-badge {
          font-size: 0.75rem;
          font-weight: 600;
          color: #0F172A;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          padding: 0.2rem 0.55rem;
          border-radius: 999px;
          white-space: nowrap;
        }

        .fleet-card-desc {
          font-size: 0.875rem;
          color: var(--grey-600, #475569);
          line-height: 1.55;
          margin: 0.1rem 0;
        }

        .fleet-card-note {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          color: #64748B;
          margin-top: auto;
          padding-top: 0.4rem;
        }

        .fleet-card-actions {
          margin-top: var(--sp-sm);
        }

        .fleet-card-actions .btn {
          width: 100%;
          justify-content: center;
        }
      `}</style>
    </section>
  );
}
