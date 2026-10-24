import { useState } from 'react';
import { BUSINESS } from '../data/business.js';
import { WhatsAppIcon } from './SocialIcons.jsx';
import { X, Calendar, MapPin, User, Mail, Phone, AlertCircle, CheckCircle, Info } from 'lucide-react';

const VEHICLE_CATEGORIES = ['Car', 'SUV', 'Small Van', 'Large Van', 'Other'];

const INITIAL = {
  category:          '',
  collectionDate:    '',
  returnDate:        '',
  collectionLocation:'',
  returnLocation:    '',
  name:              '',
  email:             '',
  phone:             '',
  notes:             '',
  consent:           false,
};

function validate(v) {
  const errs = {};
  const today = new Date().toISOString().split('T')[0];

  if (!v.category)              errs.category = 'Please select a vehicle category.';
  if (!v.collectionDate)        errs.collectionDate = 'Please select a collection date.';
  else if (v.collectionDate < today) errs.collectionDate = 'Collection date cannot be in the past.';
  if (!v.returnDate)            errs.returnDate = 'Please select a return date.';
  else if (v.returnDate < v.collectionDate) errs.returnDate = 'Return date must be on or after the collection date.';
  if (!v.collectionLocation.trim()) errs.collectionLocation = 'Please enter the collection location.';
  if (!v.returnLocation.trim())     errs.returnLocation = 'Please enter the return location.';
  if (!v.name.trim())           errs.name = 'Please enter your name.';
  if (!v.email.trim())          errs.email = 'Please enter your email.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) errs.email = 'Please enter a valid email.';
  if (!v.phone.trim())          errs.phone = 'Please enter your phone number.';
  if (!v.consent)               errs.consent = 'Please confirm your consent.';
  return errs;
}

