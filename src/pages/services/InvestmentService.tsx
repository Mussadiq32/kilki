
import React, { useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Mail, Phone, ArrowRight, BarChart, TrendingUp, Shield, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const InvestmentService = () => {
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Investment Advisory Services</h1>
              <p className="text-xl text-royal-200 mb-8">
                Strategic real estate investment guidance to maximize your returns
              </p>
              <Button className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-6">
                Schedule a Consultation <ArrowRight className="ml-2" size={18} />
              </Button>
            </div>
          </div>
        </section>

        {/* Investment Services Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-royal-800 mb-4">Comprehensive Investment Services</h2>
              <p className="text-gray-600">
                Our expert team provides tailored investment strategies for both new and experienced investors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: BarChart,
                  title: "Market Analysis",
                  description: "In-depth research and analysis of real estate market trends, property values, and investment opportunities."
                },
                {
                  icon: TrendingUp,
                  title: "Portfolio Management",
                  description: "Strategic management of your property portfolio to ensure optimal performance and returns."
                },
                {
                  icon: Shield,
                  title: "Risk Assessment",
                  description: "Thorough evaluation of potential risks and development of mitigation strategies for your investments."
                }
              ].map((service, index) => (
                <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <service.icon className="text-gold-500 mb-4" size={32} />
                  <h3 className="text-xl font-semibold text-royal-800 mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Investment Opportunities */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-royal-800 mb-4">Investment Opportunities</h2>
              <p className="text-gray-600">
                Explore diverse real estate investment options tailored to your financial goals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: "Residential Properties",
                  description: "Invest in high-value residential properties with strong rental yields and appreciation potential.",
                  features: [
                    "Premium apartments and villas",
                    "Holiday homes in tourist destinations",
                    "Residential plots in developing areas"
                  ]
                },
                {
                  title: "Commercial Properties",
                  description: "Secure stable returns with commercial property investments in prime locations.",
                  features: [
                    "Office spaces in business districts",
                    "Retail properties in high-traffic areas",
                    "Warehouse and industrial units"
                  ]
                },
                {
                  title: "Development Projects",
                  description: "Participate in lucrative real estate development projects from ground up.",
                  features: [
                    "Joint venture opportunities",
                    "Pre-construction investments",
                    "Land development projects"
                  ]
                },
                {
                  title: "REITs and Funds",
                  description: "Diversify your portfolio with real estate investment trusts and property funds.",
                  features: [
                    "Professionally managed property funds",
                    "Diversified real estate portfolios",
                    "Lower entry barrier investments"
                  ]
                }
              ].map((opportunity, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold text-royal-800 mb-3">{opportunity.title}</h3>
                  <p className="text-gray-600 mb-4">{opportunity.description}</p>
                  <ul className="space-y-2">
                    {opportunity.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="text-gold-500 mr-3 flex-shrink-0 mt-1" size={16} />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Invest with Us */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-royal-800 mb-4">Why Invest with Royal Group</h2>
              <p className="text-gray-600">
                Our proven track record and expert guidance ensure your investment success.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                "25+ years of market experience",
                "Expert team of investment advisors",
                "Exclusive access to premium properties",
                "Transparent investment process",
                "Continuous portfolio monitoring",
                "Tax and legal advisory services",
                "Customized investment strategies",
                "Long-term investment support"
              ].map((benefit, index) => (
                <div key={index} className="flex items-start p-4 col-span-1 md:col-span-2">
                  <Check className="text-gold-500 mr-3 flex-shrink-0 mt-1" size={18} />
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
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Ready to Grow Your Investment Portfolio?</h2>
                <p className="text-royal-200">
                  Schedule a consultation with our investment advisors today.
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

export default InvestmentService;
