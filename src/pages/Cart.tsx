
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CheckoutForm, { CheckoutFormValues } from '../components/CheckoutForm';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

// PayPal Button component
const PayPalButton = ({ onSuccess }: { onSuccess: () => void }) => {
  useEffect(() => {
    // In a real app, we would load the PayPal SDK here
    console.log("PayPal SDK would load here");
    
    // Simulate script loading
    const timer = setTimeout(() => {
      console.log("PayPal SDK loaded");
      
      // Create a fake button for demo
      const paypalButtonContainer = document.getElementById('paypal-button-container');
      if (paypalButtonContainer) {
        paypalButtonContainer.innerHTML = '';
        
        const button = document.createElement('button');
        button.className = 'w-full py-3 bg-[#0070ba] hover:bg-[#003087] text-white rounded-lg transition-colors';
        button.textContent = 'Pay with PayPal';
        button.onclick = () => {
          // Simulate payment process
          setTimeout(() => {
            onSuccess();
          }, 1500);
        };
        
        paypalButtonContainer.appendChild(button);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [onSuccess]);
  
  return (
    <div id="paypal-button-container" className="paypal-button-container">
      <div className="w-full py-3 bg-gray-200 text-gray-400 rounded-lg text-center">
        Loading PayPal...
      </div>
    </div>
  );
};

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, checkout } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCheckoutComplete, setIsCheckoutComplete] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CheckoutFormValues | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleCheckoutFormSubmit = (values: CheckoutFormValues) => {
    setCustomerInfo(values);
    setShowCheckoutForm(false);
  };
  
  const handleCardPaymentSuccess = (values: CheckoutFormValues) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      checkout('Credit Card', { ...customerInfo, ...values });
      setIsProcessing(false);
      setShowPaymentDialog(false);
      setIsCheckoutComplete(true);
      
      // Redirect to order history after a delay
      setTimeout(() => {
        navigate('/order-history');
      }, 3000);
    }, 1500);
  };
  
  const handleProceedToPayment = () => {
    if (!customerInfo) {
      setShowCheckoutForm(true);
      return;
    }
    
    setShowPaymentDialog(true);
  };
  
  const handlePaymentSuccess = () => {
    if (!customerInfo) {
      setShowCheckoutForm(true);
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      checkout('PayPal', customerInfo);
      setIsProcessing(false);
      setIsCheckoutComplete(true);
      
      // Redirect to order history after a delay
      setTimeout(() => {
        navigate('/order-history');
      }, 3000);
    }, 1500);
  };
  
  // If cart is empty
  if (cartItems.length === 0 && !isCheckoutComplete) {
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
  }
  
  // Checkout complete page
  if (isCheckoutComplete) {
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
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold">Your Cart</h1>
            <Link to="/products" className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-2">
              <ArrowLeft size={16} />
              Continue Shopping
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="divide-y">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.product.id}
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
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order Summary and Checkout */}
            <div className="lg:col-span-1">
              {showCheckoutForm ? (
                <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                  <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
                  <CheckoutForm 
                    onSubmit={handleCheckoutFormSubmit} 
                    isProcessing={isProcessing} 
                  />
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                  <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>Free</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${cartTotal.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  {customerInfo ? (
                    <div className="mb-6 border p-3 rounded-lg bg-gray-50">
                      <h3 className="font-medium mb-2">Shipping to:</h3>
                      <p className="text-sm">{customerInfo.fullName}</p>
                      <p className="text-sm">{customerInfo.address}</p>
                      <p className="text-sm">{customerInfo.city}, {customerInfo.postalCode}</p>
                      <p className="text-sm">{customerInfo.country}</p>
                      <p className="text-sm">{customerInfo.phone}</p>
                      <button 
                        onClick={() => setShowCheckoutForm(true)}
                        className="text-sm text-accent hover:underline mt-2"
                      >
                        Edit
                      </button>
                    </div>
                  ) : null}
                  
                  {isProcessing ? (
                    <div className="w-full py-3 bg-black/80 text-white rounded-lg text-center flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing Payment...
                    </div>
                  ) : (
                    <>
                      <button 
                        className="w-full py-3 bg-black text-white rounded-lg hover:bg-accent transition-colors mb-4 flex items-center justify-center gap-2"
                        onClick={handleProceedToPayment}
                      >
                        {customerInfo ? 'Proceed to Payment' : 'Checkout'}
                        <ArrowRight size={16} />
                      </button>
                      
                      {customerInfo && (
                        <>
                          <p className="text-center text-sm text-muted-foreground mb-4">or</p>
                          <PayPalButton onSuccess={handlePaymentSuccess} />
                        </>
                      )}
                    </>
                  )}
                  
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    By completing your purchase, you agree to our <a href="#" className="text-accent hover:underline">Terms of Service</a> and <a href="#" className="text-accent hover:underline">Privacy Policy</a>.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Credit Card Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>Enter Payment Details</DialogTitle>
          <div className="py-4">
            <CheckoutForm 
              onSubmit={handleCardPaymentSuccess} 
              isProcessing={isProcessing} 
              includePaymentFields={true}
            />
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Cart;
