import { Link } from 'react-router-dom';
import { ChevronRight, Phone, MessageSquare } from 'lucide-react';
import { BUSINESS } from '../data/business.js';

export default function PageHeader({
  badge = 'BLUELINE AUTO SERVICES',
  title = 'Page Title',
  highlight = '',
  subtitle = 'Professional automotive services in Doncaster and across the UK.',
  breadcrumbs = [],
  showActions = true,
}) {
  return (
    <div className="page-header" role="region" aria-label={title}>
      <div className="page-header-glow" aria-hidden="true" />
      <div className="container page-header-container">
        {/* Breadcrumb Navigation */}
        <nav className="page-header-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          {breadcrumbs.map((crumb, idx) => (
            <span key={crumb.label || idx} className="breadcrumb-item">
              <ChevronRight size={13} className="breadcrumb-separator" aria-hidden="true" />
              {crumb.path ? (
                <Link to={crumb.path} className="breadcrumb-link">{crumb.label}</Link>
              ) : (
                <span className="breadcrumb-current" aria-current="page">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        {/* Badge */}
        {badge && (
          <div className="page-header-badge">
            <span className="page-header-badge-dot" aria-hidden="true" />
            <span>{badge}</span>
          </div>
        )}

        {/* Title */}
        <h1 className="page-header-title">
          {title} {highlight && <span className="highlight">{highlight}</span>}
        </h1>

        {/* Subtitle */}
        {subtitle && <p className="page-header-subtitle">{subtitle}</p>}

        {/* Quick action buttons */}
        {showActions && (
          <div className="page-header-actions">
            <a
              href={`tel:${BUSINESS.phone}`}
              className="btn btn--primary btn--sm"
              aria-label={`Call us on ${BUSINESS.phoneDisplay}`}
            >
              <Phone size={14} />
              <span>Call {BUSINESS.phoneDisplay}</span>
            </a>
            <Link to="/contact" className="btn btn--outline-light btn--sm">
              <MessageSquare size={14} />
              <span>Send Enquiry</span>
            </Link>
          </div>
        )}
      </div>

      <style>{`
        .page-header {
          position: relative;
          background: linear-gradient(135deg, #091224 0%, #0d1b3e 60%, #102454 100%);
          padding-top: calc(var(--header-total, 130px) + 2rem);
          padding-bottom: 3.5rem;
          color: #ffffff;
          overflow: hidden;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .page-header-glow {
          position: absolute;
          top: -20%;
          right: 5%;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(29, 111, 235, 0.22) 0%, rgba(29, 111, 235, 0) 70%);
          filter: blur(40px);
          pointer-events: none;
        }

        .page-header-container {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .page-header-breadcrumbs {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.65);
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
        }

        .breadcrumb-link {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .breadcrumb-link:hover {
          color: #60a5fa;
          text-decoration: underline;
        }

        .breadcrumb-separator {
          color: rgba(255, 255, 255, 0.35);
          display: inline-block;
          vertical-align: middle;
        }

        .breadcrumb-current {
          color: #93c5fd;
          font-weight: 600;
        }

        .page-header-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: rgba(29, 111, 235, 0.22);
          border: 1px solid rgba(59, 130, 246, 0.4);
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #93c5fd;
          margin-bottom: 0.85rem;
        }

        .page-header-badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #38bdf8;
          box-shadow: 0 0 8px #38bdf8;
        }

        .page-header-title {
          font-family: var(--font-display, 'Outfit', sans-serif);
          font-size: clamp(2rem, 4vw, 2.85rem);
          font-weight: 800;
          line-height: 1.15;
          color: #ffffff;
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
        }

        .page-header-title .highlight {
          color: #60a5fa;
        }

        .page-header-subtitle {
          font-size: clamp(1rem, 1.8vw, 1.15rem);
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.8);
          max-width: 680px;
          margin-bottom: 1.5rem;
        }

        .page-header-actions {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          flex-wrap: wrap;
        }

        .btn--outline-light {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #ffffff;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md, 0.625rem);
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          transition: background 0.2s, border-color 0.2s;
        }

        .btn--outline-light:hover {
          background: rgba(255, 255, 255, 0.16);
          border-color: rgba(255, 255, 255, 0.5);
          color: #ffffff;
        }

        @media (max-width: 768px) {
          .page-header {
            padding-top: calc(var(--header-total, 124px) + 1.25rem);
            padding-bottom: 2.5rem;
          }
          .page-header-subtitle {
            margin-bottom: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
}
