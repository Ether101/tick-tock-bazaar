
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

interface PayPalButtonProps {
  onSuccess: () => void;
  clientId?: string; // Optional client ID prop
  amount?: number; // Optional amount to display
}

declare global {
  interface Window {
    paypal?: any;
  }
}

const PayPalButton = ({ onSuccess, clientId = "sb", amount = 0 }: PayPalButtonProps) => {
  const [loading, setLoading] = useState(true);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const loadPayPalScript = () => {
    // Check if PayPal script is already loaded
    if (window.paypal) {
      setScriptLoaded(true);
      setLoading(false);
      return;
    }

    // Remove any existing PayPal scripts to avoid conflicts
    const existingScript = document.querySelector('script[src*="paypal.com/sdk/js"]');
    if (existingScript) {
      document.body.removeChild(existingScript);
    }

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD&disable-funding=credit,card`;
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
      
      // Only retry a few times to avoid infinite loops
      if (retryCount < 2) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          loadPayPalScript();
        }, 2000);
      }
    };
    
    document.body.appendChild(script);
  };

  useEffect(() => {
    loadPayPalScript();
    
    return () => {
      // Clean up if component unmounts
      const script = document.querySelector('script[src*="paypal.com/sdk/js"]');
      if (script && document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [clientId, retryCount]);

  useEffect(() => {
    if (scriptLoaded && window.paypal) {
      try {
        const paypalButtonContainer = document.getElementById('paypal-button-container');
        if (paypalButtonContainer) {
          paypalButtonContainer.innerHTML = '';
          
          window.paypal.Buttons({
            style: {
              layout: 'vertical',
              color: 'gold',
              shape: 'rect',
              label: 'paypal'
            },
            
            // Set up the transaction
            createOrder: function() {
              return fetch('/api/create-paypal-order', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  intent: 'CAPTURE',
                  amount: amount
                })
              }).then(function(res) {
                // For sandbox testing, we'll simulate a successful order creation
                console.log('Creating sandbox PayPal order for amount:', amount);
                
                // In a real integration, you would parse the response and return the order ID
                // For sandbox/demo, we're returning a dummy ID
                return 'SANDBOX_ORDER_ID_' + Date.now();
              }).catch(function(err) {
                console.error('Error creating order:', err);
                toast.error('Could not create PayPal order');
                return null;
              });
            },
            
            // Finalize the transaction
            onApprove: function(data: any, actions: any) {
              console.log('PayPal transaction approved', data);
              
              // In a real integration, you would call your server to capture the payment
              // For sandbox, we'll simulate a successful capture
              toast.success('Payment processed successfully!');
              
              setTimeout(() => {
                console.log('Payment completed successfully');
                onSuccess();
              }, 1000);
              
              return true;
            },
            
            onCancel: function() {
              console.log('Transaction cancelled');
              toast.info('PayPal checkout cancelled');
            },
            
            onError: function(err: any) {
              console.error('PayPal error:', err);
              setError('There was an error processing your payment');
              toast.error('PayPal checkout error');
            }
          }).render('#paypal-button-container');
        }
      } catch (err) {
        console.error('Error rendering PayPal buttons:', err);
        setError('Could not initialize PayPal checkout');
      }
    }
  }, [scriptLoaded, onSuccess, amount]);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    setScriptLoaded(false);
    setRetryCount(0);
    loadPayPalScript();
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        <p>{error}</p>
        <Button 
          onClick={handleRetry}
          variant="outline"
          className="text-sm mt-2"
        >
          Try again
        </Button>
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
