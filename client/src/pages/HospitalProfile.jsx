import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { host } from '../host.js';
import Authstore from '../hooks/authStore.js';
import { 
  Star, 
  User, 
  Hospital, 
  MapPin, 
  Mail, 
  FileText, 
  DollarSign, 
  Award, 
  Edit2, 
  X, 
  Save, 
  Upload
} from 'lucide-react';

const HospitalProfile = () => {
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    licenseNo: '',
    bio: '',
    hospitaltype: '',
    price: '',
    phone: '',
  });

  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        const hospitalId = Authstore.getUser()?.userid || null;
        const { data } = await axios.get(`${host}/api/hospital/getsinglehospital/${hospitalId}`);
        
        if (data.success) {
          setHospital(data.hospital);
          setFormData({
            name: data.hospital.name || '',
            email: data.hospital.email || '',
            password: '',
            address: data.hospital.address || '',
            licenseNo: data.hospital.licenseNo || '',
            bio: data.hospital.bio || '',
            hospitaltype: data.hospital.hospitaltype || '',
            price: data.hospital.price || '',
            phone: data.hospital.phone || '',

          });
          setImagePreview(data.hospital.image || '');
        }
      } catch (error) {
        toast.error('Failed to load profile data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formDataObj = new FormData();
      
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          formDataObj.append(key, formData[key]);
        }
      });
      
      if (imageFile) {
        formDataObj.append('image', imageFile);
      }
      
      const { data } = await axios.put(
        `${host}/api/hospital/updatehospital/${hospital._id}`, 
        formDataObj, 
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      if (data.success) {
        setHospital(data.hospital);
        toast.success('Profile updated successfully');
        setEditing(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !hospital) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          <span className="text-indigo-600 font-medium">Loading profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="h-24 w-24 rounded-full overflow-hidden bg-indigo-50 border-4 border-white shadow-md">
              {hospital?.image ? (
                <img 
                  src={hospital.image} 
                  alt={hospital.name} 
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full w-full text-indigo-300">
                  <User size={36} />
                </div>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{hospital?.name}</h1>
              <div className="flex items-center mt-2 text-sm">
                <span className="flex items-center text-amber-500">
                  <Star size={16} className="fill-amber-400 stroke-amber-400" />
                  <span className="ml-1 font-medium">{calculateAverageRating(hospital?.reviews)}</span>
                </span>
                <span className="mx-2 text-gray-300">•</span>
                <span className="flex items-center text-indigo-600">
                  <Hospital size={16} className="mr-1" />
                  <span>{hospital?.hospitaltype}</span>
                </span>
                <span className="mx-2 text-gray-300">•</span>
                <span className="flex items-center text-gray-500">
                  <MapPin size={16} className="mr-1" />
                  <span className="truncate max-w-xs">{hospital?.address?.split(',')[0]}</span>
                </span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setEditing(!editing)} 
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              editing 
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {editing ? (
              <>
                <X size={16} />
                Cancel
              </>
            ) : (
              <>
                <Edit2 size={16} />
                Edit Profile
              </>
            )}
          </button>
        </div>
      </div>
      
      {editing ? (
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Edit Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image
                </label>
                <div className="flex items-center gap-6">
                  <div className="h-20 w-20 rounded-full overflow-hidden bg-indigo-50 border-2 border-indigo-100">
                    {imagePreview ? (
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full w-full text-indigo-300">
                        <User size={32} />
                      </div>
                    )}
                  </div>
                  <label className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 cursor-pointer transition-colors">
                    <Upload size={16} />
                    <span className="text-sm font-medium">Upload new image</span>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hospital Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Hospital size={16} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Leave blank to keep current"
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  License Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Award size={16} />
                  </div>
                  <input
                    type="text"
                    name="licenseNo"
                    value={formData.licenseNo}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hospital Type
                </label>
                <select
                  name="hospitaltype"
                  value={formData.hospitaltype}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Select type</option>
                  <option value="General">General</option>
                  <option value="Specialty">Specialty</option>
                  <option value="Teaching">Teaching</option>
                  <option value="Clinic">Clinic</option>
                  <option value="Rehabilitation">Rehabilitation</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Consultation Price
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <DollarSign size={16} />
                  </div>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />

                    <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <MapPin size={16} />
                  </div>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 text-gray-400">
                    <FileText size={16} />
                  </div>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Basic info section */}
          <section className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="flex items-center text-xl font-bold text-gray-900 mb-6">
              <FileText size={20} className="mr-2 text-indigo-500" />
              About
            </h2>
            <p className="text-gray-600 leading-relaxed">{hospital?.bio}</p>
          </section>
          
          {/* Details section */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="flex items-center text-xl font-bold text-gray-900 mb-6">
              <Hospital size={20} className="mr-2 text-indigo-500" />
              Hospital Details
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="flex items-center text-sm font-medium text-gray-500 mb-1">
                  <Award size={14} className="mr-2" />
                  License
                </h3>
                <p className="text-gray-900 font-medium">{hospital?.licenseNo}</p>
              </div>
              
              <div>
                <h3 className="flex items-center text-sm font-medium text-gray-500 mb-1">
                  <Mail size={14} className="mr-2" />
                  Email
                </h3>
                <p className="text-gray-900 font-medium">{hospital?.email}</p>
              </div>
              
              <div>
                <h3 className="flex items-center text-sm font-medium text-gray-500 mb-1">
                  <Hospital size={14} className="mr-2" />
                  Type
                </h3>
                <p className="text-gray-900 font-medium">{hospital?.hospitaltype || 'Not specified'}</p>
              </div>
              
              <div>
                <h3 className="flex items-center text-sm font-medium text-gray-500 mb-1">
                  <DollarSign size={14} className="mr-2" />
                  Consultation Fee
                </h3>
                <p className="text-gray-900 font-medium">${hospital?.price || '0'}</p>
              </div>


              <div>
                <h3 className="flex items-center text-sm font-medium text-gray-500 mb-1">
                  <DollarSign size={14} className="mr-2" />
                  Phone number
                </h3>
                <p className="text-gray-900 font-medium">${hospital?.phone || '0'}</p>
              </div>
              
              <div>
                <h3 className="flex items-center text-sm font-medium text-gray-500 mb-1">
                  <MapPin size={14} className="mr-2" />
                  Address
                </h3>
                <p className="text-gray-900 font-medium">{hospital?.address}</p>
              </div>
            </div>
          </section>
          
          {/* Reviews section */}
          <section className="lg:col-span-3 bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="flex items-center text-xl font-bold text-gray-900">
                <Star size={20} className="mr-2 text-indigo-500" />
                Patient Reviews
              </h2>
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium">
                {hospital?.reviews?.length || 0} total
              </span>
            </div>
            
            {hospital?.reviews?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hospital.reviews.slice(0, 3).map((review, index) => (
                  <div key={index} className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl">
                    <div className="flex items-center mb-3">
                      <div className="flex items-center text-amber-400 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            size={16}
                            className={i < review.rating ? "fill-amber-400" : "text-gray-200"}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 italic">&quot; {review.review} &quot;</p>
                    <div className="mt-4 pt-4 border-t border-indigo-100">
                      <p className="text-sm font-medium text-gray-900">Patient</p>
                      <p className="text-xs text-gray-500">Verified Visit</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-indigo-50 rounded-xl p-10 text-center">
                <div className="flex justify-center mb-4">
                  <Star size={36} className="text-indigo-300" />
                </div>
                <h3 className="text-lg font-medium text-indigo-900 mb-2">No reviews yet</h3>
                <p className="text-indigo-600">Be the first to leave a review for this hospital</p>
              </div>
            )}
            
            {hospital?.reviews?.length > 3 && (
              <div className="text-center mt-8">
                <button className="px-6 py-2 bg-indigo-100 text-indigo-600 rounded-lg font-medium hover:bg-indigo-200 transition-colors">
                  View all {hospital.reviews.length} reviews
                </button>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default HospitalProfile;