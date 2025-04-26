// /* eslint-disable react/prop-types */
// import { useState, useEffect} from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
// import {
//   Heart,
//   Calendar,
//   ChevronDown,
//   Clock,
//   Pill,
//   Activity,
//   Download,
//   MessageSquare,
//   FileText
// } from 'lucide-react';
//  import Authstore from '../hooks/authStore.js';
//  import {host} from '../host.js';
//  import axios from 'axios';

// // Placeholder data
// const heartRateData = {
//   week: [
//     { day: 'Mon', bpm: 60, min: 55, max: 75 },
//     { day: 'Tue', bpm: 62, min: 57, max: 78 },
//     { day: 'Wed', bpm: 58, min: 52, max: 72 },
//     { day: 'Thu', bpm: 65, min: 58, max: 82 },
//     { day: 'Fri', bpm: 70, min: 63, max: 86 },
//     { day: 'Sat', bpm: 68, min: 60, max: 84 },
//     { day: 'Sun', bpm: 64, min: 58, max: 79 },
//   ],
//   month: [
//     { week: 'W1', bpm: 60, min: 54, max: 78 },
//     { week: 'W2', bpm: 55, min: 50, max: 72 },
//     { week: 'W3', bpm: 80, min: 70, max: 90 },
//     { week: 'W4', bpm: 50, min: 45, max: 65 },
//   ],
//   year: [
//     { month: 'Jan', bpm: 65, min: 58, max: 79 },
//     { month: 'Feb', bpm: 60, min: 54, max: 75 },
//     { month: 'Mar', bpm: 70, min: 62, max: 85 },
//     { month: 'Apr', bpm: 55, min: 50, max: 72 },
//     { month: 'May', bpm: 75, min: 65, max: 89 },
//     { month: 'Jun', bpm: 68, min: 60, max: 82 },
//     { month: 'Jul', bpm: 60, min: 54, max: 76 },
//     { month: 'Aug', bpm: 55, min: 50, max: 72 },
//     { month: 'Sep', bpm: 80, min: 70, max: 95 },
//     { month: 'Oct', bpm: 50, min: 45, max: 68 },
//     { month: 'Nov', bpm: 75, min: 65, max: 88 },
//     { month: 'Dec', bpm: 65, min: 58, max: 80 },
//   ],
// };

// const bloodPressureData = {
//   week: [
//     { day: 'Mon', systolic: 120, diastolic: 80 },
//     { day: 'Tue', systolic: 118, diastolic: 78 },
//     { day: 'Wed', systolic: 122, diastolic: 82 },
//     { day: 'Thu', systolic: 125, diastolic: 85 },
//     { day: 'Fri', systolic: 123, diastolic: 83 },
//     { day: 'Sat', systolic: 121, diastolic: 81 },
//     { day: 'Sun', systolic: 120, diastolic: 80 },
//   ],
//   month: [
//     { week: 'W1', systolic: 120, diastolic: 80 },
//     { week: 'W2', systolic: 118, diastolic: 78 },
//     { week: 'W3', systolic: 130, diastolic: 85 },
//     { week: 'W4', systolic: 115, diastolic: 75 },
//   ],
//   year: [
//     { month: 'Jan', systolic: 122, diastolic: 82 },
//     { month: 'Feb', systolic: 120, diastolic: 80 },
//     { month: 'Mar', systolic: 125, diastolic: 85 },
//     { month: 'Apr', systolic: 118, diastolic: 78 },
//     { month: 'May', systolic: 130, diastolic: 88 },
//     { month: 'Jun', systolic: 115, diastolic: 75 },
//     { month: 'Jul', systolic: 120, diastolic: 80 },
//     { month: 'Aug', systolic: 118, diastolic: 78 },
//     { month: 'Sep', systolic: 130, diastolic: 85 },
//     { month: 'Oct', systolic: 115, diastolic: 75 },
//     { month: 'Nov', systolic: 125, diastolic: 82 },
//     { month: 'Dec', systolic: 122, diastolic: 79 },
//   ],
// };


// // eslint-disable-next-line react/prop-types
// const CustomTooltip = ({ active, payload, label }) => {
//   // eslint-disable-next-line react/prop-types
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
//         <p className="font-medium text-sm text-gray-900">{label}</p>
//         {payload.map((entry, index) => (
//           <p key={index} className="text-sm" style={{ color: entry.color }}>
//             {entry.name}: {entry.value}
//           </p>
//         ))}
//       </div>
//     );
//   }
//   return null;
// };

// // eslint-disable-next-line react/prop-types
// const CustomDot = ({ cx, cy, stroke }) => {
//   return (
//     <svg x={cx - 5} y={cy - 5} width="10" height="10" fill={stroke} viewBox="0 0 10 10">
//       <circle cx="5" cy="5" r="5" />
//     </svg>
//   );
// };

// const MedicalRecord = ({id}) => {
  
