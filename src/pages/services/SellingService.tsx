
import React, { useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Mail, Phone, ArrowRight, Check, BadgePercent, TrendingUp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const SellingService = () => {
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Professional Property Selling Services</h1>
              <p className="text-xl text-royal-200 mb-8">
                Get the best value for your property with our expert marketing and negotiation
              </p>
              <Button className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-6">
                List Your Property Today <ArrowRight className="ml-2" size={18} />
              </Button>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-royal-800 mb-4">Our Premium Selling Services</h2>
              <p className="text-gray-600">
                We provide comprehensive support to maximize your property's value and ensure a smooth selling process.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
                <BadgePercent className="mx-auto mb-4 text-gold-500" size={48} />
                <h3 className="text-xl font-semibold text-royal-800 mb-3">Strategic Pricing</h3>
                <p className="text-gray-600">Expert market analysis to set the optimal price for your property.</p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
                <TrendingUp className="mx-auto mb-4 text-gold-500" size={48} />
                <h3 className="text-xl font-semibold text-royal-800 mb-3">Premium Marketing</h3>
                <p className="text-gray-600">Professional photography, virtual tours, and targeted marketing campaigns.</p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
                <Shield className="mx-auto mb-4 text-gold-500" size={48} />
                <h3 className="text-xl font-semibold text-royal-800 mb-3">Legal Protection</h3>
                <p className="text-gray-600">Complete legal assistance to ensure a secure and compliant transaction.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-royal-800 mb-4">Our Selling Process</h2>
              <p className="text-gray-600">
                A straightforward, professional approach to selling your property
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {[
                {
                  step: "1",
                  title: "Property Evaluation",
                  description: "We conduct a thorough assessment of your property to determine its optimal market value."
                },
                {
                  step: "2",
                  title: "Marketing Strategy",
                  description: "We develop a customized marketing plan tailored to highlight your property's unique features."
                },
                {
                  step: "3",
                  title: "Property Listing",
                  description: "Your property is professionally photographed and listed on premium platforms for maximum exposure."
                },
                {
                  step: "4",
                  title: "Buyer Screening",
                  description: "We carefully vet potential buyers to ensure serious offers and smooth transactions."
                },
                {
                  step: "5",
                  title: "Negotiation & Closing",
                  description: "Expert negotiation to secure the best deal and comprehensive support through closing."
                }
              ].map((process, index) => (
                <div key={index} className="flex flex-col md:flex-row items-start mb-8 p-6 bg-white rounded-lg shadow-sm">
                  <div className="bg-royal-800 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                    {process.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-royal-800 mb-2">{process.title}</h3>
                    <p className="text-gray-600">{process.description}</p>
                  </div>
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
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Ready to Sell Your Property?</h2>
                <p className="text-royal-200">
                  Contact our expert team today for a free property valuation.
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

export default SellingService;
