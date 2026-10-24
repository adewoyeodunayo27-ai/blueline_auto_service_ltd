import { BUSINESS } from '../data/business.js';
import { Phone, Mail, MapPin, Clock, Send, AlertCircle } from 'lucide-react';
import { useState } from 'react';

function ContactForm() {
  const [values,  setValues]  = useState({ name: '', email: '', message: '' });
  const [errors,  setErrors]  = useState({});
  const [touched, setTouched] = useState({});
  const [status,  setStatus]  = useState('idle');

  const validate = (v) => {
    const errs = {};
    if (!v.name.trim())    errs.name    = 'Please enter your name.';
    if (!v.email.trim())   errs.email   = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) errs.email = 'Please enter a valid email.';
    if (!v.message.trim()) errs.message = 'Please enter a message.';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, message: true };
    setTouched(allTouched);
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setStatus('loading');
    // Replace with real backend call
    try {
      await new Promise(res => setTimeout(res, 1800));
      setStatus('success');
    } catch { setStatus('error'); }
  };

  if (status === 'success') {
    return (
      <div className="contact-form-success">
        <div className="cs-icon">✓</div>
        <h3>Message Received</h3>
        <p>Thank you for getting in touch. We'll reply as soon as possible.</p>
        <button className="btn btn--outline-blue btn--sm" onClick={() => { setStatus('idle'); setValues({ name:'', email:'', message:'' }); setTouched({}); }}>
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
      <div className="form-group">
        <label htmlFor="c-name">Your Name *</label>
        <input id="c-name" name="name" type="text" value={values.name} onChange={handleChange} onBlur={handleBlur}
          className={errors.name && touched.name ? 'error' : ''} required />
        {errors.name && touched.name && <p className="error-msg" role="alert"><AlertCircle size={12}/> {errors.name}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="c-email">Email Address *</label>
        <input id="c-email" name="email" type="email" value={values.email} onChange={handleChange} onBlur={handleBlur}
          className={errors.email && touched.email ? 'error' : ''} required />
        {errors.email && touched.email && <p className="error-msg" role="alert"><AlertCircle size={12}/> {errors.email}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="c-message">Message *</label>
        <textarea id="c-message" name="message" rows={5} value={values.message} onChange={handleChange} onBlur={handleBlur}
          className={errors.message && touched.message ? 'error' : ''}
          placeholder="How can we help?" required />
        {errors.message && touched.message && <p className="error-msg" role="alert"><AlertCircle size={12}/> {errors.message}</p>}
      </div>
      <button type="submit" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }}
        disabled={status === 'loading'} aria-busy={status === 'loading'}>
        {status === 'loading' ? <><div className="spinner"/> Sending…</> : <><Send size={16}/> Send Message</>}
      </button>
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
          padding: var(--sp-xl) 0;
        }

        .cs-icon {
          width: 56px;
          height: 56px;
          background: var(--blue-50);
          color: var(--accent);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .contact-form-success h3 {
          font-family: var(--font-display);
          font-weight: 700;
        }

        .contact-form-success p {
          color: var(--grey-600);
          font-size: 0.9rem;
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
