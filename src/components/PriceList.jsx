import { useState } from 'react';
import { PRICE_LIST } from '../data/services.js';
import { Settings, Wrench, Sparkles, AlertTriangle, Key, ArrowRight, Info } from 'lucide-react';

const ICON_MAP = { Settings, Wrench, Sparkles, AlertTriangle, Key };

export default function PriceList() {
  const [activeCategory, setActiveCategory] = useState(PRICE_LIST[0].category);

  const scrollToQuote = () => {
    const el = document.querySelector('#quote');
    if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
  };

  const activeData = PRICE_LIST.find(p => p.category === activeCategory);

  return (
    <section id="prices" className="section price-section" aria-labelledby="prices-title">
      <div className="container">
        <header className="section__header reveal">
          <span className="section__eyebrow">Pricing</span>
          <h2 id="prices-title" className="section__title">
            Service <span className="highlight">Price List</span>
          </h2>
          <div className="divider" />
          <div className="price-disclaimer reveal" style={{ marginTop: 'var(--sp-md)' }}>
            <Info size={14} aria-hidden="true" />
            Transparent and competitive pricing in British pounds (£). All prices include standard UK parts, labour, and guarantee.
          </div>
        </header>

        <div className="price-layout">
          {/* Category tabs */}
          <nav className="price-tabs" aria-label="Service price categories">
            {PRICE_LIST.map(cat => {
              const Icon = ICON_MAP[cat.icon] || Settings;
              return (
                <button
                  key={cat.category}
                  className={`price-tab${activeCategory === cat.category ? ' active' : ''}`}
                  onClick={() => setActiveCategory(cat.category)}
                  aria-pressed={activeCategory === cat.category}
                >
                  <Icon size={18} aria-hidden="true" />
                  {cat.category}
                </button>
              );
            })}
          </nav>

          {/* Price table */}
          {activeData && (
            <div className="price-table-wrap reveal">
              <div className="price-table-header">
                <h3 className="price-table-title">{activeData.category}</h3>
              </div>
              <table className="price-table" aria-label={`${activeData.category} price list`}>
                <thead>
                  <tr>
                    <th scope="col">Service</th>
                    <th scope="col" className="price-col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {activeData.items.map(item => (
                    <tr key={item.name}>
                      <td>{item.name}</td>
                      <td className={`price-col ${item.price === 'Request a Quote' ? 'price-quote' : 'price-value'}`}>
                        {item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="price-table-footer">
                <p>Can't see what you need? We can provide a bespoke quotation for any service.</p>
                <button className="btn btn--primary" onClick={scrollToQuote}>
                  Request a Quote <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .price-section { background: var(--grey-100); }

        .price-disclaimer {
          display: inline-flex;
          align-items: flex-start;
          gap: 0.4rem;
          background: var(--blue-50);
          border: 1px solid var(--blue-200);
          color: var(--blue-800);
          font-size: 0.8375rem;
          padding: var(--sp-sm) var(--sp-md);
          border-radius: var(--radius-md);
          max-width: 640px;
          margin: 0 auto;
          line-height: 1.5;
          text-align: left;
        }

        .price-layout {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: var(--sp-xl);
          align-items: start;
          margin-top: var(--sp-xl);
        }

        @media (max-width: 768px) {
          .price-layout {
            grid-template-columns: 1fr;
          }
        }

        /* Category nav */
        .price-tabs {
          display: flex;
          flex-direction: column;
          gap: var(--sp-xs);
        }

        @media (max-width: 768px) {
          .price-tabs {
            flex-direction: row;
            flex-wrap: wrap;
          }
        }

        .price-tab {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          padding: 0.875rem var(--sp-md);
          border-radius: var(--radius-md);
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--grey-700);
          background: var(--white);
          border: 1.5px solid var(--grey-200);
          text-align: left;
          transition: all var(--transition-fast);
        }

        .price-tab:hover {
          border-color: var(--accent);
          color: var(--accent);
        }

        .price-tab.active {
          background: var(--accent);
          color: var(--white);
          border-color: var(--accent);
          box-shadow: var(--shadow-blue);
        }

        /* Table */
        .price-table-wrap {
          background: var(--white);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .price-table-header {
          padding: var(--sp-lg) var(--sp-xl);
          background: var(--navy);
        }

        .price-table-title {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--white);
        }

        .price-table {
          width: 100%;
          min-width: 280px;
          border-collapse: collapse;
          font-size: 0.9375rem;
        }

        .price-table thead tr {
          background: var(--grey-100);
        }

        .price-table th {
          padding: 0.75rem var(--sp-xl);
          text-align: left;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--grey-600);
        }

        .price-table td {
          padding: var(--sp-md) var(--sp-xl);
          border-top: 1px solid var(--grey-200);
          color: var(--grey-800);
        }

        .price-table tbody tr:hover {
          background: var(--grey-100);
        }

        .price-col { 
          text-align: right; 
          white-space: nowrap;
        }

        .price-value {
          font-weight: 700;
          color: var(--accent);
          font-size: 1.0625rem;
        }

        .price-quote {
          color: var(--grey-600);
          font-weight: 600;
          font-size: 0.875rem;
          font-style: italic;
        }

        .price-table-footer {
          padding: var(--sp-lg) var(--sp-xl);
          border-top: 1px solid var(--grey-200);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--sp-md);
          flex-wrap: wrap;
          background: var(--grey-50, var(--grey-100));
        }

        .price-table-footer p {
          font-size: 0.875rem;
          color: var(--grey-600);
          flex: 1;
        }

        @media (max-width: 640px) {
          .price-table-header {
            padding: 1rem 1.25rem;
          }
          .price-table th,
          .price-table td {
            padding: 0.75rem 1rem;
            font-size: 0.875rem;
          }
          .price-value {
            font-size: 0.95rem;
          }
          .price-table-footer {
            padding: 1.25rem 1rem;
            flex-direction: column;
            align-items: stretch;
            text-align: center;
          }
          .price-table-footer .btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 380px) {
          .price-table th,
          .price-table td {
            padding: 0.65rem 0.65rem;
            font-size: 0.8125rem;
          }
          .price-tab {
            padding: 0.65rem 0.85rem;
            font-size: 0.8125rem;
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
