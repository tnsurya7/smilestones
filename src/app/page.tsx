import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import MissionVision from '@/components/sections/MissionVision';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import Testimonials from '@/components/sections/Testimonials';
import FloatingButtons from '@/components/ui/FloatingButtons';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <MissionVision />
      <WhyChooseUs />
      <Testimonials />
      <FloatingButtons />
      <Footer />
    </main>
  );
}
