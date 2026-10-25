import { useState, useEffect, useCallback } from 'react';
import { GALLERY_IMAGES, GALLERY_CATEGORIES } from '../data/fleet.js';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIdx,    setLightboxIdx]    = useState(null);

  const filtered = activeCategory === 'All'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(img => img.category === activeCategory);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setLightboxIdx(null);
  };

  const openLightbox  = (idx) => setLightboxIdx(idx);
  const closeLightbox = useCallback(() => setLightboxIdx(null), []);

  const prevImage = useCallback(() =>
    setLightboxIdx(i => (i - 1 + filtered.length) % filtered.length), [filtered.length]);

  const nextImage = useCallback(() =>
    setLightboxIdx(i => (i + 1) % filtered.length), [filtered.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIdx === null) return;
    const handler = (e) => {
      if (e.key === 'Escape')     closeLightbox();
      if (e.key === 'ArrowLeft')  prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [lightboxIdx, closeLightbox, prevImage, nextImage]);

  // Prevent body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxIdx !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIdx]);

  const activeLightboxItem = lightboxIdx !== null ? filtered[lightboxIdx] : null;

  return (
    <section id="gallery" className="section gallery-section" aria-labelledby="gallery-title">
      <div className="container">
        <header className="section__header reveal">
          <span className="section__eyebrow">Gallery</span>
          <h2 id="gallery-title" className="section__title">
            Our Work <span className="highlight">in Pictures</span>
          </h2>
          <div className="divider" />
          <p className="section__subtitle" style={{ marginTop: 'var(--sp-md)' }}>
            A visual showcase of the automotive services we provide. Click any image to enlarge.
          </p>
        </header>

        {/* Filter tabs */}
        <div className="filter-tabs" role="tablist" aria-label="Filter gallery by category">
          {GALLERY_CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`filter-tab${activeCategory === cat ? ' active' : ''}`}
              onClick={() => handleCategoryChange(cat)}
              role="tab"
              aria-selected={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="gallery-grid" role="list">
          {filtered.map((img, idx) => (
            <button
              key={img.id}
              className="gallery-item"
              onClick={() => openLightbox(idx)}
              aria-label={`Open ${img.caption} in lightbox`}
              role="listitem"
            >
              <img
                src={img.src}
                alt={img.caption}
                className="gallery-img"
                loading="lazy"
                onError={e => {
                  if (e.currentTarget.dataset.fallbackTried) return;
                  e.currentTarget.dataset.fallbackTried = 'true';
                  e.currentTarget.src = '/hero-car.jpg';
                }}
              />
              <div className="gallery-item-overlay">
                <span className="gallery-item-caption">{img.caption}</span>
                <span className="gallery-item-category">{img.category}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {activeLightboxItem && (
        <div
          className="lightbox-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          onClick={e => e.target === e.currentTarget && closeLightbox()}
        >
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Close lightbox">
            <X size={20} />
          </button>
          <button className="lightbox-btn lightbox-btn--prev" onClick={prevImage} aria-label="Previous image">
            <ChevronLeft size={22} />
          </button>
          <div className="lightbox-inner">
            <img
              src={activeLightboxItem.src}
              alt={activeLightboxItem.caption}
              key={lightboxIdx}
              onError={e => {
                if (e.currentTarget.dataset.fallbackTried) return;
                e.currentTarget.dataset.fallbackTried = 'true';
                e.currentTarget.src = '/hero-car.jpg';
              }}
            />
            <p className="lightbox-caption">
              {activeLightboxItem.caption} · {lightboxIdx + 1} / {filtered.length}
            </p>
          </div>
          <button className="lightbox-btn lightbox-btn--next" onClick={nextImage} aria-label="Next image">
            <ChevronRight size={22} />
          </button>
        </div>
      )}

      <style>{`
        .gallery-section { background: var(--white); }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 220px;
          gap: var(--sp-sm);
        }

        @media (max-width: 1024px) {
          .gallery-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 640px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 170px; }
        }
        @media (max-width: 380px) {
          .gallery-grid { grid-template-columns: 1fr; }
        }

        .gallery-item {
          position: relative;
          overflow: hidden;
          border-radius: var(--radius-md);
          cursor: pointer;
          background: var(--grey-200);
          display: block;
          width: 100%;
          height: 100%;
          padding: 0;
          border: none;
          animation: galleryFade 0.35s ease-out;
        }

        @keyframes galleryFade {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .gallery-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.45s ease;
        }

        .gallery-item:hover .gallery-img,
        .gallery-item:focus-visible .gallery-img {
          transform: scale(1.07);
        }

        .gallery-item-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(13,27,62,.75) 0%, transparent 55%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: var(--sp-md);
          opacity: 0;
          transition: opacity var(--transition);
        }

        .gallery-item:hover .gallery-item-overlay,
        .gallery-item:focus-visible .gallery-item-overlay {
          opacity: 1;
        }

        .gallery-item-caption {
          color: white;
          font-size: 0.875rem;
          font-weight: 600;
          line-height: 1.3;
        }

        .gallery-item-category {
          color: var(--blue-300);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          margin-top: 0.2rem;
        }
      `}</style>
    </section>
  );
}
