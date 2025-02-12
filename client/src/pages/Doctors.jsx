
import DocSidebar from "../components/DocSidebar"
import { useState, useEffect } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import a from '../assets/gm.png'
import b from '../assets/cardio.png'
import c from '../assets/bone.png'
import d from '../assets/tooth.png'
import e from '../assets/neuro.png'
import f from '../assets/brain.png'
import { PiPersonSimpleWalk } from "react-icons/pi";
import { MdPeopleOutline } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import axios from 'axios';


// const doctors = [
//   {
//     name: "Dr. Walter Hartwell White",
//     specialty: "Orthopedic",
//     price: "Rs. 570/hr",
//     image: "https://online-learning-college.com/wp-content/uploads/2023/01/Qualifications-to-Become-a-Doctor--scaled.jpg"
//   },
//   {
//     name: "Dr. Walter Hartwell White",
//     specialty: "Orthopedic",
//     price: "Rs. 570/hr",
//     image: "https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,fl_progressive,q_auto,w_1024/p7ykgzou3hjxhvepevcq.jpg"
//   },
//   {
//     name: "Dr. Walter Hartwell White",
//     specialty: "Orthopedic",
//     price: "Rs. 570/hr",
//     image: "https://plus.unsplash.com/premium_photo-1661723509913-785dde4f4d69?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxhY2slMjBkb2N0b3J8ZW58MHx8MHx8fDA%3D"
//   },
//   {
//     name: "Dr. Walter Hartwell White",
//     specialty: "Orthopedic",
//     price: "Rs. 570/hr",
//     image: "https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZG9jdG9yfGVufDB8fDB8fHww"
//   },
//   {
//     name: "Dr. Walter Hartwell White",
//     specialty: "Orthopedic",
//     price: "Rs. 570/hr",
//     image: "https://familydoctor.org/wp-content/uploads/2018/02/41808433_l.jpg"
//   },
//   {
//     name: "Dr. Walter Hartwell White",
//     specialty: "Orthopedic",
//     price: "Rs. 570/hr",
//     image: "https://cdn.prod.website-files.com/62d4f06f9c1357a606c3b7ef/65ddf3cdf19abaf5688af2f8_shutterstock_1933145801%20(1).jpg"
//   },
//   {
//     name: "Dr. Walter Hartwell White",
//     specialty: "Orthopedic",
//     price: "Rs. 570/hr",
//     image: "https://snibbs.co/cdn/shop/articles/What_are_the_Challenges_of_Being_a_Doctor.jpg?v=1684314843"
//   }
// ];

