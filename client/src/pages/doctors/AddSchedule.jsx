import { useState, useEffect } from "react";
import axios from "axios";
import {host} from '../../host.js'

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [slots, setSlots] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [newSlot, setNewSlot] = useState({ day: "", time: "" });

  const dayMap = {
    Sun: "sunday", Mon: "monday", Tue: "tuesday", Wed: "wednesday", 
    Thurs: "thursday", Fri: "friday", Sat: "saturday"
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${host}/api/doctors/getselecteddoc/67cfd188ccd43f0f0cca9280`);
        setSchedule(response.data.doctor.freeslots);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setSlots(schedule.filter(slot => slot.day.toLowerCase() === dayMap[day])
      .map(slot => `${slot.time} (${slot.status})`));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSlot({ ...newSlot, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedSlots = [...schedule, { day: newSlot.day.toLowerCase(), time: newSlot.time }];
    try {
      await axios.put(`${host}/api/doctors/updatedocdetails/67cfd188ccd43f0f0cca9280`, { freeslots: updatedSlots });
      setSchedule(updatedSlots);
      setNewSlot({ day: "", time: "" });
      alert("Schedule updated!");
    } catch (error) {
      console.error(error);
      alert("Update failed.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 text-center">Schedule</h1>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2 mt-4">
        {Object.keys(dayMap).map((day) => (
          <button
            key={day}
            onClick={() => handleDayClick(day)}
            className={`py-2 px-3 rounded-md text-sm font-medium transition ${
              selectedDay === day ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {selectedDay && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-medium">{selectedDay}&apos;s Slots</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {slots.length > 0 ? (
              slots.map((slot, index) => (
                <span key={index} className="p-2 bg-blue-100 text-blue-700 rounded-md text-sm">{slot}</span>
              ))
            ) : (
              <p className="text-gray-500">No slots available.</p>
            )}
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-medium">Add Slot</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="text-sm text-gray-600">Day</label>
            <select name="day" value={newSlot.day} onChange={handleInputChange} className="p-2 rounded-md border w-full focus:ring-2 focus:ring-blue-500" required>
              <option value="">Select a day</option>
              {Object.keys(dayMap).map((day) => (
                <option key={day} value={dayMap[day]}>{day}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-600">Time</label>
            <input type="text" name="time" value={newSlot.time} onChange={handleInputChange} placeholder="e.g., 12-2" className="p-2 rounded-md border w-full focus:ring-2 focus:ring-blue-500" required />
          </div>
          <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
            Add Slot
          </button>
        </form>
      </div>
    </div>
  );
};

export default Schedule;