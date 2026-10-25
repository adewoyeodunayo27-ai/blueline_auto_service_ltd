import PageHeader from '../components/PageHeader.jsx';
import Gallery from '../components/Gallery.jsx';
import { BUSINESS } from '../data/business.js';
import { FacebookIcon, InstagramIcon, TwitterIcon, LinkedinIcon } from '../components/SocialIcons.jsx';
import { Camera } from 'lucide-react';

export default function GalleryPage() {
  return (
    <div className="gallery-page">
      <PageHeader
        badge="VISUAL SHOWCASE"
        title="Our Workshop &"
        highlight="Gallery"
        subtitle="Explore our Doncaster workshop, clean detailing studio, recovery fleet, and recent customer handovers."
        breadcrumbs={[{ label: 'Gallery' }]}
      />

      {/* Main Gallery with lightbox */}
      <Gallery />

      {/* Social Follow Strip */}
      <section className="gallery-social-strip">
        <div className="container gss-inner">
          <div className="gss-icon">
            <Camera size={32} />
          </div>
          <div className="gss-text">
            <h2 className="gss-title">Follow Us for Daily Workshop Updates</h2>
            <p className="gss-sub">
              Check out behind-the-scenes transformations, newly arrived fleet vehicles, and customer testimonials on our social channels.
            </p>
          </div>
          <div className="gss-links">
            <a href={BUSINESS.social.instagram} target="_blank" rel="noopener noreferrer" className="social-pill" aria-label="Instagram">
              <InstagramIcon size={18} />
              <span>Instagram</span>
            </a>
            <a href={BUSINESS.social.facebook} target="_blank" rel="noopener noreferrer" className="social-pill" aria-label="Facebook">
              <FacebookIcon size={18} />
              <span>Facebook</span>
            </a>
            <a href={BUSINESS.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-pill" aria-label="LinkedIn">
              <LinkedinIcon size={18} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

      <style>{`
        .gallery-social-strip {
          background: #ffffff;
          padding: var(--sp-3xl) 0;
          border-top: 1px solid var(--grey-200);
        }
        .gss-inner {
          display: flex;
          align-items: center;
          gap: var(--sp-xl);
          flex-wrap: wrap;
        }
        .gss-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--blue-50);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .gss-text {
          flex: 1;
          min-width: 280px;
        }
        .gss-title {
          font-family: var(--font-display);
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--navy);
          margin-bottom: 0.35rem;
        }
        .gss-sub {
          font-size: 0.92rem;
          color: var(--grey-600);
        }
        .gss-links {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .social-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.1rem;
          background: var(--grey-100);
          border: 1px solid var(--grey-300);
          border-radius: 999px;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--grey-800);
          text-decoration: none;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .social-pill:hover {
          background: var(--accent);
          color: #ffffff;
          border-color: var(--accent);
        }
      `}</style>
    </div>
  );
}
