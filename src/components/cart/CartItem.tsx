
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../context/CartContext';

interface CartItemProps {
  item: CartItemType;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
}

const CartItem = ({ item, updateQuantity, removeFromCart }: CartItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6"
    >
      <div className="flex gap-4">
        <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
          <img
            src={item.product.imageUrl}
            alt={item.product.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between">
            <div>
              <h3 className="font-medium">
                <Link to={`/product/${item.product.id}`} className="hover:text-accent transition-colors">
                  {item.product.name}
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground">
                {item.product.brand}
              </p>
            </div>
            <span className="font-medium">
              ${(item.product.price * item.quantity).toLocaleString()}
            </span>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                className="p-2 hover:bg-gray-100 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span className="w-10 text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                className="p-2 hover:bg-gray-100 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
            
            <button
              onClick={() => removeFromCart(item.product.id)}
              className="text-red-500 hover:text-red-700 transition-colors p-2"
              aria-label="Remove item"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;