//   const [timeRange, setTimeRange] = useState('week');
//   const [expandedTimelineItem, setExpandedTimelineItem] = useState(null);
//   const [currentHeartRate] = useState(72);
//   const [currentBP] = useState({ systolic: 122, diastolic: 78 });
//   const [appointments, setAppointments] = useState([]);
 

//   const toggleTimelineItem = (id) => setExpandedTimelineItem(expandedTimelineItem === id ? null : id);

// const [user,setUser] = useState(null);
// const [medicines, setMedicines] = useState([]);

//   useEffect(()=>{
//     const getuser = async()=>{
//       const userid = Authstore.getUser()?.userid || null;
//       console.log(userid)
//       const response = await axios.get(`${host}/api/auth/getselecteduser/${userid}`);
//       setUser(response.data?.user)
//     }


//     const getuserappointments = async()=>{
//       const userid = Authstore.getUser()?.userid || null;
//       console.log(userid)
//       const response = await axios.get(`${host}/api/appointment/getappointmentbyuser/${userid}`);
//       setAppointments(response.data?.appointments)
//     }


//     const getuserprescriptions = async () => {
//         const userid = Authstore.getUser()?.userid || null;
//         const response = await axios.get(`${host}/api/prescriptions/user/${userid}`);
//                 const allMedications = response.data.prescriptions.flatMap(prescription => 
//           prescription.medication.map(med => ({
//             ...med,
//             prescriptionId: prescription._id,
//             prescribedBy: prescription.doctor.name,
//             prescribedDate: prescription.createdAt
//           }))
//         );
        
//         setMedicines(allMedications);
//         console.log(allMedications)
//     };

//     getuser();
//     getuserappointments();
//     getuserprescriptions();
//   },[])


//   return (  
//     <>
//     {!user ? (
//   <div className="flex flex-col items-center justify-center h-64">
//   <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//   </svg>
//   <p className="mt-3 text-gray-500">No medical record found. Kindly Sign in </p>
//   <a href="/login" className="mt-2 text-blue-600 hover:underline">Sign In</a>


//   </div>
// ) : (
//   <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 font-sans text-gray-900 antialiased">
//       {/* Header */}
//       <header className="sticky top-0 z-20 bg-white shadow-sm backdrop-blur-lg bg-white/90">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center">
//             <Heart className="h-6 w-6 text-blue-600 mr-2" />
//             <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">HealthTrack {id}</h1>
//           </div>
//           <div className="flex items-center space-x-4">
           
//             <div className="flex items-center space-x-3">
//               <div className="hidden md:block text-right">
//                 <p className="text-sm font-medium text-gray-900">{user?.name}</p>
//                 <p className="text-xs text-gray-500">Patient</p>
//               </div>
//               <div className="relative">
//                 <img
//                   src={`${user?.image}`}
//                   alt="profile pic"
//                   className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-100"
//                 />
//                 <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-8">
//         {/* Page Header */}
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold text-gray-900">Health Dashboard</h2>
//           <p className="mt-1 text-sm text-gray-600">
//             Welcome back, ${user?.name}. Here&apos;s your health overview 
//           </p>
//         </div>
        
//         {/* Quick Stats Cards */}
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
//           {/* Current Vitals Cards */}
//           <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center">
//             <div className="rounded-full bg-red-100 p-3 mr-4">
//               <Heart className="h-6 w-6 text-red-500" />
//             </div>
//             <div>
//               <p className="text-sm font-medium text-gray-500">Heart Rate</p>
//               <div className="flex items-baseline">
//                 <h3 className="text-2xl font-bold text-gray-900">{currentHeartRate}</h3>
//                 <span className="ml-1 text-sm text-gray-500">BPM</span>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center">
//             <div className="rounded-full bg-blue-100 p-3 mr-4">
//               <Activity className="h-6 w-6 text-blue-500" />
//             </div>
//             <div>
//               <p className="text-sm font-medium text-gray-500">Blood Pressure</p>
//               <div className="flex items-baseline">
//                 <h3 className="text-2xl font-bold text-gray-900">{currentBP.systolic}/{currentBP.diastolic}</h3>
//                 <span className="ml-1 text-sm text-gray-500">mmHg</span>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center">
//             <div className="rounded-full bg-green-100 p-3 mr-4">
//               <Clock className="h-6 w-6 text-green-500" />
//             </div>
//             <div>
//               <p className="text-sm font-medium text-gray-500">Next Appointment</p>
//               <div className="flex flex-col">
//                 <h3 className="text-base font-bold text-gray-900">Apr 20, 10:30 AM</h3>
//                 <p className="text-xs text-gray-500">Dr. Emily Smith</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center">
//             <div className="rounded-full bg-purple-100 p-3 mr-4">
//               <Pill className="h-6 w-6 text-purple-500" />
//             </div>
//             <div>
//               <p className="text-sm font-medium text-gray-500">Medications</p>
//               <div className="flex flex-col">
//                 <h3 className="text-base font-bold text-gray-900">3 Active</h3>
//                 <p className="text-xs text-gray-500">Next: Lisinopril at 8:00 PM</p>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
//           {/* Patient Summary */}
//           <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold text-gray-900">Patient Profile</h3>
//               <button className="text-blue-600 text-sm font-medium hover:text-blue-700">Edit</button>
//             </div>
//             <div className="flex items-center space-x-4 mb-6">
//               <div className="relative">
//                 <img
//                   src={`${user?.image}`}
//                   alt="profile pic"
//                   className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-100"
//                 />
//                 <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
//               </div>
//               <div>
//                 <p className="text-lg font-semibold text-gray-900">{user?.name}</p>
//                 <p className="text-sm text-gray-500">ID: {user?._id}</p>
//               </div>
//             </div>
            
