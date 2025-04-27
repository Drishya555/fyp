import { useParams, Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {host} from '../host.js'
import { useNavigate } from 'react-router-dom';
import AuthStore from '../hooks/authStore.js';
// Extended sample hospital data with more details
// const hospitalsData = [
//   {
//     id: 1,
//     name: "City General Hospital",
//     category: "Public",
//     location: "New York",
//     address: "123 Medical Drive, NY 10001",
//     rating: 4.5,
//     price: 90,
//     photo: "https://www.nepalmediciti.com/images/vBlogs/Nepal%20Mediciti.JPG",
//     description: "A leading public hospital providing comprehensive healthcare services with state-of-the-art facilities.",
//     services: ["Emergency Care", "Maternity", "Pediatrics", "Cardiology", "Oncology"],
//     doctors: [
//       { name: "Dr. Sarah Johnson", specialty: "Cardiology", experience: "15 years" },
//       { name: "Dr. Michael Chen", specialty: "Neurology", experience: "12 years" },
//     ],
//     openingHours: {
//       weekdays: "8:00 AM - 8:00 PM",
//       weekends: "9:00 AM - 5:00 PM",
//       emergency: "24/7"
//     },
//     contact: {
//       phone: "+1 (212) 555-1000",
//       email: "info@citygeneral.org"
//     }
//   },
//   // ... other hospitals
// ];

const token = AuthStore.getToken();

const HospitalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const hospital = hospitalsData.find(h => h.id === parseInt(id));

  const [hospitalData, setHospitalData] = useState(null);
  useEffect(() => {
    const fetchHospitalData = async () => {
      const res = await axios.get(`${host}/api/hospital/getsinglehospital/${id}`,{
        headers: {
          Authorization: token ? `Bearer ${token}` : '',  
        },
      });
      setHospitalData(res.data.hospital);
    }

    fetchHospitalData();
    
  },[])

  console.log(hospitalData)

  // if (!hospital) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen bg-gray-50">
  //       <div className="text-center">
  //         <h1 className="text-2xl font-medium text-gray-800">Hospital not found</h1>
  //         <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
  //           Back to hospitals
  //         </Link>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/hospitals" className="text-blue-600 hover:text-blue-800 flex items-center">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Hospitals
          </Link>
          <h1 className="text-xl font-medium text-gray-900">Hospital Details</h1>
          <div className="w-5"></div> {/* Spacer for balance */}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Hero Image */}
          <div className="h-64 sm:h-80 md:h-96 w-full">
            <img
              src={hospitalData?.image}
              alt={hospitalData?.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Hospital Info */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
              <div className="flex-1">
                <div className="flex items-center flex-wrap gap-2 mb-2">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{hospitalData?.name}</h2>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    hospitalData?.hospitaltype === 'Public' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {hospitalData?.hospitaltype}
                  </span>
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-4">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-gray-700">{hospitalData?.rating} <span className="text-gray-500">/5</span></span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {hospitalData?.address}
                  </div>
                </div>

                <p className="text-gray-700 mb-6">{hospitalData?.bio}</p>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Services Offered</h3>
                  {/* <div className="flex flex-wrap gap-2">
                    {hospital.services.map((service, index) => (
                      <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {service}
                      </span>
                    ))}
                  </div> */}
                </div>

                
              </div>

              {/* Sidebar */}
              <div className="md:w-80 md:ml-8 mt-6 md:mt-0">
                <div className="bg-gray-50 p-6 rounded-lg sticky top-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">More Information</h3>
                  
                

                  <div className="mt-6 space-y-3">
                  <button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
                      onClick={() => navigate(`/doctors?hospitalId=${hospitalData._id}`)}
                    >
                      View Doctors
                    </button>
                    <button
                      onClick={() => window.location.href = `tel:${hospitalData?.phone}`}
                      className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 px-4 rounded-lg transition duration-200"
                    >
                      Contact Hospital
                    </button>

                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Average Consultation Fee</h4>
                    <p className="text-2xl font-bold text-gray-900">Rs. {hospitalData?.price}/-</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Map</h3>
            <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="mt-2 text-gray-500">Map of {hospitalData?.name}</p>
                <p className="text-sm text-gray-400">{hospitalData?.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetails;