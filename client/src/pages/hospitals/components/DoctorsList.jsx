import { useState, useEffect } from 'react';
import axios from 'axios';
import Authstore from '../../../hooks/authStore.js';
import { host } from '../../../host.js';
import DoctorRegister from '../AddDoctors.jsx'; // Import the DoctorRegister component

const DoctorListComponent = () => {
  const [doctors, setDoctors] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddDoctorModalOpen, setIsAddDoctorModalOpen] = useState(false); // State for Add Doctor modal
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hospitalId = Authstore.getUser()?.userid; 

  // Fetch doctors by hospital ID
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${host}/api/doctors/getdoctorsbyhospital/${hospitalId}`);
        if (response.data.success) {
          setDoctors(response.data.doctor);
        } else {
          setError("Failed to fetch doctors");
        }
      } catch (err) {
        setError("Error fetching doctors: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [hospitalId]);

  // Handle delete button click
  const handleDelete = (doctor) => {
    setCurrentDoctor(doctor);
    setIsDeleteModalOpen(true);
  };

  // Confirm deletion
  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`${host}/api/doctors/${currentDoctor._id}`);
      if (response.data.success) {
        // Remove doctor from state
        setDoctors(doctors.filter(doc => doc._id !== currentDoctor._id));
        setIsDeleteModalOpen(false);
      } else {
        setError("Failed to delete doctor");
      }
    } catch (err) {
      setError("Error deleting doctor: " + err.message);
    }
  };

  // Get availability style based on status
  const getAvailabilityStyle = (availability) => {
    switch (availability) {
      case "Available":
        return "text-green-500 bg-green-100";
      case "Unavailable":
        return "text-red-500 bg-red-100";
      case "Limited":
        return "text-yellow-500 bg-yellow-100";
      default:
        return "text-gray-500 bg-gray-100";
    }
  };

  // Get initial for avatar
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
      <p>{error}</p>
    </div>
  );

  return (
    <section className="container px-4 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800">Hospital Doctors</h1>
        
        {/* Add Doctor Button */}
        <button
          onClick={() => setIsAddDoctorModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Doctor
        </button>
      </div>
      
      {/* Desktop Table */}
      <div className="hidden md:flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {['', 'Name', 'Contact Info', 'License', 'Status', 'Availability', 'Rating', 'Actions'].map((heading, index) => (
                      <th
                        key={index}
                        className="px-3 py-3 text-xs font-medium text-left text-gray-500 sm:px-4 sm:text-sm"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {doctors.map((doctor) => (
                    <tr key={doctor._id}>
                      <td className="px-3 py-3 text-sm font-medium text-gray-700 sm:px-4 sm:py-4">
                        <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-medium">
                          {getInitial(doctor.name)}
                        </div>
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-500 sm:px-4 sm:py-4">
                        <div>
                          <h2 className="text-sm font-medium text-gray-800">{doctor.name}</h2>
                          <p className="text-xs text-gray-600">{doctor.employmentType}</p>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-500 sm:px-4 sm:py-4">
                        <div>
                          <p>{doctor.email}</p>
                          <p>{doctor.phone || "No phone"}</p>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-500 sm:px-4 sm:py-4">
                        {doctor.licenseNo}
                      </td>
                      <td className="px-3 py-3 text-sm font-medium sm:px-4 sm:py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${doctor.verified ? "text-green-500 bg-green-100" : "text-gray-500 bg-gray-100"}`}>
                          {doctor.verified ? "Verified" : "Unverified"}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-sm font-medium sm:px-4 sm:py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${getAvailabilityStyle(doctor.availability)}`}>
                          {doctor.availability}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-500 sm:px-4 sm:py-4">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0
                              1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54
                              1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1
                              1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                          </svg>
                          <span className="ml-1">{doctor.rating || "N/A"}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-sm sm:px-4 sm:py-4">
                        <button 
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(doctor)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Cards (shown on mobile) */}
      <div className="md:hidden space-y-4">
        {doctors.map((doctor) => (
          <div key={doctor._id} className="p-4 bg-white rounded-lg shadow border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-medium">
                  {getInitial(doctor.name)}
                </div>
                <div>
                  <h2 className="text-sm font-medium text-gray-800">{doctor.name}</h2>
                  <p className="text-xs text-gray-600">{doctor.employmentType}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${getAvailabilityStyle(doctor.availability)}`}>
                {doctor.availability}
              </span>
            </div>
            
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div>
                <div className="text-xs text-gray-500">Email:</div>
                <div className="text-sm text-gray-700">{doctor.email}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Phone:</div>
                <div className="text-sm text-gray-700">{doctor.phone || "N/A"}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">License:</div>
                <div className="text-sm text-gray-700">{doctor.licenseNo}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Rating:</div>
                <div className="text-sm text-gray-700 flex items-center">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0
                      1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54
                      1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1
                      1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                    </path>
                  </svg>
                  <span className="ml-1">{doctor.rating || "N/A"}</span>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div>
                <span className={`px-2 py-1 text-xs rounded-full ${doctor.verified ? "text-green-500 bg-green-100" : "text-gray-500 bg-gray-100"}`}>
                  {doctor.verified ? "Verified" : "Unverified"}
                </span>
              </div>
              <button 
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDelete(doctor)}
              >
                Delete
              </button>
            </div>
            
            {doctor.freeslots && doctor.freeslots.length > 0 && (
              <div className="mt-3">
                <div className="text-xs text-gray-500 mb-1">Available Slots:</div>
                <div className="flex flex-wrap gap-1">
                  {doctor.freeslots.map((slot, idx) => (
                    <span key={idx} className={`text-xs px-2 py-1 rounded-full ${
                      slot.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {slot.day} {slot.time}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && currentDoctor && (
        <div className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl w-full max-w-md mx-4">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Doctor</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete Dr. {currentDoctor.name} from this hospital? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-row-reverse">
              <button 
                type="button"
                className="ml-3 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:w-auto sm:text-sm"
                onClick={confirmDelete}
              >
                Delete
              </button>
              <button 
                type="button"
                className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:w-auto sm:text-sm"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Doctor Modal */}
      {isAddDoctorModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl w-full max-w-2xl mx-4 my-8">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Add New Doctor</h3>
                <button
                  onClick={() => setIsAddDoctorModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="max-h-[80vh] overflow-y-auto">
                <DoctorRegister onSuccess={() => {
                  // Optionally refresh doctor list after successful registration
                  setIsAddDoctorModalOpen(false);
                  // Refetch doctors data
                  const fetchDoctors = async () => {
                    try {
                      const response = await axios.get(`${host}/api/doctors/getdoctorsbyhospital/${hospitalId}`);
                      if (response.data.success) {
                        setDoctors(response.data.doctor);
                      }
                    } catch (err) {
                      console.error("Error refreshing doctor list:", err);
                    }
                  };
                  fetchDoctors();
                }} />
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-end">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:w-auto sm:text-sm"
                onClick={() => setIsAddDoctorModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DoctorListComponent;