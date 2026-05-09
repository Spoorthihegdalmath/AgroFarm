import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import AuthModal from './components/AuthModal';
import CartDrawer from './components/cart/CartDrawer';
import Market from './pages/Market';
import FarmerDashboard from './pages/FarmerDashboard';
import { CartProvider } from './context/CartContext';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <CartProvider>
      <Router>
        <div className="app-container">
          <Navbar onOpenAuth={() => setIsAuthModalOpen(true)} />
          <main>
            <Routes>
              {/* Market is now the home page for the Quick Commerce experience */}
              <Route path="/" element={<Market />} />
              <Route path="/market" element={<Navigate to="/" replace />} />
              <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
            </Routes>
          </main>
          
          <CartDrawer />
          
          <AuthModal 
            isOpen={isAuthModalOpen} 
            onClose={() => setIsAuthModalOpen(false)} 
          />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
