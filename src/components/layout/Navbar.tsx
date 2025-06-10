import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Home, Briefcase, Wrench, Info, Mail, Settings, ClipboardList, Handshake, Wallet, LandPlot } from 'lucide-react';
import { cn } from '@/lib/utils';
import CustomButton from '../ui/CustomButton';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const menuItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Properties', path: '/properties', icon: LandPlot },
  { name: 'About Us', path: '/about', icon: Info },
  { name: 'Contact', path: '/contact', icon: Mail },
];

const serviceItems = [
  { name: 'Buying Property', path: '/services/buying', icon: null },
  { name: 'Selling Property', path: '/services/selling', icon: null },
  { name: 'Renting Property', path: '/services/renting', icon: null },
  { name: 'Investment Advisory', path: '/services/investment', icon: null },
];

const toolItems = [
  { name: 'Property Rates & Trends', href: 'https://www.99acres.com/property-rates-and-price-trends-prffid', icon: null },
  { name: 'Property News', href: 'https://www.99acres.com/real-estate-insights-irffid?referrer_section=SIDE_MENU', icon: null },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const { user, isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Close mobile menu if clicked outside
      if (isMobileMenuOpen && !target.closest('.mobile-menu-container') && !target.closest('button[aria-label="Toggle menu"]')) {
        closeMobileMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : 'auto';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleToolsDropdown = () => {
    setIsToolsDropdownOpen(!isToolsDropdownOpen);
  };

  return (
    <header className={`fixed w-full z-[9999] transition-all duration-300 backdrop-blur-sm ${isScrolled ? 'bg-white/90 dark:bg-royal-900/90 shadow-lg py-2 sm:py-4' : 'bg-transparent py-4 sm:py-6'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center transition-transform hover:scale-105">
          <img 
            src={isScrolled ? "https://iili.io/2mPx3rP.png" : "https://iili.io/2mPxFWb.png"} 
            alt="Royal Group of Real Estates Logo" 
            className="h-8 sm:h-10 md:h-12"
          />
        </a>
        
        <nav className={`hidden lg:flex space-x-8 ${isScrolled ? 'text-royal-800 dark:text-white' : 'text-white'}`}>
          <a 
            href="/" 
            target="_blank"
            rel="noopener noreferrer"
            className="relative font-medium hover:text-gold-500 transition-all duration-300 hover:-translate-y-0.5"
          >
            Home
          </a>
          <a 
            href="/properties" 
            target="_blank"
            rel="noopener noreferrer"
            className="relative font-medium hover:text-gold-500 transition-all duration-300 hover:-translate-y-0.5"
          >
            Properties
          </a>
          <div className="relative group">
            <button 
              onClick={toggleDropdown}
              className="flex items-center font-medium group-hover:text-gold-500 transition-all duration-300 hover:-translate-y-0.5"
            >
              Services
              <ChevronDown size={16} className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
            </button>
            {isDropdownOpen && !isMobileMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white/95 dark:bg-royal-900/95 backdrop-blur-sm rounded-lg shadow-xl py-2 z-[1000] animate-in fade-in-0 zoom-in-95 duration-200">
                <a 
                  href="/services/buying" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-royal-800 dark:text-white hover:bg-gold-50 dark:hover:bg-royal-800/50 hover:text-gold-500 transition-colors duration-300"
                >
                  Buying Property
                </a>
                <a 
                  href="/services/selling" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-royal-800 dark:text-white hover:bg-gold-50 dark:hover:bg-royal-800/50 hover:text-gold-500 transition-colors duration-300"
                >
                  Selling Property
                </a>
                <a 
                  href="/services/renting" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-royal-800 dark:text-white hover:bg-gold-50 dark:hover:bg-royal-800/50 hover:text-gold-500 transition-colors duration-300"
                >
                  Renting Property
                </a>
                <a 
                  href="/services/investment" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-royal-800 dark:text-white hover:bg-gold-50 dark:hover:bg-royal-800/50 hover:text-gold-500 transition-colors duration-300"
                >
                  Investment Advisory
                </a>
              </div>
            )}
          </div>
          <div className="relative group">
            <button 
              onClick={toggleToolsDropdown}
              className="flex items-center font-medium group-hover:text-gold-500 transition-all duration-300 hover:-translate-y-0.5"
            >
              Tools
              <ChevronDown size={16} className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
            </button>
            {isToolsDropdownOpen && !isMobileMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white/95 dark:bg-royal-900/95 backdrop-blur-sm rounded-lg shadow-xl py-2 z-[1000] animate-in fade-in-0 zoom-in-95 duration-200">
                <a 
                  href="https://www.99acres.com/property-rates-and-price-trends-prffid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-royal-800 dark:text-white hover:bg-gold-50 dark:hover:bg-royal-800/50 hover:text-gold-500 transition-colors duration-300"
                >
                  Property Rates & Trends
                </a>
                <a 
                  href="https://www.99acres.com/real-estate-insights-irffid?referrer_section=SIDE_MENU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-royal-800 dark:text-white hover:bg-gold-50 dark:hover:bg-royal-800/50 hover:text-gold-500 transition-colors duration-300"
                >
                  Property News
                </a>
              </div>
            )}
          </div>
          <a 
            href="/about" 
            target="_blank"
            rel="noopener noreferrer"
            className="relative font-medium hover:text-gold-500 transition-all duration-300 hover:-translate-y-0.5"
          >
            About Us
          </a>
          <a 
            href="/contact" 
            target="_blank"
            rel="noopener noreferrer"
            className="relative font-medium hover:text-gold-500 transition-all duration-300 hover:-translate-y-0.5"
          >
            Contact
          </a>
          
          {isAuthenticated && isAdmin && (
            <a 
              href="/admin" 
              target="_blank"
              rel="noopener noreferrer"
              className="relative font-medium hover:text-gold-500 transition-all duration-300 hover:-translate-y-0.5"
            >
              Admin
            </a>
          )}
        </nav>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <a 
            href="tel:7006064587" 
            className={cn(
              "hidden md:flex items-center font-medium transition-all duration-300 hover:-translate-y-0.5",
              isScrolled ? "text-royal-800 dark:text-white hover:text-gold-500" : "text-white hover:text-gold-300"
            )}
          >
            <Phone size={18} className="mr-2" />
            Contact Us
          </a>
          
          <ThemeToggle iconOnly className="hidden md:block transition-transform hover:scale-110" />
          
          <a href="/auth" target="_blank" rel="noopener noreferrer">
            <CustomButton 
              variant={isScrolled ? "primary" : "outline"} 
              size="sm"
              className={cn(
                "text-xs sm:text-sm px-3 sm:px-4 py-2",
                !isScrolled ? "border-white text-white hover:bg-white hover:text-royal-800 transition-transform hover:scale-105" : "transition-transform hover:scale-105"
              )}
            >
              {isAuthenticated ? 'Dashboard' : 'Sign In'}
            </CustomButton>
          </a>
          
          {/* HAMBURGER MENU BUTTON */}
          <button 
            className="lg:hidden flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/90 dark:bg-royal-800/90 backdrop-blur-sm shadow-lg text-gray-700 dark:text-white transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gold-300"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="relative w-5 h-5 sm:w-6 sm:h-6">
              {/* Top line */}
              <span className={cn(
                "absolute left-0 w-5 h-0.5 sm:w-6 sm:h-0.5 bg-current transition-all duration-300 ease-in-out",
                isMobileMenuOpen ? "rotate-45 top-2.5 sm:top-3" : "top-0.5 sm:top-1"
              )} />
              {/* Middle line */}
              <span className={cn(
                "absolute left-0 w-5 h-0.5 sm:w-6 sm:h-0.5 bg-current transition-all duration-300 ease-in-out top-2.5 sm:top-3",
                isMobileMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
              )} />
              {/* Bottom line */}
              <span className={cn(
                "absolute left-0 w-5 h-0.5 sm:w-6 sm:h-0.5 bg-current transition-all duration-300 ease-in-out",
                isMobileMenuOpen ? "-rotate-45 top-2.5 sm:top-3" : "top-4.5 sm:top-5"
              )} />
            </div>
          </button>
        </div>
      </div>
      
      {/* MOBILE MENU OVERLAY */}
      <div className={cn(
        "lg:hidden fixed inset-0 z-[9999] transition-all duration-500 ease-in-out",
        isMobileMenuOpen 
          ? "opacity-100 pointer-events-auto" 
          : "opacity-0 pointer-events-none"
      )}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-royal-900/80 via-black/60 to-gold-900/40 backdrop-blur-xl transition-opacity duration-500"
          onClick={closeMobileMenu}
        />
        
        {/* Menu Container */}
        <div className={cn(
          "mobile-menu-container fixed inset-0 flex items-center justify-center transition-all duration-500 ease-in-out p-4",
          isMobileMenuOpen ? "scale-100 opacity-100" : "scale-75 opacity-0"
        )}>
          {/* Simplified Mobile Menu */}
          <div className="w-full max-w-sm bg-white/95 dark:bg-royal-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-royal-700/50 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-white/10 dark:border-royal-700/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 via-royal-500 to-gold-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {user ? user.name?.charAt(0).toUpperCase() : 'G'}
                  </div>
                  <div>
                    <p className="text-royal-800 dark:text-white font-semibold text-sm">
                      {user ? user.name : 'Guest'}
                    </p>
                    <p className="text-royal-500 dark:text-royal-300 text-xs">
                      {isAuthenticated ? 'Welcome back!' : 'Sign in to continue'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-lg bg-royal-100 dark:bg-royal-800 text-royal-600 dark:text-royal-300 hover:bg-royal-200 dark:hover:bg-royal-700 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-4 space-y-2">
              {/* Main Navigation */}
              <div className="space-y-1">
                <h3 className="text-xs font-semibold text-royal-500 dark:text-royal-300 uppercase tracking-wider px-3 py-2">
                  Navigation
                </h3>
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 px-3 py-3 rounded-xl text-royal-700 dark:text-royal-100 hover:bg-gold-50 dark:hover:bg-royal-800/50 hover:text-gold-600 dark:hover:text-gold-400 transition-all duration-300"
                      onClick={closeMobileMenu}
                    >
                      <div className="p-2 bg-gradient-to-r from-gold-400 to-gold-600 rounded-lg">
                        <Icon size={18} className="text-white" />
                      </div>
                      <span className="font-medium">{item.name}</span>
                    </a>
                  );
                })}
              </div>

              {/* Services */}
              <div className="space-y-1 pt-2">
                <h3 className="text-xs font-semibold text-royal-500 dark:text-royal-300 uppercase tracking-wider px-3 py-2">
                  Services
                </h3>
                {serviceItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 px-3 py-3 rounded-xl text-royal-700 dark:text-royal-100 hover:bg-gold-50 dark:hover:bg-royal-800/50 hover:text-gold-600 dark:hover:text-gold-400 transition-all duration-300"
                    onClick={closeMobileMenu}
                  >
                    <div className="p-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg">
                      <Briefcase size={18} className="text-white" />
                    </div>
                    <span className="font-medium text-sm">{item.name}</span>
                  </a>
                ))}
              </div>

              {/* Tools */}
              <div className="space-y-1 pt-2">
                <h3 className="text-xs font-semibold text-royal-500 dark:text-royal-300 uppercase tracking-wider px-3 py-2">
                  Tools
                </h3>
                {toolItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 px-3 py-3 rounded-xl text-royal-700 dark:text-royal-100 hover:bg-gold-50 dark:hover:bg-royal-800/50 hover:text-gold-600 dark:hover:text-gold-400 transition-all duration-300"
                    onClick={closeMobileMenu}
                  >
                    <div className="p-2 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg">
                      <Wrench size={18} className="text-white" />
                    </div>
                    <span className="font-medium text-sm">{item.name}</span>
                  </a>
                ))}
              </div>

              {/* Admin Panel */}
              {isAuthenticated && isAdmin && (
                <div className="space-y-1 pt-2">
                  <h3 className="text-xs font-semibold text-royal-500 dark:text-royal-300 uppercase tracking-wider px-3 py-2">
                    Admin
                  </h3>
                  <a
                    href="/admin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 px-3 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
                    onClick={closeMobileMenu}
                  >
                    <div className="p-2 bg-gradient-to-r from-red-500 to-red-600 rounded-lg">
                      <Settings size={18} className="text-white" />
                    </div>
                    <span className="font-medium text-sm">Admin Panel</span>
                  </a>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-white/10 dark:border-royal-700/30 space-y-3">
              <a href="/auth" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>
                <CustomButton 
                  variant="primary" 
                  className="w-full bg-gradient-to-r from-gold-400 to-gold-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isAuthenticated ? 'Go to Dashboard' : 'Sign In / Register'}
                </CustomButton>
              </a>
              
              <a 
                href="tel:7006064587" 
                className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-royal-500 to-royal-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={closeMobileMenu}
              >
                <Phone size={18} />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
