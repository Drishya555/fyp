// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import {host} from '../host.js';
// const DoctorProfile = () => {
//   const [, setDoctor] = useState([]);
//   const {id} = useParams();

//   useEffect(() => {
//     // Fetch doctor data from API
//     fetch(`${host}/api/doctors/getselecteddoc/${id}`)
//       .then((response) => response.json())
//       .then((data) => setDoctor(data));
//   }, []);



//   return (
//     <div className="min-h-screen bg-gray-100 p-4 md:p-8">
//       {/* Main Container */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left Section: Doctor Info */}
//         <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
//           {/* Doctor Header */}
//           <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
//             <img
//               src="https://png.pngtree.com/png-clipart/20231002/original/pngtree-young-afro-professional-doctor-png-image_13227671.png"
//               alt="Doctor"
//               className="w-24 h-24 rounded-full"
//             />
//             <div className="text-center md:text-left">
//               <h1 className="text-2xl font-bold text-gray-800">
//                 Rayna Westervelt M.Psi
//               </h1>
//               <p className="text-sm text-gray-500">ENT Doctor</p>
//               <p className="text-sm text-gray-500">
//                 Siloam Hospitals, West Bekasi, Bekasi
//               </p>
//               <div className="flex gap-2 mt-2 justify-center md:justify-start">
//                 <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
//                   Full-time
//                 </span>
//                 <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
//                   250K - 350K
//                 </span>
//                 <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
//                   94%
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Doctor Description */}
//           <div className="mt-6">
//             <h2 className="text-lg font-semibold text-gray-800">
//               Doctor Profile
//             </h2>
//             <p className="text-gray-600 mt-2">
//               With a seasoned career spanning four years, our ENT specialist
//               brings a wealth of experience and expertise to the field. Having
//               dedicated their professional journey to ear, nose, and throat care,
//               they have honed their skills in diagnosing and treating a wide
//               range of ENT conditions. Their commitment to staying abreast of the
//               latest advancements in the field ensures that patients receive
//               cutting-edge care.
//             </p>
//             <a href="#" className="text-blue-600 mt-2 inline-block">
//               More →
//             </a>
//           </div>

//           {/* Practice Experience */}
//           <div className="mt-6">
//             <h2 className="text-lg font-semibold text-gray-800">
//               Practice Experience
//             </h2>
//             <ul className="mt-2 space-y-4">
//               <li className="flex items-start gap-3">
//                 <img
//                   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6EYlFuMb3pGni74Aa2zM9vSOBstsqEfWwNg&s"
//                   alt="Hospital Logo"
//                   className="w-10 h-10"
//                 />
//                 <div>
//                   <p className="text-gray-800 font-medium">
//                     Siloam Hospitals Bekasi Timur
//                   </p>
//                   <p className="text-gray-600 text-sm">
//                     ENT Doctor • Neurology • Online Consultation
//                   </p>
//                   <p className="text-gray-500 text-sm">
//                     Dec 2022 - Present • 1 yrs 1 mos
//                   </p>
//                   <p className="text-gray-500 text-sm">
//                     Margahayu, Kec. Bekasi Timur, West Java
//                   </p>
//                 </div>
//               </li>
//               <li className="flex items-start gap-3">
//                 <img
//                   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9DzkpdrFD8NrUwada9ezpgwJn6QhkMI-pJQ&s"
//                   alt="Hospital Logo"
//                   className="w-10 h-10"
//                 />
//                 <div>
//                   <p className="text-gray-800 font-medium">
//                     Mitra Keluarga Pratama Jatiasih
//                   </p>
//                   <p className="text-gray-600 text-sm">
//                     ENT Doctor • Otology • Fulltime
//                   </p>
//                   <p className="text-gray-500 text-sm">
//                     Dec 2021 - Nov 2022 • 1 yrs 0 mos
//                   </p>
//                   <p className="text-gray-500 text-sm">
//                     Jatimekar, Kec. Jatiasih, West Java
//                   </p>
//                 </div>
//               </li>
//               <li className="flex items-start gap-3">
//                 <img
//                   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQggnc_Xiee3x6TkGBi7GXcNf1aONOh1mtKmA&s"
//                   alt="Hospital Logo"
//                   className="w-10 h-10"
//                 />
//                 <div>
//                   <p className="text-gray-800 font-medium">
//                     RS Ananda Bekasi
//                   </p>
//                   <p className="text-gray-600 text-sm">
//                     ENT Doctor • Otology • Fulltime
//                   </p>
//                   <p className="text-gray-500 text-sm">
//                     Feb 2019 - Oct 2021 • 2 yrs 8 mos
//                   </p>
//                   <p className="text-gray-500 text-sm">
//                     Medan Satria, Kec. Medan Satria, Bekasi City
//                   </p>
//                 </div>
//               </li>
//             </ul>
//           </div>

