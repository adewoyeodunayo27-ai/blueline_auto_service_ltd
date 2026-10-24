import { useState, useEffect, useCallback, useRef } from 'react';
import { BUSINESS } from './data/business.js';

import Header         from './components/Header.jsx';
import Hero           from './components/Hero.jsx';
import Services       from './components/Services.jsx';
import About          from './components/About.jsx';
import Statistics     from './components/Statistics.jsx';
import Fleet          from './components/Fleet.jsx';
import PriceList      from './components/PriceList.jsx';
import Gallery        from './components/Gallery.jsx';
import Testimonials   from './components/Testimonials.jsx';
import QuoteForm      from './components/QuoteForm.jsx';
import BookingEnquiry from './components/BookingEnquiry.jsx';
import Contact        from './components/Contact.jsx';
import Footer         from './components/Footer.jsx';

import { MessageCircle, Phone, ChevronUp } from 'lucide-react';

// ── Scroll-reveal hook ───────────────────────────────────────
function useRevealOnScroll() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(el => {
          if (el.isIntersecting) {
            el.target.classList.add('revealed');
            observer.unobserve(el.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );
    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  });
}

// ── Back-to-top hook ─────────────────────────────────────────
function useBackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return visible;
}

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const backToTopVisible = useBackToTop();
  useRevealOnScroll();

  const openBooking  = useCallback(() => setBookingOpen(true),  []);
  const closeBooking = useCallback(() => setBookingOpen(false), []);

  const whatsappMsg = encodeURIComponent(
    'Hello Blueline Auto Services Ltd, I would like to enquire about your automotive services.'
  );
  const whatsappUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${whatsappMsg}`;

  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <Services />
        <About />
        <Statistics />
        <Fleet onBookingOpen={openBooking} />
        <PriceList />
        <Gallery />
        <Testimonials />
        <QuoteForm />
        <Contact />
      </main>
      <Footer />

      {/* Floating action buttons */}
      <div className="floating-buttons" aria-label="Quick contact actions">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="float-btn float-btn--whatsapp"
          aria-label="Chat on WhatsApp"
          data-tooltip="WhatsApp"
        >
          {/* WhatsApp icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.976-1.407A9.945 9.945 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.944 7.944 0 01-4.077-1.127l-.292-.174-3.012.85.851-2.933-.19-.302A7.969 7.969 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
          </svg>
        </a>
        <a
          href={`tel:${BUSINESS.phone}`}
          className="float-btn float-btn--phone"
          aria-label={`Call us on ${BUSINESS.phoneDisplay}`}
          data-tooltip="Call Us"
        >
          <Phone size={22} />
        </a>
      </div>

      {/* Back to top */}
      <button
        className={`back-to-top${backToTopVisible ? ' visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        tabIndex={backToTopVisible ? 0 : -1}
      >
        <ChevronUp size={20} />
      </button>

      {/* Booking enquiry modal */}
      <BookingEnquiry isOpen={bookingOpen} onClose={closeBooking} />
    </>
  );
}
