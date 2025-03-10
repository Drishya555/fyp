import { ArrowRight, Calendar,BedSingle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Tablecomponent from "./tablecomponent";
import {useState} from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, getDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
const data = [
  { day: "Mon", appointments: 12 },
  { day: "Tue", appointments: 15 },
  { day: "Wed", appointments: 9 },
  { day: "Thu", appointments: 22 },
  { day: "Fri", appointments: 14 },
];

const events = {
  "2025-06-10": ["appointment"],
  "2025-06-13": ["another appointment", "appointment with doc"],
  "2025-06-16": ["blue"],
  "2025-06-22": [ "green"],
  "2025-06-25": ["blue"],
};
const beds = [
  { day: "Mon", beds: 12 },
  { day: "Tue", beds: 15 },
  { day: "Wed", beds: 9 },
  { day: "Thu", beds: 22 },
  { day: "Fri", beds: 14 },
];



const PersonalDashboard = () => {
  const bgimg = "https://t3.ftcdn.net/jpg/04/01/33/02/360_F_401330201_h0oE33RLbJTnZc0lrDQb25uYgrb85vLd.jpg";


  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const firstDayOffset = getDay(monthStart);

  const prevMonth = () => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  const nextMonth = () => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));


  return (
    <>
      <div className="w-full h-[90px] bg-white flex justify-between items-center p-6">
        <div>
          <h1 className="text-[20px] font-semibold">Good Morning, Dr. Deepali!</h1>
          <p className="text-[14px] text-gray-700">
            I hope you&apos;re in high spirits—there are 67 patients eagerly waiting for you!
          </p>
        </div>

        {/* Circular Profile Image */}
        <div
          className="w-12 h-12 rounded-full bg-cover bg-center hover:cursor-pointer"
          style={{ backgroundImage: `url(${bgimg})` }}
        ></div>
      </div>
      <div className="md:p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-4 rounded-2xl shadow-md w-full border relative overflow-hidden">
      <div className="flex justify-between items-center">
        <Calendar className="text-blue-600" size={24} />
        <ArrowRight className="text-gray-500" size={20} />
      </div>
      <div className="border-t my-2"></div>
      <div>
        <h2 className="text-2xl font-bold">15</h2>
        <p className="text-gray-500 text-sm">Appointments This Week</p>
      </div>
      <div className="mt-2 h-24">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis hide />
            <Tooltip cursor={{ fill: "#f0f0f0" }} />
            <Bar dataKey="appointments" fill="#2563eb" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>



    <div className="bg-white p-4 rounded-2xl shadow-md w-full border relative overflow-hidden">
      <div className="flex justify-between items-center">
        <BedSingle className="text-blue-600" size={24} />
        <ArrowRight className="text-gray-500" size={20} />
      </div>
      <div className="border-t my-2"></div>
      <div>
        <h2 className="text-2xl font-bold">280</h2>
        <p className="text-gray-500 text-sm">Beds In Use</p>
      </div>
      <div className="mt-2 h-24">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={beds}>
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis hide />
            <Tooltip cursor={{ fill: "#f0f0f0" }} />
            <Bar dataKey="beds" fill="#2563eb" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="bg-white p-4 rounded-2xl shadow-md w-full border relative overflow-hidden">
      <div className="flex justify-between items-center">
        <BedSingle className="text-blue-600" size={24} />
        <ArrowRight className="text-gray-500" size={20} />
      </div>
      <div className="border-t my-2"></div>
      <div>
        <h2 className="text-2xl font-bold">280</h2>
        <p className="text-gray-500 text-sm">Beds In Use</p>
      </div>
      <div className="mt-2 h-24">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={beds}>
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis hide />
            <Tooltip cursor={{ fill: "#f0f0f0" }} />
            <Bar dataKey="beds" fill="#2563eb" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

    


      </div>



      <div className="p-6 flex gap-5">
        <div>
        <Tablecomponent/>
        </div>
        <div>
        <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="text-gray-600 hover:text-black">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-lg font-semibold">{format(currentDate, "MMMM yyyy")}</h2>
        <button onClick={nextMonth} className="text-gray-600 hover:text-black">
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center text-gray-700">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-medium">{day}</div>
        ))}
        {Array.from({ length: firstDayOffset }).map((_, idx) => (
          <div key={idx} className="text-transparent">0</div>
        ))}
        {days.map((day) => {
          const formattedDate = format(day, "yyyy-MM-dd");
          const isSelected = selectedDate === formattedDate;
          return (
            <div
              key={formattedDate}
              onClick={() => setSelectedDate(formattedDate)}
              className={`w-10 h-10 flex items-center justify-center rounded-full relative cursor-pointer transition-all duration-200 hover:bg-gray-200 ${
                format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd") ? "bg-blue-500 text-white" : ""
              } ${isSelected ? "bg-gray-100 text-black" : ""}`}
            >
              {format(day, "d")}
              <div className="absolute bottom-0 flex space-x-1">
                {(events[formattedDate] || []).map((color, idx) => (
                  <span key={idx} className={`w-2 h-2 rounded-full ${
                    color === "blue" ? "bg-blue-500" : color === "red" ? "bg-pink-500" : "bg-yellow-500"
                  }`} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {selectedDate && (
        <div className="mt-4 p-2 bg-gray-100 rounded text-center">
          <p className="text-sm font-medium">Selected Date: {selectedDate}</p>
          <p className="text-xs text-gray-600">
            Events: {events[selectedDate] ? events[selectedDate].join(", ") : "No events"}
          </p>
        </div>
      )}
    </div>
        </div>

      </div>

      
    </>
  );
};

export default PersonalDashboard;
