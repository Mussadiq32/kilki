
import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="bg-royal-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
              <p className="text-xl text-royal-200 mb-8">
                Reach out to our expert team for all your real estate needs
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-royal-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
                <Phone className="mx-auto mb-4 text-gold-500" size={40} />
                <h3 className="text-xl font-semibold text-royal-800 mb-3">Call Us</h3>
                <p className="text-gray-600 mb-4">Our team is available to assist you</p>
                <a href="tel:+917006064587" className="text-gold-500 font-medium hover:underline">
                  +91 7006064587
                </a>
              </div>
              
              <div className="bg-royal-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
                <Mail className="mx-auto mb-4 text-gold-500" size={40} />
                <h3 className="text-xl font-semibold text-royal-800 mb-3">Email Us</h3>
                <p className="text-gray-600 mb-4">Send us your queries anytime</p>
                <a href="mailto:info@royalrealestate.com" className="text-gold-500 font-medium hover:underline">
                  info@royalrealestate.com
                </a>
              </div>
              
              <div className="bg-royal-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
                <MapPin className="mx-auto mb-4 text-gold-500" size={40} />
                <h3 className="text-xl font-semibold text-royal-800 mb-3">Visit Us</h3>
                <p className="text-gray-600 mb-4">Our office is centrally located</p>
                <address className="text-gold-500 font-medium not-italic">
                  190001 Residency Road, Srinagar<br />
                  Jammu & Kashmir, India
                </address>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-royal-800 mb-6 text-center">Send Us a Message</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                      placeholder="Property Inquiry"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                      placeholder="Please let us know how we can help you..."
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-6">
                      Send Message <Send className="ml-2" size={18} />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-royal-800 mb-8 text-center">Find Us</h2>
              <div className="h-[400px] bg-gray-200 rounded-lg overflow-hidden">
                <div className="w-full h-full rounded-lg bg-gray-300 flex items-center justify-center">
                  <div className="text-center p-6">
                    <MapPin className="mx-auto mb-4 text-gold-500" size={48} />
                    <p className="text-royal-800 opacity-70">190001 Residency Road, Srinagar<br />Jammu & Kashmir, India</p>
                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-gold-500 hover:underline mt-4 inline-block">
                      View on Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
