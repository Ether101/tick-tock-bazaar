
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Check } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const { addToCart, cartItems } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  
  // Check if product is in cart
  const isInCart = id ? cartItems.some(item => item.product.id === id) : false;
  
  // Get product details
  const product = id ? getProductById(id) : undefined;
  
  // For demo purposes, additional images (in real app, would come from API)
  const additionalImages = [
    product?.imageUrl,
    'https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1287&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?q=80&w=1974&auto=format&fit=crop',
  ];
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <Navbar />
        <div className="container text-center py-20">
          <h2 className="text-2xl font-medium mb-4">Product Not Found</h2>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/products')}
            className="btn-primary"
          >
            Back to Products
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-8 flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
          >
            <ArrowLeft size={18} />
            Back
          </button>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Product Images */}
              <div className="p-6 lg:p-8">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4"
                >
                  <img
                    src={additionalImages[activeImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {/* Thumbnail Gallery */}
                <div className="flex gap-3">
                  {additionalImages.map((img, index) => (
                    <button
                      key={index}
                      className={`w-20 h-20 rounded-md overflow-hidden ${
                        activeImage === index ? 'ring-2 ring-accent' : 'opacity-70'
                      }`}
                      onClick={() => setActiveImage(index)}
                    >
                      <img
                        src={img}
                        alt={`${product.name} - view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Product Details */}
              <div className="p-6 lg:p-8">
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <span className="text-sm text-muted-foreground">
                        {product.brand}
                      </span>
                      <h1 className="text-3xl md:text-4xl font-bold mb-3">
                        {product.name}
                      </h1>
                      <div className="text-2xl font-semibold mb-6">
                        ${product.price.toLocaleString()}
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <p className="text-muted-foreground mb-6">
                        {product.description}
                      </p>
                      
                      <div className="mb-6">
                        <h3 className="font-medium mb-3">Features:</h3>
                        <ul className="space-y-2">
                          {product.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center mt-0.5">
                                <Check size={12} className="text-accent" />
                              </span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-auto"
                  >
                    {/* Availability */}
                    <div className="flex items-center mb-6">
                      <div className={`w-3 h-3 rounded-full mr-2 ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    
                    {/* Add to Cart Button */}
                    <div className="flex gap-4">
                      <button
                        onClick={handleAddToCart}
                        disabled={!product.inStock}
                        className={`w-full py-3 rounded-lg flex justify-center items-center gap-2 font-medium ${
                          product.inStock
                            ? (isInCart ? 'bg-green-500 text-white' : 'bg-black text-white hover:bg-accent transition-colors')
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {isInCart ? (
                          <>
                            <Check size={18} />
                            Added to Cart
                          </>
                        ) : (
                          <>
                            <ShoppingCart size={18} />
                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
