import { useState, useEffect} from 'react';
import Authstore from '../hooks/authStore';
import {host} from '../host.js';
import axios from 'axios';

export default function UserProfile() {

  const userid = Authstore.getUser()?.userid || null;
  
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "user",
    address: "",
    bio: "",
    sex: "",
    blood: "",
    nationality: "",
    age: 0,
    phone: "",
    BMI: "",
    image: "/api/placeholder/150/150",
    bgimage: "/api/placeholder/1920/400"
  });

  // Track edit state
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({...user});
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedBgImage, setSelectedBgImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${host}/api/auth/getselecteduser/${userid}`);
        const apiUser = response.data.user;
        
        // Map API response to your user state
        setUser({
          name: apiUser.name || "",
          email: apiUser.email || "",
          role: apiUser.role || "user",
          address: apiUser.address || "",
          bio: apiUser.bio || "",
          sex: apiUser.sex || "",
          blood: apiUser.blood || "",
          nationality: apiUser.nationality || "",
          age: apiUser.age || 0,
          phone: apiUser.phone || "",
          BMI: apiUser.BMI || "",
          image: apiUser.image || "/api/placeholder/150/150",
          bgimage: apiUser.bgimage || "/api/placeholder/1920/400"
        });
        
        setEditedUser({
          ...apiUser,
          image: apiUser.image || "/api/placeholder/150/150",
          bgimage: apiUser.bgimage || "/api/placeholder/1920/400"
        });
        
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userid) {
      getUser();
    }
  }, [userid]);


  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      
      // Preview the image
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditedUser(prev => ({...prev, image: event.target.result}));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const handleBgImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedBgImage(e.target.files[0]);
      
      // Preview the image
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditedUser(prev => ({...prev, bgimage: event.target.result}));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const handleImageUpload = async () => {
    if (!selectedImage && !selectedBgImage) return;
  
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      if (selectedImage) formData.append('image', selectedImage);
      if (selectedBgImage) formData.append('bgimage', selectedBgImage);
  
      const response = await axios.put(
        `${host}/api/auth/updateimg/${userid}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );
  
      // Update the user state with new images
      setUser(prev => ({
        ...prev,
        image: response.data.image || prev.image,
        bgimage: response.data.bgimage || prev.bgimage
      }));
      
      setEditedUser(prev => ({
        ...prev,
        image: response.data.image || prev.image,
        bgimage: response.data.bgimage || prev.bgimage
      }));
      
      setSelectedImage(null);
      setSelectedBgImage(null);
      
      alert('Images updated successfully!');
    } catch (error) {
      console.error("Error uploading images:", error);
      alert('Failed to upload images');
    } finally {
      setIsUploading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Save changes
  // const handleSave = async () => {
  //   try {
  //     // Make API call to update user
  //     const response = await axios.put(`${host}/api/auth/updateuser/${userid}`, editedUser);
      
  //     // Update local state with the updated user data
  //     setUser(response.data.user);
  //     setIsEditing(false);
      
  //   } catch (error) {
  //     console.error("Error updating user:", error);
  //   }
  // };


  const handleSave = async () => {
    try {
      // If there are images to upload, handle them first
      if (selectedImage || selectedBgImage) {
        await handleImageUpload();
      }
      
      // Then update the rest of the user data
      const response = await axios.put(
        `${host}/api/auth/edituser/${userid}`,
        editedUser,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      
      setUser(response.data.user);
      setIsEditing(false);
      
      alert('Profile updated successfully!');
    } catch (error) {
      console.error("Error updating user:", error);
      if (error.response) {
        alert(error.response.data.message || 'Failed to update profile');
      } else if (error.request) {
        alert('Network error - please check your connection');
      } else {
        alert('Error updating profile');
      }
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditedUser({...user});
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading user data...</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-xl font-bold text-blue-600">ProfileDash</div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
              {user.name.charAt(0)}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Header with background image */}
      <div className="relative h-64 w-full overflow-hidden">
        <img 
          src={user.bgimage} 
          alt="Profile background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-600 bg-opacity-60"></div>
        
        {isEditing && (
  <div className="absolute bottom-4 right-4">
    <label className="bg-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer hover:bg-gray-50 transition-all shadow-md flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      {isUploading ? 'Uploading...' : 'Change Cover'}
      <input 
        type="file" 
        className="hidden" 
        accept="image/*"
        onChange={handleBgImageChange}
      />
    </label>
  </div>
)}
      </div>

      {/* Profile Main Content */}
      <div className="w-full bg-white">
        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row md:items-end -mt-20 mb-6 relative">
            <div className="z-10 flex-shrink-0 relative mb-4 md:mb-0 mr-6">
              <div className="relative">
                <img 
                  src={user.image} 
                  alt={user.name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg object-cover"
                />
                {isEditing && (
  <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 hover:opacity-100 transition-opacity">
    <span className="text-white text-sm font-medium flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      Change
    </span>
    <input 
      type="file" 
      className="hidden" 
      accept="image/*"
      onChange={handleImageChange}
    />
  </label>
)}
                <span className="absolute bottom-2 right-2 h-5 w-5 bg-green-500 rounded-full border-2 border-white" title="Online"></span>
              </div>
            </div>
            
            <div className="flex-grow md:pb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editedUser.name}
                      onChange={handleChange}
                      className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500 focus:outline-none bg-transparent"
                    />
                  ) : (
                    <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
                  )}
                  
                  <div className="flex items-center mt-1">
                    {isEditing ? (
                      <select
                        name="role"
                        value={editedUser.role}
                        onChange={handleChange}
                        className="text-blue-600 font-medium text-sm border-b border-blue-300 focus:outline-none focus:border-blue-500 bg-transparent"
                      >
                        <option value="User">User</option>
                      </select>
                    ) : (
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">{user.role}</span>
                    )}
                    
                    <span className="mx-2 text-gray-400">•</span>
                    
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={editedUser.email}
                        onChange={handleChange}
                        className="text-gray-600 text-sm border-b border-blue-300 focus:outline-none focus:border-blue-500 bg-transparent"
                      />
                    ) : (
                      <span className="text-gray-600 text-sm">{user.email}</span>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                  {isEditing ? (
                    <>
                      <button 
                        onClick={handleSave}
                        className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Save Changes
                      </button>
                      <button 
                        onClick={handleCancel}
                        className="px-5 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`${
                  activeTab === 'details'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Personal Details
              </button>
              <button
                onClick={() => setActiveTab('health')}
                className={`${
                  activeTab === 'health'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Health Information
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`${
                  activeTab === 'settings'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Settings
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Bio & Contact */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Biography
                </h2>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={editedUser.bio}
                    onChange={handleChange}
                    rows="4"
                    className="w-full p-3 text-gray-600 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                ) : (
                  <p className="text-gray-600 leading-relaxed">{user.bio}</p>
                )}
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 p-2 rounded-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-500">Email</h3>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={editedUser.email}
                          onChange={handleChange}
                          className="text-gray-800 font-medium border-b border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-gray-800 font-medium">{user.email}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 p-2 rounded-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                      {isEditing ? (
                        <input
                          type="text"
                          name="phone"
                          value={editedUser.phone}
                          onChange={handleChange}
                          className="text-gray-800 font-medium border-b border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-gray-800 font-medium">{user.phone}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 p-2 rounded-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-500">Address</h3>
                      {isEditing ? (
                        <input
                          type="text"
                          name="address"
                          value={editedUser.address}
                          onChange={handleChange}
                          className="text-gray-800 font-medium border-b border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-gray-800 font-medium">{user.address}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 p-2 rounded-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-500">Nationality</h3>
                      {isEditing ? (
                        <input
                          type="text"
                          name="nationality"
                          value={editedUser.nationality}
                          onChange={handleChange}
                          className="text-gray-800 font-medium border-b border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-gray-800 font-medium">{user.nationality}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Health */}
            <div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Health Information
                </h2>
                
                <div className="space-y-4">
                  <div className="border-b border-gray-100 pb-3">
                    <h3 className="text-sm font-medium text-gray-500">Age</h3>
                    {isEditing ? (
                      <input
                        type="number"
                        name="age"
                        value={editedUser.age}
                        onChange={handleChange}
                        className="text-gray-800 font-medium border-b border-gray-300 focus:outline-none focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-800 font-medium">{user.age} years</p>
                    )}
                  </div>
                  
                  <div className="border-b border-gray-100 pb-3">
                    <h3 className="text-sm font-medium text-gray-500">Sex</h3>
                    {isEditing ? (
                      <select
                        name="sex"
                        value={editedUser.sex}
                        onChange={handleChange}
                        className="text-gray-800 font-medium border-b border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-800 font-medium">{user.sex}</p>
                    )}
                  </div>
                  
                  <div className="border-b border-gray-100 pb-3">
                    <h3 className="text-sm font-medium text-gray-500">Blood Type</h3>
                    {isEditing ? (
                      <select
                        name="blood"
                        value={editedUser.blood}
                        onChange={handleChange}
                        className="text-gray-800 font-medium border-b border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent"
                      >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    ) : (
                      <p className="text-gray-800 font-medium">{user.blood}</p>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">BMI</h3>
                    {isEditing ? (
                      <input
                        type="text"
                        name="BMI"
                        value={editedUser.BMI}
                        onChange={handleChange}
                        className="text-gray-800 font-medium border-b border-gray-300 focus:outline-none focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-800 font-medium">{user.BMI}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Quick Actions Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Quick Actions
                </h2>
                
                <div className="space-y-2">
                  <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors flex items-center text-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Change Password
                  </button>
                  
                  <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors flex items-center text-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Account Settings
                  </button>
                  
                  <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors flex items-center text-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Personal Details Tab */}
        {activeTab === 'details' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Personal Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editedUser.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded-md">{user.name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded-md">{user.email}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={editedUser.phone}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded-md">{user.phone}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={editedUser.address}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded-md">{user.address}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="nationality"
                    value={editedUser.nationality}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded-md">{user.nationality}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                {isEditing ? (
                  <select
                    name="role"
                    value={editedUser.role}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="User">User</option>
                    
                  </select>
                ) : (
                  <p className="p-2 bg-gray-50 rounded-md">{user.role}</p>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Health Information Tab */}
        {activeTab === 'health' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Health Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                {isEditing ? (
                  <input
                    type="number"
                    name="age"
                    value={editedUser.age}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded-md">{user.age} years</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
                {isEditing ? (
                  <select
                    name="sex"
                    value={editedUser.sex}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <p className="p-2 bg-gray-50 rounded-md">{user.sex}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type</label>
                {isEditing ? (
                  <select
                    name="blood"
                    value={editedUser.blood}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                ) : (
                  <p className="p-2 bg-gray-50 rounded-md">{user.blood}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">BMI</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="BMI"
                    value={editedUser.BMI}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded-md">{user.BMI}</p>
                )}
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Medical History</h3>
              {isEditing ? (
                <textarea
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder="Enter any relevant medical history..."
                ></textarea>
              ) : (
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-600">No medical history recorded.</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Account Settings
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input
                      type="password"
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input
                      type="password"
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Confirm new password"
                    />
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Update Password
                  </button>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Notification Preferences</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="email-notifications"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="email-notifications" className="ml-2 block text-sm text-gray-700">
                      Email Notifications
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="sms-notifications"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="sms-notifications" className="ml-2 block text-sm text-gray-700">
                      SMS Notifications
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="push-notifications"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="push-notifications" className="ml-2 block text-sm text-gray-700">
                      Push Notifications
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-red-800 mb-3">Danger Zone</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Deleting your account will remove all of your information from our database. This cannot be undone.</p>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


















































