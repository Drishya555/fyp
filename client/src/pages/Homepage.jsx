import heroimg from "../assets/heroo.jpg";
import './authmedia.css';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { motion } from "framer-motion";

const Homepage = () => {
  return (
    <>
      <div className="w-[98%] h-[85vh] ml-[1%] relative">
        {/* Background Image with Fade-In Animation */}
        <motion.img
          src={heroimg}
          className="rounded-sm w-full h-full sm:rounded-3xl object-cover"
          alt="Hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        
        {/* Black Overlay */}
        <motion.div
          className="rounded-sm absolute inset-0 bg-black bg-opacity-15 sm:rounded-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        ></motion.div>

        {/* Content with Slide-Up Animation */}
        <motion.div
          className="absolute inset-0 p-4 sm:p-8 md:p-12 lg:p-[90px]"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {/* Tagline */}
          <motion.p
            className="text-white mt-[70px] sm:mt-[0px] text-[15px] textshadow sm:mb-[10px] sm:text-xl md:text-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            #1 Hospital Management App in Nepal
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            className="text-[50px] textshadow text-white sm:text-6xl md:text-8xl lg:text-[100px]"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.7 }}
          >
            MediAid
          </motion.h1>

          {/* Subheadings */}
          <motion.h2
            className="text-white text-[30px] sm:text-2xl md:text-3xl lg:text-[40px] mt-[10px] sm:mt-[20px]"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.9 }}
          >
            Smarter Care
          </motion.h2>
          <motion.h2
            className="text-white text-[30px] sm:text-2xl md:text-3xl lg:text-[40px] font-extrabold mt-[-5px] sm:mt-[5px]"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.1 }}
          >
            Powered by AI
          </motion.h2>

          {/* Buttons with Fade-In Animation */}
          <motion.div
            className="herobuttons w-full sm:w-[400px] flex flex-row sm:flex-row gap-3 sm:gap-5 text-white mt-8 sm:mt-[100px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.3 }}
          >
            <motion.button
              className="w-auto h-full underline text-base sm:text-lg transition-[0.3s] hover:text-textcol hover:scale-105 flex gap-1 items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch <ChevronRightIcon className="size-4 sm:size-5" />
            </motion.button>
            <motion.button
              className="w-auto h-full underline text-base sm:text-lg transition-[0.3s] hover:text-textcol hover:scale-105 flex gap-1 items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Our Services <ChevronRightIcon className="size-4 sm:size-5" />
            </motion.button>
          </motion.div>
        </motion.div>

        <div
          className="hidden customborr absolute bottom-0 right-0 w-full xl:block sm:w-[40%] h-[150px] sm:h-[200px] bg-white"
        >

            
        </div>
      </div>
    </>
  );
};

export default Homepage;