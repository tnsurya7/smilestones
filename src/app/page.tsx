import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import MissionVision from '@/components/sections/MissionVision';
import About from '@/components/sections/About';
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
      <WhyChooseUs />
      <Testimonials />
      <FloatingButtons />
      <Footer />
    </main>
  );
}
