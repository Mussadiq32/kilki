import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Index from '@/pages/Index';
import Auth from '@/pages/Auth';
import Properties from '@/pages/Properties';
import Admin from '@/pages/Admin';
import NotFound from '@/pages/NotFound';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import BuyingService from '@/pages/services/BuyingService';
import SellingService from '@/pages/services/SellingService';
import RentingService from '@/pages/services/RentingService';
import InvestmentService from '@/pages/services/InvestmentService';
import Contact from '@/pages/Contact';
import About from '@/pages/About';
import PropertyDetails from '@/pages/PropertyDetails';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/services/buying" element={<BuyingService />} />
            <Route path="/services/selling" element={<SellingService />} />
            <Route path="/services/renting" element={<RentingService />} />
            <Route path="/services/investment" element={<InvestmentService />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