//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="bg-gray-50 rounded-lg p-3">
//                   <p className="text-xs text-gray-500">Age</p>
//                   <p className="text-sm font-medium">55 years</p>
//                 </div>
//                 <div className="bg-gray-50 rounded-lg p-3">
//                   <p className="text-xs text-gray-500">Gender</p>
//                   <p className="text-sm font-medium">{user?.sex}</p>
//                 </div>
//                 <div className="bg-gray-50 rounded-lg p-3">
//                   <p className="text-xs text-gray-500">Blood Type</p>
//                   <p className="text-sm font-medium">{user?.blood}</p>
//                 </div>
//                 <div className="bg-gray-50 rounded-lg p-3">
//                   <p className="text-xs text-gray-500">Height</p>
//                   <p className="text-sm font-medium">5&apos;10&quot; (178cm)</p>
//                 </div>
//               </div>
              
//               <div>
//                 <h4 className="text-sm font-medium text-gray-700 mb-2">Allergies</h4>
//                 <div className="flex flex-wrap gap-2">
//                   {['Metformin', 'Aspirin', 'Strawberry'].map((allergy) => (
//                     <span
//                       key={allergy}
//                       className="px-3 py-1 bg-red-50 text-red-700 text-xs font-medium rounded-full"
//                     >
//                       {allergy}
//                     </span>
//                   ))}
//                 </div>
//               </div>
              
//               <div>
//                 <h4 className="text-sm font-medium text-gray-700 mb-2">Contact Information</h4>
//                 <div className="space-y-1">
//                   <p className="text-sm text-gray-700 flex items-center">
//                     <span className="font-medium w-20">Email:</span>
//                     <span className="text-gray-600">{user?.email}</span>
//                   </p>
//                   <p className="text-sm text-gray-700 flex items-center">
//                     <span className="font-medium w-20">Phone:</span>
//                     <span className="text-gray-600">555-723-4567</span>
//                   </p>
//                   <p className="text-sm text-gray-700 flex items-center">
//                     <span className="font-medium w-20">Emergency:</span>
//                     <span className="text-gray-600">555-987-6543 (Sarah)</span>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Vitals: Heart Rate & Blood Pressure */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Heart Rate Chart */}
//             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//               <div className="flex items-center justify-between mb-6">
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900">Heart Rate</h3>
//                   <p className="text-sm text-gray-500">Average: 65 BPM</p>
//                 </div>
//                 <div className="flex space-x-2">
//                   {['week', 'month', 'year'].map((range) => (
//                     <button
//                       key={range}
//                       onClick={() => setTimeRange(range)}
//                       className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors duration-200 ${
//                         timeRange === range
//                           ? 'bg-blue-600 text-white shadow-sm'
//                           : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                       }`}
//                     >
//                       {range.charAt(0).toUpperCase() + range.slice(1)}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//               <div className="mt-6">
//                 <ResponsiveContainer width="100%" height={250}>
//                   <AreaChart data={heartRateData[timeRange]} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
//                     <defs>
//                       <linearGradient id="colorBpm" x1="0" y1="0" x2="0" y2="1">
//                         <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
//                         <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
//                       </linearGradient>
//                     </defs>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
//                     <XAxis 
//                       dataKey={timeRange === 'week' ? 'day' : timeRange === 'month' ? 'week' : 'month'}
//                       stroke="#64748b"
//                       fontSize={12}
//                       axisLine={{ stroke: '#e2e8f0' }}
//                       tickLine={false}
//                     />
//                     <YAxis 
//                       stroke="#64748b" 
//                       fontSize={12}
//                       axisLine={false}
//                       tickLine={false}
//                       domain={['dataMin - 10', 'dataMax + 10']}
//                     />
//                     <Tooltip content={<CustomTooltip />} />
//                     <Area 
//                       type="monotone" 
//                       dataKey="min" 
//                       stroke="transparent" 
//                       fill="url(#colorBpm)" 
//                       fillOpacity={1}
//                     />
//                     <Line
//                       type="monotone"
//                       dataKey="bpm"
//                       stroke="#ef4444"
//                       strokeWidth={3}
//                       dot={<CustomDot />}
//                       activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2, fill: 'white' }}
//                     />
//                     <Area 
//                       type="monotone" 
//                       dataKey="max" 
//                       stroke="transparent" 
//                       fill="transparent"
//                     />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
            
