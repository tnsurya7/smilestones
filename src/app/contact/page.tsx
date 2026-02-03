import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/forms/ContactForm';
import FloatingButtons from '@/components/ui/FloatingButtons';

export const metadata: Metadata = {
  title: 'Contact Us - Smilestones Child Development Centre',
  description: 'Get in touch with Smilestones for child development services. Book a consultation for autism therapy, speech therapy, ABA therapy, and more in Chennai and Puducherry.',
  keywords: 'contact smilestones, book appointment, child development consultation, Chennai, Puducherry, autism therapy appointment',
};

export default function ContactPage() {
  return (
    <main>
      <Header />
      <ContactForm />
      <FloatingButtons />
      <Footer />
    </main>
  );
}