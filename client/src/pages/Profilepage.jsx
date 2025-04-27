import { useState, useEffect } from 'react';
import { FiShare2, FiEdit, FiBookmark, FiLink, FiMapPin, FiBriefcase, FiCalendar, FiStar, FiActivity, FiHeart } from 'react-icons/fi';
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Authstore from '../hooks/authStore.js';
import axios from 'axios';
import { host } from '../host.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const skillDistributionData = [
  { name: 'Cardiology', value: 35 },
  { name: 'General Surgery', value: 25 },
  { name: 'Pediatrics', value: 20 },
  { name: 'Neurology', value: 15 },
  { name: 'Emergency Medicine', value: 5 },
];


const testimonialsData = [
  {
    text: "Dr. Smith's expertise in cardiology is unmatched. His innovative approach to complex cases has saved countless lives at our hospital.",
    author: "Dr. Emily Johnson",
    position: "Chief Medical Officer, Mayo Clinic",
    image: "/doctor-female.jpg"
  },
  {
    text: "Working with Dr. Smith on pediatric cardiac cases has been transformative for our department. His compassion and skill inspire the entire team.",
    author: "Dr. Michael Chen",
    position: "Head of Pediatrics",
    image: "/doctor-male.jpg"
  },
  {
    text: "Dr. Smith's leadership in developing our emergency protocols has made our hospital significantly safer for cardiac patients.",
    author: "Sarah Williams",
    position: "Director of Nursing",
    image: "/nurse-female.jpg"
  }
];

const COLORS = ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE', '#DBEAFE'];

