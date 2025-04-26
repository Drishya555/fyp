import { useState, useEffect} from "react";
import { Clock, MapPin, MoreVertical,BadgeCheck   , Filter, SortAsc, SortDesc } from "lucide-react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import axios from 'axios';
import Authstore from '../hooks/authStore.js'
import { host } from '../host.js';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function Bookings() {
  const userid = Authstore.getUser()?.userid || null;

  const [menuOpen, setMenuOpen] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  // Filter and sort states
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("asc"); // 'asc' or 'desc'
  
  const validStatuses = ["Pending", "Approved", "Cancelled", "Completed"];

  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  
  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [bookings, statusFilter, sortField, sortDirection]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        `${host}/api/appointment/getappointmentbyuser/${userid}`
      );

      if (response.data.success) {
        const formattedBookings = response.data.appointments.map((appointment) => {
          // Create a date object from the appointment date
          const appointmentDate = new Date(appointment.date.split('T')[0]); 
          
          return {
            id: appointment._id,
            day: appointmentDate.toLocaleDateString("en-US", { weekday: "short" }),
            date: appointmentDate.getDate(),
            month: appointmentDate.toLocaleDateString("en-US", { month: "short" }),
            year: appointmentDate.getFullYear(),
            fullDate: appointmentDate,
            time: appointment.time, 
            title: `Appointment with Patient: ${appointment?.user?.name} purpose: ${appointment?.purpose}`,
            avatars: [`${appointment?.user?.image}`,`${appointment?.doctor?.image}`],
            location: "Doctor's Office",
            participants: 2, 
            status: appointment.status,
          };
        });

        setBookings(formattedBookings);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  // Apply filters and sorting to the bookings
  const applyFiltersAndSort = () => {
    let result = [...bookings];
    
    // Apply status filter
    if (statusFilter !== "All") {
      result = result.filter(booking => booking.status === statusFilter);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      
      if (sortField === "date") {
        comparison = new Date(a.fullDate) - new Date(b.fullDate);
      } else if (sortField === "status") {
        comparison = a.status.localeCompare(b.status);
      } else if (sortField === "title") {
        comparison = a.title.localeCompare(b.title);
      }
      
      return sortDirection === "asc" ? comparison : -comparison;
    });
    
    setFilteredBookings(result);
  };

  // Group bookings by date
  const groupBookingsByDate = () => {
    const groupedBookings = {};
    
    filteredBookings.forEach(booking => {
      const dateKey = `${booking.fullDate.toDateString()}`;
      
      if (!groupedBookings[dateKey]) {
        groupedBookings[dateKey] = [];
      }
      
      groupedBookings[dateKey].push(booking);
    });
    
    // Convert to array of grouped objects sorted by date
    return Object.entries(groupedBookings)
      .map(([dateKey, bookings]) => ({
        date: new Date(dateKey),
        bookings
      }))
      .sort((a, b) => {
        return sortDirection === "asc" 
          ? a.date - b.date 
          : b.date - a.date;
      });
  };

  const handleDeleteClick = (id) => {
    setSelectedBookingId(id);
    setOpen(true);
  };

  const handleStatusClick = (id, currentStatus) => {
    setSelectedBookingId(id);
    setNewStatus(currentStatus);
    setStatusDialogOpen(true);
  };

  const handleStatusChange = async () => {
    try {
      const response = await axios.put(`${host}/api/appointment/updateappointment/${selectedBookingId}`, {
        status: newStatus
      });
      
      if (response.data.success) {
        // Update the booking status in the local state
        setBookings(prevBookings => 
          prevBookings.map(booking => 
            booking.id === selectedBookingId 
              ? {...booking, status: newStatus} 
              : booking
          )
        );
        
        // Show success notification (you could add a toast notification here)
        console.log("Status updated successfully");
      } else {
        console.error("Error updating status:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setStatusDialogOpen(false);
      setSelectedBookingId(null);
    }
  };

  const handleDeleteAppointment = async() => {
    try {
      const response = await axios.delete(`${host}/api/appointment/deleteappointment/${selectedBookingId}`);
      if (response.data.success) {
        setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== selectedBookingId));
      } else {
        console.error("Error deleting appointment:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
    } finally {
      setOpen(false);
      setSelectedBookingId(null);
    }
  };

  // Function to get the appropriate color for status badges
  const getStatusColor = (status) => {
    switch(status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  // Function to format date header
  const formatDateHeader = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const dateObj = new Date(date);
    dateObj.setHours(0, 0, 0, 0);
    
    if (dateObj.getTime() === today.getTime()) {
      return "Today";
    } else if (dateObj.getTime() === tomorrow.getTime()) {
      return "Tomorrow";
    } else if (dateObj.getTime() === yesterday.getTime()) {
      return "Yesterday";
    } else {
      return dateObj.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
      });
    }
  };



  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 lg:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">Bookings</h1>
            <p className="text-sm sm:text-base text-gray-600">
              See your scheduled appointments and manage your calendar events.
            </p>
          </div>
          <div className="mt-4 lg:mt-0 flex space-x-3">
            <button 
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center"
              onClick={() => setFilterDialogOpen(true)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
            <div className="flex space-x-2">
              
             
              <button 
                className="p-2 rounded-lg bg-white text-gray-700 border border-gray-300"
                onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
                title={`Sort ${sortDirection === "asc" ? "ascending" : "descending"}`}
              >
                {sortDirection === "asc" ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
              </button>
            </div>
           
          </div>
        </div>
        
        {/* Status filter chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button 
            className={`px-3 py-1 rounded-full text-sm font-medium ${statusFilter === "All" ? "bg-blue-600 text-white" : "bg-white text-gray-700 border border-gray-300"}`}
            onClick={() => setStatusFilter("All")}
          >
            All
          </button>
          {validStatuses.map(status => (
            <button 
              key={status}
              className={`px-3 py-1 rounded-full text-sm font-medium ${statusFilter === status ? getStatusColor(status).replace("100", "500").replace(/text-[a-z]+-800/, "text-white") : getStatusColor(status)}`}
              onClick={() => setStatusFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Group appointments by day */}
        {groupBookingsByDate().map((group, groupIndex) => (
          <div key={groupIndex} className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center border-b border-gray-200 pb-2">
              {formatDateHeader(group.date)}
            </h2>
            
            <div className="hidden lg:grid grid-cols-12 gap-4 mb-3 px-6">
              <div className="col-span-2 text-sm font-medium text-gray-500">TIME</div>
              <div className="col-span-3 text-sm font-medium text-gray-500">MEETING DETAILS</div>
              <div className="col-span-2 text-sm font-medium text-gray-500">LOCATION</div>
              <div className="col-span-2 text-sm font-medium text-gray-500">PARTICIPANTS</div>
              <div className="col-span-2 text-sm font-medium text-gray-500">STATUS</div>
              <div className="col-span-1 text-sm font-medium text-gray-500">ACTIONS</div>
            </div>
            
            <div className="space-y-4 lg:space-y-2">
              {group.bookings.map((booking, index) => (
                <div 
                  key={index} 
                  className="p-4 lg:p-6 flex flex-col lg:grid lg:grid-cols-12 lg:gap-4 justify-between border border-gray-200 rounded-xl lg:rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-300 w-full"
                >
                  <div className="lg:hidden flex items-start justify-between w-full mb-3">
                    <div className="flex items-center">
                      <div className="text-center text-red-500 font-bold mr-4">
                        <p className="text-xs sm:text-sm uppercase">{booking.day}</p>
                        <p className="text-2xl sm:text-3xl">{booking.date}</p>
                      </div>
                      <div>
                        <p className="text-sm sm:text-base text-gray-700 flex items-center gap-2">
                          <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" /> 
                          {booking.time}
                        </p>
                      </div>
                    </div>
                    <button 
                      className="lg:hidden p-1 rounded-full hover:bg-gray-100"
                      onClick={() => setMenuOpen(menuOpen === `${groupIndex}-${index}` ? null : `${groupIndex}-${index}`)}
                    >
                      <MoreVertical className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                  
                  <div className="hidden lg:flex lg:col-span-2 items-center">
                    <div className="text-gray-700 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" /> 
                      <span className="text-sm">{booking.time}</span>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-3 items-center">
                    <p className="font-semibold text-lg sm:text-xl lg:text-base text-gray-700 mb-1 lg:mb-0 items-center">
                      {booking?.title}
                    </p>
                    <p className="lg:hidden text-sm text-gray-600 mt-1 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" /> {booking.location}
                    </p>
                  </div>
                  
                  <div className="hidden lg:flex lg:col-span-2 items-center">
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin className="w-4 h-4 mr-2" /> {booking.location}
                    </p>
                  </div>
                  
                  <div className="hidden lg:flex lg:col-span-2 items-center">
                    <div className="flex items-center">
                      <AvatarGroup spacing={24} max={4}>
                        {booking.avatars.map((avatar, i) => (
                          <Avatar 
                            key={i} 
                            alt={`Avatar ${i + 1}`} 
                            src={avatar} 
                            sx={{ width: 32, height: 32 }}
                          />
                        ))}
                      </AvatarGroup>
                      <span className="text-sm text-gray-600 ml-2">
                        {booking.participants} people
                      </span>
                    </div>
                  </div>

                  {/* Status Badge - Desktop */}
                  <div className="hidden lg:flex lg:col-span-2 items-center">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>

                  {/* Mobile Participants & Status Section */}
                  <div className="lg:hidden flex items-center justify-between mt-3">
                    <AvatarGroup spacing={24} max={2}>
                      {booking.avatars.map((avatar, i) => (
                        <Avatar 
                          key={i} 
                          alt={`Avatar ${i + 1}`} 
                          src={avatar} 
                          sx={{ 
                            width: 32, 
                            height: 32,
                            '@media (min-width: 640px)': {
                              width: 40,
                              height: 40
                            }
                          }}
                        />
                      ))}
                    </AvatarGroup>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                  
                  <div className="hidden lg:flex lg:col-span-1 items-center justify-end">
                    <div className="relative">
                      <button
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors duration-200"
                        onClick={() => setMenuOpen(menuOpen === `${groupIndex}-${index}` ? null : `${groupIndex}-${index}`)}
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      
                      {menuOpen === `${groupIndex}-${index}` && (
                        <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 z-50">
                                                 
                          <button className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                            <Clock className="w-4 h-4 mr-2" /> Reschedule booking
                          </button>
                          
                          <button className="w-full flex items-center px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors duration-200" onClick={() => handleDeleteClick(booking.id)}>
                            Cancel Appointment
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {menuOpen === `${groupIndex}-${index}` && (
                    <div className="lg:hidden mt-3 bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                      <button 
                        className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => handleStatusClick(booking.id, booking.status)}
                      >
                        <BadgeCheck  className="w-4 h-4 mr-2" /> Update Status
                      </button>
                      <button className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                        <Clock className="w-4 h-4 mr-2" /> Reschedule
                      </button>
                      
                      <button className="w-full flex items-center px-4 py-3 text-sm text-red-500 hover:bg-red-100 transition-colors duration-200" onClick={() => handleDeleteClick(booking.id)}>
                        Cancel event
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Empty state when no bookings */}
        {filteredBookings.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-1">No appointments found</h3>
            <p className="text-gray-500">
              {statusFilter !== "All" ? `No ${statusFilter.toLowerCase()} appointments found. Try changing your filter.` : "You don't have any upcoming appointments."}
            </p>
          </div>
        )}
      </div>

      {/* Cancel Appointment Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                    <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                      Cancel Appointment
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to cancel this appointment? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={handleDeleteAppointment}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Cancel Appointment
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Keep Appointment
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      {/* Update Status Dialog */}
      <Dialog open={statusDialogOpen} onClose={() => setStatusDialogOpen(false)} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                 
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                      Update Appointment Status
                    </DialogTitle>
                    <div className="mt-4">
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <select
                        id="status"
                        name="status"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                      >
                        {validStatuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={handleStatusChange}
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 sm:ml-3 sm:w-auto"
                >
                  Update Status
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setStatusDialogOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      {/* Filter Dialog */}
      <Dialog open={filterDialogOpen} onClose={() => setFilterDialogOpen(false)} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:size-10">
                    <Filter aria-hidden="true" className="size-6 text-blue-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                      Filter Appointments
                    </DialogTitle>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700">
                          Status
                        </label>
                        <select
                          id="status-filter"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                        >
                          <option value="All">All Statuses</option>
                          {validStatuses.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Sort By
                        </label>
                        <div className="mt-1 flex space-x-2">
                          <button
                            className={`px-3 py-1 text-sm rounded-md ${sortField === "date" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}
                            onClick={() => setSortField("date")}
                          >
                            Date
                          </button>
                          <button
                            className={`px-3 py-1 text-sm rounded-md ${sortField === "status" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}
                            onClick={() => setSortField("status")}
                          >
                            Status
                          </button>
                          <button
                            className={`px-3 py-1 text-sm rounded-md ${sortField === "title" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}
                            onClick={() => setSortField("title")}
                          >
                            Title
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Sort Direction
                        </label>
                        <div className="mt-1 flex space-x-2">
                          <button
                            className={`px-3 py-1 text-sm rounded-md ${sortDirection === "asc" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}
                            onClick={() => setSortDirection("asc")}
                          >
                            Ascending
                          </button>
                          <button
                            className={`px-3 py-1 text-sm rounded-md ${sortDirection === "desc" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}
                            onClick={() => setSortDirection("desc")}
                          >
                            Descending
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => {
                    applyFiltersAndSort();
                    setFilterDialogOpen(false);
                  }}
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 sm:ml-3 sm:w-auto"
                >
                  Apply Filters
                </button>
                <button
                  type="button"
                  onClick={() => setFilterDialogOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}