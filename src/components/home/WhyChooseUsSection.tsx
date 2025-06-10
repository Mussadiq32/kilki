import { GraduationCap, Home, Shield, Star, Clock, Users, Award, TrendingUp, Heart, Zap, Target, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  stats?: string;
  className?: string;
}

const FeatureCard = ({ icon, title, description, gradient, stats, className }: FeatureCardProps) => {
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
        <p className="text-royal-600 leading-relaxed mb-4 group-hover:text-royal-700 transition-colors duration-300">
          {description}
        </p>
        
        {/* Stats Badge */}
        {stats && (
          <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-gold-100 to-gold-200 text-gold-700 text-sm font-semibold rounded-full mb-4">
            <TrendingUp size={14} className="mr-1" />
            {stats}
          </div>
        )}
        
        {/* Learn More Button */}
        <div 
          className="flex items-center text-gold-600 group-hover:text-gold-700 transition-colors duration-300 cursor-pointer"
          onClick={() => {
            // Map features to their respective pages
            const featurePages: { [key: string]: string } = {
              'Expert Guidance': '/about',
              'Wide Property Listings': '/properties',
              'Legal Assistance': '/services/legal',
              'Customer Satisfaction': '/testimonials',
              'Timely Delivery': '/contact',
              'Client-Centric Approach': '/about'
            };
            const page = featurePages[title] || '/about';
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

const WhyChooseUsSection = () => {
  const features = [
    {
      icon: <GraduationCap size={28} />,
      title: 'Expert Guidance',
      description: 'Professional advice from real estate experts with decades of combined experience.',
      gradient: "bg-gradient-to-br from-blue-400 to-purple-500",
      stats: "15+ Years Experience"
    },
    {
      icon: <Home size={28} />,
      title: 'Wide Property Listings',
      description: 'Diverse options for buyers and investors across multiple cities and property types.',
      gradient: "bg-gradient-to-br from-emerald-400 to-teal-500",
      stats: "1000+ Properties"
    },
    {
      icon: <Shield size={28} />,
      title: 'Legal Assistance',
      description: 'Comprehensive legal support ensuring smooth and secure transactions.',
      gradient: "bg-gradient-to-br from-orange-400 to-red-500",
      stats: "100% Secure"
    },
    {
      icon: <Star size={28} />,
      title: 'Customer Satisfaction',
      description: 'Trusted by hundreds of clients with a proven track record of excellence.',
      gradient: "bg-gradient-to-br from-purple-400 to-pink-500",
      stats: "98% Satisfaction"
    },
    {
      icon: <Clock size={28} />,
      title: 'Timely Delivery',
      description: 'We value your time and ensure prompt delivery of all our services.',
      gradient: "bg-gradient-to-br from-indigo-400 to-blue-500",
      stats: "24/7 Support"
    },
    {
      icon: <Users size={28} />,
      title: 'Client-Centric Approach',
      description: 'Your requirements and satisfaction are our top priorities.',
      gradient: "bg-gradient-to-br from-green-400 to-emerald-500",
      stats: "500+ Happy Clients"
    }
  ];

  const stats = [
    { icon: <Award size={24} />, value: "15+", label: "Years Experience", color: "from-gold-400 to-gold-600" },
    { icon: <Home size={24} />, value: "1000+", label: "Properties Listed", color: "from-royal-400 to-royal-600" },
    { icon: <Heart size={24} />, value: "500+", label: "Happy Clients", color: "from-emerald-400 to-emerald-600" },
    { icon: <Zap size={24} />, value: "98%", label: "Success Rate", color: "from-purple-400 to-purple-600" }
  ];

  return (
    <section className="section-padding relative overflow-hidden">
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
            <Target size={16} className="mr-2" />
            Why Choose Royal Group
            <Target size={16} className="ml-2" />
          </div>
          
          <h2 className="heading-lg text-royal-800 mb-6 animate-fade-up animate-delay-100">
            What Makes Us <span className="text-gradient bg-gradient-to-r from-gold-600 to-gold-800 bg-clip-text text-transparent">Different</span>
          </h2>
          
          <p className="text-royal-600 text-lg leading-relaxed animate-fade-up animate-delay-200 max-w-3xl mx-auto">
            At Royal Group of Real Estate, we strive to provide exceptional service and unmatched expertise
            to make your property journey seamless and rewarding.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center animate-fade-up"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4",
                "bg-gradient-to-br shadow-lg",
                stat.color
              )}>
                <div className="text-white">
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl font-bold text-royal-800 mb-2">{stat.value}</div>
              <div className="text-royal-600 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="animate-fade-up"
              style={{ animationDelay: `${(index + 1) * 150}ms` }}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                gradient={feature.gradient}
                stats={feature.stats}
              />
            </div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-up animate-delay-700">
          <div 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-white rounded-full font-semibold hover:from-gold-600 hover:to-gold-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
            onClick={() => window.open('/contact', '_blank')}
          >
            <span>Start Your Journey</span>
            <ArrowRight size={20} className="ml-2" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
