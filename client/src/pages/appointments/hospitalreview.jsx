import { useState, useEffect } from 'react';
import axios from 'axios';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { host } from '../../host';
import Authstore from '../../hooks/authStore.js';

const HospitalAppointmentsAndReview = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  const userId = Authstore.getUser()?.userid || null;

  // Check if mobile view based on screen width
  useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth < 1024);
    };
    
    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${host}/api/appointment/getappointmentbyuser/${userId}`);
      setAppointments(response.data.appointments);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch appointments. Please try again later.');
      setLoading(false);
      console.error(err);
    }
  };

  const handleHospitalSelect = (hospital) => {
    setSelectedHospital(hospital);
    setSubmitSuccess(false);
    setReview('');
    setRating(0);
    
    // For mobile, scroll to review section
    if (mobileView) {
      setTimeout(() => {
        document.getElementById('review-section').scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedHospital || !review || rating === 0) {
      setError('Please select a hospital, write a review, and provide a rating.');
      return;
    }

    try {
      const response = await axios.post(`${host}/api/hospital/addreview/${selectedHospital._id}`, {
        userId,
        review,
        rating,
      });

      if (response.data.success) {
        setSubmitSuccess(true);
        setError(null);
      }
    } catch (err) {
      setError('Failed to submit review. Please try again.');
      console.error(err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Function to get unique hospitals from appointments
  const getUniqueHospitals = () => {
    const hospitalMap = {};
    appointments.forEach(appointment => {
      if (appointment.doctor?.hospital && !hospitalMap[appointment.doctor.hospital._id]) {
        hospitalMap[appointment.doctor.hospital._id] = appointment.doctor.hospital;
      }
    });
    return Object.values(hospitalMap);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // For mobile view, show a more compact layout
  if (mobileView) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 px-4">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Your Hospital Experience
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Review hospitals you&apos;ve visited
            </p>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-3 rounded text-sm">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Mobile Quick Hospital Select */}
          <div className="bg-white rounded-lg shadow-md mb-4 p-4">
            <h2 className="text-lg font-medium text-gray-800 mb-3">Select a Hospital to Review</h2>
            <div className="flex overflow-x-auto pb-2 space-x-3">
              {getUniqueHospitals().map(hospital => (
                <button
                  key={hospital._id}
                  onClick={() => handleHospitalSelect(hospital)}
                  className={`flex-shrink-0 flex flex-col items-center p-3 border rounded-lg transition-colors ${
                    selectedHospital && selectedHospital._id === hospital._id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  style={{ width: '100px' }}
                >
                  <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                    {hospital.image ? (
                      <img 
                        src={hospital.image} 
                        alt={hospital.name}
                        className="h-full w-full object-cover" 
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-blue-100 text-blue-500">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 6h-4V2h-6v4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8-2h2v2h-2V4zm8 16H5V8h14v12z" />
                          <path d="M12 18l-4-4h8z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <span className="mt-2 text-xs font-medium text-gray-900 text-center">
                    {hospital.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Review Section */}
          <div id="review-section" className="bg-white rounded-lg shadow-md mb-4">
            <div className="px-4 py-3 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-800">
                {selectedHospital ? `Review ${selectedHospital.name}` : 'Add Your Review'}
              </h2>
            </div>

            {!selectedHospital ? (
              <div className="p-4 text-center">
                <p className="text-gray-500 text-sm">Select a hospital above to leave a review</p>
              </div>
            ) : submitSuccess ? (
              <div className="p-4 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-3">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Review Submitted!</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Thank you for sharing your experience.
                </p>
                <button
                  onClick={() => setSelectedHospital(null)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium"
                >
                  Review Another Hospital
                </button>
              </div>
            ) : (
              <div className="p-4">
                <form onSubmit={handleReviewSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Rating
                    </label>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="p-1 focus:outline-none"
                        >
                          {star <= (hoveredRating || rating) ? (
                            <StarIcon className="h-7 w-7 text-yellow-400" />
                          ) : (
                            <StarOutline className="h-7 w-7 text-gray-300" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Review
                    </label>
                    <textarea
                      id="review"
                      name="review"
                      rows={3}
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Share your experience..."
                      required
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Appointments List for Mobile */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-4 py-3 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-800">Your Hospital Appointments</h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {appointments.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  You don&apos;t have any appointments yet.
                </div>
              ) : (
                appointments.filter(appointment => appointment.doctor?.hospital).map((appointment) => (
                  <div key={appointment._id} className="p-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        {appointment.doctor.hospital.image ? (
                          <img 
                            src={appointment.doctor.hospital.image} 
                            alt={appointment.doctor.hospital.name}
                            className="h-full w-full object-cover" 
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-blue-100 text-blue-500">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 6h-4V2h-6v4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8-2h2v2h-2V4zm8 16H5V8h14v12z" />
                              <path d="M12 18l-4-4h8z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900">{appointment.doctor.hospital.name}</h3>
                          <button
                            onClick={() => handleHospitalSelect(appointment.doctor.hospital)}
                            className="ml-2 px-2 py-1 text-xs rounded-full bg-blue-50 text-blue-700"
                          >
                            Review
                          </button>
                        </div>
                        <p className="text-xs text-gray-500">
                          {formatDate(appointment.date)} • {appointment.time}
                        </p>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-xs text-gray-500">
                            {appointment.purpose}
                          </p>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${
                            appointment.status === 'Completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {appointment.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop layout with sticky review section
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Your Hospital Experience
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Share your feedback and help others find quality healthcare facilities
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Appointments List - Left Side */}
          <div className="lg:col-span-3 bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Your Hospital Visits</h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {appointments.length === 0 || !appointments.some(appointment => appointment.doctor?.hospital) ? (
                <div className="p-6 text-center text-gray-500">
                  You don&apos;t have any hospital appointments yet.
                </div>
              ) : (
                appointments.filter(appointment => appointment.doctor?.hospital).map((appointment) => (
                  <div key={appointment._id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-16 w-16 rounded-full overflow-hidden bg-gray-100">
                        {appointment.doctor.hospital.image ? (
                          <img 
                            src={appointment.doctor.hospital.image} 
                            alt={appointment.doctor.hospital.name}
                            className="h-full w-full object-cover" 
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-blue-100 text-blue-500">
                            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 6h-4V2h-6v4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8-2h2v2h-2V4zm8 16H5V8h14v12z" />
                              <path d="M12 18l-4-4h8z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-gray-900">{appointment.doctor.hospital.name}</h3>
                          <button
                            onClick={() => handleHospitalSelect(appointment.doctor.hospital)}
                            className="ml-2 px-3 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                          >
                            Add Review
                          </button>
                        </div>
                        <p className="text-sm text-gray-500">
                          Doctor: Dr. {appointment.doctor.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Date: {formatDate(appointment.date)}
                        </p>
                        <p className="text-sm text-gray-500">
                          Time: {appointment.time}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          Purpose: {appointment.purpose}
                        </p>
                        <span className={`mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          appointment.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {appointment.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Add Review - Right Side (Sticky) */}
          <div className="lg:col-span-2">
            <div className="sticky top-8">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800">Hospital Review</h2>
                </div>

                {!selectedHospital ? (
                  <div className="p-6">
                    <div className="text-center py-8">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 6h-4V2h-6v4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8-2h2v2h-2V4zm8 16H5V8h14v12z" />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No hospital selected</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Select a hospital from your appointments to leave a review.
                      </p>
                    </div>

                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-900">Your Hospitals</h3>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {getUniqueHospitals().map(hospital => (
                          <button
                            key={hospital._id}
                            onClick={() => handleHospitalSelect(hospital)}
                            className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors"
                          >
                            <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                              {hospital.image ? (
                                <img 
                                  src={hospital.image} 
                                  alt={hospital.name}
                                  className="h-full w-full object-cover" 
                                />
                              ) : (
                                <div className="h-full w-full flex items-center justify-center bg-blue-100 text-blue-500">
                                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 6h-4V2h-6v4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0-2-.9 2-2V8c0-1.1-.9-2-2-2zm-8-2h2v2h-2V4zm8 16H5V8h14v12z" />
                                  </svg>
                                </div>
                              )}
                            </div>
                            <span className="mt-2 text-xs font-medium text-gray-900">
                              {hospital.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : submitSuccess ? (
                  <div className="p-6">
                    <div className="text-center py-8">
                      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                        <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="mt-3 text-lg font-medium text-gray-900">Review Submitted!</h3>
                      <p className="mt-2 text-sm text-gray-500">
                        Thank you for sharing your experience at {selectedHospital.name}.
                      </p>
                      <div className="mt-6">
                        <button
                          onClick={() => setSelectedHospital(null)}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Back to Hospitals
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6">
                    <div className="flex items-center mb-6">
                      <div className="flex-shrink-0 h-16 w-16 rounded-full overflow-hidden bg-gray-100">
                        {selectedHospital.image ? (
                          <img 
                            src={selectedHospital.image} 
                            alt={selectedHospital.name}
                            className="h-full w-full object-cover" 
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-blue-100 text-blue-500">
                            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 6h-4V2h-6v4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8-2h2v2h-2V4zm8 16H5V8h14v12z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          {selectedHospital.name}
                        </h3>
                        <button 
                          onClick={() => setSelectedHospital(null)}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Change Hospital
                        </button>
                      </div>
                    </div>

                    <form onSubmit={handleReviewSubmit}>
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Rating
                        </label>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              onMouseEnter={() => setHoveredRating(star)}
                              onMouseLeave={() => setHoveredRating(0)}
                              className="p-1 focus:outline-none"
                            >
                              {star <= (hoveredRating || rating) ? (
                                <StarIcon className="h-8 w-8 text-yellow-400" />
                              ) : (
                                <StarOutline className="h-8 w-8 text-gray-300" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">
                          Your Review
                        </label>
                        <textarea
                          id="review"
                          name="review"
                          rows={4}
                          value={review}
                          onChange={(e) => setReview(e.target.value)}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Share your experience at this hospital..."
                          required
                        />
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Submit Review
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              {selectedHospital && !submitSuccess && (
                <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Hospital Review Tips</h3>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                      <li>Comment on the cleanliness and facilities</li>
                      <li>Was the staff friendly and helpful?</li>
                      <li>How was the overall environment?</li>
                      <li>Were waiting times reasonable?</li>
                      <li>Would you recommend this hospital to others?</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalAppointmentsAndReview;