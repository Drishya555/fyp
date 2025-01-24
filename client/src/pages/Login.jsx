import hosp from '../assets/register.jpg';
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import { useState } from 'react';
import './authmedia.css';
import Header from '../Layout/Header';
import { FcGoogle } from "react-icons/fc"; 

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <>
      <div className='w-full h-auto bg-purple-100 mb-[50px] pt-10 pb-40'>
      <div className="mainregistercard flex gap-[20px] w-[90%] 2xl:h-[800px] xl:h-[700px] lg:h-[600px] bg-bgpurple ml-[5%] mt-10 rounded-2xl pt-[10px] pl-[10px] ">
        <div className="registerimg 2xl:w-[44%] xl:w-[50%] lg:w-[48%] h-[99%] rounded-2xl relative">
          <img src={hosp} className="w-full h-full rounded-2xl" alt="Hospital" />
          <h2 className="text-white absolute left-4 top-4 text-3xl">MEDIAID</h2>
          <button className="bg-white bg-opacity-25 w-auto p-2 font-medium text-white absolute top-4 right-4 rounded-3xl pl-[20px] pr-[20px] hover:scale-105 transition-transform duration-300 flex items-center gap-[6px]">
            Back to Website <FaArrowRight />
          </button>

          <div className="w-full h-[20px] absolute bottom-10 flex justify-center">
            <h1 className="text-white absolute text-4xl">Care you Deserve</h1>
          </div>
        </div>

        <div className="formcontainerforcss w-[52%] h-[90%] 2xl:mt-[40px] 2xl:pt-[150px] lg:pl-[30px] xl:pl-[110px] lg:mt-[50px] xl:pt-[70px] lg:pt-[100px]">

            <h1 className='loginclass text-white text-6xl'>Log In</h1>
            <p className='pclasslogin text-white text-lg mb-[30px]'>Dont have an account? <span className='underline text-purple-500 hover:cursor-pointer'>Register</span></p>
          <form className="flex flex-col gap-4">
            <input
              id="firstName"
              type="text"
              placeholder="Email"
              className="inputforemail w-[80%] p-3 border bg-forminside border-none text-lg text-white rounded-md"
            />

            <div className=" inputforemail relative w-[80%]">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 border bg-forminside border-none text-lg text-white rounded-md"
              />
              <button
                type="button"
                onClick={handleClickShowPassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button type='submit' className='loginbtn w-[80%] bg-purplebutton text-white h-auto rounded-md text-xl pt-3 pb-3 mt-[20px]'>Login</button>
          </form>

        <div className='flex gap-[20px] mt-[20px]'>
            <div className='loginhata h-[1px] w-[30%] bg-white mt-[20px]'></div>
            <div className='loginhata h-auto mt-[7px] items-center text-white text-lg'>Or Login With</div>
            <div className='loginhata h-[1px] w-[31%] bg-white mt-[20px]'></div>
        </div>

        <button
            type="submit"
            className=" loginbtn w-[80%] border-2 border-white text-white h-auto rounded-md text-xl pt-3 pb-3 mt-[20px] flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-colors duration-100"
            >
            <FcGoogle className="text-2xl" /> {/* Google logo */}
            <span>Google</span> {/* Text */}
        </button>



        </div>
      </div>
      </div>
    </>
  );
};

export default Login;