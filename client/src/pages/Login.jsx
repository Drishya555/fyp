import { useState } from "react";
import axios from "axios";
import logo from "../assets/mediaidlogo.png";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AuthStore from "../hooks/authStore"; // Import the AuthStore
import { host } from "../host.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      const { data } = await axios.post(`${host}/api/auth/login`, {
        email,
        password,
      });
  
      if (data.success) {
        AuthStore.setUser({
          userid: data.user.userid,
          name: data.user.name,
          email: data.user.email,
          address: data.user.address || "",  
          role: data.user.role, 
          token: data.token,
        });
        window.dispatchEvent(new Event('authChange'));        
        console.log("Stored User:", AuthStore.getUser()); // Debugging line
  
        navigate("/");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row h-screen bg-white"
    >
      {/* Left side - Image */}
      <div className="hidden md:block md:w-1/2 bg-blue-50 relative overflow-hidden">
        <img 
          src='https://media.istockphoto.com/id/477746024/photo/shes-got-an-excellent-bedside-manner.jpg?s=612x612&w=0&k=20&c=_YBNNPn42-AbzJ0jQ_XytwML6CtO9LocdbWquU37aZY=' 
          alt="Login background" 
          className="object-cover h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 to-blue-900/70 flex flex-col justify-between p-12">
          <div className="mb-12">
            <img src={logo} className="w-[180px]" alt="Logo" />
          </div>
          
          <div className="max-w-md">
            <h2 className="text-3xl font-bold text-white mb-4">Welcome back to our platform</h2>
            <p className="text-white/90 text-lg mb-6">We&apos;re glad to see you again. Access your account to continue your journey with us.</p>
            
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
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
            <p className="text-gray-600">Please enter your details to sign in</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                placeholder="you@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                
              </div>
              <a href="/forgotpw" className="text-sm text-blue-600 hover:underline font-medium">
                Forgot password?
              </a>
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300 flex items-center justify-center group"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : "Sign In"}
            </button>
            
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="button"
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition duration-300 text-sm font-medium text-gray-700 flex items-center justify-center"
                >
                  <FcGoogle className="h-5 w-5 mr-2" />
                  Sign in with Google
                </button>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don&apos;t have an account?{" "}
                <a href="/register" className="text-blue-600 hover:underline font-medium">Sign up</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;