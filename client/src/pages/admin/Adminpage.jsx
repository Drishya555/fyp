/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { Menu, ChevronRight, Users, UserCheck, ShoppingBag, Calendar } from 'lucide-react';

// Mock data for charts
const userSignupData = [
  { name: 'March', count: 3 },
  { name: 'April', count: 27 },

];

const appointmentData = [
  { name: 'Week 1', completed: 65, cancelled: 12, pending: 23 },
  { name: 'Week 2', completed: 75, cancelled: 8, pending: 17 },
  { name: 'Week 3', completed: 85, cancelled: 10, pending: 20 },
  { name: 'Week 4', completed: 70, cancelled: 15, pending: 25 },
];

const medicineData = [
  { name: 'Pain Relief', value: 35 },
  { name: 'Antibiotics', value: 25 },
  { name: 'Vitamins', value: 20 },
  { name: 'Digestive', value: 15 },
  { name: 'Others', value: 5 },
];

const hospitalSpecializationData = [
  { subject: 'Cardiology', A: 90, fullMark: 100 },
  { subject: 'Neurology', A: 75, fullMark: 100 },
  { subject: 'Oncology', A: 80, fullMark: 100 },
  { subject: 'Pediatrics', A: 85, fullMark: 100 },
  { subject: 'Orthopedics', A: 70, fullMark: 100 },
  { subject: 'Gynecology', A: 65, fullMark: 100 },
];

const revenueData = [
  { name: 'Jan', medicine: 4000, appointments: 2400 },
  { name: 'Feb', medicine: 3000, appointments: 1398 },
  { name: 'Mar', medicine: 2000, appointments: 9800 },
  { name: 'Apr', medicine: 2780, appointments: 3908 },
  { name: 'May', medicine: 1890, appointments: 4800 },
  { name: 'Jun', medicine: 2390, appointments: 3800 },
  { name: 'Jul', medicine: 3490, appointments: 4300 },
];

const doctorRatingData = [
  { name: '5 Stars', value: 45 },
  { name: '4 Stars', value: 30 },
  { name: '3 Stars', value: 15 },
  { name: '2 Stars', value: 7 },
  { name: '1 Star', value: 3 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <div className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button onClick={toggleSidebar} className="md:hidden">
                  <Menu className="h-6 w-6 text-gray-500" />
                </button>
                <div className="hidden md:block ml-4">
                  <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard Overview</h1>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 bg-gray-50">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">Total Users</p>
                  <p className="text-2xl font-semibold text-gray-900">29</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm font-medium text-green-500">
                <span>+12.5%</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
                  <UserCheck className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">Doctors</p>
                  <p className="text-2xl font-semibold text-gray-900">5</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm font-medium text-green-500">
                <span>+5.2%</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">Appointments</p>
                  <p className="text-2xl font-semibold text-gray-900">27</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm font-medium text-green-500">
                <span>+8.1%</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
                  <ShoppingBag className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">Medicine Orders</p>
                  <p className="text-2xl font-semibold text-gray-900">3</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm font-medium text-green-500">
                <span>+15.3%</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* User Signup Chart */}
            <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">User Signups</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={userSignupData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="count"
                      stroke="#3b82f6"
                      fill="#93c5fd"
                      fillOpacity={0.5}
                      name="New Users"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Revenue Chart */}
            <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Revenue Overview</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={revenueData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="medicine"
                      stroke="#3b82f6"
                      activeDot={{ r: 8 }}
                      name="Medicine Sales"
                    />
                    <Line
                      type="monotone"
                      dataKey="appointments"
                      stroke="#10b981"
                      name="Appointment Revenue"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Appointment Status */}
            <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Appointment Status</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={appointmentData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completed" name="Completed" fill="#3b82f6" />
                    <Bar dataKey="cancelled" name="Cancelled" fill="#ef4444" />
                    <Bar dataKey="pending" name="Pending" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Medicine Categories */}
            <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Medicine Categories</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={medicineData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {medicineData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Hospital Specializations */}
            <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Hospital Specializations</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius={110} data={hospitalSpecializationData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name="Availability"
                      dataKey="A"
                      stroke="#3b82f6"
                      fill="#93c5fd"
                      fillOpacity={0.6}
                    />
                    <Tooltip />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Doctor Ratings */}
            <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Doctor Ratings Distribution</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={doctorRatingData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {doctorRatingData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}