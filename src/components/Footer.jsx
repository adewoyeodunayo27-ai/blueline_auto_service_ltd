import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BUSINESS } from '../data/business.js';
import { SERVICES } from '../data/services.js';
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import { FacebookIcon, InstagramIcon, TwitterIcon, LinkedinIcon } from './SocialIcons.jsx';
import LegalModal from './LegalModal.jsx';

const currentYear = new Date().getFullYear();

const QUICK_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Our Cars', path: '/cars' },
  { label: 'Services', path: '/services' },
  { label: 'Price List', path: '/pricing' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact Us', path: '/contact' },
];

export default function Footer() {
  const [legalOpen, setLegalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState('privacy');

  const openLegal = (tab) => {
    setLegalTab(tab);
    setLegalOpen(true);
  };

  return (
    <footer className="footer" role="contentinfo">
      {/* Quick Quote Strip */}
      <div className="quick-quote-strip">
        <div className="container qq-inner">
          <div className="qq-text">
            <h2 className="qq-title">Ready to Get Started?</h2>
            <p className="qq-subtitle">
              Contact our team today for a no-obligation quote on any of our automotive services.
            </p>
          </div>
          <div className="qq-actions">
            <Link to="/pricing" className="btn btn--primary btn--lg">
              <span>Get a Free Quote</span>
              <ArrowRight size={18} />
            </Link>
            <a href={`tel:${BUSINESS.phone}`} className="btn btn--outline btn--lg">
              <Phone size={18} />
              <span>Call Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Column 1: Brand */}
            <div className="footer-col footer-col--brand">
              <Link to="/" className="footer-logo" aria-label="Blueline Auto Services Ltd Home">
                <img
                  src={BUSINESS.logo || '/logo.png'}
                  alt="Blueline Auto Services Ltd Logo"
                  className="footer-logo-img"
                />
                <div>
                  <span className="footer-logo-name">BLUELINE</span>
                  <span className="footer-logo-sub">AUTO SERVICES LTD</span>
                  <span className="footer-logo-slogan">Driven by Trust. Powered by Excellence.</span>
                </div>
              </Link>
              <p className="footer-brand-desc">
                Providing professional automotive services across the United Kingdom, including vehicle
                sales, hire, servicing, repairs, recovery, and valeting — all under one roof.
              </p>
              <div className="footer-social">
                <a href={BUSINESS.social.facebook}  aria-label="Facebook"  className="footer-social-link" target="_blank" rel="noopener noreferrer"><FacebookIcon  size={17} /></a>
                <a href={BUSINESS.social.instagram} aria-label="Instagram" className="footer-social-link" target="_blank" rel="noopener noreferrer"><InstagramIcon size={17} /></a>
                <a href={BUSINESS.social.twitter}   aria-label="Twitter"   className="footer-social-link" target="_blank" rel="noopener noreferrer"><TwitterIcon   size={17} /></a>
                <a href={BUSINESS.social.linkedin}  aria-label="LinkedIn"  className="footer-social-link" target="_blank" rel="noopener noreferrer"><LinkedinIcon  size={17} /></a>
              </div>
            </div>

            {/* Column 2: Quick links */}
            <div className="footer-col">
              <h3 className="footer-col-title">Quick Links</h3>
              <ul className="footer-links">
                {QUICK_LINKS.map(link => (
                  <li key={link.path}>
                    <Link to={link.path} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Services */}
            <div className="footer-col">
              <h3 className="footer-col-title">Our Services</h3>
              <ul className="footer-links">
                {SERVICES.map(s => (
                  <li key={s.id}>
                    <Link to="/services" className="footer-link">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact & Hours */}
            <div className="footer-col">
              <h3 className="footer-col-title">Contact Us</h3>
              <div className="footer-contact-items">
                <a href={`tel:${BUSINESS.phone}`} className="footer-contact-item">
                  <Phone size={15} />
                  <span>{BUSINESS.phoneDisplay}</span>
                </a>
                <a href={`mailto:${BUSINESS.email}`} className="footer-contact-item">
                  <Mail size={15} />
                  <span>{BUSINESS.email}</span>
                </a>
                <a
                  href={BUSINESS.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-contact-item"
                  title="View on Google Maps"
                >
                  <MapPin size={15} />
                  <span>{BUSINESS.addressLine1}, {BUSINESS.addressLine2}, {BUSINESS.postcode}</span>
                </a>
              </div>

              <h3 className="footer-col-title" style={{ marginTop: 'var(--sp-lg)' }}>Opening Hours</h3>
              <div className="footer-hours">
                {BUSINESS.hours.map(h => (
                  <div key={h.day} className="footer-hours-row">
                    <span>{h.day}</span>
                    <span>{h.open === 'Closed' ? 'Closed' : `${h.open}–${h.close}`}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="footer-copy">
            © {currentYear} Blueline Auto Services Ltd. All rights reserved.
          </p>
          <div className="footer-legal">
            <button type="button" onClick={() => openLegal('privacy')} className="footer-legal-btn">Privacy Policy</button>
            <span aria-hidden="true">·</span>
            <button type="button" onClick={() => openLegal('cookie')} className="footer-legal-btn">Cookie Policy</button>
            <span aria-hidden="true">·</span>
            <button type="button" onClick={() => openLegal('terms')} className="footer-legal-btn">Terms & Conditions</button>
          </div>
        </div>
      </div>

      <LegalModal
        isOpen={legalOpen}
        onClose={() => setLegalOpen(false)}
        activeTab={legalTab}
        setActiveTab={setLegalTab}
      />

      <style>{`
        /* Quick quote strip */
        .quick-quote-strip {
          background: linear-gradient(135deg, var(--navy) 0%, var(--accent-dark) 100%);
          padding: var(--sp-2xl) 0;
        }
        .qq-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--sp-xl);
          flex-wrap: wrap;
        }
        .qq-text { flex: 1; min-width: 280px; }
        .qq-title {
          font-family: var(--font-display);
          font-size: clamp(1.25rem, 2.5vw, 1.75rem);
          font-weight: 800;
          color: var(--white);
          margin-bottom: var(--sp-xs);
        }
        .qq-subtitle {
          color: rgba(255,255,255,.75);
          font-size: 0.9375rem;
        }
        .qq-actions {
          display: flex;
          gap: var(--sp-md);
          flex-wrap: wrap;
          flex-shrink: 0;
        }

        /* Main footer */
        .footer-main {
          background: var(--charcoal);
          padding: var(--sp-4xl) 0 var(--sp-2xl);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1.3fr;
          gap: var(--sp-2xl);
        }

        @media (max-width: 1100px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr; }
        }

        .footer-col {}
        .footer-col--brand {}

        /* Footer logo */
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: var(--sp-md);
        }
        .footer-logo-img {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          object-fit: cover;
          display: block;
          flex-shrink: 0;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5);
          border: 2px solid var(--accent);
        }
        .footer-logo div {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }
        .footer-logo-name {
          font-family: var(--font-display);
          font-size: 1.125rem;
          font-weight: 900;
          color: var(--accent-light);
          letter-spacing: 0.04em;
        }
        .footer-logo-sub {
          font-size: 0.5rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--grey-500);
          text-transform: uppercase;
        }

        .footer-logo-slogan {
          font-family: var(--font-body);
          font-size: 0.625rem;
          font-weight: 600;
          color: var(--blue-300);
          letter-spacing: 0.02em;
          margin-top: 3px;
          line-height: 1.2;
        }

        .footer-brand-desc {
          color: var(--grey-500);
          font-size: 0.875rem;
          line-height: 1.7;
          margin-bottom: var(--sp-lg);
        }

        .footer-social {
          display: flex;
          gap: 0.625rem;
        }

        .footer-social-link {
          width: 36px;
          height: 36px;
          background: rgba(255,255,255,.07);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--grey-400);
          transition: background var(--transition-fast), color var(--transition-fast);
        }
        .footer-social-link:hover {
          background: var(--accent);
          color: white;
        }

        /* Column headings */
        .footer-col-title {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--grey-400);
          margin-bottom: var(--sp-md);
        }

        /* Links */
        .footer-links { display: flex; flex-direction: column; gap: 0.4rem; }
        .footer-link {
          color: var(--grey-500);
          font-size: 0.875rem;
          transition: color var(--transition-fast);
          text-align: left;
          padding: 0;
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          line-height: 1.6;
        }
        .footer-link:hover { color: var(--accent-light); }

        /* Contact */
        .footer-contact-items { display: flex; flex-direction: column; gap: 0.625rem; }
        .footer-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          color: var(--grey-500);
          font-size: 0.875rem;
          line-height: 1.5;
          transition: color var(--transition-fast);
        }
        .footer-contact-item svg { flex-shrink: 0; margin-top: 2px; color: var(--accent-light); }
        .footer-contact-item:hover { color: var(--grey-200); }

        /* Hours */
        .footer-hours { display: flex; flex-direction: column; gap: 0.3rem; }
        .footer-hours-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: var(--grey-500);
          padding: 0.2rem 0;
          border-bottom: 1px solid rgba(255,255,255,.04);
        }

        /* Bottom bar */
        .footer-bottom {
          background: var(--dark);
          padding: var(--sp-md) 0;
        }
        .footer-bottom-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: var(--sp-md);
        }
        .footer-copy {
          font-size: 0.8125rem;
          color: var(--grey-600);
        }
        .footer-legal {
          display: flex;
          align-items: center;
          gap: var(--sp-sm);
        }
        .footer-legal-link,
        .footer-legal-btn {
          font-size: 0.8125rem;
          color: var(--grey-600);
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          font-family: inherit;
          transition: color var(--transition-fast);
        }
        .footer-legal-link:hover,
        .footer-legal-btn:hover { color: var(--accent-light); }

        @media (max-width: 540px) {
          .qq-inner {
            flex-direction: column;
            text-align: center;
            gap: var(--sp-md);
          }
          .qq-actions {
            flex-direction: column;
            width: 100%;
          }
          .qq-actions .btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 600px) {
          .footer-bottom-inner {
            flex-direction: column;
            text-align: center;
            justify-content: center;
            gap: 0.5rem;
          }
          .footer-legal {
            justify-content: center;
            flex-wrap: wrap;
          }
        }
      `}</style>
    </footer>
  );
}
