import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);
  
  useEffect(() => {
    // Update the countdown every second
    const countdownInterval = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000);
    
    // Set a timeout to redirect after 3 seconds
    const timer = setTimeout(() => {
      navigate("/pharmacy");
    }, 3000);

    // Clean up the timer and interval if the component unmounts
    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };
  }, [navigate]);

  // Calculate the circular progress
  const circumference = 2 * Math.PI * 45; // 45 is the radius of the circle
  const offset = circumference - (countdown / 3) * circumference;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto mb-4 relative">
            {/* Countdown circle animation */}
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                className="text-gray-200"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="45"
                cx="50"
                cy="50"
              />
              <circle
                className="text-green-500 transition-all duration-1000 ease-linear"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="45"
                cx="50"
                cy="50"
              />
            </svg>
            
            {/* Checkmark icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-3xl font-bold text-green-500">{countdown}</div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-600">Your order has been placed successfully.</p>
          <p className="text-gray-600 mt-2">
            Redirecting to pharmacy in {countdown} second{countdown !== 1 ? 's' : ''}...
          </p>
        </div>
        
        {/* Progress bar animation */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${((3 - countdown) / 3) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;