//             {/* Blood Pressure Chart */}
//             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//               <div className="flex items-center justify-between mb-6">
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900">Blood Pressure</h3>
//                   <p className="text-sm text-gray-500">Average: 122/81 mmHg</p>
//                 </div>
//                 <div className="flex space-x-2">
//                   {['week', 'month', 'year'].map((range) => (
//                     <button
//                       key={range}
//                       onClick={() => setTimeRange(range)}
//                       className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors duration-200 ${
//                         timeRange === range
//                           ? 'bg-blue-600 text-white shadow-sm'
//                           : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                       }`}
//                     >
//                       {range.charAt(0).toUpperCase() + range.slice(1)}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <ResponsiveContainer width="100%" height={250}>
//                   <LineChart data={bloodPressureData[timeRange]} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
//                     <XAxis
//                       dataKey={timeRange === 'week' ? 'day' : timeRange === 'month' ? 'week' : 'month'}
//                       stroke="#64748b"
//                       fontSize={12}
//                       axisLine={{ stroke: '#e2e8f0' }}
//                       tickLine={false}
//                     />
//                     <YAxis
//                       stroke="#64748b"
//                       fontSize={12}
//                       axisLine={false}
//                       tickLine={false}
//                     />
//                     <Tooltip content={<CustomTooltip />} />
//                     <Line
//                       type="monotone"
//                       dataKey="systolic"
//                       stroke="#3b82f6"
//                       strokeWidth={3}
//                       dot={false}
//                       activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: 'white' }}
//                       name="Systolic"
//                     />
//                     <Line
//                       type="monotone"
//                       dataKey="diastolic"
//                       stroke="#10b981"
//                       strokeWidth={3}
//                       dot={false}
//                       activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2, fill: 'white' }}
//                       name="Diastolic"
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>
//         </div>
          
//         {/* Quick Actions & Medications */}
//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mt-6">
//           {/* Quick Actions */}
//           <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
//             <div className="grid grid-cols-1 gap-3">
//               <button className="flex items-center justify-center w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
//                 <Calendar size={20} className="mr-3" />
//                 Schedule Appointment
//               </button>
//               <button className="flex items-center justify-center w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
//                 <MessageSquare size={20} className="mr-3" />
//                 Message Doctor
//               </button>
//               <button className="flex items-center justify-center w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
//                 <Download size={20} className="mr-3" />
//                 Download Records
//               </button>
//               <button className="flex items-center justify-center w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
//                 <FileText size={20} className="mr-3" />
//                 View Test Results
//               </button>
//             </div>
//           </div>
          
//           {/* Current Medications */}
//           <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-lg font-semibold text-gray-900">Current Medications</h3>
//         <button className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center">
//           <span className="mr-1">All</span>
//           <ChevronDown size={16} />
//         </button>
//       </div>
      
//       <div className="mt-2 space-y-4">
//         {medicines.length > 0 ? (
//           medicines.map((med, index) => (
//             <div key={`${med.prescriptionId}-${index}`} className="flex items-center p-3 bg-gray-50 rounded-lg">
//               <div className="rounded-full bg-purple-100 p-2 mr-3">
//                 <Pill className="h-4 w-4 text-purple-500" />
//               </div>
//               <div className="flex-1">
//                 <div className="flex justify-between items-start">
//                   <p className="font-medium text-gray-900">{med.medicineName}</p>
//                   <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
//                     {med.duration} days
//                   </span>
//                 </div>
//                 <p className="text-sm text-gray-600">
//                   {med.dosage}, {med.frequency} times
//                 </p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="p-4 text-center text-gray-500">
//             No current medications
//           </div>
//         )}
        
//         <button 
//           className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium"
//           onClick={() => {
//             // Add your new medication logic here
//             console.log('Add medication button clicked');
//           }}
//         >
//           + Add Medication
//         </button>
//       </div>
//     </div>
          
//           {/* Upcoming Appointments */}
//           <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//   <div className="flex items-center justify-between mb-4">
//     <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
//     <button className="text-blue-600 text-sm font-medium hover:text-blue-700">View All</button>
//   </div>
//   <div className="mt-2 space-y-4">
//     {appointments
//       // Filter for upcoming appointments (date is today or in the future)
//       .filter(appointment => {
//         const appointmentDate = new Date(appointment.date);
//         const today = new Date();
//         today.setHours(0, 0, 0, 0);
//         return appointmentDate >= today;
//       })
//       // Sort by date (earliest first)
//       .sort((a, b) => new Date(a.date) - new Date(b.date))
//       // Map to the required format
//       .map((appointment) => {
//         // Format the date to be more readable (e.g., "Apr 18, 2025")
//         const formattedDate = new Date(appointment.date).toLocaleDateString('en-US', {
//           year: 'numeric',
//           month: 'short',
//           day: 'numeric'
//         });

