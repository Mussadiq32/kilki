import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Calculator, IndianRupee, Percent, Calendar, TrendingUp, Home, CreditCard, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MortgageValues {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  downPayment: number;
}

const MortgageCalculator = () => {
  const [values, setValues] = useState<MortgageValues>({
    loanAmount: 5000000, // 50 lakhs default
    interestRate: 8.5, // typical Indian home loan rate
    loanTerm: 20,
    downPayment: 20,
  });

  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  const calculateMortgage = () => {
    const principal = values.loanAmount * (1 - values.downPayment / 100);
    const monthlyRate = values.interestRate / 100 / 12;
    const numberOfPayments = values.loanTerm * 12;

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    setMonthlyPayment(monthlyPayment);
    setTotalPayment(totalPayment);
    setTotalInterest(totalInterest);
  };

  useEffect(() => {
    calculateMortgage();
  }, [values]);

  const formatCurrency = (value: number) => {
    // Format in Indian numbering system with Rupee symbol
    const formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    
    // For very large numbers, also show in lakhs/crores
    if (value >= 10000000) { // 1 crore
      const crores = value / 10000000;
      return `${formatter.format(value)} (${crores.toFixed(1)} Cr)`;
    } else if (value >= 100000) { // 1 lakh
      const lakhs = value / 100000;
      return `${formatter.format(value)} (${lakhs.toFixed(1)} L)`;
    }
    
    return formatter.format(value);
  };

  const handleInputChange = (field: keyof MortgageValues, value: number) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="section-padding bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-gold-200/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-royal-200/20 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gold-100 to-amber-100 text-gold-700 text-sm font-semibold rounded-full mb-6 shadow-sm border border-gold-200/50">
            <Calculator className="w-4 h-4 mr-2" />
            Smart Mortgage Calculator
          </div>
          <h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-royal-900 mb-6 lg:mb-8 leading-tight">
            Plan Your <span className="bg-gradient-to-r from-gold-600 to-amber-600 bg-clip-text text-transparent">Dream Home</span>
          </h2>
          <p className="text-royal-600 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            Get instant estimates on your monthly payments and discover the perfect financing option for your investment.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Calculator Inputs */}
          <motion.div variants={itemVariants}>
            <Card className="p-6 lg:p-8 bg-white/80 backdrop-blur-sm border-0 shadow-2xl shadow-royal-900/5 rounded-2xl">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-amber-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold text-royal-900">Loan Details</h3>
                  <p className="text-royal-600 text-sm">Enter your loan information</p>
                </div>
              </div>

              <div className="space-y-8">
                <motion.div 
                  className="group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block">
                    <span className="text-royal-800 font-semibold mb-3 block text-base lg:text-lg flex items-center">
                      <IndianRupee className="w-4 h-4 mr-2 text-gold-600" />
                      Loan Amount
                    </span>
                    <div className="relative">
                      <Input
                        type="number"
                        value={values.loanAmount}
                        onChange={(e) => handleInputChange('loanAmount', Number(e.target.value))}
                        className="text-lg lg:text-xl font-semibold border-2 border-royal-200 focus:border-gold-500 focus:ring-4 focus:ring-gold-100 rounded-xl px-4 py-3 transition-all duration-200"
                        placeholder="Enter loan amount"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-royal-400 text-sm">
                        ₹
                      </div>
                    </div>
                    <Slider
                      value={[values.loanAmount]}
                      onValueChange={(value) => handleInputChange('loanAmount', value[0])}
                      min={1000000}
                      max={50000000}
                      step={100000}
                      className="mt-4"
                    />
                    <div className="flex justify-between text-xs text-royal-500 mt-2">
                      <span>10 Lakhs</span>
                      <span>5 Crores</span>
                    </div>
                  </label>
                </motion.div>

                <motion.div 
                  className="group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block">
                    <span className="text-royal-800 font-semibold mb-3 block text-base lg:text-lg flex items-center">
                      <Percent className="w-4 h-4 mr-2 text-gold-600" />
                      Interest Rate
                    </span>
                    <div className="relative">
                      <Input
                        type="number"
                        value={values.interestRate}
                        onChange={(e) => handleInputChange('interestRate', Number(e.target.value))}
                        className="text-lg lg:text-xl font-semibold border-2 border-royal-200 focus:border-gold-500 focus:ring-4 focus:ring-gold-100 rounded-xl px-4 py-3 transition-all duration-200"
                        step="0.1"
                        placeholder="Enter interest rate"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-royal-400 text-sm">
                        %
                      </div>
                    </div>
                    <Slider
                      value={[values.interestRate]}
                      onValueChange={(value) => handleInputChange('interestRate', value[0])}
                      min={1}
                      max={15}
                      step={0.1}
                      className="mt-4"
                    />
                    <div className="flex justify-between text-xs text-royal-500 mt-2">
                      <span>1%</span>
                      <span>15%</span>
                    </div>
                  </label>
                </motion.div>

                <motion.div 
                  className="group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block">
                    <span className="text-royal-800 font-semibold mb-3 block text-base lg:text-lg flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gold-600" />
                      Loan Term
                    </span>
                    <div className="relative">
                      <Input
                        type="number"
                        value={values.loanTerm}
                        onChange={(e) => handleInputChange('loanTerm', Number(e.target.value))}
                        className="text-lg lg:text-xl font-semibold border-2 border-royal-200 focus:border-gold-500 focus:ring-4 focus:ring-gold-100 rounded-xl px-4 py-3 transition-all duration-200"
                        placeholder="Enter loan term"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-royal-400 text-sm">
                        Years
                      </div>
                    </div>
                    <Slider
                      value={[values.loanTerm]}
                      onValueChange={(value) => handleInputChange('loanTerm', value[0])}
                      min={5}
                      max={30}
                      step={1}
                      className="mt-4"
                    />
                    <div className="flex justify-between text-xs text-royal-500 mt-2">
                      <span>5 Years</span>
                      <span>30 Years</span>
                    </div>
                  </label>
                </motion.div>

                <motion.div 
                  className="group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block">
                    <span className="text-royal-800 font-semibold mb-3 block text-base lg:text-lg flex items-center">
                      <CreditCard className="w-4 h-4 mr-2 text-gold-600" />
                      Down Payment
                    </span>
                    <div className="relative">
                      <Input
                        type="number"
                        value={values.downPayment}
                        onChange={(e) => handleInputChange('downPayment', Number(e.target.value))}
                        className="text-lg lg:text-xl font-semibold border-2 border-royal-200 focus:border-gold-500 focus:ring-4 focus:ring-gold-100 rounded-xl px-4 py-3 transition-all duration-200"
                        placeholder="Enter down payment"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-royal-400 text-sm">
                        %
                      </div>
                    </div>
                    <Slider
                      value={[values.downPayment]}
                      onValueChange={(value) => handleInputChange('downPayment', value[0])}
                      min={0}
                      max={50}
                      step={1}
                      className="mt-4"
                    />
                    <div className="flex justify-between text-xs text-royal-500 mt-2">
                      <span>0%</span>
                      <span>50%</span>
                    </div>
                  </label>
                </motion.div>
              </div>
            </Card>
          </motion.div>

          {/* Results Display */}
          <motion.div 
            className="space-y-6"
            variants={itemVariants}
          >
            <motion.div
              variants={cardVariants}
              className="bg-gradient-to-br from-royal-900 via-royal-800 to-royal-900 p-6 lg:p-8 rounded-2xl shadow-2xl shadow-royal-900/20 border border-royal-700/50 relative overflow-hidden"
            >
              {/* Background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 to-transparent"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-amber-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold text-white">Payment Summary</h3>
                    <p className="text-royal-200 text-sm">Your calculated results</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={monthlyPayment}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white/10 backdrop-blur-sm p-4 lg:p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 group"
                    >
                      <div className="flex items-center mb-2">
                        <DollarSign className="w-4 h-4 text-gold-400 mr-2" />
                        <p className="text-royal-200 text-sm font-medium">Monthly Payment</p>
                      </div>
                      <p className="text-2xl lg:text-3xl font-bold text-white leading-tight group-hover:text-gold-300 transition-colors">
                        {formatCurrency(monthlyPayment)}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={values.downPayment}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="bg-white/10 backdrop-blur-sm p-4 lg:p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 group"
                    >
                      <div className="flex items-center mb-2">
                        <CreditCard className="w-4 h-4 text-gold-400 mr-2" />
                        <p className="text-royal-200 text-sm font-medium">Down Payment</p>
                      </div>
                      <p className="text-2xl lg:text-3xl font-bold text-white leading-tight group-hover:text-gold-300 transition-colors">
                        {formatCurrency(values.loanAmount * (values.downPayment / 100))}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={totalInterest}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="bg-white/10 backdrop-blur-sm p-4 lg:p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 group"
                    >
                      <div className="flex items-center mb-2">
                        <TrendingUp className="w-4 h-4 text-gold-400 mr-2" />
                        <p className="text-royal-200 text-sm font-medium">Total Interest</p>
                      </div>
                      <p className="text-2xl lg:text-3xl font-bold text-white leading-tight group-hover:text-gold-300 transition-colors">
                        {formatCurrency(totalInterest)}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={totalPayment}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      className="bg-white/10 backdrop-blur-sm p-4 lg:p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 group"
                    >
                      <div className="flex items-center mb-2">
                        <Calculator className="w-4 h-4 text-gold-400 mr-2" />
                        <p className="text-royal-200 text-sm font-medium">Total Payment</p>
                      </div>
                      <p className="text-2xl lg:text-3xl font-bold text-white leading-tight group-hover:text-gold-300 transition-colors">
                        {formatCurrency(totalPayment)}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 lg:p-8 rounded-2xl border border-blue-200/50 shadow-lg"
            >
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-4 mt-1">
                  <Calculator className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-royal-900 font-semibold mb-2">Important Notice</h4>
                  <p className="text-royal-600 text-sm leading-relaxed">
                    This calculator provides estimates for your monthly mortgage payments. The actual
                    amount may vary based on additional factors such as property taxes, insurance, processing fees,
                    and other charges. Please consult with our financial advisors for a detailed analysis
                    and personalized recommendations.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MortgageCalculator;