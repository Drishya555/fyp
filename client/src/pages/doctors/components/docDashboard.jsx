import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useState } from "react";
import { X } from "lucide-react";
import { PiPersonSimpleWalk } from "react-icons/pi";
import { MdPeopleOutline } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import BookAppointmentTesting from '../../BookAppointmentTesting.jsx'


const Docdashboard = () => {
    const [activeTab, setActiveTab] = useState("About");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "Dr. Deepali Adhikari",
        patients: "14,000+",
        experience: "30+ years"
    });

    const data = [
      { name: "Alice", value: 40, color: "#3b82f6" },
      { name: "Bob", value: 30, color: "#86efac" },
      { name: "Charlie", value: 20, color: "#fcd34d" },
      { name: "David", value: 10, color: "#f87171" }
    ];
    

    const bgurl = 'https://images.unsplash.com/photo-1524721696987-b9527df9e512?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmVkJTIwYWJzdHJhY3R8ZW58MHx8MHx8fDA%3D';
    const profileImage = "https://media.gettyimages.com/id/1591832777/video/doctor-woman-and-checklist-for-healthcare-advice-consulting-and-medical-support-test-and.jpg?s=640x640&k=20&c=cf3M9rNJ2343wiXxvfc-qnO2wsUdGg4VlXVJDeCnOhg=";

    const tabContent = {
      "About": `Dr. Bhagwan Koirala, born on July 24, 1960, in Palpa, Nepal, is a distinguished cardiothoracic surgeon renowned for pioneering open-heart surgery in Nepal. 
      He completed his medical education at Kharkiv Medical Institute in Ukraine in 1989 and pursued post-graduate training in cardiothoracic surgery at the National 
      Institute of Cardiovascular Diseases, Dhaka University, Bangladesh, in 1994. In 1997, Dr. Koirala led a team of Nepalese surgeons in performing the country's first open-heart 
      surgery at Tribhuvan University Teaching Hospital, marking a significant milestone in Nepal's medical history.`,
      "Schedule": <BookAppointmentTesting/>,
      "Experience": "With over 30 years of experience, Dr. Koirala has performed 14,000+ cardiovascular surgeries and trained numerous medical professionals.",
      "Reviews": "Patients appreciate Dr. Koirala's expertise, compassionate care, and commitment to advancing cardiothoracic surgery in Nepal."
    };

    return (
      <div className="w-full p-6 font-normal text-gray-800">
        {/* Background Banner */} 
        <div
          className="relative w-full h-[30vh] rounded-xl overflow-hidden"
          style={{
            backgroundImage: `url(${bgurl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
  
        {/* User Profile Section */}
        <div className="relative flex flex-col items-center mt-[-50px] sm:flex-row sm:items-end sm:space-x-6 p-6">
          <img
            src={profileImage}
            alt="Dr. Deepali Adhikari"
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
          />
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 w-full justify-between">
            <div className="text-center sm:text-left mt-3 sm:mt-0">
              <h2 className="text-lg font-medium">{formData.name}</h2>
              <p className="text-gray-600">Department of Cardiology</p>
              <button onClick={() => setIsModalOpen(true)} className="text-sm text-blue-600 hover:underline">
                Edit
              </button>
            </div>
  
            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <a href="#" className="text-pink-500 hover:text-pink-600 text-xl">
                <FaInstagram />
              </a>
              <a href="#" className="text-blue-700 hover:text-blue-800 text-xl">
                <FaLinkedin />
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-600 text-xl">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
  
        {/* Doctor's Details Section */}
        <div className="mt-8 p-6 border-t">
          <div className="flex space-x-6 text-md font-medium border-b pb-2">
            {Object.keys(tabContent).map((tab) => (
              <span 
                key={tab} 
                className={`cursor-pointer pb-2 ${activeTab === tab ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-600 hover:text-blue-700'}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </span>
            ))}
          </div>
          <p className="mt-4 text-gray-700 leading-relaxed">{tabContent[activeTab]}</p>
        </div>



        <div className="flex flex-col md:flex-row  md:justify-between w-full p-6 gap-6">
      <div className="flex flex-col md:flex-row md:w-[40%] border-2 rounded-lg border-gray-100 p-4 h-auto md:h-[90px] justify-between">
        <div className="text-center md:text-left">
          <div className="flex gap-2 justify-center md:justify-start">
            <PiPersonSimpleWalk size={25} className="text-purple-600" />
            <h1 className="font-bold text-[18px]">21 Years</h1>
          </div>
          <p className="text-gray-600 mt-[5px]">Experience</p>
        </div>
        <div className="hidden md:block h-full w-[1px] bg-slate-300"></div>
        <div className="text-center md:text-left">
          <div className="flex gap-2 justify-center md:justify-start">
            <MdPeopleOutline size={24} className="text-green-500" />
            <h1 className="font-bold text-[18px]">220</h1>
          </div>
          <p className="text-gray-600 mt-[5px]">Total Patients</p>
        </div>
        <div className="hidden md:block h-full w-[1px] bg-slate-300"></div>
        <div className="text-center md:text-left">
          <div className="flex gap-2 justify-center md:justify-start">
            <CiStar size={26} className="text-yellow-400" />
            <h1 className="font-bold text-[18px]">5 star</h1>
          </div>
          <p className="text-gray-600 mt-[5px]">Ratings</p>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center mt-[-50px]">
        <div className="w-full max-w-md">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={5} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center mt-4 gap-4">
            {data.map((entry, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="w-4 h-4 block rounded-full" style={{ backgroundColor: entry.color }}></span>
                <span className="text-gray-700 text-sm">{entry.name} ({entry.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
              {/* Close Button */}
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              >
                <X size={20} />
              </button>

              {/* Modal Content */}
              <h2 className="text-lg font-semibold mb-4 text-center">Edit Profile</h2>

              {/* Background Image */}
              <div
                className="w-full h-24 rounded-lg overflow-hidden mb-4"
                style={{
                  backgroundImage: `url(${bgurl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>

              {/* Profile Image */}
              <div className="flex justify-center">
                <img
                  src={profileImage}
                  alt="Doctor"
                  className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover -mt-12"
                />
              </div>

              {/* Form */}
              <form className="mt-4 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Number of Patients</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={formData.patients}
                    onChange={(e) => setFormData({ ...formData, patients: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Years of Experience</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  />
                </div>

                <button className="w-full bg-blue-600 text-white p-2 rounded-lg mt-4 hover:bg-blue-700">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
};
  
export default Docdashboard;
