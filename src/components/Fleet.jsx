import { useState } from 'react';
import { FLEET, FLEET_CATEGORIES } from '../data/fleet.js';
import { ArrowRight, Info } from 'lucide-react';

function FleetCard({ vehicle, onEnquire }) {
  return (
    <article className="card fleet-card">
      <div className="fleet-card-img-wrap">
        <img
          src={vehicle.image}
          alt={`${vehicle.name} — illustrative sample`}
          className="fleet-card-img"
          loading="lazy"
          onError={e => {
            e.target.src = 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=70';
          }}
        />
        <span className="fleet-category-badge">{vehicle.category}</span>
      </div>
      <div className="fleet-card-body">
        <h3 className="fleet-card-name">{vehicle.name}</h3>
        <p className="fleet-card-desc">{vehicle.description}</p>
        <div className="fleet-card-note">
          <Info size={12} aria-hidden="true" />
          {vehicle.note}
        </div>
        <div className="fleet-card-actions">
          <button
            className="btn btn--primary btn--sm"
            onClick={() => onEnquire(vehicle)}
            aria-label={`Enquire about ${vehicle.name}`}
          >
            Enquire Now <ArrowRight size={14} />
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
            A selection of vehicles available for sale, hire, and transportation.
            All listings are illustrative — contact us for current availability.
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
        @media (max-width: 1100px) {
          .fleet-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .fleet-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .fleet-grid { grid-template-columns: 1fr; }
        }

        .fleet-card { border: 1px solid var(--grey-200); }

        .fleet-card-img-wrap {
          position: relative;
          height: 195px;
          overflow: hidden;
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
        }

        .fleet-card-body {
          padding: var(--sp-lg);
          display: flex;
          flex-direction: column;
          gap: var(--sp-xs);
        }

        .fleet-card-name {
          font-family: var(--font-display);
          font-size: 1.0625rem;
          font-weight: 700;
          color: var(--dark);
        }

        .fleet-card-desc {
          font-size: 0.875rem;
          color: var(--grey-600);
          line-height: 1.55;
        }

        .fleet-card-note {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.7375rem;
          color: var(--grey-500);
          font-style: italic;
          margin-top: var(--sp-xs);
        }

        .fleet-card-actions {
          margin-top: var(--sp-sm);
        }
      `}</style>
    </section>
  );
}
