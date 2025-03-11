import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { FaPhone } from "react-icons/fa";

const MedicaLRecord = () => {
  const [query, setQuery] = useState("");

  return (
    <>
   
    <div className="w-full bg-white shadow-sm">
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 space-y-3 sm:space-y-0">
        {/* Search Bar */}
        <div className="flex items-center border-b border-gray-300 px-4 py-2 w-full sm:max-w-md">
          <Search className="text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search by Name, Medical IDs, or Number"
            className="ml-2 w-full outline-none text-sm text-gray-700 placeholder-gray-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-2 sm:space-x-4 text-gray-700 text-sm">
          <span className="hidden sm:inline">Kebumen, Indonesia <b>12:04 AM</b></span>
          <span className="hidden sm:inline">|</span>
          <div className="flex items-center cursor-pointer">
            <span className="font-medium">hello, Yahyo</span>
            <ChevronDown size={16} className="ml-1" />
          </div>
        </div>
      </div>
    </div>
    
    <div className="w-full p-2">
    <div className="flex flex-col md:flex-row items-center justify-between bg-white p-4 shadow-sm rounded-lg w-full">
      <div className="flex items-center space-x-4">
        <img
          src="https://i.pinimg.com/736x/e5/ec/5e/e5ec5e54221d0cb3fb54ff93f1f1b02f.jpg"
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg font-medium">Carlos Sainz Jr.</h2>
          <p className="text-gray-500 text-sm">30 Years Old, Male</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-8 text-center md:text-left mt-4 md:mt-0">
        <div>
          <p className="text-gray-500 text-sm">Latest Appointment</p>
          <p className="font-medium">1st December 2023</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Patient Preferred Language</p>
          <p className="font-medium">Nepali</p>
        </div>
      </div>

      <div className="flex items-center space-x-2 mt-4 md:mt-0">
        <button className="bg-black text-white px-4 py-2 rounded-lg">Initiate new visit</button>
        <button className="p-2 bg-gray-200 rounded-full">
          <FaPhone className="text-black" />
        </button>
      </div>
    </div>
    </div>


    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-2">
        <div className="flex justify-between items-center flex-wrap">
          <h2 className="text-2xl font-bold text-gray-800">Default Episode of Care</h2>
          <button className="text-blue-600 font-medium hover:underline">Edit</button>
        </div>
        <p className="text-gray-500 text-sm">Start date: 01/10/23 | End date: N/A</p>
        <div className="mt-3 flex items-center flex-wrap gap-4">
          <span className="bg-green-200 text-green-700 px-3 py-1 rounded-full text-sm font-medium">MIPS Qualification: Yes</span>
          <span className="text-blue-600 text-sm font-medium">Primary Classification: Conservative Shoulder</span>
        </div>
      </div>

      {/* Care Plan Section */}
      <div className="mt-6 bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800">Default Care Plan</h3>
        <div className="flex space-x-4 mt-4 text-gray-500 border-b pb-2">
          <button className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">Questionnaires</button>
          <button className="hover:text-blue-600">All Record</button>
          <button className="hover:text-blue-600">Exercise</button>
          <button className="hover:text-blue-600">Education</button>
        </div>

        {/* Quick Dash - MIPS */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm text-gray-600 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Score</th>
                <th className="p-3 text-left">Version</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {["01/10/23", "04/09/23", "01/09/23"].map((date, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3">{date}</td>
                  <td className="p-3">
                    <span className="bg-green-200 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                      Completed
                    </span>
                  </td>
                  <td className="p-3">FC: 9.3 & PS: 9.3</td>
                  <td className="p-3">2</td>
                  <td className="p-3 text-blue-600 cursor-pointer hover:underline">...</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Doctor & Medical Info Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
          <h4 className="text-lg font-semibold text-gray-800">Doctor</h4>
          <p className="text-blue-600 text-lg font-medium">Usman Afdal Jalil Shisha</p>
          <p className="text-gray-500 mt-2">(669) 293 - 847 - 575</p>
          <p className="text-gray-500">usman@gmail.com</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h4 className="text-lg font-semibold text-gray-800">Medical IDs</h4>
          <p className="text-gray-500 mt-2">ID: 100293847575</p>
          <p className="text-gray-500">Facility: Sector AX</p>
          <p className="text-gray-500">Phone: (992) 993 994</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h4 className="text-lg font-semibold text-gray-800">Level of Medical Care</h4>
          <p className="text-gray-500 mt-2">Care Level: Level 02</p>
          <p className="text-gray-500">Health Care Card: (992) 993 994</p>
          <p className="text-gray-500">Date: 01 December 23</p>
        </div>
      </div>
    </div>

    </>

  );
};

export default MedicaLRecord;
