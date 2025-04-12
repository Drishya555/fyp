import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  User,
  Heart,
  Calendar,
  FileText,
  MessageSquare,
  Download,
  ChevronDown,
} from 'lucide-react';

// Placeholder data
const heartRateData = {
  week: [
    { day: 'Mon', bpm: 60 },
    { day: 'Tue', bpm: 62 },
    { day: 'Wed', bpm: 58 },
    { day: 'Thu', bpm: 65 },
    { day: 'Fri', bpm: 70 },
    { day: 'Sat', bpm: 68 },
    { day: 'Sun', bpm: 64 },
  ],
  month: [
    { week: 'W1', bpm: 60 },
    { week: 'W2', bpm: 55 },
    { week: 'W3', bpm: 80 },
    { week: 'W4', bpm: 50 },
  ],
  year: [
    { month: 'Jan', bpm: 65 },
    { month: 'Feb', bpm: 60 },
    { month: 'Mar', bpm: 70 },
    { month: 'Apr', bpm: 55 },
    { month: 'May', bpm: 75 },
    { month: 'Jun', bpm: 68 },
    { month: 'Jul', bpm: 60 },
    { month: 'Aug', bpm: 55 },
    { month: 'Sep', bpm: 80 },
    { month: 'Oct', bpm: 50 },
    { month: 'Nov', bpm: 75 },
    { month: 'Dec', bpm: 65 },
  ],
};

const bloodPressureData = {
  week: [
    { day: 'Mon', systolic: 120, diastolic: 80 },
    { day: 'Tue', systolic: 118, diastolic: 78 },
    { day: 'Wed', systolic: 122, diastolic: 82 },
    { day: 'Thu', systolic: 125, diastolic: 85 },
    { day: 'Fri', systolic: 123, diastolic: 83 },
    { day: 'Sat', systolic: 121, diastolic: 81 },
    { day: 'Sun', systolic: 120, diastolic: 80 },
  ],
  month: [
    { week: 'W1', systolic: 120, diastolic: 80 },
    { week: 'W2', systolic: 118, diastolic: 78 },
    { week: 'W3', systolic: 130, diastolic: 85 },
    { week: 'W4', systolic: 115, diastolic: 75 },
  ],
  year: [
    { month: 'Jan', systolic: 122, diastolic: 82 },
    { month: 'Feb', systolic: 120, diastolic: 80 },
    { month: 'Mar', systolic: 125, diastolic: 85 },
    { month: 'Apr', systolic: 118, diastolic: 78 },
    { month: 'May', systolic: 130, diastolic: 88 },
    { month: 'Jun', systolic: 115, diastolic: 75 },
    { month: 'Jul', systolic: 120, diastolic: 80 },
    { month: 'Aug', systolic: 118, diastolic: 78 },
    { month: 'Sep', systolic: 130, diastolic: 85 },
    { month: 'Oct', systolic: 115, diastolic: 75 },
    { month: 'Nov', systolic: 125, diastolic: 82 },
    { month: 'Dec', systolic: 122, diastolic: 79 },
  ],
};

const timelineData = [
  {
    id: 1,
    type: 'appointment',
    date: 'Mar 15, 2025',
    title: 'Cardiology Checkup',
    details: 'With Dr. Emily Smith. Reviewed heart function and adjusted medication.',
  },
  {
    id: 2,
    type: 'diagnosis',
    date: 'Feb 10, 2025',
    title: 'Heart Failure',
    details: 'Diagnosed with stage II heart failure. Prescribed beta-blockers.',
  },
  {
    id: 3,
    type: 'appointment',
    date: 'Jan 20, 2025',
    title: 'Pulmonary Follow-up',
    details: 'With Dr. Sarah Lee. Discussed asthma management plan.',
  },
  {
    id: 4,
    type: 'diagnosis',
    date: 'Aug 15, 2024',
    title: 'Pneumonia',
    details: 'Treated with antibiotics. Full recovery confirmed.',
  },
];

