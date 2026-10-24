import { useEffect } from 'react';
import { X, Shield, FileText, Cookie } from 'lucide-react';
import { BUSINESS } from '../data/business.js';

export default function LegalModal({ isOpen, onClose, activeTab = 'privacy', setActiveTab }) {
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="legal-modal-title" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal legal-modal">
        <div className="legal-modal-header">
          <div className="legal-modal-title-wrap">
            <h2 id="legal-modal-title" className="legal-modal-title">
              Legal & <span className="highlight">Compliance</span>
            </h2>
            <p className="legal-modal-subtitle">
              {BUSINESS.name} • Company No: {BUSINESS.companyNumber}
            </p>
          </div>
          <button className="legal-modal-close" onClick={onClose} aria-label="Close legal modal">
            <X size={20} />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="legal-modal-tabs" role="tablist">
          <button
            type="button"
            className={`legal-tab-btn ${activeTab === 'privacy' ? 'active' : ''}`}
            onClick={() => setActiveTab('privacy')}
            role="tab"
            aria-selected={activeTab === 'privacy'}
          >
            <Shield size={16} />
            <span>Privacy Policy</span>
          </button>
          <button
            type="button"
            className={`legal-tab-btn ${activeTab === 'cookie' ? 'active' : ''}`}
            onClick={() => setActiveTab('cookie')}
            role="tab"
            aria-selected={activeTab === 'cookie'}
          >
            <Cookie size={16} />
            <span>Cookie Policy</span>
          </button>
          <button
            type="button"
            className={`legal-tab-btn ${activeTab === 'terms' ? 'active' : ''}`}
            onClick={() => setActiveTab('terms')}
            role="tab"
            aria-selected={activeTab === 'terms'}
          >
            <FileText size={16} />
            <span>Terms & Conditions</span>
          </button>
        </div>

        {/* Tab content */}
        <div className="legal-modal-content">
          {activeTab === 'privacy' && (
            <div className="legal-text-block">
              <h3>1. Introduction & Overview</h3>
              <p>
                {BUSINESS.name} ("we", "us", "our") is registered in England and Wales under Company Registration Number {BUSINESS.companyNumber}. Our registered business address is {BUSINESS.fullAddress}. We are committed to safeguarding the privacy and personal data of our customers in accordance with the UK General Data Protection Regulation (UK GDPR) and Data Protection Act 2018.
              </p>
              <h3>2. Data We Collect</h3>
              <p>
                When you enquire about vehicle sales, vehicle hire, servicing, breakdown recovery, or submit a review, we collect relevant contact information including your full name, email address, phone number, vehicle registration, and service requirements.
              </p>
              <h3>3. How We Use Your Information</h3>
              <p>
                We use your information exclusively to provide requested automotive quotes, fulfill hire contracts, coordinate emergency roadside recovery, maintain service records, and communicate directly regarding your vehicle. We never sell your personal data to third parties.
              </p>
              <h3>4. Data Security & Storage</h3>
              <p>
                All personal information is held securely with appropriate technical safeguards. If you submit a customer review, it is stored in our protected database for moderation before public display.
              </p>
              <h3>5. Your Rights</h3>
              <p>
                Under UK data protection law, you have the right to request access to, correction of, or deletion of your personal records. For enquiries, contact our data compliance team at <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> or call {BUSINESS.phoneDisplay}.
              </p>
            </div>
          )}

          {activeTab === 'cookie' && (
            <div className="legal-text-block">
              <h3>1. Cookie Policy Overview</h3>
              <p>
                This website uses essential and functional cookies to ensure reliable operation, remember form states during your session, and provide smooth navigation.
              </p>
              <h3>2. Types of Cookies We Use</h3>
              <ul>
                <li><strong>Strictly Necessary:</strong> Essential for core website functionality, security, and session management.</li>
                <li><strong>Functionality:</strong> Preserves user preferences such as vehicle categories or form drafts.</li>
                <li><strong>Performance:</strong> Anonymous visitor metrics to optimize website speed and mobile experience.</li>
              </ul>
              <h3>3. Managing Cookies</h3>
              <p>
                You can configure or block cookies at any time via your browser settings. Note that disabling certain essential cookies may affect form submission and interactive tools.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="legal-text-block">
              <h3>1. Terms of Service</h3>
              <p>
                By accessing this website or booking services with {BUSINESS.name}, you agree to comply with our standard terms of trade, vehicle rental conditions, and workshop guidelines.
              </p>
              <h3>2. Vehicle Hire Requirements</h3>
              <p>
                All vehicle hires require a valid UK driving licence (or recognized international permit), proof of address, and completion of our standard hire agreement. Comprehensive insurance and breakdown cover are provided subject to policy terms.
              </p>
              <h3>3. Servicing & Quotations</h3>
              <p>
                All repair and servicing quotations are provided in British pounds (£). We will seek customer approval before undertaking any additional mechanical work beyond the agreed scope.
              </p>
              <h3>4. 24/7 Breakdown Recovery</h3>
              <p>
                Roadside recovery is provided subject to vehicle location, safety conditions, and operational availability. Response times may vary depending on traffic and weather conditions.
              </p>
            </div>
          )}
        </div>

        <div className="legal-modal-footer">
          <button className="btn btn--primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>

      <style>{`
        .legal-modal {
          max-width: 720px;
          max-height: 85vh;
          display: flex;
          flex-direction: column;
          padding: 0;
          overflow: hidden;
          background: #ffffff;
        }
        .legal-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 1.5rem 1.75rem 1.25rem;
          border-bottom: 1px solid var(--grey-200);
        }
        .legal-modal-title {
          font-size: 1.5rem;
          margin: 0;
          color: var(--navy);
        }
        .legal-modal-subtitle {
          font-size: 0.85rem;
          color: var(--grey-600);
          margin-top: 0.25rem;
        }
        .legal-modal-close {
          background: var(--grey-100);
          border: none;
          color: var(--grey-600);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
        }
        .legal-modal-close:hover {
          background: var(--grey-200);
          color: var(--navy);
        }
        .legal-modal-tabs {
          display: flex;
          background: var(--grey-100);
          border-bottom: 1px solid var(--grey-200);
          padding: 0 1rem;
          gap: 0.5rem;
          overflow-x: auto;
        }
        .legal-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.85rem 1rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--grey-600);
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          white-space: nowrap;
        }
        .legal-tab-btn.active {
          color: var(--blue-600);
          border-bottom-color: var(--blue-600);
          background: #ffffff;
        }
        .legal-modal-content {
          padding: 1.75rem;
          overflow-y: auto;
          flex: 1;
          color: var(--grey-700);
          font-size: 0.925rem;
          line-height: 1.65;
        }
        .legal-text-block h3 {
          font-size: 1.05rem;
          color: var(--navy);
          margin: 1.25rem 0 0.5rem;
        }
        .legal-text-block h3:first-child {
          margin-top: 0;
        }
        .legal-text-block p {
          margin: 0 0 0.75rem;
        }
        .legal-text-block ul {
          margin: 0 0 1rem 1.25rem;
          padding: 0;
        }
        .legal-text-block li {
          margin-bottom: 0.35rem;
        }
        .legal-modal-footer {
          padding: 1rem 1.75rem;
          border-top: 1px solid var(--grey-200);
          display: flex;
          justify-content: flex-end;
          background: var(--grey-50);
        }
      `}</style>
    </div>
  );
}
