import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { host } from '../host.js';
import { 
  FaMapMarkerAlt, 
  FaUser, 
  FaClock, 
  FaHospital, 
  FaShieldAlt,
  FaComment,
  FaStar,
  FaCalendarAlt,
  FaBriefcaseMedical,
  FaRegStar,
  FaStarHalfAlt
} from 'react-icons/fa';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { BsBriefcaseFill } from 'react-icons/bs';
import axios from "axios";

const DoctorProfile = () => {

  // eslint-disable-next-line no-unused-vars
  const [doctor, setDoctor] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`${host}/api/doctors/getselecteddoc/${id}`)
      .then((response) => {
        setDoctor(response.data.doctor); // assuming you want the actual doctor object
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching doctor data:", error);
        setLoading(false);
      });
  }, [id]);



  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user,setUser] = useState([]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${host}/api/doctors/getthreereviews/${id}`);
        const data = response.data;
        
        if (data.success) {
          setReviews(data.reviews);
          // Calculate average rating (you might want to get this from the backend instead)
          if (data.reviews.length > 0) {
            const avg = data.reviews.reduce((sum, review) => sum + review.rating, 0) / data.reviews.length;
            setAverageRating(avg.toFixed(1));
          }
          setTotalReviews(data.reviews.length);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        // You can access error response data if available
        if (error.response) {
          console.error('Error response data:', error.response.data);
        }
      } finally {
        setLoading(false);
      }
    };


    const fetchallusers = async () => {
      const res = await axios.get(`${host}/api/auth/getall`);
      setUser(res.data.user);
    }

    fetchReviews();
    fetchallusers();
  }, [id]);
  

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



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-blue-600 font-medium">Loading doctor profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 md:p-8">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto">
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-32 md:h-48"></div>
          <div className="px-6 pb-6 relative">
            <div className="flex flex-col md:flex-row">
              <div className="relative -top-16 md:-top-24 flex justify-center md:justify-start">
                <img
                  src="https://png.pngtree.com/png-clipart/20231002/original/pngtree-young-afro-professional-doctor-png-image_13227671.png"
                  alt="Doctor"
                  className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white shadow-lg object-cover bg-white"
                />
              </div>
              <div className="md:ml-6 -mt-8 md:mt-4 text-center md:text-left flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                      Dr. {doctor?.name}
                    </h1>
                    <p className="text-blue-600 font-medium">ENT Specialist</p>
                    <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
                      <FaMapMarkerAlt className="text-blue-500" />
                      <p className="text-gray-600">Mediciti Hospital</p>
                    </div>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full shadow-md transform transition hover:scale-105 mt-4 md:mt-0">
                    Book Appointment
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1.5 rounded-full">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mr-1"></span>
                    Full-time
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1.5 rounded-full">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mr-1"></span>
                    250K - 350K
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1.5 rounded-full">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                    94% Patient Satisfaction
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section: Doctor Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Doctor Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 transition-all hover:shadow-xl">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <FaUser className="text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Doctor Profile</h2>
              </div>
              <p className="text-gray-600">
                {doctor?.description || "No description available."}
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center p-3 rounded-lg bg-blue-50">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <FaClock className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="font-semibold text-gray-800">{doctor?.experience}</p>
                  </div>
                </div>
                <div className="flex items-center p-3 rounded-lg bg-blue-50">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <FaHospital className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Hospitals</p>
                    <p className="font-semibold text-gray-800">3 Practiced</p>
                  </div>
                </div>
                <div className="flex items-center p-3 rounded-lg bg-blue-50">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <FaShieldAlt className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Ratings</p>
                    <p className="font-semibold text-gray-800">{doctor?.rating} out of 5</p>
                  </div>
                </div>
              </div>
              <a href="#" className="inline-flex items-center text-blue-600 font-medium mt-6 hover:text-blue-800 transition-colors">
                View Full Profile 
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Practice Experience Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 transition-all hover:shadow-xl">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <BsBriefcaseFill className="text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Current Hospital</h2>
              </div>
              <div className="space-y-6">
                <div className="relative pl-8 pb-6 border-l-2 border-blue-200">
                  <div className="flex flex-col md:flex-row md:items-center mb-2">
                    <img
                      src={doctor?.hospital?.image}
                      alt="Hospital Logo"
                      className="w-12 h-12 rounded-lg object-cover border border-gray-200 md:mr-4"
                    />
                    <div className="mt-3 md:mt-0">
                      <h3 className="font-bold text-gray-800">{doctor?.hospital?.name}</h3>
                      <p className="text-blue-600 font-medium">ENT Doctor • Neurology • Online Consultation</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <HiOutlineLocationMarker className="w-4 h-4 mr-1" />
                    Margahayu, Kec. Bekasi Timur, West Java
                  </div>
                </div>

                
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 transition-all hover:shadow-xl">
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center">
      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
        <FaComment className="text-blue-600" />
      </div>
      <h2 className="text-xl font-bold text-gray-800">Patient Reviews</h2>
    </div>
    <div className="flex items-center">
      <div className="flex items-center mr-2">
        {renderStars(averageRating)}
      </div>
      <p className="font-bold text-gray-800">{averageRating}</p>
      <span className="mx-2 text-gray-500">•</span>
      <p className="text-blue-600">{totalReviews} reviews</p>
    </div>
  </div>

  {reviews.length === 0 ? (
    <div className="text-center py-4 text-gray-500">
      No reviews yet
    </div>
  ) : (
    reviews.map((review) => {
      // Find the user who wrote this review
      const reviewUser = user.find(user => user._id === review.user._id);
      const userImage = reviewUser?.image;

      return (
        <div key={review._id} className="bg-blue-50 rounded-xl p-4 mb-4">
          <div className="flex items-start gap-4">
            {userImage ? (
              <img
                src={userImage}
                alt={review.user?.name || 'User'}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                {review.user?.name?.charAt(0) || 'U'}
              </div>
            )}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-bold text-gray-800">
                  {review.user?.name || 'Anonymous'}
                </h3>
                <div className="flex">
                  {renderStars(review.rating)}
                </div>
              </div>
              
              <p className="text-gray-700">
                {review.review || 'No review text provided'}
              </p>
            </div>
          </div>
        </div>
      );
    })
  )}

  <button className="mt-6 w-full py-3 bg-white border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
    View All Reviews
  </button>
</div>
          </div>

          {/* Right Section: Appointment & Info */}
          <div className="space-y-6">
            {/* Appointment Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 top-6 transition-all hover:shadow-xl">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Book Appointment</h2>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Available Time Slots</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="py-2 px-3 bg-blue-100 text-blue-800 rounded-lg font-medium hover:bg-blue-200 transition-colors">
                    09:00 AM
                  </button>
                  <button className="py-2 px-3 bg-blue-100 text-blue-800 rounded-lg font-medium hover:bg-blue-200 transition-colors">
                    10:30 AM
                  </button>
                  <button className="py-2 px-3 bg-blue-100 text-blue-800 rounded-lg font-medium hover:bg-blue-200 transition-colors">
                    12:00 PM
                  </button>
                  <button className="py-2 px-3 bg-blue-100 text-blue-800 rounded-lg font-medium hover:bg-blue-200 transition-colors">
                    02:00 PM
                  </button>
                  <button className="py-2 px-3 bg-blue-100 text-blue-800 rounded-lg font-medium hover:bg-blue-200 transition-colors">
                    03:30 PM
                  </button>
                  <button className="py-2 px-3 bg-blue-100 text-blue-800 rounded-lg font-medium hover:bg-blue-200 transition-colors">
                    05:00 PM
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Consultation Fee</h3>
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-gray-500 text-sm">Regular Consultation</p>
                    <p className="font-bold text-gray-800">Rp 300.000</p>
                  </div>
                  <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                    View Details
                  </button>
                </div>
              </div>

              <button className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                Continue Booking
              </button>
            </div>

            {/* Contact & Location Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 transition-all hover:shadow-xl">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Contact & Location</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <HiOutlineLocationMarker className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Siloam Hospitals Bekasi Timur</h3>
                    <p className="text-gray-600">
                      Jl. MH. Thamrin No.1, Margahayu, Kec. Bekasi Timur, Kota Bks, Jawa Barat 17113
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <FaBriefcaseMedical className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Practice Hours</h3>
                    <div className="text-gray-600 space-y-1">
                      <p className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span>09:00 - 17:00</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Saturday</span>
                        <span>09:00 - 14:00</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Sunday</span>
                        <span>Closed</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <FaCalendarAlt className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Next Availability</h3>
                    <p className="text-gray-600">
                      Tomorrow, 09:00 AM - 10:30 AM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Specializations Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 transition-all hover:shadow-xl">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Specializations</h2>
              
              <div className="flex flex-wrap gap-3">
                <span className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium">
                  Otology
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium">
                  Rhinology
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium">
                  Laryngology
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium">
                  Head & Neck Surgery
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium">
                  Pediatric ENT
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium">
                  Allergy Treatment
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;