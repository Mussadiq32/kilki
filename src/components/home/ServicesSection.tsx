import { Home, Building, Key, Coins, Users, LineChart, ArrowRight, Star, Shield, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  className?: string;
}

const ServiceCard = ({ icon, title, description, gradient, className }: ServiceCardProps) => {
  return (
    <div className={cn(
      "group relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 overflow-hidden",
      "hover:scale-105 hover:-translate-y-2",
      className
    )}>
      {/* Gradient Background */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500",
        gradient
      )} />
      
      {/* Floating Elements */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
        <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
      </div>
      
      {/* Icon Container */}
      <div className="relative">
        <div className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110",
          "bg-gradient-to-br from-gold-50 to-gold-100 group-hover:from-gold-100 group-hover:to-gold-200",
          "shadow-lg group-hover:shadow-xl"
        )}>
          <div className="text-gold-600 group-hover:text-gold-700 transition-colors duration-300">
            {icon}
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-gold-200 to-gold-300 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100" />
        <div className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-gradient-to-br from-royal-200 to-royal-300 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200" />
      </div>
      
      {/* Content */}
      <div className="relative">
        <h3 className="text-xl font-display font-bold text-royal-800 mb-4 group-hover:text-royal-900 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-royal-600 leading-relaxed mb-6 group-hover:text-royal-700 transition-colors duration-300">
          {description}
        </p>
        
        {/* Learn More Button */}
        <div 
          className="flex items-center text-gold-600 group-hover:text-gold-700 transition-colors duration-300 cursor-pointer"
          onClick={() => {
            // Map services to their respective pages
            const servicePages: { [key: string]: string } = {
              'Residential Properties': '/properties?type=residential',
              'Commercial Real Estate': '/properties?type=commercial',
              'Property Management': '/services/property-management',
              'Investment Advisory': '/services/investment',
              'Consultation Services': '/contact',
              'Market Analysis': '/services/market-analysis'
            };
            const page = servicePages[title] || '/services';
            window.open(page, '_blank');
          }}
        >
          <span className="text-sm font-medium mr-2">Learn More</span>
          <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
      
      {/* Bottom Border Animation */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-gold-400 to-gold-600 group-hover:w-full transition-all duration-500" />
    </div>
  );
};

const ServicesSection = () => {
  const services = [
    {
      icon: <Home size={28} />,
      title: "Residential Properties",
      description: "Discover your dream home with our extensive range of residential properties, from luxury apartments to spacious villas.",
      gradient: "bg-gradient-to-br from-blue-400 to-purple-500"
    },
    {
      icon: <Building size={28} />,
      title: "Commercial Real Estate",
      description: "Premium office spaces and retail properties designed to maximize business potential in prime locations.",
      gradient: "bg-gradient-to-br from-emerald-400 to-teal-500"
    },
    {
      icon: <Key size={28} />,
      title: "Property Management",
      description: "Comprehensive property management services ensuring hassle-free ownership and optimized returns.",
      gradient: "bg-gradient-to-br from-orange-400 to-red-500"
    },
    {
      icon: <Coins size={28} />,
      title: "Investment Advisory",
      description: "Expert guidance on real estate investments to help you make informed decisions for maximum returns.",
      gradient: "bg-gradient-to-br from-purple-400 to-pink-500"
    },
    {
      icon: <Users size={28} />,
      title: "Consultation Services",
      description: "Personalized consultation to understand your requirements and find properties that perfectly match your needs.",
      gradient: "bg-gradient-to-br from-indigo-400 to-blue-500"
    },
    {
      icon: <LineChart size={28} />,
      title: "Market Analysis",
      description: "In-depth market analysis and reports to keep you updated on the latest trends in the real estate market.",
      gradient: "bg-gradient-to-br from-green-400 to-emerald-500"
    }
  ];

  return (
    <section id="services" className="section-padding relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-royal-50 via-white to-gold-50/30" />
      
      {/* Floating Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-gold-200 to-gold-300 rounded-full opacity-20 animate-pulse" />
      <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-royal-200 to-royal-300 rounded-full opacity-20 animate-pulse delay-1000" />
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-br from-gold-300 to-gold-400 rounded-full opacity-20 animate-pulse delay-2000" />
      
      <div className="container mx-auto relative">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gold-100 to-gold-200 text-gold-700 text-sm font-semibold rounded-full mb-6 animate-fade-up shadow-lg">
            <Star size={16} className="mr-2" />
            Our Premium Services
            <Star size={16} className="ml-2" />
          </div>
          
          <h2 className="heading-lg text-royal-800 mb-6 animate-fade-up animate-delay-100">
            Comprehensive <span className="text-gradient bg-gradient-to-r from-gold-600 to-gold-800 bg-clip-text text-transparent">Real Estate</span> Solutions
          </h2>
          
          <p className="text-royal-600 text-lg leading-relaxed animate-fade-up animate-delay-200 max-w-3xl mx-auto">
            Royal Group offers a wide range of property services designed to meet the diverse needs of our clients, from finding your dream home to making smart investment decisions.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex items-center justify-center mt-8 space-x-8 animate-fade-up animate-delay-300">
            <div className="flex items-center text-royal-600">
              <Shield size={20} className="mr-2 text-gold-500" />
              <span className="text-sm font-medium">Trusted & Secure</span>
            </div>
            <div className="flex items-center text-royal-600">
              <Award size={20} className="mr-2 text-gold-500" />
              <span className="text-sm font-medium">Award Winning</span>
            </div>
            <div className="flex items-center text-royal-600">
              <Users size={20} className="mr-2 text-gold-500" />
              <span className="text-sm font-medium">Expert Team</span>
            </div>
          </div>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="animate-fade-up"
              style={{ animationDelay: `${(index + 1) * 150}ms` }}
            >
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                gradient={service.gradient}
              />
            </div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-up animate-delay-700">
          <div 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-white rounded-full font-semibold hover:from-gold-600 hover:to-gold-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
            onClick={() => window.open('/services', '_blank')}
          >
            <span>Explore All Services</span>
            <ArrowRight size={20} className="ml-2" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
