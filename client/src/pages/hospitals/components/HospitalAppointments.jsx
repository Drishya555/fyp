import { useState, useEffect} from "react";
import { Clock, MapPin, Users, MoreVertical } from "lucide-react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import axios from 'axios';
import Authstore from '../../../hooks/authStore.js'
import { host } from '../../../host.js';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'


export default function Bookings() {

  const userid = Authstore.getUser()?.userid || null;

  const [menuOpen, setMenuOpen] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);


  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `${host}/api/appointment/getappointmentbydoctor/${userid}`
        );

        if (response.data.success) {
          const formattedBookings = response.data.appointments.map((appointment) => ({
            id: appointment._id,
            day: new Date(appointment.date).toLocaleDateString("en-US", { weekday: "short" }),
            date: new Date(appointment.date).getDate(),
            time: new Date(appointment.time).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
            title: `Appointment with Patient: ${appointment?.user?.name}`,
            avatars: [`${appointment?.user?.image}`,`${appointment?.doctor?.image}`],
            location: "Doctor's Office",
            participants: 2, 
            status: appointment.status,
          }));

          setBookings(formattedBookings);

        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedBookingId(id);
    setOpen(true);
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

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 lg:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">Bookings</h1>
            <p className="text-sm sm:text-base text-gray-600">
              See your scheduled events from your calendar events links.
            </p>
          </div>
          <div className="mt-4 lg:mt-0 flex space-x-3">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
              Filter
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
              New Booking
            </button>
          </div>
        </div>
        
        <div className="hidden lg:grid grid-cols-12 gap-4 mb-3 px-6">
          <div className="col-span-2 text-sm font-medium text-gray-500">DATE & TIME</div>
          <div className="col-span-4 text-sm font-medium text-gray-500">MEETING DETAILS</div>
          <div className="col-span-3 text-sm font-medium text-gray-500">LOCATION</div>
          <div className="col-span-2 text-sm font-medium text-gray-500">PARTICIPANTS</div>
          <div className="col-span-1 text-sm font-medium text-gray-500">ACTIONS</div>
        </div>
        
        <div className="space-y-4 lg:space-y-2">
          {bookings.map((booking, index) => (
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
                  onClick={() => setMenuOpen(menuOpen === index ? null : index)}
                >
                  <MoreVertical className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="hidden lg:flex lg:col-span-2 items-center">
                <div className="text-center text-red-500 font-bold mr-4 min-w-[60px]">
                  <p className="text-sm uppercase">{booking.day}</p>
                  <p className="text-2xl">{booking.date}</p>
                </div>
                <div className="text-gray-700 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" /> 
                  <span className="text-sm">{booking.time}</span>
                </div>
              </div>
              
              <div className="lg:col-span-4 items-center">
                <p className="font-semibold text-lg sm:text-xl lg:text-base text-gray-700 mb-1 lg:mb-0 items-center">
                  {booking?.title}
                </p>
                <p className="lg:hidden text-sm text-gray-600 mt-1 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" /> {booking.location}
                </p>
              </div>
              
              <div className="hidden lg:flex lg:col-span-3 items-center">
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
              </div>
              
              <div className="hidden lg:flex lg:col-span-1 items-center justify-end">
                <div className="relative">
                  <button
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors duration-200"
                    onClick={() => setMenuOpen(menuOpen === index ? null : index)}
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                  
                  {menuOpen === index && (
                    <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 z-50">
                      <button className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                        <Clock className="w-4 h-4 mr-2" /> Reschedule booking
                      </button>
                      
                      <button className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                        <Users className="w-4 h-4 mr-2" /> Invite people
                      </button>
                      
                      <button className="w-full flex items-center px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors duration-200" onClick={() => handleDeleteClick(booking.id)}>
                        Cancel Appointment
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              {menuOpen === index && (
                <div className="lg:hidden mt-3 bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                  <button className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                    <Clock className="w-4 h-4 mr-2" /> Reschedule
                  </button>
                  <button className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                    <Users className="w-4 h-4 mr-2" /> Invite people
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
    </div>
  );
}











































