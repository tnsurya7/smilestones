import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import MissionVision from '@/components/sections/MissionVision';
import Philosophy from '@/components/sections/Philosophy';
import OurApproach from '@/components/sections/OurApproach';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import Testimonials from '@/components/sections/Testimonials';
import FloatingButtons from '@/components/ui/FloatingButtons';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <MissionVision />
      <Philosophy />
      <OurApproach />
      <WhyChooseUs />
      <Testimonials />
      <FloatingButtons />
      <Footer />
    </main>
  );
}