const MedicalRecord = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('year');
  const [expandedTimelineItem, setExpandedTimelineItem] = useState(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTimelineItem = (id) => setExpandedTimelineItem(expandedTimelineItem === id ? null : id);

  return (
    <div className="min-h-screen bg-gray-100 font-inter text-gray-900 antialiased">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
              aria-label="Toggle sidebar"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">Medical Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Ethan Miller</span>
            <img
              src="https://www.racefans.net/wp-content/uploads/2024/07/racefansdotnet-7448390_HiRes.jpg"
              alt="Ethan Miller"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200"
            />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg lg:static lg:block lg:shadow-none"
            >
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                <nav className="mt-6 space-y-2">
                  {[
                    { icon: User, label: 'Profile' },
                    { icon: Heart, label: 'Vitals' },
                    { icon: Calendar, label: 'Appointments' },
                    { icon: FileText, label: 'Records' },
                  ].map((item, index) => (
                    <button
                      key={index}
                      className="flex items-center w-full p-3 text-left text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      <item.icon size={20} className="mr-3" />
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Patient Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm p-6 border border-gray-100 lg:col-span-1"
            >
              <h3 className="text-lg font-semibold text-gray-900">Patient Summary</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://www.racefans.net/wp-content/uploads/2024/07/racefansdotnet-7448390_HiRes.jpg"
                    alt="Ethan Miller"
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Ethan Miller</p>
                    <p className="text-xs text-gray-500">ID: #9834A-43</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">DOB:</span> 15.05.1969
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Age:</span> 55 y.o.
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Gender:</span> Male
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Email:</span> ethan.miller@gmail.com
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Phone:</span> 555-723-4567
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Allergies</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {['Metformin', 'Aspirin', 'Strawberry'].map((allergy) => (
                      <span
                        key={allergy}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                      >
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Vitals: Heart Rate */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm p-6 border border-gray-100 md:col-span-2"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Heart Rate</h3>
                <div className="flex space-x-2">
                  {['week', 'month', 'year'].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        timeRange === range
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {range.charAt(0).toUpperCase() + range.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={heartRateData[timeRange]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey={timeRange === 'week' ? 'day' : timeRange === 'month' ? 'week' : 'month'}
                      stroke="#64748b"
                      fontSize={12}
                    />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        border: 'none',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="bpm"
                      stroke="#f43f5e"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Vitals: Blood Pressure */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm p-6 border border-gray-100 md:col-span-2"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Blood Pressure</h3>
                <div className="flex space-x-2">
                  {['week', 'month', 'year'].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        timeRange === range
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {range.charAt(0).toUpperCase() + range.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={bloodPressureData[timeRange]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey={timeRange === 'week' ? 'day' : timeRange === 'month' ? 'week' : 'month'}
                      stroke="#64748b"
                      fontSize={12}
                    />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        border: 'none',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="systolic"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Systolic"
                    />
                    <Line
                      type="monotone"
                      dataKey="diastolic"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Diastolic"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm p-6 border border-gray-100 lg:col-span-1"
            >
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              <div className="mt-4 space-y-3">
                <button className="flex items-center w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  <Calendar size={20} className="mr-3" />
                  Schedule Appointment
                </button>
                <button className="flex items-center w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                  <MessageSquare size={20} className="mr-3" />
                  Message Doctor
                </button>
                <button className="flex items-center w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                  <Download size={20} className="mr-3" />
                  Download Records
                </button>
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm p-6 border border-gray-100 md:col-span-2 lg:col-span-3"
            >
              <h3 className="text-lg font-semibold text-gray-900">Health Timeline</h3>
              <div className="mt-6 space-y-4">
                {timelineData.length > 0 ? (
                  timelineData.map((item) => (
                    <div
                      key={item.id}
                      className="relative pl-8 pb-4 border-l-2 border-gray-200"
                    >
                      <div className="absolute -left-2 top-2 w-4 h-4 bg-blue-600 rounded-full"></div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.title}</p>
                          <p className="text-xs text-gray-500">
                            {item.date} • {item.type === 'appointment' ? 'Appointment' : 'Diagnosis'}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleTimelineItem(item.id)}
                          className="p-2 rounded-full hover:bg-gray-100"
                        >
                          <ChevronDown
                            size={20}
                            className={`transform transition-transform duration-200 ${
                              expandedTimelineItem === item.id ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      </div>
                      <AnimatePresence>
                        {expandedTimelineItem === item.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-2 text-sm text-gray-600"
                          >
                            {item.details}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No timeline events available.</p>
                )}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MedicalRecord;
















































































