import { useState, useEffect } from "react";
import axios from 'axios';

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [slots, setSlots] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [newSlot, setNewSlot] = useState({ day: "", time: "" }); // State for the new slot form

  // Map short day names to full day names
  const dayMap = {
    Sun: "sunday",
    Mon: "monday",
    Tue: "tuesday",
    Wed: "wednesday",
    Thurs: "thursday",
    Fri: "friday",
    Sat: "saturday",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/doctors/getselecteddoc/67cfd188ccd43f0f0cca9280');
        console.log(response.data.doctor.freeslots); // Log the freeslots array
        setSchedule(response.data.doctor.freeslots);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Function to filter slots based on the selected day
  const filterSlotsByDay = (day) => {
    const fullDayName = dayMap[day]; // Get the full day name from the map
    const filteredSlots = schedule.filter((slot) => slot.day.toLowerCase() === fullDayName.toLowerCase());
    return filteredSlots.map((slot) => `${slot.time} (${slot.status})`);
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    const filteredSlots = filterSlotsByDay(day);
    console.log(`Selected Day: ${day}, Full Day Name: ${dayMap[day]}, Filtered Slots:`, filteredSlots); // Log the selected day and filtered slots
    setSlots(filteredSlots);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSlot({ ...newSlot, [name]: value });
  };

  // Handle form submission to update schedule
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the updated freeslots array
    const updatedSlots = [...schedule, { day: newSlot.day.toLowerCase(), time: newSlot.time }];

    try {
      // Send a PUT request to update the doctor's schedule
      const response = await axios.put(
        'http://localhost:8000/api/doctors/updatedocdetails/67cfd188ccd43f0f0cca9280',
        { freeslots: updatedSlots }
      );
      console.log("Update Response:", response.data); // Log the response
      setSchedule(updatedSlots); // Update the local state with the new schedule
      setNewSlot({ day: "", time: "" }); // Reset the form
      alert("Schedule updated successfully!");
    } catch (error) {
      console.error("Error updating schedule:", error);
      alert("Failed to update schedule. Please try again.");
    }
  };

  return (
    <div>
      <h1>This Week&apos;s Schedule</h1>
      <div className="flex gap-2 mt-[20px]">
        {Object.keys(dayMap).map((day) => (
          <div key={day}>
            <div
              className="w-[50px] h-[50px] bg-white shadow-doc transition-[0.3s] border-b-2 border-transparent hover:border-blue-500 hover:bg-gray-100 hover:cursor-pointer flex items-center justify-center"
              onClick={() => handleDayClick(day)} // Pass the short day name (e.g., "Mon")
            >
              {day}
            </div>
          </div>
        ))}
      </div>

      {selectedDay && (
        <div className="mt-4 p-4 bg-gray-100 rounded shadow-md">
          <h2 className="text-lg font-bold">{selectedDay}&apos;s Available Slots</h2>
          {slots.length > 0 ? (
            <ul className="list-disc ml-5">
              {slots.map((slot, index) => (
                <li key={index}>{slot}</li>
              ))}
            </ul>
          ) : (
            <p>No slots available.</p>
          )}
        </div>
      )}

      {/* Form to add new slots */}
      <div className="mt-8 p-4 bg-gray-100 rounded shadow-md">
        <h2 className="text-lg font-bold mb-4">Add New Slot</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <div>
              <label htmlFor="day" className="block text-sm font-medium text-gray-700">
                Day
              </label>
              <select
                id="day"
                name="day"
                value={newSlot.day}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                required
              >
                <option value="" disabled>Select a day</option>
                {Object.keys(dayMap).map((day) => (
                  <option key={day} value={dayMap[day]}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <input
                type="text"
                id="time"
                name="time"
                value={newSlot.time}
                onChange={handleInputChange}
                placeholder="e.g., 12-2"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Slot
          </button>
        </form>
      </div>
    </div>
  );
};

export default Schedule;