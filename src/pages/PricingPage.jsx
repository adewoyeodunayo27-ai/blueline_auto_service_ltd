import PageHeader from '../components/PageHeader.jsx';
import PriceList from '../components/PriceList.jsx';
import QuoteForm from '../components/QuoteForm.jsx';
import { BUSINESS } from '../data/business.js';
import { ShieldCheck, CheckCircle2, HelpCircle, PhoneCall, ArrowRight } from 'lucide-react';

const FAQS = [
  {
    q: 'Are your quotes completely free with no obligation?',
    a: 'Yes, 100%. We provide transparent, itemised estimates before any work begins, so you always know exactly what you are paying for.',
  },
  {
    q: 'Do your prices include UK parts and labour?',
    a: 'All our quoted service prices include standard parts, labour, disposal fees, and VAT where applicable. There are no hidden surcharges.',
  },
  {
    q: 'Do you offer warranty on repairs and servicing?',
    a: 'Yes. All replacement parts and mechanical labour carried out by Blueline Auto Services Ltd come with full workmanship guarantees and manufacturer part warranties.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major UK debit and credit cards, contactless payments, bank transfers, and cash at our Doncaster counter.',
  },
];

export default function PricingPage() {
  return (
    <div className="pricing-page">
      <PageHeader
        badge="FAIR & TRANSPARENT"
        title="Clear & Upfront"
        highlight="Price List"
        subtitle="Transparent pricing in British pounds (£) across all vehicle servicing, MOT preparation, recovery, and valeting packages."
        breadcrumbs={[{ label: 'Price List' }]}
      />

      {/* ── Main Price List Component ── */}
      <PriceList />

      {/* ── What's Included Assurance ── */}
      <section className="section section--grey pricing-assurances" aria-labelledby="assurances-heading">
        <div className="container">
          <header className="section__header reveal">
            <span className="section__eyebrow">The Blueline Standard</span>
            <h2 id="assurances-heading" className="section__title">
              What Is Included in Every <span className="highlight">Service</span>
            </h2>
            <div className="divider" />
          </header>

          <div className="assurances-columns reveal">
            <div className="assurance-box">
              <CheckCircle2 size={24} className="box-icon" />
              <h3>Free 20-Point Visual Health Check</h3>
              <p>We check fluid levels, tyre treads, brake condition, lights, and wipers on every vehicle coming through our workshop.</p>
            </div>
            <div className="assurance-box">
              <CheckCircle2 size={24} className="box-icon" />
              <h3>OEM-Equivalent Parts & Lubricants</h3>
              <p>We only use high-grade manufacturer specification engine oils, filters, and components to protect your vehicle's warranty.</p>
            </div>
            <div className="assurance-box">
              <CheckCircle2 size={24} className="box-icon" />
              <h3>Digital Diagnostic Scan & Printout</h3>
              <p>State-of-the-art diagnostic computer scanning with clear fault explanation so you understand your car's true health.</p>
            </div>
            <div className="assurance-box">
              <CheckCircle2 size={24} className="box-icon" />
              <h3>12-Month / 12,000-Mile Guarantee</h3>
              <p>Full warranty on all fitted parts and mechanical labour for complete peace of mind on British roads.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Custom Quote Form Section ── */}
      <QuoteForm />

      {/* ── Frequently Asked Questions ── */}
      <section className="section faq-section" aria-labelledby="faq-heading">
        <div className="container">
          <header className="section__header reveal">
            <span className="section__eyebrow">Got Questions?</span>
            <h2 id="faq-heading" className="section__title">
              Pricing & Quotation <span className="highlight">FAQs</span>
            </h2>
            <div className="divider" />
          </header>

          <div className="faq-grid reveal">
            {FAQS.map((faq) => (
              <div key={faq.q} className="faq-card">
                <div className="faq-q-row">
                  <HelpCircle size={20} className="faq-icon" />
                  <h3 className="faq-question">{faq.q}</h3>
                </div>
                <p className="faq-answer">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="faq-footer reveal">
            <p>Have a custom query or fleet requirement?</p>
            <a href={`tel:${BUSINESS.phone}`} className="btn btn--outline-blue">
              <PhoneCall size={16} />
              <span>Call our team on {BUSINESS.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>

      <style>{`
        .pricing-assurances {
          padding: var(--sp-4xl) 0;
        }
        .assurances-columns {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--sp-lg);
        }
        .assurance-box {
          background: #ffffff;
          border-radius: var(--radius-lg);
          padding: 1.75rem 1.5rem;
          border: 1px solid var(--grey-200);
          box-shadow: var(--shadow-sm);
        }
        .box-icon {
          color: var(--accent);
          margin-bottom: 0.85rem;
        }
        .assurance-box h3 {
          font-family: var(--font-display);
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--navy);
          margin-bottom: 0.5rem;
        }
        .assurance-box p {
          font-size: 0.85rem;
          color: var(--grey-600);
          line-height: 1.55;
        }

        /* FAQ Section */
        .faq-section {
          padding: var(--sp-4xl) 0;
          background: #ffffff;
        }
        .faq-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--sp-lg);
          max-width: 980px;
          margin: 0 auto var(--sp-2xl);
        }
        .faq-card {
          background: var(--grey-100);
          border-radius: var(--radius-lg);
          padding: 1.75rem;
          border: 1px solid var(--grey-200);
        }
        .faq-q-row {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .faq-icon {
          color: var(--accent);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .faq-question {
          font-family: var(--font-display);
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--navy);
          line-height: 1.35;
        }
        .faq-answer {
          font-size: 0.875rem;
          color: var(--grey-700);
          line-height: 1.6;
          padding-left: 2rem;
        }
        .faq-footer {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          text-align: center;
        }
        .faq-footer p {
          font-size: 0.95rem;
          color: var(--grey-600);
          font-weight: 500;
        }

        @media (max-width: 1024px) {
          .assurances-columns { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .faq-grid { grid-template-columns: 1fr; }
          .faq-answer { padding-left: 0; }
        }
        @media (max-width: 600px) {
          .assurances-columns { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
