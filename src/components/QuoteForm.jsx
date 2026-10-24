import { useState } from 'react';
import { SERVICES } from '../data/services.js';
import { BUSINESS } from '../data/business.js';
import { WhatsAppIcon } from './SocialIcons.jsx';
import { CheckCircle, AlertCircle, Loader2, Send, Info } from 'lucide-react';

const INITIAL_STATE = {
  fullName:       '',
  email:          '',
  phone:          '',
  service:        '',
  vehicleMake:    '',
  vehicleModel:   '',
  registration:   '',
  preferredDate:  '',
  message:        '',
  consent:        false,
};

function validate(values) {
  const errors = {};
  if (!values.fullName.trim())
    errors.fullName = 'Please enter your full name.';
  if (!values.email.trim())
    errors.email = 'Please enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = 'Please enter a valid email address.';
  if (!values.phone.trim())
    errors.phone = 'Please enter your phone number.';
  if (!values.service)
    errors.service = 'Please select a service.';
  if (!values.vehicleMake.trim())
    errors.vehicleMake = 'Please enter the vehicle make.';
  if (!values.vehicleModel.trim())
    errors.vehicleModel = 'Please enter the vehicle model.';
  if (!values.consent)
    errors.consent = 'Please confirm your consent to submit this enquiry.';
  return errors;
}

