
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { WatchProduct } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

interface WatchCardProps {
  product: WatchProduct;
  index: number;
}

const WatchCard: React.FC<WatchCardProps> = ({ product, index }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        <div className="p-5">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.brand}</p>
            </div>
            <span className="font-medium">${product.price.toLocaleString()}</span>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2">
            {product.category && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground">
                {product.category}
              </span>
            )}
            
            {!product.inStock && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                Out of stock
              </span>
            )}
          </div>
        </div>
        
        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`absolute bottom-0 left-0 right-0 py-3 flex justify-center items-center gap-2 transition-all duration-300 ${
            product.inStock 
              ? 'bg-black text-white hover:bg-accent' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          } translate-y-full group-hover:translate-y-0`}
        >
          <ShoppingCart size={16} />
          <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
        </button>
      </Link>
    </motion.div>
  );
};

export default WatchCard;
