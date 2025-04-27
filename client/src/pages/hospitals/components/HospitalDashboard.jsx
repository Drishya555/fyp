/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import { host } from '../../../host';
import AuthStore from '../../../hooks/authStore';
import axios from 'axios';


// Enhanced color palette
const COLORS = {
  primary: '#4F46E5',       // Indigo
  pending: '#FBBF24',       // Amber
  confirmed: '#3B82F6',     // Blue
  completed: '#10B981',     // Green
  cancelled: '#EF4444',     // Red
  secondary: '#8B5CF6',     // Purple
  accent: '#EC4899',        // Pink
  lightBg: '#F9FAFB',
  darkBg: '#1F2937'
};
      const token = AuthStore.getToken();


export default function HospitalDashboard() {
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hospitalData, setHospitalData] = useState(null);
  const hospitalId = AuthStore.getUser()?.userid;
  
 



  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${host}/api/appointment/getappointmentbyhospital/${hospitalId}`,{
          headers: {
            Authorization: token ? `Bearer ${token}` : '',  
          },
        });
        const data = await response.json();
        
        if (data.success) {
          setAppointmentsData(data.appointments);
        } else {
          setError(data.message || "Failed to fetch appointments");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };


    const fetchhospitaldata = async () => {
      const response = await axios.get(`${host}/api/hospital/getsinglehospital/${hospitalId}`,{
        headers: {
          Authorization: token ? `Bearer ${token}` : '',  
        },
      });
      setHospitalData(response.data.hospital)
    }

    fetchAppointments();
    fetchhospitaldata();
  }, [hospitalId]);

  // Calculate status data for the pie chart based on actual appointments
  const statusData = [
    { name: 'Pending', value: appointmentsData.filter(a => a.status === 'Pending').length, color: COLORS.pending },
    { name: 'Confirmed', value: appointmentsData.filter(a => a.status === 'Confirmed').length, color: COLORS.confirmed },
    { name: 'Completed', value: appointmentsData.filter(a => a.status === 'Completed').length, color: COLORS.completed },
    { name: 'Cancelled', value: appointmentsData.filter(a => a.status === 'Cancelled').length, color: COLORS.cancelled },
  ];

  // Get last 7 days for chart data
  const getLast7Days = () => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dates.push(d.toISOString().split('T')[0]);
    }
    return dates;
  };

  // Create trend data for the charts
  const trendData = getLast7Days().map(date => {
    const dayAppointments = appointmentsData.filter(a => 
      new Date(a.date).toISOString().split('T')[0] === date
    );
    
    return {
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      total: dayAppointments.length,
      pending: dayAppointments.filter(a => a.status === 'Pending').length,
      confirmed: dayAppointments.filter(a => a.status === 'Confirmed').length,
      completed: dayAppointments.filter(a => a.status === 'Completed').length,
      cancelled: dayAppointments.filter(a => a.status === 'Cancelled').length,
    };
  });


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-700 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md text-center">
          <div className="text-red-500 mb-4">
            <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-3 text-gray-800">Error Loading Data</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Stat Card Component - Enhanced
  const StatCard = ({ title, value, icon, color, trend }) => (
    <div className={`bg-white rounded-xl shadow-sm p-5 border-l-4 ${color} hover:shadow-md transition-all duration-200`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <span className={color.replace('border', 'text')}>{icon}</span>
      </div>
      <div className="flex items-end">
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <div className={`ml-2 text-xs ${trend > 0 ? 'text-green-500' : 'text-red-500'} flex items-center`}>
            {trend > 0 ? (
              <>
                <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                </svg>
                {trend}%
              </>
            ) : (
              <>
                <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
                {Math.abs(trend)}%
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 sticky top-0 z-10">
        <div className="flex items-center">
          <img src={hospitalData?.image} alt="Hospital Logo" className="h-10 w-10 rounded bg-indigo-100 p-1" />
          <h1 className="ml-3 text-xl font-semibold text-gray-800">
            {hospitalData?.name} - Dashboard
          </h1>
        </div>
        
        
      </header>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-6">
        {/* Statistics Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Dashboard Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="Total Appointments" 
              value={appointmentsData.length} 
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
              color="border-indigo-500"
            />
            <StatCard 
              title="Pending" 
              value={appointmentsData.filter(a => a.status === 'Pending').length} 
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              color="border-amber-500"
            />
            <StatCard 
              title="Confirmed" 
              value={appointmentsData.filter(a => a.status === 'Confirmed').length} 
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
              color="border-blue-500"
            />
            <StatCard 
              title="Completed" 
              value={appointmentsData.filter(a => a.status === 'Completed').length} 
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              }
              color="border-green-500"
            />
          </div>
        </div>

        {/* Charts Section - Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Appointments by Status</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Appointments Trend (Last 7 Days)</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={trendData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="total" stroke="#4F46E5" fill="#C7D2FE" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Detailed Analytics</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            

            {/* Status Trend */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Status Trend (Last 7 Days)</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={trendData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="pending" stackId="1" stroke="#FBBF24" fill="#FBBF24" />
                    <Area type="monotone" dataKey="confirmed" stackId="1" stroke="#3B82F6" fill="#3B82F6" />
                    <Area type="monotone" dataKey="completed" stackId="1" stroke="#10B981" fill="#10B981" />
                    <Area type="monotone" dataKey="cancelled" stackId="1" stroke="#EF4444" fill="#EF4444" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}