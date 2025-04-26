import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { host } from '../host.js';
import axios from "axios";
import AuthStore from '../hooks/authStore.js';
import { toast } from 'react-toastify';
import { 
  FaMapMarkerAlt, 
  FaUser, 
  FaClock, 
  FaHospital, 
  FaComment,
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle
} from 'react-icons/fa';

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [users, setUsers] = useState([]);
  const { id } = useParams();
  
  // Schedule state
  const [selectedDay, setSelectedDay] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [purpose, setPurpose] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
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

  useEffect(() => {
    const fetchDoctorData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${host}/api/doctors/getselecteddoc/${id}`);
        setDoctor(response.data.doctor);
        
        // Get reviews
        const reviewResponse = await axios.get(`${host}/api/doctors/getthreereviews/${id}`);
        if (reviewResponse.data.success) {
          setReviews(reviewResponse.data.reviews);
          if (reviewResponse.data.reviews.length > 0) {
            const avg = reviewResponse.data.reviews.reduce((sum, review) => sum + review.rating, 0) / 
                      reviewResponse.data.reviews.length;
            setAverageRating(avg.toFixed(1));
          }
          setTotalReviews(reviewResponse.data.reviews.length);
        }
        
        // Get users for review avatars
        const usersResponse = await axios.get(`${host}/api/auth/getall`);
        setUsers(usersResponse.data.user);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, [id]);

  // Appointment functions
  const filterSlotsByDay = (day) => {
    const fullDayName = dayMap[day];
    return doctor?.freeslots
      ?.filter((slot) => slot.day.toLowerCase() === fullDayName.toLowerCase())
      .map((slot) => ({
        display: `${slot.time} (${slot.status})`,
        time: slot.time,
        status: slot.status,
        slotId: slot._id, 
      })) || [];
  };

  const getAppointmentDate = (selectedDay) => {
    const today = new Date();
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'];
    const currentDayIndex = today.getDay();
    const targetDayIndex = daysOfWeek.indexOf(selectedDay);
    
    let daysToAdd = targetDayIndex - currentDayIndex;
    if (daysToAdd < 0) daysToAdd += 7;
    
    const appointmentDate = new Date(today);
    appointmentDate.setDate(today.getDate() + daysToAdd);
    return appointmentDate.toISOString().split("T")[0];
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setSlots(filterSlotsByDay(day));
    setSelectedSlot(null);
  };

  const handleSlotClick = (slot) => {
    const user = AuthStore.getUser();
    if (!user || !user.userid) {
      toast.error("Please sign in to book an appointment");
      navigate('/login');
      return;
    }
    setSelectedSlot(slot);
  };

  const handleCreateAppointment = async () => {
    if (!selectedSlot || !purpose || !selectedDay) {
      toast.error("Please select a day, slot, and provide a purpose.");
      return;
    }

    const user = AuthStore.getUser();
    if (!user || !user.userid) {
      toast.error("Please sign in to book an appointment");
      navigate('/login');
      return;
    }

    setBookingLoading(true);
    try {
      const appointmentDate = getAppointmentDate(selectedDay);
      
      // Create appointment
      await axios.post(`${host}/api/appointment/createappointment`, {
        user: user.userid,
        doctor: id,
        date: appointmentDate,
        purpose,
        time: selectedSlot.time,
      });

      // Update slot status
      await axios.put(`${host}/api/doctors/updatedocdetails/${id}`, {
        slotId: selectedSlot.slotId,
        status: "booked",
      });

      // Update UI
      setSlots(slots.map(slot => 
        slot.slotId === selectedSlot.slotId
          ? { ...slot, status: "booked", display: `${slot.time} (booked)` }
          : slot
      ));

      toast.success("Appointment booked successfully!");
      setSelectedSlot(null);
      setPurpose("");
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error(error.response?.data?.message || "Failed to book appointment");
    } finally {
      setBookingLoading(false);
    }
  };

  // Helper function to render stars
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
    }

    return stars;
  };

  // Get specializations as array
  const getSpecializations = () => {
    if (!doctor?.specialization) return [];
    return typeof doctor.specialization === 'string' 
      ? doctor.specialization.split(',').map(s => s.trim())
      : [];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-3 text-blue-600 font-medium">Loading</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-3 py-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header - Minimalist design */}
        <div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden transition-all duration-300 hover:shadow-md">
          <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-100 p-1">
                <img
                  src={doctor?.image || "https://png.pngtree.com/png-clipart/20231002/original/pngtree-young-afro-professional-doctor-png-image_13227671.png"}
                  alt={doctor?.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border border-white">
                <FaCheckCircle className="text-white text-xs" />
              </div>
            </div>
            
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                Dr. {doctor?.name}
              </h1>
              <p className="text-gray-500 text-sm">{doctor?.specialization}</p>
              
              <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
                <div className="bg-gray-100 rounded-full px-2 py-1 flex items-center text-xs">
                  <FaStar className="text-yellow-500 mr-1" />
                  <span className="text-gray-800">{doctor?.rating}/5</span>
                </div>
                
                <div className="bg-gray-100 rounded-full px-2 py-1 flex items-center text-xs">
                  <FaClock className="text-gray-500 mr-1" />
                  <span className="text-gray-800">{doctor?.experience} years</span>
                </div>
                
                {doctor?.hospital && (
                  <div className="bg-gray-100 rounded-full px-2 py-1 flex items-center text-xs">
                    <FaMapMarkerAlt className="text-gray-500 mr-1" />
                    <span className="text-gray-800 truncate max-w-[120px]">{doctor.hospital.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Specializations Pills */}
        <div className="flex flex-wrap gap-2 mb-4 justify-center sm:justify-start">
          {getSpecializations().map((spec, index) => (
            <span 
              key={index} 
              className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full"
            >
              {spec}
            </span>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-4">
            {/* About Doctor */}
            <div className="bg-white rounded-xl shadow-sm p-4 transition-all duration-300 hover:shadow-md">
              <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                <FaUser className="text-blue-500 mr-2" size={16} />
                About Doctor
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {doctor?.description || "No description available."}
              </p>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center mb-2">
                    <FaClock className="text-blue-500 mr-2" size={12} />
                    <span className="font-medium text-gray-700 text-xs">Experience</span>
                  </div>
                  <p className="text-lg font-bold text-gray-800">{doctor?.experience} years</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center mb-2">
                    <FaHospital className="text-blue-500 mr-2" size={12} />
                    <span className="font-medium text-gray-700 text-xs">Hospital</span>
                  </div>
                  <p className="text-sm font-medium text-gray-800 truncate">{doctor?.hospital?.name || "Not specified"}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center mb-2">
                    <FaMoneyBillWave className="text-blue-500 mr-2" size={12} />
                    <span className="font-medium text-gray-700 text-xs">Fee</span>
                  </div>
                  <p className="text-lg font-bold text-green-600">₹{doctor?.consultationFee || "300"}</p>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-xl shadow-sm p-4 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <FaComment className="text-blue-500 mr-2" size={16} />
                  <h2 className="text-lg font-bold text-gray-800">Reviews</h2>
                </div>
                
                <div className="flex items-center bg-gray-50 px-2 py-1 rounded-full text-xs">
                  <div className="flex mr-1">
                    {renderStars(parseFloat(averageRating))}
                  </div>
                  <p className="font-bold text-gray-800">{averageRating}</p>
                  <span className="mx-1 text-gray-400">•</span>
                  <p className="text-blue-600">{totalReviews}</p>
                </div>
              </div>

              {reviews.length === 0 ? (
                <div className="text-center py-6 text-gray-500 text-sm">
                  <FaComment className="text-gray-300 text-3xl mx-auto mb-2" />
                  <p>No reviews yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {reviews.map((review) => (
                    <div key={review._id} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-500 flex-shrink-0 flex items-center justify-center text-sm font-semibold">
                          {review.user?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h3 className="font-medium text-sm text-gray-800 truncate">{review.user?.name || 'Anonymous'}</h3>
                            <div className="flex">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 line-clamp-2">{review.review || 'No review text provided'}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Section: Appointment Booking */}
          <div>
            <div className="bg-white rounded-xl shadow-sm p-4 lg:sticky lg:top-4 transition-all duration-300 hover:shadow-md">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <FaCalendarAlt className="text-blue-500 mr-2" size={16} />
                Book Appointment
              </h2>
              
              {/* Day Selection */}
              <label className="text-xs font-medium text-gray-600 mb-1 block">Select Day</label>
              <div className="flex flex-wrap gap-1 mb-4">
                {Object.keys(dayMap).map((day) => (
                  <button
                    key={day}
                    className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                      selectedDay === day
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => handleDayClick(day)}
                  >
                    {day}
                  </button>
                ))}
              </div>
              
              {/* Available Slots */}
              {selectedDay && (
                <div className="mb-4">
                  <div className="text-xs font-medium text-gray-600 mb-1 flex items-center">
                    <FaClock className="text-blue-500 mr-1" size={10} />
                    {selectedDay} - {getAppointmentDate(selectedDay)}
                  </div>
                  
                  {slots.length > 0 ? (
                    <div className="grid grid-cols-3 gap-1">
                      {slots.map((slot, index) => (
                        <button
                          key={index}
                          className={`py-1 px-2 rounded text-xs font-medium transition-all relative ${
                            selectedSlot?.slotId === slot.slotId
                              ? "bg-blue-500 text-white"
                              : slot.status === "booked"
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                          onClick={() => slot.status === "available" && handleSlotClick(slot)}
                          disabled={slot.status === "booked"}
                        >
                          {slot.time}
                          {slot.status === "booked" && (
                            <span className="absolute top-0 right-0 text-xs text-red-500">
                              <FaTimesCircle size={8} />
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 bg-gray-50 rounded text-xs">
                      <FaCalendarAlt className="text-gray-300 text-lg mx-auto mb-1" />
                      <p className="text-gray-500">No slots available</p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Purpose Input */}
              {selectedSlot && (
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Purpose of Visit</label>
                  <div className="relative mb-3">
                    <textarea
                      placeholder="Describe your medical concern"
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      className="w-full p-2 pl-7 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50 text-gray-700"
                      rows="2"
                    ></textarea>
                    <div className="absolute top-2 left-2 text-blue-500">
                      <FaComment size={12} />
                    </div>
                  </div>
                  
                  <button
                    onClick={handleCreateAppointment}
                    disabled={bookingLoading}
                    className={`w-full py-2 rounded font-medium text-sm text-white transition-all ${
                      bookingLoading
                        ? "bg-gray-400"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    {bookingLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 border border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing
                      </div>
                    ) : (
                      "Book Appointment"
                    )}
                  </button>
                </div>
              )}
              
              {/* Practice Details */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h3 className="font-medium text-sm text-gray-800 mb-2">Practice Information</h3>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-gray-600 flex items-center">
                      <FaMoneyBillWave className="text-blue-500 mr-1" size={10} />
                      Consultation Fee
                    </span>
                    <span className="font-bold text-blue-600">₹{doctor?.consultationFee || "300"}</span>
                  </li>
                  <li className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-gray-600 flex items-center">
                      <FaClock className="text-blue-500 mr-1" size={10} />
                      Practice Hours
                    </span>
                    <span className="font-medium text-gray-800">9:00 AM - 5:00 PM</span>
                  </li>
                  <li className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-gray-600 flex items-center">
                      <FaCalendarAlt className="text-blue-500 mr-1" size={10} />
                      Available Days
                    </span>
                    <span className="font-medium text-gray-800 truncate max-w-[120px]">
                      {Object.keys(dayMap).filter(day => 
                        doctor?.freeslots?.some(slot => 
                          slot.day.toLowerCase() === dayMap[day].toLowerCase() && 
                          slot.status === "available"
                        )
                      ).join(", ") || "None"}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;