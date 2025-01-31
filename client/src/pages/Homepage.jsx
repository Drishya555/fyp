import heroimg from "../assets/heroo.jpg";
import './authmedia.css';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { motion } from "framer-motion";
import HomeSlider from '../components/HomeSlider'

const Homepage = () => {

  const appointments = [
    { title: "Heart Condition After Surgery", status: "OPD", color: "bg-homegreen" },
    { title: "Heart Condition After Surgery", status: "Checkup", color: "bg-homered" },
    { title: "Heart Condition After Surgery", status: "Feedback", color: "bg-homepurple" },
    { title: "Heart Condition After Surgery", status: "Heart", color: "bg-homered" },
  ];


  return (
    <>
      <div className="w-[98%] h-[500px] lg:h-[70vh] xl:h-[85vh] ml-[1%] relative">
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
          className="hidden customborr absolute bottom-0 right-0 w-full lg:block sm:w-[40%] h-[150px] sm:h-[200px] bg-white p-[20px]"

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

      <div>
      <motion.div 
        className="w-[80%] mx-auto mt-[80px] flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left gap-[10px]"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
      >
        <div className="text-[40px] sm:text-[50px] lg:w-1/2">
          Focusing on health <br /> quality, 
          <span className="text-gray-500"> we maintain <br /> customer trust</span>
        </div>
        <div className="text-[20px] sm:text-[25px] lg:w-1/2 text-gray-700">
          <p>We prioritize your privacy and security. At MediAid, your medical data is protected with advanced encryption, ensuring that only you and your doctor have access. Your health, your control.</p>
        </div>
      </motion.div>

      <motion.div 
        className="w-full bg-gray-50 py-20 px-6 md:px-12 mt-[50px]"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
      >
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Section - Minimal Text */}
          <motion.div 
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, x: -100 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-[42px] md:text-[50px] font-medium leading-snug text-gray-800">
              Scheduling appointments with doctors has never been more seamless.
            </h1>
            <p className="text-gray-500 mt-4 text-lg">
              Get <span className="text-[#7A5CFA] font-medium">20% off</span> your first consultation.
            </p>
            <button className="mt-6 px-8 py-3 bg-[#7A5CFA] text-white rounded-lg shadow-md hover:bg-[#6A4BE9] transition-all text-lg">
              Book Now →
            </button>
          </motion.div>

          {/* Right Section - Booking Card */}
          <motion.div 
            className="lg:w-1/2 bg-white/80 backdrop-blur-lg p-6 rounded-3xl shadow-2xl w-full max-w-md border border-gray-200"
            initial={{ opacity: 0, y: 100 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 text-center">Scheduled Appointments</h2>
            
            <div className="mt-6 space-y-4">
              {appointments.map((appt, index) => (
                <motion.div 
                  key={index}
                  className="p-5 bg-white shadow-md rounded-lg flex justify-between items-center hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.05 }} 
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">{appt.title}</h3>
                    <p className="text-gray-500 text-sm">Dr. Deepali Adhikari</p>
                    <p className="text-gray-500 text-sm flex items-center gap-2 mt-1">
                       12:30-13:30 |  Monday
                    </p>
                  </div>
                  <span className={`px-3 py-1 text-white text-sm font-medium rounded-full ${appt.color} shadow`}>
                    {appt.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>


      <HomeSlider/>




      <div className="w-[90%] h-[70vh] mt-[50px] mx-auto">
      {/* Section Title */}
      <div>
        <h1 className="text-center text-[55px] font-medium leading-tight">
          Discover Why our <br /> users <span className="text-red-800">Love us</span>
        </h1>
      </div>

      {/* Review Container */}
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6 mt-10">
        {/* Review Summary */}
        <motion.div
          className="bg-gradient-to-br from-gray-700 to-gray-900 text-white p-6 rounded-2xl shadow-lg text-center w-64"
          whileHover={{ scale: 1.05 }}
        >
          <h1 className="text-4xl font-bold">4.9</h1>
          <div className="flex justify-center my-2">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <span key={index} className="text-yellow-400 text-2xl">★</span>
              ))}
          </div>
          <p className="text-sm">17 reviews</p>
          <p className="text-xs underline mt-1 cursor-pointer">All Reviews</p>
        </motion.div>

        {/* Review Cards */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-md max-w-sm"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center gap-3">
            <img
              src="https://randomuser.me/api/portraits/women/1.jpg"
              alt="John Doe"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold">John Doe</h3>
              <p className="text-gray-500 text-sm">11/10/2023</p>
            </div>
          </div>
          <p className="mt-4 text-gray-700">
            I used MediAid to book an appointment with my doctor and it was very helpful and went smoothly. Definitely recommended.
          </p>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-2xl shadow-md max-w-sm"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center gap-3">
            <img
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="John Doe"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold">John Doe</h3>
              <p className="text-gray-500 text-sm">11/10/2023</p>
            </div>
          </div>
          <p className="mt-4 text-gray-700">
            I used MediAid to book an appointment with my doctor and it was very helpful and went smoothly. Definitely recommended.
          </p>
        </motion.div>
      </div>
    </div>


    </>
  );
};

export default Homepage;