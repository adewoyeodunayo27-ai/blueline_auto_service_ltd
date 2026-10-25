import { BUSINESS } from '../data/business.js';
import { Phone, Mail, MapPin, Clock, AlertCircle, Navigation, ExternalLink, Copy, Check } from 'lucide-react';
import { WhatsAppIcon } from './SocialIcons.jsx';
import { useState } from 'react';

function ContactForm() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [reviewMessage, setReviewMessage] = useState('');
  const [waUrl, setWaUrl] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle');

  const validate = (v) => {
    const errs = {};
    if (!v.name.trim()) {
      errs.name = 'Please enter your full name.';
    }
    if (!v.email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!v.phone.trim()) {
      errs.phone = 'Please enter your phone number.';
    } else if (!/^[0-9+\s\-()]{7,20}$/.test(v.phone.trim())) {
      errs.phone = 'Please enter a valid phone number.';
    }
    if (!v.message.trim()) {
      errs.message = 'Please enter your enquiry details.';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(v => ({ ...v, [name]: value }));
    if (touched[name]) {
      const errs = validate({ ...values, [name]: value });
      setErrors(p => ({ ...p, [name]: errs[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(t => ({ ...t, [name]: true }));
    const errs = validate(values);
    setErrors(p => ({ ...p, [name]: errs[name] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, phone: true, message: true };
    setTouched(allTouched);
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // Format readable WhatsApp message matching specification exactly
    const lines = [
      'New Website Enquiry \u2013 Blueline Auto Services Ltd',
      `Full Name: ${values.name.trim()}`,
      `Email Address: ${values.email.trim()}`,
      `Phone Number: ${values.phone.trim()}`,
      `Enquiry Details: ${values.message.trim()}`,
      'Please assist me with this enquiry.'
    ].join('\n');

    const encoded = encodeURIComponent(lines);
    const url = `https://wa.me/447757772952?text=${encoded}`;

    setReviewMessage(lines);
    setWaUrl(url);
    setStatus('success');

    // Immediately open WhatsApp conversation
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (status === 'success') {
    return (
      <div className="contact-form-success">
        <div className="cs-icon cs-icon--wa" aria-hidden="true">
          <WhatsAppIcon size={30} />
        </div>
        <h3 className="success-heading">Message Ready for WhatsApp</h3>
        <p className="success-desc">
          Your enquiry has been prepared and opened in WhatsApp. You can review the exact message below and click again if WhatsApp didn’t open automatically.
        </p>

        <div className="review-box">
          <div className="review-box-header">
            <span>Reviewed Message</span>
            <span className="review-box-badge">WhatsApp Format</span>
          </div>
          <pre className="review-box-content">{reviewMessage}</pre>
        </div>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--wa"
        >
          <WhatsAppIcon size={18} /> Open in WhatsApp
        </a>

        <button
          type="button"
          className="btn btn--outline-blue btn--sm"
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={() => {
            setStatus('idle');
            setValues({ name: '', email: '', phone: '', message: '' });
            setTouched({});
          }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
      <div className="form-group">
        <label htmlFor="c-name">Full Name *</label>
        <input
          id="c-name"
          name="name"
          type="text"
          placeholder="e.g. John Smith"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.name && touched.name ? 'error' : ''}
          aria-describedby={errors.name && touched.name ? 'err-name' : undefined}
          aria-invalid={!!(errors.name && touched.name)}
          required
        />
        {errors.name && touched.name && (
          <p id="err-name" className="error-msg" role="alert"><AlertCircle size={12}/> {errors.name}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="c-email">Email Address *</label>
        <input
          id="c-email"
          name="email"
          type="email"
          placeholder="e.g. john@example.co.uk"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.email && touched.email ? 'error' : ''}
          aria-describedby={errors.email && touched.email ? 'err-email' : undefined}
          aria-invalid={!!(errors.email && touched.email)}
          required
        />
        {errors.email && touched.email && (
          <p id="err-email" className="error-msg" role="alert"><AlertCircle size={12}/> {errors.email}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="c-phone">Phone Number *</label>
        <input
          id="c-phone"
          name="phone"
          type="tel"
          placeholder="e.g. +44 7757 772952"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.phone && touched.phone ? 'error' : ''}
          aria-describedby={errors.phone && touched.phone ? 'err-phone' : undefined}
          aria-invalid={!!(errors.phone && touched.phone)}
          required
        />
        {errors.phone && touched.phone && (
          <p id="err-phone" className="error-msg" role="alert"><AlertCircle size={12}/> {errors.phone}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="c-message">Enquiry Details *</label>
        <textarea
          id="c-message"
          name="message"
          rows={4}
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.message && touched.message ? 'error' : ''}
          aria-describedby={errors.message && touched.message ? 'err-message' : undefined}
          aria-invalid={!!(errors.message && touched.message)}
          placeholder="Describe what you need assistance with..."
          required
        />
        {errors.message && touched.message && (
          <p id="err-message" className="error-msg" role="alert"><AlertCircle size={12}/> {errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="btn btn--wa"
        style={{ width: '100%', justifyContent: 'center' }}
      >
        <WhatsAppIcon size={18} /> Submit Enquiry via WhatsApp
      </button>

      <p className="form-note">
        Submitting opens WhatsApp directly with your message pre-filled for quick reply from our team.
      </p>
    </form>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    const textToCopy = `Blueline Auto Services Ltd\n65 Watch House Lane\nDoncaster, UK\nPostcode: DN5 9LY`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }).catch(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="contact" className="section contact-section" aria-labelledby="contact-title">
      <div className="container">
        <header className="section__header reveal">
          <span className="section__eyebrow">Get in Touch</span>
          <h2 id="contact-title" className="section__title">
            Contact <span className="highlight">Us</span>
          </h2>
          <div className="divider" />
          <p className="section__subtitle" style={{ marginTop: 'var(--sp-md)' }}>
            We're here to help. Reach out by phone, email, or use the form below.
          </p>
        </header>

        <div className="contact-grid">
          {/* Info panel */}
          <div className="contact-info reveal">
            <div className="contact-info-card">
              <h3 className="contact-info-heading">Contact Information</h3>

              <div className="contact-detail">
                <div className="contact-detail-icon"><Phone size={18} /></div>
                <div>
                  <p className="contact-detail-label">Phone</p>
                  <a href={`tel:${BUSINESS.phone}`} className="contact-detail-value">{BUSINESS.phoneDisplay}</a>
                </div>
              </div>

              <div className="contact-detail">
                <div className="contact-detail-icon"><Mail size={18} /></div>
                <div>
                  <p className="contact-detail-label">Email</p>
                  <a href={`mailto:${BUSINESS.email}`} className="contact-detail-value">{BUSINESS.email}</a>
                </div>
              </div>

              <div className="contact-detail">
                <div className="contact-detail-icon"><MapPin size={18} /></div>
                <div>
                  <p className="contact-detail-label">Address</p>
                  <address className="contact-detail-value" style={{ fontStyle: 'normal' }}>
                    <strong>Blueline Auto Services Ltd</strong><br />
                    65 Watch House Lane<br />
                    Doncaster, UK<br />
                    Postcode: DN5 9LY
                  </address>
                  <a href={BUSINESS.googleMapsUrl} className="contact-directions-link" target="_blank" rel="noopener noreferrer">
                    Get directions →
                  </a>
                </div>
              </div>

              <div className="contact-hours">
                <div className="contact-detail-icon" style={{ marginBottom: '0.5rem' }}><Clock size={18} /></div>
                <div style={{ flex: 1 }}>
                  <p className="contact-detail-label">Opening Hours</p>
                  {BUSINESS.hours.map(h => (
                    <div key={h.day} className="hours-row">
                      <span className="hours-day">{h.day}</span>
                      <span className="hours-time">
                        {h.open === 'Closed' ? 'Closed' : `${h.open} – ${h.close}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-right reveal">
            <div className="contact-form-card">
              <h3 className="contact-form-heading">Send a Message</h3>
              <ContactForm />
            </div>
          </div>
        </div>

        {/* ========================================================
            FIND US — INTERACTIVE GOOGLE MAP & LOCATION SHOWCASE
            ======================================================== */}
        <div id="location" className="contact-location-wrap reveal">
          <div className="location-card">
            {/* Left / Beside the Map: Full Company Address & Actions */}
            <div className="location-info-panel">
              <div className="location-badge">
                <span className="location-badge-dot" aria-hidden="true" />
                <span>Workshop & Recovery Depot</span>
              </div>

              <h3 className="location-title">
                Find Us — Blueline Auto Services Ltd
              </h3>

              <p className="location-subtitle">
                Visit our premises in Doncaster for vehicle sales, hire pick-ups, diagnostics, servicing, and repairs.
              </p>

              <div className="location-address-box">
                <div className="location-address-header">
                  <div className="location-pin-avatar" aria-hidden="true">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="location-company-name">Blueline Auto Services Ltd</span>
                    <span className="location-address-tag">Company Address</span>
                  </div>
                </div>

                <address className="location-address-text">
                  <span className="address-line address-line--street">65 Watch House Lane</span>
                  <span className="address-line address-line--city">Doncaster, UK</span>
                  <span className="address-line address-line--postcode">
                    Postcode: <strong>DN5 9LY</strong>
                  </span>
                </address>

                <div className="location-address-actions">
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className={`btn-copy-address${copied ? ' copied' : ''}`}
                    aria-label="Copy full address to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="copied-check" aria-hidden="true" />
                        <span>Address Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} aria-hidden="true" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`tel:${BUSINESS.phone}`}
                    className="btn-call-workshop"
                    aria-label={`Call Blueline Auto Services on ${BUSINESS.phoneDisplay}`}
                  >
                    <Phone size={13} aria-hidden="true" />
                    <span>Call Us</span>
                  </a>
                </div>
              </div>

              {/* Useful arrival notes */}
              <div className="location-amenities">
                <div className="amenity-item">
                  <span className="amenity-icon" aria-hidden="true">🚗</span>
                  <span className="amenity-text">Easy road access via Watch House Lane & Doncaster arterial routes</span>
                </div>
                <div className="amenity-item">
                  <span className="amenity-icon" aria-hidden="true">🅿️</span>
                  <span className="amenity-text">Customer parking & vehicle drop-off area available</span>
                </div>
              </div>

              {/* Prominent Get Directions CTA button */}
              <div className="location-cta-box">
                <a
                  href={BUSINESS.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary btn--get-directions"
                  id="get-directions-btn"
                  aria-label="Get Directions to Blueline Auto Services Ltd on Google Maps (opens in a new tab)"
                >
                  <Navigation size={18} className="btn-nav-icon" aria-hidden="true" />
                  <span>Get Directions</span>
                  <ExternalLink size={15} className="btn-external-icon" aria-hidden="true" />
                </a>
                <p className="location-cta-hint">
                  Opens Google Maps navigation directly to 65 Watch House Lane, Doncaster, DN5 9LY, UK
                </p>
              </div>
            </div>

            {/* Right / Map Embed Panel */}
            <div className="location-map-panel">
              <div className="map-panel-bar">
                <div className="map-status">
                  <span className="map-status-dot" aria-hidden="true" />
                  <span className="map-status-text">Interactive Google Map</span>
                </div>
                <a
                  href={BUSINESS.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-fullscreen-link"
                  aria-label="Open location in Google Maps (opens in new tab)"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
              </div>

              <div className="map-frame-wrapper">
                <iframe
                  src="https://maps.google.com/maps?q=65+Watch+House+Lane%2C+Doncaster%2C+DN5+9LY%2C+UK&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  title="Find Us — Blueline Auto Services Ltd Google Map"
                  className="map-iframe"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  aria-label="Google Map showing Blueline Auto Services Ltd at 65 Watch House Lane, Doncaster, DN5 9LY, UK"
                />
              </div>

              <div className="map-panel-caption">
                <div className="map-caption-address">
                  <MapPin size={15} className="map-caption-pin" aria-hidden="true" />
                  <span><strong>65 Watch House Lane</strong>, Doncaster, UK • Postcode: DN5 9LY</span>
                </div>
                <a
                  href={BUSINESS.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-caption-cta"
                  aria-label="View route on Google Maps"
                >
                  View Route →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-section { background: var(--grey-100); }

        .contact-grid {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: var(--sp-xl);
          align-items: start;
        }

        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr; }
        }

        /* Info card */
        .contact-info-card {
          background: var(--navy);
          border-radius: var(--radius-xl);
          padding: var(--sp-xl);
          color: white;
          height: 100%;
        }

        .contact-info-heading {
          font-family: var(--font-display);
          font-size: 1.125rem;
          font-weight: 700;
          margin-bottom: var(--sp-xl);
          padding-bottom: var(--sp-md);
          border-bottom: 1px solid rgba(255,255,255,.12);
        }

        .contact-detail {
          display: flex;
          align-items: flex-start;
          gap: var(--sp-md);
          margin-bottom: var(--sp-lg);
        }

        .contact-detail-icon {
          width: 40px;
          height: 40px;
          background: rgba(29,111,235,.25);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--blue-300);
          flex-shrink: 0;
        }

        .contact-detail-label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,.5);
          margin-bottom: 0.2rem;
        }

        .contact-detail-value {
          font-size: 0.9375rem;
          color: rgba(255,255,255,.88);
          font-weight: 500;
          transition: color var(--transition-fast);
        }

        .contact-detail-value:hover { color: var(--blue-300); }

        .contact-directions-link {
          font-size: 0.8125rem;
          color: var(--blue-300);
          font-weight: 600;
          margin-top: 0.3rem;
          display: inline-block;
          transition: color var(--transition-fast);
        }

        .contact-directions-link:hover { color: var(--white); }

        .contact-hours {
          display: flex;
          align-items: flex-start;
          gap: var(--sp-md);
          padding-top: var(--sp-md);
          border-top: 1px solid rgba(255,255,255,.08);
        }

        .hours-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.875rem;
          padding: 0.2rem 0;
          border-bottom: 1px solid rgba(255,255,255,.06);
        }

        .hours-day { color: rgba(255,255,255,.6); }
        .hours-time { color: rgba(255,255,255,.9); font-weight: 500; }

        /* Right side */
        .contact-right {
          display: flex;
          flex-direction: column;
          gap: var(--sp-md);
        }

        .contact-form-card {
          background: white;
          border-radius: var(--radius-xl);
          padding: var(--sp-xl);
          box-shadow: var(--shadow-md);
        }

        @media (max-width: 640px) {
          .contact-info-card {
            padding: 1.25rem 1rem;
            border-radius: var(--radius-lg);
          }
          .contact-form-card {
            padding: 1.25rem 1rem;
            border-radius: var(--radius-lg);
          }
          .contact-detail {
            gap: 0.75rem;
          }
        }

        .contact-form-heading {
          font-family: var(--font-display);
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--dark);
          margin-bottom: var(--sp-lg);
        }

        .contact-form-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: var(--sp-md);
          padding: var(--sp-md) 0;
        }

        .cs-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .cs-icon--wa {
          background: #e6f9ed;
          color: #25D366;
          box-shadow: 0 4px 14px rgba(37, 211, 102, 0.25);
        }

        .success-heading {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.25rem;
          color: var(--dark);
          margin-top: 0.25rem;
        }

        .success-desc {
          color: var(--grey-600);
          font-size: 0.875rem;
          line-height: 1.5;
          max-width: 440px;
        }

        .review-box {
          width: 100%;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: var(--radius-lg);
          overflow: hidden;
          text-align: left;
          margin: var(--sp-xs) 0;
        }

        .review-box-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.625rem 1rem;
          background: #f1f5f9;
          border-bottom: 1px solid #e2e8f0;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--grey-700);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .review-box-badge {
          background: #dcfce7;
          color: #15803d;
          font-size: 0.6875rem;
          font-weight: 700;
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-full);
        }

        .review-box-content {
          padding: 1rem;
          font-family: monospace, sans-serif;
          font-size: 0.8125rem;
          line-height: 1.6;
          color: #1e293b;
          white-space: pre-wrap;
          word-break: break-word;
          margin: 0;
          max-height: 240px;
          overflow-y: auto;
        }

        .btn--wa {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #25D366;
          color: #ffffff;
          border: 1px solid #20bd5a;
          padding: 0.875rem 1.5rem;
          border-radius: var(--radius-md);
          font-weight: 700;
          font-size: 0.9375rem;
          text-decoration: none;
          box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
          transition: transform var(--transition-fast), background var(--transition-fast), box-shadow var(--transition-fast);
          cursor: pointer;
        }

        .btn--wa:hover {
          background: #20bd5a;
          color: #ffffff;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(37, 211, 102, 0.4);
        }

        .form-note {
          font-size: 0.75rem;
          color: var(--grey-500);
          text-align: center;
          margin-top: 0.625rem;
          line-height: 1.4;
        }

        /* ========================================================
           FIND US — LOCATION & INTERACTIVE GOOGLE MAP STYLES
           ======================================================== */
        .contact-location-wrap {
          margin-top: var(--sp-2xl);
        }

        .location-card {
          background: var(--navy);
          border-radius: var(--radius-xl);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 20px 40px -15px rgba(13, 27, 62, 0.35);
          display: grid;
          grid-template-columns: 440px 1fr;
          overflow: hidden;
        }

        @media (max-width: 980px) {
          .location-card {
            grid-template-columns: 1fr;
          }
        }

        /* Left / Beside Panel */
        .location-info-panel {
          padding: var(--sp-xl);
          display: flex;
          flex-direction: column;
          gap: 1.125rem;
          color: white;
          background: linear-gradient(180deg, rgba(21, 34, 82, 0.6) 0%, rgba(13, 27, 62, 0.95) 100%);
          border-right: 1px solid rgba(255, 255, 255, 0.08);
        }

        @media (max-width: 980px) {
          .location-info-panel {
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          }
        }

        .location-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          align-self: flex-start;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          background: rgba(29, 111, 235, 0.2);
          border: 1px solid rgba(96, 165, 250, 0.35);
          color: var(--blue-300);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .location-badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--blue-400);
          box-shadow: 0 0 8px var(--blue-400);
          animation: badge-pulse 2s infinite ease-in-out;
        }

        @keyframes badge-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }

        .location-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--white);
          line-height: 1.25;
          letter-spacing: -0.01em;
          margin: 0;
        }

        .location-subtitle {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.72);
          line-height: 1.55;
          margin: 0;
        }

        .location-address-box {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-lg);
          padding: 1.125rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .location-address-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .location-pin-avatar {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-md);
          background: rgba(29, 111, 235, 0.3);
          border: 1px solid rgba(96, 165, 250, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--blue-300);
          flex-shrink: 0;
        }

        .location-company-name {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.9375rem;
          color: white;
          display: block;
        }

        .location-address-tag {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: rgba(255, 255, 255, 0.45);
          font-weight: 600;
        }

        .location-address-text {
          font-style: normal;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.9375rem;
          padding-left: 0.25rem;
          border-left: 2px solid var(--blue-500);
          margin-left: 0.25rem;
        }

        .address-line--postcode {
          color: var(--blue-300);
          font-weight: 500;
          margin-top: 0.15rem;
        }

        .address-line--postcode strong {
          color: #ffffff;
          letter-spacing: 0.05em;
        }

        .location-address-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding-top: 0.35rem;
        }

        .btn-copy-address {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 0.85rem;
          border-radius: var(--radius-md);
          font-size: 0.8125rem;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.09);
          color: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.16);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .btn-copy-address:hover {
          background: rgba(255, 255, 255, 0.18);
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.3);
        }

        .btn-copy-address.copied {
          background: rgba(16, 185, 129, 0.22);
          border-color: rgba(16, 185, 129, 0.6);
          color: #6ee7b7;
        }

        .btn-call-workshop {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 0.85rem;
          border-radius: var(--radius-md);
          font-size: 0.8125rem;
          font-weight: 600;
          background: rgba(29, 111, 235, 0.2);
          color: var(--blue-300);
          border: 1px solid rgba(29, 111, 235, 0.35);
          text-decoration: none;
          transition: all var(--transition-fast);
        }

        .btn-call-workshop:hover {
          background: var(--blue-600);
          color: #ffffff;
          border-color: var(--blue-600);
        }

        .location-amenities {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .amenity-item {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.78);
        }

        .amenity-icon {
          font-size: 1rem;
          flex-shrink: 0;
        }

        /* Prominent Get Directions CTA */
        .location-cta-box {
          margin-top: auto;
          padding-top: 0.5rem;
        }

        .btn--get-directions {
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.625rem;
          padding: 0.95rem 1.5rem;
          font-size: 1.05rem;
          font-weight: 700;
          font-family: var(--font-display);
          background: linear-gradient(135deg, #1d6feb 0%, #174ab8 100%);
          color: #ffffff;
          border-radius: var(--radius-md);
          text-decoration: none;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 8px 24px -4px rgba(29, 111, 235, 0.5);
          transition: transform var(--transition-fast), box-shadow var(--transition-fast), filter var(--transition-fast);
          cursor: pointer;
        }

        .btn--get-directions:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px -4px rgba(29, 111, 235, 0.7);
          filter: brightness(1.08);
          color: #ffffff;
        }

        .btn-external-icon {
          opacity: 0.8;
          transition: transform var(--transition-fast);
        }

        .btn--get-directions:hover .btn-external-icon {
          transform: translate(2px, -2px);
          opacity: 1;
        }

        .location-cta-hint {
          font-size: 0.72rem;
          color: rgba(255, 255, 255, 0.45);
          text-align: center;
          margin-top: 0.5rem;
          line-height: 1.4;
        }

        /* Right / Map Embed Panel */
        .location-map-panel {
          display: flex;
          flex-direction: column;
          background: #09122a;
          min-height: 460px;
          position: relative;
        }

        .map-panel-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1.25rem;
          background: rgba(13, 27, 62, 0.95);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .map-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8125rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.85);
        }

        .map-status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
        }

        .map-fullscreen-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--blue-300);
          text-decoration: none;
          transition: color var(--transition-fast);
        }

        .map-fullscreen-link:hover {
          color: #ffffff;
        }

        .map-frame-wrapper {
          flex: 1;
          position: relative;
          min-height: 380px;
          width: 100%;
          background: #0e1e42;
        }

        .map-iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 0;
          display: block;
        }

        .map-panel-caption {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: rgba(13, 27, 62, 0.95);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .map-caption-address {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .map-caption-pin {
          color: var(--blue-400);
          flex-shrink: 0;
        }

        .map-caption-cta {
          color: var(--blue-300);
          font-weight: 600;
          text-decoration: none;
          transition: color var(--transition-fast);
        }

        .map-caption-cta:hover {
          color: #ffffff;
        }

        @media (max-width: 640px) {
          .location-info-panel {
            padding: 1.25rem 1rem;
            gap: 0.875rem;
          }
          .location-title {
            font-size: 1.25rem;
          }
          .map-frame-wrapper {
            min-height: 300px;
          }
          .map-panel-bar,
          .map-panel-caption {
            padding: 0.625rem 1rem;
          }
          .map-panel-caption {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.35rem;
          }
        }
      `}</style>
    </section>
  );
}
