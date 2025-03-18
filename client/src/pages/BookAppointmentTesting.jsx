import { useState, useEffect } from "react";
import axios from 'axios';

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [slots, setSlots] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [newSlot, setNewSlot] = useState({ day: "", time: "" });
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [purpose, setPurpose] = useState("");

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
        console.log(response.data.doctor.freeslots);
        setSchedule(response.data.doctor.freeslots);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Function to filter slots based on the selected day
  const filterSlotsByDay = (day) => {
    const fullDayName = dayMap[day];
    const filteredSlots = schedule.filter((slot) => slot.day.toLowerCase() === fullDayName.toLowerCase());
    return filteredSlots.map((slot) => `${slot.time} (${slot.status})`);
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    const filteredSlots = filterSlotsByDay(day);
    console.log(`Selected Day: ${day}, Full Day Name: ${dayMap[day]}, Filtered Slots:`, filteredSlots);
    setSlots(filteredSlots);
    setSelectedSlot(null);
  };

  // Handle slot click
  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    console.log("Selected Slot:", slot);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSlot({ ...newSlot, [name]: value });
  };

  // Handle form submission to update schedule
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedSlots = [...schedule, { day: newSlot.day.toLowerCase(), time: newSlot.time }];

    try {
      const response = await axios.put(
        'http://localhost:8000/api/doctors/updatedocdetails/67cfd188ccd43f0f0cca9280',
        { freeslots: updatedSlots }
      );
      console.log("Update Response:", response.data);
      setSchedule(updatedSlots);
      setNewSlot({ day: "", time: "" });
      alert("Schedule updated successfully!");
    } catch (error) {
      console.error("Error updating schedule:", error);
      alert("Failed to update schedule. Please try again.");
    }
  };

  // Handle appointment creation
  const handleCreateAppointment = async () => {
    if (!selectedSlot || !purpose) {
      alert("Please select a slot and provide a purpose.");
      return;
    }

    // Calculate the actual date for the selected day
    const today = new Date();
    const selectedDate = new Date(today);
    selectedDate.setDate(today.getDate() + (Object.keys(dayMap).indexOf(selectedDay) - today.getDay() + 7) % 7);

    const appointmentData = {
      user: "67d14359c267fa1fb4eb6e51", // Hardcoded user ID
      doctor: "67cfd188ccd43f0f0cca9280", // Hardcoded doctor ID
      date: selectedDate.toISOString().split("T")[0], // Format as YYYY-MM-DD
      purpose: purpose,
      time: selectedSlot.split(" (")[0], // Extract time from the selected slot
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/appointment/createappointment",
        appointmentData
      );
      console.log("Appointment Creation Response:", response.data);
      alert("Appointment created successfully!");
      setSelectedSlot(null);
      setPurpose("");
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert("Failed to create appointment. Please try again.");
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
              onClick={() => handleDayClick(day)}
            >
              {day}
            </div>
          </div>
        ))}
      </div>

      {selectedDay && (
        <div className="mt-4 p-4 bg-white rounded shadow-sm">
          <h2 className="text-lg font-bold">{selectedDay}&apos;s Available Slots</h2>
          {slots.length > 0 ? (
            <div className="flex flex-wrap gap-2 mt-2">
              {slots.map((slot, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-md cursor-pointer ${
                    selectedSlot === slot
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() => handleSlotClick(slot)}
                >
                  {slot}
                </div>
              ))}
            </div>
          ) : (
            <p>No slots available.</p>
          )}
        </div>
      )}

      {selectedSlot && (
        <div className="mt-4 p-4 bg-gray-100 rounded shadow-md">
          <h2 className="text-lg font-bold">Selected Slot</h2>
          <p>
            <strong>Time:</strong> {selectedSlot.split(" (")[0]}
          </p>
          <p>
            <strong>Status:</strong> {selectedSlot.split(" (")[1].replace(")", "")}
          </p>
          <div className="mt-4">
            <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">
              Purpose of Appointment
            </label>
            <input
              type="text"
              id="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Enter purpose"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <button
            onClick={handleCreateAppointment}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Confirm Appointment
          </button>
        </div>
      )}

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