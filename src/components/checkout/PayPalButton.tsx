
import React, { useEffect, useState } from 'react';

interface PayPalButtonProps {
  onSuccess: () => void;
}

declare global {
  interface Window {
    paypal?: any;
  }
}

const PayPalButton = ({ onSuccess }: PayPalButtonProps) => {
  const [loading, setLoading] = useState(true);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if PayPal script is already loaded
    if (window.paypal) {
      setScriptLoaded(true);
      setLoading(false);
      return;
    }

    const script = document.createElement('script');
    script.src = "https://www.paypal.com/sdk/js?client-id=sb&currency=USD";
    script.async = true;
    script.onload = () => {
      console.log("PayPal SDK loaded successfully");
      setScriptLoaded(true);
      setLoading(false);
    };
    script.onerror = () => {
      console.error("Failed to load PayPal SDK");
      setError("Failed to load PayPal payment system");
      setLoading(false);
    };
    
    document.body.appendChild(script);
    
    return () => {
      // Clean up if component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (scriptLoaded && window.paypal) {
      try {
        const paypalButtonContainer = document.getElementById('paypal-button-container');
        if (paypalButtonContainer) {
          paypalButtonContainer.innerHTML = '';
          
          window.paypal.Buttons({
            // Set up the transaction
            createOrder: function() {
              return fetch('/api/create-paypal-order', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  intent: 'CAPTURE'
                })
              }).then(function(res) {
                // For demo purposes, we'll simulate a successful order creation
                console.log('Creating sandbox PayPal order');
                // Return a dummy order ID for sandbox
                return 'SANDBOX_ORDER_ID_' + Date.now();
              });
            },
            
            // Finalize the transaction
            onApprove: function(data: any, actions: any) {
              console.log('PayPal transaction approved', data);
              // Simulate server call to capture funds
              setTimeout(() => {
                console.log('Payment completed successfully');
                onSuccess();
              }, 1000);
              return true;
            },
            
            onError: function(err: any) {
              console.error('PayPal error:', err);
              setError('There was an error processing your payment');
            }
          }).render('#paypal-button-container');
        }
      } catch (err) {
        console.error('Error rendering PayPal buttons:', err);
        setError('Could not initialize PayPal checkout');
      }
    }
  }, [scriptLoaded, onSuccess]);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="text-sm underline mt-2"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div id="paypal-button-container" className="paypal-button-container">
      {loading && (
        <div className="w-full py-3 bg-gray-200 text-gray-400 rounded-lg text-center">
          Loading PayPal...
        </div>
      )}
    </div>
  );
};

export default PayPalButton;
