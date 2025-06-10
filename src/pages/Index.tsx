import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import CitiesSection from '../components/home/CitiesSection';
import FeaturedProperties from '../components/home/FeaturedProperties';
import PremiumProperties from '../components/home/PremiumProperties';
import AboutSection from '../components/home/AboutSection';
import ServicesSection from '../components/home/ServicesSection';
import WhyChooseUsSection from '../components/home/WhyChooseUsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import ContactSection from '../components/home/ContactSection';
import CeoMessage from '../components/home/CeoMessage';
import Footer from '../components/layout/Footer';
import WhatsAppButton from '../components/ui/WhatsAppButton';
import MortgageCalculator from '../components/home/MortgageCalculator';

const Index = () => {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <CitiesSection />
        <FeaturedProperties />
        <PremiumProperties />
        <CeoMessage />
        <AboutSection />
        <ServicesSection />
        <WhyChooseUsSection />
        <MortgageCalculator />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton phoneNumber="+917006064587" />
    </div>
  );
};

export default Index;
