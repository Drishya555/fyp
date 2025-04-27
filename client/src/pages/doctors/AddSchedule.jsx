import { useState, useEffect } from "react";
import axios from "axios";
import { host } from '../../host.js';
import Authstore from '../../hooks/authStore.js';

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0); // 0 = current week, 1 = next week, etc.
  const userId = Authstore.getUser()?.userid || null;
  const token = Authstore.getToken();

  // Get the current week days based on the week offset
  const getWeekDays = (weekOffset) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 6 = Saturday

    // Calculate the date of the Sunday that starts this week
    const sundayDate = new Date(today);
    sundayDate.setDate(today.getDate() - currentDay + (weekOffset * 7));
    
    const result = [];
    
    // Generate 7 days starting from Sunday
    for (let i = 0; i < 7; i++) {
      const date = new Date(sundayDate);
      date.setDate(sundayDate.getDate() + i);
      const dayIndex = date.getDay();
      
      result.push({
        date: date,
        dayName: days[dayIndex],
        shortName: shortDays[dayIndex],
        formattedDate: date.getDate(),
        month: date.toLocaleString('default', { month: 'short' }),
        fullDate: date.toISOString().split('T')[0],
        isToday: date.toDateString() === today.toDateString()
      });
    }
    
    return result;
  };

  const [weekDays, setWeekDays] = useState(getWeekDays(0));

  // Update week days when week offset changes
  useEffect(() => {
    setWeekDays(getWeekDays(currentWeekOffset));
    setSelectedDay(null); // Reset selected day when changing weeks
  }, [currentWeekOffset]);

  // Generate time options in 10-minute increments from 10:00 AM to 5:00 PM
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 10; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 10) {
        // Don't include 5:10 PM or later
        if (hour === 17 && minute > 0) continue;
        
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        const formattedMinute = minute.toString().padStart(2, '0');
        const timeValue = `${hour}:${formattedMinute}`; // 24-hour format for calculations
        const displayTime = `${formattedHour}:${formattedMinute} ${ampm}`; // 12-hour format for display
        
        options.push({
          value: timeValue,
          display: displayTime,
          hour,
          minute
        });
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  // Parse time string to minutes since start of day
  const timeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Get available end times based on selected start time
  const getAvailableEndTimes = () => {
    if (!selectedStartTime) return [];
    
    const startMinutes = timeToMinutes(selectedStartTime.value);
    const maxEndMinutes = startMinutes + 60; // Max 1 hour appointment
    const minEndMinutes = startMinutes + 10; // Min 10 min appointment
    
    return timeOptions.filter(time => {
      const timeMinutes = timeToMinutes(time.value);
      return timeMinutes > startMinutes && 
             timeMinutes <= maxEndMinutes && 
             timeMinutes >= minEndMinutes;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${host}/api/doctors/getselecteddoc/${userId}`,{
          headers: {
            Authorization: token ? `Bearer ${token}` : '',  
          },
        });
        setSchedule(response.data.doctor.freeslots || []);
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    };
    
    if (userId) {
      fetchData();
    }
  }, [userId]);

  useEffect(() => {
    // Reset end time when start time changes
    setSelectedEndTime(null);
  }, [selectedStartTime]);

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setSelectedStartTime(null);
    setSelectedEndTime(null);
  };

  // Format time slot for display and storage
  const formatTimeSlot = (start, end) => {
    return `${start.display} - ${end.display}`;
  };

  // Check if a specific time point conflicts with any existing slot
  const hasTimeConflict = (day, checkTime) => {
    const checkMinutes = timeToMinutes(checkTime);
    
    return schedule.some(slot => {
      if (slot.day.toLowerCase() !== day.dayName.toLowerCase()) return false;
      
      // Parse the time range from the slot
      const [startStr, endStr] = slot.time.split(' - ');
      
      // Handle AM/PM conversion
      const parseTimeStr = (timeStr) => {
        const [time, period] = timeStr.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
        return `${hours}:${minutes.toString().padStart(2, '0')}`;
      };
      
      const slotStart = timeToMinutes(parseTimeStr(startStr));
      const slotEnd = timeToMinutes(parseTimeStr(endStr));
      
      // Check if the time point falls within this slot
      return checkMinutes >= slotStart && checkMinutes < slotEnd;
    });
  };

  // Check if a time range conflicts with any existing slot
  const hasRangeConflict = (day, startTime, endTime) => {
    const startMinutes = timeToMinutes(startTime.value);
    const endMinutes = timeToMinutes(endTime.value);
    
    // Check each 10-minute increment in the range
    for (let checkMinutes = startMinutes; checkMinutes < endMinutes; checkMinutes += 10) {
      const hour = Math.floor(checkMinutes / 60);
      const minute = checkMinutes % 60;
      const checkTime = `${hour}:${minute.toString().padStart(2, '0')}`;
      
      if (hasTimeConflict(day, checkTime)) {
        return true;
      }
    }
    
    return false;
  };

  const handleAddSlot = async () => {
    if (!selectedDay || !selectedStartTime || !selectedEndTime) {
      alert("Please select day, start time, and end time");
      return;
    }

    const timeSlot = formatTimeSlot(selectedStartTime, selectedEndTime);

    // Check for conflicts
    if (hasRangeConflict(selectedDay, selectedStartTime, selectedEndTime)) {
      alert("This time slot conflicts with an existing appointment");
      return;
    }

    const newSlot = {
      day: selectedDay.dayName.toLowerCase(),
      time: timeSlot,
      status: "available"
    };

    try {
      const updatedSlots = [...schedule, newSlot];
      await axios.put(`${host}/api/doctors/updatedocdetails/${userId}`, { freeslots: updatedSlots },{ headers: {
        Authorization: token ? `Bearer ${token}` : '',  
      },});
      setSchedule(updatedSlots);
      setSelectedStartTime(null);
      setSelectedEndTime(null);
      alert("Slot added successfully!");
    } catch (error) {
      console.error("Error adding slot:", error);
      alert("Failed to add slot. Please try again.");
    }
  };

  const handleRemoveSlot = async (slot) => {
    // Don't allow removal of booked slots
    if (slot.status === "booked") {
      alert("Cannot remove a booked appointment");
      return;
    }

    try {
      const updatedSlots = schedule.filter(s => 
        !(s.day === slot.day && s.time === slot.time)
      );
      
      await axios.put(`${host}/api/doctors/updatedocdetails/${userId}`, { freeslots: updatedSlots }, { headers: {
        Authorization: token ? `Bearer ${token}` : '',  
      },});
      setSchedule(updatedSlots);
      alert("Slot removed successfully!");
    } catch (error) {
      console.error("Error removing slot:", error);
      alert("Failed to remove slot. Please try again.");
    }
  };

  // Group time slots by time for display
  const getTimeSlotsForSelectedDay = () => {
    if (!selectedDay) return [];
    
    return schedule.filter(slot => 
      slot.day.toLowerCase() === selectedDay.dayName.toLowerCase()
    ).sort((a, b) => {
      // Sort by start time
      const startTimeA = a.time.split(' - ')[0];
      const startTimeB = b.time.split(' - ')[0];
      return startTimeA.localeCompare(startTimeB);
    });
  };

  // Calculate duration between two time objects
  const calculateDuration = (start, end) => {
    const startMinutes = timeToMinutes(start.value);
    const endMinutes = timeToMinutes(end.value);
    const diff = endMinutes - startMinutes;
    
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    
    let result = '';
    if (hours > 0) result += `${hours} hr `;
    if (minutes > 0) result += `${minutes} min`;
    return result.trim();
  };

  // Format week range for display
  const getWeekRangeText = () => {
    if (weekDays.length === 0) return '';
    
    const firstDay = weekDays[0];
    const lastDay = weekDays[6];
    
    return `${firstDay.month} ${firstDay.formattedDate} - ${lastDay.month} ${lastDay.formattedDate}`;
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Doctor Schedule</h1>
      
      {/* Week Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => setCurrentWeekOffset(prev => Math.max(prev - 1, 0))}
          disabled={currentWeekOffset === 0}
          className={`p-2 rounded-lg flex items-center ${
            currentWeekOffset === 0 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-blue-600 hover:bg-blue-50'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Previous Week
        </button>
        
        <h2 className="text-lg font-medium text-gray-700">
          {getWeekRangeText()}
          {currentWeekOffset === 0 && <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">Current Week</span>}
        </h2>
        
        <button 
          onClick={() => setCurrentWeekOffset(prev => prev + 1)}
          className="p-2 rounded-lg flex items-center text-blue-600 hover:bg-blue-50"
        >
          Next Week
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {/* Calendar View */}
      <div className="mb-8">
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day) => (
            <div 
              key={day.fullDate}
              onClick={() => handleDayClick(day)}
              className={`flex flex-col items-center p-4 rounded-lg cursor-pointer transition duration-200 ${
                selectedDay?.fullDate === day.fullDate 
                  ? "bg-blue-600 text-white" 
                  : day.isToday
                    ? "bg-blue-50 border border-blue-200"
                    : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <span className="text-sm font-medium">{day.shortName}</span>
              <span className="text-2xl font-bold my-1">{day.formattedDate}</span>
              <span className="text-xs">{day.month}</span>
              {day.isToday && (
                <span className={`text-xs mt-1 px-2 py-0.5 rounded-full ${
                  selectedDay?.fullDate === day.fullDate ? "bg-white text-blue-600" : "bg-blue-100 text-blue-600"
                }`}>
                  Today
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Existing Time Slots */}
      {selectedDay && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Appointments for {selectedDay.dayName}, {selectedDay.month} {selectedDay.formattedDate}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getTimeSlotsForSelectedDay().length > 0 ? (
              getTimeSlotsForSelectedDay().map((slot, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border ${
                    slot.status === "booked" 
                      ? "bg-red-50 border-red-200" 
                      : "bg-green-50 border-green-200"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-800">{slot.time}</h3>
                      <p className={`text-sm ${
                        slot.status === "booked" ? "text-red-600" : "text-green-600"
                      }`}>
                        {slot.status === "booked" ? "Booked" : "Available"}
                      </p>
                    </div>
                    
                    {slot.status !== "booked" && (
                      <button 
                        onClick={() => handleRemoveSlot(slot)}
                        className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full p-8 text-center bg-gray-50 rounded-lg">
                <p className="text-gray-500">No appointments scheduled for this day</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add New Slot */}
      {selectedDay && (
        <div className="bg-gray-50 p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Availability</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Start Time Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Start Time</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                {timeOptions.map((time) => {
                  const isSelected = selectedStartTime?.value === time.value;
                  const isConflict = hasTimeConflict(selectedDay, time.value);
                  
                  return (
                    <button
                      key={time.value}
                      onClick={() => !isConflict && setSelectedStartTime(time)}
                      disabled={isConflict}
                      className={`p-2 text-sm rounded border transition ${
                        isSelected 
                          ? "bg-blue-100 border-blue-300 text-blue-600" 
                          : isConflict
                            ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-white border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {time.display}
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* End Time Selection - Only show if start time is selected */}
            {selectedStartTime && (
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">End Time</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                  {getAvailableEndTimes().map((time) => {
                    const isSelected = selectedEndTime?.value === time.value;
                    const isConflict = hasRangeConflict(selectedDay, selectedStartTime, time);
                    
                    return (
                      <button
                        key={time.value}
                        onClick={() => !isConflict && setSelectedEndTime(time)}
                        disabled={isConflict}
                        className={`p-2 text-sm rounded border transition ${
                          isSelected 
                            ? "bg-blue-100 border-blue-300 text-blue-600" 
                            : isConflict
                              ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                              : "bg-white border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {time.display}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          
          {/* Preview and Action */}
          {selectedStartTime && selectedEndTime && (
            <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
              <h3 className="font-medium text-gray-700">Appointment Preview</h3>
              <div className="flex items-center mt-2">
                <span className="text-blue-600 font-medium">
                  {selectedStartTime.display} - {selectedEndTime.display}
                </span>
                <span className="ml-2 px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                  {calculateDuration(selectedStartTime, selectedEndTime)}
                </span>
              </div>
            </div>
          )}
          
          <button
            onClick={handleAddSlot}
            disabled={!selectedStartTime || !selectedEndTime}
            className={`w-full p-3 rounded-lg text-white font-medium transition ${
              selectedStartTime && selectedEndTime 
                ? "bg-blue-600 hover:bg-blue-700" 
                : "bg-blue-300 cursor-not-allowed"
            }`}
          >
            Add Availability
          </button>
        </div>
      )}

      {/* Empty state */}
      {!selectedDay && (
        <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-xl">
          <div className="text-5xl mb-4">📅</div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">No Date Selected</h3>
          <p className="text-gray-500 text-center">Please select a date to view and manage your available time slots.</p>
        </div>
      )}
    </div>
  );
};

export default Schedule;