
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const OrderComplete = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 flex-1 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h1 className="text-2xl font-semibold mb-4">Thank You for Your Order!</h1>
          <p className="text-muted-foreground mb-8">
            Your order has been placed successfully. You will receive a confirmation email shortly.
          </p>
          <div className="space-y-4">
            <Link to="/order-history" className="btn-primary w-full">
              View Your Orders
            </Link>
            <Link to="/products" className="btn-secondary w-full">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OrderComplete;
