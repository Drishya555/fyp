// /* eslint-disable react/prop-types */
// import { useState, useEffect } from "react";

// const RescheduleAppointment = ({ 
//   appointmentId, 
//   currentDate, 
//   currentTime, 
//   doctorId, 
//   onRescheduleSuccess,
//   authStore,
//   apiHost,
//   httpClient,
//   toastNotification,
//   navigate
// }) => {
//   const [selectedDay, setSelectedDay] = useState(null);
//   const [slots, setSlots] = useState([]);
//   const [schedule, setSchedule] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [appointmentDetails, setAppointmentDetails] = useState(null);

//   const dayMap = {
//     Sun: "sunday",
//     Mon: "monday",
//     Tue: "tuesday",
//     Wed: "wednesday",
//     Thurs: "thursday",
//     Fri: "friday",
//     Sat: "saturday",
//   };

//   const token = authStore?.getToken();
//   const user = authStore?.getUser();
  
//   useEffect(() => {
//     const fetchData = async () => {
//       if (!doctorId || !appointmentId) return;
      
//       try {
//         // Fetch doctor's schedule
//         const doctorResponse = await httpClient.get(`${apiHost}/api/doctors/getselecteddoc/${doctorId}`, {
//           headers: {
//             Authorization: token ? `Bearer ${token}` : '',  
//           },
//         });
//         const newSchedule = doctorResponse.data.doctor.freeslots || [];
//         setSchedule(newSchedule);

//         // Fetch current appointment details (optional - you can pass this as prop instead)
//         try {
//           const appointmentResponse = await httpClient.get(`${apiHost}/api/appointment/getappointment/${appointmentId}`, {
//             headers: {
//               Authorization: token ? `Bearer ${token}` : '',  
//             },
//           });
//           setAppointmentDetails(appointmentResponse.data.appointment);
//         } catch (err) {
//           console.log("Could not fetch appointment details, using provided props");
//           console.log(err)
//         }

//         if (selectedDay) {
//           setSlots(filterSlotsByDay(selectedDay));
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         toastNotification?.error("Failed to load appointment details");
//         setSchedule([]);
//         setSlots([]);
//       }
//     };
//     fetchData();
//   }, [doctorId, appointmentId, selectedDay, token, apiHost, httpClient]);

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
//     if (!user || !user.userid) {
//       toastNotification?.error("Please sign in to reschedule appointment");
//       navigate && navigate('/login');
//       return;
//     }
    
//     if (user.role === 'doctor') {
//       toastNotification?.error("Doctors cannot reschedule patient appointments directly");
//       return;
//     }
    
//     setSelectedDay(day);
//     setSlots(filterSlotsByDay(day));
//     setSelectedSlot(null);
//   };

//   const handleSlotClick = (slot) => {
//     if (!user || !user.userid) {
//       toastNotification?.error("Please sign in to reschedule appointment");
//       navigate && navigate('/login');
//       return;
//     }
    
//     if (user.role === 'doctor') {
//       toastNotification?.error("Doctors cannot reschedule patient appointments directly");
//       return;
//     }
    
//     setSelectedSlot(slot);
//   };

//   const handleRescheduleAppointment = async () => {
//     if (!selectedSlot || !selectedDay) {
//       toastNotification?.error("Please select a day and time slot.");
//       return;
//     }

//     if (!user || !user.userid) {
//       toastNotification?.error("Please sign in to reschedule appointment");
//       navigate && navigate('/login');
//       return;
//     }
    
//     if (user.role === 'doctor') {
//       toastNotification?.error("Doctors cannot reschedule patient appointments directly");
//       return;
//     }

//     // Check if selected slot is the same as current appointment
//     const newDate = getAppointmentDate(selectedDay);
//     const currentAppointmentDate = new Date(currentDate).toISOString().split("T")[0];
    
//     if (newDate === currentAppointmentDate && selectedSlot.time === currentTime) {
//       toastNotification?.warning("Please select a different time slot");
//       return;
//     }

