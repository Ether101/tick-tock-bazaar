
import React, { createContext, useState, useContext } from 'react';
import { WatchProduct } from './ProductContext';
import { toast } from "sonner";
import { CheckoutFormValues } from '../components/CheckoutForm';

export type CartItem = {
  product: WatchProduct;
  quantity: number;
};

type Order = {
  id: string;
  items: CartItem[];
  total: number;
  date: Date;
  status: 'pending' | 'completed' | 'cancelled';
  paymentMethod: string;
  customerInfo?: CheckoutFormValues;
};

type CartContextType = {
  cartItems: CartItem[];
  orders: Order[];
  addToCart: (product: WatchProduct) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  checkout: (paymentMethod: string, customerInfo?: CheckoutFormValues) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const getLocalStorageData = <T,>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  const stored = localStorage.getItem(key);
  if (!stored) return defaultValue;
  try {
    return JSON.parse(stored) as T;
  } catch (error) {
    console.error(`Error parsing ${key} from localStorage:`, error);
    return defaultValue;
  }
};

const setLocalStorageData = <T,>(key: string, data: T): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage or with default empty arrays
  const [cartItems, setCartItems] = useState<CartItem[]>(
    getLocalStorageData('cartItems', [])
  );
  
  const [orders, setOrders] = useState<Order[]>(
    getLocalStorageData('orders', [])
  );

  // Calculate total cost of items in cart
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const addToCart = (product: WatchProduct) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      let newItems;
      if (existingItem) {
        // Increase quantity if item already in cart
        newItems = prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item to cart
        newItems = [...prevItems, { product, quantity: 1 }];
      }
      
      setLocalStorageData('cartItems', newItems);
      toast.success(`${product.name} added to cart`);
      return newItems;
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => {
      const newItems = prevItems.filter(item => item.product.id !== productId);
      setLocalStorageData('cartItems', newItems);
      toast.info("Item removed from cart");
      return newItems;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCartItems(prevItems => {
      const newItems = prevItems.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      setLocalStorageData('cartItems', newItems);
      return newItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setLocalStorageData('cartItems', []);
  };

  const checkout = (paymentMethod: string, customerInfo?: CheckoutFormValues) => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      items: [...cartItems],
      total: cartTotal,
      date: new Date(),
      status: 'completed',
      paymentMethod,
      customerInfo
    };

    setOrders(prevOrders => {
      const newOrders = [...prevOrders, newOrder];
      setLocalStorageData('orders', newOrders);
      return newOrders;
    });

    clearCart();
    toast.success("Order placed successfully!");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};
