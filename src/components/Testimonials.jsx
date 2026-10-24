import { useState, useEffect, useRef, useCallback } from 'react';
import { BUSINESS } from '../data/business.js';
import { ChevronLeft, ChevronRight, Star, Info } from 'lucide-react';

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
  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);
  const intervalRef = useRef(null);
  const reviews = BUSINESS.testimonials;
  const count   = reviews.length;

  const next = useCallback(() => setCurrent(c => (c + 1) % count), [count]);
  const prev = useCallback(() => setCurrent(c => (c - 1 + count) % count), [count]);

  // Auto-rotation
  useEffect(() => {
    if (paused) { clearInterval(intervalRef.current); return; }
    intervalRef.current = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(intervalRef.current);
  }, [paused, next]);

  return (
    <section
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
          <div className="testimonials-notice reveal">
            <Info size={13} aria-hidden="true" />
            Sample reviews shown for illustrative purposes. Replace with genuine verified customer reviews.
          </div>
        </header>

        <div className="testimonials-carousel" aria-live="polite" aria-atomic="true">
          <div className="testimonial-card reveal" key={current}>
            <div className="testimonial-quote-mark">"</div>
            <StarRating rating={reviews[current].rating} />
            <blockquote className="testimonial-text">
              {reviews[current].text}
            </blockquote>
            <div className="testimonial-author">
              <div className="testimonial-avatar" aria-hidden="true">
                {reviews[current].name.charAt(0)}
              </div>
              <div>
                <p className="testimonial-name">{reviews[current].name}</p>
                <p className="testimonial-location">{reviews[current].location}</p>
              </div>
            </div>
          </div>

          {/* Controls */}
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
        </div>
      </div>

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

        .testimonials-notice {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          color: rgba(255,255,255,.4);
          font-style: italic;
          margin-top: var(--sp-sm);
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
