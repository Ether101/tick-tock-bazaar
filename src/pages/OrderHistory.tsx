
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Clock, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const OrderHistory = () => {
  const { orders } = useCart();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-semibold mb-8">Order History</h1>
          
          {orders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="text-muted-foreground" size={24} />
              </div>
              <h2 className="text-xl font-medium mb-2">No Orders Yet</h2>
              <p className="text-muted-foreground mb-6">
                You haven't placed any orders yet. Start shopping to see your order history.
              </p>
              <Link to="/products" className="btn-primary">
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <div className="border-b p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : order.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                          <span className="text-lg font-medium">{order.id}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Clock size={14} className="mr-1" />
                          <span>{formatDate(order.date)}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-medium">
                          ${order.total.toLocaleString()}
                        </div>
                        <div className="text-muted-foreground text-sm">
                          Paid with {order.paymentMethod}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Order Items */}
                  <div className="divide-y">
                    {order.items.map((item) => (
                      <div key={`${order.id}-${item.product.id}`} className="p-6 flex items-center">
                        <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="ml-4 flex-1">
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
                            <div className="text-right">
                              <div>${(item.product.price * item.quantity).toLocaleString()}</div>
                              <div className="text-sm text-muted-foreground">
                                Qty: {item.quantity}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Order Actions */}
                  <div className="bg-gray-50 p-4 flex justify-end">
                    <Link
                      to="/products"
                      className="text-accent hover:text-accent/80 transition-colors font-medium text-sm flex items-center gap-1"
                    >
                      Buy Again
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderHistory;
