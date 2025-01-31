import left from '../assets/loginimg.webp'
import logo from '../assets/mediaidlogo.png'
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { FcGoogle } from "react-icons/fc";
import './authmedia.css'
import {motion} from 'framer-motion';

const Login = () => {
  return (
    <>
    <motion.div 
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
    transition={{duration:0.5}}>
    <div className='logincontainer w-[full] h-auto min-h-[100vh] bg-login flex'>
      <div className='leftsidelogin w-[70%] h-full '>
        <img src={left} className='h-full'/>
      </div>
      <div className='rightsidelogin w-[30%] h-auto pb-[50px] mt-[0.5%] bg-white rounded-xl'>
        <div className='logoinlogin w-full flex justify-center mt-[40px]'>
          <img src={logo} className='w-[200px]'></img>
        </div>

      <div className='flex flex-col w-full justify-center  mt-[-40px] text-center '>
        <h1 className='textinlogin text-[40px] font-semibold'>Join Us!</h1>
        <p className='text-gray-500 mt-[-5px]'>Please Enter your details</p>
      </div>


      <div className='formcontainerlogin w-[60%] ml-[20%] mt-[40px]'>
        <form className='flex flex-col gap-[20px]'>
        <TextField id="standard-basic" label="Name" variant="standard" />
        <TextField id="standard-basic" label="Email" variant="standard" />
        <TextField id="standard-basic" label="Password" variant="standard" type='password'/>
        <div className='flex items-center gap-[25px] mt-[15px]'>
          <div className='w-[5%] '>
            <Checkbox/>
          </div>
          I agree to the terms of MediAid
        </div>
        </form>
      </div>


      <div className='buttoncontainerlogin w-[60%] ml-[20%] mt-[20px]'>
        <button className='loginbtn w-full bg-black text-white h-[50px] rounded-3xl transition-[0.5s] hover:bg-gray-900'>Login</button>
        <button className="loginbtn w-full bg-gray-200 mt-[10px] text-black h-[50px] rounded-3xl transition-[0.5s] hover:bg-gray-100 flex items-center justify-center">
        <FcGoogle className=" h-6 w-6 mr-2" /> 
        Login with Google
      </button>
      </div>

      <div className='w-full text-center mt-[20px]'>
        <p>Already Have an account? <span className='text-textcol'><a href='/login'>Login</a></span></p>
      </div>
      </div>
    </div>
    </motion.div>
    </>
  )
}

export default Login
