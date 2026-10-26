import { useState, useEffect, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { BUSINESS } from '../data/business.js';
import { Phone, Mail, Clock, Menu, X, ArrowRight } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Our Cars', path: '/cars' },
  { label: 'Services', path: '/services' },
  { label: 'Price List', path: '/pricing' },
  { label: 'Contact Us', path: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    document.body.style.overflow = '';
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
    document.body.style.overflow = '';
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Top Contact Bar ── */}
      <div className="header-topbar" role="region" aria-label="Contact Information Bar">
        <div className="container topbar-container">
          <div className="topbar-inner">
            {/* Status / Badge (Desktop Left) */}
            <div className="topbar-meta topbar-meta--left">
              <span className="topbar-badge">
                <span className="badge-pulse-dot" aria-hidden="true" />
                <span>24/7 Breakdown Recovery</span>
              </span>
            </div>

            {/* Clickable Phone and Email */}
            <div className="topbar-contacts">
              <a
                href={`tel:${BUSINESS.phone}`}
                className="topbar-link topbar-link--phone"
                aria-label={`Call us at ${BUSINESS.phoneDisplay}`}
              >
                <Phone size={13} className="topbar-icon" aria-hidden="true" />
                <span className="topbar-text">{BUSINESS.phoneDisplay}</span>
              </a>

              <span className="topbar-divider" aria-hidden="true">•</span>

              <a
                href={`mailto:${BUSINESS.email}`}
                className="topbar-link topbar-link--email"
                aria-label={`Email us at ${BUSINESS.email}`}
              >
                <Mail size={13} className="topbar-icon" aria-hidden="true" />
                <span className="topbar-text">{BUSINESS.email}</span>
              </a>
            </div>

            {/* Hours (Desktop Right) */}
            <div className="topbar-meta topbar-meta--right">
              <span className="topbar-hours">
                <Clock size={12} aria-hidden="true" />
                <span>Mon–Fri 08:30–18:00</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Site Navigation Header ── */}
      <header
        className={`site-header${scrolled ? ' scrolled' : ''}`}
        role="banner"
      >
        <div className="container header-container">
          <div className="header-inner">
            {/* ── Brand Identity: Logo + Name + Slogan ── */}
            <Link
              to="/"
              className="brand-identity"
              onClick={closeMobile}
              aria-label="Blueline Auto Services Ltd — Return to Home"
            >
              <img
                src="/logo.png"
                alt="Blueline Auto Services Ltd Official Logo"
                className="brand-logo-img"
              />
              <div className="brand-text">
                <span className="brand-name">Blueline Auto Services Ltd</span>
                <span className="brand-slogan">Driving Excellence, Delivering Reliability.</span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="desktop-nav" aria-label="Main Navigation">
              <ul className="nav-list" role="list">
                {NAV_ITEMS.map((item) => (
                  <li key={item.path} className="nav-item">
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                      end={item.path === '/'}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Desktop Action & Mobile Menu Toggle */}
            <div className="header-actions">
              <Link
                to="/cars"
                className="btn-view-cars"
                onClick={closeMobile}
                aria-label="View our cars available for sale and hire"
              >
                <span>View Our Cars</span>
                <ArrowRight size={15} aria-hidden="true" className="btn-arrow" />
              </Link>

              <button
                type="button"
                className={`burger-btn${mobileOpen ? ' is-active' : ''}`}
                aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                onClick={() => setMobileOpen((prev) => !prev)}
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
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
        aria-label="Mobile Navigation Menu"
      >
        <div className="mobile-nav-inner">
          {/* Mobile Header Brand Display */}
          <div className="mobile-brand-bar">
            <Link to="/" onClick={closeMobile} aria-label="Return to Home">
              <img src="/logo.png" alt="Blueline Auto Services Ltd Logo" className="mobile-logo-thumb" />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="mobile-nav-menu" aria-label="Mobile Links">
            <ul className="mobile-nav-list" role="list">
              {NAV_ITEMS.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`}
                    onClick={closeMobile}
                    end={item.path === '/'}
                  >
                    <span>{item.label}</span>
                    <ArrowRight size={16} className="mobile-link-arrow" aria-hidden="true" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Prominent "View Our Cars" Button */}
          <div className="mobile-cta-box">
            <Link
              to="/cars"
              className="btn-view-cars btn-view-cars--mobile"
              onClick={closeMobile}
            >
              <span>View Our Cars</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          {/* Mobile Direct Contact Quick Bar */}
          <div className="mobile-contact-bar">
            <a href={`tel:${BUSINESS.phone}`} className="mobile-contact-btn">
              <Phone size={14} />
              <span>{BUSINESS.phoneDisplay}</span>
            </a>
            <a href={`mailto:${BUSINESS.email}`} className="mobile-contact-btn">
              <Mail size={14} />
              <span>{BUSINESS.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Backdrop Overlay */}
      {mobileOpen && (
        <div
          className="mobile-nav-backdrop"
          aria-hidden="true"
          onClick={closeMobile}
        />
      )}

      {/* ── Component Styles ── */}
      <style>{`
        /* ══════════════════════════════════════════════════════
           1. TOP CONTACT BAR
           ══════════════════════════════════════════════════════ */
        .header-topbar {
          background: #0B1528;
          min-height: var(--header-top, 46px);
          padding: 0.3rem 0;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-family: var(--font-body, 'Inter', sans-serif);
        }

        .topbar-container {
          width: 100%;
        }

        .topbar-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 100%;
          gap: 1rem;
        }

        @media (min-width: 1025px) {
          .topbar-inner {
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            align-items: center;
          }
          .topbar-meta--right {
            justify-self: end;
          }
        }

        .topbar-contacts {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.85rem;
          margin: 0 auto;
          line-height: 1.25;
          text-align: center;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .topbar-contacts {
            gap: 0.25rem 0.75rem;
            width: 100%;
          }
        }

        @media (max-width: 500px) {
          .topbar-contacts {
            flex-direction: column;
            gap: 0.15rem;
            align-items: center;
          }
          .topbar-divider {
            display: none;
          }
        }

        .topbar-divider {
          color: rgba(255, 255, 255, 0.3);
          font-size: 0.75rem;
          user-select: none;
        }

        .topbar-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          color: #FFFFFF;
          text-decoration: none;
          font-size: 0.8125rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          transition: color 0.2s ease, opacity 0.2s ease;
          white-space: nowrap;
        }

        .topbar-link:hover {
          color: #60A5FA;
        }

        .topbar-icon {
          color: #38BDF8;
          flex-shrink: 0;
        }

        .topbar-meta {
          display: none;
          align-items: center;
          gap: 1rem;
        }

        @media (min-width: 1025px) {
          .topbar-meta {
            display: flex;
          }
        }

        .topbar-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: #93C5FD;
          background: rgba(29, 111, 235, 0.2);
          border: 1px solid rgba(59, 130, 246, 0.3);
          padding: 0.2rem 0.625rem;
          border-radius: 999px;
        }

        .badge-pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #38BDF8;
          box-shadow: 0 0 8px #38BDF8;
          animation: topbarDotPulse 2s infinite ease-in-out;
        }

        @keyframes topbarDotPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }

        .topbar-hours {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.75);
        }

        /* ══════════════════════════════════════════════════════
           2. MAIN SITE HEADER
           ══════════════════════════════════════════════════════ */
        .site-header {
          position: fixed;
          top: var(--header-top, 46px);
          left: 0;
          right: 0;
          height: var(--header-main, 84px);
          background: #FFFFFF;
          border-bottom: 1px solid #E2E8F0;
          z-index: 999;
          transition: box-shadow 0.25s ease, background 0.25s ease, height 0.25s ease;
        }

        .site-header.scrolled {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 4px 20px rgba(11, 21, 40, 0.08);
        }

        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
          gap: 1rem;
        }

        /* ── Brand Identity: Logo + Name + Slogan ── */
        .brand-identity {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          text-decoration: none;
          flex-shrink: 0;
          min-width: 0;
          transition: opacity 0.2s ease;
        }

        .brand-identity:hover {
          opacity: 0.9;
        }

        .brand-identity:hover .brand-logo-img {
          transform: scale(1.05);
          box-shadow: 0 4px 18px rgba(29, 111, 235, 0.4);
        }

        .brand-logo-img {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
          border: 2px solid #1D6FEB;
          box-shadow: 0 2px 12px rgba(11, 21, 40, 0.18);
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
          min-width: 0;
        }

        .brand-name {
          font-family: 'Montserrat', 'Outfit', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #0B1E40;
          line-height: 1.2;
          letter-spacing: -0.01em;
          white-space: nowrap;
          display: block;
        }

        .brand-slogan {
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          color: #4A6FA5;
          letter-spacing: 0.06em;
          white-space: nowrap;
          display: block;
          font-style: italic;
        }

        @media (max-width: 1024px) {
          .brand-name {
            font-size: 1rem;
          }
          .brand-slogan {
            font-size: 0.65rem;
          }
        }

        @media (max-width: 640px) {
          .brand-logo-img {
            width: 46px;
            height: 46px;
          }
          .brand-name {
            font-size: 0.875rem;
            letter-spacing: -0.005em;
          }
          .brand-slogan {
            font-size: 0.6rem;
            letter-spacing: 0.04em;
          }
        }

        @media (max-width: 420px) {
          .brand-identity {
            gap: 0.6rem;
          }
          .brand-logo-img {
            width: 40px;
            height: 40px;
          }
          .brand-name {
            font-size: 0.8rem;
          }
          .brand-slogan {
            display: none;
          }
        }

        /* ══════════════════════════════════════════════════════
           3. DESKTOP NAVIGATION
           ══════════════════════════════════════════════════════ */
        .desktop-nav {
          margin-left: auto;
          display: none;
        }

        @media (min-width: 1025px) {
          .desktop-nav {
            display: block;
          }
        }

        .nav-list {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-item {
          display: flex;
          align-items: center;
        }

        .nav-link {
          display: block;
          padding: 0.625rem 1rem;
          font-size: 0.9375rem;
          font-weight: 600;
          color: #0F172A;
          text-decoration: none;
          border-radius: 6px;
          transition: color 0.2s ease, background-color 0.2s ease;
          white-space: nowrap;
          position: relative;
        }

        .nav-link:hover {
          color: #1D6FEB;
          background: #EFF6FF;
        }

        .nav-link.active {
          color: #1D6FEB;
          background: #EFF6FF;
          font-weight: 700;
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0.15rem;
          left: 1rem;
          right: 1rem;
          height: 2px;
          background: #1D6FEB;
          border-radius: 2px;
        }

        /* ══════════════════════════════════════════════════════
           4. "VIEW OUR CARS" ACTION BUTTON
           ══════════════════════════════════════════════════════ */
        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }

        .btn-view-cars {
          display: none;
          align-items: center;
          gap: 0.5rem;
          background: #1D6FEB;
          color: #FFFFFF !important;
          font-size: 0.9375rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          text-decoration: none;
          padding: 0.65rem 1.25rem;
          border-radius: 8px;
          box-shadow: 0 4px 14px rgba(29, 111, 235, 0.32);
          transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
          white-space: nowrap;
          min-height: 42px;
        }

        @media (min-width: 768px) {
          .btn-view-cars {
            display: inline-flex;
          }
        }

        .btn-view-cars:hover {
          background: #1557BF;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(29, 111, 235, 0.42);
        }

        .btn-arrow {
          transition: transform 0.2s ease;
        }

        .btn-view-cars:hover .btn-arrow {
          transform: translateX(3px);
        }

        /* ══════════════════════════════════════════════════════
           5. MOBILE & TABLET HAMBURGER BUTTON
           ══════════════════════════════════════════════════════ */
        .burger-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          min-width: 44px;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          color: #0B1528;
          cursor: pointer;
          transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }

        @media (min-width: 1025px) {
          .burger-btn {
            display: none;
          }
        }

        .burger-btn:hover,
        .burger-btn.is-active {
          background: #EFF6FF;
          color: #1D6FEB;
          border-color: #BFDBFE;
        }

        /* ══════════════════════════════════════════════════════
           6. MOBILE NAVIGATION DRAWER
           ══════════════════════════════════════════════════════ */
        .mobile-nav {
          position: fixed;
          top: var(--header-total, 128px);
          left: 0;
          right: 0;
          background: #FFFFFF;
          z-index: 998;
          border-bottom: 2px solid #1D6FEB;
          box-shadow: 0 12px 32px rgba(11, 21, 40, 0.16);
          transform: translateY(-10px);
          opacity: 0;
          pointer-events: none;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
          max-height: calc(100vh - var(--header-total, 128px));
          overflow-y: auto;
        }

        .mobile-nav.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: all;
        }

        .mobile-nav-inner {
          padding: 1.25rem 1.25rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .mobile-brand-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding-bottom: 0.875rem;
          border-bottom: 1px solid #F1F5F9;
        }

        .mobile-brand-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
        }

        .mobile-logo-thumb {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid #1D6FEB;
          object-fit: cover;
          flex-shrink: 0;
        }

        .mobile-brand-text {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
          min-width: 0;
        }

        .mobile-brand-name {
          font-family: 'Montserrat', 'Outfit', sans-serif;
          font-size: 0.9375rem;
          font-weight: 700;
          color: #0B1E40;
          line-height: 1.2;
          letter-spacing: -0.01em;
          display: block;
        }

        .mobile-brand-slogan {
          font-family: 'Inter', sans-serif;
          font-size: 0.625rem;
          font-weight: 500;
          color: #4A6FA5;
          letter-spacing: 0.05em;
          font-style: italic;
          display: block;
        }

        .mobile-nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.875rem 1rem;
          font-size: 1rem;
          font-weight: 600;
          color: #0F172A;
          text-decoration: none;
          border-radius: 8px;
          transition: background-color 0.2s ease, color 0.2s ease;
        }

        .mobile-nav-link:hover,
        .mobile-nav-link:active {
          background: #EFF6FF;
          color: #1D6FEB;
        }

        .mobile-nav-link.active {
          background: #EFF6FF;
          color: #1D6FEB;
          font-weight: 700;
          border-left: 3px solid #1D6FEB;
          padding-left: calc(1rem - 3px);
        }

        .mobile-nav-link.active .mobile-link-arrow {
          color: #1D6FEB;
        }

        .mobile-link-arrow {
          color: #94A3B8;
          transition: transform 0.2s ease, color 0.2s ease;
        }

        .mobile-nav-link:hover .mobile-link-arrow {
          transform: translateX(3px);
          color: #1D6FEB;
        }

        .mobile-cta-box {
          margin-top: 0.5rem;
        }

        .btn-view-cars--mobile {
          display: flex !important;
          width: 100%;
          justify-content: center;
          padding: 0.875rem 1rem;
          font-size: 1rem;
        }

        .mobile-contact-bar {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.5rem;
          margin-top: 0.5rem;
          padding-top: 0.875rem;
          border-top: 1px solid #F1F5F9;
        }

        .mobile-contact-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: #F8FAFC;
          color: #0F172A;
          border: 1px solid #E2E8F0;
          padding: 0.625rem 0.75rem;
          border-radius: 6px;
          text-decoration: none;
          font-size: 0.8125rem;
          font-weight: 600;
          transition: background-color 0.2s ease, color 0.2s ease;
        }

        .mobile-contact-btn:hover {
          background: #EFF6FF;
          color: #1D6FEB;
          border-color: #BFDBFE;
        }

        .mobile-nav-backdrop {
          position: fixed;
          inset: 0;
          top: var(--header-total, 128px);
          background: rgba(11, 21, 40, 0.45);
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
          z-index: 997;
        }

        @media (min-width: 1025px) {
          .mobile-nav,
          .mobile-nav-backdrop {
            display: none !important;
          }
        }

        @media (max-width: 360px) {
          .topbar-link {
            font-size: 0.72rem;
          }
        }
      `}</style>
    </>
  );
}
