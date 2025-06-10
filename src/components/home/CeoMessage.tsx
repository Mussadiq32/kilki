import { ArrowRight, Crown, Star, Award, Users, Target, Quote, Sparkles, Heart, Zap, Shield, TrendingUp } from 'lucide-react';
import { FaCrown, FaAward, FaHandshake, FaLightbulb, FaRocket, FaGem } from 'react-icons/fa';
import CustomButton from '../ui/CustomButton';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const CeoMessage = () => {
  const achievements = [
    { icon: <FaAward size={20} />, value: "15+", label: "Years Experience", color: "from-gold-400 to-gold-600" },
    { icon: <Users size={20} />, value: "1000+", label: "Happy Clients", color: "from-royal-400 to-royal-600" },
    { icon: <TrendingUp size={20} />, value: "500+", label: "Properties Sold", color: "from-emerald-400 to-emerald-600" },
    { icon: <Star size={20} />, value: "98%", label: "Satisfaction Rate", color: "from-purple-400 to-purple-600" }
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Enhanced Image Section */}
          <motion.div 
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative mx-auto max-w-sm lg:max-w-lg">
              {/* Main Image Container */}
              <div className="relative overflow-hidden rounded-xl lg:rounded-2xl shadow-xl lg:shadow-2xl border-2 lg:border-4 border-gold-200">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-royal-900/20 via-transparent to-transparent z-10" />
                
                {/* Floating Elements */}
                <div className="absolute top-2 lg:top-4 right-2 lg:right-4 z-20">
                  <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full flex items-center justify-center shadow-lg">
                    <Crown size={12} className="lg:w-4 lg:h-4 text-white" />
                  </div>
                </div>
                
                <div className="absolute bottom-2 lg:bottom-4 left-2 lg:left-4 z-20">
                  <div className="w-5 h-5 lg:w-6 lg:h-6 bg-gradient-to-r from-royal-400 to-royal-600 rounded-full flex items-center justify-center shadow-lg">
                    <Star size={10} className="lg:w-3 lg:h-3 text-white" />
                  </div>
                </div>
                
                <img 
                  src="https://iili.io/3KL17mN.jpg" 
                  alt="Basit Mashkor Wani - CEO" 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              {/* Achievement Stats */}
              <div className="grid grid-cols-2 gap-3 lg:gap-4 mt-6 lg:mt-8">
                {achievements.map((achievement, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-lg lg:rounded-xl p-3 lg:p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className={cn(
                      "w-8 h-8 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center mb-2 lg:mb-3 mx-auto",
                      "bg-gradient-to-r shadow-lg",
                      achievement.color
                    )}>
                      <div className="text-white">
                        {achievement.icon}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg lg:text-2xl font-bold text-royal-800 mb-1">{achievement.value}</div>
                      <div className="text-xs lg:text-sm text-royal-600 font-medium">{achievement.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Enhanced Message Section */}
          <motion.div 
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Header Badge */}
            <div className="inline-flex items-center px-3 lg:px-4 py-2 bg-gradient-to-r from-gold-100 to-gold-200 text-gold-700 text-xs lg:text-sm font-semibold rounded-full mb-4 lg:mb-6 shadow-lg">
              <Crown size={14} className="lg:w-4 lg:h-4 mr-2" />
              Message from the CEO
              <Crown size={14} className="lg:w-4 lg:h-4 ml-2" />
            </div>
            
            {/* Main Heading */}
            <h2 className="text-2xl lg:text-4xl xl:text-5xl font-bold text-royal-800 mb-4 lg:mb-6 leading-tight">
              Leadership with <span className="text-gradient bg-gradient-to-r from-gold-600 to-gold-800 bg-clip-text text-transparent">Vision</span>
            </h2>
            
            {/* Quote Card */}
            <div className="relative mb-6 lg:mb-8">
              <div className="bg-gradient-to-br from-royal-50 to-gold-50 rounded-xl lg:rounded-2xl p-4 lg:p-8 shadow-lg border border-gold-100 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-2 lg:top-4 right-2 lg:right-4 w-12 lg:w-16 h-12 lg:h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full" />
                  <div className="absolute bottom-2 lg:bottom-4 left-2 lg:left-4 w-8 lg:w-12 h-8 lg:h-12 bg-gradient-to-br from-royal-400 to-royal-600 rounded-full" />
                </div>
                
                {/* Quote Icon */}
                <div className="absolute top-3 lg:top-6 right-3 lg:right-6">
                  <div className="w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full flex items-center justify-center shadow-lg">
                    <Quote size={16} className="lg:w-5 lg:h-5 text-white" />
                  </div>
                </div>
                
                <div className="relative z-10">
                  <div className="text-base lg:text-xl font-display italic text-royal-700 mb-4 lg:mb-6 leading-relaxed">
                    "With years of experience and dedication, we turn your real estate dreams into reality. At Royal Group of Real Estates, we don't just build properties; we create spaces where memories flourish and investments grow."
                  </div>
                  
                  {/* Vision Statement */}
                  <div className="flex items-start space-x-3 p-3 lg:p-4 bg-white/50 rounded-lg lg:rounded-xl border border-gold-100">
                    <div className="p-1.5 lg:p-2 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-lg">
                      <Target size={14} className="lg:w-4 lg:h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-royal-800 mb-1 text-sm lg:text-base">Our Vision</h4>
                      <p className="text-royal-600 text-xs lg:text-sm">
                        To redefine the real estate landscape in India by offering premium properties that blend traditional values with modern living.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Values Section */}
            <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-6 lg:mb-8">
              {[
                { icon: <Shield size={14} className="lg:w-4 lg:h-4" />, label: "Trust & Integrity", color: "from-blue-400 to-blue-600" },
                { icon: <Heart size={14} className="lg:w-4 lg:h-4" />, label: "Customer First", color: "from-red-400 to-red-600" },
                { icon: <Zap size={14} className="lg:w-4 lg:h-4" />, label: "Innovation", color: "from-purple-400 to-purple-600" },
                { icon: <Star size={14} className="lg:w-4 lg:h-4" />, label: "Excellence", color: "from-gold-400 to-gold-600" }
              ].map((value, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-2 lg:space-x-3 p-2 lg:p-3 bg-white rounded-lg lg:rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                >
                  <div className={cn(
                    "w-6 h-6 lg:w-8 lg:h-8 rounded-lg flex items-center justify-center",
                    "bg-gradient-to-r",
                    value.color
                  )}>
                    <div className="text-white">
                      {value.icon}
                    </div>
                  </div>
                  <span className="text-xs lg:text-sm font-medium text-royal-700">{value.label}</span>
                </motion.div>
              ))}
            </div>
            
            {/* CEO Info */}
            <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-lg border border-gray-100 space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3 lg:space-x-4">
                <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full overflow-hidden border-2 lg:border-4 border-gold-200 shadow-lg">
                  <img 
                    src="https://iili.io/3KL17mN.jpg" 
                    alt="Basit Mashkor Wani" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-royal-800 font-bold text-lg lg:text-xl">Basit Mashkor Wani</h3>
                  <p className="text-royal-600 font-medium text-sm lg:text-base">Founder & CEO</p>
                  <div className="flex items-center mt-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2" />
                    <span className="text-xs text-royal-500">Leading with Vision</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3">
                <div className="hidden sm:flex items-center space-x-2 text-gold-600">
                  <FaHandshake size={14} className="lg:w-4 lg:h-4" />
                  <span className="text-xs lg:text-sm font-medium">Trusted Leader</span>
                </div>
                <CustomButton 
                  variant="primary"
                  icon={<ArrowRight size={16} className="lg:w-[18px] lg:h-[18px]" />} 
                  iconPosition="right"
                  onClick={() => window.open('/about', '_blank')}
                  className="w-full sm:w-auto text-sm lg:text-base px-4 lg:px-6 py-2 lg:py-3"
                >
                  About Us
                </CustomButton>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CeoMessage;
