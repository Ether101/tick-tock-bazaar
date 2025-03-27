
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const EmptyCart = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 flex-1 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto text-center">
          <h1 className="text-2xl font-semibold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any watches to your cart yet.
          </p>
          <Link to="/products" className="btn-primary">
            Browse Watches
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default EmptyCart;
