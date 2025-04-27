/* eslint-disable no-unused-vars */
import { useState, useEffect} from 'react';
import Authstore from '../hooks/authStore';
import {host} from '../host.js';
import axios from 'axios';
import {toast} from 'react-toastify';

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
  const token = Authstore.getToken();
  // State for password change
const [currentPassword, setCurrentPassword] = useState('');
const [newPassword, setNewPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [passwordError, setPasswordError] = useState('');
const [passwordSuccess, setPasswordSuccess] = useState('');
const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

// State for account deletion
const [deleteError, setDeleteError] = useState('');
const [isDeletingAccount, setIsDeletingAccount] = useState(false);

const handlePasswordChange = async () => {
  if (newPassword !== confirmPassword) {
    setPasswordError("New passwords don't match");
    return;
  }

  if (newPassword.length < 6) {
    setPasswordError("Password must be at least 6 characters");
    return;
  }

  setIsUpdatingPassword(true);
  setPasswordError('');
  setPasswordSuccess('');

  try {
    const response = await axios.post(
      `${host}/api/auth/changepassword`,
      {
        currentPassword,
        newPassword,
        userId: userid // Add the user ID from Authstore
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        }
      }
    );

    setPasswordSuccess('Password changed successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  } catch (error) {
    setPasswordError(error.response?.data?.message || error.message || 'Failed to change password');
  } finally {
    setIsUpdatingPassword(false);
  }
};



const handleDeleteAccount = async () => {
  if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
    return;
  }

  setIsDeletingAccount(true);
  setDeleteError('');
  Authstore.removeUser();
  try {
    const response = await axios.delete(
      `${host}/api/auth/deleteaccount`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
        data: { userId: userid } 
      }
    );

    window.location.href = '/'; 
  } catch (error) {
    setDeleteError(error.response?.data?.message || error.message || 'Failed to delete account');
  } finally {
    setIsDeletingAccount(false);
  }
};

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${host}/api/auth/getselecteduser/${userid}`,{
          headers: {
            Authorization: token ? `Bearer ${token}` : '',  
          },
        });
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
            Authorization: token ? `Bearer ${token}` : '',  
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
      
      toast.success('Images updated successfully!');
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.warning('Failed to upload images');
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
            Authorization: token ? `Bearer ${token}` : '',  
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
      {/* Hero Header with background image */}
      <div className="relative h-40 sm:h-64 w-full overflow-hidden">
        <img 
          src={user.bgimage} 
          alt="Profile background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-600 bg-opacity-60"></div>
        
        {isEditing && (
          <div className="absolute bottom-4 right-4 z-10">
            <label className="bg-white px-3 py-2 rounded-md text-xs sm:text-sm font-medium cursor-pointer hover:bg-gray-50 transition-all shadow-md flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 sm:h-5 sm:w-5 sm:mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="hidden sm:inline">{isUploading ? 'Uploading...' : 'Change Cover'}</span>
              <span className="inline sm:hidden">{isUploading ? 'Uploading...' : 'Cover'}</span>
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
          <div className="flex flex-col md:flex-row md:items-end -mt-16 mb-6 relative">
            <div className="z-10 flex-shrink-0 relative mb-4 md:mb-0 mr-6 flex justify-center md:justify-start">
              <div className="relative">
                <img 
                  src={user.image} 
                  alt={user.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg object-cover"
                />
                {isEditing && (
                  <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs sm:text-sm font-medium flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="hidden sm:inline">Change</span>
                    </span>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
                <span className="absolute bottom-2 right-2 h-3 w-3 sm:h-5 sm:w-5 bg-green-500 rounded-full border-2 border-white" title="Online"></span>
              </div>
            </div>
            
            <div className="flex-grow md:pb-6 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editedUser.name}
                      onChange={handleChange}
                      className="text-2xl sm:text-3xl font-bold text-gray-800 border-b-2 border-blue-500 focus:outline-none bg-transparent w-full md:w-auto text-center md:text-left"
                    />
                  ) : (
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{user.name}</h1>
                  )}
                  
                  <div className="flex items-center mt-1 justify-center md:justify-start flex-wrap">
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
                        className="text-gray-600 text-sm border-b border-blue-300 focus:outline-none focus:border-blue-500 bg-transparent w-full md:w-auto text-center md:text-left mt-1 md:mt-0"
                      />
                    ) : (
                      <span className="text-gray-600 text-sm break-all">{user.email}</span>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 justify-center md:justify-end">
                  {isEditing ? (
                    <>
                      <button 
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center text-sm"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Save
                      </button>
                      <button 
                        onClick={handleCancel}
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center text-sm"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center text-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation Tabs - Horizontal scrolling on mobile */}
          <div className="border-b border-gray-200 overflow-x-auto pb-px">
            <nav className="-mb-px flex space-x-6 min-w-max px-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-xs sm:text-sm flex items-center`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Overview
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`${
                  activeTab === 'details'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-xs sm:text-sm flex items-center`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Details
              </button>
              <button
                onClick={() => setActiveTab('health')}
                className={`${
                  activeTab === 'health'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-xs sm:text-sm flex items-center`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Health
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`${
                  activeTab === 'settings'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-xs sm:text-sm flex items-center`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Left Column - Bio & Contact */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6 mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
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
                  <p className="text-gray-600 leading-relaxed">{user.bio || "No biography available."}</p>
                )}
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 p-2 rounded-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-xs sm:text-sm font-medium text-gray-500">Email</h3>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={editedUser.email}
                          onChange={handleChange}
                          className="text-gray-800 text-sm font-medium border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                        />
                      ) : (
                        <p className="text-gray-800 text-sm font-medium break-all">{user.email}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 p-2 rounded-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-xs sm:text-sm font-medium text-gray-500">Phone</h3>
                      {isEditing ? (
                        <input
                          type="text"
                          name="phone"
                          value={editedUser.phone}
                          onChange={handleChange}
                          className="text-gray-800 text-sm font-medium border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                        />
                      ) : (
                        <p className="text-gray-800 text-sm font-medium">{user.phone || "Not provided"}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 p-2 rounded-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-xs sm:text-sm font-medium text-gray-500">Address</h3>
                      {isEditing ? (
                        <input
                          type="text"
                          name="address"
                          value={editedUser.address}
                          onChange={handleChange}
                          className="text-gray-800 text-sm font-medium border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                        />
                      ) : (
                        <p className="text-gray-800 text-sm font-medium">{user.address || "Not provided"}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 p-2 rounded-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-xs sm:text-sm font-medium text-gray-500">Nationality</h3>
                      {isEditing ? (
                        <input
                          type="text"
                          name="nationality"
                          value={editedUser.nationality}
                          onChange={handleChange}
                          className="text-gray-800 text-sm font-medium border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                        />
                      ) : (
                        <p className="text-gray-800 text-sm font-medium">{user.nationality || "Not provided"}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Personal Info */}
            <div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Personal Information
                </h2>
                <div className="space-y-4 sm:space-y-5">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 p-2 rounded-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-xs sm:text-sm font-medium text-gray-500">Age</h3>
                      {isEditing ? (
                        <input
                          type="number"
                          name="age"
                          value={editedUser.age}
                          onChange={handleChange}
                          className="text-gray-800 text-sm font-medium border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                        />
                      ) : (
                        <p className="text-gray-800 text-sm font-medium">{user.age || "Not provided"}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 p-2 rounded-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-xs sm:text-sm font-medium text-gray-500">Gender</h3>
                      {isEditing ? (
                        <select
                          name="sex"
                          value={editedUser.sex}
                          onChange={handleChange}
                          className="text-gray-800 text-sm font-medium border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                        >
                          <option value="">Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      ) : (
                        <p className="text-gray-800 text-sm font-medium">{user.sex || "Not provided"}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 p-2 rounded-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-xs sm:text-sm font-medium text-gray-500">BMI</h3>
                      {isEditing ? (
                        <input
                          type="text"
                          name="BMI"
                          value={editedUser.BMI}
                          onChange={handleChange}
                          className="text-gray-800 text-sm font-medium border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                        />
                      ) : (
                        <p className="text-gray-800 text-sm font-medium">{user.BMI || "Not provided"}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 p-2 rounded-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-xs sm:text-sm font-medium text-gray-500">Blood Type</h3>
                      {isEditing ? (
                        <select
                          name="blood"
                          value={editedUser.blood}
                          onChange={handleChange}
                          className="text-gray-800 text-sm font-medium border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                        >
                          <option value="">Select</option>
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
                        <p className="text-gray-800 text-sm font-medium">{user.blood || "Not provided"}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Details Tab */}
        {activeTab === 'details' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Detailed Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-md font-medium text-gray-700 mb-3 border-b pb-2">Personal Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={editedUser.name}
                        onChange={handleChange}
                        className="mt-1 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none py-1"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-800">{user.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={editedUser.email}
                        onChange={handleChange}
                        className="mt-1 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none py-1"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-800">{user.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Phone Number</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="phone"
                        value={editedUser.phone}
                        onChange={handleChange}
                        className="mt-1 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none py-1"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-800">{user.phone || "Not provided"}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-medium text-gray-700 mb-3 border-b pb-2">Location</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Address</label>
                    {isEditing ? (
                      <textarea
                        name="address"
                        value={editedUser.address}
                        onChange={handleChange}
                        rows="3"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      ></textarea>
                    ) : (
                      <p className="mt-1 text-sm text-gray-800">{user.address || "Not provided"}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Nationality</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="nationality"
                        value={editedUser.nationality}
                        onChange={handleChange}
                        className="mt-1 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none py-1"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-800">{user.nationality || "Not provided"}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Health Tab */}
        {activeTab === 'health' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Health Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-md font-medium text-gray-700 mb-3 border-b pb-2">Basic Health Data</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Age</label>
                    {isEditing ? (
                      <input
                        type="number"
                        name="age"
                        value={editedUser.age}
                        onChange={handleChange}
                        className="mt-1 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none py-1"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-800">{user.age || "Not provided"}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Gender</label>
                    {isEditing ? (
                      <select
                        name="sex"
                        value={editedUser.sex}
                        onChange={handleChange}
                        className="mt-1 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none py-1"
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <p className="mt-1 text-sm text-gray-800">{user.sex || "Not provided"}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Blood Type</label>
                    {isEditing ? (
                      <select
                        name="blood"
                        value={editedUser.blood}
                        onChange={handleChange}
                        className="mt-1 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none py-1"
                      >
                        <option value="">Select</option>
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
                      <p className="mt-1 text-sm text-gray-800">{user.blood || "Not provided"}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-medium text-gray-700 mb-3 border-b pb-2">Medical Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">BMI</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="BMI"
                        value={editedUser.BMI}
                        onChange={handleChange}
                        className="mt-1 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none py-1"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-800">{user.BMI || "Not provided"}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Allergies</label>
                    <p className="mt-1 text-sm text-gray-800">None recorded</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Medical History</label>
                    <p className="mt-1 text-sm text-gray-800">None recorded</p>
                  </div>
                </div>
              </div>
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
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={handlePasswordChange}
            disabled={isUpdatingPassword}
          >
            {isUpdatingPassword ? 'Updating...' : 'Update Password'}
          </button>
          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
          {passwordSuccess && <p className="text-green-500 text-sm">{passwordSuccess}</p>}
        </div>
      </div>
      
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-red-800 mb-3">Danger Zone</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">Deleting your account will remove all of your information from our database. This cannot be undone.</p>
            <button 
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center"
              onClick={handleDeleteAccount}
              disabled={isDeletingAccount}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              {isDeletingAccount ? 'Deleting...' : 'Delete Account'}
            </button>
            {deleteError && <p className="text-red-500 text-sm">{deleteError}</p>}
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