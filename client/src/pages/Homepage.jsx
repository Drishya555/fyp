import heroimg from "../assets/heroo.jpg";
import './authmedia.css';
import { ChevronRightIcon, HeartIcon, ShieldCheckIcon, DevicePhoneMobileIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Homepage = () => {
  const appointments = [
    { title: "Heart Condition After Surgery", status: "OPD", color: "bg-blue-500", doctor: "Dr. Deepali Adhikari", time: "12:30-13:30", day: "Monday" },
    { title: "Annual Physical Checkup", status: "Checkup", color: "bg-blue-600", doctor: "Dr. Rajesh Sharma", time: "09:00-10:00", day: "Tuesday" },
    { title: "Post-Treatment Follow-up", status: "Feedback", color: "bg-blue-400", doctor: "Dr. Anjali Patel", time: "14:00-14:30", day: "Wednesday" },
    { title: "Cardiology Consultation", status: "Heart", color: "bg-blue-600", doctor: "Dr. Sameer Khan", time: "11:00-11:45", day: "Friday" },
  ];

  const reviews = [
    { name: "Sarah Johnson", date: "11/10/2023", rating: 5, text: "MediAid transformed how I manage my family's healthcare. Booking appointments is now effortless and the reminders are a lifesaver!", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Michael Chen", date: "05/11/2023", rating: 5, text: "As someone with chronic conditions, the seamless integration with my doctors has been game-changing. The AI suggestions are surprisingly accurate.", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Priya Kapoor", date: "22/09/2023", rating: 4, text: "Love the interface and how all my medical records are in one place. Would give 5 stars if they added more specialty hospitals.", avatar: "https://randomuser.me/api/portraits/women/63.jpg" }
  ];

  const stats = [
    { value: "80+", label: "Approved Hospitals" },
    { value: "1200+", label: "Daily Appointments" },
    { value: "99%", label: "Satisfaction Rate" },
    { value: "24/7", label: "Support Available" }
  ];

  const features = [
    {
      title: "AI-Powered Diagnostics",
      description: "Our advanced AI analyzes your symptoms and medical history to provide preliminary assessments before your doctor's visit.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    },
    {
      title: "Instant Appointment Booking",
      description: "Book appointments with top specialists in just a few taps, with real-time availability and instant confirmation.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    },
    {
      title: "Secure Health Records",
      description: "All your medical records stored securely in one place, accessible only to you and your authorized doctors.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    },
    {
      title: "Emergency Services",
      description: "Instant access to emergency services and nearest hospitals with just one tap when you need it most.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
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
          className="rounded-lg absolute inset-0 bg-gradient-to-t from-blue-900/60 to-blue-800/20 sm:rounded-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        ></motion.div>

        <motion.div
          className="absolute inset-0 p-4 sm:p-8 md:p-12 lg:p-[90px] flex flex-col justify-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.p
            className="text-white text-[15px] textshadow sm:text-xl md:text-2xl font-light tracking-wider"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            #1 Hospital Management App in Nepal
          </motion.p>

          <motion.h1
            className="text-[50px] textshadow text-white sm:text-6xl md:text-8xl lg:text-[100px] font-bold leading-tight"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            MediAid
          </motion.h1>

          <motion.div className="flex flex-col">
            <motion.h2
              className="text-white text-[30px] sm:text-2xl md:text-3xl lg:text-[40px] mt-[10px] sm:mt-[20px] textshadow font-medium"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              Smarter Care
            </motion.h2>
            <motion.h2
              className="text-white text-[30px] sm:text-2xl md:text-3xl lg:text-[40px] font-extrabold mt-[-5px] sm:mt-[5px] bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.3 }}
            >
              Powered by AI
            </motion.h2>
          </motion.div>

          <motion.div
            className="herobuttons w-full sm:w-[400px] flex flex-row sm:flex-row gap-3 sm:gap-5 text-white mt-8 sm:mt-[50px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <motion.button
              className="w-auto px-6 py-3 bg-white/10 backdrop-blur-md rounded-lg text-base sm:text-lg transition-[0.3s] hover:bg-white/20 hover:scale-105 flex gap-1 items-center border border-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch <ChevronRightIcon className="size-4 sm:size-5" />
            </motion.button>
            <motion.button
              className="w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg text-base sm:text-lg transition-[0.3s] hover:opacity-90 hover:scale-105 flex gap-1 items-center shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Our Services <ChevronRightIcon className="size-4 sm:size-5" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          className="hidden lg:flex absolute bottom-0 right-0 w-full sm:w-[60%] h-[150px] sm:h-[180px] bg-white/90 backdrop-blur-md p-[20px] rounded-tl-3xl rounded-tr-lg shadow-xl border-t border-l border-white/20"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.7 }}
        >
          <div className="h-full w-full items-center flex flex-row justify-around">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="w-[22%] h-[80%] text-center flex flex-col justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <h1 className="text-[32px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">{stat.value}</h1>
                <h5 className="text-gray-600 mt-2 text-sm font-medium">{stat.label}</h5>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Mission Section */}
      <motion.div 
        className="w-[90%] mx-auto mt-[100px] md:mt-[150px] flex flex-col lg:flex-row items-center gap-10 lg:gap-20"
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="lg:w-1/2">
          <motion.h2 
            className="text-[40px] sm:text-[50px] lg:text-[60px] font-bold leading-tight"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Focusing on health <br /> quality, 
            <span className="text-gray-400"> we maintain <br /> customer trust</span>
          </motion.h2>
        </div>
        <div className="lg:w-1/2">
          <motion.p 
            className="text-[18px] sm:text-[22px] text-gray-600 leading-relaxed"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            We prioritize your privacy and security. At MediAid, your medical data is protected with advanced encryption, ensuring that only you and your doctor have access. Your health, your control.
          </motion.p>
          <motion.div 
            className="mt-8 flex flex-wrap gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
              <ShieldCheckIcon className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
              <DevicePhoneMobileIcon className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">Mobile Friendly</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
              <HeartIcon className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">Patient First</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Appointment Section */}
      <motion.div 
        className="w-full bg-gradient-to-br from-blue-50 to-blue-100 py-20 px-6 md:px-12 mt-[100px]"
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          {/* Left Section */}
          <motion.div 
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, x: -100 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-[32px] md:text-[42px] font-bold leading-snug text-gray-800">
              Healthcare management <span className="text-blue-600">simplified</span> for everyone.
            </h1>
            <p className="text-gray-600 mt-6 text-lg leading-relaxed">
              Book appointments, track medical history, and receive personalized care recommendations — all in one place. Our AI-powered platform learns your health patterns to provide smarter care.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-xl shadow-lg hover:opacity-90 transition-all text-lg font-medium flex items-center gap-2">
                Book Appointment
                <ChevronRightIcon className="h-5 w-5" />
              </button>
              <button className="px-8 py-4 bg-white text-gray-800 border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 transition-all text-lg font-medium flex items-center gap-2">
                Learn More
              </button>
            </div>
          </motion.div>

          {/* Right Section - Booking Card */}
          <motion.div 
            className="lg:w-1/2 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100"
            initial={{ opacity: 0, y: 100 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Your Appointments</h2>
              <span className="text-sm text-blue-600 font-medium">View All</span>
            </div>
            
            <div className="mt-6 space-y-4">
              {appointments.map((appt, index) => (
                <motion.div 
                  key={index}
                  className="p-5 bg-white shadow-sm rounded-xl flex justify-between items-center hover:shadow-md transition-all border border-gray-100"
                  whileHover={{ scale: 1.02 }} 
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 ${appt.color} rounded-lg flex items-center justify-center text-white`}>
                      <HeartIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{appt.title}</h3>
                      <p className="text-gray-500 text-sm">{appt.doctor}</p>
                      <p className="text-gray-500 text-sm flex items-center gap-2 mt-1">
                        {appt.time} | {appt.day}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-white text-xs font-medium rounded-full ${appt.color} shadow`}>
                    {appt.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Slider */}
      <div className="w-full py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Features</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover how MediAid makes healthcare management effortless and efficient
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
            >
              {features.map((feature, index) => (
                <SwiperSlide key={index}>
                  <div className="h-full p-6">
                    <motion.div 
                      className="bg-white h-full rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all flex flex-col"
                      whileHover={{ y: -10 }}
                    >
                      <div className="mb-6">
                        {feature.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-gray-600 mb-6 flex-grow">{feature.description}</p>
                      <button className="mt-auto w-full py-3 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
                        Learn more <ChevronRightIcon className="h-4 w-4" />
                      </button>
                    </motion.div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="w-[90%] max-w-6xl mx-auto py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-center text-[42px] md:text-[55px] font-bold leading-tight">
            Why our users <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">love us</span>
          </h1>
          <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            Don&apos;t just take our word for it. Here&apos;s what our community has to say about their MediAid experience.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-16">
          {/* Review Summary */}
          <motion.div
            className="bg-gradient-to-br from-blue-600 to-blue-400 text-white p-8 rounded-2xl shadow-2xl w-full max-w-xs"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <h1 className="text-5xl font-bold">4.9</h1>
              <div className="flex justify-center my-3">
                {Array(5).fill(0).map((_, index) => (
                  <span key={index} className="text-yellow-300 text-2xl">★</span>
                ))}
              </div>
              <p className="text-sm opacity-90">Based on 247 reviews</p>
              <div className="mt-6 space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-2">
                    <span className="text-xs w-6">{stars}★</span>
                    <div className="h-2 bg-white/30 rounded-full flex-grow">
                      <div 
                        className="h-full bg-white rounded-full" 
                        style={{ width: `${stars === 5 ? '90%' : stars === 4 ? '8%' : '2%'}` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-6 px-6 py-2 bg-white/20 rounded-lg text-sm font-medium hover:bg-white/30 transition-all">
                Read All Reviews
              </button>
            </div>
          </motion.div>

          {/* Review Cards */}
          <div className="flex flex-col md:flex-row gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg max-w-sm flex flex-col"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{review.name}</h3>
                    <p className="text-gray-500 text-sm">{review.date}</p>
                  </div>
                </div>
                <div className="flex mt-3">
                  {Array(review.rating).fill(0).map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                  {Array(5 - review.rating).fill(0).map((_, i) => (
                    <span key={i} className="text-gray-300">★</span>
                  ))}
                </div>
                <p className="mt-4 text-gray-700 flex-grow">
                  {review.text}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                  <ChatBubbleBottomCenterTextIcon className="h-5 w-5 text-blue-600" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-blue-400 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to transform your healthcare experience?
          </motion.h2>
          <motion.p 
            className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join thousands of happy users managing their health with MediAid. Download the app today!
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <button className="px-8 py-4 bg-white text-blue-600 rounded-lg shadow-lg hover:bg-gray-100 transition-all font-bold flex items-center justify-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              App Store
            </button>
            <button className="px-8 py-4 bg-gray-900 text-white rounded-lg shadow-lg hover:bg-gray-800 transition-all font-bold flex items-center justify-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.25-.84-.76-.84-1.35zM14 21l5.16-5.16c.38-.38.59-.88.59-1.42V9.58c0-.54-.21-1.04-.59-1.42L14 3v18zm-4 0V3L3.54 2.12c-.88-.38-1.54.33-1.54 1.23v17.3c0 .9.66 1.61 1.54 1.23L10 21z"/>
              </svg>
              Google Play
            </button>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Logo and Description */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">MediAid</h2>
              <p className="mb-6 leading-relaxed">
                Revolutionizing healthcare management with AI-powered solutions for patients and providers across Nepal.
              </p>
              <div className="flex gap-4">
                {['twitter', 'facebook', 'instagram', 'linkedin'].map((social) => (
                  <a key={social} href="#" className="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all">
                    <span className="sr-only">{social}</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={`M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z`} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {['Home', 'About Us', 'Services', 'Doctors', 'Hospitals'].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
              <ul className="space-y-3">
                {['Appointment Booking', 'Medical Records', 'AI Diagnostics', 'Emergency Services', 'Health Tips'].map((service) => (
                  <li key={service}>
                    <a href="#" className="hover:text-white transition-colors">{service}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
              <address className="not-italic space-y-3">
                <p>Kathmandu, Nepal</p>
                <p>Email: info@mediaid.com</p>
                <p>Phone: +977 9841234567</p>
                <p>Support: 24/7 Available</p>
              </address>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>© 2023 MediAid. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
