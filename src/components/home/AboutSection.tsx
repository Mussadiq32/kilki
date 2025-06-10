import { useState, useEffect } from 'react';
import CustomButton from '../ui/CustomButton';
import { 
  CheckCircle, 
  ArrowUpRight, 
  Building, 
  Users, 
  Award, 
  Clock, 
  MapPin, 
  Sparkles,
  Rocket,
  Target,
  Trophy,
  Star,
  Heart,
  Zap,
  TrendingUp,
  Globe,
  Shield,
  Crown,
  ArrowRight,
  Eye,
  Lightbulb,
  Handshake,
  Gem,
  Quote
} from 'lucide-react';
import { FaCrown, FaAward, FaHandshake, FaLightbulb, FaRocket, FaGem, FaBuilding, FaCity, FaMountain, FaTree, FaLandmark } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from 'framer-motion';

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState("vision");
  const [animatedStats, setAnimatedStats] = useState({
    years: 0,
    cities: 0,
    clients: 0,
    projects: 0
  });
  
  const achievements = [
    '15+ years of excellence in real estate',
    'Presence in 8 major Indian cities',
    'Over 1,200 satisfied clients',
    'Award-winning property developments',
    'Expert team of real estate professionals',
    'Commitment to sustainable development'
  ];

  const milestones = [
    { 
      year: 2012, 
      title: 'Foundation', 
      description: 'Royal Group established in J&K with a vision to transform real estate',
      icon: <FaRocket size={20} className="text-white" />,
      color: 'from-blue-400 to-blue-600',
      achievement: 'Started with 5 team members'
    },
    { 
      year: 2015, 
      title: 'First Luxury Project', 
      description: 'Launched Royal Heights, our first premium residential tower',
      icon: <FaCrown size={20} className="text-white" />,
      color: 'from-gold-400 to-gold-600',
      achievement: '100+ luxury units delivered'
    },
    { 
      year: 2018, 
      title: 'National Expansion', 
      description: 'Expanded to Delhi and Bangalore, marking our national presence',
      icon: <Globe size={20} className="text-white" />,
      color: 'from-green-400 to-green-600',
      achievement: '3 cities, 500+ properties'
    },
    { 
      year: 2024, 
      title: 'Industry Leadership', 
      description: 'Recognized as one of India\'s top real estate developers',
      icon: <FaAward size={20} className="text-white" />,
      color: 'from-orange-400 to-orange-600',
      achievement: '8 cities, 1200+ clients'
    }
  ];

  const stats = [
    { icon: <Clock className="w-6 h-6 text-gold-500" />, value: 15, label: 'Years of Excellence', suffix: '+', color: 'from-gold-400 to-gold-600' },
    { icon: <MapPin className="w-6 h-6 text-gold-500" />, value: 8, label: 'Major Cities', suffix: '', color: 'from-royal-400 to-royal-600' },
    { icon: <Users className="w-6 h-6 text-gold-500" />, value: 1200, label: 'Satisfied Clients', suffix: '+', color: 'from-emerald-400 to-emerald-600' },
    { icon: <Building className="w-6 h-6 text-gold-500" />, value: 75, label: 'Premium Projects', suffix: '+', color: 'from-purple-400 to-purple-600' }
  ];

  const values = [
    { icon: <Shield size={20} />, title: "Trust & Integrity", description: "Building lasting relationships through transparency", color: "from-blue-400 to-blue-600" },
    { icon: <Heart size={20} />, title: "Customer First", description: "Your satisfaction is our top priority", color: "from-red-400 to-red-600" },
    { icon: <Zap size={20} />, title: "Innovation", description: "Pioneering new approaches in real estate", color: "from-purple-400 to-purple-600" },
    { icon: <Star size={20} />, title: "Excellence", description: "Delivering premium quality in every project", color: "from-gold-400 to-gold-600" }
  ];

  // Animate stats when in view
  useEffect(() => {
    const animateStats = () => {
      const duration = 2000; // 2 seconds
      const steps = 50;
      const interval = duration / steps;
      
      let counter = 0;
      const timer = setInterval(() => {
        counter++;
        setAnimatedStats({
          years: Math.ceil((15 * counter) / steps),
          cities: Math.ceil((8 * counter) / steps),
          clients: Math.ceil((1200 * counter) / steps),
          projects: Math.ceil((75 * counter) / steps)
        });
        
        if (counter >= steps) {
          clearInterval(timer);
        }
      }, interval);
      
      return () => clearInterval(timer);
    };
    
    animateStats();
  }, []);

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-royal-50 via-white to-gold-50/30" />
      
      {/* Floating Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-gold-200 to-gold-300 rounded-full opacity-20 animate-pulse" />
      <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-royal-200 to-royal-300 rounded-full opacity-20 animate-pulse delay-1000" />
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-br from-gold-300 to-gold-400 rounded-full opacity-20 animate-pulse delay-2000" />
      
      <div className="container mx-auto relative">
        {/* Enhanced Section Header */}
        <motion.div 
          className="text-center mb-12 lg:mb-20 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center px-3 lg:px-4 py-2 bg-gradient-to-r from-gold-100 to-gold-200 text-gold-700 text-xs lg:text-sm font-semibold rounded-full mb-4 lg:mb-6 shadow-lg">
            <Gem size={14} className="lg:w-4 lg:h-4 mr-2" />
            About Royal Group
            <Gem size={14} className="lg:w-4 lg:h-4 ml-2" />
          </div>
          <h2 className="text-2xl lg:text-4xl xl:text-5xl font-bold text-royal-800 mb-4 lg:mb-6">
            Building <span className="text-gradient bg-gradient-to-r from-gold-600 to-gold-800 bg-clip-text text-transparent">Excellence</span> in Real Estate Since 2012
          </h2>
          <p className="text-royal-600 text-sm lg:text-lg leading-relaxed">
            Royal Group of Real Estate has established itself as a premier real estate developer across India's most vibrant cities. With a legacy of excellence and innovation, we've been transforming skylines and creating inspiring spaces.
          </p>
        </motion.div>

        {/* Enhanced Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12 lg:mb-20">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-lg border border-gray-100 text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
            >
              <div className={cn(
                "w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl flex items-center justify-center mb-3 lg:mb-4 mx-auto",
                "bg-gradient-to-r shadow-lg group-hover:shadow-xl transition-all duration-300",
                stat.color
              )}>
                <div className="text-white group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-royal-800 mb-1 lg:mb-2">
                {index === 0 ? animatedStats.years : 
                 index === 1 ? animatedStats.cities : 
                 index === 2 ? animatedStats.clients : 
                 animatedStats.projects}
                {stat.suffix}
              </div>
              <div className="text-royal-600 text-xs lg:text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-center mb-12 lg:mb-20">
          {/* Enhanced Left Column - Image with overlay */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-xl lg:rounded-2xl overflow-hidden shadow-xl lg:shadow-2xl border-2 lg:border-4 border-gold-200">
              <img 
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200" 
                alt="Royal Group of Real Estate Headquarters" 
                className="w-full h-full object-cover rounded-xl lg:rounded-2xl transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-royal-900/40 to-royal-900/10 rounded-xl lg:rounded-2xl"></div>
              
              {/* Floating Elements */}
              <div className="absolute top-2 lg:top-4 right-2 lg:right-4 z-20">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full flex items-center justify-center shadow-lg">
                  <Crown size={12} className="lg:w-4 lg:h-4 text-white" />
                </div>
              </div>
              
              <div className="absolute bottom-2 lg:bottom-4 left-2 lg:left-4 z-20">
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-royal-400 to-royal-600 rounded-full flex items-center justify-center shadow-lg">
                  <Star size={10} className="lg:w-3 lg:h-3 text-white" />
                </div>
              </div>
            </div>
            
            {/* Enhanced Floating CEO Quote */}
            <motion.div 
              className="absolute -bottom-6 -right-6 lg:bottom-10 lg:right-[-80px] bg-white p-4 lg:p-6 rounded-xl lg:rounded-2xl shadow-xl lg:shadow-2xl max-w-[280px] lg:max-w-xs transform transition-all duration-500 hover:shadow-3xl hover:-translate-y-2"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute top-0 left-0 w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full flex items-center justify-center transform -translate-x-4 -translate-y-4 lg:-translate-x-6 lg:-translate-y-6 shadow-lg">
                  <Quote size={12} className="lg:w-4 lg:h-4 text-white" />
                </div>
                <p className="text-royal-800 text-xs lg:text-sm leading-relaxed">
                  "Our mission is to transform the real estate landscape by delivering exceptional properties that enrich lives and communities."
                </p>
                <div className="mt-3 lg:mt-4 flex items-center border-t border-gray-100 pt-3 lg:pt-4">
                  <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-full overflow-hidden bg-royal-100 border-2 border-gold-200">
                    <img 
                      src="https://iili.io/3KL17mN.jpg" 
                      alt="CEO" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-2 lg:ml-3">
                    <p className="text-royal-800 font-medium text-sm lg:text-base">Basit Mashkor Wani</p>
                    <p className="text-royal-600 text-xs lg:text-sm">CEO, Royal Group</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Enhanced Right Column - Tabbed Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Tabs defaultValue="vision" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-6 lg:mb-8 bg-white/80 backdrop-blur-sm border border-gray-200">
                <TabsTrigger value="vision" className="text-xs lg:text-sm font-medium">
                  <Sparkles className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                  Vision & Mission
                </TabsTrigger>
                <TabsTrigger value="achievements" className="text-xs lg:text-sm font-medium">
                  <Award className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                  Achievements
                </TabsTrigger>
                <TabsTrigger value="team" className="text-xs lg:text-sm font-medium">
                  <Users className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                  Our Team
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="vision" className="animate-fade-up">
                <div className="bg-gradient-to-br from-royal-50 to-gold-50 rounded-xl lg:rounded-2xl p-4 lg:p-8 border border-gold-100">
                  <h3 className="text-lg lg:text-xl font-bold text-royal-800 mb-4 lg:mb-6 flex items-center">
                    <Target className="w-5 h-5 lg:w-6 lg:h-6 mr-2 lg:mr-3 text-gold-500" />
                    Our Vision & Mission
                  </h3>
                  <p className="text-royal-600 mb-4 lg:mb-6 leading-relaxed text-sm lg:text-base">
                    At Royal Group, we envision a future where exceptional real estate transforms lives and communities. Our mission is to create spaces that inspire, endure, and appreciate in value while maintaining the highest standards of quality and customer satisfaction.
                  </p>
                  <p className="text-royal-600 mb-6 lg:mb-8 leading-relaxed text-sm lg:text-base">
                    We are committed to sustainable development practices, innovative design, and creating properties that stand the test of time. Our approach combines luxury with functionality, tradition with innovation, and aesthetics with practicality.
                  </p>
                  
                  {/* Values Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 mb-6 lg:mb-8">
                    {values.map((value, index) => (
                      <div key={index} className="flex items-center space-x-2 lg:space-x-3 p-2 lg:p-3 bg-white/50 rounded-lg lg:rounded-xl border border-gold-100">
                        <div className={cn(
                          "w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center",
                          "bg-gradient-to-r shadow-lg",
                          value.color
                        )}>
                          <div className="text-white">
                            {value.icon}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-royal-800 text-xs lg:text-sm">{value.title}</h4>
                          <p className="text-royal-600 text-xs">{value.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <CustomButton 
                    variant="primary"
                    onClick={() => window.open('/about', '_blank')}
                    className="w-full sm:w-auto text-sm lg:text-base px-4 lg:px-6 py-2 lg:py-3"
                  >
                    Our Philosophy
                  </CustomButton>
                </div>
              </TabsContent>
              
              <TabsContent value="achievements" className="animate-fade-up">
                <div className="bg-gradient-to-br from-royal-50 to-gold-50 rounded-xl lg:rounded-2xl p-4 lg:p-8 border border-gold-100">
                  <h3 className="text-lg lg:text-xl font-bold text-royal-800 mb-4 lg:mb-6 flex items-center">
                    <Trophy className="w-5 h-5 lg:w-6 lg:h-6 mr-2 lg:mr-3 text-gold-500" />
                    Key Achievements
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 mb-6 lg:mb-8">
                    {achievements.map((achievement, index) => (
                      <motion.div 
                        key={index} 
                        className="flex items-start p-3 lg:p-4 rounded-lg lg:rounded-xl bg-white/50 border border-gold-100 hover:bg-white/80 transition-all duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <CheckCircle size={16} className="lg:w-5 lg:h-5 text-gold-500 mt-0.5 mr-2 lg:mr-3 flex-shrink-0" />
                        <span className="text-royal-700 text-sm lg:text-base">{achievement}</span>
                      </motion.div>
                    ))}
                  </div>
                  <CustomButton 
                    variant="outline" 
                    icon={<Award size={16} className="lg:w-[18px] lg:h-[18px]" />} 
                    iconPosition="left"
                    onClick={() => window.open('/about#achievements', '_blank')}
                    className="w-full sm:w-auto text-sm lg:text-base px-4 lg:px-6 py-2 lg:py-3"
                  >
                    View Awards
                  </CustomButton>
                </div>
              </TabsContent>
              
              <TabsContent value="team" className="animate-fade-up">
                <div className="bg-gradient-to-br from-royal-50 to-gold-50 rounded-xl lg:rounded-2xl p-4 lg:p-8 border border-gold-100">
                  <h3 className="text-lg lg:text-xl font-bold text-royal-800 mb-4 lg:mb-6 flex items-center">
                    <Users className="w-5 h-5 lg:w-6 lg:h-6 mr-2 lg:mr-3 text-gold-500" />
                    Our Leadership Team
                  </h3>
                  <p className="text-royal-600 mb-4 lg:mb-6 leading-relaxed text-sm lg:text-base">
                    Our success is driven by a team of passionate professionals with decades of combined experience in real estate development, architecture, finance, and customer service.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:gap-4 mb-4 lg:mb-6">
                    {[
                      { name: "Basit Mashkor", role: "CEO", image: "https://iili.io/3KL17mN.jpg" },
                      { name: "", role: "COO", image: "" },
                      { name: "", role: "CFO", image: "" }
                    ].map((member, index) => (
                      <div key={index} className="text-center">
                        <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto rounded-full overflow-hidden mb-2 lg:mb-3 border-2 border-gold-200 shadow-lg">
                          <img 
                            src={member.image} 
                            alt={member.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="font-medium text-royal-800 text-sm lg:text-base">{member.name}</p>
                        <p className="text-xs lg:text-sm text-royal-600">{member.role}</p>
                      </div>
                    ))}
                  </div>
                  <CustomButton 
                    variant="outline" 
                    icon={<Users size={16} className="lg:w-[18px] lg:h-[18px]" />} 
                    iconPosition="left"
                    onClick={() => window.open('/about', '_blank')}
                    className="w-full sm:w-auto text-sm lg:text-base px-4 lg:px-6 py-2 lg:py-3"
                  >
                    Meet The Team
                  </CustomButton>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
        
        {/* Enhanced Timeline Section */}
        <div className="mb-12 lg:mb-16">
          <motion.div 
            className="text-center mb-8 lg:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-3 lg:px-4 py-2 bg-gradient-to-r from-gold-400 to-gold-600 text-white text-xs lg:text-sm font-medium rounded-full mb-3 lg:mb-4 shadow-lg">
              <Clock size={14} className="lg:w-4 lg:h-4 mr-2" />
              Our Journey
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-royal-800 mb-3 lg:mb-4">Milestones That Define Us</h3>
            <p className="text-royal-600 max-w-3xl mx-auto text-sm lg:text-lg">
              From our humble beginnings to becoming one of India's premier real estate developers, explore the key milestones that have shaped our success story.
            </p>
          </motion.div>
          
          <div className="relative">
            {/* Enhanced Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-gold-400 via-gold-500 to-gold-600 rounded-full shadow-lg"></div>
            
            {/* Timeline Items */}
            <div className="relative">
              {milestones.map((milestone, index) => (
                <motion.div 
                  key={index} 
                  className={`flex items-center mb-8 lg:mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div 
                    className={`w-full lg:w-5/12 flex ${index % 2 === 0 ? 'justify-end lg:pr-10' : 'justify-start lg:pl-10'}`}
                  >
                    <motion.div 
                      className="bg-white/95 backdrop-blur-sm p-4 lg:p-6 rounded-xl lg:rounded-2xl shadow-xl border border-gray-100 max-w-sm transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group"
                      whileHover={{ scale: 1.05 }}
                    >
                      {/* Icon and Year Header */}
                      <div className="flex items-center justify-between mb-2 lg:mb-3">
                        <div className={`p-2 lg:p-2.5 bg-gradient-to-r ${milestone.color} rounded-lg shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          {milestone.icon}
                        </div>
                        <div className="text-right">
                          <div className="text-lg lg:text-xl font-bold text-gold-500 mb-1">{milestone.year}</div>
                          <div className="text-xs text-royal-500 font-medium">Milestone</div>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <h4 className="text-base lg:text-lg font-bold text-royal-800 mb-2 group-hover:text-gold-600 transition-colors duration-300">
                        {milestone.title}
                      </h4>
                      <p className="text-royal-600 mb-3 leading-relaxed text-xs lg:text-sm">
                        {milestone.description}
                      </p>
                      
                      {/* Achievement Badge */}
                      <div className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-royal-50 to-gold-50 border border-gold-200 rounded-full text-xs font-medium text-royal-700">
                        <Star size={10} className="mr-1 text-gold-500" />
                        {milestone.achievement}
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Enhanced Center Point */}
                  <motion.div 
                    className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 border-2 lg:border-3 border-white shadow-lg z-10"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.3 }}
                  >
                    <div className="absolute inset-1 bg-white rounded-full"></div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Enhanced Journey Summary */}
          <motion.div 
            className="mt-12 lg:mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-royal-50 to-gold-50 rounded-xl lg:rounded-2xl p-6 lg:p-8 border border-gold-200 shadow-lg">
              <div className="flex flex-wrap justify-center gap-4 lg:gap-6 mb-4 lg:mb-6">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 lg:p-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg">
                    <Rocket size={14} className="lg:w-[18px] lg:h-[18px] text-white" />
                  </div>
                  <span className="text-royal-700 font-semibold text-sm lg:text-base">12+ Years</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 lg:p-2 bg-gradient-to-r from-green-400 to-green-600 rounded-lg">
                    <Globe size={14} className="lg:w-[18px] lg:h-[18px] text-white" />
                  </div>
                  <span className="text-royal-700 font-semibold text-sm lg:text-base">8 Cities</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 lg:p-2 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg">
                    <Heart size={14} className="lg:w-[18px] lg:h-[18px] text-white" />
                  </div>
                  <span className="text-royal-700 font-semibold text-sm lg:text-base">1200+ Clients</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 lg:p-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg">
                    <Trophy size={14} className="lg:w-[18px] lg:h-[18px] text-white" />
                  </div>
                  <span className="text-royal-700 font-semibold text-sm lg:text-base">15+ Awards</span>
                </div>
              </div>
              <p className="text-royal-600 text-sm lg:text-base">
                Our journey continues as we build the future of real estate, one exceptional property at a time.
              </p>
            </div>
          </motion.div>
        </div>
        
        {/* Enhanced CTA Section */}
        <motion.div 
          className="bg-gradient-to-r from-royal-800 to-royal-900 rounded-xl lg:rounded-2xl p-6 lg:p-10 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 lg:top-4 right-2 lg:right-4 w-12 lg:w-16 h-12 lg:h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full" />
            <div className="absolute bottom-2 lg:bottom-4 left-2 lg:left-4 w-8 lg:w-12 h-8 lg:h-12 bg-gradient-to-br from-royal-400 to-royal-600 rounded-full" />
          </div>
          
          <div className="relative z-10">
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 lg:mb-4">Ready to find your dream property?</h3>
            <p className="text-royal-100 mb-6 lg:mb-8 max-w-2xl mx-auto text-sm lg:text-base">
              Explore our portfolio of premium properties across India's most vibrant cities and discover why Royal Group is the trusted name in real estate.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center">
              <CustomButton 
                variant="primary"
                onClick={() => window.open('/properties', '_blank')}
                className="w-full sm:w-auto text-sm lg:text-base px-4 lg:px-6 py-2 lg:py-3"
              >
                Browse Properties
              </CustomButton>
              <CustomButton 
                variant="outline" 
                icon={<ArrowUpRight size={16} className="lg:w-[18px] lg:h-[18px]" />} 
                iconPosition="right"
                onClick={() => window.open('/contact', '_blank')}
                className="w-full sm:w-auto text-sm lg:text-base px-4 lg:px-6 py-2 lg:py-3"
              >
                Contact Us
              </CustomButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
