// import { useState, useEffect } from "react";
// import axios from "axios";
// import AuthStore from '../hooks/authStore.js';
// import { host } from '../host.js';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// // eslint-disable-next-line react/prop-types
// const Schedule = ({ docid }) => {
//   const [selectedDay, setSelectedDay] = useState(null);
//   const [slots, setSlots] = useState([]);
//   const [schedule, setSchedule] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [purpose, setPurpose] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const dayMap = {
//     Sun: "sunday",
//     Mon: "monday",
//     Tue: "tuesday",
//     Wed: "wednesday",
//     Thurs: "thursday",
//     Fri: "friday",
//     Sat: "saturday",
//   };

//   const token = AuthStore.getToken();
  
//   useEffect(() => {
//     const fetchData = async () => {
//       if (!docid) return;
//       try {
//         const response = await axios.get(`${host}/api/doctors/getselecteddoc/${docid}`,{
//           headers: {
//             Authorization: token ? `Bearer ${token}` : '',  
//           },
//         });
//         const newSchedule = response.data.doctor.freeslots || [];
//         setSchedule(newSchedule);
//         if (selectedDay) {
//           setSlots(filterSlotsByDay(selectedDay));
//         }
//       } catch (error) {
//         console.error("Error fetching schedule for docid", docid, ":", error);
//         setSchedule([]);
//         setSlots([]);
//       }
//     };
//     fetchData();
//   }, [docid]);

//   const filterSlotsByDay = (day) => {
//     const fullDayName = dayMap[day];
//     return schedule
//       .filter((slot) => slot.day.toLowerCase() === fullDayName.toLowerCase())
//       .map((slot) => ({
//         display: `${slot.time} (${slot.status})`,
//         time: slot.time,
//         status: slot.status,
//         slotId: slot._id, 
//       }));
//   };

//   const getAppointmentDate = (selectedDay) => {
//     const today = new Date();
//     const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'];
//     const currentDayIndex = today.getDay();
//     const targetDayIndex = daysOfWeek.indexOf(selectedDay);
    
//     let daysToAdd = targetDayIndex - currentDayIndex;
//     if (daysToAdd < 0) {
//       daysToAdd += 7;
//     }
    
//     const appointmentDate = new Date(today);
//     appointmentDate.setDate(today.getDate() + daysToAdd);
//     return appointmentDate.toISOString().split("T")[0];
//   };

//   const handleDayClick = (day) => {
//     setSelectedDay(day);
//     setSlots(filterSlotsByDay(day));
//     setSelectedSlot(null);
//   };

//   const handleSlotClick = (slot) => {
//     // Check if user is logged in before allowing slot selection
//     const user = AuthStore.getUser();
//     if (!user || !user.userid) {
//       toast.error("Please sign in to book an appointment");
//       navigate('/login');
//       return;
//     }
//     setSelectedSlot(slot);
//   };

//   const updateSlotStatus = async (slotId) => {
//     try {
//       const response = await axios.put(`${host}/api/doctors/updatedocdetails/${docid}`, {
//         slotId,
//         status: "booked",
//       },{
//         headers: {
//           Authorization: token ? `Bearer ${token}` : '',  
//         },
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Error updating slot status:", error);
//       throw error;
//     }
//   };

//   const handleCreateAppointment = async () => {
//     if (!selectedSlot || !purpose || !selectedDay) {
//       toast.error("Please select a day, slot, and provide a purpose.");
//       return;
//     }

//     // Check if user is logged in
//     const user = AuthStore.getUser();
//     if (!user || !user.userid) {
//       toast.error("Please sign in to book an appointment");
//       navigate('/login');
//       return;
//     }

//     setLoading(true);
//     try {
//       const appointmentDate = getAppointmentDate(selectedDay);
//       const appointmentTime = selectedSlot.time;

//       // Create the appointment
//       await axios.post(`${host}/api/appointment/createappointment`, {
//         user: user.userid,
//         doctor: docid,
//         date: appointmentDate,
//         purpose,
//         time: appointmentTime,
//       },
//     {
//       headers: {
//         Authorization: token ? `Bearer ${token}` : '',  
//       },
//     });

