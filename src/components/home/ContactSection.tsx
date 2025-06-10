import { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import CustomButton from '../ui/CustomButton';
import { cn } from '@/lib/utils';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    city: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [floatingLabels, setFloatingLabels] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
    city: false
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create the email content
      const emailContent = `
        Name: ${formData.name}
        Email: ${formData.email}
        Phone: ${formData.phone}
        City: ${formData.city}
        Message: ${formData.message}
      `;

      // Send email using mailto link
      const mailtoLink = `mailto:info@royalgroupofrealestates.com?subject=Contact Form Submission&body=${encodeURIComponent(emailContent)}`;
      window.open(mailtoLink, '_blank');

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        city: ''
      });
      
      alert('Thank you for your message. Your email client will open to send the message.');
    } catch (error) {
      alert('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const contactInfo = [
    {
      icon: <Phone size={20} className="text-gold-500" />,
      title: 'Call Us',
      content: '+91 700-606-4587',
      link: 'tel:+917006064587',
      type: 'phone'
    },
    {
      icon: <Mail size={20} className="text-gold-500" />,
      title: 'Email Us',
      content:'info@royalgroupofrealestates.com',
      link:'mailto:info@royalgroupofrealestates.com',
      type: 'email'
    },
    {
      icon: <MapPin size={20} className="text-gold-500" />,
      title: 'Visit Us',
      content: 'Residency Road, Srinagar, J&K, India',
      link: 'https://maps.google.com',
      type: 'map'
    }
  ];

  return (
    <section id="contact" className="section-padding bg-royal-50/50">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Form */}
          <div className="animate-fade-right backdrop-blur-sm bg-white/50 p-8 rounded-2xl shadow-lg border border-royal-100/20">
            <div className="inline-block px-3 py-1 bg-gold-100 text-gold-600 text-sm font-medium rounded-full mb-4 transform hover:scale-105 transition-transform duration-300">
              Contact Us
            </div>
            <h2 className="heading-lg text-royal-800 mb-6">
              Get In <span className="text-gradient animate-pulse">Touch</span> With Us
            </h2>
            <p className="text-royal-600 mb-8">
              Have questions about our properties or services? Fill out the form below and our team will get back to you promptly.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-royal-700 mb-2">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => {
                        setFocusedInput('name');
                        setFloatingLabels(prev => ({ ...prev, name: true }));
                      }}
                      onBlur={() => {
                        setFocusedInput(null);
                        if (!formData.name) {
                          setFloatingLabels(prev => ({ ...prev, name: false }));
                        }
                      }}
                      className={cn(
                        'w-full px-4 py-3 bg-white/80 border border-royal-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-300',
                        focusedInput === 'name' ? 'border-gold-500' : ''
                      )}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-royal-700 mb-2">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => {
                        setFocusedInput('email');
                        setFloatingLabels(prev => ({ ...prev, email: true }));
                      }}
                      onBlur={() => {
                        setFocusedInput(null);
                        if (!formData.email) {
                          setFloatingLabels(prev => ({ ...prev, email: false }));
                        }
                      }}
                      className={cn(
                        'w-full px-4 py-3 bg-white/80 border border-royal-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-300',
                        focusedInput === 'email' ? 'border-gold-500' : ''
                      )}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-royal-700 mb-2">Phone Number</label>
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => {
                      setFocusedInput('phone');
                      setFloatingLabels(prev => ({ ...prev, phone: true }));
                    }}
                    onBlur={() => {
                      setFocusedInput(null);
                      if (!formData.phone) {
                        setFloatingLabels(prev => ({ ...prev, phone: false }));
                      }
                    }}
                    className={cn(
                      'w-full px-4 py-3 bg-white/80 border border-royal-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-300',
                      focusedInput === 'phone' ? 'border-gold-500' : ''
                    )}
                    placeholder="+91 XXXXX-XXXXX"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-royal-700 mb-2">Message</label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => {
                      setFocusedInput('message');
                      setFloatingLabels(prev => ({ ...prev, message: true }));
                    }}
                    onBlur={() => {
                      setFocusedInput(null);
                      if (!formData.message) {
                        setFloatingLabels(prev => ({ ...prev, message: false }));
                      }
                    }}
                    className={cn(
                      'w-full px-4 py-3 bg-white/80 border border-royal-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-300 min-h-[120px] resize-none',
                      focusedInput === 'message' ? 'border-gold-500' : ''
                    )}
                    placeholder="Your message here..."
                    required
                  ></textarea>
                </div>
              </div>
              
              <div className="flex justify-end">
                <CustomButton
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-3 rounded-lg flex items-center space-x-2 transform hover:scale-105 transition-all duration-300"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <Send size={18} className="ml-2" />
                    </>
                  )}
                </CustomButton>
              </div>
            </form>
          </div>
          
          {/* Right Column - Contact Info */}
          <div className="space-y-8">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-royal-100/20 group"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-gold-50 p-3 rounded-lg group-hover:bg-gold-100 transition-colors duration-300">
                    {info.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-royal-800 mb-1">{info.title}</h3>
                    <p className="text-royal-600 break-words">{info.content}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
