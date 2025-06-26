import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import RoyalLoader from '@/components/ui/RoyalLoader';

// Lazy load components for better performance
const Index = lazy(() => import('@/pages/Index'));
const Auth = lazy(() => import('@/pages/Auth'));
const Properties = lazy(() => import('@/pages/Properties'));
const Admin = lazy(() => import('@/pages/Admin'));
const BuyingService = lazy(() => import('@/pages/services/BuyingService'));
const SellingService = lazy(() => import('@/pages/services/SellingService'));
const RentingService = lazy(() => import('@/pages/services/RentingService'));
const InvestmentService = lazy(() => import('@/pages/services/InvestmentService'));
const Contact = lazy(() => import('@/pages/Contact'));
const About = lazy(() => import('@/pages/About'));
const PropertyDetails = lazy(() => import('@/pages/PropertyDetails'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Loading component
// const LoadingSpinner = ... (remove this)

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Suspense fallback={<RoyalLoader fullPage />}>
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
          </Suspense>
          <Toaster />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
