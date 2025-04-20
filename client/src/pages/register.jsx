import { useState } from 'react';
import { Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react';
import logo from "../assets/mediaidlogo.png";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { host } from '../host.js'; 

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    agreeToTerms: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Email validation regex pattern
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Validate email format before submitting
    if (!validateEmail(form.email)) {
      setLoading(false);
      setError('Please enter a valid email address');
      return;
    }

    // Validate password length
    if (form.password.length < 8) {
      setLoading(false);
      setError('Password must be at least 8 characters');
      return;
    }

    // Check if terms are agreed
    if (!form.agreeToTerms) {
      setLoading(false);
      setError('You must agree to the terms and conditions');
      return;
    }

    try {
      const response = await axios.post(`${host}/api/auth/register`, {
        name: form.fullName,
        email: form.email,
        password: form.password
      });
      
      if (response.data.success) {
        setSubmitted(true);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (err) {
      setLoading(false);
      if (err.response) {
        if (err.response.status === 409) {
          setError('Email is already taken. Please use a different email.');
        } else {
          setError('Registration failed. Please try again.');
        }
      } else if (err.request) {
        setError('Network error. Please check your connection.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white">
      {/* Left side - Image */}
      <div className="hidden md:block md:w-1/2 bg-blue-50 relative overflow-hidden">
        <img 
          src="https://media.gettyimages.com/id/1754133111/video/nurse-support-and-holding-hands-of-patient-in-bed-with-cancer-sick-or-disease-medical-worker.jpg?s=640x640&k=20&c=8pIdLvRAFPb3ohwtxMr2ifV-PCsPG7Ug-_Hwz1EpO4o=" 
          alt="Registration background" 
          className="object-cover h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 to-blue-900/70 flex flex-col justify-between p-12">
          <div className="mb-12">
            <img src={logo} className="w-[180px]" alt="Logo" />
          </div>
          
          <div className="max-w-md">
            <h2 className="text-3xl font-bold text-white mb-4">Start your journey with us</h2>
            <p className="text-white/90 text-lg mb-6">Join thousands of users who&apos;ve already discovered our platform&apos;s powerful features and intuitive design.</p>
            
            <div className="flex items-center space-x-4 mt-8">
              <div className="flex -space-x-4">
                <div className="w-10 h-10 rounded-full bg-blue-300 border-2 border-white flex items-center justify-center text-xs font-bold text-white">JD</div>
                <div className="w-10 h-10 rounded-full bg-green-400 border-2 border-white flex items-center justify-center text-xs font-bold text-white">KP</div>
                <div className="w-10 h-10 rounded-full bg-purple-400 border-2 border-white flex items-center justify-center text-xs font-bold text-white">LM</div>
              </div>
              <p className="text-white text-sm">Join over <span className="font-bold">10,000+</span> users</p>
            </div>
          </div>
          
          <div className="mt-auto pt-12">
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <p className="text-white text-sm font-medium">Easy onboarding</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <p className="text-white text-sm font-medium">24/7 Support</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <p className="text-white text-sm font-medium">Secure platform</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {submitted ? (
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <CheckCircle size={64} className="text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
              <p className="text-gray-600 mb-6">Thank you for joining us. Check your email for confirmation.</p>
              <button 
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300 flex items-center justify-center"
                onClick={() => navigate('/login')}
              >
                Go to Login
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
                <p className="text-gray-600">Fill in your details to get started</p>
              </div>
              
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={form.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                    placeholder="you@example.com"
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    title="Please enter a valid email address"
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      minLength="8"
                      value={form.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters</p>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="agreeToTerms"
                    name="agreeToTerms"
                    type="checkbox"
                    required
                    checked={form.agreeToTerms}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700">
                    I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                  </label>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300 flex items-center justify-center group ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {loading ? (
                      'Creating Account...'
                    ) : (
                      <>
                        Create Account
                        <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </button>
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-gray-600">
                    Already have an account? <a href="/login" className="text-blue-600 hover:underline font-medium">Sign in</a>
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}