
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CheckoutFormValues } from '../../components/CheckoutForm';
import PayPalButton from '../checkout/PayPalButton';

interface CartSummaryProps {
  cartTotal: number;
  customerInfo: CheckoutFormValues | null;
  isProcessing: boolean;
  onPaymentClick: () => void;
  onPaymentSuccess: () => void;
  setShowCheckoutForm: (show: boolean) => void;
}

const CartSummary = ({
  cartTotal,
  customerInfo,
  isProcessing,
  onPaymentClick,
  onPaymentSuccess,
  setShowCheckoutForm
}: CartSummaryProps) => {
  // Your PayPal sandbox client ID
  const paypalClientId = "YOUR_SANDBOX_CLIENT_ID"; // Replace this with your actual sandbox client ID
  
  return (
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
      
      {customerInfo && (
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
      )}
      
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
            onClick={onPaymentClick}
          >
            {customerInfo ? 'Proceed to Payment' : 'Checkout'}
            <ArrowRight size={16} />
          </button>
          
          {customerInfo && (
            <>
              <p className="text-center text-sm text-muted-foreground mb-4">or</p>
              <PayPalButton 
                onSuccess={onPaymentSuccess} 
                clientId={paypalClientId}
              />
            </>
          )}
        </>
      )}
      
      <p className="text-xs text-muted-foreground text-center mt-4">
        By completing your purchase, you agree to our <a href="#" className="text-accent hover:underline">Terms of Service</a> and <a href="#" className="text-accent hover:underline">Privacy Policy</a>.
      </p>
    </div>
  );
};

export default CartSummary;