//       // Update the slot status to "booked"
//       await updateSlotStatus(selectedSlot.slotId);

//       setSchedule((prevSchedule) =>
//         prevSchedule.map((slot) =>
//           slot._id === selectedSlot.slotId ? { ...slot, status: "booked" } : slot
//         )
//       );
//       setSlots((prevSlots) =>
//         prevSlots.map((slot) =>
//           slot.slotId === selectedSlot.slotId
//             ? { ...slot, status: "booked", display: `${slot.time} (booked)` }
//             : slot
//         )
//       );

//       toast.success("Appointment created successfully!");
//       setSelectedSlot(null);
//       setPurpose("");
//     } catch (error) {
//       console.error("Error creating appointment:", error);
//       if (error.response && error.response.status === 401) {
//         toast.error("Please sign in to book an appointment");
//         navigate('/login');
//       } else {
//         toast.error(error.response?.data?.message || "Failed to create appointment. Please try again.");
//       }
//     } finally {
//       setLoading(false);
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
//               {selectedDay} Slots - {getAppointmentDate(selectedDay)}
//             </h2>
//             {slots.length > 0 ? (
//               <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
//                 {slots.map((slot, index) => (
//                   <button
//                     key={index}
//                     className={`py-2 px-3 text-sm rounded-lg transition-all duration-200 ${
//                       selectedSlot?.display === slot.display
//                         ? "bg-blue-500 text-white"
//                         : slot.status === "booked"
//                         ? "bg-gray-300 text-gray-600 cursor-not-allowed"
//                         : "bg-gray-100 text-gray-600 hover:bg-blue-100"
//                     }`}
//                     onClick={() => slot.status === "available" && handleSlotClick(slot)}
//                     disabled={slot.status === "booked"}
//                   >
//                     {slot.display}
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
//               <span className="font-medium">Date:</span>{" "}
//               {getAppointmentDate(selectedDay)}
//             </p>
//             <p className="text-sm text-gray-600 mb-3">
//               <span className="font-medium">Time:</span>{" "}
//               {selectedSlot.time}
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
//               disabled={loading}
//               className={`w-full mt-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
//                 loading
//                   ? "bg-gray-400 text-white cursor-not-allowed"
//                   : "bg-blue-500 hover:bg-blue-600 text-white"
//               }`}
//             >
//               {loading ? "Processing..." : "Confirm"}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Schedule;