const Doctors = () => {

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [activeTab, setActiveTab] = useState("About");
  const [doctors, setDoctors] = useState([])
  const [error, setError] = useState(null);


  const tabs = ["About", "Schedule", "Ratings"];
  const tabContent = {
    About: <div><p className="text-normal">As a doctor, my days are filled with both challenges and moments of profound fulfillment. Every morning, I walk into the hospital with a sense of purpose, knowing that I have the opportunity to make a difference in someone’s life. Whether it’s diagnosing a complex condition, comforting a worried family, or performing a life-saving procedure, I’m constantly reminded of the trust my patients place in me. <br/> There are times when the weight of responsibility feels heavy, especially when outcomes aren’t what I hope for, but those moments only drive me to learn and grow. At the end of the day, it’s the gratitude in a patient’s eyes or the simple thankyou that reminds me why I chose this path—it’s not just a job, it’s a calling. </p>       <button className="w-full rounded-lg h-[50px] mt-[20px] text-[20px] bg-buttonblue text-white transition-[0.4s] hover:bg-blue-600">Book</button>
</div>,
    Schedule: <div>
      <h1>This Week&apos;s Schedule</h1>
      <div className="flex gap-2 mt-[20px]">
        <div>
        <div className="w-[50px] h-[50px] transition-[0.3s] border-b-2 border-transparent hover:border-blue-500 bg-white shadow-doc  hover:bg-gray-100 hover:cursor-pointer flex items-center justify-center">Sun</div>
        </div>
        <div>
        <div className="w-[50px] h-[50px] bg-white shadow-doc transition-[0.3s] border-b-2 border-transparent hover:border-blue-500 hover:bg-gray-100 hover:cursor-pointer flex items-center justify-center">Mon</div>
        </div>
        <div>
        <div className="w-[50px] h-[50px] bg-white shadow-doc transition-[0.3s] border-b-2 border-transparent hover:border-blue-500 hover:bg-gray-100 hover:cursor-pointer flex items-center justify-center">Tue</div>
        </div>
        <div>
        <div className="w-[50px] h-[50px] bg-white shadow-doc transition-[0.3s] border-b-2 border-transparent hover:border-blue-500 hover:bg-gray-100 hover:cursor-pointer flex items-center justify-center">Wed</div>
        </div>
        <div>
        <div className="w-[50px] h-[50px]  bg-white shadow-doc transition-[0.3s] border-b-2 border-transparent hover:border-blue-500 hover:bg-gray-100 hover:cursor-pointer flex items-center justify-center">Thurs</div>
        </div>
        <div>
        <div className="w-[50px] h-[50px] bg-white shadow-doc transition-[0.3s] border-b-2 border-transparent hover:border-blue-500 hover:bg-gray-100 hover:cursor-pointer flex items-center justify-center">Fri</div>
        </div>
        <div>
        <div className="w-[50px] h-[50px] bg-white shadow-doc transition-[0.3s] border-b-2 border-transparent hover:border-blue-500 hover:bg-gray-100 hover:cursor-pointer flex items-center justify-center">Sat</div>
        </div>
        
      </div>

    </div>,
    Ratings: <div><p>View all your past and current orders here.</p></div>,
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/doctors/getalldoctors");
        setDoctors(response.data.doctors);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []); // Runs once when component mounts



  return (
    <>
      <div className="flex gap-5 mt-[10px]">
        <DocSidebar/>

        <div className="doctorsmid w-[70%] h-auto rounded-2xl shadow-doc p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[36px]">Hello Drishya,</h1>
              <p className="text-gray-400 text-[15px] mt-[-5px]">Welcome to MediAid’s Doctor Selection!</p>
            </div>
            
            <button className="group flex gap-2 rounded-[50px] border border-gray-400 p-2 pl-4 pr-4 items-center transition-[0.4s] hover:bg-docblue hover:text-white hover:border-none">
              <IoCalendarOutline size={19} className="text-docblue group-hover:text-white" />
              <p className="text-[15px]">February 9, 2025</p> 
          </button>
          </div>




          {/*  types of doc */}
          <div className="grid grid-cols-6 h-[184px] mt-[30px] gap-7">
            <div className="shadow-doc rounded-xl p-2 flex flex-col justify-center items-center text-center transition-[0.3s] hover:bg-lightblue">
              <div className="h-[60%] w-full flex justify-center">
                <img src={a}></img>
              </div>
              General
            </div>
            <div className="shadow-doc rounded-xl p-2 flex flex-col justify-center items-center text-center transition-[0.3s] hover:bg-lightblue cursor-pointer">
              <div className="h-[60%] w-full flex justify-center">
                <img src={b}></img>
              </div>
              Cardiologist
            </div><div className="shadow-doc rounded-xl p-2 flex flex-col justify-center items-center text-center transition-[0.3s] hover:bg-lightblue cursor-pointer">
              <div className="h-[60%] w-full flex justify-center">
                <img src={c}></img>
              </div>
              Orthopedic
            </div><div className="shadow-doc rounded-xl p-2 flex flex-col justify-center items-center text-center transition-[0.3s] hover:bg-lightblue cursor-pointer">
              <div className="h-[60%] w-full flex justify-center">
                <img src={d}></img>
              </div>
              Dentist
            </div><div className="shadow-doc rounded-xl p-2 flex flex-col justify-center items-center text-center transition-[0.3s] hover:bg-lightblue cursor-pointer">
              <div className="h-[60%] w-full flex justify-center">
                <img src={e}></img>
              </div>
              Neurologist
            </div><div className="shadow-doc rounded-xl p-2 flex flex-col justify-center items-center text-center transition-[0.3s] hover:bg-lightblue cursor-pointer">
              <div className="h-[60%] w-full flex justify-center">
                <img src={f}></img>
              </div>
              Psychiatrists
            </div>
          </div>




          {/* Selected Doctors */}
          <div className="mt-[30px]">
            <h1 className="text-[20px]">
              Recommended Orthopedic <span className="text-docblue">(20)</span>
            </h1>

            <div className="grid grid-cols-3 mt-[10px] gap-[20px]">
            {doctors.map((doctor, index) => (
              <div
                key={index}
                className="h-[350px] w-full shadow-doc rounded-lg hover:cursor-pointer transition-[0.3s] hover:scale-[1.02]"
              >
                <div className="w-[95%] ml-[2.5%] h-[60%]">
                  <div
                    className="w-full h-full rounded-lg mt-[10px] bg-cover bg-center"
                    style={{ backgroundImage: `url('${doctor.image}')` }}
                  ></div>
                </div>

                <div className="p-4">
                  <h1 className="text-[18px] font-bold">{doctor.user.name}</h1>
                  <p className="text-gray-400 text-[15px]">{doctor.specialization.specialization}</p>

                  <div className="flex mt-[30px] justify-between">
                    <span className="text-docblue font-bold">Rs.{doctor.hourlyPrice}/-</span>
                    <span className="transition-[0.4s] hover:underline cursor-pointer">
                      View Details
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>




        </div>


        <div className="doctorrightside w-[30%] rounded-2xl shadow-doc p-6 sticky top-0 h-screen overflow-y-auto">
          {selectedDoctor ? (
            <div>
              <img
                src={selectedDoctor.image}
                alt={selectedDoctor.name}
                className="w-full h-[250px] object-cover rounded-xl mt-4"
              />
              <div className="flex items-center justify-between mt-[10px]">
                <div>
                <h1 className="text-[24px] font-bold">{selectedDoctor.name}</h1>
                <p className="text-gray-400 text-[18px]">{selectedDoctor.specialty}</p>
                </div>
                <p className="text-docblue text-[18px] font-bold mt-4">{selectedDoctor.price}</p>
              </div>


              <div className="flex border-2 rounded-lg border-gray-100  w-full p-4 h-[90px] mt-[20px] justify-between">
                <div>
                  <div className="flex gap-2">
                    <PiPersonSimpleWalk size={25} className="text-purple-600"/>
                    <h1 className="font-bold text-[18px]">5 years</h1>
                  </div>
                  <p className="text-gray-600 mt-[5px]">Experience</p>
                </div>
                <div className="h-full w-[1px] bg-slate-300"></div>
                <div>
                  <div className="flex gap-2">
                    <MdPeopleOutline size={24} className="text-green-500"/>
                    <h1 className="font-bold text-[18px]">1000</h1>

                  </div>
                  <p className="text-gray-600 mt-[5px]">Total Patients</p>

                </div>
                <div className="h-full w-[1px] bg-slate-300"></div>

                <div>
                  <div className="flex gap-2">
                    <CiStar size={26} className="text-yellow-400"/>
                    <h1 className="font-bold text-[18px]">20</h1>
                  </div>
                  <p className="text-gray-600 mt-[5px]">Ratings</p>
                </div>
              </div>
              
            </div>
          ) : (
            <p className="text-gray-400 text-[18px] text-center mt-20">
              Select a doctor to see details
            </p>
          )}




<div className="max-w-screen-md mx-auto">
      <div className="bg-white py-2 px-3">
        <nav className="flex flex-wrap gap-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`inline-flex whitespace-nowrap border-b-2 py-2 px-3 text-sm font-medium transition-all duration-200 ease-in-out 
                ${activeTab === tab ? "border-b-docblue text-docblue font-semibold" : "border-transparent text-gray-600 hover:border-b-docblue hover:text-docblue"}`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-[-10px] p-4 rounded-md overflow-auto break-words">
        {tabContent[activeTab]}
      </div>

    </div>

      </div>



      </div>
    </>
  )
}

export default Doctors
