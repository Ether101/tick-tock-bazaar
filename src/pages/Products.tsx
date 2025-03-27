
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import WatchCard from '../components/WatchCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, searchProducts } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  
  const searchQuery = searchParams.get('search') || '';
  
  // Get unique categories and brands
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];
  const brands = ['all', ...Array.from(new Set(products.map(p => p.brand)))];
  
  // Filter products based on search query, category, and brand
  useEffect(() => {
    let result = searchQuery
      ? searchProducts(searchQuery)
      : [...products];
    
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }
    
    if (selectedBrand !== 'all') {
      result = result.filter(p => p.brand === selectedBrand);
    }
    
    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, selectedBrand, products, searchProducts]);
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    searchParams.delete('search');
    setSearchParams(searchParams);
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="mt-12 mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {searchQuery ? `Search Results: "${searchQuery}"` : 'Our Watch Collection'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            {searchQuery 
              ? `Showing ${filteredProducts.length} result${filteredProducts.length !== 1 ? 's' : ''}`
              : 'Discover our meticulously crafted timepieces'}
          </motion.p>
        </div>
        
        {/* Search bar */}
        <div className="mb-8">
          <SearchBar />
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile filter toggle */}
          <div className="lg:hidden mb-4">
            <button 
              onClick={toggleFilters}
              className="btn-secondary w-full flex items-center justify-center gap-2"
            >
              <Filter size={18} />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
          
          {/* Sidebar filters */}
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ 
              width: showFilters || window.innerWidth >= 1024 ? 'auto' : 0,
              opacity: showFilters || window.innerWidth >= 1024 ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            className={`lg:w-64 flex-shrink-0 ${!showFilters && 'hidden lg:block'}`}
          >
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-medium text-lg">Filters</h3>
                <button 
                  onClick={resetFilters}
                  className="text-sm text-accent hover:text-accent/80 transition-colors"
                >
                  Reset
                </button>
              </div>
              
              {/* Category filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label
                      key={category}
                      className="flex items-center gap-2 cursor-pointer hover:text-accent transition-colors"
                    >
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="accent-accent"
                      />
                      <span className="capitalize">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Brand filter */}
              <div>
                <h4 className="font-medium mb-3">Brand</h4>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <label
                      key={brand}
                      className="flex items-center gap-2 cursor-pointer hover:text-accent transition-colors"
                    >
                      <input
                        type="radio"
                        name="brand"
                        value={brand}
                        checked={selectedBrand === brand}
                        onChange={() => setSelectedBrand(brand)}
                        className="accent-accent"
                      />
                      <span>{brand === 'all' ? 'All Brands' : brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
          
          {/* Product grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <WatchCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg text-center">
                <h3 className="text-xl font-medium mb-2">No watches found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={resetFilters}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Products;
