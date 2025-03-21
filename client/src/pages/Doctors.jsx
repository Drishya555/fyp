import DocSidebar from "../components/DocSidebar";
import { useState, useEffect } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import a from '../assets/gm.png';
import b from '../assets/cardio.png';
import c from '../assets/bone.png';
import d from '../assets/tooth.png';
import e from '../assets/neuro.png';
import f from '../assets/brain.png';
import { PiPersonSimpleWalk } from "react-icons/pi";
import { MdPeopleOutline } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import axios from 'axios';
import BookAppointmentTesting from "./BookAppointmentTesting.jsx";
import {host} from '../host.js'

const Doctors = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [activeTab, setActiveTab] = useState("About");
  const [doctors, setDoctors] = useState([]);
  const [, setError] = useState(null); // Fixed: Added error state variable
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { name: "General", img: a },
    { name: "Cardiologist", img: b },
    { name: "Orthopedic", img: c },
    { name: "Dentist", img: d },
    { name: "Neurologist", img: e },
    { name: "Psychiatrists", img: f },
  ];

  const tabs = ["About", "Schedule", "Ratings"];
  const tabContent = {
    About: (
      <div>
        <p className="text-normal">{selectedDoctor?.about}</p>
        <button className="w-full rounded-lg h-[50px] mt-[20px] text-[20px] bg-buttonblue text-white transition-[0.4s] hover:bg-blue-600">
          Book
        </button>
      </div>
    ),
    Schedule: (
      <div>
        <h1>This Week&apos;s Schedule</h1>
        {selectedDoctor ? (
          <BookAppointmentTesting docid={selectedDoctor._id} />
        ) : (
          <p>Please select a doctor to view their schedule.</p>
        )}
      </div>
    ),
    Ratings: <div><p>View all your past and current orders here.</p></div>,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${host}/api/doctors/getalldoctors`);
        setDoctors(response.data.doctors);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []); // Runs once when component mounts

  const filteredDoctors = doctors.filter(
    (doctor) =>
      !selectedCategory || doctor?.specialization?.specialization === selectedCategory
  );

  return (
    <>
      <div className="flex gap-5 mt-[10px]">
        <DocSidebar />

        <div className="doctorsmid w-[70%] h-auto rounded-2xl shadow-doc p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[36px]">Hello Drishya,</h1>
              <p className="text-gray-400 text-[15px] mt-[-5px]">Welcome to MediAid’s Doctor Selection!</p>
            </div>
            <button className="group flex gap-2 rounded-[50px] border border-gray-400 p-2 pl-4 pr-4 items-center transition-[0.4s] hover:bg-docblue hover:text-white hover:border-none">
              <IoCalendarOutline size={19} className="text-docblue group-hover:text-white" />
              <p className="text-[15px]">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </button>
          </div>

          {/* Categories */}
          <div className="doccategorygrid grid grid-cols-6 h-auto mt-[30px] gap-7">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`shadow-doc rounded-xl p-2 flex flex-col justify-center items-center text-center transition-[0.3s] cursor-pointer ${
                  selectedCategory === category.name ? "bg-lightblue text-blue-400" : "hover:bg-lightblue hover:text-blue-400"
                }`}
                onClick={() => setSelectedCategory(category.name === selectedCategory ? null : category.name)}
              >
                <div className="h-[60%] w-full flex justify-center">
                  <img src={category.img} alt={category.name} />
                </div>
                {category.name}
              </div>
            ))}
          </div>

          {/* Doctors List */}
          <div className="mt-[30px]">
            <h1 className="text-[20px]">
              Recommended Orthopedic <span className="text-docblue">(20)</span>
            </h1>

            <div className="doclist grid grid-cols-3 mt-[10px] gap-[20px]">
              {filteredDoctors.map((doctor, index) => (
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
                    <h1 className="text-[18px] font-bold">{doctor?.name}</h1>
                    <p className="text-gray-400 text-[15px]">{doctor?.specialization?.specialization}</p>
                    <div className="flex mt-[30px] justify-between">
                      <span className="text-docblue font-bold">Rs.{doctor.hourlyPrice}/-</span>
                      <span className="transition-[0.4s] hover:underline cursor-pointer">View Details</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
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

              <div className="flex border-2 rounded-lg border-gray-100 w-full p-4 h-[90px] mt-[20px] justify-between">
                <div>
                  <div className="flex gap-2">
                    <PiPersonSimpleWalk size={25} className="text-purple-600" />
                    <h1 className="font-bold text-[18px]">{selectedDoctor.experience}</h1>
                  </div>
                  <p className="text-gray-600 mt-[5px]">Experience</p>
                </div>
                <div className="h-full w-[1px] bg-slate-300"></div>
                <div>
                  <div className="flex gap-2">
                    <MdPeopleOutline size={24} className="text-green-500" />
                    <h1 className="font-bold text-[18px]">{selectedDoctor.totalPatients}</h1>
                  </div>
                  <p className="text-gray-600 mt-[5px]">Total Patients</p>
                </div>
                <div className="h-full w-[1px] bg-slate-300"></div>
                <div>
                  <div className="flex gap-2">
                    <CiStar size={26} className="text-yellow-400" />
                    <h1 className="font-bold text-[18px]">{selectedDoctor.rating} star</h1>
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

          {/* Tabs */}
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
  );
};

export default Doctors;