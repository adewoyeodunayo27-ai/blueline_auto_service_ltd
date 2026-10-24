import { useState, useEffect, useCallback } from 'react';
import { BUSINESS } from '../data/business.js';
import { Phone, Mail, MapPin, Clock, Menu, X } from 'lucide-react';
import { FacebookIcon, InstagramIcon, TwitterIcon, LinkedinIcon } from './SocialIcons.jsx';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Price List', href: '#prices' },
  { label: 'Our Fleet', href: '#fleet' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    closeMobile();
    const target = document.querySelector(href);
    if (target) {
      const headerTotal = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--header-total') || '112'
      );
      window.scrollTo({
        top: target.offsetTop - headerTotal + 16,
        behavior: 'smooth',
      });
    }
  }, [closeMobile]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Top Bar ── */}
      <div className="header-topbar">
        <div className="container">
          <div className="topbar-inner">
            <div className="topbar-left">
              <a href={`tel:${BUSINESS.phone}`} className="topbar-item">
                <Phone size={13} /> {BUSINESS.phoneDisplay}
              </a>
              <a href={`mailto:${BUSINESS.email}`} className="topbar-item">
                <Mail size={13} /> {BUSINESS.email}
              </a>
              <span className="topbar-item topbar-item--location">
                <MapPin size={13} /> {BUSINESS.addressLine2}, {BUSINESS.country}
              </span>
              <span className="topbar-item topbar-item--hours">
                <Clock size={13} /> Mon–Fri 08:00–18:00 · Sat 09:00–16:00
              </span>
            </div>
            <div className="topbar-right">
              <a
                href={BUSINESS.social.facebook}
                aria-label="Facebook"
                className="topbar-social"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon size={14} />
              </a>
              <a
                href={BUSINESS.social.instagram}
                aria-label="Instagram"
                className="topbar-social"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon size={14} />
              </a>
              <a
                href={BUSINESS.social.twitter}
                aria-label="Twitter"
                className="topbar-social"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon size={14} />
              </a>
              <a
                href={BUSINESS.social.linkedin}
                aria-label="LinkedIn"
                className="topbar-social"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedinIcon size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Site Header ── */}
      <header className={`site-header${scrolled ? ' scrolled' : ''}`} role="banner">
        <div className="container">
          <div className="header-inner">
            {/* Logo */}
            <a
              href="#home"
              className="logo"
              onClick={(e) => handleNavClick(e, '#home')}
              aria-label="Blueline Auto Services Ltd — Home"
            >
              <div className="logo-icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect width="32" height="32" rx="8" fill="#1d6feb" />
                  <path d="M6 21l4-8h12l4 8H6z" fill="white" opacity=".9" />
                  <circle cx="11" cy="22" r="2.5" fill="white" />
                  <circle cx="21" cy="22" r="2.5" fill="white" />
                  <path d="M4 16h24" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity=".4" />
                </svg>
              </div>
              <div className="logo-text">
                <span className="logo-name">BLUELINE</span>
                <span className="logo-sub">AUTO SERVICES LTD</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="desktop-nav" aria-label="Main navigation">
              <ul className="nav-list" role="list">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="nav-link"
                      onClick={(e) => handleNavClick(e, item.href)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Actions */}
            <div className="header-actions">
              <a
                href="#quote"
                className="btn btn--primary btn--sm"
                onClick={(e) => handleNavClick(e, '#quote')}
              >
                Get a Quote
              </a>
              <button
                className="burger"
                aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                onClick={() => setMobileOpen((v) => !v)}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Navigation Drawer ── */}
      <div
        id="mobile-nav"
        className={`mobile-nav${mobileOpen ? ' open' : ''}`}
        aria-hidden={!mobileOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <nav>
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="mobile-nav-link"
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#quote"
                className="btn btn--primary mobile-nav-cta"
                onClick={(e) => handleNavClick(e, '#quote')}
              >
                Get a Quote
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {mobileOpen && (
        <div className="mobile-nav-backdrop" aria-hidden="true" onClick={closeMobile} />
      )}

      <style>{`
        /* ── Top bar ── */
        .header-topbar {
          background: var(--navy);
          height: var(--header-top);
          display: flex;
          align-items: center;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          font-size: 0.75rem;
          color: var(--grey-400);
        }
        .topbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--sp-md);
          height: 100%;
        }
        .topbar-left {
          display: flex;
          align-items: center;
          gap: var(--sp-md);
          overflow: hidden;
        }
        .topbar-item {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          color: var(--grey-400);
          transition: color var(--transition-fast);
          white-space: nowrap;
        }
        .topbar-item:hover { color: var(--white); }
        .topbar-item--location,
        .topbar-item--hours { display: none; }
        @media (min-width: 900px) {
          .topbar-item--location { display: flex; }
        }
        @media (min-width: 1100px) {
          .topbar-item--hours { display: flex; }
        }
        .topbar-right {
          display: flex;
          align-items: center;
          gap: var(--sp-sm);
          flex-shrink: 0;
        }
        .topbar-social {
          color: var(--grey-500);
          transition: color var(--transition-fast);
          display: flex;
          align-items: center;
          padding: 4px;
        }
        .topbar-social:hover { color: var(--white); }

        /* ── Main header ── */
        .site-header {
          position: fixed;
          top: var(--header-top);
          left: 0;
          right: 0;
          height: var(--header-main);
          background: rgba(255,255,255,.97);
          border-bottom: 1px solid var(--grey-200);
          backdrop-filter: blur(12px);
          z-index: 999;
          transition: box-shadow var(--transition), background var(--transition);
        }
        .site-header.scrolled {
          box-shadow: var(--shadow-md);
          background: rgba(255,255,255,.99);
        }
        .header-inner {
          display: flex;
          align-items: center;
          height: 100%;
          gap: var(--sp-xl);
        }

        /* ── Logo ── */
        .logo {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          flex-shrink: 0;
          text-decoration: none;
        }
        .logo-icon { flex-shrink: 0; }
        .logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1;
        }
        .logo-name {
          font-family: var(--font-display);
          font-size: 1.125rem;
          font-weight: 900;
          color: var(--accent);
          letter-spacing: 0.04em;
        }
        .logo-sub {
          font-size: 0.55rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--grey-600);
          text-transform: uppercase;
        }

        /* ── Desktop nav ── */
        .desktop-nav { margin-left: auto; }
        .nav-list {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .nav-link {
          display: block;
          padding: 0.5rem 0.875rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--grey-700);
          border-radius: var(--radius-sm);
          transition: color var(--transition-fast), background var(--transition-fast);
          white-space: nowrap;
        }
        .nav-link:hover {
          color: var(--accent);
          background: var(--blue-50);
        }
        @media (max-width: 1024px) {
          .desktop-nav { display: none; }
        }

        /* ── Header actions ── */
        .header-actions {
          display: flex;
          align-items: center;
          gap: var(--sp-sm);
          margin-left: auto;
        }
        @media (min-width: 1025px) {
          .header-actions { margin-left: 0; }
        }
        .burger {
          display: none;
          width: 40px;
          height: 40px;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-sm);
          color: var(--grey-700);
          transition: background var(--transition-fast), color var(--transition-fast);
        }
        .burger:hover {
          background: var(--grey-100);
          color: var(--accent);
        }
        @media (max-width: 1024px) {
          .burger { display: flex; }
        }

        /* ── Mobile nav ── */
        .mobile-nav {
          position: fixed;
          top: var(--header-total);
          left: 0;
          right: 0;
          background: var(--white);
          z-index: 998;
          padding: var(--sp-md);
          box-shadow: var(--shadow-lg);
          border-top: 1px solid var(--grey-200);
          transform: translateY(-8px);
          opacity: 0;
          pointer-events: none;
          transition: transform var(--transition), opacity var(--transition);
        }
        .mobile-nav.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: all;
        }
        .mobile-nav ul {
          display: flex;
          flex-direction: column;
          gap: var(--sp-xs);
        }
        .mobile-nav-link {
          display: block;
          padding: 0.875rem var(--sp-md);
          font-size: 1rem;
          font-weight: 600;
          color: var(--grey-800);
          border-radius: var(--radius-md);
          transition: background var(--transition-fast), color var(--transition-fast);
        }
        .mobile-nav-link:hover {
          background: var(--blue-50);
          color: var(--accent);
        }
        .mobile-nav-cta {
          width: 100%;
          justify-content: center;
          margin-top: var(--sp-sm);
        }
        .mobile-nav-backdrop {
          position: fixed;
          inset: 0;
          top: var(--header-total);
          background: rgba(0,0,0,.3);
          z-index: 997;
        }
        @media (min-width: 1025px) {
          .mobile-nav { display: none; }
          .mobile-nav-backdrop { display: none; }
        }
      `}</style>
    </>
  );
}