//     setLoading(true);
//     try {
//       const newDate = getAppointmentDate(selectedDay);
//       const newTime = selectedSlot.time;

//       const response = await httpClient.put(`${apiHost}/api/appointment/reschedule/${appointmentId}`, {
//         newDate,
//         newTime,
//         slotId: selectedSlot.slotId,
//       }, {
//         headers: {
//           Authorization: token ? `Bearer ${token}` : '',  
//         },
//       });

//       if (response.data.success) {
//         toastNotification?.success("Appointment rescheduled successfully!");
        
//         // Call success callback if provided
//         if (onRescheduleSuccess) {
//           onRescheduleSuccess(response.data.appointment);
//         }
        
//         // Reset form
//         setSelectedSlot(null);
//         setSelectedDay(null);
//         setSlots([]);
//       }
//     } catch (error) {
//       console.error("Error rescheduling appointment:", error);
//       if (error.response && error.response.status === 401) {
//         toastNotification?.error("Please sign in to reschedule appointment");
//         navigate && navigate('/login');
//       } else {
//         toastNotification?.error(error.response?.data?.message || "Failed to reschedule appointment. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="h-auto bg-gray-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm p-6">
//         <h1 className="text-2xl font-light text-gray-800 text-center mb-8 tracking-wide">
//           Reschedule Appointment
//         </h1>

//         {/* Current Appointment Info */}
//         <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
//           <h3 className="text-lg font-medium text-blue-800 mb-2">Current Appointment</h3>
//           <p className="text-sm text-blue-700">
//             <span className="font-medium">Date:</span> {new Date(currentDate).toDateString()}
//           </p>
//           <p className="text-sm text-blue-700">
//             <span className="font-medium">Time:</span> {currentTime}
//           </p>
//           {appointmentDetails && (
//             <p className="text-sm text-blue-700">
//               <span className="font-medium">Purpose:</span> {appointmentDetails.purpose || 'Not specified'}
//             </p>
//           )}
//         </div>

//         <h2 className="text-lg font-medium text-gray-700 mb-4">Select New Date & Time</h2>

//         {/* Day Selection */}
//         <div className="flex justify-center gap-2 mb-8 flex-wrap">
//           {Object.keys(dayMap).map((day) => (
//             <button
//               key={day}
//               className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
//                 selectedDay === day
//                   ? "bg-green-500 text-white shadow-md"
//                   : "bg-white text-gray-600 hover:bg-green-50 border border-gray-200"
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
//               Available Slots for {selectedDay} - {getAppointmentDate(selectedDay)}
//             </h2>
//             {slots.length > 0 ? (
//               <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
//                 {slots.map((slot, index) => (
//                   <button
//                     key={index}
//                     className={`py-2 px-3 text-sm rounded-lg transition-all duration-200 ${
//                       selectedSlot?.display === slot.display
//                         ? "bg-green-500 text-white"
//                         : slot.status === "booked"
//                         ? "bg-gray-300 text-gray-600 cursor-not-allowed"
//                         : "bg-gray-100 text-gray-600 hover:bg-green-100"
//                     }`}
//                     onClick={() => slot.status === "available" && handleSlotClick(slot)}
//                     disabled={slot.status === "booked" || user?.role === 'doctor'}
//                   >
//                     {slot.display}
//                   </button>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500 text-sm">No slots available for this day</p>
//             )}
//           </div>
//         )}

//         {/* Reschedule Confirmation */}
//         {selectedSlot && (
//           <div className="mb-8">
//             <h2 className="text-lg font-medium text-gray-700 mb-4">
//               Confirm Reschedule
//             </h2>
//             <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
//               <p className="text-sm text-green-700 mb-2">
//                 <span className="font-medium">New Date:</span> {getAppointmentDate(selectedDay)}
//               </p>
//               <p className="text-sm text-green-700 mb-2">
//                 <span className="font-medium">New Time:</span> {selectedSlot.time}
//               </p>
//               <p className="text-xs text-green-600 mt-2">
//                 Your previous appointment will be automatically cancelled.
//               </p>
//             </div>
            
