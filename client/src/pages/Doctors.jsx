
import DocSidebar from "../components/DocSidebar"
import { useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import a from '../assets/gm.png'
import b from '../assets/cardio.png'
import c from '../assets/bone.png'
import d from '../assets/tooth.png'
import e from '../assets/neuro.png'
import f from '../assets/brain.png'


const doctors = [
  {
    name: "Dr. Walter Hartwell White",
    specialty: "Orthopedic",
    price: "Rs. 570/hr",
    image: "https://online-learning-college.com/wp-content/uploads/2023/01/Qualifications-to-Become-a-Doctor--scaled.jpg"
  },
  {
    name: "Dr. Walter Hartwell White",
    specialty: "Orthopedic",
    price: "Rs. 570/hr",
    image: "https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,fl_progressive,q_auto,w_1024/p7ykgzou3hjxhvepevcq.jpg"
  },
  {
    name: "Dr. Walter Hartwell White",
    specialty: "Orthopedic",
    price: "Rs. 570/hr",
    image: "https://plus.unsplash.com/premium_photo-1661723509913-785dde4f4d69?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxhY2slMjBkb2N0b3J8ZW58MHx8MHx8fDA%3D"
  },
  {
    name: "Dr. Walter Hartwell White",
    specialty: "Orthopedic",
    price: "Rs. 570/hr",
    image: "https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZG9jdG9yfGVufDB8fDB8fHww"
  },
  {
    name: "Dr. Walter Hartwell White",
    specialty: "Orthopedic",
    price: "Rs. 570/hr",
    image: "https://familydoctor.org/wp-content/uploads/2018/02/41808433_l.jpg"
  },
  {
    name: "Dr. Walter Hartwell White",
    specialty: "Orthopedic",
    price: "Rs. 570/hr",
    image: "https://cdn.prod.website-files.com/62d4f06f9c1357a606c3b7ef/65ddf3cdf19abaf5688af2f8_shutterstock_1933145801%20(1).jpg"
  },
  {
    name: "Dr. Walter Hartwell White",
    specialty: "Orthopedic",
    price: "Rs. 570/hr",
    image: "https://snibbs.co/cdn/shop/articles/What_are_the_Challenges_of_Being_a_Doctor.jpg?v=1684314843"
  }
];

const Doctors = () => {

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  
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
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <div className="w-[95%] ml-[2.5%] h-[60%]">
                    <div
                      className="w-full h-full rounded-lg mt-[10px] bg-cover bg-center"
                      style={{ backgroundImage: `url('${doctor.image}')` }}
                    ></div>
                  </div>

                  <div className="p-4">
                    <h1 className="text-[18px] font-bold">{doctor.name}</h1>
                    <p className="text-gray-400 text-[15px]">{doctor.specialty}</p>

                    <div className="flex mt-[30px] justify-between">
                      <span className="text-docblue font-bold">{doctor.price}</span>
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
              <h1 className="text-[24px] font-bold">{selectedDoctor.name}</h1>
              <p className="text-gray-400 text-[18px]">{selectedDoctor.specialty}</p>
              <img
                src={selectedDoctor.image}
                alt={selectedDoctor.name}
                className="w-full h-[250px] object-cover rounded-xl mt-4"
              />
              <p className="mt-4">{selectedDoctor.description}</p>
              <p className="text-docblue font-bold mt-4">{selectedDoctor.price}</p>
            </div>
          ) : (
            <p className="text-gray-400 text-[18px] text-center mt-20">
              Select a doctor to see details
            </p>
          )}
        </div>

      </div>
    </>
  )
}

export default Doctors
