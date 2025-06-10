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
      icon: <Home size={18} />,
      description: 'Back to homepage',
      gradient: 'from-blue-400 to-blue-600',
      bgGradient: 'from-blue-500/20 to-blue-600/20'
    },
    { 
      name: 'About Us', 
      link: '/about', 
      icon: <Users size={18} />,
      description: 'Our story & mission',
      gradient: 'from-purple-400 to-purple-600',
      bgGradient: 'from-purple-500/20 to-purple-600/20'
    },
    { 
      name: 'Properties', 
      link: '/properties', 
      icon: <Building2 size={18} />,
      description: 'Browse listings',
      gradient: 'from-green-400 to-green-600',
      bgGradient: 'from-green-500/20 to-green-600/20'
    },
    { 
      name: 'Services', 
      link: '/services', 
      icon: <Wrench size={18} />,
      description: 'What we offer',
      gradient: 'from-orange-400 to-orange-600',
      bgGradient: 'from-orange-500/20 to-orange-600/20'
    },
    { 
      name: 'Contact', 
      link: '/contact', 
      icon: <MessageCircle size={18} />,
      description: 'Get in touch',
      gradient: 'from-red-400 to-red-600',
      bgGradient: 'from-red-500/20 to-red-600/20'
    }
  ];
  
  const services = [
    { 
      name: 'Residential Properties', 
      link: '/properties?type=residential', 
      icon: <FaBuilding size={18} />,
      description: 'Homes & apartments',
      gradient: 'from-emerald-400 to-emerald-600',
      bgGradient: 'from-emerald-500/20 to-emerald-600/20'
    },
    { 
      name: 'Commercial Properties', 
      link: '/properties?type=commercial', 
      icon: <FaCity size={18} />,
      description: 'Office & retail spaces',
      gradient: 'from-blue-400 to-blue-600',
      bgGradient: 'from-blue-500/20 to-blue-600/20'
    },
    { 
      name: 'Property Management', 
      link: '/services/property-management', 
      icon: <FaShieldAlt size={18} />,
      description: 'Full-service management',
      gradient: 'from-purple-400 to-purple-600',
      bgGradient: 'from-purple-500/20 to-purple-600/20'
    },
    { 
      name: 'Investment Advisory', 
      link: '/services/investment', 
      icon: <FaChartLine size={18} />,
      description: 'Smart investment guidance',
      gradient: 'from-amber-400 to-amber-600',
      bgGradient: 'from-amber-500/20 to-amber-600/20'
    },
    { 
      name: 'Legal Assistance', 
      link: '/services/legal', 
      icon: <FaHandshake size={18} />,
      description: 'Legal support & compliance',
      gradient: 'from-rose-400 to-rose-600',
      bgGradient: 'from-rose-500/20 to-rose-600/20'
    }
  ];
  
  const cities = [
    { 
      name: 'Srinagar', 
      link: '/properties?location=srinagar',
      icon: <FaMountain size={16} />,
      description: 'Kashmir Valley',
      color: 'from-blue-400 to-blue-600'
    },
    { 
      name: 'Jammu', 
      link: '/properties?location=jammu',
      icon: <FaLandmark size={16} />,
      description: 'Temple City',
      color: 'from-orange-400 to-orange-600'
    },
    { 
      name: 'Chandigarh', 
      link: '/properties?location=chandigarh',
      icon: <FaTree size={16} />,
      description: 'City Beautiful',
      color: 'from-green-400 to-green-600'
    },
    { 
      name: 'Delhi', 
      link: '/properties?location=delhi',
      icon: <FaBuilding size={16} />,
      description: 'Capital City',
      color: 'from-red-400 to-red-600'
    },
    { 
      name: 'Bangalore', 
      link: '/properties?location=bangalore',
      icon: <FaCity size={16} />,
      description: 'IT Hub',
      color: 'from-purple-400 to-purple-600'
    },
    { 
      name: 'Hyderabad', 
      link: '/properties?location=hyderabad',
      icon: <FaBuilding size={16} />,
      description: 'Pearl City',
      color: 'from-pink-400 to-pink-600'
    },
    { 
      name: 'Ahmedabad', 
      link: '/properties?location=ahmedabad',
      icon: <FaLandmark size={16} />,
      description: 'Manchester of India',
      color: 'from-yellow-400 to-yellow-600'
    },
    { 
      name: 'Gurgaon', 
      link: '/properties?location=gurgaon',
      icon: <FaCity size={16} />,
      description: 'Millennium City',
      color: 'from-indigo-400 to-indigo-600'
    },
    { 
      name: 'Mumbai', 
      link: '/properties?location=mumbai',
      icon: <FaBuilding size={16} />,
      description: 'City of Dreams',
      color: 'from-teal-400 to-teal-600'
    }
  ];
  
  const socialLinks = [
    { name: 'Facebook', icon: <FaFacebookF size={16} />, link: 'https://www.facebook.com/share/1AbhQzXNjG/?mibextid=qi2Omg' },
    { name: 'Twitter', icon: <FaTwitter size={16} />, link: 'https://twitter.com/royalgroupreal' },
    { name: 'Instagram', icon: <FaInstagram size={16} />, link: 'https://www.instagram.com/royalgrouprealestate' },
    { name: 'LinkedIn', icon: <FaLinkedinIn size={16} />, link: 'https://www.linkedin.com/company/royal-group-real-estate' }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="bg-gradient-to-br from-royal-900 via-royal-800 to-royal-900 text-white relative overflow-hidden backdrop-blur-md">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,#1f2937_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-5" />
      <motion.div 
        className="container mx-auto section-padding relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <motion.div 
            variants={itemVariants} 
            className="backdrop-blur-lg bg-white/5 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/10 relative overflow-hidden"
          >
            {/* Floating Elements */}
            <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full opacity-20 animate-pulse" />
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 w-4 sm:w-6 h-4 sm:h-6 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '0.3s' }} />
            <div className="absolute top-12 sm:top-16 left-6 sm:left-8 w-3 sm:w-4 h-3 sm:h-4 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '0.8s' }} />
            
            <div className="relative z-10">
              {/* Enhanced Logo */}
              <motion.a 
                href="/" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center group mb-4 sm:mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <div className="p-2 sm:p-3 bg-gradient-to-r from-gold-400 to-gold-600 rounded-lg sm:rounded-xl shadow-lg mr-3 sm:mr-4 group-hover:shadow-xl transition-all duration-300">
                  <FaCrown size={20} className="sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <span className="font-display text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white group-hover:text-gold-400 transition-all duration-300">
                    Royal<span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">Group</span>
                  </span>
                  <div className="flex items-center mt-1">
                    <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-400 rounded-full animate-pulse mr-1.5 sm:mr-2" />
                    <span className="text-xs text-royal-100/70">Premium Real Estate</span>
                  </div>
                </div>
              </motion.a>
              
              {/* Company Description */}
              <div className="bg-white/5 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl border border-white/10 mb-4 sm:mb-6">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg">
                    <FaBuilding size={14} className="sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-royal-100/90 leading-relaxed text-xs sm:text-sm">
                      Premium real estate solutions across India's major cities. Building excellence in real estate since 2012.
                    </p>
                    <div className="flex items-center mt-1.5 sm:mt-2">
                      <Star className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-gold-400 mr-1" />
                      <span className="text-xs text-royal-100/60">Trusted by 10,000+ clients</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Information */}
              <div className="space-y-3 sm:space-y-4">
                {/* Email */}
                <motion.a 
                  href="mailto:info@royalgroupofrealestates.com" 
                  whileHover={{ x: 8, scale: 1.02 }}
                  className="block group"
                >
                  <div className="bg-white/5 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="p-2 sm:p-3 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <Mail className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-semibold text-xs sm:text-sm group-hover:text-gold-300 transition-colors duration-300">
                          Email Us
                        </h4>
                        <p className="text-royal-100/70 text-xs group-hover:text-royal-100 transition-colors duration-300 truncate">
                          info@royalgroupofrealestates.com
                        </p>
                      </div>
                      <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4 text-gold-400 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0" />
                    </div>
                  </div>
                </motion.a>
                
                {/* Phone */}
                <motion.a 
                  href="tel:+917006064587" 
                  whileHover={{ x: 8, scale: 1.02 }}
                  className="block group"
                >
                  <div className="bg-white/5 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <Phone className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-semibold text-xs sm:text-sm group-hover:text-gold-300 transition-colors duration-300">
                          Call Us
                        </h4>
                        <p className="text-royal-100/70 text-xs group-hover:text-royal-100 transition-colors duration-300">
                          +91 700-606-4587
                        </p>
                      </div>
                      <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4 text-gold-400 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0" />
                    </div>
                  </div>
                </motion.a>
                
                {/* Address */}
                <motion.div 
                  whileHover={{ x: 8, scale: 1.02 }}
                  className="block group"
                >
                  <div className="bg-white/5 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="p-2 sm:p-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 mt-1">
                        <MapPin className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-semibold text-xs sm:text-sm group-hover:text-gold-300 transition-colors duration-300">
                          Visit Us
                        </h4>
                        <p className="text-royal-100/70 text-xs group-hover:text-royal-100 transition-colors duration-300 leading-relaxed">
                          Residency Road_190001 Srinagar, Jammu and Kashmir, India
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Bottom Decoration */}
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FaCrown className="w-3 sm:w-4 h-3 sm:h-4 text-gold-400" />
                    <span className="text-royal-100/60 text-xs">Est. 2012</span>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-0.5 sm:w-1 h-0.5 sm:h-1 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div variants={itemVariants} className="backdrop-blur-lg bg-white/5 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/10 relative overflow-hidden">
            {/* Floating Elements */}
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full opacity-20 animate-pulse" />
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 w-3 sm:w-4 h-3 sm:h-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '0.5s' }} />
            <div className="absolute top-10 sm:top-12 left-3 sm:left-4 w-4 sm:w-6 h-3 sm:h-4 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '1s' }} />
            
            <div className="relative z-10">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-white relative inline-block">
                <span className="flex items-center">
                  <Zap className="w-5 sm:w-6 h-5 sm:h-6 mr-2 text-gold-400" />
                  Quick Links
                </span>
                <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-gold-400 via-purple-400 to-blue-400"></div>
              </h3>
              
              <div className="space-y-2 sm:space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="block group relative overflow-hidden"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={cn(
                      "relative p-3 sm:p-4 rounded-lg sm:rounded-xl border border-white/10 backdrop-blur-sm transition-all duration-300 group-hover:border-white/20",
                      "bg-gradient-to-r bg-white/5 group-hover:bg-white/10",
                      "transform group-hover:shadow-lg group-hover:shadow-gold-400/20"
                    )}>
                      {/* Background Gradient */}
                      <div className={cn(
                        "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg sm:rounded-xl",
                        `bg-gradient-to-r ${link.bgGradient}`
                      )} />
                      
                      <div className="relative z-10 flex items-center space-x-3 sm:space-x-4">
                        {/* Icon Container */}
                        <div className={cn(
                          "p-2 sm:p-3 rounded-lg shadow-lg transition-all duration-300 group-hover:shadow-xl",
                          "bg-gradient-to-r group-hover:scale-110 transform",
                          `bg-gradient-to-r ${link.gradient}`
                        )}>
                          <div className="text-white group-hover:text-white transition-colors duration-300">
                            {link.icon}
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-semibold text-xs sm:text-sm group-hover:text-gold-300 transition-colors duration-300 flex items-center">
                            {link.name}
                            <ArrowRight className="w-2.5 sm:w-3 h-2.5 sm:h-3 ml-1.5 sm:ml-2 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                          </h4>
                          <p className="text-royal-100/70 text-xs group-hover:text-royal-100 transition-colors duration-300 mt-0.5 sm:mt-1">
                            {link.description}
                          </p>
                        </div>
                        
                        {/* Hover Indicator */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full animate-pulse" />
                        </div>
                      </div>
                      
                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-gold-400/20 to-transparent" />
                    </div>
                  </motion.a>
                ))}
              </div>
              
              {/* Bottom Decoration */}
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="w-3 sm:w-4 h-3 sm:h-4 text-gold-400" />
                    <span className="text-royal-100/60 text-xs">Premium Navigation</span>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-0.5 sm:w-1 h-0.5 sm:h-1 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Our Services */}
          <motion.div variants={itemVariants} className="backdrop-blur-lg bg-white/5 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/10 relative overflow-hidden">
            {/* Floating Elements */}
            <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-4 sm:w-6 h-4 sm:h-6 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full opacity-20 animate-pulse" />
            <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 w-3 sm:w-5 h-3 sm:h-5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '0.7s' }} />
            <div className="absolute top-12 sm:top-16 left-4 sm:left-6 w-3 sm:w-4 h-3 sm:h-4 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '1.2s' }} />
            
            <div className="relative z-10">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-white relative inline-block">
                <span className="flex items-center">
                  <FaRocket className="w-5 sm:w-6 h-5 sm:h-6 mr-2 text-gold-400" />
                  Our Services
                </span>
                <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-gold-400 via-emerald-400 to-blue-400"></div>
              </h3>
              
              <div className="space-y-2 sm:space-y-3">
                {services.map((service, index) => (
                  <motion.a
                    key={index}
                    href={service.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="block group relative overflow-hidden"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={cn(
                      "relative p-3 sm:p-4 rounded-lg sm:rounded-xl border border-white/10 backdrop-blur-sm transition-all duration-300 group-hover:border-white/20",
                      "bg-gradient-to-r bg-white/5 group-hover:bg-white/10",
                      "transform group-hover:shadow-lg group-hover:shadow-gold-400/20"
                    )}>
                      {/* Background Gradient */}
                      <div className={cn(
                        "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg sm:rounded-xl",
                        `bg-gradient-to-r ${service.bgGradient}`
                      )} />
                      
                      <div className="relative z-10 flex items-center space-x-3 sm:space-x-4">
                        {/* Icon Container */}
                        <div className={cn(
                          "p-2 sm:p-3 rounded-lg shadow-lg transition-all duration-300 group-hover:shadow-xl",
                          "bg-gradient-to-r group-hover:scale-110 transform",
                          `bg-gradient-to-r ${service.gradient}`
                        )}>
                          <div className="text-white group-hover:text-white transition-colors duration-300">
                            {service.icon}
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-semibold text-xs sm:text-sm group-hover:text-gold-300 transition-colors duration-300 flex items-center">
                            {service.name}
                            <ArrowRight className="w-2.5 sm:w-3 h-2.5 sm:h-3 ml-1.5 sm:ml-2 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                          </h4>
                          <p className="text-royal-100/70 text-xs group-hover:text-royal-100 transition-colors duration-300 mt-0.5 sm:mt-1">
                            {service.description}
                          </p>
                        </div>
                        
                        {/* Hover Indicator */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full animate-pulse" />
                        </div>
                      </div>
                      
                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-gold-400/20 to-transparent" />
                    </div>
                  </motion.a>
                ))}
              </div>
              
              {/* Bottom Decoration */}
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FaShieldAlt className="w-3 sm:w-4 h-3 sm:h-4 text-gold-400" />
                    <span className="text-royal-100/60 text-xs">Professional Services</span>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-0.5 sm:w-1 h-0.5 sm:h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Cities */}
          <motion.div variants={itemVariants} className="backdrop-blur-lg bg-white/5 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/10 relative overflow-hidden">
            {/* Floating Elements */}
            <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-4 sm:w-6 h-4 sm:h-6 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full opacity-20 animate-pulse" />
            <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 w-3 sm:w-5 h-3 sm:h-5 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '0.4s' }} />
            <div className="absolute top-12 sm:top-16 left-4 sm:left-6 w-3 sm:w-4 h-3 sm:h-4 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '0.9s' }} />
            
            <div className="relative z-10">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-white relative inline-block">
                <span className="flex items-center">
                  <FaCity className="w-5 sm:w-6 h-5 sm:h-6 mr-2 text-gold-400" />
                  Our Cities
                </span>
                <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-gold-400 via-teal-400 to-indigo-400"></div>
              </h3>
              
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                {cities.map((city, index) => (
                  <motion.a
                    key={index}
                    href={city.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="block group relative overflow-hidden"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="bg-white/5 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-r ${city.color} shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                          {city.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-semibold text-xs sm:text-sm group-hover:text-gold-300 transition-colors duration-300">
                            {city.name}
                          </h4>
                          <p className="text-royal-100/70 text-xs group-hover:text-royal-100 transition-colors duration-300">
                            {city.description}
                          </p>
                        </div>
                        <ChevronRight className="w-3 sm:w-4 h-3 sm:h-4 text-gold-400 group-hover:text-gold-300 transition-colors duration-300 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0" />
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
              
              {/* Social Media Section */}
              <div className="pt-4 sm:pt-6 border-t border-white/10">
                <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white flex items-center">
                  <FaFacebookF className="w-4 sm:w-5 h-4 sm:h-5 mr-2 text-gold-400" />
                  Follow Us
                </h4>
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="p-2 sm:p-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-lg sm:rounded-xl transition-all duration-300 group"
                    >
                      <div className="text-white group-hover:text-gold-300 transition-colors duration-300">
                        {social.icon}
                      </div>
                    </motion.a>
                  ))}
                </div>
                <motion.a
                  href="https://www.facebook.com/share/1AbhQzXNjG/?mibextid=qi2Omg"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
                >
                  <FaFacebookF size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span className="font-medium text-xs sm:text-sm">Follow on Facebook</span>
                </motion.a>
              </div>
              
              {/* Bottom Decoration */}
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FaMountain className="w-3 sm:w-4 h-3 sm:h-4 text-gold-400" />
                    <span className="text-royal-100/60 text-xs">Across India</span>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-0.5 sm:w-1 h-0.5 sm:h-1 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Copyright Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white/10"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            {/* Company Copyright */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 sm:space-x-3 bg-white/5 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="p-1.5 sm:p-2 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full shadow-lg">
                <FaCrown size={14} className="sm:w-4 sm:h-4 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-white font-medium text-xs sm:text-sm">
                  © {currentYear} Royal Group of Real Estates
                </p>
                <p className="text-royal-100/70 text-xs">
                  All rights reserved
                </p>
              </div>
            </motion.div>
            
            {/* Developer Credit */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 sm:space-x-3 bg-white/5 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full shadow-lg">
                <FaCode size={14} className="sm:w-4 sm:h-4 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-white font-medium text-xs sm:text-sm">
                  Developed with <FaHeart size={10} className="inline text-red-400 mx-1 sm:w-3 sm:h-3" /> by
                </p>
                <p className="text-royal-100/70 text-xs">
                  Mussadiq Wani Inc.
                </p>
              </div>
            </motion.div>
          </div>
          
          {/* Additional Info */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-4 sm:mt-6 text-center"
          >
            <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-white/10">
              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-royal-100/60 text-xs">
                Premium Real Estate Solutions Across India
              </span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
