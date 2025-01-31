import React, { useState, useEffect } from "react";
import a from '../assets/heroimg.png'
import b from '../assets/hospital.jpg'
import c from '../assets/login.jpg'
import d from '../assets/heroo.jpg'

const slides = [
  {
    title: "Patient Management",
    description:
      "MediAid revolutionizes hospital patient management by streamlining every aspect of the patient care journey. From automated appointment scheduling and real-time updates to seamless record-keeping, our platform ensures efficient handling of patient data with precision and security.",
    buttonText: "Learn More",
    image: b, // Placeholder image
  },
  {
    title: "Appointment Booking",
    description: "The Appointment Booking feature of MediAid's Hospital Management System (HMS) is designed to streamline the process of scheduling and managing medical appointments, making it faster, more efficient, and accessible for both patients and healthcare providers.",
    buttonText: "Learn More",
    image: c, // Placeholder image
  },
  {
    title: "AI Disease Detection",
    description: "The AI Disease Detection feature in MediAid's Hospital Management System (HMS) leverages cutting-edge artificial intelligence to assist healthcare professionals in diagnosing diseases with higher accuracy, speed, and efficiency. By integrating advanced machine learning algorithms and medical data analysis, this feature helps detect a wide range of diseases at early stages, providing patients with timely interventions and reducing diagnostic errors.",
    buttonText: "Learn More",
    image: d, // Placeholder image
  },
  {
    title: "Online Pharmacy",
    description: "The ePharmacy feature in MediAid's Hospital Management System (HMS) brings the convenience of online medication ordering to patients and enhances the efficiency of pharmacy operations. This feature enables patients to easily access and purchase prescription medications, over-the-counter drugs, and wellness products from the comfort of their homes, while ensuring that healthcare providers have seamless integration with the pharmacy for better patient care.",
    buttonText: "Learn More",
    image: a, // Placeholder image
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setProgress(0); // Reset progress bar
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 1;
      });
    }, 50); // Adjust progress bar speed

    return () => clearInterval(progressInterval);
  }, [currentSlide]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setProgress(0); // Reset progress bar
  };

  return (
    <div className="relative w-full h-auto overflow-hidden bg-gray-100">
      {/* Slides */}
      <div className="w-3/4 max-w-[1200px] mx-auto justify-center mt-[40px]">
        <h1 className="text-[50px] text-center">
          Find Best hospitals and <br />
          doctors, <span className="text-gray-600">all over Nepal</span>
        </h1>
      </div>
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 flex flex-col lg:flex-row items-center justify-center p-8 text-center lg:text-left"
          >
            {/* Left - Text Section */}
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
              {slide.description && (
                <p className="text-gray-600 mb-8 max-w-2xl">{slide.description}</p>
              )}
              <button className="bg-blue-500 text-white px-6 py-2 rounded-full">
                {slide.buttonText}
              </button>
            </div>

            {/* Right - Image Section */}
            <div className="lg:w-1/2 mt-8 lg:mt-0">
              <img src={slide.image} alt={slide.title} className="w-full h-auto rounded-lg shadow-lg mb-[20px]" />
            </div>
          </div>
        ))}
      </div>

      {/* Timer Lines */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 px-8">
        {slides.map((_, index) => (
          <div
            key={index}
            className="h-1 bg-gray-300 flex-1 mx-1 relative overflow-hidden rounded-full"
            onClick={() => goToSlide(index)} // Add click handler here
          >
            <div
              className={`h-full absolute left-0 top-0 ${
                currentSlide === index ? "bg-blue-500" : "bg-transparent"
              }`}
              style={{
                width: currentSlide === index ? `${progress}%` : "0%",
                transition: currentSlide === index ? "width 0.05s linear" : "none",
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
