import { useState } from 'react';
import {
  LineChart, Line, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell
} from 'recharts';

// Sample data
const patientData = [
  { month: 'Jan', inpatient: 320, outpatient: 240, emergency: 180 },
  { month: 'Feb', inpatient: 300, outpatient: 230, emergency: 200 },
  { month: 'Mar', inpatient: 340, outpatient: 260, emergency: 220 },
  { month: 'Apr', inpatient: 380, outpatient: 290, emergency: 230 },
  { month: 'May', inpatient: 400, outpatient: 310, emergency: 210 },
  { month: 'Jun', inpatient: 420, outpatient: 350, emergency: 190 },
];

const departmentData = [
  { name: 'Cardiology', value: 30 },
  { name: 'Orthopedics', value: 25 },
  { name: 'Neurology', value: 15 },
  { name: 'Pediatrics', value: 20 },
  { name: 'Oncology', value: 10 },
];


const recentPatients = [
  { id: 'P-7291', name: 'Emma Watson', status: 'Admitted', dept: 'Cardiology' },
  { id: 'P-6423', name: 'James Smith', status: 'Discharged', dept: 'Orthopedics' },
  { id: 'P-9053', name: 'Robert Chen', status: 'ER', dept: 'Emergency' },
  { id: 'P-4182', name: 'Sophia Garcia', status: 'Admitted', dept: 'Neurology' },
];

const doctorSchedules = [
  { time: '09:00', doctor: 'Dr. Johnson', patient: 'Emma Watson', room: '302' },
  { time: '10:30', doctor: 'Dr. Miller', patient: 'David Clark', room: '205' },
  { time: '11:45', doctor: 'Dr. Zhang', patient: 'Sofia Lopez', room: '118' },
  { time: '13:15', doctor: 'Dr. Johnson', patient: 'Michael Brown', room: '302' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function HospitalDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  // Stat Card Component
  // eslint-disable-next-line react/prop-types
  const StatCard = ({ title, value, icon, change }) => (
    <div className="bg-white rounded-lg shadow p-5 flex flex-col border-l-4 border-blue-500">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <span className="text-blue-500">{icon}</span>
      </div>
      <div className="flex items-baseline">
        <div className="text-2xl font-bold mr-2">{value}</div>
        <div className={`text-xs ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
        </div>
      </div>
    </div>
  );
  
  // Patient Card Component
  // eslint-disable-next-line react/prop-types
  const PatientCard = ({ id, name, status, dept }) => (
    <div className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
      <div className="flex items-center">
        <div className="bg-blue-100 rounded-full p-2 mr-3">
          <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        </div>
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-xs text-gray-500">{id} • {dept}</div>
        </div>
      </div>
      <span className={`px-2 py-1 rounded-full text-xs ${
        status === 'Admitted' ? 'bg-green-100 text-green-800' :
        status === 'Discharged' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
      }`}>
        {status}
      </span>
    </div>
  );

  // Schedule Item Component
  // eslint-disable-next-line react/prop-types
  const ScheduleItem = ({ time, doctor, patient, room }) => (
    <div className="flex items-center p-3 border-b border-gray-100">
      <div className="bg-blue-50 text-blue-500 rounded p-2 font-medium w-16 text-center mr-3">
        {time}
      </div>
      <div>
        <div className="font-medium">{doctor}</div>
        <div className="text-xs text-gray-500">{patient} • Room {room}</div>
      </div>
    </div>
  );

  // Render content based on active tab
  const renderContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <>
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatCard 
                title="Total Patients" 
                value="1,248" 
                icon={
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                }
                change={5.3}
              />
              <StatCard 
                title="Bed Occupancy" 
                value="82%" 
                icon={
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                  </svg>
                }
                change={2.1}
              />
              <StatCard 
                title="Avg Wait Time" 
                value="24 min" 
                icon={
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                }
                change={-8.4}
              />
              <StatCard 
                title="Monthly Revenue" 
                value="$57K" 
                icon={
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                }
                change={8.2}
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-5">
                <h2 className="text-lg font-medium mb-4 text-gray-700">Patient Admissions</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={patientData}
                      margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="inpatient" stroke="#3B82F6" strokeWidth={2} />
                      <Line type="monotone" dataKey="outpatient" stroke="#10B981" strokeWidth={2} />
                      <Line type="monotone" dataKey="emergency" stroke="#F59E0B" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-5">
                <h2 className="text-lg font-medium mb-4 text-gray-700">Department Distribution</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={departmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {departmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Recent Patients & Schedule */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-5">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-700">Recent Patients</h2>
                  <button className="text-blue-500 text-sm hover:underline">View All</button>
                </div>
                <div className="space-y-3">
                  {recentPatients.map((patient, index) => (
                    <PatientCard key={index} {...patient} />
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-5">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-700">Today&apos;s Schedule</h2>
                  <button className="text-blue-500 text-sm hover:underline">Full Schedule</button>
                </div>
                <div>
                  {doctorSchedules.map((schedule, index) => (
                    <ScheduleItem key={index} {...schedule} />
                  ))}
                </div>
              </div>
            </div>
          </>
        );
      case 'patients':
        return (
          <div className="bg-white rounded-lg shadow p-5">
            <h2 className="text-lg font-medium mb-4 text-gray-700">Patient Management</h2>
            <p>Patient data and management tools would appear here.</p>
          </div>
        );
      case 'departments':
        return (
          <div className="bg-white rounded-lg shadow p-5">
            <h2 className="text-lg font-medium mb-4 text-gray-700">Department Overview</h2>
            <p>Department details and analytics would appear here.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow p-5">
            <h2 className="text-lg font-medium mb-4 text-gray-700">Dashboard Settings</h2>
            <p>Settings and configuration options would appear here.</p>
          </div>
        );
      default:
        return <div>Select a tab</div>;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
              <h1 className="ml-2 text-xl font-bold text-gray-900">MediAid</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
              </button>
              <img className="h-8 w-8 rounded-full" src="/api/placeholder/32/32" alt="User" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs Navigation */}
        <div className="bg-white rounded-lg shadow mb-6 flex">
          <button 
            onClick={() => setActiveTab('overview')} 
            className={`px-4 py-3 text-sm font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-500'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('patients')} 
            className={`px-4 py-3 text-sm font-medium ${activeTab === 'patients' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-500'}`}
          >
            Patients
          </button>
          <button 
            onClick={() => setActiveTab('doctors')} 
            className={`px-4 py-3 text-sm font-medium ${activeTab === 'departments' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-500'}`}
          >
            Doctors
          </button>
          
        </div>

        {/* Content Area */}
        {renderContent()}
      </main>
    </div>
  );
}