export default function QuoteForm() {
  const [values,  setValues]  = useState(INITIAL_STATE);
  const [reviewMessage, setReviewMessage] = useState('');
  const [waUrl, setWaUrl] = useState('');
  const [errors,  setErrors]  = useState({});
  const [status,  setStatus]  = useState('idle'); // idle | loading | success | error
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues(v => ({ ...v, [name]: type === 'checkbox' ? checked : value }));
    if (touched[name]) {
      const errs = validate({ ...values, [name]: type === 'checkbox' ? checked : value });
      setErrors(prev => ({ ...prev, [name]: errs[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(t => ({ ...t, [name]: true }));
    const errs = validate(values);
    setErrors(prev => ({ ...prev, [name]: errs[name] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allTouched = Object.keys(INITIAL_STATE).reduce((a, k) => ({ ...a, [k]: true }), {});
    setTouched(allTouched);
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // Structured quote review message for WhatsApp (clean ASCII to prevent encoding corruption)
    const lines = [
      `*NEW VEHICLE QUOTE REQUEST*`,
      `*Blueline Auto Services Ltd*`,
      `--------------------------------`,
      `*Service:* ${values.service}`,
      `*Vehicle:* ${values.vehicleMake} ${values.vehicleModel}`,
      values.registration.trim() ? `*Registration:* ${values.registration.trim().toUpperCase()}` : null,
      values.preferredDate ? `*Preferred Date:* ${values.preferredDate}` : null,
      `--------------------------------`,
      `*Name:* ${values.fullName.trim()}`,
      `*Email:* ${values.email.trim()}`,
      `*Phone:* ${values.phone.trim()}`,
      values.message.trim() ? `*Notes:*\n${values.message.trim()}` : null,
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

  const Field = ({ name, label, type = 'text', required, children, optional }) => (
    <div className="form-group">
      <label htmlFor={`quote-${name}`}>
        {label}{required ? ' *' : ''}{optional ? <span className="optional-tag"> (optional)</span> : ''}
      </label>
      {children || (
        <input
          id={`quote-${name}`}
          name={name}
          type={type}
          value={values[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors[name] && touched[name] ? 'error' : ''}
          aria-describedby={errors[name] && touched[name] ? `err-${name}` : undefined}
          aria-invalid={!!(errors[name] && touched[name])}
          required={required}
        />
      )}
      {errors[name] && touched[name] && (
        <p id={`err-${name}`} className="error-msg" role="alert">
          <AlertCircle size={13} /> {errors[name]}
        </p>
      )}
    </div>
  );

  if (status === 'success') {
    return (
      <section id="quote" className="section quote-section" aria-labelledby="quote-title">
        <div className="container">
          <div className="quote-success">
            <div className="success-icon success-icon--wa"><WhatsAppIcon size={40} /></div>
            <h2 className="section__title" style={{ fontSize: '1.75rem' }}>Quote Request Ready for WhatsApp</h2>
            <p>Your quote enquiry has been prepared and opened in WhatsApp. Review the formatted details below and click to re-open if needed.</p>

            <div className="review-box" style={{ width: '100%', margin: '1rem 0', textAlign: 'left' }}>
              <div className="review-box-header">
                <span>Reviewed Quote Message</span>
                <span className="review-box-badge">WhatsApp Format</span>
              </div>
              <pre className="review-box-content">{reviewMessage}</pre>
            </div>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--wa"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <WhatsAppIcon size={18} /> Open in WhatsApp
            </a>

            <button
              className="btn btn--outline-blue"
              style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
              onClick={() => {
                setStatus('idle');
                setValues(INITIAL_STATE);
                setTouched({});
              }}
            >
              Submit Another Quote Enquiry
            </button>
          </div>
        </div>
        <style>{quoteStyles}</style>
      </section>
    );
  }

  return (
    <section id="quote" className="section quote-section" aria-labelledby="quote-title">
      <div className="container">
        <header className="section__header reveal">
          <span className="section__eyebrow">Get Started</span>
          <h2 id="quote-title" className="section__title">
            Request a <span className="highlight">Quote</span>
          </h2>
          <div className="divider" />
          <p className="section__subtitle" style={{ marginTop: 'var(--sp-md)' }}>
            Fill in the form below and a member of our team will get back to you promptly.
          </p>
        </header>

        <div className="quote-layout reveal">
          <div className="quote-info">
            <h3 className="quote-info-title">Why Choose Blueline?</h3>
            {[
              'Friendly, professional team',
              'Transparent, competitive pricing',
              'Wide range of automotive services',
              'Prompt response to all enquiries',
            ].map(item => (
              <div key={item} className="quote-info-item">
                <CheckCircle size={16} className="info-check" />
                {item}
              </div>
            ))}
            <div className="quote-info-note">
              <Info size={13} />
              <span>
                This form currently simulates a submission. Connect it to a backend
                service (e.g. Formspree, EmailJS, or a server-side API) to receive real enquiries.
                Never expose API keys in client-side code.
              </span>
            </div>
          </div>

          <form
            className="quote-form-card"
            onSubmit={handleSubmit}
            noValidate
            aria-label="Request a quote form"
          >
            <div className="form-grid">
              <Field name="fullName" label="Full Name" required />
              <Field name="email" label="Email Address" type="email" required />
              <Field name="phone" label="Phone Number" type="tel" required />
              <Field name="service" label="Service Required" required>
                <select
                  id="quote-service"
                  name="service"
                  value={values.service}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.service && touched.service ? 'error' : ''}
                  aria-describedby={errors.service && touched.service ? 'err-service' : undefined}
                  aria-invalid={!!(errors.service && touched.service)}
                  required
                >
                  <option value="">Select a service…</option>
                  {SERVICES.map(s => (
                    <option key={s.id} value={s.slug}>{s.title}</option>
                  ))}
                </select>
                {errors.service && touched.service && (
                  <p id="err-service" className="error-msg" role="alert">
                    <AlertCircle size={13} /> {errors.service}
                  </p>
                )}
              </Field>
              <Field name="vehicleMake" label="Vehicle Make" required />
              <Field name="vehicleModel" label="Vehicle Model" required />
              <Field name="registration" label="Vehicle Registration" optional />
              <Field name="preferredDate" label="Preferred Date" type="date" optional />
            </div>

            <div className="form-group">
              <label htmlFor="quote-message">Additional Information</label>
              <textarea
                id="quote-message"
                name="message"
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={4}
                placeholder="Tell us anything else we should know about your enquiry…"
              />
            </div>

            <div className="checkbox-group">
              <input
                id="quote-consent"
                name="consent"
                type="checkbox"
                checked={values.consent}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-describedby={errors.consent && touched.consent ? 'err-consent' : undefined}
                aria-invalid={!!(errors.consent && touched.consent)}
                required
              />
              <div>
                <label htmlFor="quote-consent" style={{ fontWeight: 400, color: 'var(--grey-600)', fontSize: '0.875rem' }}>
                  I consent to Blueline Auto Services Ltd processing my personal details to respond to this enquiry. *
                </label>
                {errors.consent && touched.consent && (
                  <p id="err-consent" className="error-msg" role="alert">
                    <AlertCircle size={13} /> {errors.consent}
                  </p>
                )}
              </div>
            </div>

            {status === 'error' && (
              <div className="form-error-banner" role="alert">
                <AlertCircle size={16} />
                <span>
                  We were unable to submit your enquiry. Please try again or contact us directly.
                  No backend is currently connected — see the developer integration note above.
                </span>
              </div>
            )}

            <button
              type="submit"
              className="btn btn--wa btn--lg submit-btn"
            >
              <WhatsAppIcon size={18} /> Send Quote Request to WhatsApp
            </button>
          </form>
        </div>
      </div>
      <style>{quoteStyles}</style>
    </section>
  );
}

const quoteStyles = `
  .quote-section { background: var(--grey-100); }

  .quote-layout {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: var(--sp-xl);
    align-items: start;
  }

  @media (max-width: 900px) {
    .quote-layout {
      grid-template-columns: 1fr;
    }
  }

  .quote-info {
    background: var(--navy);
    border-radius: var(--radius-xl);
    padding: var(--sp-xl);
    color: white;
    position: sticky;
    top: calc(var(--header-total) + var(--sp-md));
  }

  @media (max-width: 900px) {
    .quote-info { position: static; }
  }

  .quote-info-title {
    font-family: var(--font-display);
    font-size: 1.125rem;
    font-weight: 700;
    margin-bottom: var(--sp-lg);
    color: white;
  }

  .quote-info-item {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    font-size: 0.875rem;
    color: rgba(255,255,255,.82);
    margin-bottom: var(--sp-sm);
  }

  .info-check { color: var(--blue-300); flex-shrink: 0; }

  .quote-info-note {
    display: flex;
    align-items: flex-start;
    gap: 0.4rem;
    margin-top: var(--sp-lg);
    padding: var(--sp-md);
    background: rgba(255,255,255,.07);
    border-radius: var(--radius-md);
    border: 1px solid rgba(255,255,255,.12);
    font-size: 0.78rem;
    color: rgba(255,255,255,.55);
    line-height: 1.5;
  }

  .quote-info-note svg { flex-shrink: 0; margin-top: 2px; color: var(--blue-300); }

  .quote-form-card {
    background: white;
    border-radius: var(--radius-xl);
    padding: var(--sp-xl);
    box-shadow: var(--shadow-md);
  }

  @media (max-width: 640px) {
    .quote-form-card {
      padding: 1.25rem 1rem;
      border-radius: var(--radius-lg);
    }
    .quote-info {
      padding: 1.25rem 1rem;
      border-radius: var(--radius-lg);
    }
  }

  .optional-tag {
    font-size: 0.8rem;
    color: var(--grey-500);
    font-weight: 400;
  }

  .form-error-banner {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    background: #fef2f2;
    border: 1px solid #fca5a5;
    color: #b91c1c;
    padding: var(--sp-md);
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    line-height: 1.5;
    margin-top: var(--sp-md);
  }

  .submit-btn {
    width: 100%;
    justify-content: center;
    margin-top: var(--sp-lg);
  }

  .submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none !important;
  }

  .quote-success {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--sp-md);
    max-width: 480px;
    margin: 0 auto;
    padding: var(--sp-4xl) var(--sp-xl);
  }

  .success-icon {
    width: 80px;
    height: 80px;
    background: var(--blue-50);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent);
  }

  .success-icon--wa {
    background: #e6f9ed;
    color: #25D366;
    box-shadow: 0 4px 16px rgba(37, 211, 102, 0.25);
  }

  .quote-success p {
    color: var(--grey-600);
    line-height: 1.65;
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

  .review-box {
    width: 100%;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: var(--radius-lg);
    overflow: hidden;
    text-align: left;
    margin: var(--sp-xs) 0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  }

  .review-box-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.625rem 1rem;
    background: #f8fafc;
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
`;