//           {/* Doctor Review */}
//           <div className="mt-6">
//             <h2 className="text-lg font-semibold text-gray-800">
//               Doctor Review
//             </h2>
//             <div className="flex items-center gap-3 mt-2">
//               <img
//                 src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&q=80"
//                 alt="Reviewer"
//                 className="w-10 h-10 rounded-full"
//               />
//               <div>
//                 <p className="text-gray-800 font-medium">Makenna Scheffler</p>
//                 <p className="text-gray-500 text-sm">20 January 2024 • 05:54</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Section: Medical Actions & Articles */}
//         <div className="space-y-6">
//           {/* Medical Actions */}
//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <h2 className="text-lg font-semibold text-gray-800">
//               Medical Actions
//             </h2>
//             <ul className="mt-2 space-y-2 text-gray-600">
//               <li>Brainstem Evoked Response Audiometry (BERA)</li>
//               <li>ENT Surgery</li>
//               <li>ENT Consultation</li>
//               <li>Ear Endoscopy</li>
//               <li>Ear Cleaning</li>
//               <li>Tympanoplasty</li>
//               <li>Hearing Test</li>
//             </ul>
//             <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
//               Make Appointments
//             </button>
//           </div>

//           {/* Download App */}
//           <div className="bg-white rounded-lg shadow-lg p-6 text-center">
//             <h2 className="text-lg font-semibold text-gray-800">
//               Download now to start your research
//             </h2>
//             <div className="flex justify-center gap-3 mt-4">
//               <img
//                 src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=40&q=80"
//                 alt="App Store"
//                 className="h-10"
//               />
//               <img
//                 src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=40&q=80"
//                 alt="Google Play"
//                 className="h-10"
//               />
//             </div>
//           </div>

//           {/* Articles */}
//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <h2 className="text-lg font-semibold text-gray-800">Health</h2>
//             <ul className="mt-2 space-y-4">
//               <li className="flex items-start gap-3">
//                 <img
//                   src="https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60&q=80"
//                   alt="Article"
//                   className="w-16 h-16 rounded"
//                 />
//                 <div>
//                   <p className="text-gray-800 font-medium">
//                     The Impact of Nutrition on Mental Health
//                   </p>
//                   <p className="text-gray-500 text-sm">January 7, 2024</p>
//                   <a href="#" className="text-blue-600 text-sm">
//                     Read more →
//                   </a>
//                 </div>
//               </li>
//               <li className="flex items-start gap-3">
//                 <img
//                   src="https://images.unsplash.com/photo-1576765607924-3f7b8410f1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60&q=80"
//                   alt="Article"
//                   className="w-16 h-16 rounded"
//                 />
//                 <div>
//                   <p className="text-gray-800 font-medium">
//                     Baby Crying During Sleep: 6 Causes and Remedies
//                   </p>
//                   <p className="text-gray-500 text-sm">January 7, 2024</p>
//                   <a href="#" className="text-blue-600 text-sm">
//                     Read more →
//                   </a>
//                 </div>
//               </li>
//               <li className="flex items-start gap-3">
//                 <img
//                   src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60&q=80"
//                   alt="Article"
//                   className="w-16 h-16 rounded"
//                 />
//                 <div>
//                   <p className="text-gray-800 font-medium">
//                     Identifying Non-Harmful Characteristics of Lumps in the Armpit
//                   </p>
//                   <p className="text-gray-500 text-sm">January 7, 2024</p>
//                   <a href="#" className="text-blue-600 text-sm">
//                     Read more →
//                   </a>
//                 </div>
//               </li>
//             </ul>
//             <a href="#" className="text-blue-600 mt-4 inline-block">
//               See All
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorProfile;


















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
import { HiOutlineLocationMarker, HiOutlineCalendar } from 'react-icons/hi';
import { BsBriefcaseFill } from 'react-icons/bs';

