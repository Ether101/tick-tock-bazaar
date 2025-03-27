
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import SearchBar from './SearchBar';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartItems } = useCart();
  const location = useLocation();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
      {/* Desktop Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-semibold tracking-tight">
            <span className="text-primary">TICK</span>
            <span className="text-accent">TOCK</span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-sm font-medium hover:text-accent transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-sm font-medium hover:text-accent transition-colors">
              Shop
            </Link>
            <Link to="/order-history" className="text-sm font-medium hover:text-accent transition-colors">
              Orders
            </Link>
            <Link to="/add-product" className="text-sm font-medium hover:text-accent transition-colors">
              Admin
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleSearch}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            <Link to="/cart" className="p-2 rounded-full hover:bg-secondary transition-colors relative">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors"
              onClick={toggleMenu}
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white/95 backdrop-blur-md shadow-lg"
        >
          <div className="py-4 px-6 space-y-2">
            <Link to="/" className="block py-2 text-primary hover:text-accent transition-colors">
              Home
            </Link>
            <Link to="/products" className="block py-2 text-primary hover:text-accent transition-colors">
              Shop
            </Link>
            <Link to="/order-history" className="block py-2 text-primary hover:text-accent transition-colors">
              Orders
            </Link>
            <Link to="/add-product" className="block py-2 text-primary hover:text-accent transition-colors">
              Admin
            </Link>
          </div>
        </motion.div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg py-4 px-6"
        >
          <SearchBar onClose={toggleSearch} />
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
