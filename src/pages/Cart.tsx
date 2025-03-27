
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CheckoutForm, { CheckoutFormValues } from '../components/CheckoutForm';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import EmptyCart from '../components/cart/EmptyCart';
import OrderComplete from '../components/cart/OrderComplete';

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
    return <EmptyCart />;
  }
  
  // Checkout complete page
  if (isCheckoutComplete) {
    return <OrderComplete />;
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
                    <CartItem
                      key={item.product.id}
                      item={item}
                      updateQuantity={updateQuantity}
                      removeFromCart={removeFromCart}
                    />
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
                <CartSummary
                  cartTotal={cartTotal}
                  customerInfo={customerInfo}
                  isProcessing={isProcessing}
                  onPaymentClick={handleProceedToPayment}
                  onPaymentSuccess={handlePaymentSuccess}
                  setShowCheckoutForm={setShowCheckoutForm}
                />
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
