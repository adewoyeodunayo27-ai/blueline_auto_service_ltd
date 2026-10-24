import { BUSINESS } from '../data/business.js';
import { Phone, Mail, MapPin, Clock, AlertCircle } from 'lucide-react';
import { WhatsAppIcon } from './SocialIcons.jsx';
import { useState } from 'react';

function ContactForm() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'General Enquiry',
    message: '',
  });
  const [reviewMessage, setReviewMessage] = useState('');
  const [waUrl, setWaUrl] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle');

  const validate = (v) => {
    const errs = {};
    if (!v.name.trim()) errs.name = 'Please enter your name.';
    if (!v.email.trim()) errs.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) errs.email = 'Please enter a valid email.';
    if (!v.message.trim()) errs.message = 'Please enter your message.';
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

    // Structured review message for WhatsApp (clean ASCII to prevent encoding corruption)
    const lines = [
      `*NEW CONTACT ENQUIRY*`,
      `*Blueline Auto Services Ltd*`,
      `--------------------------------`,
      `*Name:* ${values.name.trim()}`,
      `*Email:* ${values.email.trim()}`,
      values.phone.trim() ? `*Phone:* ${values.phone.trim()}` : null,
      `*Service Required:* ${values.service}`,
      `--------------------------------`,
      `*Message:*`,
      `${values.message.trim()}`,
      `--------------------------------`,
      `_Sent from Blueline Auto Services website_`
    ].filter(Boolean).join('\n');

    const url = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(lines)}`;

    setReviewMessage(lines);
    setWaUrl(url);
    setStatus('success');

    // Immediately open WhatsApp chat
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
            setValues({ name: '', email: '', phone: '', service: 'General Enquiry', message: '' });
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
        <label htmlFor="c-name">Your Name *</label>
        <input
          id="c-name"
          name="name"
          type="text"
          placeholder="e.g. John Smith"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.name && touched.name ? 'error' : ''}
          required
        />
        {errors.name && touched.name && (
          <p className="error-msg" role="alert"><AlertCircle size={12}/> {errors.name}</p>
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
          required
        />
        {errors.email && touched.email && (
          <p className="error-msg" role="alert"><AlertCircle size={12}/> {errors.email}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="c-phone">Phone Number <span className="optional-tag">(optional)</span></label>
        <input
          id="c-phone"
          name="phone"
          type="tel"
          placeholder="e.g. +44 7123 456789"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      <div className="form-group">
        <label htmlFor="c-service">Service Needed</label>
        <select
          id="c-service"
          name="service"
          value={values.service}
          onChange={handleChange}
        >
          <option value="General Enquiry">General Enquiry</option>
          <option value="Vehicle Sales">Vehicle Sales</option>
          <option value="Vehicle Hire / Rental">Vehicle Hire / Rental</option>
          <option value="Servicing & MOT Prep">Servicing & MOT Prep</option>
          <option value="Vehicle Repairs & Diagnostics">Vehicle Repairs & Diagnostics</option>
          <option value="24/7 Breakdown Recovery">24/7 Breakdown Recovery</option>
          <option value="Valeting & Detailing">Valeting & Detailing</option>
          <option value="Vehicle Sourcing">Vehicle Sourcing</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="c-message">Message *</label>
        <textarea
          id="c-message"
          name="message"
          rows={4}
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.message && touched.message ? 'error' : ''}
          placeholder="Describe what you need assistance with..."
          required
        />
        {errors.message && touched.message && (
          <p className="error-msg" role="alert"><AlertCircle size={12}/> {errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="btn btn--wa"
        style={{ width: '100%', justifyContent: 'center' }}
      >
        <WhatsAppIcon size={18} /> Send to WhatsApp
      </button>

      <p className="form-note">
        Submitting opens WhatsApp directly with your message pre-filled for quick reply from our team.
      </p>
    </form>
  );
}

export default function Contact() {
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
                    {BUSINESS.addressLine1}<br />
                    {BUSINESS.addressLine2}<br />
                    {BUSINESS.county} {BUSINESS.postcode}<br />
                    {BUSINESS.country}
                  </address>
                  <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,.45)', marginTop: '0.25rem', fontStyle: 'italic' }}>
                    Address to be confirmed by client
                  </p>
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

          {/* Form + map */}
          <div className="contact-right reveal">
            <div className="contact-form-card">
              <h3 className="contact-form-heading">Send a Message</h3>
              <ContactForm />
            </div>

            {/* Map placeholder */}
            <div className="map-placeholder" aria-label="Map location placeholder">
              <div className="map-placeholder-inner">
                <MapPin size={36} />
                <p>Map will appear here once a confirmed business address is provided.</p>
                <a
                  href={BUSINESS.googleMapsUrl}
                  className="btn btn--primary btn--sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Google Maps
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

        /* Map */
        .map-placeholder {
          background: var(--grey-200);
          border-radius: var(--radius-xl);
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px dashed var(--grey-300);
        }

        .map-placeholder-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--sp-sm);
          text-align: center;
          color: var(--grey-500);
        }

        .map-placeholder-inner p {
          font-size: 0.875rem;
          max-width: 260px;
          line-height: 1.5;
        }
      `}</style>
    </section>
  );
}