const DoctorProfile = () => {

  // eslint-disable-next-line no-unused-vars
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    // Fetch doctor data from API
    setLoading(true);
    fetch(`${host}/api/doctors/getselecteddoc/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setDoctor(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching doctor data:", error);
        setLoading(false);
      });
  }, [id]);

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
                      Dr. Carlos Sainz
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
                With a seasoned career spanning four years, our ENT specialist
                brings a wealth of experience and expertise to the field. Having
                dedicated their professional journey to ear, nose, and throat care,
                they have honed their skills in diagnosing and treating a wide
                range of ENT conditions. Their commitment to staying abreast of the
                latest advancements in the field ensures that patients receive
                cutting-edge care.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center p-3 rounded-lg bg-blue-50">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <FaClock className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="font-semibold text-gray-800">4+ Years</p>
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
                    <p className="font-semibold text-gray-800">4.7 out of 5</p>
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
                <h2 className="text-xl font-bold text-gray-800">Practice Experience</h2>
              </div>
              <div className="space-y-6">
                {/* Timeline Item */}
                <div className="relative pl-8 pb-6 border-l-2 border-blue-200">
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-blue-600"></div>
                  <div className="flex flex-col md:flex-row md:items-center mb-2">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6EYlFuMb3pGni74Aa2zM9vSOBstsqEfWwNg&s"
                      alt="Hospital Logo"
                      className="w-12 h-12 rounded-lg object-cover border border-gray-200 md:mr-4"
                    />
                    <div className="mt-3 md:mt-0">
                      <h3 className="font-bold text-gray-800">Siloam Hospitals Bekasi Timur</h3>
                      <p className="text-blue-600 font-medium">ENT Doctor • Neurology • Online Consultation</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm mb-1">
                    <HiOutlineCalendar className="w-4 h-4 mr-1" />
                    Dec 2022 - Present • 1 yrs 1 mos
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <HiOutlineLocationMarker className="w-4 h-4 mr-1" />
                    Margahayu, Kec. Bekasi Timur, West Java
                  </div>
                </div>

                {/* Timeline Item */}
                <div className="relative pl-8 pb-6 border-l-2 border-blue-200">
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-blue-400"></div>
                  <div className="flex flex-col md:flex-row md:items-center mb-2">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9DzkpdrFD8NrUwada9ezpgwJn6QhkMI-pJQ&s"
                      alt="Hospital Logo"
                      className="w-12 h-12 rounded-lg object-cover border border-gray-200 md:mr-4"
                    />
                    <div className="mt-3 md:mt-0">
                      <h3 className="font-bold text-gray-800">Mitra Keluarga Pratama Jatiasih</h3>
                      <p className="text-blue-600 font-medium">ENT Doctor • Otology • Fulltime</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm mb-1">
                    <HiOutlineCalendar className="w-4 h-4 mr-1" />
                    Dec 2021 - Nov 2022 • 1 yrs 0 mos
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <HiOutlineLocationMarker className="w-4 h-4 mr-1" />
                    Jatimekar, Kec. Jatiasih, West Java
                  </div>
                </div>

                {/* Timeline Item */}
                <div className="relative pl-8">
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-blue-300"></div>
                  <div className="flex flex-col md:flex-row md:items-center mb-2">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQggnc_Xiee3x6TkGBi7GXcNf1aONOh1mtKmA&s"
                      alt="Hospital Logo"
                      className="w-12 h-12 rounded-lg object-cover border border-gray-200 md:mr-4"
                    />
                    <div className="mt-3 md:mt-0">
                      <h3 className="font-bold text-gray-800">RS Ananda Bekasi</h3>
                      <p className="text-blue-600 font-medium">ENT Doctor • Otology • Fulltime</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm mb-1">
                    <HiOutlineCalendar className="w-4 h-4 mr-1" />
                    Feb 2019 - Oct 2021 • 2 yrs 8 mos
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <HiOutlineLocationMarker className="w-4 h-4 mr-1" />
                    Medan Satria, Kec. Medan Satria, Bekasi City
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
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                  </div>
                  <p className="font-bold text-gray-800">4.8</p>
                  <span className="mx-2 text-gray-500">•</span>
                  <p className="text-blue-600">213 reviews</p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 mb-4">
                <div className="flex items-start gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&q=80"
                    alt="Reviewer"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-bold text-gray-800">Makenna Scheffler</h3>
                      <div className="flex">
                        <FaStar className="text-yellow-400" />
                        <FaStar className="text-yellow-400" />
                        <FaStar className="text-yellow-400" />
                        <FaStar className="text-yellow-400" />
                        <FaStar className="text-yellow-400" />
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm mb-2">October 15, 2023</p>
                    <p className="text-gray-700">
                      Dr. Rayna is absolutely wonderful! She took the time to listen to all my concerns and explained everything in detail. The treatment plan she suggested worked perfectly for my sinus issues.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 mb-4">
                <div className="flex items-start gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&q=80"
                    alt="Reviewer"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-bold text-gray-800">James Rodriguez</h3>
                      <div className="flex">
                        <FaStar className="text-yellow-400" />
                        <FaStar className="text-yellow-400" />
                        <FaStar className="text-yellow-400" />
                        <FaStar className="text-yellow-400" />
                        <FaStarHalfAlt className="text-yellow-400" />
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm mb-2">September 28, 2023</p>
                    <p className="text-gray-700">
                      Very professional and knowledgeable doctor. The only reason I&apos;m not giving 5 stars is because the wait time was a bit long. But the consultation itself was excellent.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-start gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&q=80"
                    alt="Reviewer"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-bold text-gray-800">Sarah Johnson</h3>
                      <div className="flex">
                        <FaStar className="text-yellow-400" />
                        <FaStar className="text-yellow-400" />
                        <FaStar className="text-yellow-400" />
                        <FaStar className="text-yellow-400" />
                        <FaRegStar className="text-yellow-400" />
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm mb-2">August 5, 2023</p>
                    <p className="text-gray-700">
                      Dr. Rayna helped me with my chronic ear infection that other doctors couldn&apos;t resolve. Her approach was different and effective. The clinic staff was also very helpful.
                    </p>
                  </div>
                </div>
              </div>

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