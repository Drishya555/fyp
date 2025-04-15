import { ArrowRight, Calendar, BedSingle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Tablecomponent from "./tablecomponent";
import { useState, useEffect } from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, getDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Authstore from '../../../hooks/authStore.js'
import axios from 'axios';
import { host } from '../../../host.js';
import Schedule from "../AddSchedule.jsx";

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
  "2025-06-22": ["green"],
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

  const userid = Authstore.getUser()?.userid || null;

  const [appointmentCount, setAppointmentCount] = useState(0); 

useEffect(() => {
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        `${host}/api/appointment/getappointmentbydoctor/${userid}`
      );
      
      if (response.data.appointments) {
        setAppointmentCount(response.data.appointments.length); // Count the appointments
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  fetchAppointments();
}, []);

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
            I hope you&apos;re in high spirits—there are {appointmentCount} patients eagerly waiting for you!
          </p>
        </div>
        <div
          className="w-12 h-12 rounded-full bg-cover bg-center hover:cursor-pointer"
          style={{ backgroundImage: `url(${bgimg})` }}
        ></div>
      </div>
      
      {/* Stats Cards */}
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

      {/* Table and Calendar Section - Now responsive */}
      <div className="p-6 flex flex-col lg:flex-row gap-5">
        {/* Table - Takes full width on mobile, 2/3 on desktop */}
        <div className="w-full lg:w-2/3">
          <Tablecomponent/>
        </div>
        
        {/* Calendar - Takes full width on mobile, 1/3 on desktop */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <button onClick={prevMonth} className="text-gray-600 hover:text-black">
                <ChevronLeft size={20} />
              </button>
              <h2 className="text-lg font-semibold">{format(currentDate, "MMMM yyyy")}</h2>
              <button onClick={nextMonth} className="text-gray-600 hover:text-black">
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-gray-700 text-xs sm:text-sm">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="font-medium truncate">{day}</div>
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
                    className={`w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full relative cursor-pointer transition-all duration-200 hover:bg-gray-200 text-xs sm:text-sm ${
                      format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd") ? "bg-blue-500 text-white" : ""
                    } ${isSelected ? "bg-gray-100 text-black" : ""}`}
                  >
                    {format(day, "d")}
                    <div className="absolute bottom-0 flex space-x-1">
                      {(events[formattedDate] || []).map((color, idx) => (
                        <span 
                          key={idx} 
                          className={`w-1 h-1 sm:w-2 sm:h-2 rounded-full ${
                            color === "blue" ? "bg-blue-500" : color === "red" ? "bg-pink-500" : "bg-yellow-500"
                          }`} 
                        />
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


      <div className="mt-[50px]">
          <Schedule/>
      </div>
    </>
  );
};

export default PersonalDashboard;