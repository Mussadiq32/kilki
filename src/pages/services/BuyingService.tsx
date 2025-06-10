import React, { useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Mail, Phone, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const BuyingService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-royal-800 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Expert Property Buying Services</h1>
              <p className="text-xl text-royal-200 mb-8">
                Let us guide you through every step of your property buying journey
              </p>
              <Button 
                className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-6"
                onClick={() => window.open('/contact', '_blank')}
              >
                Contact Us Today <ArrowRight className="ml-2" size={18} />
              </Button>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-royal-800 mb-4">How We Help You Find Your Dream Property</h2>
              <p className="text-gray-600">
                Our comprehensive buying services ensure you find the perfect property that meets all your requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Property Search",
                  description: "Access to exclusive properties and comprehensive market research to find your ideal home."
                },
                {
                  title: "Negotiation Support",
                  description: "Expert negotiation to help you secure the best possible price and terms for your new property."
                },
                {
                  title: "Legal Assistance",
                  description: "Complete legal support throughout the buying process, ensuring all documentation is perfect."
                }
              ].map((service, index) => (
                <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold text-royal-800 mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-royal-800 mb-4">Benefits of Our Buying Service</h2>
              <p className="text-gray-600">
                Discover why clients choose Royal Group as their trusted partner for property acquisition.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                "Access to exclusive off-market properties",
                "Personalized property matching based on your needs",
                "Expert local market knowledge and insights",
                "Time-saving property shortlisting process",
                "Professional price evaluation and negotiation",
                "Complete support from search to final handover"
              ].map((benefit, index) => (
                <div key={index} className="flex items-start p-4">
                  <Check className="text-gold-500 mr-3 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-royal-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Ready to Find Your Dream Property?</h2>
                <p className="text-royal-200">
                  Contact our expert team today to begin your property buying journey.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:+917006064587" className="inline-flex items-center justify-center gap-2 bg-white text-royal-800 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors">
                  <Phone size={18} />
                  Call Us
                </a>
                <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-white px-6 py-3 rounded-md font-medium transition-colors">
                  <Mail size={18} />
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BuyingService;
