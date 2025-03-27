
import React, { useEffect } from 'react';

interface PayPalButtonProps {
  onSuccess: () => void;
}

const PayPalButton = ({ onSuccess }: PayPalButtonProps) => {
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

export default PayPalButton;
