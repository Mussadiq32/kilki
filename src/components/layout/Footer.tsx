import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ChevronRight, Home, Users, Building2, Wrench, MessageCircle, Star, Zap, ArrowRight } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMountain, FaCity, FaBuilding, FaLandmark, FaTree, FaCrown, FaCode, FaHeart, FaRocket, FaShieldAlt, FaChartLine, FaHandshake } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { 
      name: 'Home', 
      link: '/', 
      icon: <Home size={16} />,
      description: 'Back to homepage',
      gradient: 'from-blue-400 to-blue-600',
      bgGradient: 'from-blue-500/20 to-blue-600/20'
    },
    { 
      name: 'About Us', 
      link: '/about', 
      icon: <Users size={16} />,
      description: 'Our story & mission',
      gradient: 'from-purple-400 to-purple-600',
      bgGradient: 'from-purple-500/20 to-purple-600/20'
    },
    { 
      name: 'Properties', 
      link: '/properties', 
      icon: <Building2 size={16} />,
      description: 'Browse listings',
      gradient: 'from-green-400 to-green-600',
      bgGradient: 'from-green-500/20 to-green-600/20'
    },
    { 
      name: 'Services', 
      link: '/services', 
      icon: <Wrench size={16} />,
      description: 'What we offer',
      gradient: 'from-orange-400 to-orange-600',
      bgGradient: 'from-orange-500/20 to-orange-600/20'
    },
    { 
      name: 'Contact', 
      link: '/contact', 
      icon: <MessageCircle size={16} />,
      description: 'Get in touch',
      gradient: 'from-red-400 to-red-600',
      bgGradient: 'from-red-500/20 to-red-600/20'
    }
  ];
  
  const services = [
    { 
      name: 'Residential Properties', 
      link: '/properties?type=residential', 
      icon: <FaBuilding size={16} />,
      description: 'Homes & apartments',
      gradient: 'from-emerald-400 to-emerald-600',
      bgGradient: 'from-emerald-500/20 to-emerald-600/20'
    },
    { 
      name: 'Commercial Properties', 
      link: '/properties?type=commercial', 
      icon: <FaCity size={16} />,
      description: 'Office & retail spaces',
      gradient: 'from-blue-400 to-blue-600',
      bgGradient: 'from-blue-500/20 to-blue-600/20'
    },
    { 
      name: 'Property Management', 
      link: '/services/property-management', 
      icon: <FaShieldAlt size={16} />,
      description: 'Full-service management',
      gradient: 'from-purple-400 to-purple-600',
      bgGradient: 'from-purple-500/20 to-purple-600/20'
    },
    { 
      name: 'Investment Advisory', 
      link: '/services/investment', 
      icon: <FaChartLine size={16} />,
      description: 'Smart investment guidance',
      gradient: 'from-amber-400 to-amber-600',
      bgGradient: 'from-amber-500/20 to-amber-600/20'
    },
    { 
      name: 'Legal Assistance', 
      link: '/services/legal', 
      icon: <FaHandshake size={16} />,
      description: 'Legal support & compliance',
      gradient: 'from-rose-400 to-rose-600',
      bgGradient: 'from-rose-500/20 to-rose-600/20'
    }
  ];
  
  const cities = [
    { 
      name: 'Srinagar', 
      link: '/properties?location=srinagar',
      icon: <FaMountain size={14} />,
      description: 'Kashmir Valley',
      color: 'from-blue-400 to-blue-600'
    },
    { 
      name: 'Jammu', 
      link: '/properties?location=jammu',
      icon: <FaLandmark size={14} />,
      description: 'Temple City',
      color: 'from-orange-400 to-orange-600'
    },
    { 
      name: 'Chandigarh', 
      link: '/properties?location=chandigarh',
      icon: <FaTree size={14} />,
      description: 'City Beautiful',
      color: 'from-green-400 to-green-600'
    },
    { 
      name: 'Delhi', 
      link: '/properties?location=delhi',
      icon: <FaBuilding size={14} />,
      description: 'Capital City',
      color: 'from-red-400 to-red-600'
    },
    { 
      name: 'Bangalore', 
      link: '/properties?location=bangalore',
      icon: <FaCity size={14} />,
      description: 'IT Hub',
      color: 'from-purple-400 to-purple-600'
    },
    { 
      name: 'Hyderabad', 
      link: '/properties?location=hyderabad',
      icon: <FaBuilding size={14} />,
      description: 'Pearl City',
      color: 'from-pink-400 to-pink-600'
    },
    { 
      name: 'Ahmedabad', 
      link: '/properties?location=ahmedabad',
      icon: <FaLandmark size={14} />,
      description: 'Manchester of India',
      color: 'from-yellow-400 to-yellow-600'
    },
    { 
      name: 'Gurgaon', 
      link: '/properties?location=gurgaon',
      icon: <FaCity size={14} />,
      description: 'Millennium City',
      color: 'from-indigo-400 to-indigo-600'
    },
    { 
      name: 'Mumbai', 
      link: '/properties?location=mumbai',
      icon: <FaBuilding size={14} />,
      description: 'City of Dreams',
      color: 'from-teal-400 to-teal-600'
    }
  ];
  
  const socialLinks = [
    { name: 'Facebook', icon: <FaFacebookF size={18} />, link: 'https://www.facebook.com/share/1AbhQzXNjG/?mibextid=qi2Omg' },
    { name: 'Twitter', icon: <FaTwitter size={18} />, link: 'https://twitter.com/royalgroupreal' },
    { name: 'Instagram', icon: <FaInstagram size={18} />, link: 'https://www.instagram.com/royalgrouprealestate' },
    { name: 'LinkedIn', icon: <FaLinkedinIn size={18} />, link: 'https://www.linkedin.com/company/royal-group-real-estate' }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="bg-gradient-to-br from-royal-900 via-royal-800 to-royal-900 text-white relative overflow-hidden backdrop-blur-md py-12 sm:py-16 lg:py-20">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,#1f2937_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-5" />
      <motion.div 
        className="container mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Company Info */}
          <motion.div 
            variants={itemVariants} 
            className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden"
          >
            {/* Floating Elements (reduced and simplified) */}
            <div className="absolute top-4 right-4 w-4 h-4 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full opacity-10 animate-pulse" />
            <div className="absolute bottom-4 left-4 w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-15 animate-bounce" style={{ animationDelay: '0.2s' }} />
            
            <div className="relative z-10">
              {/* Enhanced Logo */}
              <motion.a 
                href="/" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center group mb-6"
                whileHover={{ scale: 1.02 }}
              >
                <div className="p-2.5 bg-gradient-to-r from-gold-400 to-gold-600 rounded-lg shadow-lg mr-3 group-hover:shadow-xl transition-all duration-300">
                  <FaCrown size={22} className="text-white" />
                </div>
                <div>
                  <span className="font-display text-2xl font-bold tracking-tight text-white group-hover:text-gold-400 transition-colors duration-300">
                    Royal<span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">Group</span>
                  </span>
                  <div className="flex items-center mt-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse mr-1.5" />
                    <span className="text-xs text-royal-100/70">Premium Real Estate</span>
                  </div>
                </div>
              </motion.a>
              
              {/* Company Description */}
              <div className="bg-white/5 p-4 rounded-lg border border-white/10 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="p-1.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg">
                    <FaBuilding size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="text-royal-100/90 leading-relaxed text-sm">
                      Premium real estate solutions across India's major cities. Building excellence in real estate since 2012.
                    </p>
                    <div className="flex items-center mt-2">
                      <Star className="w-3 h-3 text-gold-400 mr-1" />
                      <span className="text-xs text-royal-100/60">Trusted by 10,000+ clients</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Information */}
              <div className="space-y-4 text-sm">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full shadow-md">
                    <Mail size={16} className="text-white" />
                  </div>
                  <a href="mailto:info@royalgroupofrealestates.com" className="text-white/90 hover:text-gold-300 transition-colors duration-300">info@royalgroupofrealestates.com</a>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full shadow-md">
                    <Phone size={16} className="text-white" />
                  </div>
                  <a href="tel:+917006064587" className="text-white/90 hover:text-gold-300 transition-colors duration-300">+91 7006064587</a>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full shadow-md">
                    <MapPin size={16} className="text-white" />
                  </div>
                  <span className="text-white/90">Residency Road, Srinagar</span>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FaCrown className="w-4 h-4 text-gold-400" />
                    <span className="text-royal-100/60 text-xs">Est. 2012</span>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-1 h-1 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div variants={itemVariants} className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden">
            {/* Floating Elements (simplified) */}
            <div className="absolute top-4 right-4 w-4 h-4 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full opacity-10 animate-pulse" />
            
            <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <Zap size={20} className="text-gold-400" />
              <span>Quick Links</span>
            </h3>
            <div className="space-y-4">
              {quickLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.link}
                  className="flex items-center text-white/90 hover:text-gold-300 transition-colors duration-300 group"
                  whileHover={{ x: 3 }}
                >
                  <ChevronRight size={18} className="text-gold-400 mr-2 group-hover:text-gold-300 transition-colors duration-300" />
                  <span className="font-medium text-base">{link.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {/* Our Services */}
          <motion.div variants={itemVariants} className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden">
            {/* Floating Elements (simplified) */}
            <div className="absolute top-4 right-4 w-4 h-4 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full opacity-10 animate-pulse" />
            
            <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <Star size={20} className="text-gold-400" />
              <span>Our Services</span>
            </h3>
            <div className="space-y-4">
              {services.map((service, index) => (
                <motion.a
                  key={index}
                  href={service.link}
                  className="flex items-center text-white/90 hover:text-gold-300 transition-colors duration-300 group"
                  whileHover={{ x: 3 }}
                >
                  <ChevronRight size={18} className="text-gold-400 mr-2 group-hover:text-gold-300 transition-colors duration-300" />
                  <span className="font-medium text-base">{service.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {/* Cities We Serve */}
          <motion.div variants={itemVariants} className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden">
            {/* Floating Elements (simplified) */}
            <div className="absolute top-4 right-4 w-4 h-4 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full opacity-10 animate-pulse" />
            
            <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <MapPin size={20} className="text-gold-400" />
              <span>Cities We Serve</span>
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {cities.map((city, index) => (
                <motion.a
                  key={index}
                  href={city.link}
                  className="flex items-center text-white/90 hover:text-gold-300 transition-colors duration-300 group"
                  whileHover={{ x: 3 }}
                >
                  <ChevronRight size={16} className="text-gold-400 mr-2 group-hover:text-gold-300 transition-colors duration-300" />
                  <span className="text-sm">{city.name}</span>
                </motion.a>
              ))}
            </div>
            
            {/* Social Media Section - moved here for better use of space */}
            <div className="pt-6 mt-6 border-t border-white/10">
              <h4 className="text-lg font-semibold mb-4 text-white flex items-center space-x-2">
                <FaFacebookF size={18} className="text-gold-400" />
                <span>Follow Us</span>
              </h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -1 }}
                    className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-lg transition-all duration-300 flex items-center justify-center"
                  >
                    <div className="text-white group-hover:text-gold-300 transition-colors duration-300">
                      {social.icon}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 pt-6 border-t border-white/10 text-center sm:flex sm:justify-between sm:items-center sm:text-left space-y-4 sm:space-y-0"
        >
          {/* Company Copyright */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center space-x-3 bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            <div className="p-1.5 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full shadow-lg">
              <FaCrown size={14} className="text-white" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">
                © {currentYear} Royal Group of Real Estates
              </p>
              <p className="text-royal-100/70 text-xs">
                All rights reserved
              </p>
            </div>
          </motion.div>
          
          {/* Developer Credit */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center space-x-3 bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            <div className="p-1.5 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full shadow-lg">
              <FaCode size={14} className="text-white" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">
                Developed with <FaHeart size={10} className="inline text-red-400 mx-1" /> by
              </p>
              <p className="text-royal-100/70 text-xs">
                Mussadiq Wani Inc. (Contact: +91 9906106156)
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