const ProfilePage = () => {
  const [userData] = useState({
    name: 'Dr. Carlos Sainz',
    location: 'Rochester, Minnesota, United States',
    username: '@dr.carlossainz',
    role: 'Chief of Cardiology at Mayo Clinic',
    employmentType: 'Full-time',
    bio: 'Board-certified cardiologist with 10+ years of experience in interventional cardiology. Specializing in minimally invasive procedures and innovative treatment approaches for complex cardiac conditions.',
    portfolio: 'mayoclinic.org/profiles/sainz-carlos',
    email: 'carlos.sainz@mayoclinic.org',
    skills: [
      'Interventional Cardiology', 'Cardiac Surgery', 'Echocardiography', 'Heart Failure Management', 'Clinical Research',
      'Minimally Invasive Procedures', 'Medical Education', 'Healthcare Leadership', 'Patient Advocacy', 'Medical Innovation',
    ],
  });

  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const docid = Authstore.getUser()?.userid || null;
  const [doctor, setDoctor] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    bio: '',
    address: '',
    phone: '',
    licenseNo: '',
    about: '',
    experience: '',
    totalPatients: '',
    hourlyPrice: '',
    location: '',
    username: '',
    employmentType: 'Full-time',
    portfolio: '',
    skills: [], 
    careerProgression: [],  
    notableCases: [],  
    performanceMetrics: [],
    testimonials: [], 
    education: [],  
    certifications: [],  
    languages: [],  
    researchPublications: [], 
    awards: [],  
    professionalMemberships: [],  
    availability: 'Available'
  });

  const [files, setFiles] = useState({
    image: null,
    bgimage: null
  });

  const token = Authstore.getToken();

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const res = await axios.get(`${host}/api/doctors/getselecteddoc/${docid}`,{
          headers: {
            Authorization: token ? `Bearer ${token}` : '',  
          },
        });
        const doctorData = res.data.doctor || {};
        
        setDoctor(doctorData);
        
        setEditFormData({
          name: doctorData.name || '',
          email: doctorData.email || '',
          bio: doctorData.bio || '',
          address: doctorData.address || '',
          phone: doctorData.phone || '',
          licenseNo: doctorData.licenseNo || '',
          about: doctorData.about || '',
          experience: doctorData.experience || '',
          totalPatients: doctorData.totalPatients || '',
          hourlyPrice: doctorData.hourlyPrice || '',
          location: doctorData.location || '',
          username: doctorData.username || '',
          employmentType: doctorData.employmentType || 'Full-time',
          portfolio: doctorData.portfolio || '',
          availability: doctorData.availability || 'Available',
          skills: doctorData.skills || [],
          careerProgression: doctorData.careerProgression || [],
          notableCases: doctorData.notableCases || [],
        });
      } catch (err) {
        console.error('Error fetching doctor data:', err);
        toast.error('Failed to load doctor profile');
      }
    };
  
    if (docid) {
      fetchDoctorData();
    }
  }, [docid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayInputChange = (field, index, key, value) => {
    const updatedArray = [...editFormData[field]];
    updatedArray[index][key] = value;
    setEditFormData(prev => ({ ...prev, [field]: updatedArray }));
  };

  const handleAddArrayItem = (field, template) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: [...prev[field], template]
    }));
  };

  const handleRemoveArrayItem = (field, index) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    if (fileList && fileList[0]) {
      setFiles(prev => ({ ...prev, [name]: fileList[0] }));
    }
  };



  const handleSave = async () => {
    try {
      setLoadingUpdate(true);
      const formData = new FormData();
  
      // Append all simple fields
      Object.entries(editFormData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (Array.isArray(value)) {
            // Handle complex arrays (objects)
            if (key === 'careerProgression' || 
                key === 'notableCases' || 
                key === 'performanceMetrics' || 
                key === 'testimonials' || 
                key === 'education' || 
                key === 'researchPublications' || 
                key === 'awards') {
              // Stringify the entire array and send as single field
              formData.append(key, JSON.stringify(value));
            } else {
              // Handle simple arrays (strings)
              formData.append(key, JSON.stringify(value));
            }
          } else {
            // Append simple values
            formData.append(key, value);
          }
        }
      });
  
      // Append files if they exist
      if (files.image) formData.append('image', files.image);
      if (files.bgimage) formData.append('bgimage', files.bgimage);
  
      const res = await axios.put(
        `${host}/api/doctors/updatedoctor/${docid}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token ? `Bearer ${token}` : '',  

          }
        }
      );
      
      if (res.data.success) {
        setDoctor(res.data.doctor);
        toast.success('Profile updated successfully!');
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating doctor:', error);
      toast.error(`Failed to update profile: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoadingUpdate(false);
    }
  };

  const cancelEdit = () => {
    if (doctor) {
      setEditFormData({
        name: doctor.name || '',
        email: doctor.email || '',
        bio: doctor.bio || '',
        address: doctor.address || '',
        phone: doctor.phone || '',
        licenseNo: doctor.licenseNo || '',
        about: doctor.about || '',
        experience: doctor.experience || '',
        totalPatients: doctor.totalPatients || '',
        hourlyPrice: doctor.hourlyPrice || '',
        location: doctor.location || '',
        username: doctor.username || '',
        employmentType: doctor.employmentType || 'Full-time',
        portfolio: doctor.portfolio || '',
        availability: doctor.availability || 'Available',
        skills: doctor.skills || [],
        careerProgression: doctor.careerProgression || [],
        notableCases: doctor.notableCases || [],
        performanceMetrics: doctor.performanceMetrics || [],
        testimonials: doctor.testimonials || [],
        education: doctor.education || [],
        certifications: doctor.certifications || [],
        languages: doctor.languages || [],
        researchPublications: doctor.researchPublications || [],
        awards: doctor.awards || [],
        professionalMemberships: doctor.professionalMemberships || []
      });
    }
    setFiles({ image: null, bgimage: null });
    setIsEditing(false);
  };

  if (!doctor && !isEditing) {
    return <div className="min-h-screen flex items-center justify-center">Loading profile...</div>;
  }

  
  const renderSkillDistributionChart = () => {
    const data = (doctor?.skills?.length > 0) 
      ? doctor.skills.map(skill => ({ name: skill, value: 100/doctor.skills.length }))
      : skillDistributionData;
    
    if (!data) return <div>No skill data available</div>;
    
    return (
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
        </PieChart>
      </ResponsiveContainer>
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50 mt-[]">
      {/* Medical-themed background */}
     
      {/* Header Section with Medical Design */}
      <div className="relative bg-gradient-to-r from-blue-50 to-blue-100 h-48 md:h-64 rounded-b-3xl shadow-sm overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-blue-500"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="flex justify-end pt-4">
            <div className="flex space-x-2">
              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition">
                <FiBookmark />
              </button>
              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition">
                <FiShare2 />
              </button>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition"
                >
                  <FiEdit />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="bg-white rounded-xl shadow-md -mt-20 md:-mt-24 relative z-20 overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex flex-col items-center md:items-start">
                <img
                  src={doctor?.image || '/default-profile.jpg'}
                  alt="Profile"
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
              </div>

              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={editFormData.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>


                    <div className="mb-8">
  <h3 className="text-lg font-medium text-gray-800 mb-4">Skills</h3>
  {editFormData.skills.map((skill, index) => (
    <div key={index} className="flex items-center gap-2 mb-2">
      <input
        type="text"
        value={skill}
        onChange={(e) => {
          const newSkills = [...editFormData.skills];
          newSkills[index] = e.target.value;
          setEditFormData(prev => ({ ...prev, skills: newSkills }));
        }}
        className="flex-1 p-2 border rounded-lg"
      />
      <button 
        onClick={() => {
          const newSkills = [...editFormData.skills];
          newSkills.splice(index, 1);
          setEditFormData(prev => ({ ...prev, skills: newSkills }));
        }}
        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
      >
        Remove
      </button>
    </div>
  ))}
  <button 
    onClick={() => {
      setEditFormData(prev => ({ 
        ...prev, 
        skills: [...prev.skills, 'New Skill'] 
      }));
    }}
    className="mt-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
  >
    Add Skill
  </button>
</div>

<div className="mb-8">
  <h3 className="text-lg font-medium text-gray-800 mb-4">Notable Cases</h3>
  {editFormData.notableCases?.map((caseItem, index) => (
    <div key={index} className="mb-4 p-4 border rounded-lg bg-gray-50">
      <div className="flex flex-col gap-3">
        <input
          type="text"
          value={caseItem.title}
          onChange={(e) => {
            const newCases = [...editFormData.notableCases];
            newCases[index] = { ...newCases[index], title: e.target.value };
            setEditFormData(prev => ({ ...prev, notableCases: newCases }));
          }}
          placeholder="Case title"
          className="p-2 border rounded-lg"
        />
        <input
          type="text"
          value={caseItem.year}
          onChange={(e) => {
            const newCases = [...editFormData.notableCases];
            newCases[index] = { ...newCases[index], year: e.target.value };
            setEditFormData(prev => ({ ...prev, notableCases: newCases }));
          }}
          placeholder="Year"
          className="p-2 border rounded-lg"
        />
        <textarea
          value={caseItem.description}
          onChange={(e) => {
            const newCases = [...editFormData.notableCases];
            newCases[index] = { ...newCases[index], description: e.target.value };
            setEditFormData(prev => ({ ...prev, notableCases: newCases }));
          }}
          placeholder="Case description"
          className="p-2 border rounded-lg"
          rows={3}
        />
        <div className="flex items-center gap-2">
        <input
          type="text"
          value={caseItem.tags?.join(', ') || ''}
          onChange={(e) => {
            // Store the raw input value without splitting
            const newCases = [...editFormData.notableCases];
            newCases[index] = { 
              ...newCases[index], 
              tags: e.target.value ? [e.target.value] : []
            };
            setEditFormData(prev => ({ ...prev, notableCases: newCases }));
          }}
          onBlur={(e) => {
            // Only split into multiple tags when input loses focus
            if (e.target.value) {
              const newCases = [...editFormData.notableCases];
              newCases[index] = { 
                ...newCases[index], 
                tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
              };
              setEditFormData(prev => ({ ...prev, notableCases: newCases }));
            }
          }}
          placeholder="Tags (comma separated)"
          className="flex-1 p-2 border rounded-lg"
        />
          <button 
            onClick={() => {
              const newCases = [...editFormData.notableCases];
              newCases.splice(index, 1);
              setEditFormData(prev => ({ ...prev, notableCases: newCases }));
            }}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  ))}
  <button 
    onClick={() => {
      setEditFormData(prev => ({ 
        ...prev, 
        notableCases: [
          ...prev.notableCases, 
          { title: '', description: '', year: '', tags: [] }
        ] 
      }));
    }}
    className="mt-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
  >
    Add Case
  </button>
</div>





<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
    <input
      type="email"
      name="email"
      value={editFormData.email}
      onChange={handleInputChange}
      className="w-full p-2 border rounded-lg"
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
    <input
      type="tel"
      name="phone"
      value={editFormData.phone}
      onChange={handleInputChange}
      className="w-full p-2 border rounded-lg"
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
    <input
      type="text"
      name="address"
      value={editFormData.address}
      onChange={handleInputChange}
      className="w-full p-2 border rounded-lg"
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
    <input
      type="text"
      name="licenseNo"
      value={editFormData.licenseNo}
      onChange={handleInputChange}
      className="w-full p-2 border rounded-lg"
    />
  </div>
</div>

{/* Professional Details Section */}
<div className="mb-6">
  <h3 className="text-lg font-medium text-gray-800 mb-4">Professional Details</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
      <input
        type="text"
        name="experience"
        value={editFormData.experience}
        onChange={handleInputChange}
        className="w-full p-2 border rounded-lg"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Total Patients</label>
      <input
        type="text"
        name="totalPatients"
        value={editFormData.totalPatients}
        onChange={handleInputChange}
        className="w-full p-2 border rounded-lg"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Price</label>
      <input
        type="text"
        name="hourlyPrice"
        value={editFormData.hourlyPrice}
        onChange={handleInputChange}
        className="w-full p-2 border rounded-lg"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
      <select
        name="availability"
        value={editFormData.availability}
        onChange={handleInputChange}
        className="w-full p-2 border rounded-lg"
      >
        <option value="Available">Available</option>
        <option value="Limited">Limited</option>
        <option value="Not Available">Not Available</option>
      </select>
    </div>
  </div>
</div>

<div className="mb-6">
  <label className="block text-sm font-medium text-gray-700 mb-1">About</label>
  <textarea
    name="about"
    value={editFormData.about}
    onChange={handleInputChange}
    className="w-full p-2 border rounded-lg min-h-24"
    rows="4"
  />
</div>
                    
<div className="mb-8">
  <h3 className="text-lg font-medium text-gray-800 mb-4">Career Progression</h3>
  {editFormData.careerProgression.map((item, index) => (
    <div key={index} className="mb-6 p-4 border rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
          <input
            type="text"
            value={item.year}
            onChange={(e) => handleArrayInputChange('careerProgression', index, 'year', e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="e.g. 2020"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <input
            type="text"
            value={item.role}
            onChange={(e) => handleArrayInputChange('careerProgression', index, 'role', e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="e.g. Senior Cardiologist"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
          <input
            type="text"
            value={item.company}
            onChange={(e) => handleArrayInputChange('careerProgression', index, 'company', e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="e.g. Mayo Clinic"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <input
            type="text"
            value={item.description}
            onChange={(e) => handleArrayInputChange('careerProgression', index, 'description', e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Brief description of your role"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Achievements</label>
        <div className="space-y-2">
          {(item.achievements || []).map((achievement, achievementIndex) => (
            <div key={achievementIndex} className="flex items-center gap-2">
              <input
                type="text"
                value={achievement}
                onChange={(e) => {
                  const newAchievements = [...(item.achievements || [])];
                  newAchievements[achievementIndex] = e.target.value;
                  handleArrayInputChange('careerProgression', index, 'achievements', newAchievements);
                }}
                className="flex-1 p-2 border rounded-lg"
                placeholder="e.g. Reduced surgery complications by 28%"
              />
              <button
                onClick={() => {
                  const newAchievements = [...(item.achievements || [])];
                  newAchievements.splice(achievementIndex, 1);
                  handleArrayInputChange('careerProgression', index, 'achievements', newAchievements);
                }}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              const newAchievements = [...(item.achievements || []), ''];
              handleArrayInputChange('careerProgression', index, 'achievements', newAchievements);
            }}
            className="mt-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
          >
            Add Achievement
          </button>
        </div>
      </div>

      <button 
        onClick={() => handleRemoveArrayItem('careerProgression', index)}
        className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
      >
        Remove Entry
      </button>
    </div>
  ))}
  <button 
    onClick={() => handleAddArrayItem('careerProgression', {
      year: '',
      role: '',
      description: '',
      company: '',
      achievements: []
    })}
    className="mt-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
  >
    Add Career Entry
  </button>
</div>
                    {/* Add similar input fields for other editable properties */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                      <textarea
                        name="bio"
                        value={editFormData.bio}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg min-h-24"
                      />
                    </div>
                    
                    {/* Add file input fields */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Profile Image
                      </label>
                      <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        disabled={loadingUpdate}
                        className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition ${
                          loadingUpdate ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        {loadingUpdate ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{doctor?.name}</h1>
                    </div>
                    {doctor?.location && (
                      <div className="mt-2 flex items-center text-gray-600">
                        <FiMapPin className="mr-1" />
                        <span>{doctor.location}</span>
                      </div>
                    )}
                    
                    <div className="mt-1 text-gray-600 flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                      <div className="flex items-center">
                        <span className="text-blue-600">@{doctor?.username}</span>
                      </div>
                      <div className="hidden md:block text-gray-300">•</div>
                      <div className="flex items-center">
                        <FiBriefcase className="mr-1" />
                        <span>{doctor?.role}</span>
                      </div>
                      <div className="hidden md:block text-gray-300">•</div>
                      <div>{doctor?.employmentType}</div>
                    </div>
                    <p className="mt-4 text-gray-600 max-w-2xl">{doctor?.bio}</p>
                    <div className="mt-4 flex items-center text-blue-600">
                      <FiLink className="mr-2" />
                      <a href="#" className="hover:underline">{doctor?.portfolio}</a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="mt-8 border-b border-gray-200">
              <nav className="flex space-x-8 overflow-x-auto scrollbar-hide">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-4 px-1 font-medium text-sm transition-colors ${
                    activeTab === 'overview'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('experience')}
                  className={`pb-4 px-1 font-medium text-sm transition-colors ${
                    activeTab === 'experience'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Experience
                </button>
                <button
                  onClick={() => setActiveTab('cases')}
                  className={`pb-4 px-1 font-medium text-sm transition-colors ${
                    activeTab === 'cases'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Notable Cases
                </button>
                <button
                  onClick={() => setActiveTab('skills')}
                  className={`pb-4 px-1 font-medium text-sm transition-colors ${
                    activeTab === 'skills'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Specializations
                </button>
                
                <button
                  onClick={() => setActiveTab('testimonials')}
                  className={`pb-4 px-1 font-medium text-sm transition-colors ${
                    activeTab === 'testimonials'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Testimonials
                </button>
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Skills Section */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FiActivity className="mr-2 text-blue-600" /> Specializations
            </h2>
            <div className="flex flex-wrap gap-2">
            {(doctor?.skills || []).slice(0, 5).map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm hover:bg-blue-100 transition">
                {skill}
              </span>
            ))}
          </div>
            <div className="mt-6">
              {renderSkillDistributionChart()}
            </div>
          </div>

                {/* Career Progression Preview */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <FiCalendar className="mr-2 text-blue-600" /> Career Progression
                  </h2>
                  <div className="space-y-4">
                    {doctor?.careerProgression.slice(-3).map((item, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-12 text-sm font-medium text-gray-500">
                          {item.year}
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="h-3 w-3 rounded-full bg-blue-500 mt-1"></div>
                          <div className="mt-1 border-l-2 border-dashed border-blue-200 pl-4 pb-4">
                            <h3 className="font-medium text-gray-900">{item.role}</h3>
                            <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="pt-2">
                      <button 
                        onClick={() => setActiveTab('experience')}
                        className="text-blue-600 text-sm hover:text-blue-800 transition"
                      >
                        View full history →
                      </button>
                    </div>
                  </div>
                </div>

                

              
                
              </div>
            )}

            


            {/* Experience Tab */}
            {activeTab === 'experience' && (
              <div className="space-y-8">
                {/* Timeline Chart */}
                

                {/* Employment History */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-800 mb-6">Employment History</h2>
                  
                  <div className="space-y-12">
                  {doctor?.careerProgression?.map((item, index) => (
                    <div key={index} className="relative">
                      {/* Timeline line */}
                      {index < doctor.careerProgression.length - 1 && (
                        <div className="absolute top-0 left-6 h-full w-0.5 bg-blue-100"></div>
                      )}
                      
                      <div className="flex gap-6">
                        {/* Timeline dot */}
                        <div className="relative flex items-center justify-center flex-shrink-0">
                          <div className="h-12 w-12 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center z-10">
                            <span className="text-blue-700 font-medium">{item.year}</span>
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="bg-gray-50 p-5 rounded-xl">
                            <h3 className="text-lg font-medium text-gray-900">{item.role}</h3>
                            <p className="text-blue-600 mt-1">{item.company}</p>
                            <p className="text-gray-600 mt-3">{item.description}</p>
                            
                            {/* Dynamically render achievements if they exist */}
                            {item.achievements?.length > 0 && (
                              <div className="mt-4 pt-4 border-t border-gray-200">
                                <h4 className="font-medium text-gray-800 mb-2">Key Achievements:</h4>
                                <ul className="list-disc list-inside text-gray-600 space-y-1">
                                  {item.achievements.map((achievement, achievementIndex) => (
                                    <li key={achievementIndex}>{achievement}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  </div>
                </div>

                
              </div>
            )}

            {/* Cases Tab */}
            {activeTab === 'cases' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {doctor.notableCases.map((medicalCase, index) => (
                    <div key={index} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition">
                      <div className="w-full h-48 bg-blue-50 flex items-center justify-center">
                        <FiHeart className="text-blue-200 w-16 h-16" />
                      </div>
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-gray-900">{medicalCase.title}</h3>
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {medicalCase.year}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{medicalCase.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {medicalCase.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center">
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                    View More Cases
                  </button>
                </div>
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <div className="space-y-8">
                {/* Specialization Distribution */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-800 mb-6">Specialization Distribution</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={skillDistributionData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            innerRadius={60}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {skillDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `${value}%`} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-4">
                      {skillDistributionData.map((specialty, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">{specialty.name}</span>
                            <span className="text-sm font-medium text-blue-600">{specialty.value}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full" 
                              style={{ width: `${specialty.value}%`, backgroundColor: COLORS[index % COLORS.length] }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* All Specializations */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-800 mb-6">All Specializations</h2>
                  <div className="flex flex-wrap gap-3">
                    {userData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          index < 5 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Competency Radar Chart */}
                
              </div>
            )}

            

            {/* Testimonials Tab */}
            {activeTab === 'testimonials' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {testimonialsData.map((testimonial, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                          <FiHeart className="text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium text-gray-900">{testimonial.author}</h3>
                          <p className="text-sm text-gray-500">{testimonial.position}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 italic">&quot;{testimonial.text}&quot;</p>
                      <div className="mt-4 flex">
                        {[...Array(5)].map((_, i) => (
                          <FiStar 
                            key={i} 
                            className={`${i < 4 ? 'text-yellow-400' : 'text-gray-300'} w-5 h-5`} 
                            fill={i < 4 ? 'currentColor' : 'none'}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Testimonial */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Request Endorsement</h2>
                  <p className="text-gray-600 mb-4">
                    Send a request to colleagues to endorse your skills or provide testimonials.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="Enter colleague's email" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea 
                        rows={3}
                        placeholder="Personalize your request message" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        defaultValue="Dear colleague, I would greatly appreciate your professional endorsement of my medical skills and expertise. Thank you for your support."
                      ></textarea>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      Send Request
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;



















