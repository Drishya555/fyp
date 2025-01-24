import { TextField, InputAdornment, IconButton, Checkbox, FormControlLabel } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import Header from '../Layout/Header';
import hosp from '../assets/register.jpg';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const controls = useAnimation();
  const [ref, inView] = useInView();

  if (inView) {
    controls.start({ opacity: 1, y: 0 });
  }

  return (
    <>
      <div className="flex pt-[70px] items-center justify-center bg-grey-100">
        <div className="bg-pink-200 w-[70%] h-[700px] flex shadow-lg rounded-2xl overflow-hidden">
          <motion.div
            className="hidden md:block w-1/2 bg-white-50 relative"
            initial={{ opacity: 0, x: -50 }}
            animate={controls}
            transition={{ duration: 0.6 }}
          >
            <img
              src={hosp}
              alt="Decode"
              className="w-[85%] h-[97%] mt-[1.5%] ml-[9%] rounded-2xl object-cover"
            />
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 p-8"
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 0.6 }}
            ref={ref}
          >
            <div className="text-center mb-8">
              <motion.h1
                className="text-3xl font-bold mb-2 text-gray-800"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Create an Account
              </motion.h1>
              <motion.p
                className="text-gray-600"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Already have an account? <a href="#" className="text-blue-500 hover:underline">Log in</a>
              </motion.p>
            </div>

            <form className="flex flex-col gap-4">
              <div className="flex gap-4">
                <TextField
                  id="firstName"
                  label="First Name"
                  variant="outlined"
                  className="w-1/2"
                  placeholder="Drishya"
                />
                <TextField
                  id="lastName"
                  label="Last Name"
                  variant="outlined"
                  className="w-1/2"
                  placeholder="Last Name"
                />
              </div>

              <TextField
                id="email"
                label="Email"
                variant="outlined"
                className="w-full"
                type="email"
                placeholder="Your email here"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                id="password"
                label="Password"
                variant="outlined"
                className="w-full"
                type={showPassword ? "text" : "password"}
                placeholder="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <FormControlLabel
                control={<Checkbox />}
                label="I agree to the Terms & Conditions"
                className="mt-2"
              />

              <motion.button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 mt-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Register
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      <style>
        {`
          .MuiInputAdornment-root svg {
            transition: color 0.3s ease-in-out;
          }

          .Mui-focused .MuiInputAdornment-root svg {
            color: #3f51b5; /* Focus color */
          }
        `}
      </style>
    </>
  );
};

export default Register;