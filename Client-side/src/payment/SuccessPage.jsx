import React, { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react'; // Install lucide-react if not already
import { useCart } from '../context/CartContext';

function SuccessPage() {
      const { clearAllFromCart } = useCart();
    const [isRemoving, setIsRemoving] = useState(false);

      useEffect(()=>{
      const clearAllFromCarts = async () => {
        setIsRemoving(true);
        try {
            await clearAllFromCart();
        } catch (error) {
            console.error('Error removing item:', error);
        } finally {
            setIsRemoving(false);
        }
    };
    clearAllFromCarts();
      },[])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-green-800 px-4">
      <CheckCircle size={80} className="text-green-600 mb-6" />

      <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
      <p className="text-lg text-center max-w-md mb-4">
        Thank you for your purchase. Your payment has been processed successfully. 
        You will receive a confirmation email shortly with the details of your order.
      </p>

      <a 
        href="/" 
        className="mt-6 px-6 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg transition-all"
      >
        Return to Home
      </a>
    </div>
  );
}

export default SuccessPage;
