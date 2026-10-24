import { useState, useEffect, useRef, useCallback } from 'react';
import { BUSINESS } from '../data/business.js';
import { ChevronLeft, ChevronRight, Star, Info, MessageSquarePlus, Sparkles, ShieldCheck } from 'lucide-react';
import { getApprovedTestimonials, isSupabaseConfigured } from '../lib/supabase.js';
import WriteReviewModal from './WriteReviewModal.jsx';
import AdminReviewsModal from './AdminReviewsModal.jsx';

const AUTO_INTERVAL = 6000;

function StarRating({ rating }) {
  return (
    <div className="stars" aria-label={`${rating} out of 5 stars`} role="img">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={16}
          fill={i < rating ? 'currentColor' : 'none'}
          strokeWidth={i < rating ? 0 : 1.5}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [reviews, setReviews] = useState(BUSINESS.testimonials);
  const [isLiveFromDb, setIsLiveFromDb] = useState(false);
  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const intervalRef = useRef(null);

  const loadReviews = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    try {
      const data = await getApprovedTestimonials();
      if (data && data.length > 0) {
        setReviews(data);
        setIsLiveFromDb(true);
        setCurrent(0);
      }
    } catch (err) {
      console.warn('Could not load Supabase reviews:', err);
    }
  }, []);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const count = Math.max(reviews.length, 1);
  const activeReview = reviews[current] || reviews[0] || {
    name: 'Customer',
    location: 'Doncaster',
    rating: 5,
    text: 'Outstanding service and honest pricing from Blueline Auto Services Ltd.'
  };

  const next = useCallback(() => setCurrent(c => (c + 1) % count), [count]);
  const prev = useCallback(() => setCurrent(c => (c - 1 + count) % count), [count]);

  // Auto-rotation
  useEffect(() => {
    if (paused || count <= 1) { clearInterval(intervalRef.current); return; }
    intervalRef.current = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(intervalRef.current);
  }, [paused, next, count]);

  return (
    <section
      id="reviews"
      className="section testimonials-section section--dark"
      aria-labelledby="testimonials-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="container">
        <header className="section__header reveal">
          <span className="section__eyebrow">What Customers Say</span>
          <h2 id="testimonials-title" className="section__title">
            Customer <span className="highlight">Reviews</span>
          </h2>
          <div className="divider" />
          
          <div className="testimonials-header-meta">
            <div className="testimonials-notice">
              {isLiveFromDb ? (
                <>
                  <Sparkles size={14} className="notice-icon live" aria-hidden="true" />
                  <span>Verified customer reviews powered by Supabase</span>
                </>
              ) : (
                <>
                  <Info size={14} aria-hidden="true" />
                  <span>Displaying verified testimonials. New submissions are held for administrator approval.</span>
                </>
              )}
            </div>

            <div className="testimonials-btn-group">
              <button 
                type="button" 
                className="btn btn--outline btn--sm write-review-btn"
                onClick={() => setIsModalOpen(true)}
                aria-label="Open review submission form"
              >
                <MessageSquarePlus size={16} />
                <span>Write a Review</span>
              </button>

              <button 
                type="button" 
                className="btn btn--outline btn--sm admin-moderation-btn"
                onClick={() => setIsAdminModalOpen(true)}
                aria-label="Open administrator review moderation dialog"
                title="Administrator review moderation"
              >
                <ShieldCheck size={16} />
                <span>Admin Moderation</span>
              </button>
            </div>
          </div>
        </header>

        <div className="testimonials-carousel" aria-live="polite" aria-atomic="true">
          <div className="testimonial-card reveal" key={current}>
            <div className="testimonial-quote-mark">"</div>
            <StarRating rating={activeReview.rating} />
            <blockquote className="testimonial-text">
              {activeReview.text}
            </blockquote>
            <div className="testimonial-author">
              <div className="testimonial-avatar" aria-hidden="true">
                {activeReview.name.charAt(0)}
              </div>
              <div>
                <p className="testimonial-name">{activeReview.name}</p>
                <p className="testimonial-location">{activeReview.location || activeReview.service || 'Doncaster'}</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          {count > 1 && (
            <div className="testimonial-controls">
              <button className="testimonial-ctrl" onClick={prev} aria-label="Previous review">
                <ChevronLeft size={20} />
              </button>
              <div className="testimonial-dots" role="tablist" aria-label="Review pagination">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    className={`testimonial-dot${i === current ? ' active' : ''}`}
                    onClick={() => setCurrent(i)}
                    role="tab"
                    aria-selected={i === current}
                    aria-label={`Review ${i + 1} of ${count}`}
                  />
                ))}
              </div>
              <button className="testimonial-ctrl" onClick={next} aria-label="Next review">
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>

      <WriteReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReviewSubmitted={loadReviews}
      />

      <AdminReviewsModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onReviewsChanged={loadReviews}
      />

      <style>{`
        .testimonials-section {
          background: linear-gradient(135deg, var(--navy) 0%, #0f2260 50%, var(--navy) 100%);
          position: relative;
          overflow: hidden;
        }

        .testimonials-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255,255,255,.03) 1px, transparent 1px);
          background-size: 32px 32px;
        }

        .testimonials-section .container {
          position: relative;
          z-index: 1;
        }

        .testimonials-header-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: var(--sp-md);
        }

        .testimonials-btn-group {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-wrap: wrap;
        }

        .testimonials-notice {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.8125rem;
          color: rgba(255,255,255,.6);
          font-style: normal;
        }

        .testimonials-notice .notice-icon.live {
          color: #38bdf8;
          animation: pulseGlow 2s infinite ease-in-out;
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }

        .write-review-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 1.15rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--white);
          border-color: rgba(255, 255, 255, 0.25);
          border-radius: var(--radius-full, 9999px);
          background: rgba(255, 255, 255, 0.06);
          transition: all 0.2s ease;
        }

        .write-review-btn:hover {
          background: var(--accent);
          border-color: var(--accent);
          color: white;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .admin-moderation-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.55rem 0.95rem;
          font-size: 0.8125rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.75);
          border-color: rgba(255, 255, 255, 0.15);
          border-radius: var(--radius-full, 9999px);
          background: rgba(255, 255, 255, 0.03);
          transition: all 0.2s ease;
        }

        .admin-moderation-btn:hover {
          background: rgba(0, 102, 255, 0.25);
          border-color: rgba(0, 102, 255, 0.5);
          color: #60a5fa;
          transform: translateY(-1px);
        }

        @media (max-width: 640px) {
          .testimonials-header-meta {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .testimonials-btn-group {
            width: 100%;
            justify-content: center;
          }
        }

        .testimonials-carousel {
          max-width: 760px;
          margin: 0 auto;
        }

        .testimonial-card {
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.1);
          backdrop-filter: blur(8px);
          border-radius: var(--radius-xl);
          padding: var(--sp-2xl) var(--sp-2xl) var(--sp-xl);
          position: relative;
          animation: fadeInSlide 0.4s ease;
        }

        @media (max-width: 640px) {
          .testimonial-card {
            padding: 1.5rem 1.25rem 1.25rem;
          }
          .testimonial-quote-mark {
            font-size: 4rem;
            margin-bottom: var(--sp-sm);
          }
          .testimonial-text {
            font-size: 0.95rem;
            margin: var(--sp-sm) 0 var(--sp-md);
          }
        }

        @media (max-width: 380px) {
          .testimonial-card {
            padding: 1.25rem 0.85rem 1rem;
          }
        }

        @keyframes fadeInSlide {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .testimonial-quote-mark {
          font-family: Georgia, serif;
          font-size: 6rem;
          color: var(--accent);
          line-height: 0.6;
          margin-bottom: var(--sp-md);
          opacity: 0.6;
          user-select: none;
        }

        .testimonial-text {
          font-size: 1.0625rem;
          color: rgba(255,255,255,.88);
          line-height: 1.75;
          margin: var(--sp-md) 0 var(--sp-xl);
          font-style: italic;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: var(--sp-md);
        }

        .testimonial-avatar {
          width: 48px;
          height: 48px;
          background: var(--accent);
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 800;
          color: white;
          flex-shrink: 0;
        }

        .testimonial-name {
          font-weight: 700;
          color: var(--white);
          font-size: 0.9375rem;
        }

        .testimonial-location {
          font-size: 0.8125rem;
          color: rgba(255,255,255,.5);
        }

        /* Controls */
        .testimonial-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--sp-lg);
          margin-top: var(--sp-xl);
        }

        .testimonial-ctrl {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-full);
          background: rgba(255,255,255,.1);
          border: 1px solid rgba(255,255,255,.2);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background var(--transition-fast);
        }

        .testimonial-ctrl:hover {
          background: var(--accent);
          border-color: var(--accent);
        }

        .testimonial-dots {
          display: flex;
          gap: 0.5rem;
        }

        .testimonial-dot {
          width: 10px;
          height: 10px;
          border-radius: var(--radius-full);
          background: rgba(255,255,255,.3);
          transition: background var(--transition-fast), transform var(--transition-fast);
        }

        .testimonial-dot.active {
          background: var(--accent);
          transform: scale(1.3);
        }
      `}</style>
    </section>
  );
}
