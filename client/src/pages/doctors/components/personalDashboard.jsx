import { useState, useEffect } from "react";
import { Calendar, Clock, User, FileText, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { startOfMonth, endOfMonth, eachDayOfInterval, format, getDay, isSameDay } from "date-fns";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import axios from 'axios';
import { host } from '../../../host.js';
import Authstore from '../../../hooks/authStore.js';

export default function DocAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dailyStats, setDailyStats] = useState([]);
  const [statusStats, setStatusStats] = useState([]);

  // Get the doctor ID from auth store with null check
  const doctorId = Authstore.getUser()?.userid || null;
      const token = Authstore.getToken();

  // Calendar display functions
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const firstDayOffset = getDay(monthStart);

  const prevMonth = () => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  const nextMonth = () => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        
        // Check if doctorId exists before making the API call
        if (!doctorId) {
          setError("Doctor ID not found. Please log in again.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${host}/api/appointment/getallappointmentsbydoctor/${doctorId}`,{
          headers: {
            Authorization: token ? `Bearer ${token}` : '',  
          },
        });
        
        // Check if response exists and has data
        if (response?.data?.success) {
          setAppointments(response.data.appointments || []);
          processAppointmentData(response.data.appointments || []);
        } else {
          setError(response?.data?.message || "Failed to fetch appointments");
          setAppointments([]);
        }
      } catch (err) {
        setError(err.response?.data?.message || 
                err.message || 
                "An error occurred while fetching appointments");
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [doctorId]);

  // Process appointment data for charts with null checks
  const processAppointmentData = (appointmentData) => {
    if (!appointmentData || !Array.isArray(appointmentData)) {
      setDailyStats([]);
      setStatusStats([]);
      return;
    }

    // Create daily stats
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayCount = Array(7).fill(0);
    
    // Count appointments by status
    const statusCount = {
      "Pending": 0,
      "Confirmed": 0,
      "Completed": 0,
      "Cancelled": 0
    };

    appointmentData.forEach(app => {
      try {
        const date = app?.date ? new Date(app.date) : null;
        const dayIndex = date ? date.getDay() : 0;
        dayCount[dayIndex]++;
        
        // Count by status with fallback
        const status = app?.status || "Pending";
        statusCount[status] = (statusCount[status] || 0) + 1;
      } catch (e) {
        console.error("Error processing appointment:", e);
      }
    });

    // Format for charts
    const dailyData = days.map((day, index) => ({
      day,
      appointments: dayCount[index] || 0
    }));

    const statusData = Object.keys(statusCount).map(status => ({
      status,
      count: statusCount[status] || 0
    }));

    setDailyStats(dailyData);
    setStatusStats(statusData);
  };

  // Generate calendar events from appointments with null checks
  const generateEvents = () => {
    const events = {};
    
    appointments?.forEach(appointment => {
      try {
        const dateStr = appointment?.date ? format(new Date(appointment.date), "yyyy-MM-dd") : null;
        if (dateStr) {
          if (!events[dateStr]) {
            events[dateStr] = [];
          }
          events[dateStr].push(appointment?.status || "Pending");
        }
      } catch (e) {
        console.error("Error generating event:", e);
      }
    });
    
    return events;
  };

  const calendarEvents = generateEvents();

  // Filter appointments based on selected date with null checks
  const filteredAppointments = appointments?.filter(appointment => {
    try {
      const appointmentDate = appointment?.date ? new Date(appointment.date) : null;
      if (!appointmentDate) return false;
      
      const isSameDate = selectedDate ? isSameDay(appointmentDate, selectedDate) : false;
      if (!isSameDate) return false;
      
      if (filterStatus === "all") return true;
      return appointment?.status?.toLowerCase() === filterStatus.toLowerCase();
    } catch (e) {
      console.error("Error filtering appointment:", e);
      return false;
    }
  }) || [];

  // Status badge color with fallback
  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase() || 'unknown';
    switch(statusLower) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Purpose badge text with fallback
  const getPurposeText = (purpose) => {
    if (!purpose) return "Unknown";
    switch(purpose.toString()) {
      case '1': return 'Check-up';
      case '2': return 'Follow-up';
      case '3': return 'Consultation';
      case '4': return 'Emergency';
      default: return purpose;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">My Appointments</h1>
        <p className="text-gray-600">Manage and view all your patient appointments</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded-2xl shadow-md w-full border relative overflow-hidden">
          <div className="flex justify-between items-center">
            <Calendar className="text-blue-600" size={24} />
            <span className="text-gray-500">This Week</span>
          </div>
          <div className="border-t my-2"></div>
          <div>
            <h2 className="text-2xl font-bold">{appointments?.length || 0}</h2>
            <p className="text-gray-500 text-sm">Total Appointments</p>
          </div>
          <div className="mt-2 h-24">
            {dailyStats?.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyStats}>
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis hide />
                  <Tooltip cursor={{ fill: "#f0f0f0" }} />
                  <Bar dataKey="appointments" fill="#2563eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No data available
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-md w-full border relative overflow-hidden">
          <div className="flex justify-between items-center">
            <CheckCircle className="text-green-600" size={24} />
            <span className="text-gray-500">Status</span>
          </div>
          <div className="border-t my-2"></div>
          <div>
            <h2 className="text-2xl font-bold">{statusStats.find(s => s.status === "Pending")?.count || 0}</h2>
            <p className="text-gray-500 text-sm">Pending Appointments</p>
          </div>
          <div className="mt-2 h-24">
            {statusStats?.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusStats}>
                  <XAxis dataKey="status" tick={{ fontSize: 10 }} />
                  <YAxis hide />
                  <Tooltip cursor={{ fill: "#f0f0f0" }} />
                  <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No data available
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-md w-full border relative overflow-hidden">
          <div className="flex justify-between items-center">
            <Clock className="text-blue-600" size={24} />
            <span className="text-gray-500">Today</span>
          </div>
          <div className="border-t my-2"></div>
          <div>
            <h2 className="text-2xl font-bold">
              {appointments?.filter(app => app?.date && isSameDay(new Date(app.date), new Date())).length || 0}
            </h2>
            <p className="text-gray-500 text-sm">Today&apos;s Appointments</p>
          </div>
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {appointments
                ?.filter(app => app?.date && isSameDay(new Date(app.date), new Date()))
                ?.slice(0, 3)
                ?.map(app => (
                  <span key={app?._id || Math.random()} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {app?.time || 'N/A'}
                  </span>
                ))}
              {appointments?.filter(app => app?.date && isSameDay(new Date(app.date), new Date()))?.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                  +{appointments.filter(app => app?.date && isSameDay(new Date(app.date), new Date())).length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Calendar and Appointments Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Calendar Side */}
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
                const isSelected = selectedDate && format(selectedDate, "yyyy-MM-dd") === formattedDate;
                const hasAppointments = calendarEvents[formattedDate]?.length > 0;
                
                return (
                  <div
                    key={formattedDate}
                    onClick={() => setSelectedDate(day)}
                    className={`w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full relative cursor-pointer transition-all duration-200 hover:bg-gray-200 text-xs sm:text-sm ${
                      format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd") ? "bg-blue-500 text-white" : ""
                    } ${isSelected ? "bg-gray-200 text-black" : ""}`}
                  >
                    {format(day, "d")}
                    {hasAppointments && (
                      <div className="absolute bottom-0 flex space-x-1">
                        <span className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-blue-500" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Filter by Status</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setFilterStatus("all")}
                  className={`px-3 py-1 text-xs rounded-full ${
                    filterStatus === "all" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  All
                </button>
                <button 
                  onClick={() => setFilterStatus("pending")}
                  className={`px-3 py-1 text-xs rounded-full ${
                    filterStatus === "pending" ? "bg-yellow-500 text-white" : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  Pending
                </button>
                <button 
                  onClick={() => setFilterStatus("confirmed")}
                  className={`px-3 py-1 text-xs rounded-full ${
                    filterStatus === "confirmed" ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-700"
                  }`}
                >
                  Confirmed
                </button>
                <button 
                  onClick={() => setFilterStatus("completed")}
                  className={`px-3 py-1 text-xs rounded-full ${
                    filterStatus === "completed" ? "bg-green-500 text-white" : "bg-green-100 text-green-700"
                  }`}
                >
                  Completed
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                Appointments for {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "selected date"}
              </h2>
              <div className="text-sm text-gray-500">
                {filteredAppointments?.length || 0} appointments
              </div>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <p>Loading appointments...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">
                <p>{error}</p>
              </div>
            ) : filteredAppointments?.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No appointments found for this date.</p>
              </div>
            ) : (
              <div className="divide-y">
                {filteredAppointments?.map((appointment) => (
                  <div key={appointment?._id || Math.random()} className="py-4 hover:bg-gray-50 rounded-lg px-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex items-center mb-2 md:mb-0">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-4">
                          {appointment?.user?.image ? (
                            <img 
                              src={appointment.user.image} 
                              alt={appointment.user.name || "Patient"} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "";
                              }}
                            />
                          ) : (
                            <User size={24} className="text-gray-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">{appointment?.user?.name || "Unknown Patient"}</h3>
                          <p className="text-sm text-gray-500">{appointment?.user?.email || "No email provided"}</p>
                        </div>
                      </div>
                      <div className="flex items-center mt-2 md:mt-0">
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(appointment?.status)}`}>
                          {appointment?.status || "Unknown"}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2">
                      <div className="flex items-center">
                        <Clock className="mr-2 text-gray-400" size={16} />
                        <span className="text-sm">{appointment?.time || "Time not specified"}</span>
                      </div>
                      <div className="flex items-center">
                        <FileText className="mr-2 text-gray-400" size={16} />
                        <span className="text-sm">{getPurposeText(appointment?.purpose)}</span>
                      </div>
                      <div className="flex justify-end md:justify-start">
                        <button className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}