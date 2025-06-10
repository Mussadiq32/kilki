import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Home, Briefcase, Wrench, Info, Mail, Settings, ClipboardList, Handshake, Wallet, LandPlot, Sparkles, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import CustomButton from '../ui/CustomButton';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from '@/contexts/ThemeContext';

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
    <header className={`fixed w-full z-[9999] transition-all duration-500 ease-out ${isScrolled ? 'bg-white/80 dark:bg-royal-900/80 backdrop-blur-xl shadow-2xl shadow-black/10 py-3 sm:py-4' : 'bg-transparent py-4 sm:py-6'}`}>
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gold-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-royal-400/40 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-gold-300/20 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 flex justify-between items-center relative">
        {/* Logo with enhanced styling */}
        <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center group transition-all duration-300 hover:scale-105">
          <div className="relative">
            <img 
              src={isScrolled ? "https://iili.io/2mPx3rP.png" : "https://iili.io/2mPxFWb.png"} 
              alt="Royal Group of Real Estates Logo" 
              className="h-8 sm:h-10 md:h-12 transition-all duration-300 group-hover:drop-shadow-lg"
            />
            {/* Animated crown effect */}
            <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Crown size={16} className="text-gold-500 animate-pulse" />
            </div>
          </div>
        </a>
        
        {/* Desktop Navigation */}
        <nav className={`hidden lg:flex items-center space-x-1 ${isScrolled ? 'text-royal-800 dark:text-white' : 'text-white'}`}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <a 
                key={item.name}
                href={item.path} 
                target="_blank"
                rel="noopener noreferrer"
                className="relative group px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:-translate-y-0.5 hover:text-gold-500"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <Icon size={16} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span>{item.name}</span>
                </span>
                {/* Hover background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-royal-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"></div>
                {/* Bottom border animation */}
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-gold-400 to-gold-600 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
              </a>
            );
          })}

          {/* Services Dropdown */}
          <div className="relative group">
            <button 
              onClick={toggleDropdown}
              className="flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:-translate-y-0.5 hover:text-gold-500 group-hover:bg-white/10 backdrop-blur-sm"
            >
              <span className="flex items-center space-x-2">
                <Briefcase size={16} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span>Services</span>
              </span>
              <ChevronDown size={16} className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
            </button>
            {isDropdownOpen && !isMobileMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white/95 dark:bg-royal-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-royal-700/50 py-3 z-[1000] animate-in fade-in-0 zoom-in-95 duration-300">
                {serviceItems.map((item, index) => (
                  <a 
                    key={item.name}
                    href={item.path} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 mx-2 rounded-xl text-royal-800 dark:text-white hover:bg-gradient-to-r hover:from-gold-50 hover:to-royal-50 dark:hover:from-royal-800/50 dark:hover:to-royal-700/50 hover:text-gold-600 dark:hover:text-gold-400 transition-all duration-300 hover:translate-x-1"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full"></div>
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Tools Dropdown */}
          <div className="relative group">
            <button 
              onClick={toggleToolsDropdown}
              className="flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:-translate-y-0.5 hover:text-gold-500 group-hover:bg-white/10 backdrop-blur-sm"
            >
              <span className="flex items-center space-x-2">
                <Wrench size={16} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span>Tools</span>
              </span>
              <ChevronDown size={16} className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
            </button>
            {isToolsDropdownOpen && !isMobileMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white/95 dark:bg-royal-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-royal-700/50 py-3 z-[1000] animate-in fade-in-0 zoom-in-95 duration-300">
                {toolItems.map((item, index) => (
                  <a 
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 mx-2 rounded-xl text-royal-800 dark:text-white hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:translate-x-1"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-600 rounded-full"></div>
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
          
          {isAuthenticated && isAdmin && (
            <a 
              href="/admin" 
              target="_blank"
              rel="noopener noreferrer"
              className="relative group px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:-translate-y-0.5 hover:text-red-500"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <Settings size={16} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span>Admin</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"></div>
            </a>
          )}
        </nav>
        
        {/* Right side actions */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Contact button with enhanced styling */}
          <a 
            href="tel:7006064587" 
            className={cn(
              "hidden md:flex items-center font-medium transition-all duration-300 hover:-translate-y-0.5 group px-3 py-2 rounded-xl",
              isScrolled 
                ? "text-royal-800 dark:text-white hover:text-gold-500 hover:bg-gold-50 dark:hover:bg-gold-900/20" 
                : "text-white hover:text-gold-300 hover:bg-white/10 backdrop-blur-sm"
            )}
          >
            <Phone size={18} className="mr-2 group-hover:animate-pulse" />
            <span>Contact Us</span>
          </a>
          
          {/* Theme toggle with enhanced styling */}
          <ThemeToggle 
            className="ml-4" 
            size="sm" 
            showLabel={false}
          />
          
          {/* Sign in button with gradient */}
          <a href="/auth" target="_blank" rel="noopener noreferrer">
            <CustomButton 
              variant={isScrolled ? "primary" : "outline"} 
              size="sm"
              className={cn(
                "text-xs sm:text-sm px-4 py-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg",
                !isScrolled 
                  ? "border-white text-white hover:bg-white hover:text-royal-800 hover:shadow-white/20" 
                  : "bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 shadow-lg shadow-gold-500/25"
              )}
            >
              <span className="flex items-center space-x-2">
                <Sparkles size={14} className="animate-pulse" />
                <span>{isAuthenticated ? 'Dashboard' : 'Sign In'}</span>
              </span>
            </CustomButton>
          </a>
          
          {/* Optimized hamburger menu button */}
          <button 
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-white/90 dark:bg-royal-800/90 backdrop-blur-sm shadow-md text-gray-700 dark:text-white transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold-300 group"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="relative w-5 h-5">
              {/* Top line */}
              <span className={cn(
                "absolute left-0 w-5 h-0.5 bg-current transition-all duration-200 ease-in-out group-hover:bg-gold-500",
                isMobileMenuOpen ? "rotate-45 top-2" : "top-0"
              )} />
              {/* Middle line */}
              <span className={cn(
                "absolute left-0 w-5 h-0.5 bg-current transition-all duration-200 ease-in-out top-2 group-hover:bg-gold-500",
                isMobileMenuOpen ? "opacity-0" : "opacity-100"
              )} />
              {/* Bottom line */}
              <span className={cn(
                "absolute left-0 w-5 h-0.5 bg-current transition-all duration-200 ease-in-out group-hover:bg-gold-500",
                isMobileMenuOpen ? "-rotate-45 top-2" : "top-4"
              )} />
            </div>
          </button>
        </div>
      </div>
      
      {/* Optimized Mobile Menu Overlay */}
      <div className={cn(
        "lg:hidden fixed inset-0 z-[9999] transition-all duration-300 ease-in-out",
        isMobileMenuOpen 
          ? "opacity-100 pointer-events-auto" 
          : "opacity-0 pointer-events-none"
      )}>
        {/* Simplified backdrop */}
        <div 
          className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
          onClick={closeMobileMenu}
        />
        
        {/* Optimized Menu Container */}
        <div className={cn(
          "fixed inset-0 flex items-center justify-center transition-all duration-300 ease-in-out p-4",
          isMobileMenuOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}>
          {/* Simplified Mobile Menu */}
          <div className="w-full max-w-sm bg-white dark:bg-royal-900 rounded-2xl shadow-xl border border-gray-200 dark:border-royal-700 overflow-hidden">
            {/* Simplified Header */}
            <div className="p-4 border-b border-gray-200 dark:border-royal-700 bg-gray-50 dark:bg-royal-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-white font-bold text-sm">
                    {user ? user.name?.charAt(0).toUpperCase() : 'G'}
                  </div>
                  <div>
                    <p className="text-gray-800 dark:text-white font-semibold text-sm">
                      {user ? user.name : 'Guest'}
                    </p>
                    <p className="text-gray-500 dark:text-gray-300 text-xs">
                      {isAuthenticated ? 'Welcome back!' : 'Sign in to continue'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-lg bg-gray-200 dark:bg-royal-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-royal-600 transition-colors duration-200"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Simplified Menu Items */}
            <div className="p-4 space-y-2">
              {/* Main Navigation */}
              <div className="space-y-1">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 py-2">
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
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-royal-800 transition-colors duration-200"
                      onClick={closeMobileMenu}
                    >
                      <div className="p-1.5 bg-gold-500 rounded-lg">
                        <Icon size={16} className="text-white" />
                      </div>
                      <span className="font-medium text-sm">{item.name}</span>
                    </a>
                  );
                })}
              </div>

              {/* Services */}
              <div className="space-y-1 pt-2">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 py-2">
                  Services
                </h3>
                {serviceItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-royal-800 transition-colors duration-200"
                    onClick={closeMobileMenu}
                  >
                    <div className="p-1.5 bg-blue-500 rounded-lg">
                      <Briefcase size={16} className="text-white" />
                    </div>
                    <span className="font-medium text-sm">{item.name}</span>
                  </a>
                ))}
              </div>

              {/* Tools */}
              <div className="space-y-1 pt-2">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 py-2">
                  Tools
                </h3>
                {toolItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-royal-800 transition-colors duration-200"
                    onClick={closeMobileMenu}
                  >
                    <div className="p-1.5 bg-purple-500 rounded-lg">
                      <Wrench size={16} className="text-white" />
                    </div>
                    <span className="font-medium text-sm">{item.name}</span>
                  </a>
                ))}
              </div>

              {/* Admin Panel */}
              {isAuthenticated && isAdmin && (
                <div className="space-y-1 pt-2">
                  <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 py-2">
                    Admin
                  </h3>
                  <a
                    href="/admin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                    onClick={closeMobileMenu}
                  >
                    <div className="p-1.5 bg-red-500 rounded-lg">
                      <Settings size={16} className="text-white" />
                    </div>
                    <span className="font-medium text-sm">Admin Panel</span>
                  </a>
                </div>
              )}
            </div>

            {/* Simplified Footer Actions */}
            <div className="p-4 border-t border-gray-200 dark:border-royal-700 space-y-2 bg-gray-50 dark:bg-royal-800">
              <a href="/auth" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>
                <CustomButton 
                  variant="primary" 
                  className="w-full bg-gold-500 hover:bg-gold-600 text-white font-semibold py-2.5 rounded-lg transition-colors duration-200"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <Sparkles size={14} />
                    <span className="text-sm">{isAuthenticated ? 'Go to Dashboard' : 'Sign In / Register'}</span>
                  </span>
                </CustomButton>
              </a>
              
              <a 
                href="tel:7006064587" 
                className="flex items-center justify-center space-x-2 w-full bg-royal-500 hover:bg-royal-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                <Phone size={16} />
                <span className="text-sm">Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