//         return (
//           <div key={appointment._id} className="p-3 bg-gray-50 rounded-lg">
//             <div className="flex justify-between items-start mb-1">
//               <p className="font-medium text-gray-900">Dr. {appointment.doctor.name}</p>
//               <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
//                 {appointment.purpose || 'General Checkup'}
//               </span>
//             </div>
//             <div className="flex items-center text-sm text-gray-600">
//               <Calendar size={14} className="mr-1" />
//               <span>{formattedDate}, {appointment.time}</span>
//             </div>
//             <div className="mt-3 flex space-x-2">
//               <button className="flex-1 px-3 py-1 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200">
//                 Reschedule
//               </button>
//               <button className="flex-1 px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
//                 {appointment.status === 'Pending' ? 'Confirm' : 'View'}
//               </button>
//             </div>
//           </div>
//         );
//       })}
//         <button 
//           className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium"
//           onClick={() => {
//             // Add your new appointment logic here
//             console.log('New appointment button clicked');
//           }}
//         >
//           + New Appointment
//         </button>
//       </div>
//     </div>
//         </div>

//         {/* Medical Timeline */}
//         <div className="mt-8">
//   <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//     <div className="flex items-center justify-between mb-4">
//       <h3 className="text-lg font-semibold text-gray-900">Medical Timeline</h3>
//       <button className="text-blue-600 text-sm font-medium hover:text-blue-700">View All</button>
//     </div>
//     <div className="mt-4 space-y-4">
//       {appointments.map((appointment) => {
//         // Format the date to be more readable
//         const formattedDate = new Date(appointment.date).toLocaleDateString('en-US', {
//           year: 'numeric',
//           month: 'short',
//           day: 'numeric'
//         });

//         // Create timeline item from appointment data
//         const timelineItem = {
//           id: appointment._id,
//           type: 'appointment',
//           date: formattedDate,
//           title: `Appointment with Dr. ${appointment.doctor.name}`,
//           details: appointment.purpose || 'Scheduled appointment',
//           doctor: `Dr. ${appointment.doctor.name}`,
//           location: appointment.doctor.hospital ? `Hospital ID: ${appointment.doctor.hospital}` : 'Clinic',
//           duration: appointment.time || 'Not specified',
//           status: appointment.status
//         };

//         return (
//           <div key={timelineItem.id} className="border-l-2 border-blue-200 pl-4 pb-4 relative">
//             <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-blue-600 border-4 border-white"></div>
//             <div 
//               className={`p-4 rounded-lg cursor-pointer transition-colors duration-200 ${
//                 expandedTimelineItem === timelineItem.id ? 'bg-blue-50' : 'bg-gray-50 hover:bg-gray-100'
//               }`}
//               onClick={() => toggleTimelineItem(timelineItem.id)}
//             >
//               <div className="flex items-start justify-between">
//                 <div>
//                   <p className="text-xs text-blue-600 font-medium">{timelineItem.date}</p>
//                   <h4 className="text-base font-semibold text-gray-900 mt-1">{timelineItem.title}</h4>
//                   <p className="text-sm text-gray-600 mt-1">{timelineItem.details}</p>
//                 </div>
//                 <ChevronDown 
//                   size={18} 
//                   className={`text-gray-500 transition-transform duration-200 ${
//                     expandedTimelineItem === timelineItem.id ? 'transform rotate-180' : ''
//                   }`}
//                 />
//               </div>
              
//               {expandedTimelineItem === timelineItem.id && (
//                 <div className="mt-3 pt-3 border-t border-gray-200">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <p className="text-xs text-gray-500">Doctor</p>
//                       <p className="text-sm font-medium">{timelineItem.doctor}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500">Location</p>
//                       <p className="text-sm font-medium">{timelineItem.location}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500">Time Slot</p>
//                       <p className="text-sm font-medium">{timelineItem.duration}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500">Status</p>
//                       <p className="text-sm font-medium">{timelineItem.status}</p>
//                     </div>
//                     <button className="col-span-2 mt-2 px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   </div>
// </div>
//       </main>
//     </div>
// )}
    
//     </>
//   );
// };

// export default MedicalRecord;























































/* eslint-disable react/prop-types */
import { useState, useEffect} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import {
  Heart,
  Calendar,
  ChevronDown,
  Clock,
  Pill,
  Activity,
  Download,
  MessageSquare,
  FileText
} from 'lucide-react';
 import Authstore from '../hooks/authStore.js';
 import {host} from '../host.js';
 import axios from 'axios';

