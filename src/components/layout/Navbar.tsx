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
        className="flex items-center space-x-3 p-3 rounded-lg bg-white/90 dark:bg-royal-800/90 backdrop-blur-sm border border-white/20 dark:border-royal-600/20 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group"
        onClick={onClick}
      >
        {Icon && <Icon size={18} className="text-royal-600 dark:text-gold-400 group-hover:text-gold-500 transition-colors duration-300" />}
        <span className="font-medium text-sm text-royal-800 dark:text-white group-hover:text-gold-500 transition-colors duration-300">
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
        className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-gold-400/80 to-royal-500/80 backdrop-blur-sm border border-gold-300/30 dark:border-royal-400/30 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group"
        onClick={onClick}
      >
        <span className="font-medium text-sm text-white group-hover:text-gold-200 transition-colors duration-300">
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
        className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-royal-500/80 to-royal-600/80 backdrop-blur-sm border border-royal-400/30 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group"
        onClick={onClick}
      >
        <span className="font-medium text-sm text-white group-hover:text-royal-200 transition-colors duration-300">
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
    <header className={`fixed w-full z-[9999] transition-all duration-300 ${isScrolled ? 'bg-royal-800 shadow-lg py-3 sm:py-4' : 'bg-royal-900 py-4 sm:py-6'}`}>
      <div className="container mx-auto px-2 sm:px-4 flex justify-between items-center min-h-[56px] sm:min-h-[72px]">
        <Link to="/" className="relative flex items-center space-x-1 sm:space-x-1.5 group perspective transform hover:scale-[1.02] transition-all duration-500 ease-out
          bg-gradient-to-br from-royal-800 via-royal-700 to-royal-900
          px-2 py-0.5 sm:px-2.5 rounded-[1.5rem] shadow-lg border border-royal-600
          overflow-hidden animate-fade-in-up
          before:content-[''] before:absolute before:inset-0 before:bg-white/5 before:mix-blend-overlay before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-500
          after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-br after:from-gold-300/10 after:to-transparent after:opacity-0 group-hover:after:opacity-100 after:transition-opacity after:duration-500
        ">
          {/* Icon as a central emblem */}
          <div className="relative w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full 
            bg-gradient-to-br from-gold-400 to-gold-600 shadow-inner-sm transform group-hover:scale-110 transition-transform duration-300 ease-out
            before:content-[''] before:absolute before:inset-0 before:rounded-full before:border before:border-gold-300/50 before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-300
          ">
            <Briefcase size={14} className="text-royal-900 drop-shadow-xs transition-colors duration-300" />
          </div>
          {/* Text elements */}
          <div className="flex flex-col leading-none z-10 text-shadow-sm">
            <span className="text-white text-lg sm:text-xl md:text-2xl font-display tracking-tight drop-shadow-md 
              bg-clip-text text-transparent bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 
              group-hover:from-gold-300 group-hover:via-gold-400 group-hover:to-gold-500 transition-colors duration-300">
              Royal Group
            </span>
            <span className="text-gold-300 dark:text-gold-400 text-[0.55rem] sm:text-[0.6rem] md:text-xs font-serif italic whitespace-nowrap -mt-0.5 opacity-90 tracking-wide drop-shadow-sm">
              Since 2012
            </span>
          </div>
          {/* Border glow effect on hover */}
          <div className="absolute inset-0 rounded-[1.5rem] border-2 border-transparent group-hover:border-gold-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"></div>
        </Link>
        <nav className={`hidden lg:flex space-x-4 xl:space-x-8 text-white`}>
          <Link 
            to="/" 
            className="relative text-lg font-bold hover:text-gold-300 transition-all duration-300 hover:-translate-y-0.5"
          >
            Home
          </Link>
          <Link 
            to="/properties" 
            className="relative text-lg font-bold hover:text-gold-300 transition-all duration-300 hover:-translate-y-0.5"
          >
            Properties
          </Link>
          <div className="relative group">
            <button 
              onClick={toggleDropdown}
              className="flex items-center text-lg font-bold group-hover:text-gold-300 transition-all duration-300 hover:-translate-y-0.5"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              Services
              <ChevronDown size={18} className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
            </button>
            {isDropdownOpen && !isMobileMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-royal-800 rounded-lg shadow-xl py-2 z-[1000] animate-in fade-in-0 zoom-in-95 duration-200">
                <Link 
                  to="/services/buying" 
                  className="block px-4 py-2 text-white hover:bg-gold-500 hover:text-royal-900 transition-colors duration-300"
                >
                  Buying Property
                </Link>
                <Link 
                  to="/services/selling" 
                  className="block px-4 py-2 text-white hover:bg-gold-500 hover:text-royal-900 transition-colors duration-300"
                >
                  Selling Property
                </Link>
                <Link 
                  to="/services/renting" 
                  className="block px-4 py-2 text-white hover:bg-gold-500 hover:text-royal-900 transition-colors duration-300"
                >
                  Renting Property
                </Link>
                <Link 
                  to="/services/investment" 
                  className="block px-4 py-2 text-white hover:bg-gold-500 hover:text-royal-900 transition-colors duration-300"
                >
                  Investment Advisory
                </Link>
              </div>
            )}
          </div>
          <div className="relative group">
            <button 
              onClick={toggleToolsDropdown}
              className="flex items-center text-lg font-bold group-hover:text-gold-300 transition-all duration-300 hover:-translate-y-0.5"
              aria-expanded={isToolsDropdownOpen}
              aria-haspopup="true"
            >
              Tools
              <ChevronDown size={18} className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
            </button>
            {isToolsDropdownOpen && !isMobileMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-royal-800 rounded-lg shadow-xl py-2 z-[1000] animate-in fade-in-0 zoom-in-95 duration-200">
                <a 
                  href="https://www.99acres.com/property-rates-and-price-trends-prffid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-white hover:bg-gold-500 hover:text-royal-900 transition-colors duration-300"
                >
                  Property Rates & Trends
                </a>
                <a 
                  href="https://www.99acres.com/real-estate-insights-irffid?referrer_section=SIDE_MENU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-white hover:bg-gold-500 hover:text-royal-900 transition-colors duration-300"
                >
                  Property News
                </a>
              </div>
            )}
          </div>
          <Link 
            to="/about" 
            className="relative text-lg font-bold hover:text-gold-300 transition-all duration-300 hover:-translate-y-0.5"
          >
            About Us
          </Link>
          <Link 
            to="/contact" 
            className="relative text-lg font-bold hover:text-gold-300 transition-all duration-300 hover:-translate-y-0.5"
          >
            Contact
          </Link>
          
          {isAuthenticated && isAdmin && (
            <Link 
              to="/admin" 
              className="relative text-lg font-bold hover:text-gold-300 transition-all duration-300 hover:-translate-y-0.5"
            >
              Admin
            </Link>
          )}
        </nav>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <a 
            href="tel:7006064587" 
            className={cn(
              "hidden md:flex items-center text-base sm:text-lg font-bold transition-all duration-300 hover:-translate-y-0.5",
              isScrolled ? "text-white hover:text-gold-300" : "text-white hover:text-gold-300"
            )}
          >
            <Phone size={18} className="mr-1.5 sm:mr-2" />
            <span className="hidden xs:inline">Contact Us</span>
          </a>
          <ThemeToggle iconOnly className="hidden md:block transition-transform hover:scale-110" />
          <Link to="/auth">
            <CustomButton
              variant={isScrolled ? "primary" : "outline"}
              className={cn(
                "transition-transform hover:scale-105",
                "py-0.5 px-1 text-[0.6rem] sm:py-0.5 sm:px-1.5 sm:text-xs md:py-2.5 md:px-5 md:text-lg",
                !isScrolled ? "border-white text-white hover:bg-white hover:text-royal-800" : ""
              )}
            >
              {isAuthenticated ? 'Dashboard' : 'Sign In'}
            </CustomButton>
          </Link>
          {/* OPTIMIZED HAMBURGER MENU */}
          <button 
            className="lg:hidden flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gold-500 shadow-lg text-white transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gold-300 focus:ring-offset-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X size={18} className="text-white" />
            ) : (
              <Menu size={18} className="text-white" />
            )}
          </button>
        </div>
      </div>
      
      {/* OPTIMIZED MOBILE MENU OVERLAY */}
      <div 
        id="mobile-menu"
        className={cn(
          "lg:hidden fixed inset-0 z-[9998] transition-all duration-300 ease-in-out",
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
          className="absolute inset-0 bg-royal-900/90 backdrop-blur-xl transition-opacity duration-300"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
        
        {/* Menu Container */}
        <div className={cn(
          "mobile-menu-container fixed inset-y-0 right-0 w-full max-w-xs sm:max-w-sm bg-royal-800 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}>
          {/* Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 bg-royal-900 border-b border-royal-700">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gold-500 flex items-center justify-center text-royal-900 font-bold text-xs sm:text-sm">
                {user ? user.name?.charAt(0).toUpperCase() : 'G'}
              </div>
              <div>
                <p className="font-bold text-white text-xs sm:text-sm">
                  {user ? user.name : 'Guest'}
                </p>
                <p className="text-[0.6rem] sm:text-xs text-gold-300">
                  {isAuthenticated ? 'Welcome back!' : 'Sign in to continue'}
                </p>
              </div>
            </div>
            <button
              onClick={closeMobileMenu}
              className="p-1 rounded-full bg-royal-700 hover:bg-royal-600 transition-colors duration-200"
              aria-label="Close menu"
            >
              <X size={18} className="text-gold-300" />
            </button>
          </div>

          {/* Menu Content */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
            {/* Main Menu Items */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-gold-400 uppercase tracking-wider mb-3">
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
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-gold-400 uppercase tracking-wider mb-3">
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
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-gold-400 uppercase tracking-wider mb-3">
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
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-gold-400 uppercase tracking-wider mb-3">
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
                    className="flex items-center space-x-3 p-3 rounded-lg bg-red-600 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group"
                    onClick={closeMobileMenu}
                  >
                    <Settings size={18} className="text-white group-hover:text-red-100 transition-colors duration-300" />
                    <span className="font-bold text-sm text-white group-hover:text-red-100 transition-colors duration-300">
                      Admin Panel
                    </span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-3 sm:p-4 bg-royal-900 border-t border-royal-700">
            <div className="flex space-x-2">
              <CustomButton 
                variant="primary" 
                className="flex-1 h-9 sm:h-10 rounded-lg bg-gold-500 text-royal-900 font-bold text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                onClick={closeMobileMenu}
              >
                {isAuthenticated ? 'Dashboard' : 'Sign In'}
              </CustomButton>
              <a 
                href="tel:7006064587" 
                className="flex-1 flex items-center justify-center h-9 sm:h-10 rounded-lg border-2 border-gold-500 text-gold-500 font-bold text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                <Phone size={16} className="mr-1" />
                <span className="hidden xs:inline">Call Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;