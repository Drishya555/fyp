import heroimg from "../assets/heroo.jpg";
import './authmedia.css';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { motion } from "framer-motion";

const Homepage = () => {
  return (
    <>
      <div className="w-[98%] h-[70vh] xl:h-[85vh] ml-[1%] relative">
        <motion.img
          src={heroimg}
          className="rounded-lg w-full h-full sm:rounded-3xl object-cover"
          alt="Hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        <motion.div
          className="rounded-lg absolute inset-0 bg-black bg-opacity-15 sm:rounded-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        ></motion.div>

        <motion.div
          className="absolute inset-0 p-4 sm:p-8 md:p-12 lg:p-[90px]"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.p
            className="text-white mt-[70px] sm:mt-[0px] text-[15px] textshadow sm:mb-[10px] sm:text-xl md:text-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            #1 Hospital Management App in Nepal
          </motion.p>

          <motion.h1
            className="text-[50px] textshadow text-white sm:text-6xl md:text-8xl lg:text-[100px]"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            MediAid
          </motion.h1>

          <motion.h2
            className="text-white text-[30px] sm:text-2xl md:text-3xl lg:text-[40px] mt-[10px] sm:mt-[20px] textshadow"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            Smarter Care
          </motion.h2>
          <motion.h2
            className="text-white text-[30px] sm:text-2xl md:text-3xl lg:text-[40px] font-extrabold mt-[-5px] sm:mt-[5px]"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          >
            Powered by AI
          </motion.h2>

          <motion.div
            className="herobuttons w-full sm:w-[400px] flex flex-row sm:flex-row gap-3 sm:gap-5 text-white mt-8 sm:mt-[100px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
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
          className="hidden customborr absolute bottom-0 right-0 w-full sm:block sm:w-[40%] h-[150px] sm:h-[200px] bg-white p-[20px]"

        >
          <div className="h-full w-ful items-center flex flex-row justify-between">
            <div className="w-[25%] h-[70%] text-center">
              <h1 className="text-[40px]">80+</h1>
              <h5>Approved Hospitals all over Nepal</h5>
            </div>

            <div className="w-[25%] h-[70%] text-center">
              <h1 className="text-[40px]">1200+</h1>
              <h5>Appointments Booked by Patients</h5>
            </div>

            <div className="w-[25%] h-[70%] text-center">
              <h1 className="text-[40px]">99%</h1>
              <h5>Satisfaction Rate Left by Users</h5>
            </div>
          </div>
          
        </div>
      </div>

      <div className="lg:w-[80%] lg:ml-[10%] lg:flex mt-[80px] sm:text-center sm:w-[100%] sm:p-[40px] sm:justify-center">
        <div className="text-[50px] w-[50%]">Focusing on health <br/> quality, <span className="text-gray-500">we maintain <br/> customer trust</span></div>
        <div className="text-[25px] w-[50%] text-gray-700">
          <p>We prioritize your privacy and security. At MediAid, your medical data is protected with advanced encryption, ensuring that only you and your doctor have access. Your health, your control.</p>
        </div>
      </div>
    </>
  );
};

export default Homepage;