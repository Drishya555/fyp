import { useState } from 'react';
import { FiMessageSquare, FiShare2, FiEdit, FiBookmark, FiAward, FiLink, FiDownload, FiMapPin, FiBriefcase, FiCalendar, FiStar, FiActivity, FiHeart } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

// Sample medical data for charts
const experienceData = [
  { name: '2018', patients: 1200 },
  { name: '2019', patients: 1800 },
  { name: '2020', patients: 2500 },
  { name: '2021', patients: 3200 },
  { name: '2022', patients: 4000 },
];

const skillDistributionData = [
  { name: 'Cardiology', value: 35 },
  { name: 'General Surgery', value: 25 },
  { name: 'Pediatrics', value: 20 },
  { name: 'Neurology', value: 15 },
  { name: 'Emergency Medicine', value: 5 },
];

// Career progression data for timeline chart
const careerProgressionData = [
  { year: '2016', level: 1, role: 'Resident Physician', description: 'Started medical residency at City General Hospital', company: 'City General Hospital' },
  { year: '2017', level: 2, role: 'Fellow in Cardiology', description: 'Specialized training in cardiology at Metropolitan Medical Center', company: 'Metropolitan Medical Center' },
  { year: '2018', level: 3, role: 'Attending Physician', description: 'Joined Mayo Clinic as an attending cardiologist', company: 'Mayo Clinic' },
  { year: '2020', level: 4, role: 'Senior Cardiologist', description: 'Promoted to lead cardiology team of 8 physicians', company: 'Mayo Clinic' },
  { year: '2022', level: 5, role: 'Chief of Cardiology', description: 'Appointed Chief of Cardiology Department overseeing 25 staff', company: 'Mayo Clinic' }
];

// Medical cases showcase data
const caseShowcaseData = [
  {
    title: 'Innovative Heart Valve Procedure',
    description: 'Pioneered minimally invasive valve replacement technique reducing recovery time by 40%',
    year: '2022',
    image: '/medical-heart-valve.jpg',
    tags: ['Cardiology', 'Surgery', 'Innovation']
  },
  {
    title: 'Pediatric Cardiac Care Program',
    description: 'Developed comprehensive care program for children with congenital heart defects',
    year: '2021',
    image: '/pediatric-cardiac.jpg',
    tags: ['Pediatrics', 'Cardiology', 'Program Development']
  },
  {
    title: 'Emergency Response Protocol',
    description: 'Created hospital-wide protocol for cardiac emergencies reducing response time by 35%',
    year: '2020',
    image: '/emergency-response.jpg',
    tags: ['Emergency Medicine', 'Protocol Development']
  }
];

// Performance metrics data
const performanceData = [
  { category: 'Patient Outcomes', score: 98 },
  { category: 'Surgical Success', score: 96 },
  { category: 'Diagnostic Accuracy', score: 95 },
  { category: 'Patient Satisfaction', score: 94 },
  { category: 'Research Publications', score: 90 },
];

// Radar chart data for competencies
const competencyData = [
  { subject: 'Clinical Skills', A: 95, fullMark: 100 },
  { subject: 'Technical Skills', A: 90, fullMark: 100 },
  { subject: 'Leadership', A: 88, fullMark: 100 },
  { subject: 'Communication', A: 97, fullMark: 100 },
  { subject: 'Problem Solving', A: 93, fullMark: 100 },
  { subject: 'Teamwork', A: 94, fullMark: 100 },
];

