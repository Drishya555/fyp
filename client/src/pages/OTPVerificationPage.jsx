import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import axios from 'axios';
import { host } from '../host.js';

export default function OTPVerificationPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const navigate = useNavigate();
  const location = useLocation();

  // Get userId from location state
  const userId = location.state?.userId;
  const email = location.state?.email;

  useEffect(() => {
    if (!userId) {
      navigate('/register');
    }

    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [userId, navigate]);

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus to next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  // Handle paste event for the OTP inputs
  const handlePaste = (e, index) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    
    // Filter out non-numeric characters and take only the first 6 digits
    const digits = pastedData.replace(/[^0-9]/g, '').slice(0, 6);
    
    if (digits.length === 0) return;
    
    // Create a new array with the pasted digits
    const newOtp = [...otp];
    
    // Fill the array with the pasted digits
    for (let i = 0; i < digits.length && i + index < 6; i++) {
      newOtp[i + index] = digits[i];
    }
    
    setOtp(newOtp);
    
    // Focus on the appropriate field after pasting
    if (index + digits.length < 6) {
      document.getElementById(`otp-${index + digits.length}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setLoading(false);
      setError('Please enter a 6-digit OTP');
      return;
    }

    try {
      const response = await axios.post(`${host}/api/auth/verify-otp`, {
        userId,
        otp: otpString,
      });

      if (response.data.success) {
        navigate('/login', {
          state: { verified: true },
          replace: true,
        });
      }
    } catch (err) {
      setLoading(false);
      if (err.response) {
        setError(err.response.data.message || 'OTP verification failed');
      } else if (err.request) {
        setError('Network error. Please check your connection.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    setError('');

    try {
      const response = await axios.post(`${host}/api/auth/resend-otp`, {
        userId,
      });

      if (response.data.success) {
        setTimeLeft(900); // Reset timer to 15 minutes
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Failed to resend OTP');
      } else if (err.request) {
        setError('Network error. Please check your connection.');
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setResendLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <button
          onClick={() => navigate('/register')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft size={18} className="mr-1" />
          Back to Register
        </button>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Verify Your Email</h1>
          <p className="text-gray-600">
            We&apos;ve sent a 6-digit OTP to <span className="font-semibold">{email}</span>
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
              Enter OTP
            </label>
            <div className="flex justify-between space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={(e) => handlePaste(e, index)}
                  className="w-full h-14 text-center text-2xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  autoFocus={index === 0}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600">
              <Clock size={16} className="mr-1" />
              <span>Expires in: {formatTime(timeLeft)}</span>
            </div>
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={timeLeft > 0 || resendLoading}
              className={`text-sm ${timeLeft > 0 ? 'text-gray-400' : 'text-blue-600 hover:text-blue-800'} ${resendLoading ? 'opacity-70' : ''}`}
            >
              {resendLoading ? 'Sending...' : 'Resend OTP'}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Didn&apos;t receive the OTP? Check your spam folder or request a new one.</p>
        </div>
      </div>
    </div>
  );
}