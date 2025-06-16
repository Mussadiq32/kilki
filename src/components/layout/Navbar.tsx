import React, { useState, useEffect, useCallback, useMemo } from 'react';
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

// Memoized Mobile Menu Item Component
const MobileMenuItem = React.memo(({ 
  item, 
  onClick, 
  delay = 0, 
  isVisible 
}: { 
  item: any; 
  onClick: () => void; 
  delay?: number; 
  isVisible: boolean; 
}) => {
  const Icon = item.icon;
  
  return (
    <div
      className={cn(
        "transform transition-all duration-300 ease-out",
        isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <Link
        to={item.path}
        className="flex items-center space-x-3 p-4 rounded-xl bg-white/90 dark:bg-royal-800/90 backdrop-blur-sm border border-white/20 dark:border-royal-600/20 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
        onClick={onClick}
      >
        {Icon && <Icon size={20} className="text-royal-600 dark:text-gold-400 group-hover:text-gold-500 transition-colors duration-300" />}
        <span className="font-medium text-royal-800 dark:text-white group-hover:text-gold-500 transition-colors duration-300">
          {item.name}
        </span>
      </Link>
    </div>
  );
});

// Memoized Service Item Component
const MobileServiceItem = React.memo(({ 
  item, 
  onClick, 
  delay = 0, 
  isVisible 
}: { 
  item: any; 
  onClick: () => void; 
  delay?: number; 
  isVisible: boolean; 
}) => {
  return (
    <div
      className={cn(
        "transform transition-all duration-300 ease-out",
        isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <Link
        to={item.path}
        className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-gold-400/80 to-royal-500/80 backdrop-blur-sm border border-gold-300/30 dark:border-royal-400/30 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
        onClick={onClick}
      >
        <span className="font-medium text-white group-hover:text-gold-200 transition-colors duration-300">
          {item.name}
        </span>
      </Link>
    </div>
  );
});

// Memoized Tool Item Component
const MobileToolItem = React.memo(({ 
  item, 
  onClick, 
  delay = 0, 
  isVisible 
}: { 
  item: any; 
  onClick: () => void; 
  delay?: number; 
  isVisible: boolean; 
}) => {
  return (
    <div
      className={cn(
        "transform transition-all duration-300 ease-out",
        isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-royal-500/80 to-royal-600/80 backdrop-blur-sm border border-royal-400/30 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
        onClick={onClick}
      >
        <span className="font-medium text-white group-hover:text-royal-200 transition-colors duration-300">
          {item.name}
        </span>
      </a>
    </div>
  );
});

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const { user, isAuthenticated, isAdmin } = useAuth();

  // Memoize scroll handler to prevent unnecessary re-renders
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 10;
    setIsScrolled(scrolled);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Optimized click outside handler
  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (isMobileMenuOpen && !target.closest('.mobile-menu-container') && !target.closest('button[aria-label="Toggle menu"]')) {
      closeMobileMenu();
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen, handleClickOutside]);

  // Handle escape key
  const handleEscapeKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && isMobileMenuOpen) {
      closeMobileMenu();
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen(prev => !prev);
  }, []);

  const toggleToolsDropdown = useCallback(() => {
    setIsToolsDropdownOpen(prev => !prev);
  }, []);

  // Memoize logo source
  const logoSource = useMemo(() => {
    return isScrolled ? "https://iili.io/2mPx3rP.png" : "https://iili.io/2mPxFWb.png";
  }, [isScrolled]);

  return (
    <header className={`fixed w-full z-[9999] transition-all duration-300 backdrop-blur-sm ${isScrolled ? 'bg-white/90 dark:bg-royal-900/90 shadow-lg py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center transition-transform hover:scale-105">
          <img 
            src={logoSource} 
            alt="Royal Group of Real Estates Logo" 
            className="h-10 md:h-12"
          />
        </Link>
        
        <nav className={`hidden lg:flex space-x-8 ${isScrolled ? 'text-royal-800 dark:text-white' : 'text-white'}`}>
          <Link 
            to="/" 
            className="relative font-medium hover:text-gold-500 transition-all duration-300 hover:-translate-y-0.5"
          >
            Home
          </Link>
          <Link 
            to="/properties" 
            className="relative font-medium hover:text-gold-500 transition-all duration-300 hover:-translate-y-0.5"
          >
            Properties
          </Link>
          <div className="relative group">
            <button 
              onClick={toggleDropdown}
              className="flex items-center font-medium group-hover:text-gold-500 transition-all duration-300 hover:-translate-y-0.5"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              Services
              <ChevronDown size={16} className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
            </button>
            {isDropdownOpen && !isMobileMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white/95 dark:bg-royal-900/95 backdrop-blur-sm rounded-lg shadow-xl py-2 z-[1000] animate-in fade-in-0 zoom-in-95 duration-200">
                <Link 
                  to="/services/buying" 
                  className="block px-4 py-2 text-royal-800 dark:text-white hover:bg-gold-50 dark:hover:bg-royal-800/50 hover:text-gold-500 transition-colors duration-300"
                >
                  Buying Property
                </Link>
                <Link 
                  to="/services/selling" 
                  className="block px-4 py-2 text-royal-800 dark:text-white hover:bg-gold-50 dark:hover:bg-royal-800/50 hover:text-gold-500 transition-colors duration-300"
                >
                  Selling Property
                </Link>
                <Link 
                  to="/services/renting" 
                  className="block px-4 py-2 text-royal-800 dark:text-white hover:bg-gold-50 dark:hover:bg-royal-800/50 hover:text-gold-500 transition-colors duration-300"
                >
                  Renting Property
                </Link>
                <Link 
                  to="/services/investment" 
                  className="block px-4 py-2 text-royal-800 dark:text-white hover:bg-gold-50 dark:hover:bg-royal-800/50 hover:text-gold-500 transition-colors duration-300"
                >
                  Investment Advisory
                </Link>
              </div>
            )}
          </div>
          <div className="relative group">
            <button 
              onClick={toggleToolsDropdown}
              className="flex items-center font-medium group-hover:text-gold-500 transition-all duration-300 hover:-translate-y-0.5"
              aria-expanded={isToolsDropdownOpen}
              aria-haspopup="true"
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
          <Link 
            to="/about" 
            className="relative font-medium hover:text-gold-500 transition-all duration-300 hover:-translate-y-0.5"
          >
            About Us
          </Link>
          <Link 
            to="/contact" 
            className="relative font-medium hover:text-gold-500 transition-all duration-300 hover:-translate-y-0.5"
          >
            Contact
          </Link>
          
          {isAuthenticated && isAdmin && (
            <Link 
              to="/admin" 
              className="relative font-medium hover:text-gold-500 transition-all duration-300 hover:-translate-y-0.5"
            >
              Admin
            </Link>
          )}
        </nav>
        
        <div className="flex items-center space-x-4">
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
          
          <Link to="/auth">
            <CustomButton 
              variant={isScrolled ? "primary" : "outline"} 
              size="sm"
              className={!isScrolled ? "border-white text-white hover:bg-white hover:text-royal-800 transition-transform hover:scale-105" : "transition-transform hover:scale-105"}
            >
              {isAuthenticated ? 'Dashboard' : 'Sign In'}
            </CustomButton>
          </Link>
          
          {/* OPTIMIZED HAMBURGER MENU BUTTON */}
          <button 
            className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-white/90 dark:bg-royal-800/90 backdrop-blur-sm shadow-lg text-gray-700 dark:text-white transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gold-300 focus:ring-offset-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className="relative w-6 h-6">
              {/* Top line */}
              <span className={cn(
                "absolute left-0 w-6 h-0.5 bg-current transition-all duration-300 ease-in-out",
                isMobileMenuOpen ? "rotate-45 top-3" : "top-1"
              )} />
              {/* Middle line */}
              <span className={cn(
                "absolute left-0 w-6 h-0.5 bg-current transition-all duration-300 ease-in-out top-3",
                isMobileMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
              )} />
              {/* Bottom line */}
              <span className={cn(
                "absolute left-0 w-6 h-0.5 bg-current transition-all duration-300 ease-in-out",
                isMobileMenuOpen ? "-rotate-45 top-3" : "top-5"
              )} />
            </div>
          </button>
        </div>
      </div>
      
      {/* OPTIMIZED MOBILE MENU OVERLAY */}
      <div 
        id="mobile-menu"
        className={cn(
          "lg:hidden fixed inset-0 z-[9999] transition-all duration-300 ease-in-out",
          isMobileMenuOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-royal-900/80 via-black/60 to-gold-900/40 backdrop-blur-xl transition-opacity duration-300"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
        
        {/* Menu Container */}
        <div className={cn(
          "mobile-menu-container fixed inset-0 flex flex-col transition-all duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 bg-white/95 dark:bg-royal-900/95 backdrop-blur-sm border-b border-white/20 dark:border-royal-600/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-royal-500 flex items-center justify-center text-white font-bold">
                {user ? user.name?.charAt(0).toUpperCase() : 'G'}
              </div>
              <div>
                <p className="font-medium text-royal-800 dark:text-white">
                  {user ? user.name : 'Guest'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isAuthenticated ? 'Welcome back!' : 'Sign in to continue'}
                </p>
              </div>
            </div>
            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-lg bg-gray-100 dark:bg-royal-800 hover:bg-gray-200 dark:hover:bg-royal-700 transition-colors duration-200"
              aria-label="Close menu"
            >
              <X size={20} className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {/* Menu Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* Main Menu Items */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Navigation
              </h3>
              {menuItems.map((item, index) => (
                <MobileMenuItem
                  key={item.name}
                  item={item}
                  onClick={closeMobileMenu}
                  delay={index * 50}
                  isVisible={isMobileMenuOpen}
                />
              ))}
            </div>

            {/* Services */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Services
              </h3>
              {serviceItems.map((item, index) => (
                <MobileServiceItem
                  key={item.name}
                  item={item}
                  onClick={closeMobileMenu}
                  delay={(index + menuItems.length) * 50}
                  isVisible={isMobileMenuOpen}
                />
              ))}
            </div>

            {/* Tools */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Tools
              </h3>
              {toolItems.map((item, index) => (
                <MobileToolItem
                  key={item.name}
                  item={item}
                  onClick={closeMobileMenu}
                  delay={(index + menuItems.length + serviceItems.length) * 50}
                  isVisible={isMobileMenuOpen}
                />
              ))}
            </div>

            {/* Admin Panel */}
            {isAuthenticated && isAdmin && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                  Admin
                </h3>
                <div
                  className={cn(
                    "transform transition-all duration-300 ease-out",
                    isMobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
                  )}
                  style={{ transitionDelay: '400ms' }}
                >
                  <Link
                    to="/admin"
                    className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-red-500/80 to-red-600/80 backdrop-blur-sm border border-red-300/30 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
                    onClick={closeMobileMenu}
                  >
                    <Settings size={20} className="text-white group-hover:text-red-100 transition-colors duration-300" />
                    <span className="font-medium text-white group-hover:text-red-100 transition-colors duration-300">
                      Admin Panel
                    </span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-6 bg-white/95 dark:bg-royal-900/95 backdrop-blur-sm border-t border-white/20 dark:border-royal-600/20">
            <div className="flex space-x-3">
              <CustomButton 
                variant="primary" 
                className="flex-1 h-12 rounded-xl bg-gradient-to-r from-gold-400 to-gold-600 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                onClick={closeMobileMenu}
              >
                {isAuthenticated ? 'Dashboard' : 'Sign In'}
              </CustomButton>
              <a 
                href="tel:7006064587" 
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-royal-500 to-royal-700 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                onClick={closeMobileMenu}
                aria-label="Call us"
              >
                <Phone size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;