// Testimonials data
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
  const [userData, setUserData] = useState({
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Medical-themed background */}
      <div className="fixed inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-blue-50" style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}></div>
      </div>

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
                  src="https://cdn.images.express.co.uk/img/dynamic/73/590x/secondary/Carlos-Sainz-Williams-6089152.jpg?r=1744380693575"
                  alt="Profile"
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <div className="flex mt-4 space-x-2 md:hidden">
                  <button className="flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
                    <FiMessageSquare className="mr-1" /> Message
                  </button>
                  <button className="flex items-center px-3 py-1 border border-blue-600 text-blue-600 text-sm rounded-lg hover:bg-blue-50 transition">
                    <FiDownload className="mr-1" /> CV
                  </button>
                </div>
              </div>

              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                      className="text-2xl font-bold text-gray-800 border p-2 rounded-lg w-full"
                    />
                    <div className="flex flex-col md:flex-row gap-3">
                      <input
                        type="text"
                        name="location"
                        value={userData.location}
                        onChange={handleInputChange}
                        className="text-gray-600 border p-2 rounded-lg flex-1"
                      />
                      <input
                        type="text"
                        name="username"
                        value={userData.username}
                        onChange={handleInputChange}
                        className="text-gray-600 border p-2 rounded-lg flex-1"
                      />
                    </div>
                    <div className="flex flex-col md:flex-row gap-3">
                      <input
                        type="text"
                        name="role"
                        value={userData.role}
                        onChange={handleInputChange}
                        className="text-gray-600 border p-2 rounded-lg flex-1"
                      />
                      <input
                        type="text"
                        name="employmentType"
                        value={userData.employmentType}
                        onChange={handleInputChange}
                        className="text-gray-600 border p-2 rounded-lg flex-1"
                      />
                    </div>
                    <textarea
                      name="bio"
                      value={userData.bio}
                      onChange={handleInputChange}
                      className="text-gray-600 border p-2 rounded-lg w-full min-h-24"
                      placeholder="Your bio"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{userData.name}</h1>
                      <div className="hidden md:flex mt-4 md:mt-0 space-x-3">
                        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                          <FiMessageSquare className="mr-2" /> Message
                        </button>
                        <button className="flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
                          <FiDownload className="mr-2" /> CV
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-gray-600">
                      <FiMapPin className="mr-1" />
                      <span>{userData.location}</span>
                    </div>
                    <div className="mt-1 text-gray-600 flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                      <div className="flex items-center">
                        <span className="text-blue-600">{userData.username}</span>
                      </div>
                      <div className="hidden md:block text-gray-300">•</div>
                      <div className="flex items-center">
                        <FiBriefcase className="mr-1" />
                        <span>{userData.role}</span>
                      </div>
                      <div className="hidden md:block text-gray-300">•</div>
                      <div>{userData.employmentType}</div>
                    </div>
                    <p className="mt-4 text-gray-600 max-w-2xl">{userData.bio}</p>
                    <div className="mt-4 flex items-center text-blue-600">
                      <FiLink className="mr-2" />
                      <a href="#" className="hover:underline">{userData.portfolio}</a>
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
                  onClick={() => setActiveTab('metrics')}
                  className={`pb-4 px-1 font-medium text-sm transition-colors ${
                    activeTab === 'metrics'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Performance
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
                    {userData.skills.slice(0, 5).map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm hover:bg-blue-100 transition"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6">
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={skillDistributionData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
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
                </div>

                {/* Career Progression Preview */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <FiCalendar className="mr-2 text-blue-600" /> Career Progression
                  </h2>
                  <div className="space-y-4">
                    {careerProgressionData.slice(-3).map((item, index) => (
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

                {/* Cases Preview */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <FiHeart className="mr-2 text-blue-600" /> Notable Case
                  </h2>
                  <div className="space-y-4">
                    <div className="w-full h-40 bg-blue-50 rounded-lg flex items-center justify-center">
                      <FiHeart className="text-blue-200 w-16 h-16" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{caseShowcaseData[0].title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{caseShowcaseData[0].description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {caseShowcaseData[0].tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Performance Preview */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <FiAward className="mr-2 text-blue-600" /> Performance Highlights
                  </h2>
                  <div className="space-y-4">
                    {performanceData.slice(0, 3).map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">{item.category}</span>
                          <span className="text-sm font-medium text-blue-600">{item.score}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${item.score}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                    <div className="pt-2">
                      <button 
                        onClick={() => setActiveTab('metrics')}
                        className="text-blue-600 text-sm hover:text-blue-800 transition"
                      >
                        View all metrics →
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
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-800 mb-6">Career Timeline</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={careerProgressionData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={(value) => {
                        const roles = {
                          1: 'Resident',
                          2: 'Fellow',
                          3: 'Attending',
                          4: 'Senior',
                          5: 'Chief'
                        };
                        return roles[value] || value;
                      }} />
                      <Tooltip 
                        formatter={(value) => {
                          const item = careerProgressionData.find(d => d.level === value);
                          return [item ? item.role : value, 'Position'];
                        }}
                        labelFormatter={(label) => `Year: ${label}`}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="level" 
                        name="Career Progression" 
                        stroke="#3B82F6" 
                        strokeWidth={3}
                        dot={{ fill: '#2563EB', strokeWidth: 2, r: 6 }}
                        activeDot={{ fill: '#1E40AF', strokeWidth: 0, r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Employment History */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-800 mb-6">Employment History</h2>
                  
                  <div className="space-y-12">
                    {careerProgressionData.map((item, index) => (
                      <div key={index} className="relative">
                        {/* Timeline line */}
                        {index < careerProgressionData.length - 1 && (
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
                              
                              {item.year === '2022' && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                  <h4 className="font-medium text-gray-800 mb-2">Key Achievements:</h4>
                                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                                    <li>Reduced cardiac surgery complications by 28%</li>
                                    <li>Implemented new patient monitoring system improving outcomes</li>
                                    <li>Published 12 peer-reviewed papers in cardiology journals</li>
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

                {/* Patients Treated Over Time */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-800 mb-6">Patients Treated Over Time</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={experienceData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }} />
                      <Bar dataKey="patients" name="Patients Treated" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Cases Tab */}
            {activeTab === 'cases' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {caseShowcaseData.map((medicalCase, index) => (
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
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-800 mb-6">Core Competencies</h2>
                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={competencyData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar
                        name="Dr. Sainz"
                        dataKey="A"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        fillOpacity={0.4}
                      />
                      <Tooltip />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Performance Metrics Tab */}
            {activeTab === 'metrics' && (
              <div className="space-y-8">
                {/* Performance Scores */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-800 mb-6">Performance Metrics</h2>
                  <div className="space-y-6">
                    {performanceData.map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium text-gray-700">{item.category}</span>
                          <span className="font-medium text-blue-600">{item.score}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-blue-600 h-3 rounded-full" 
                            style={{ width: `${item.score}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Yearly Performance */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-800 mb-6">Yearly Performance</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={[
                        { year: '2018', performance: 85 },
                        { year: '2019', performance: 88 },
                        { year: '2020', performance: 90 },
                        { year: '2021', performance: 93 },
                        { year: '2022', performance: 96 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                      <XAxis dataKey="year" />
                      <YAxis domain={[80, 100]} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Performance']} />
                      <Bar dataKey="performance" name="Performance" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Peer Comparison */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-800 mb-6">Peer Comparison</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={[
                        { category: 'Surgical Outcomes', you: 98, peers: 89 },
                        { category: 'Patient Satisfaction', you: 94, peers: 86 },
                        { category: 'Research Output', you: 90, peers: 75 },
                        { category: 'Diagnostic Accuracy', you: 95, peers: 88 },
                        { category: 'Emergency Response', you: 92, peers: 85 },
                      ]}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis type="number" domain={[70, 100]} />
                      <YAxis dataKey="category" type="category" />
                      <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
                      <Legend />
                      <Bar dataKey="you" name="You" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                      <Bar dataKey="peers" name="Peer Average" fill="#93C5FD" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
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