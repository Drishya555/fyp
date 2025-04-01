import { useState } from 'react';
import axios from 'axios';
import {host} from '../../host.js';

const HospitalRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    licenseNo: '',
    bio: '',
    rating: '',
    hospitaltype: '',
    image: null,
    price: ''
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const hospitalTypes = [
    'General Hospital',
    'Specialty Hospital',
    'Teaching Hospital',
    'Clinic',
    'Research Hospital',
    'Psychiatric Hospital'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false); // Reset success state on new submission
  
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      }
  
      const response = await axios.post(
        `${host}/api/hospital/registerhospital`, 
        formDataToSend, 
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
  
      // Store the response data in state if needed
      const registeredHospital = response.data.hospital;
      console.log('Registered hospital:', registeredHospital);
      
      setSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        address: '',
        licenseNo: '',
        bio: '',
        rating: '',
        hospitaltype: '',
        image: null,
        price: ''
      });
      setPreviewImage(null);
  
      // You can now use the response data as needed
      // For example, redirect to the hospital page or show details
      // navigate(`/hospitals/${registeredHospital._id}`);
  
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration');
      console.error('Registration error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">Hospital Registration</h2>
            <p className="mt-2 text-sm text-gray-600">
              Register your hospital to join our network
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">Hospital registered successfully!</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Hospital Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="licenseNo" className="block text-sm font-medium text-gray-700">
                License Number
              </label>
              <input
                type="text"
                id="licenseNo"
                name="licenseNo"
                value={formData.licenseNo}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="hospitaltype" className="block text-sm font-medium text-gray-700">
                Hospital Type
              </label>
              <select
                id="hospitaltype"
                name="hospitaltype"
                value={formData.hospitaltype}
                onChange={handleChange}
                required
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select a type</option>
                {hospitalTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                Rating (1-5)
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                min="1"
                max="5"
                value={formData.rating}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price for OPD report
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Bio/Description
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={3}
                value={formData.bio}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Hospital Image</label>
              <div className="mt-1 flex items-center">
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {formData.image ? 'Change Image' : 'Upload Image'}
                </label>
                <input
                  id="image-upload"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="sr-only"
                />
                {previewImage && (
                  <div className="ml-4 flex-shrink-0">
                    <img className="h-16 w-16 rounded-full object-cover" src={previewImage} alt="Hospital preview" />
                  </div>
                )}
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Upload a high-quality image of your hospital (optional)
              </p>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : 'Register Hospital'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HospitalRegistrationForm;