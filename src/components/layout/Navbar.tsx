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

  // No more dropdown toggles for mobile, as we are prioritizing scrollable content
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleToolsDropdown = () => {
    setIsToolsDropdownOpen(!isToolsDropdownOpen);
  };

  return (
    <header className={`fixed w-full z-[9999] transition-all duration-300 backdrop-blur-sm ${isScrolled ? 'bg-white/90 dark:bg-royal-900/90 shadow-lg py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center transition-transform hover:scale-105">
          <img 
            src={isScrolled ? "https://iili.io/2mPx3rP.png" : "https://iili.io/2mPxFWb.png"} 
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
            >
              Services
              <ChevronDown size={16} className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
            </button>
            {isDropdownOpen && !isMobileMenuOpen && ( // Hide desktop dropdown when mobile menu is open
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
            >
              Tools
              <ChevronDown size={16} className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
            </button>
            {isToolsDropdownOpen && !isMobileMenuOpen && ( // Hide desktop dropdown when mobile menu is open
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
          
          {/* HAMBURGER MENU BUTTON */}
          <button 
            className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-white/90 dark:bg-royal-800/90 backdrop-blur-sm shadow-lg text-gray-700 dark:text-white transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gold-300"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
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
          "mobile-menu-container fixed inset-0 flex items-center justify-center transition-all duration-500 ease-in-out",
          isMobileMenuOpen ? "scale-100 opacity-100" : "scale-75 opacity-0"
        )}>
          {/* Central Hub */}
          <div className="relative w-80 h-80">
            {/* User Profile Center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative group cursor-pointer" onClick={closeMobileMenu}>
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold-400 via-royal-500 to-gold-600 flex items-center justify-center text-white font-bold text-2xl shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-gold-500/25">
                  {user ? user.name?.charAt(0).toUpperCase() : 'G'}
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white dark:bg-royal-800 px-3 py-1 rounded-full shadow-lg text-xs font-medium text-gray-700 dark:text-white whitespace-nowrap">
                  {user ? user.name : 'Guest'}
                </div>
              </div>
            </div>

            {/* Orbital Menu Items */}
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const angle = (index * 360) / menuItems.length;
              const radius = 120;
              const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
              const y = Math.sin((angle - 90) * Math.PI / 180) * radius;
              
              return (
                <div
                  key={item.name}
                  className="absolute w-16 h-16 transition-all duration-700 ease-out"
                  style={{
                    left: `calc(50% + ${x}px - 32px)`,
                    top: `calc(50% + ${y}px - 32px)`,
                    transform: isMobileMenuOpen ? 'scale(1)' : 'scale(0)',
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <Link
                    to={item.path}
                    className="w-full h-full rounded-full bg-white/90 dark:bg-royal-800/90 backdrop-blur-sm border border-white/20 dark:border-royal-600/20 flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 group"
                    onClick={closeMobileMenu}
                  >
                    <Icon size={24} className="text-royal-600 dark:text-gold-400 group-hover:text-gold-500 dark:group-hover:text-gold-300 transition-colors duration-300" />
                  </Link>
                </div>
              );
            })}

            {/* Outer Ring - Services */}
            {serviceItems.map((item, index) => {
              const angle = (index * 360) / serviceItems.length;
              const radius = 180;
              const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
              const y = Math.sin((angle - 90) * Math.PI / 180) * radius;
              
              return (
                <div
                  key={item.name}
                  className="absolute w-20 h-20 transition-all duration-700 ease-out"
                  style={{
                    left: `calc(50% + ${x}px - 40px)`,
                    top: `calc(50% + ${y}px - 40px)`,
                    transform: isMobileMenuOpen ? 'scale(1)' : 'scale(0)',
                    transitionDelay: `${(index + menuItems.length) * 100}ms`
                  }}
                >
                  <Link
                    to={item.path}
                    className="w-full h-full rounded-2xl bg-gradient-to-br from-gold-400/80 to-royal-500/80 backdrop-blur-sm border border-gold-300/30 dark:border-royal-400/30 flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 group"
                    onClick={closeMobileMenu}
                  >
                    <span className="text-xs font-bold text-white text-center px-1 leading-tight">{item.name}</span>
                  </Link>
                </div>
              );
            })}

            {/* Tools Ring - External Links */}
            {toolItems.map((item, index) => {
              const angle = (index * 360) / toolItems.length;
              const radius = 240;
              const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
              const y = Math.sin((angle - 90) * Math.PI / 180) * radius;
              
              return (
                <div
                  key={item.name}
                  className="absolute w-16 h-16 transition-all duration-700 ease-out"
                  style={{
                    left: `calc(50% + ${x}px - 32px)`,
                    top: `calc(50% + ${y}px - 32px)`,
                    transform: isMobileMenuOpen ? 'scale(1)' : 'scale(0)',
                    transitionDelay: `${(index + menuItems.length + serviceItems.length) * 100}ms`
                  }}
                >
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-full rounded-full bg-gradient-to-br from-royal-500/80 to-royal-600/80 backdrop-blur-sm border border-royal-400/30 flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 group"
                    onClick={closeMobileMenu}
                  >
                    <span className="text-xs font-bold text-white text-center px-1 leading-tight">{item.name.split(' ')[0]}</span>
                  </a>
                </div>
              );
            })}

            {/* Floating Action Buttons */}
            <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-4">
              <CustomButton 
                variant="primary" 
                className="w-32 h-12 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 text-white font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                onClick={closeMobileMenu}
              >
                {isAuthenticated ? 'Dashboard' : 'Sign In'}
              </CustomButton>
              <a 
                href="tel:7006064587" 
                className="w-32 h-12 rounded-full bg-gradient-to-r from-royal-500 to-royal-700 text-white font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center"
                onClick={closeMobileMenu}
              >
                <Phone size={18} />
              </a>
            </div>

            {/* Admin Panel - Special Position */}
            {isAuthenticated && isAdmin && (
              <div
                className="absolute w-16 h-16 transition-all duration-700 ease-out"
                style={{
                  left: 'calc(50% + 0px - 32px)',
                  top: 'calc(50% + 140px - 32px)',
                  transform: isMobileMenuOpen ? 'scale(1)' : 'scale(0)',
                  transitionDelay: '800ms'
                }}
              >
                <Link
                  to="/admin"
                  className="w-full h-full rounded-full bg-gradient-to-br from-red-500/80 to-red-600/80 backdrop-blur-sm border border-red-300/30 flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 group"
                  onClick={closeMobileMenu}
                >
                  <Settings size={24} className="text-white group-hover:text-red-100 transition-colors duration-300" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;