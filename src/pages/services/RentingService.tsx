import React, { useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Mail, Phone, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const RentingService = () => {
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Professional Rental Services</h1>
              <p className="text-xl text-royal-200 mb-8">
                Find your perfect rental property or let us manage your investment
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

        {/* Renting Services Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-royal-800 mb-4">Comprehensive Rental Services</h2>
              <p className="text-gray-600">
                Whether you're looking to rent a property or need help managing your rental investment, we have you covered.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-royal-800 mb-4">For Tenants</h3>
                <ul className="space-y-3">
                  {[
                    "Access to exclusive rental properties across Kashmir",
                    "Personalized property matching based on your requirements",
                    "Detailed property viewings and information",
                    "Assistance with lease agreements and paperwork",
                    "Support throughout your tenancy period"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="text-gold-500 mr-3 flex-shrink-0 mt-1" size={18} />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-royal-800 mb-4">For Property Owners</h3>
                <ul className="space-y-3">
                  {[
                    "Comprehensive property management services",
                    "Tenant screening and selection process",
                    "Regular property inspections and maintenance",
                    "Rent collection and financial reporting",
                    "Legal compliance and documentation handling"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="text-gold-500 mr-3 flex-shrink-0 mt-1" size={18} />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-royal-800 mb-4">Why Choose Our Rental Services</h2>
              <p className="text-gray-600">
                Experience the Royal Group difference in rental property services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: "Market Expertise",
                  description: "Deep understanding of the local rental market trends and property values."
                },
                {
                  title: "Dedicated Support",
                  description: "Personalized assistance throughout your entire rental journey."
                },
                {
                  title: "Transparent Process",
                  description: "Clear communication and full transparency in all our dealings."
                }
              ].map((benefit, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
                  <h3 className="text-xl font-semibold text-royal-800 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-royal-800 mb-4">Our Rental Process</h2>
              <p className="text-gray-600">
                A simple, efficient approach to help you rent or let property
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                {
                  step: "01",
                  title: "Consultation",
                  description: "We discuss your requirements and preferences in detail."
                },
                {
                  step: "02",
                  title: "Property Selection",
                  description: "We curate a selection of properties that match your criteria."
                },
                {
                  step: "03",
                  title: "Viewings",
                  description: "Arrange viewings of shortlisted properties at your convenience."
                },
                {
                  step: "04",
                  title: "Agreement",
                  description: "Handle all paperwork and finalize the rental agreement."
                }
              ].map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-royal-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center h-full">
                    <div className="inline-block bg-gold-500 text-white rounded-full w-10 h-10 flex items-center justify-center mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-semibold text-royal-800 mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                      <ArrowRight className="text-gray-300" size={24} />
                    </div>
                  )}
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
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Ready to Rent or Let a Property?</h2>
                <p className="text-royal-200">
                  Contact our expert rental team today to get started.
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

export default RentingService;
