import { useState, useEffect } from 'react';
import { Star, X, CheckCircle, AlertCircle, Send, ShieldCheck } from 'lucide-react';
import { isSupabaseConfigured, submitTestimonial } from '../lib/supabase.js';
import { BUSINESS } from '../data/business.js';
import { WhatsAppIcon } from './SocialIcons.jsx';

const SERVICE_OPTIONS = [
  'Vehicle Sales & Sourcing',
  'Vehicle & Commercial Hire',
  'Vehicle Servicing & MOT',
  'Diagnostics & Mechanical Repairs',
  'Breakdown Recovery & Towing',
  'Full Valeting & Detailing',
  'Brakes & Suspension',
  'Other / General Automotive Service'
];

export default function WriteReviewModal({ isOpen, onClose, onReviewSubmitted }) {
  const [customerName, setCustomerName] = useState('');
  const [serviceReceived, setServiceReceived] = useState('');
  const [starRating, setStarRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const resetForm = () => {
    setCustomerName('');
    setServiceReceived('');
    setStarRating(5);
    setHoverRating(0);
    setReviewText('');
    setStatus('idle');
    setErrorMsg('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerName.trim() || customerName.trim().length < 2) {
      setErrorMsg('Please enter your full name (at least 2 characters).');
      return;
    }
    if (!starRating || starRating < 1 || starRating > 5) {
      setErrorMsg('Please select a star rating between 1 and 5.');
      return;
    }
    if (!reviewText.trim() || reviewText.trim().length < 10) {
      setErrorMsg('Please write a review describing your experience (at least 10 characters).');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      if (isSupabaseConfigured) {
        await submitTestimonial({
          customerName,
          serviceReceived,
          starRating,
          reviewText,
        });
      } else {
        // Fallback: save to local queue
        try {
          const localReviews = JSON.parse(localStorage.getItem('blueline_local_reviews') || '[]');
          localReviews.push({
            id: 'local_' + Date.now(),
            customer_name: customerName.trim(),
            service_received: serviceReceived ? serviceReceived.trim() : null,
            star_rating: Number(starRating),
            review_text: reviewText.trim(),
            approval_status: 'pending',
            created_at: new Date().toISOString()
          });
          localStorage.setItem('blueline_local_reviews', JSON.stringify(localReviews));
        } catch (storageErr) {
          console.warn('Local storage save failed:', storageErr);
        }
      }

      setStatus('success');
      if (onReviewSubmitted) onReviewSubmitted();
    } catch (err) {
      console.error('Error submitting review:', err);
      setStatus('error');
      setErrorMsg(err.message || 'Failed to submit your review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getWhatsAppReviewUrl = () => {
    const lines = [
      `*CUSTOMER REVIEW*`,
      `*Blueline Auto Services Ltd*`,
      `--------------------------------`,
      `*Name:* ${customerName.trim()}`,
      `*Rating:* ${starRating} / 5 Stars`,
      serviceReceived ? `*Service:* ${serviceReceived}` : null,
      `--------------------------------`,
      `*Review:*`,
      `"${reviewText.trim()}"`,
      `--------------------------------`,
      `_Sent from Blueline Auto Services website_`
    ].filter(Boolean).join('\n');
    return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(lines)}`;
  };

  return (
    <div className="review-modal-overlay" onClick={handleClose} role="presentation">
      <div 
        className="review-modal-card" 
        onClick={(e) => e.stopPropagation()} 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="write-review-title"
      >
        <button 
          className="review-modal-close" 
          onClick={handleClose} 
          aria-label="Close review dialog"
        >
          <X size={20} />
        </button>

        {status === 'success' ? (
          <div className="review-modal-success">
            <div className="review-success-icon">
              <CheckCircle size={52} />
            </div>
            <h3 className="review-success-title">Thank You for Your Review!</h3>
            <p className="review-success-desc">
              Your testimonial has been securely received. To protect the integrity of our feedback, all new submissions remain <strong>pending administrator approval</strong> before being published to the website.
            </p>
            <div className="review-moderation-badge">
              <ShieldCheck size={16} />
              <span>Pending Review Verification by Blueline Auto Services Ltd</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem', width: '100%' }}>
              <a
                href={getWhatsAppReviewUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline"
                style={{ justifyContent: 'center', borderColor: '#25D366', color: '#128C7E' }}
              >
                <WhatsAppIcon size={18} />
                <span>Also Share Review on WhatsApp</span>
              </a>
              <button className="btn btn--primary" onClick={handleClose} style={{ justifyContent: 'center' }}>
                Return to Website
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="review-form">
            <div className="review-modal-header">
              <span className="section__eyebrow">Customer Feedback</span>
              <h3 id="write-review-title" className="review-modal-title">
                Write a <span className="highlight">Review</span>
              </h3>
              <p className="review-modal-subtitle">
                Share your experience with Blueline Auto Services Ltd. Your review will be submitted for verification by our management team.
              </p>
            </div>

            {errorMsg && (
              <div className="review-form-alert" role="alert">
                <AlertCircle size={18} />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Star Rating Picker */}
            <div className="form-group">
              <label className="form-label" id="rating-label">
                Star Rating <span className="required">*</span>
              </label>
              <div 
                className="star-picker" 
                role="radiogroup" 
                aria-labelledby="rating-label"
              >
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = (hoverRating || starRating) >= star;
                  return (
                    <button
                      type="button"
                      key={star}
                      className={`star-picker-btn ${isFilled ? 'active' : ''}`}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setStarRating(star)}
                      aria-label={`${star} star${star > 1 ? 's' : ''}`}
                      role="radio"
                      aria-checked={starRating === star}
                    >
                      <Star 
                        size={28} 
                        fill={isFilled ? 'currentColor' : 'none'} 
                        strokeWidth={isFilled ? 0 : 1.5}
                      />
                    </button>
                  );
                })}
                <span className="star-rating-text">
                  {starRating} of 5 Stars
                </span>
              </div>
            </div>

            {/* Customer Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="review-author-name">
                Full Name <span className="required">*</span>
              </label>
              <input
                id="review-author-name"
                type="text"
                className="form-input"
                placeholder="e.g. John Davies"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
            </div>

            {/* Service Received */}
            <div className="form-group">
              <label className="form-label" htmlFor="review-service">
                Service Received <span className="optional">(Optional)</span>
              </label>
              <select
                id="review-service"
                className="form-input"
                value={serviceReceived}
                onChange={(e) => setServiceReceived(e.target.value)}
              >
                <option value="">Select service provided...</option>
                {SERVICE_OPTIONS.map((srv) => (
                  <option key={srv} value={srv}>
                    {srv}
                  </option>
                ))}
              </select>
            </div>

            {/* Review Comments */}
            <div className="form-group">
              <label className="form-label" htmlFor="review-body">
                Written Review <span className="required">*</span>
              </label>
              <textarea
                id="review-body"
                rows={4}
                className="form-input"
                placeholder="Describe the service you received, vehicle condition, communication, and overall satisfaction..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              />
            </div>

            <div className="review-modal-actions">
              <button 
                type="button" 
                className="btn btn--outline" 
                onClick={handleClose} 
                disabled={submitting}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn--primary" 
                disabled={submitting}
              >
                {submitting ? (
                  <>Submitting Review...</>
                ) : (
                  <>
                    <Send size={16} />
                    Submit for Approval
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      <style>{`
        .review-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(10, 16, 30, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1050;
          padding: 1.25rem;
          animation: modalFadeIn 0.25s ease-out;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .review-modal-card {
          background: #0f1d38;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: var(--radius-xl, 16px);
          box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.65), 0 0 30px rgba(0, 102, 255, 0.15);
          width: 100%;
          max-width: 540px;
          padding: 2.25rem;
          position: relative;
          color: white;
          max-height: 90vh;
          overflow-y: auto;
          animation: modalScaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes modalScaleUp {
          from { opacity: 0; transform: scale(0.94) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .review-modal-close {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: all 0.2s;
        }

        .review-modal-close:hover {
          background: rgba(255, 255, 255, 0.2);
          color: #fff;
        }

        .review-modal-header {
          margin-bottom: 1.5rem;
        }

        .review-modal-title {
          font-size: 1.625rem;
          font-weight: 800;
          margin: 0.3rem 0;
          color: #ffffff;
        }

        .review-modal-subtitle {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.5;
        }

        .review-form-alert {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.35);
          color: #fca5a5;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          margin-bottom: 1.25rem;
          font-size: 0.875rem;
          line-height: 1.4;
        }

        .form-group {
          margin-bottom: 1.25rem;
        }

        .form-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.45rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .form-label .required {
          color: #ef4444;
          margin-left: 0.2rem;
        }

        .form-label .optional {
          color: rgba(255, 255, 255, 0.4);
          font-weight: 400;
          font-size: 0.8rem;
          margin-left: 0.35rem;
        }

        .star-picker {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.4rem 0;
        }

        .star-picker-btn {
          background: none;
          border: none;
          padding: 0.2rem;
          cursor: pointer;
          color: rgba(255, 255, 255, 0.25);
          transition: transform 0.15s, color 0.15s;
          display: flex;
        }

        .star-picker-btn:hover {
          transform: scale(1.15);
        }

        .star-picker-btn.active {
          color: #fbbf24;
        }

        .star-rating-text {
          font-size: 0.85rem;
          color: #fbbf24;
          font-weight: 600;
          margin-left: 0.75rem;
        }

        .review-modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          margin-top: 1.75rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .review-modal-success {
          text-align: center;
          padding: 1.5rem 0.5rem;
        }

        .review-success-icon {
          color: #10b981;
          margin-bottom: 1rem;
          display: flex;
          justify-content: center;
        }

        .review-success-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 0.75rem;
        }

        .review-success-desc {
          font-size: 0.9375rem;
          color: rgba(255, 255, 255, 0.75);
          line-height: 1.6;
          max-width: 440px;
          margin: 0 auto;
        }

        .review-moderation-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1.25rem;
          padding: 0.6rem 1rem;
          background: rgba(0, 102, 255, 0.15);
          border: 1px solid rgba(0, 102, 255, 0.35);
          border-radius: 9999px;
          color: #60a5fa;
          font-size: 0.8125rem;
          font-weight: 600;
        }

        @media (max-width: 640px) {
          .review-modal-card {
            padding: 1.5rem;
          }
          .review-modal-actions {
            flex-direction: column-reverse;
          }
          .review-modal-actions .btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 420px) {
          .review-modal-card {
            padding: 1.15rem 0.85rem;
          }
        }
      `}</style>
    </div>
  );
}
