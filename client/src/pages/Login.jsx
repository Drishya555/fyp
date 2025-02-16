import { useState } from "react";
import axios from "axios";
import left from "../assets/loginimg.webp";
import logo from "../assets/mediaidlogo.png";
import TextField from "@mui/material/TextField";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AuthStore from "../hooks/authStore"; // Import the AuthStore


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      const { data } = await axios.post("http://localhost:8000/api/auth/login", {
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
        });
        
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
    >
      <div className="logincontainer w-full h-[100vh] bg-login flex">
        <div className="leftsidelogin w-[70%] h-full">
          <img src={left} className="h-full" alt="Login" />
        </div>
        <div className="rightsidelogin w-[30%] h-auto pb-[50px] mt-[0.5%] bg-white rounded-xl">
          <div className="logoinlogin w-full flex justify-center mt-[40px]">
            <img src={logo} className="w-[200px]" alt="Logo" />
          </div>

          <div className="flex flex-col w-full justify-center text-center mt-[-20px]">
            <h1 className="textinlogin text-[40px] font-semibold ml-9">
              Welcome Back!
            </h1>
            <p className="text-gray-500 mt-[-5px]">Please Enter your details</p>
          </div>

          <div className="formcontainerlogin w-[60%] ml-[20%] mt-[40px]">
            <form className="flex flex-col gap-[20px]" onSubmit={handleLogin}>
              <TextField
                label="Email"
                variant="standard"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                label="Password"
                variant="standard"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                className="loginbtn w-full bg-black text-white h-[50px] rounded-3xl transition-[0.5s] hover:bg-gray-900"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>

          <div className="buttoncontainerlogin w-[60%] ml-[20%] mt-[10px]">
            <button className="loginbtn w-full bg-gray-200 text-black h-[50px] rounded-3xl transition-[0.5s] hover:bg-gray-100 flex items-center justify-center">
              <FcGoogle className="h-6 w-6 mr-2" />
              Login with Google
            </button>
          </div>

          <div className="w-full text-center mt-[20px]">
            <p>
              Don&apos;t have an account?{" "}
              <span className="text-textcol">
                <a href="/register">Register</a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
