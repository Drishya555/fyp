// import { useState, useEffect } from "react";
// import axios from "axios";

// // eslint-disable-next-line react/prop-types
// const Schedule = ({docid}) => {
//   const [selectedDay, setSelectedDay] = useState(null);
//   const [slots, setSlots] = useState([]);
//   const [schedule, setSchedule] = useState([]);
//   // const [newSlot, setNewSlot] = useState({ day: "", time: "" });
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [purpose, setPurpose] = useState("");

//   const dayMap = {
//     Sun: "sunday",
//     Mon: "monday",
//     Tue: "tuesday",
//     Wed: "wednesday",
//     Thurs: "thursday",
//     Fri: "friday",
//     Sat: "saturday",
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/doctors/getselecteddoc/${docid}`);
//         setSchedule(response.data.doctor.freeslots);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchData();
//   }, []);

//   const filterSlotsByDay = (day) => {
//     const fullDayName = dayMap[day];
//     return schedule
//       .filter((slot) => slot.day.toLowerCase() === fullDayName.toLowerCase())
//       .map((slot) => `${slot.time} (${slot.status})`);
//   };

//   const handleDayClick = (day) => {
//     setSelectedDay(day);
//     setSlots(filterSlotsByDay(day));
//     setSelectedSlot(null);
//   };

//   const handleSlotClick = (slot) => {
//     setSelectedSlot(slot);
//   };

//   // const handleInputChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setNewSlot({ ...newSlot, [name]: value });
//   // };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   const updatedSlots = [...schedule, { day: newSlot.day.toLowerCase(), time: newSlot.time }];
//   //   try {
//   //     await axios.put("http://localhost:8000/api/doctors/updatedocdetails/67cfd188ccd43f0f0cca9280", { freeslots: updatedSlots });
//   //     setSchedule(updatedSlots);
//   //     setNewSlot({ day: "", time: "" });
//   //     alert("Schedule updated successfully!");
//   //   } catch (error) {
//   //     console.error("Error updating schedule:", error);
//   //     alert("Failed to update schedule. Please try again.");
//   //   }
//   // };

//   const handleCreateAppointment = async () => {
//     if (!selectedSlot || !purpose) {
//       alert("Please select a slot and provide a purpose.");
//       return;
//     }
//     try {
//       await axios.post("http://localhost:8000/api/appointment/createappointment", {
//         user: "67d14359c267fa1fb4eb6e51",
//         doctor: "67cfd188ccd43f0f0cca9280",
//         date: new Date().toISOString().split("T")[0],
//         purpose,
//         time: selectedSlot.split(" ("[0]),
//       });
//       alert("Appointment created successfully!");
//       setSelectedSlot(null);
//       setPurpose("");
//     } catch (error) {
//       console.error("Error creating appointment:", error);
//       alert("Failed to create appointment. Please try again.");
//     }
//   };

//   return (
//     <div className="h-auto bg-gray-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm p-6">
//         <h1 className="text-2xl font-light text-gray-800 text-center mb-8 tracking-wide">
//           Weekly Schedule
//         </h1>

//         {/* Day Selection */}
//         <div className="flex justify-center gap-2 mb-8 flex-wrap">
//           {Object.keys(dayMap).map((day) => (
//             <button
//               key={day}
//               className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
//                 selectedDay === day
//                   ? "bg-blue-500 text-white shadow-md"
//                   : "bg-white text-gray-600 hover:bg-blue-50 border border-gray-200"
//               }`}
//               onClick={() => handleDayClick(day)}
//             >
//               {day}
//             </button>
//           ))}
//         </div>

//         {/* Available Slots */}
//         {selectedDay && (
//           <div className="mb-8">
//             <h2 className="text-lg font-medium text-gray-700 mb-4">
//               {selectedDay} Slots
//             </h2>
//             {slots.length > 0 ? (
//               <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
//                 {slots.map((slot, index) => (
//                   <button
//                     key={index}
//                     className={`py-2 px-3 text-sm rounded-lg transition-all duration-200 ${
//                       selectedSlot === slot
//                         ? "bg-blue-500 text-white"
//                         : "bg-gray-100 text-gray-600 hover:bg-blue-100"
//                     }`}
//                     onClick={() => handleSlotClick(slot)}
//                   >
//                     {slot}
//                   </button>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500 text-sm">No slots available</p>
//             )}
//           </div>
//         )}