// Placeholder data
const heartRateData = {
  week: [
    { day: 'Mon', bpm: 60, min: 55, max: 75 },
    { day: 'Tue', bpm: 62, min: 57, max: 78 },
    { day: 'Wed', bpm: 58, min: 52, max: 72 },
    { day: 'Thu', bpm: 65, min: 58, max: 82 },
    { day: 'Fri', bpm: 70, min: 63, max: 86 },
    { day: 'Sat', bpm: 68, min: 60, max: 84 },
    { day: 'Sun', bpm: 64, min: 58, max: 79 },
  ],
  month: [
    { week: 'W1', bpm: 60, min: 54, max: 78 },
    { week: 'W2', bpm: 55, min: 50, max: 72 },
    { week: 'W3', bpm: 80, min: 70, max: 90 },
    { week: 'W4', bpm: 50, min: 45, max: 65 },
  ],
  year: [
    { month: 'Jan', bpm: 65, min: 58, max: 79 },
    { month: 'Feb', bpm: 60, min: 54, max: 75 },
    { month: 'Mar', bpm: 70, min: 62, max: 85 },
    { month: 'Apr', bpm: 55, min: 50, max: 72 },
    { month: 'May', bpm: 75, min: 65, max: 89 },
    { month: 'Jun', bpm: 68, min: 60, max: 82 },
    { month: 'Jul', bpm: 60, min: 54, max: 76 },
    { month: 'Aug', bpm: 55, min: 50, max: 72 },
    { month: 'Sep', bpm: 80, min: 70, max: 95 },
    { month: 'Oct', bpm: 50, min: 45, max: 68 },
    { month: 'Nov', bpm: 75, min: 65, max: 88 },
    { month: 'Dec', bpm: 65, min: 58, max: 80 },
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


// eslint-disable-next-line react/prop-types
const CustomTooltip = ({ active, payload, label }) => {
  // eslint-disable-next-line react/prop-types
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
        <p className="font-medium text-sm text-gray-900">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// eslint-disable-next-line react/prop-types
const CustomDot = ({ cx, cy, stroke }) => {
  return (
    <svg x={cx - 5} y={cy - 5} width="10" height="10" fill={stroke} viewBox="0 0 10 10">
      <circle cx="5" cy="5" r="5" />
    </svg>
  );
};

const MedicalRecord = ({id}) => {
  
  const [timeRange, setTimeRange] = useState('week');
  const [expandedTimelineItem, setExpandedTimelineItem] = useState(null);
  const [currentBP] = useState({ systolic: 122, diastolic: 78 });
  const [appointments, setAppointments] = useState([]);
 const[medRecord,setMedicalRecord] = useState(null);

  const toggleTimelineItem = (id) => setExpandedTimelineItem(expandedTimelineItem === id ? null : id);

const [user,setUser] = useState(null);
const [medicines, setMedicines] = useState([]);

  useEffect(()=>{
    const getuser = async()=>{
      const userid = Authstore.getUser()?.userid || null;
      console.log(userid)
      const response = await axios.get(`${host}/api/auth/getselecteduser/${userid}`);
      setUser(response.data?.user)
    }


    const getuserappointments = async()=>{
      const userid = Authstore.getUser()?.userid || null;
      console.log(userid)
      const response = await axios.get(`${host}/api/appointment/getappointmentbyuser/${userid}`);
      setAppointments(response.data?.appointments)
    }


    const getuserprescriptions = async () => {
        const userid = Authstore.getUser()?.userid || null;
        const response = await axios.get(`${host}/api/prescriptions/user/${userid}`);
                const allMedications = response.data.prescriptions.flatMap(prescription => 
          prescription.medication.map(med => ({
            ...med,
            prescriptionId: prescription._id,
            prescribedBy: prescription.doctor.name,
            prescribedDate: prescription.createdAt
          }))
        );
        
        setMedicines(allMedications);
        console.log(allMedications)
    };


    const getmedicalrecord = async()=>{
      const userid = Authstore.getUser()?.userid || null;
      console.log(userid)
      const response = await axios.get(`${host}/api/medical-records/${userid}`);
      setMedicalRecord(response.data?.medicalRecord)
      console.log(response.data?.medicalRecord)
    }

    getuser();
    getuserappointments();
    getuserprescriptions();
    getmedicalrecord();
  },[])


  return (  
    <>
    {!user ? (
  <div className="flex flex-col items-center justify-center h-64">
  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <p className="mt-3 text-gray-500">No medical record found. Kindly Sign in </p>
  <a href="/login" className="mt-2 text-blue-600 hover:underline">Sign In</a>


  </div>
) : (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 font-sans text-gray-900 antialiased">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white shadow-sm backdrop-blur-lg bg-white/90">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Heart className="h-6 w-6 text-blue-600 mr-2" />
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">HealthTrack {id}</h1>
          </div>
          <div className="flex items-center space-x-4">
           
            <div className="flex items-center space-x-3">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">Patient</p>
              </div>
              <div className="relative">
                <img
                  src={`${user?.image}`}
                  alt="profile pic"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-100"
                />
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Health Dashboard</h2>
          <p className="mt-1 text-sm text-gray-600">
            Welcome back, ${user?.name}. Here&apos;s your health overview 
          </p>
        </div>
        
        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* Current Vitals Cards */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center">
            <div className="rounded-full bg-red-100 p-3 mr-4">
              <Heart className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Heart Rate</p>
              <div className="flex items-baseline">
                <h3 className="text-2xl font-bold text-gray-900">{medRecord?.vitals?.heartRate}</h3>
                <span className="ml-1 text-sm text-gray-500">BPM</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <Activity className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Blood Pressure</p>
              <div className="flex items-baseline">
                <h3 className="text-2xl font-bold text-gray-900">{currentBP.systolic}/{currentBP.diastolic}</h3>
                <span className="ml-1 text-sm text-gray-500">mmHg</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <Clock className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Next Appointment</p>
              <div className="flex flex-col">
                <h3 className="text-base font-bold text-gray-900">Apr 20, 10:30 AM</h3>
                <p className="text-xs text-gray-500">Dr. Emily Smith</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center">
            <div className="rounded-full bg-purple-100 p-3 mr-4">
              <Pill className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Medications</p>
              <div className="flex flex-col">
                <h3 className="text-base font-bold text-gray-900">3 Active</h3>
                <p className="text-xs text-gray-500">Next: Lisinopril at 8:00 PM</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Patient Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Patient Profile</h3>
              <button className="text-blue-600 text-sm font-medium hover:text-blue-700">Edit</button>
            </div>
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative">
                <img
                  src={`${user?.image}`}
                  alt="profile pic"
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-100"
                />
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">{user?.name}</p>
                <p className="text-sm text-gray-500">ID: {user?._id}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Age</p>
                  <p className="text-sm font-medium">55 years</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Gender</p>
                  <p className="text-sm font-medium">{user?.sex}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Blood Type</p>
                  <p className="text-sm font-medium">{user?.blood}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Height</p>
                  <p className="text-sm font-medium">5&apos;10&quot; (178cm)</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Allergies</h4>
                <div className="flex flex-wrap gap-2">
                  {['Metformin', 'Aspirin', 'Strawberry'].map((allergy) => (
                    <span
                      key={allergy}
                      className="px-3 py-1 bg-red-50 text-red-700 text-xs font-medium rounded-full"
                    >
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Contact Information</h4>
                <div className="space-y-1">
                  <p className="text-sm text-gray-700 flex items-center">
                    <span className="font-medium w-20">Email:</span>
                    <span className="text-gray-600">{user?.email}</span>
                  </p>
                  <p className="text-sm text-gray-700 flex items-center">
                    <span className="font-medium w-20">Phone:</span>
                    <span className="text-gray-600">555-723-4567</span>
                  </p>
                  <p className="text-sm text-gray-700 flex items-center">
                    <span className="font-medium w-20">Emergency:</span>
                    <span className="text-gray-600">555-987-6543 (Sarah)</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Vitals: Heart Rate & Blood Pressure */}
          <div className="lg:col-span-2 space-y-6">
            {/* Heart Rate Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Heart Rate</h3>
                  <p className="text-sm text-gray-500">Average: 65 BPM</p>
                </div>
                <div className="flex space-x-2">
                  {['week', 'month', 'year'].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        timeRange === range
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {range.charAt(0).toUpperCase() + range.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={heartRateData[timeRange]} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorBpm" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis 
                      dataKey={timeRange === 'week' ? 'day' : timeRange === 'month' ? 'week' : 'month'}
                      stroke="#64748b"
                      fontSize={12}
                      axisLine={{ stroke: '#e2e8f0' }}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="#64748b" 
                      fontSize={12}
                      axisLine={false}
                      tickLine={false}
                      domain={['dataMin - 10', 'dataMax + 10']}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="min" 
                      stroke="transparent" 
                      fill="url(#colorBpm)" 
                      fillOpacity={1}
                    />
                    <Line
                      type="monotone"
                      dataKey="bpm"
                      stroke="#ef4444"
                      strokeWidth={3}
                      dot={<CustomDot />}
                      activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2, fill: 'white' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="max" 
                      stroke="transparent" 
                      fill="transparent"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Blood Pressure Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Blood Pressure</h3>
                  <p className="text-sm text-gray-500">Average: 122/81 mmHg</p>
                </div>
                <div className="flex space-x-2">
                  {['week', 'month', 'year'].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        timeRange === range
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {range.charAt(0).toUpperCase() + range.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={bloodPressureData[timeRange]} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis
                      dataKey={timeRange === 'week' ? 'day' : timeRange === 'month' ? 'week' : 'month'}
                      stroke="#64748b"
                      fontSize={12}
                      axisLine={{ stroke: '#e2e8f0' }}
                      tickLine={false}
                    />
                    <YAxis
                      stroke="#64748b"
                      fontSize={12}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="systolic"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: 'white' }}
                      name="Systolic"
                    />
                    <Line
                      type="monotone"
                      dataKey="diastolic"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2, fill: 'white' }}
                      name="Diastolic"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
          
        {/* Quick Actions & Medications */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mt-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-3">
              <button className="flex items-center justify-center w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                <Calendar size={20} className="mr-3" />
                Schedule Appointment
              </button>
              <button className="flex items-center justify-center w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                <MessageSquare size={20} className="mr-3" />
                Message Doctor
              </button>
              <button className="flex items-center justify-center w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                <Download size={20} className="mr-3" />
                Download Records
              </button>
              <button className="flex items-center justify-center w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                <FileText size={20} className="mr-3" />
                View Test Results
              </button>
            </div>
          </div>
          
          {/* Current Medications */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Current Medications</h3>
        <button className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center">
          <span className="mr-1">All</span>
          <ChevronDown size={16} />
        </button>
      </div>
      
      <div className="mt-2 space-y-4">
        {medicines.length > 0 ? (
          medicines.map((med, index) => (
            <div key={`${med.prescriptionId}-${index}`} className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="rounded-full bg-purple-100 p-2 mr-3">
                <Pill className="h-4 w-4 text-purple-500" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="font-medium text-gray-900">{med.medicineName}</p>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                    {med.duration} days
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {med.dosage}, {med.frequency} times
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            No current medications
          </div>
        )}
        
        <button 
          className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium"
          onClick={() => {
            // Add your new medication logic here
            console.log('Add medication button clicked');
          }}
        >
          + Add Medication
        </button>
      </div>
    </div>
          
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
    <button className="text-blue-600 text-sm font-medium hover:text-blue-700">View All</button>
  </div>
  <div className="mt-2 space-y-4">
    {appointments
      // Filter for upcoming appointments (date is today or in the future)
      .filter(appointment => {
        const appointmentDate = new Date(appointment.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return appointmentDate >= today;
      })
      // Sort by date (earliest first)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      // Map to the required format
      .map((appointment) => {
        // Format the date to be more readable (e.g., "Apr 18, 2025")
        const formattedDate = new Date(appointment.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });

        return (
          <div key={appointment._id} className="p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-start mb-1">
              <p className="font-medium text-gray-900">Dr. {appointment.doctor.name}</p>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                {appointment.purpose || 'General Checkup'}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Calendar size={14} className="mr-1" />
              <span>{formattedDate}, {appointment.time}</span>
            </div>
            <div className="mt-3 flex space-x-2">
              <button className="flex-1 px-3 py-1 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200">
                Reschedule
              </button>
              <button className="flex-1 px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                {appointment.status === 'Pending' ? 'Confirm' : 'View'}
              </button>
            </div>
          </div>
        );
      })}
        <button 
          className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium"
          onClick={() => {
            // Add your new appointment logic here
            console.log('New appointment button clicked');
          }}
        >
          + New Appointment
        </button>
      </div>
    </div>
        </div>

        {/* Medical Timeline */}
        <div className="mt-8">
  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900">Medical Timeline</h3>
      <button className="text-blue-600 text-sm font-medium hover:text-blue-700">View All</button>
    </div>
    <div className="mt-4 space-y-4">
      {appointments.map((appointment) => {
        // Format the date to be more readable
        const formattedDate = new Date(appointment.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });

        // Create timeline item from appointment data
        const timelineItem = {
          id: appointment._id,
          type: 'appointment',
          date: formattedDate,
          title: `Appointment with Dr. ${appointment.doctor.name}`,
          details: appointment.purpose || 'Scheduled appointment',
          doctor: `Dr. ${appointment.doctor.name}`,
          location: appointment.doctor.hospital ? `Hospital ID: ${appointment.doctor.hospital}` : 'Clinic',
          duration: appointment.time || 'Not specified',
          status: appointment.status
        };

        return (
          <div key={timelineItem.id} className="border-l-2 border-blue-200 pl-4 pb-4 relative">
            <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-blue-600 border-4 border-white"></div>
            <div 
              className={`p-4 rounded-lg cursor-pointer transition-colors duration-200 ${
                expandedTimelineItem === timelineItem.id ? 'bg-blue-50' : 'bg-gray-50 hover:bg-gray-100'
              }`}
              onClick={() => toggleTimelineItem(timelineItem.id)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-blue-600 font-medium">{timelineItem.date}</p>
                  <h4 className="text-base font-semibold text-gray-900 mt-1">{timelineItem.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{timelineItem.details}</p>
                </div>
                <ChevronDown 
                  size={18} 
                  className={`text-gray-500 transition-transform duration-200 ${
                    expandedTimelineItem === timelineItem.id ? 'transform rotate-180' : ''
                  }`}
                />
              </div>
              
              {expandedTimelineItem === timelineItem.id && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Doctor</p>
                      <p className="text-sm font-medium">{timelineItem.doctor}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm font-medium">{timelineItem.location}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Time Slot</p>
                      <p className="text-sm font-medium">{timelineItem.duration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <p className="text-sm font-medium">{timelineItem.status}</p>
                    </div>
                    <button className="col-span-2 mt-2 px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      View Details
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  </div>
</div>
      </main>
    </div>
)}
    
    </>
  );
};

export default MedicalRecord;























