export default function BookingEnquiry({ isOpen, onClose }) {
  const [values,  setValues]  = useState(INITIAL);
  const [reviewMessage, setReviewMessage] = useState('');
  const [waUrl, setWaUrl] = useState('');
  const [errors,  setErrors]  = useState({});
  const [touched, setTouched] = useState({});
  const [status,  setStatus]  = useState('idle');

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setValues(v => ({ ...v, [name]: val }));
    if (touched[name]) {
      const errs = validate({ ...values, [name]: val });
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
    const allTouched = Object.keys(INITIAL).reduce((a,k) => ({...a,[k]:true}), {});
    setTouched(allTouched);
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // Format hire enquiry for WhatsApp (clean ASCII to prevent encoding corruption)
    const lines = [
      `*VEHICLE HIRE ENQUIRY*`,
      `*Blueline Auto Services Ltd*`,
      `--------------------------------`,
      `*Category:* ${values.category}`,
      `*Collection Date:* ${values.collectionDate}`,
      `*Return Date:* ${values.returnDate}`,
      `*Collection Location:* ${values.collectionLocation}`,
      `*Return Location:* ${values.returnLocation}`,
      `--------------------------------`,
      `*Customer Name:* ${values.name.trim()}`,
      `*Email:* ${values.email.trim()}`,
      `*Phone:* ${values.phone.trim()}`,
      values.notes.trim() ? `*Requirements:*\n${values.notes.trim()}` : null,
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

  const Err = ({ name }) =>
    errors[name] && touched[name]
      ? <p className="error-msg" role="alert"><AlertCircle size={12}/> {errors[name]}</p>
      : null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-title"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="modal booking-modal">
        {/* Header */}
        <div className="booking-header">
          <div>
            <h2 id="booking-title" className="booking-title">Vehicle Hire Enquiry</h2>
            <p className="booking-subtitle">Submit your requirements and we'll be in touch shortly via WhatsApp or call.</p>
          </div>
          <button className="booking-close" onClick={onClose} aria-label="Close vehicle hire enquiry form">
            <X size={20} />
          </button>
        </div>

        {status === 'success' ? (
          <div className="booking-success">
            <div className="success-icon success-icon--wa" style={{ background: '#e6f9ed', color: '#25D366', width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
              <WhatsAppIcon size={36} />
            </div>
            <h3 style={{ marginTop: '0.5rem', fontWeight: 800 }}>Enquiry Ready for WhatsApp</h3>
            <p>
              Your vehicle hire request was prepared and opened in WhatsApp. Review your message details below and click to chat with our team.
            </p>

            <div className="review-box" style={{ width: '100%', margin: '0.75rem 0', textAlign: 'left', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0.75rem', background: '#f1f5f9', borderBottom: '1px solid #e2e8f0', fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}>
                <span>Reviewed Hire Enquiry</span>
                <span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 6px', borderRadius: '999px', fontSize: '0.7rem' }}>WhatsApp Format</span>
              </div>
              <pre style={{ padding: '0.75rem', fontFamily: 'monospace', fontSize: '0.8rem', whiteSpace: 'pre-wrap', margin: 0, maxHeight: '200px', overflowY: 'auto' }}>{reviewMessage}</pre>
            </div>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--wa"
              style={{ width: '100%', justifyContent: 'center', marginBottom: '0.5rem' }}
            >
              <WhatsAppIcon size={18} /> Open WhatsApp Chat
            </a>

            <button className="btn btn--outline-blue" style={{ width: '100%', justifyContent: 'center' }} onClick={() => { setStatus('idle'); setValues(INITIAL); onClose(); }}>
              Close
            </button>
          </div>
        ) : (
          <form className="booking-form" onSubmit={handleSubmit} noValidate>
            {/* Enquiry disclaimer */}
            <div className="booking-note booking-note--top">
              <Info size={13} />
              <span>
                This is a <strong>hire enquiry</strong>, not a confirmed booking.
                Vehicle availability will be confirmed by our team after reviewing your request.
              </span>
            </div>

            <div className="booking-section-label">Vehicle Details</div>
            <div className="form-group">
              <label htmlFor="b-category">Vehicle Category *</label>
              <select
                id="b-category" name="category" value={values.category}
                onChange={handleChange} onBlur={handleBlur}
                className={errors.category && touched.category ? 'error' : ''}
                required
              >
                <option value="">Select a category…</option>
                {VEHICLE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <Err name="category" />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="b-collectionDate">Collection Date *</label>
                <input
                  id="b-collectionDate" name="collectionDate" type="date"
                  value={values.collectionDate} onChange={handleChange} onBlur={handleBlur}
                  className={errors.collectionDate && touched.collectionDate ? 'error' : ''}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
                <Err name="collectionDate" />
              </div>
              <div className="form-group">
                <label htmlFor="b-returnDate">Return Date *</label>
                <input
                  id="b-returnDate" name="returnDate" type="date"
                  value={values.returnDate} onChange={handleChange} onBlur={handleBlur}
                  className={errors.returnDate && touched.returnDate ? 'error' : ''}
                  min={values.collectionDate || new Date().toISOString().split('T')[0]}
                  required
                />
                <Err name="returnDate" />
              </div>
              <div className="form-group">
                <label htmlFor="b-collectionLocation">Collection Location *</label>
                <input
                  id="b-collectionLocation" name="collectionLocation" type="text"
                  value={values.collectionLocation} onChange={handleChange} onBlur={handleBlur}
                  className={errors.collectionLocation && touched.collectionLocation ? 'error' : ''}
                  placeholder="Town or postcode"
                  required
                />
                <Err name="collectionLocation" />
              </div>
              <div className="form-group">
                <label htmlFor="b-returnLocation">Return Location *</label>
                <input
                  id="b-returnLocation" name="returnLocation" type="text"
                  value={values.returnLocation} onChange={handleChange} onBlur={handleBlur}
                  className={errors.returnLocation && touched.returnLocation ? 'error' : ''}
                  placeholder="Town or postcode"
                  required
                />
                <Err name="returnLocation" />
              </div>
            </div>

            <div className="booking-section-label" style={{ marginTop: 'var(--sp-md)' }}>Your Contact Details</div>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="b-name">Full Name *</label>
                <input id="b-name" name="name" type="text" value={values.name} onChange={handleChange} onBlur={handleBlur}
                  className={errors.name && touched.name ? 'error' : ''} required />
                <Err name="name" />
              </div>
              <div className="form-group">
                <label htmlFor="b-phone">Phone Number *</label>
                <input id="b-phone" name="phone" type="tel" value={values.phone} onChange={handleChange} onBlur={handleBlur}
                  className={errors.phone && touched.phone ? 'error' : ''} required />
                <Err name="phone" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="b-email">Email Address *</label>
              <input id="b-email" name="email" type="email" value={values.email} onChange={handleChange} onBlur={handleBlur}
                className={errors.email && touched.email ? 'error' : ''} required />
              <Err name="email" />
            </div>
            <div className="form-group">
              <label htmlFor="b-notes">Additional Requirements</label>
              <textarea id="b-notes" name="notes" value={values.notes} onChange={handleChange} rows={3}
                placeholder="Any specific requirements or additional information…" />
            </div>

            <div className="checkbox-group">
              <input id="b-consent" name="consent" type="checkbox" checked={values.consent} onChange={handleChange} onBlur={handleBlur} required />
              <div>
                <label htmlFor="b-consent" style={{ fontWeight: 400, color: 'var(--grey-600)', fontSize: '0.875rem' }}>
                  I consent to Blueline Auto Services Ltd processing my details to respond to this enquiry. *
                </label>
                <Err name="consent" />
              </div>
            </div>

            {status === 'error' && (
              <div className="form-error-banner" role="alert" style={{ marginTop: 'var(--sp-md)' }}>
                <AlertCircle size={16} />
                <span>Unable to submit. Please try again or contact us directly.</span>
              </div>
            )}

            <div className="booking-actions">
              <button type="button" className="btn btn--outline-blue" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn--wa">
                <WhatsAppIcon size={16} /> Send Enquiry to WhatsApp
              </button>
            </div>
          </form>
        )}
      </div>

      <style>{`
        .booking-modal {
          max-width: 720px;
          padding: 0;
        }
        .booking-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: var(--sp-md);
          padding: var(--sp-xl);
          border-bottom: 1px solid var(--grey-200);
        }
        .booking-title {
          font-family: var(--font-display);
          font-size: 1.375rem;
          font-weight: 800;
          color: var(--dark);
        }
        .booking-subtitle {
          font-size: 0.875rem;
          color: var(--grey-600);
          margin-top: 0.25rem;
        }
        .booking-close {
          width: 36px;
          height: 36px;
          background: var(--grey-100);
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--grey-700);
          flex-shrink: 0;
          transition: background var(--transition-fast);
        }
        .booking-close:hover { background: var(--grey-200); }
        .booking-form {
          padding: var(--sp-xl);
        }
        .booking-note {
          display: flex;
          align-items: flex-start;
          gap: 0.4rem;
          background: var(--blue-50);
          border: 1px solid var(--blue-200);
          color: var(--blue-800);
          font-size: 0.8125rem;
          padding: var(--sp-sm) var(--sp-md);
          border-radius: var(--radius-md);
          line-height: 1.5;
        }
        .booking-note--top { margin-bottom: var(--sp-lg); }
        .booking-note svg { flex-shrink: 0; margin-top: 2px; }
        .booking-section-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--grey-500);
          margin-bottom: var(--sp-sm);
        }
        .booking-actions {
          display: flex;
          justify-content: flex-end;
          gap: var(--sp-sm);
          margin-top: var(--sp-lg);
        }
        @media (max-width: 640px) {
          .booking-header {
            padding: 1.25rem 1rem 1rem;
          }
          .booking-form {
            padding: 1.25rem 1rem;
          }
          .booking-actions {
            flex-direction: column-reverse;
          }
          .booking-actions button,
          .booking-actions a {
            width: 100%;
            justify-content: center;
          }
        }
        .booking-success {
          padding: var(--sp-2xl) var(--sp-xl);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: var(--sp-md);
        }
        .booking-success h3 {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 700;
        }
        .booking-success p {
          color: var(--grey-600);
          font-size: 0.9375rem;
          line-height: 1.65;
          max-width: 480px;
        }
        .btn--wa {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #25D366;
          color: #ffffff;
          border: 1px solid #20bd5a;
          padding: 0.75rem 1.25rem;
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
      `}</style>
    </div>
  );
}