//         {/* Appointment Confirmation */}
//         {selectedSlot && (
//           <div className="mb-8">
//             <h2 className="text-lg font-medium text-gray-700 mb-4">
//               Book Appointment
//             </h2>
//             <p className="text-sm text-gray-600 mb-3">
//               <span className="font-medium">Time:</span>{" "}
//               {selectedSlot.split(" (")[0]}
//             </p>
//             <input
//               type="text"
//               placeholder="Purpose of visit"
//               value={purpose}
//               onChange={(e) => setPurpose(e.target.value)}
//               className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
//             />
//             <button
//               onClick={handleCreateAppointment}
//               className="w-full mt-3 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all duration-200 text-sm font-medium"
//             >
//               Confirm
//             </button>
//           </div>
//         )}

//         {/* Add New Slot */}
//         {/* <div>
//           <h2 className="text-lg font-medium text-gray-700 mb-4">
//             Add New Slot
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <select
//                 name="day"
//                 value={newSlot.day}
//                 onChange={handleInputChange}
//                 className="p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm bg-white"
//                 required
//               >
//                 <option value="">Day</option>
//                 {Object.keys(dayMap).map((day) => (
//                   <option key={day} value={dayMap[day]}>
//                     {day}
//                   </option>
//                 ))}
//               </select>
//               <input
//                 type="text"
//                 name="time"
//                 placeholder="e.g., 12:00-14:00"
//                 value={newSlot.time}
//                 onChange={handleInputChange}
//                 className="p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all duration-200 text-sm font-medium"
//             >
//               Add Slot
//             </button>
//           </form>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default Schedule;

































import { useState, useEffect } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const Schedule = ({ docid }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [slots, setSlots] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [purpose, setPurpose] = useState("");

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
      if (!docid) return; // Prevent fetch if docid is undefined
      try {
        const response = await axios.get(`http://localhost:8000/api/doctors/getselecteddoc/${docid}`);
        const newSchedule = response.data.doctor.freeslots || [];
        setSchedule(newSchedule);
        // Update slots if a day is already selected
        if (selectedDay) {
          setSlots(filterSlotsByDay(selectedDay));
        }
      } catch (error) {
        console.error("Error fetching schedule for docid", docid, ":", error);
        setSchedule([]);
        setSlots([]); // Reset slots on error if a day is selected
      }
    };
    fetchData();
  }, [docid]); // Re-run when docid changes

  const filterSlotsByDay = (day) => {
    const fullDayName = dayMap[day];
    return schedule
      .filter((slot) => slot.day.toLowerCase() === fullDayName.toLowerCase())
      .map((slot) => `${slot.time} (${slot.status})`);
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setSlots(filterSlotsByDay(day));
    setSelectedSlot(null);
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };

  const handleCreateAppointment = async () => {
    if (!selectedSlot || !purpose) {
      alert("Please select a slot and provide a purpose.");
      return;
    }
    try {
      await axios.post("http://localhost:8000/api/appointment/createappointment", {
        user: "67d14359c267fa1fb4eb6e51",
        doctor: docid,
        date: new Date().toISOString().split("T")[0],
        purpose,
        time: selectedSlot.split(" (")[0],
      });
      alert("Appointment created successfully!");
      setSelectedSlot(null);
      setPurpose("");
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert("Failed to create appointment. Please try again.");
    }
  };

  return (
    <div className="h-auto bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-light text-gray-800 text-center mb-8 tracking-wide">
          Weekly Schedule
        </h1>

        {/* Day Selection */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {Object.keys(dayMap).map((day) => (
            <button
              key={day}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedDay === day
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-blue-50 border border-gray-200"
              }`}
              onClick={() => handleDayClick(day)}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Available Slots */}
        {selectedDay && (
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              {selectedDay} Slots
            </h2>
            {slots.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {slots.map((slot, index) => (
                  <button
                    key={index}
                    className={`py-2 px-3 text-sm rounded-lg transition-all duration-200 ${
                      selectedSlot === slot
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-blue-100"
                    }`}
                    onClick={() => handleSlotClick(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No slots available</p>
            )}
          </div>
        )}

        {/* Appointment Confirmation */}
        {selectedSlot && (
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              Book Appointment
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              <span className="font-medium">Time:</span>{" "}
              {selectedSlot.split(" (")[0]}
            </p>
            <input
              type="text"
              placeholder="Purpose of visit"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
            />
            <button
              onClick={handleCreateAppointment}
              className="w-full mt-3 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all duration-200 text-sm font-medium"
            >
              Confirm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;