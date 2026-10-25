import PageHeader from '../components/PageHeader.jsx';
import Contact from '../components/Contact.jsx';
import { BUSINESS } from '../data/business.js';

export default function ContactPage() {
  return (
    <div className="contact-page">
      <PageHeader
        badge="GET IN TOUCH"
        title="Contact Blueline"
        highlight="Auto Services"
        subtitle="Located at 65 Watch House Lane, Doncaster, DN5 9LY. Reach out by phone, WhatsApp, email, or send us a message below."
        breadcrumbs={[{ label: 'Contact Us' }]}
        showActions={false}
      />

      {/* Main Contact Section with interactive map, business details, and validated enquiry form */}
      <Contact />
    </div>
  );
}