import { useState, useEffect } from "react";
import axios from "axios";
import AuthStore from '../hooks/authStore.js';
import { host } from '../host.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Schedule = ({ docid }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [slots, setSlots] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [purpose, setPurpose] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const dayMap = {
    Sun: "sunday",
    Mon: "monday",
    Tue: "tuesday",
    Wed: "wednesday",
    Thurs: "thursday",
    Fri: "friday",
    Sat: "saturday",
  };

  const token = AuthStore.getToken();
  const user = AuthStore.getUser();
  
  useEffect(() => {
    const fetchData = async () => {
      if (!docid) return;
      try {
        const response = await axios.get(`${host}/api/doctors/getselecteddoc/${docid}`,{
          headers: {
            Authorization: token ? `Bearer ${token}` : '',  
          },
        });
        const newSchedule = response.data.doctor.freeslots || [];
        setSchedule(newSchedule);
        if (selectedDay) {
          setSlots(filterSlotsByDay(selectedDay));
        }
      } catch (error) {
        console.error("Error fetching schedule for docid", docid, ":", error);
        setSchedule([]);
        setSlots([]);
      }
    };
    fetchData();
  }, [docid]);

  const filterSlotsByDay = (day) => {
    const fullDayName = dayMap[day];
    return schedule
      .filter((slot) => slot.day.toLowerCase() === fullDayName.toLowerCase())
      .map((slot) => ({
        display: `${slot.time} (${slot.status})`,
        time: slot.time,
        status: slot.status,
        slotId: slot._id, 
      }));
  };

  const getAppointmentDate = (selectedDay) => {
    const today = new Date();
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'];
    const currentDayIndex = today.getDay();
    const targetDayIndex = daysOfWeek.indexOf(selectedDay);
    
    let daysToAdd = targetDayIndex - currentDayIndex;
    if (daysToAdd < 0) {
      daysToAdd += 7;
    }
    
    const appointmentDate = new Date(today);
    appointmentDate.setDate(today.getDate() + daysToAdd);
    return appointmentDate.toISOString().split("T")[0];
  };

  const handleDayClick = (day) => {
    // Check if user is logged in and is a patient before allowing day selection
    if (user && user.role != 'user') {
      toast.warning("Only Users can book appointments");
      return;
    }
    setSelectedDay(day);
    setSlots(filterSlotsByDay(day));
    setSelectedSlot(null);
  };

  const handleSlotClick = (slot) => {
    // Check if user is logged in and is a patient
    if (!user || !user.userid) {
      toast.error("Please sign in to book an appointment");
      navigate('/login');
      return;
    }
    
    if (user.role === 'doctor') {
      toast.error("Doctors cannot book appointments");
      return;
    }
    
    setSelectedSlot(slot);
  };

  const updateSlotStatus = async (slotId) => {
    try {
      const response = await axios.put(`${host}/api/doctors/updatedocdetails/${docid}`, {
        slotId,
        status: "booked",
      },{
        headers: {
          Authorization: token ? `Bearer ${token}` : '',  
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating slot status:", error);
      throw error;
    }
  };

  const handleCreateAppointment = async () => {
    if (!selectedSlot || !purpose || !selectedDay) {
      toast.error("Please select a day, slot, and provide a purpose.");
      return;
    }

    // Check if user is logged in and is a patient
    if (!user || !user.userid) {
      toast.error("Please sign in to book an appointment");
      navigate('/login');
      return;
    }
    
    if (user.role === 'doctor') {
      toast.error("Doctors cannot book appointments");
      return;
    }

    setLoading(true);
    try {
      const appointmentDate = getAppointmentDate(selectedDay);
      const appointmentTime = selectedSlot.time;

      // Create the appointment
      await axios.post(`${host}/api/appointment/createappointment`, {
        user: user.userid,
        doctor: docid,
        date: appointmentDate,
        purpose,
        time: appointmentTime,
      },
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',  
        },
      });

      // Update the slot status to "booked"
      await updateSlotStatus(selectedSlot.slotId);

      setSchedule((prevSchedule) =>
        prevSchedule.map((slot) =>
          slot._id === selectedSlot.slotId ? { ...slot, status: "booked" } : slot
        )
      );
      setSlots((prevSlots) =>
        prevSlots.map((slot) =>
          slot.slotId === selectedSlot.slotId
            ? { ...slot, status: "booked", display: `${slot.time} (booked)` }
            : slot
        )
      );

      toast.success("Appointment created successfully!");
      setSelectedSlot(null);
      setPurpose("");
    } catch (error) {
      console.error("Error creating appointment:", error);
      if (error.response && error.response.status === 401) {
        toast.error("Please sign in to book an appointment");
        navigate('/login');
      } else {
        toast.error(error.response?.data?.message || "Failed to create appointment. Please try again.");
      }
    } finally {
      setLoading(false);
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
              {selectedDay} Slots - {getAppointmentDate(selectedDay)}
            </h2>
            {slots.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {slots.map((slot, index) => (
                  <button
                    key={index}
                    className={`py-2 px-3 text-sm rounded-lg transition-all duration-200 ${
                      selectedSlot?.display === slot.display
                        ? "bg-blue-500 text-white"
                        : slot.status === "booked"
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-gray-100 text-gray-600 hover:bg-blue-100"
                    }`}
                    onClick={() => slot.status === "available" && handleSlotClick(slot)}
                    disabled={slot.status === "booked" || user?.role === 'doctor'}
                  >
                    {slot.display}
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
              <span className="font-medium">Date:</span>{" "}
              {getAppointmentDate(selectedDay)}
            </p>
            <p className="text-sm text-gray-600 mb-3">
              <span className="font-medium">Time:</span>{" "}
              {selectedSlot.time}
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
              disabled={loading}
              className={`w-full mt-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
                loading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {loading ? "Processing..." : "Confirm"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;