//             <div className="flex gap-3">
//               <button
//                 onClick={handleRescheduleAppointment}
//                 disabled={loading}
//                 className={`flex-1 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
//                   loading
//                     ? "bg-gray-400 text-white cursor-not-allowed"
//                     : "bg-green-500 hover:bg-green-600 text-white"
//                 }`}
//               >
//                 {loading ? "Processing..." : "Confirm Reschedule"}
//               </button>
              
//               <button
//                 onClick={() => {
//                   setSelectedSlot(null);
//                   setSelectedDay(null);
//                   setSlots([]);
//                 }}
//                 className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm font-medium transition-all duration-200"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RescheduleAppointment;








































/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const RescheduleAppointment = ({ 
  appointmentId, 
  currentDate, 
  currentTime, 
  doctorId, 
  onRescheduleSuccess,
  authStore,
  apiHost,
  httpClient,
  toastNotification,
  navigate
}) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [slots, setSlots] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  const dayMap = {
    Sun: "sunday",
    Mon: "monday",
    Tue: "tuesday",
    Wed: "wednesday",
    Thurs: "thursday",
    Fri: "friday",
    Sat: "saturday",
  };

  const token = authStore?.getToken();
  const user = authStore?.getUser();
  
  useEffect(() => {
    const fetchData = async () => {
      if (!doctorId || !appointmentId) return;
      
      try {
        // Fetch doctor's schedule
        const doctorResponse = await httpClient.get(`${apiHost}/api/doctors/getselecteddoc/${doctorId}`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',  
          },
        });
        const newSchedule = doctorResponse.data.doctor.freeslots || [];
        setSchedule(newSchedule);

        // Fetch current appointment details
        try {
          const appointmentResponse = await httpClient.get(`${apiHost}/api/appointment/get-appointment/${appointmentId}`, {
            headers: {
              Authorization: token ? `Bearer ${token}` : '',  
            },
          });
          setAppointmentDetails(appointmentResponse.data.appointment);
        } catch (err) {
          console.log("Could not fetch appointment details, using provided props");
          console.log(err);
        }

        if (selectedDay) {
          setSlots(filterSlotsByDay(selectedDay));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toastNotification?.error("Failed to load appointment details");
        setSchedule([]);
        setSlots([]);
      }
    };
    fetchData();
  }, [doctorId, appointmentId, token, apiHost, httpClient]);

  const filterSlotsByDay = (day) => {
    const fullDayName = dayMap[day];
    return schedule
      .filter((slot) => slot.day.toLowerCase() === fullDayName.toLowerCase())
      .map((slot) => ({
        display: `${slot.time} (${slot.status})`,
        time: slot.time,
        status: slot.status,
        slotId: slot._id,
        day: fullDayName
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
    if (!user || !user.userid) {
      toastNotification?.error("Please sign in to reschedule appointment");
      navigate && navigate('/login');
      return;
    }
    
    if (user.role === 'doctor') {
      toastNotification?.error("Doctors cannot reschedule patient appointments directly");
      return;
    }
    
    setSelectedDay(day);
    setSlots(filterSlotsByDay(day));
    setSelectedSlot(null);
  };

  const handleSlotClick = (slot) => {
    if (!user || !user.userid) {
      toastNotification?.error("Please sign in to reschedule appointment");
      navigate && navigate('/login');
      return;
    }
    
    if (user.role === 'doctor') {
      toastNotification?.error("Doctors cannot reschedule patient appointments directly");
      return;
    }
    
    setSelectedSlot(slot);
  };

  const handleRescheduleAppointment = async () => {
    if (!selectedSlot || !selectedDay) {
      toastNotification?.error("Please select a day and time slot.");
      return;
    }

    if (!user || !user.userid) {
      toastNotification?.error("Please sign in to reschedule appointment");
      navigate && navigate('/login');
      return;
    }
    
    if (user.role === 'doctor') {
      toastNotification?.error("Doctors cannot reschedule patient appointments directly");
      return;
    }

    const newDate = getAppointmentDate(selectedDay);
    const currentAppointmentDate = new Date(currentDate).toISOString().split("T")[0];
    
    if (newDate === currentAppointmentDate && selectedSlot.time === currentTime) {
      toastNotification?.warning("Please select a different time slot");
      return;
    }

    setLoading(true);
    try {
      const response = await httpClient.put(
        `${apiHost}/api/appointment/reschedule/${appointmentId}`, 
        {
          newDate,
          newTime: selectedSlot.time,
          slotId: selectedSlot.slotId,
          day: selectedSlot.day
        }, 
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',  
          },
        }
      );

      if (response.data.success) {
        toastNotification?.success("Appointment rescheduled successfully!");
        
        if (onRescheduleSuccess) {
          onRescheduleSuccess(response.data.appointment);
        }
        
        setSelectedSlot(null);
        setSelectedDay(null);
        setSlots([]);
      }
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
      if (error.response && error.response.status === 401) {
        toastNotification?.error("Please sign in to reschedule appointment");
        navigate && navigate('/login');
      } else {
        toastNotification?.error(error.response?.data?.message || "Failed to reschedule appointment. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-auto bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-light text-gray-800 text-center mb-8 tracking-wide">
          Reschedule Appointment
        </h1>

        {/* Current Appointment Info */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-medium text-blue-800 mb-2">Current Appointment</h3>
          <p className="text-sm text-blue-700">
            <span className="font-medium">Date:</span> {new Date(currentDate).toDateString()}
          </p>
          <p className="text-sm text-blue-700">
            <span className="font-medium">Time:</span> {currentTime}
          </p>
          {appointmentDetails && (
            <p className="text-sm text-blue-700">
              <span className="font-medium">Purpose:</span> {appointmentDetails.purpose || 'Not specified'}
            </p>
          )}
        </div>

        <h2 className="text-lg font-medium text-gray-700 mb-4">Select New Date & Time</h2>

        {/* Day Selection */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {Object.keys(dayMap).map((day) => (
            <button
              key={day}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedDay === day
                  ? "bg-green-500 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-green-50 border border-gray-200"
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
              Available Slots for {selectedDay} - {getAppointmentDate(selectedDay)}
            </h2>
            {slots.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {slots.map((slot, index) => (
                  <button
                    key={index}
                    className={`py-2 px-3 text-sm rounded-lg transition-all duration-200 ${
                      selectedSlot?.display === slot.display
                        ? "bg-green-500 text-white"
                        : slot.status === "booked"
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-gray-100 text-gray-600 hover:bg-green-100"
                    }`}
                    onClick={() => slot.status === "available" && handleSlotClick(slot)}
                    disabled={slot.status === "booked" || user?.role === 'doctor'}
                  >
                    {slot.display}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No slots available for this day</p>
            )}
          </div>
        )}

        {/* Reschedule Confirmation */}
        {selectedSlot && (
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              Confirm Reschedule
            </h2>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
              <p className="text-sm text-green-700 mb-2">
                <span className="font-medium">New Date:</span> {getAppointmentDate(selectedDay)}
              </p>
              <p className="text-sm text-green-700 mb-2">
                <span className="font-medium">New Time:</span> {selectedSlot.time}
              </p>
              <p className="text-xs text-green-600 mt-2">
                Your previous appointment will be automatically cancelled.
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleRescheduleAppointment}
                disabled={loading}
                className={`flex-1 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
                  loading
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                {loading ? "Processing..." : "Confirm Reschedule"}
              </button>
              
              <button
                onClick={() => {
                  setSelectedSlot(null);
                  setSelectedDay(null);
                  setSlots([]);
                }}
                className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm font-medium transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RescheduleAppointment;
























