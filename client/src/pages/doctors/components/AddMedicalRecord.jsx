// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import Authstore from '../../../hooks/authStore.js';
// import {host} from '../../../host.js'
// import {
//   Calendar,
//   Heart,
//   Pill,
//   FileText,
//   Plus,
//   Trash2,
//   AlertCircle,
//   Save,
//   Search,
//   User,
//   Users
// } from 'lucide-react';

// const AddMedicalData = () => {
//   const [activeSection, setActiveSection] = useState('vitals');
//   const [savedMessage, setSavedMessage] = useState(null);
//   const [patientSearchQuery, setPatientSearchQuery] = useState('');
//   const [showPatientSelector, setShowPatientSelector] = useState(false);
//   const [doctor, setDoctor] = useState(null);
//   const [patients, setPatients] = useState([]);

//   useEffect(()=>{
//     const getdocbyid = async () => {
//       const docid = Authstore.getUser()?.userid;
//       const response = await axios.get(`${host}/api/doctors/getselecteddoc/${docid}`)
//       setDoctor(response.data.doctor)
//     }

//     getdocbyid()
//   },[])
  
//   const [selectedPatient, setSelectedPatient] = useState({
//     id: '9834A-43',
//     name: 'Ethan Miller',
//     age: 55,
//     photo: '/api/placeholder/40/40'
//   });



//   useEffect(() => {
//     const getpatientsbydocid = async () => {
//       const docid = Authstore.getUser()?.userid;
//       const response = await axios.get(`${host}/api/appointment/getappointmentbydoctor/${docid}`)
//       setPatients(response.data.appointments)
      
//       // Set the first patient as selected by default if available
//       if (response.data.appointments.length > 0) {
//         setSelectedPatient({
//           id: response.data.appointments[0].user._id,
//           name: response.data.appointments[0].user?.name,
//           email: response.data.appointments[0].user?.email,
//           photo: response.data.appointments[0].user?.image || '/api/placeholder/40/40'
//         });
//       }
//     }

//     getpatientsbydocid()
//   }, [])
  
//   // Form states
//   const [vitals, setVitals] = useState({
//     heartRate: '',
//     systolic: '',
//     diastolic: '',
//     date: new Date().toISOString().split('T')[0]
//   });
  
//   const [medication, setMedication] = useState({
//     name: '',
//     dosage: '',
//     frequency: '',
//     purpose: ''
//   });
  
//   const [appointment, setAppointment] = useState({
//     date: '',
//     time: '',
//     doctor: '',
//     department: ''
//   });
  
//   const [timelineEvent, setTimelineEvent] = useState({
//     type: 'appointment',
//     date: '',
//     title: '',
//     details: '',
//     doctor: '',
//     location: '',
//     duration: '',
//     notes: ''
//   });
  
//   const [medications, setMedications] = useState([]);
//   const [appointments, setAppointments] = useState([]);
  
//   const handleSaveVitals = () => {
//     // Logic to save vitals data
//     setSavedMessage(`Vitals data saved for ${selectedPatient.name}`);
//     setTimeout(() => setSavedMessage(null), 3000);
//   };
  
//   const handleAddMedication = () => {
//     if (medication.name && medication.dosage) {
//       setMedications([...medications, medication]);
//       setMedication({ name: '', dosage: '', frequency: '', purpose: '' });
//     }
//   };
  
//   const handleRemoveMedication = (index) => {
//     const updatedMedications = [...medications];
//     updatedMedications.splice(index, 1);
//     setMedications(updatedMedications);
//   };
  
//   const handleAddAppointment = () => {
//     if (appointment.date && appointment.doctor) {
//       setAppointments([...appointments, appointment]);
//       setAppointment({ date: '', time: '', doctor: '', department: '' });
//     }
//   };
  
//   const handleRemoveAppointment = (index) => {
//     const updatedAppointments = [...appointments];
//     updatedAppointments.splice(index, 1);
//     setAppointments(updatedAppointments);
//   };
  
//   const handleSaveTimelineEvent = () => {
//     // Logic to save timeline event
//     setSavedMessage(`Medical event added to ${selectedPatient.name}'s timeline`);
//     setTimeout(() => setSavedMessage(null), 3000);
//   };
  
//   const handleSaveAllData = () => {
//     // Logic to save all collected data
//     setSavedMessage(`All data saved for patient ${selectedPatient.name}`);
//     setTimeout(() => setSavedMessage(null), 3000);
//   };
  
//   const handlePatientSelect = (patient) => {
//     setSelectedPatient({
//       id: patient.user?._id,
//       name: patient.user?.name,
//       email: patient.user?.email,
//       photo: patient.user?.image || '/api/placeholder/40/40'
//     });
//     setShowPatientSelector(false);
    
//     // Reset form data when changing patients (optional)
//     setMedications([]);
//     setAppointments([]);
//     setSavedMessage(`Selected patient: ${patient?.user?.name}`);
//     setTimeout(() => setSavedMessage(null), 3000);
//   };
  
//   const filteredPatients = patientSearchQuery 
//     ? patients.filter(patient => 
//         patient?.user?.name.toLowerCase().includes(patientSearchQuery.toLowerCase()) ||
//         patient?.user?.id.toLowerCase().includes(patientSearchQuery.toLowerCase()))
//     : patients;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 font-sans text-gray-900 antialiased">
//       {/* Header */}
//       <header className="sticky top-0 z-20 bg-white shadow-sm backdrop-blur-lg bg-white/90">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center">
//             <Heart className="h-6 w-6 text-blue-600 mr-2" />
//             <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">HealthTrack</h1>
//           </div>
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-3">
//               <div className="hidden md:block text-right">
//                 <p className="text-sm font-medium text-gray-900">Dr. {doctor?.name}</p>
//                 <p className="text-xs text-gray-500">{doctor?.specialization?.specialization}</p>
//               </div>
//               <div className="relative">
//                 <img
//                   src={doctor?.image}
//                   alt="Dr. James Wilson"
//                   className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-100"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-8">
//         {/* Page Header */}
//         <div className="mb-6 flex items-center justify-between">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">Add Medical Record</h2>
//             <p className="mt-1 text-sm text-gray-600">
//               Update patient health data and keep medical records current
//             </p>
//           </div>
//           <button 
//             onClick={handleSaveAllData}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
//           >
//             <Save size={18} className="mr-2" />
//             Save All Data
//           </button>
//         </div>
        
//         {/* Patient Selection */}
//         <div className="mb-6 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <div className="mr-4 bg-blue-100 p-3 rounded-full">
//                 <User size={20} className="text-blue-600" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900">Current Patient</h3>
//                 <div className="flex items-center mt-2">
//                   <img 
//                     src={selectedPatient.photo} 
//                     alt={selectedPatient.name}
//                     className="w-10 h-10 rounded-full mr-3 ring-2 ring-blue-100" 
//                   />
//                   <div>
//                     <p className="font-medium">{selectedPatient.name}</p>
//                     <p className="text-sm text-gray-500">ID: {selectedPatient.id} • Age: {selectedPatient.age}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <button
//               onClick={() => setShowPatientSelector(!showPatientSelector)}
//               className="px-4 py-2 bg-blue-100 text-blue-700 font-medium rounded-lg hover:bg-blue-200 transition-colors duration-200 flex items-center"
//             >
//               <Users size={18} className="mr-2" />
//               Change Patient
//             </button>
//           </div>
          
//           {/* Patient Selector Dropdown */}
//           {showPatientSelector && (
//             <div className="mt-4 border-t pt-4">
//               <div className="mb-3">
//                 <div className="relative">
//                   <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search patients by name or ID..."
//                     value={patientSearchQuery}
//                     onChange={(e) => setPatientSearchQuery(e.target.value)}
//                     className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//               </div>
//               <div className="max-h-64 overflow-y-auto">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                   {filteredPatients.map(patient => (
//                     <div 
//                       key={patient?.user?._id}
//                       onClick={() => handlePatientSelect(patient)}
//                       className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
//                         selectedPatient.id === patient.id 
//                           ? 'bg-blue-50 border border-blue-200' 
//                           : 'hover:bg-gray-100 border border-gray-100'
//                       }`}
//                     >
//                       <img 
//                         src={patient?.user?.image} 
//                         alt={patient?.user?.name}
//                         className="w-10 h-10 rounded-full mr-3" 
//                       />
//                       <div>
//                         <p className="font-medium">{patient?.user?.name}</p>
//                         <p className="text-xs text-gray-500">ID: {patient?.user?._id} • Age: {patient?.user?.age}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
        
//         {/* Save Message */}
//         {savedMessage && (
//           <div className="mb-6 p-3 bg-green-100 text-green-800 rounded-lg flex items-center">
//             <AlertCircle size={18} className="mr-2" />
//             {savedMessage}
//           </div>
//         )}
        
//         {/* Tabs */}
//         <div className="mb-6 border-b border-gray-200">
//           <nav className="flex space-x-8" aria-label="Tabs">
//             {[
//               { id: 'vitals', label: 'Vitals', icon: Heart },
//               { id: 'medications', label: 'Medications', icon: Pill },
//               { id: 'appointments', label: 'Appointments', icon: Calendar },
//               { id: 'timeline', label: 'Timeline Events', icon: FileText }
//             ].map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveSection(tab.id)}
//                 className={`flex items-center pb-4 px-1 ${
//                   activeSection === tab.id
//                     ? 'border-b-2 border-blue-600 text-blue-600'
//                     : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 <tab.icon size={18} className="mr-2" />
//                 <span className="font-medium">{tab.label}</span>
//               </button>
//             ))}
//           </nav>
//         </div>
        
//         {/* Form Sections */}
//         <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//           {/* Vitals Section */}
//           {activeSection === 'vitals' && (
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                 Record Vital Signs for {selectedPatient.name}
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
//                   <input
//                     type="date"
//                     value={vitals.date}
//                     onChange={(e) => setVitals({...vitals, date: e.target.value})}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Heart Rate (BPM)</label>
//                   <input
//                     type="number"
//                     placeholder="Ex: 72"
//                     value={vitals.heartRate}
//                     onChange={(e) => setVitals({...vitals, heartRate: e.target.value})}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Blood Pressure (Systolic)</label>
//                   <input
//                     type="number"
//                     placeholder="Ex: 120"
//                     value={vitals.systolic}
//                     onChange={(e) => setVitals({...vitals, systolic: e.target.value})}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Blood Pressure (Diastolic)</label>
//                   <input
//                     type="number"
//                     placeholder="Ex: 80"
//                     value={vitals.diastolic}
//                     onChange={(e) => setVitals({...vitals, diastolic: e.target.value})}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//               </div>
              
//               <div className="mt-6 flex justify-end">
//                 <button
//                   onClick={handleSaveVitals}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
//                 >
//                   Save Vitals
//                 </button>
//               </div>
//             </div>
//           )}
          
//           {/* Medications Section */}
//           {activeSection === 'medications' && (
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                 Add Medications for {selectedPatient.name}
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Medication Name</label>
//                   <input
//                     type="text"
//                     placeholder="Ex: Lisinopril"
//                     value={medication.name}
//                     onChange={(e) => setMedication({...medication, name: e.target.value})}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
//                   <input
//                     type="text"
//                     placeholder="Ex: 10mg"
//                     value={medication.dosage}
//                     onChange={(e) => setMedication({...medication, dosage: e.target.value})}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
//                   <input
//                     type="text"
//                     placeholder="Ex: Once daily"
//                     value={medication.frequency}
//                     onChange={(e) => setMedication({...medication, frequency: e.target.value})}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
//                   <input
//                     type="text"
//                     placeholder="Ex: Blood Pressure"
//                     value={medication.purpose}
//                     onChange={(e) => setMedication({...medication, purpose: e.target.value})}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//               </div>
              
//               <div className="mt-6 flex justify-end">
//                 <button
//                   onClick={handleAddMedication}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
//                 >
//                   <Plus size={18} className="mr-2" />
//                   Add Medication
//                 </button>
//               </div>
              
//               {/* List of added medications */}
//               {medications.length > 0 && (
//                 <div className="mt-6">
//                   <h4 className="text-md font-medium text-gray-700 mb-3">Added Medications</h4>
//                   <div className="space-y-3">
//                     {medications.map((med, index) => (
//                       <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                         <div>
//                           <p className="font-medium text-gray-900">{med.name} ({med.dosage})</p>
//                           <p className="text-sm text-gray-600">{med.frequency}, Purpose: {med.purpose}</p>
//                         </div>
//                         <button 
//                           onClick={() => handleRemoveMedication(index)}
//                           className="p-1 text-red-600 hover:text-red-800"
//                         >
//                           <Trash2 size={18} />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
          
//           {/* Appointments Section */}
//           {activeSection === 'appointments' && (
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                 Schedule Appointments for {selectedPatient.name}
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
//                   <input
//                     type="date"
//                     value={appointment.date}
//                     onChange={(e) => setAppointment({...appointment, date: e.target.value})}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
//                   <input
//                     type="time"
//                     value={appointment.time}
//                     onChange={(e) => setAppointment({...appointment, time: e.target.value})}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Doctor Name</label>
//                   <input
//                     type="text"
//                     placeholder="Ex: Dr. Emily Smith"
//                     value={appointment.doctor}
//                     onChange={(e) => setAppointment({...appointment, doctor: e.target.value})}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
//                   <select
//                     value={appointment.department}
//                     onChange={(e) => setAppointment({...appointment, department: e.target.value})}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option value="">Select Department</option>
//                     <option value="Cardiology">Cardiology</option>
//                     <option value="General Practice">General Practice</option>
//                     <option value="Neurology">Neurology</option>
//                     <option value="Orthopedics">Orthopedics</option>
//                     <option value="Dermatology">Dermatology</option>
//                   </select>
//                 </div>
//               </div>
              
//               <div className="mt-6 flex justify-end">
//                 <button
//                   onClick={handleAddAppointment}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
//                 >
//                   <Plus size={18} className="mr-2" />
//                   Add Appointment
//                 </button>
//               </div>
              
//               {/* List of added appointments */}
//               {appointments.length > 0 && (
//                 <div className="mt-6">
//                   <h4 className="text-md font-medium text-gray-700 mb-3">Scheduled Appointments</h4>
//                   <div className="space-y-3">
//                     {appointments.map((apt, index) => (
//                       <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                         <div>
//                           <p className="font-medium text-gray-900">{apt.doctor}</p>
//                           <p className="text-sm text-gray-600">
//                             {new Date(apt.date).toLocaleDateString()}, {apt.time} - {apt.department}
//                           </p>
//                         </div>
//                         <button 
//                           onClick={() => handleRemoveAppointment(index)}
//                           className="p-1 text-red-600 hover:text-red-800"
//                         >
//                           <Trash2 size={18} />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
          
//           {/* Timeline Events Section */}
//           {activeSection === 'timeline' && (
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                 Add Medical Timeline Event for {selectedPatient.name}
//               </h3>
              
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
//                 <div className="flex space-x-4">
//                   <label className="flex items-center">
//                     <input
//                       type="radio"
//                       name="eventType"
//                       value="appointment"
//                       checked={timelineEvent.type === 'appointment'}
//                       onChange={() => setTimelineEvent({...timelineEvent, type: 'appointment'})}
//                       className="mr-2"
//                     />
//                     <span>Appointment</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input
//                       type="radio"
//                       name="eventType"
//                       value="diagnosis"
//                       checked={timelineEvent.type === 'diagnosis'}
//                       onChange={() => setTimelineEvent({...timelineEvent, type: 'diagnosis'})}
//                       className="mr-2"
//                     />
//                     <span>Diagnosis</span>
//                   </label>
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
//                   <input
//                     type="date"
//                     value={timelineEvent.date}
//                     onChange={(e) => setTimelineEvent({...timelineEvent, date: e.target.value})}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//                   <input
//                     type="text"
//                     placeholder="Ex: Cardiology Checkup"
//                     value={timelineEvent.title}
//                     onChange={(e) => setTimelineEvent({...timelineEvent, title: e.target.value})}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
                
//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
//                   <textarea
//                     rows="3"
//                     placeholder="Describe the event..."
//                     value={timelineEvent.details}
//                     onChange={(e) => setTimelineEvent({...timelineEvent, details: e.target.value})}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   ></textarea>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
//                   <input
//                     type="text"
//                     placeholder="Ex: Dr. Emily Smith"
//                     value={timelineEvent.doctor}
//                     onChange={(e) => setTimelineEvent({...timelineEvent, doctor: e.target.value})}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
                
//                 {timelineEvent.type === 'appointment' ? (
//                   <>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
//                       <input
//                         type="text"
//                         placeholder="Ex: Central Medical Center, Room 305"
//                         value={timelineEvent.location}
//                         onChange={(e) => setTimelineEvent({...timelineEvent, location: e.target.value})}
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
//                       <input
//                         type="text"
//                         placeholder="Ex: 45 minutes"
//                         value={timelineEvent.duration}
//                         onChange={(e) => setTimelineEvent({...timelineEvent, duration: e.target.value})}
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       />
//                     </div>
//                   </>
//                 ) : (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
//                     <input
//                       type="text"
//                       placeholder="Additional notes..."
//                       value={timelineEvent.notes}
//                       onChange={(e) => setTimelineEvent({...timelineEvent, notes: e.target.value})}
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       />
//                   </div>
//                 )}
//               </div>
              
//               <div className="mt-6 flex justify-end">
//                 <button
//                   onClick={handleSaveTimelineEvent}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
//                 >
//                   Add to Timeline
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AddMedicalData;























import { useState, useEffect } from 'react';
import axios from 'axios';
import Authstore from '../../../hooks/authStore.js';
import {host} from '../../../host.js'
import {
  Calendar,
  Heart,
  Pill,
  FileText,
  Plus,
  Trash2,
  AlertCircle,
  Save,
  Search,
  User,
  Users,
  LineChart,
  AlertTriangle
} from 'lucide-react';

const AddMedicalData = () => {
  const [activeSection, setActiveSection] = useState('vitals');
  const [savedMessage, setSavedMessage] = useState(null);
  const [patientSearchQuery, setPatientSearchQuery] = useState('');
  const [showPatientSelector, setShowPatientSelector] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const [patients, setPatients] = useState([]);
  
  // New state for allergies
  const [allergy, setAllergy] = useState({
    name: '',
    severity: 'Mild',
    reaction: '',
    notes: ''
  });
  const [allergies, setAllergies] = useState([]);
  
  // New state for heart rate tracking
  const [heartRateTracking, setHeartRateTracking] = useState({
    date: new Date().toISOString().split('T')[0],
    rate: '',
    timeOfDay: 'Morning',
    notes: ''
  });
  const [heartRateEntries, setHeartRateEntries] = useState([]);
  const [heartRateView, setHeartRateView] = useState('week');
  
  // New state for blood pressure tracking
  const [bloodPressureTracking, setBloodPressureTracking] = useState({
    date: new Date().toISOString().split('T')[0],
    systolic: '',
    diastolic: '',
    timeOfDay: 'Morning',
    notes: ''
  });
  const [bloodPressureEntries, setBloodPressureEntries] = useState([]);
  const [bloodPressureView, setBloodPressureView] = useState('week');

  useEffect(()=>{
    const getdocbyid = async () => {
      const docid = Authstore.getUser()?.userid;
      const response = await axios.get(`${host}/api/doctors/getselecteddoc/${docid}`)
      setDoctor(response.data.doctor)
    }

    getdocbyid()
  },[])
  
  const [selectedPatient, setSelectedPatient] = useState({
    id: '9834A-43',
    name: 'Ethan Miller',
    age: 55,
    photo: '/api/placeholder/40/40'
  });

  useEffect(() => {
    const getpatientsbydocid = async () => {
      const docid = Authstore.getUser()?.userid;
      const response = await axios.get(`${host}/api/appointment/getappointmentbydoctor/${docid}`)
      setPatients(response.data.appointments)
      
      // Set the first patient as selected by default if available
      if (response.data.appointments.length > 0) {
        setSelectedPatient({
          id: response.data.appointments[0].user._id,
          name: response.data.appointments[0].user?.name,
          email: response.data.appointments[0].user?.email,
          photo: response.data.appointments[0].user?.image || '/api/placeholder/40/40'
        });
      }
    }

    getpatientsbydocid()
  }, [])
  
  // Form states
  const [vitals, setVitals] = useState({
    heartRate: '',
    systolic: '',
    diastolic: '',
    date: new Date().toISOString().split('T')[0]
  });
  
  const [medication, setMedication] = useState({
    name: '',
    dosage: '',
    frequency: '',
    purpose: ''
  });
  
  const [appointment, setAppointment] = useState({
    date: '',
    time: '',
    doctor: '',
    department: ''
  });
  
  const [timelineEvent, setTimelineEvent] = useState({
    type: 'appointment',
    date: '',
    title: '',
    details: '',
    doctor: '',
    location: '',
    duration: '',
    notes: ''
  });
  
  const [medications, setMedications] = useState([]);
  const [appointments, setAppointments] = useState([]);
  
  const handleSaveVitals = () => {
    // Logic to save vitals data
    setSavedMessage(`Vitals data saved for ${selectedPatient.name}`);
    setTimeout(() => setSavedMessage(null), 3000);
  };
  
  const handleAddMedication = () => {
    if (medication.name && medication.dosage) {
      setMedications([...medications, medication]);
      setMedication({ name: '', dosage: '', frequency: '', purpose: '' });
    }
  };
  
  const handleRemoveMedication = (index) => {
    const updatedMedications = [...medications];
    updatedMedications.splice(index, 1);
    setMedications(updatedMedications);
  };
  
  // New handler for allergies
  const handleAddAllergy = () => {
    if (allergy.name && allergy.reaction) {
      setAllergies([...allergies, allergy]);
      setAllergy({ name: '', severity: 'Mild', reaction: '', notes: '' });
    }
  };
  
  const handleRemoveAllergy = (index) => {
    const updatedAllergies = [...allergies];
    updatedAllergies.splice(index, 1);
    setAllergies(updatedAllergies);
  };
  
  // New handler for heart rate tracking
  const handleAddHeartRate = () => {
    if (heartRateTracking.rate) {
      setHeartRateEntries([...heartRateEntries, heartRateTracking]);
      setHeartRateTracking({
        date: new Date().toISOString().split('T')[0],
        rate: '',
        timeOfDay: 'Morning',
        notes: ''
      });
    }
  };
  
  const handleRemoveHeartRate = (index) => {
    const updatedEntries = [...heartRateEntries];
    updatedEntries.splice(index, 1);
    setHeartRateEntries(updatedEntries);
  };
  
  // New handler for blood pressure tracking
  const handleAddBloodPressure = () => {
    if (bloodPressureTracking.systolic && bloodPressureTracking.diastolic) {
      setBloodPressureEntries([...bloodPressureEntries, bloodPressureTracking]);
      setBloodPressureTracking({
        date: new Date().toISOString().split('T')[0],
        systolic: '',
        diastolic: '',
        timeOfDay: 'Morning',
        notes: ''
      });
    }
  };
  
  const handleRemoveBloodPressure = (index) => {
    const updatedEntries = [...bloodPressureEntries];
    updatedEntries.splice(index, 1);
    setBloodPressureEntries(updatedEntries);
  };
  
  const handleAddAppointment = () => {
    if (appointment.date && appointment.doctor) {
      setAppointments([...appointments, appointment]);
      setAppointment({ date: '', time: '', doctor: '', department: '' });
    }
  };
  
  const handleRemoveAppointment = (index) => {
    const updatedAppointments = [...appointments];
    updatedAppointments.splice(index, 1);
    setAppointments(updatedAppointments);
  };
  
  const handleSaveTimelineEvent = () => {
    // Logic to save timeline event
    setSavedMessage(`Medical event added to ${selectedPatient.name}'s timeline`);
    setTimeout(() => setSavedMessage(null), 3000);
  };
  
  const handleSaveAllData = () => {
    // Logic to save all collected data
    setSavedMessage(`All data saved for patient ${selectedPatient.name}`);
    setTimeout(() => setSavedMessage(null), 3000);
  };
  
  const handlePatientSelect = (patient) => {
    setSelectedPatient({
      id: patient.user?._id,
      name: patient.user?.name,
      email: patient.user?.email,
      photo: patient.user?.image || '/api/placeholder/40/40'
    });
    setShowPatientSelector(false);
    
    // Reset form data when changing patients (optional)
    setMedications([]);
    setAppointments([]);
    setAllergies([]);
    setHeartRateEntries([]);
    setBloodPressureEntries([]);
    setSavedMessage(`Selected patient: ${patient?.user?.name}`);
    setTimeout(() => setSavedMessage(null), 3000);
  };
  
  // Filter patients for search
  const filteredPatients = patientSearchQuery 
    ? patients.filter(patient => 
        patient?.user?.name.toLowerCase().includes(patientSearchQuery.toLowerCase()) ||
        patient?.user?.id?.toLowerCase().includes(patientSearchQuery.toLowerCase()))
    : patients;

  // Helper function to filter entries by time period
  const filterEntriesByTimePeriod = (entries, view) => {
    const currentDate = new Date();
    const result = entries.filter(entry => {
      const entryDate = new Date(entry.date);
      if (view === 'week') {
        // Get entries from last 7 days
        const weekAgo = new Date();
        weekAgo.setDate(currentDate.getDate() - 7);
        return entryDate >= weekAgo;
      } else if (view === 'month') {
        // Get entries from last 30 days
        const monthAgo = new Date();
        monthAgo.setDate(currentDate.getDate() - 30);
        return entryDate >= monthAgo;
      }
      return true;
    });
    
    // Sort by date (newest first)
    return result.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  // Filter heart rate and blood pressure entries by selected view
  const filteredHeartRateEntries = filterEntriesByTimePeriod(heartRateEntries, heartRateView);
  const filteredBloodPressureEntries = filterEntriesByTimePeriod(bloodPressureEntries, bloodPressureView);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 font-sans text-gray-900 antialiased">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white shadow-sm backdrop-blur-lg bg-white/90">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Heart className="h-6 w-6 text-blue-600 mr-2" />
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">HealthTrack</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-gray-900">Dr. {doctor?.name}</p>
                <p className="text-xs text-gray-500">{doctor?.specialization?.specialization}</p>
              </div>
              <div className="relative">
                <img
                  src={doctor?.image}
                  alt="Doctor"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-100"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Add Medical Record</h2>
            <p className="mt-1 text-sm text-gray-600">
              Update patient health data and keep medical records current
            </p>
          </div>
          <button 
            onClick={handleSaveAllData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
          >
            <Save size={18} className="mr-2" />
            Save All Data
          </button>
        </div>
        
        {/* Patient Selection */}
        <div className="mb-6 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-4 bg-blue-100 p-3 rounded-full">
                <User size={20} className="text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Current Patient</h3>
                <div className="flex items-center mt-2">
                  <img 
                    src={selectedPatient.photo} 
                    alt={selectedPatient.name}
                    className="w-10 h-10 rounded-full mr-3 ring-2 ring-blue-100" 
                  />
                  <div>
                    <p className="font-medium">{selectedPatient.name}</p>
                    <p className="text-sm text-gray-500">ID: {selectedPatient.id} • Age: {selectedPatient.age}</p>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowPatientSelector(!showPatientSelector)}
              className="px-4 py-2 bg-blue-100 text-blue-700 font-medium rounded-lg hover:bg-blue-200 transition-colors duration-200 flex items-center"
            >
              <Users size={18} className="mr-2" />
              Change Patient
            </button>
          </div>
          
          {/* Patient Selector Dropdown */}
          {showPatientSelector && (
            <div className="mt-4 border-t pt-4">
              <div className="mb-3">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search patients by name or ID..."
                    value={patientSearchQuery}
                    onChange={(e) => setPatientSearchQuery(e.target.value)}
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredPatients.map(patient => (
                    <div 
                      key={patient?.user?._id}
                      onClick={() => handlePatientSelect(patient)}
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedPatient.id === patient.id 
                          ? 'bg-blue-50 border border-blue-200' 
                          : 'hover:bg-gray-100 border border-gray-100'
                      }`}
                    >
                      <img 
                        src={patient?.user?.image} 
                        alt={patient?.user?.name}
                        className="w-10 h-10 rounded-full mr-3" 
                      />
                      <div>
                        <p className="font-medium">{patient?.user?.name}</p>
                        <p className="text-xs text-gray-500">ID: {patient?.user?._id} • Age: {patient?.user?.age}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Save Message */}
        {savedMessage && (
          <div className="mb-6 p-3 bg-green-100 text-green-800 rounded-lg flex items-center">
            <AlertCircle size={18} className="mr-2" />
            {savedMessage}
          </div>
        )}
        
        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-6 overflow-x-auto pb-1" aria-label="Tabs">
            {[
              { id: 'vitals', label: 'Vitals', icon: Heart },
              { id: 'allergies', label: 'Allergies', icon: AlertTriangle },
              { id: 'heartRate', label: 'Heart Rate', icon: LineChart },
              { id: 'bloodPressure', label: 'Blood Pressure', icon: LineChart },
              { id: 'medications', label: 'Medications', icon: Pill },
              { id: 'appointments', label: 'Appointments', icon: Calendar },
              { id: 'timeline', label: 'Timeline', icon: FileText }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex items-center whitespace-nowrap pb-4 px-1 ${
                  activeSection === tab.id
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon size={18} className="mr-2" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
        
        {/* Form Sections */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          {/* Vitals Section */}
          {activeSection === 'vitals' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Record Vital Signs for {selectedPatient.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={vitals.date}
                    onChange={(e) => setVitals({...vitals, date: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Heart Rate (BPM)</label>
                  <input
                    type="number"
                    placeholder="Ex: 72"
                    value={vitals.heartRate}
                    onChange={(e) => setVitals({...vitals, heartRate: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Blood Pressure (Systolic)</label>
                  <input
                    type="number"
                    placeholder="Ex: 120"
                    value={vitals.systolic}
                    onChange={(e) => setVitals({...vitals, systolic: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Blood Pressure (Diastolic)</label>
                  <input
                    type="number"
                    placeholder="Ex: 80"
                    value={vitals.diastolic}
                    onChange={(e) => setVitals({...vitals, diastolic: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSaveVitals}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Save Vitals
                </button>
              </div>
            </div>
          )}
          
          {/* NEW: Allergies Section */}
          {activeSection === 'allergies' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Record Allergies for {selectedPatient.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Allergy Name/Substance</label>
                  <input
                    type="text"
                    placeholder="Ex: Penicillin, Peanuts, Latex"
                    value={allergy.name}
                    onChange={(e) => setAllergy({...allergy, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                  <select
                    value={allergy.severity}
                    onChange={(e) => setAllergy({...allergy, severity: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Mild">Mild</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Severe">Severe</option>
                    <option value="Life-threatening">Life-threatening</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reaction</label>
                  <input
                    type="text"
                    placeholder="Ex: Hives, Swelling, Difficulty breathing"
                    value={allergy.reaction}
                    onChange={(e) => setAllergy({...allergy, reaction: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                  <input
                    type="text"
                    placeholder="Ex: First discovered in 2020"
                    value={allergy.notes}
                    onChange={(e) => setAllergy({...allergy, notes: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleAddAllergy}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
                >
                  <Plus size={18} className="mr-2" />
                  Add Allergy
                </button>
              </div>
              
              {/* List of added allergies */}
              {allergies.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-md font-medium text-gray-700 mb-3">Patient Allergies</h4>
                  <div className="space-y-3">
                    {allergies.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 border-orange-500">
                        <div>
                          <div className="flex items-center">
                            <span className={`mr-2 px-2 py-1 text-xs font-medium rounded ${
                              item.severity === 'Mild' ? 'bg-yellow-100 text-yellow-800' :
                              item.severity === 'Moderate' ? 'bg-orange-100 text-orange-800' :
                              item.severity === 'Severe' ? 'bg-red-100 text-red-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {item.severity}
                            </span>
                            <p className="font-medium text-gray-900">{item.name}</p>
                          </div>
                          <p className="text-sm text-gray-600">Reaction: {item.reaction}</p>
                          {item.notes && <p className="text-sm text-gray-500">{item.notes}</p>}
                        </div>
                        <button 
                          onClick={() => handleRemoveAllergy(index)}
                          className="p-1 text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* NEW: Heart Rate Tracking Section */}
          {activeSection === 'heartRate' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Heart Rate Tracking for {selectedPatient.name}
              </h3>
              
              <div className="flex justify-between items-center mb-6">
                <div className="font-medium text-gray-700">Heart Rate History</div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setHeartRateView('week')}
                    className={`px-3 py-1 text-sm rounded-lg ${
                      heartRateView === 'week' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Weekly
                  </button>
                  <button
                    onClick={() => setHeartRateView('month')}
                    className={`px-3 py-1 text-sm rounded-lg ${
                      heartRateView === 'month' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={heartRateTracking.date}
                    onChange={(e) => setHeartRateTracking({...heartRateTracking, date: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Heart Rate (BPM)</label>
                  <input
                    type="number"
                    placeholder="Ex: 72"
                    value={heartRateTracking.rate}
                    onChange={(e) => setHeartRateTracking({...heartRateTracking, rate: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time of Day</label>
                  <select
                    value={heartRateTracking.timeOfDay}
                    onChange={(e) => setHeartRateTracking({...heartRateTracking, timeOfDay: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                    <option value="Night">Night</option>
                    <option value="After Exercise">After Exercise</option>
                    <option value="During Rest">During Rest</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <input
                    type="text"
                    placeholder="Ex: After medication, During stress"
                    value={heartRateTracking.notes}
                    onChange={(e) => setHeartRateTracking({...heartRateTracking, notes: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleAddHeartRate}                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
                  >
                    <Plus size={18} className="mr-2" />
                    Add Heart Rate Entry
                  </button>
                </div>
                
                {/* List of heart rate entries */}
                {filteredHeartRateEntries.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-md font-medium text-gray-700 mb-3">Heart Rate History</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate (BPM)</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {filteredHeartRateEntries.map((entry, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.date}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.timeOfDay}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  entry.rate > 100 ? 'bg-red-100 text-red-800' :
                                  entry.rate < 60 ? 'bg-blue-100 text-blue-800' :
                                  'bg-green-100 text-green-800'
                                }`}>
                                  {entry.rate} BPM
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500">{entry.notes}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <button 
                                  onClick={() => handleRemoveHeartRate(index)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* NEW: Blood Pressure Tracking Section */}
            {activeSection === 'bloodPressure' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Blood Pressure Tracking for {selectedPatient.name}
                </h3>
                
                <div className="flex justify-between items-center mb-6">
                  <div className="font-medium text-gray-700">Blood Pressure History</div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setBloodPressureView('week')}
                      className={`px-3 py-1 text-sm rounded-lg ${
                        bloodPressureView === 'week' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Weekly
                    </button>
                    <button
                      onClick={() => setBloodPressureView('month')}
                      className={`px-3 py-1 text-sm rounded-lg ${
                        bloodPressureView === 'month' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Monthly
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={bloodPressureTracking.date}
                      onChange={(e) => setBloodPressureTracking({...bloodPressureTracking, date: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Systolic (mm Hg)</label>
                    <input
                      type="number"
                      placeholder="Ex: 120"
                      value={bloodPressureTracking.systolic}
                      onChange={(e) => setBloodPressureTracking({...bloodPressureTracking, systolic: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Diastolic (mm Hg)</label>
                    <input
                      type="number"
                      placeholder="Ex: 80"
                      value={bloodPressureTracking.diastolic}
                      onChange={(e) => setBloodPressureTracking({...bloodPressureTracking, diastolic: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time of Day</label>
                    <select
                      value={bloodPressureTracking.timeOfDay}
                      onChange={(e) => setBloodPressureTracking({...bloodPressureTracking, timeOfDay: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Morning">Morning</option>
                      <option value="Afternoon">Afternoon</option>
                      <option value="Evening">Evening</option>
                      <option value="Night">Night</option>
                      <option value="After Exercise">After Exercise</option>
                      <option value="During Rest">During Rest</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <input
                      type="text"
                      placeholder="Ex: After medication, During stress"
                      value={bloodPressureTracking.notes}
                      onChange={(e) => setBloodPressureTracking({...bloodPressureTracking, notes: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleAddBloodPressure}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
                  >
                    <Plus size={18} className="mr-2" />
                    Add Blood Pressure Entry
                  </button>
                </div>
                
                {/* List of blood pressure entries */}
                {filteredBloodPressureEntries.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-md font-medium text-gray-700 mb-3">Blood Pressure History</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reading</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {filteredBloodPressureEntries.map((entry, index) => {
                            // Determine blood pressure category
                            let bpCategory = '';
                            let bpClass = '';
                            const systolic = parseInt(entry.systolic);
                            const diastolic = parseInt(entry.diastolic);
                            
                            if (systolic < 90 || diastolic < 60) {
                              bpCategory = 'Low';
                              bpClass = 'bg-blue-100 text-blue-800';
                            } else if (systolic <= 120 && diastolic <= 80) {
                              bpCategory = 'Normal';
                              bpClass = 'bg-green-100 text-green-800';
                            } else if (systolic <= 129 && diastolic <= 80) {
                              bpCategory = 'Elevated';
                              bpClass = 'bg-yellow-100 text-yellow-800';
                            } else if (systolic <= 139 || diastolic <= 89) {
                              bpCategory = 'Stage 1 Hypertension';
                              bpClass = 'bg-orange-100 text-orange-800';
                            } else if (systolic <= 180 || diastolic <= 120) {
                              bpCategory = 'Stage 2 Hypertension';
                              bpClass = 'bg-red-100 text-red-800';
                            } else {
                              bpCategory = 'Hypertensive Crisis';
                              bpClass = 'bg-purple-100 text-purple-800';
                            }
                            
                            return (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.timeOfDay}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  {entry.systolic}/{entry.diastolic} mm Hg
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                  <span className={`px-2 py-1 rounded-full text-xs ${bpClass}`}>
                                    {bpCategory}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{entry.notes}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  <button 
                                    onClick={() => handleRemoveBloodPressure(index)}
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Medications Section */}
            {activeSection === 'medications' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Current Medications for {selectedPatient.name}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Medication Name</label>
                    <input
                      type="text"
                      placeholder="Ex: Ibuprofen, Lisinopril"
                      value={medication.name}
                      onChange={(e) => setMedication({...medication, name: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
                    <input
                      type="text"
                      placeholder="Ex: 200mg, 10mg/5mL"
                      value={medication.dosage}
                      onChange={(e) => setMedication({...medication, dosage: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                    <input
                      type="text"
                      placeholder="Ex: Twice daily, Every 6 hours"
                      value={medication.frequency}
                      onChange={(e) => setMedication({...medication, frequency: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
                    <input
                      type="text"
                      placeholder="Ex: Pain relief, Blood pressure"
                      value={medication.purpose}
                      onChange={(e) => setMedication({...medication, purpose: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleAddMedication}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
                  >
                    <Plus size={18} className="mr-2" />
                    Add Medication
                  </button>
                </div>
                
                {/* List of medications */}
                {medications.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-md font-medium text-gray-700 mb-3">Current Medications</h4>
                    <div className="space-y-3">
                      {medications.map((med, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                          <div>
                            <p className="font-medium text-gray-900">{med.name} <span className="text-sm text-gray-600">({med.dosage})</span></p>
                            <p className="text-sm text-gray-600">{med.frequency} • {med.purpose}</p>
                          </div>
                          <button 
                            onClick={() => handleRemoveMedication(index)}
                            className="p-1 text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Appointments Section */}
            {activeSection === 'appointments' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Schedule Appointments for {selectedPatient.name}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={appointment.date}
                      onChange={(e) => setAppointment({...appointment, date: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input
                      type="time"
                      value={appointment.time}
                      onChange={(e) => setAppointment({...appointment, time: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
                    <input
                      type="text"
                      placeholder="Ex: Dr. Smith"
                      value={appointment.doctor}
                      onChange={(e) => setAppointment({...appointment, doctor: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <input
                      type="text"
                      placeholder="Ex: Cardiology, Neurology"
                      value={appointment.department}
                      onChange={(e) => setAppointment({...appointment, department: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleAddAppointment}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
                  >
                    <Plus size={18} className="mr-2" />
                    Add Appointment
                  </button>
                </div>
                
                {/* List of appointments */}
                {appointments.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-md font-medium text-gray-700 mb-3">Scheduled Appointments</h4>
                    <div className="space-y-3">
                      {appointments.map((appt, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 border-green-500">
                          <div>
                            <p className="font-medium text-gray-900">{appt.date} at {appt.time}</p>
                            <p className="text-sm text-gray-600">With {appt.doctor} ({appt.department})</p>
                          </div>
                          <button 
                            onClick={() => handleRemoveAppointment(index)}
                            className="p-1 text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Timeline Section */}
            {activeSection === 'timeline' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Add Medical Event to {selectedPatient.name}'s Timeline
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                    <select
                      value={timelineEvent.type}
                      onChange={(e) => setTimelineEvent({...timelineEvent, type: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="appointment">Appointment</option>
                      <option value="test">Test/Procedure</option>
                      <option value="diagnosis">Diagnosis</option>
                      <option value="treatment">Treatment</option>
                      <option value="symptom">Symptom Onset</option>
                      <option value="medication">Medication Change</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={timelineEvent.date}
                      onChange={(e) => setTimelineEvent({...timelineEvent, date: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      placeholder="Ex: Annual Checkup, MRI Scan, Diabetes Diagnosis"
                      value={timelineEvent.title}
                      onChange={(e) => setTimelineEvent({...timelineEvent, title: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
                    <textarea
                      rows="3"
                      placeholder="Describe the event in detail..."
                      value={timelineEvent.details}
                      onChange={(e) => setTimelineEvent({...timelineEvent, details: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  {timelineEvent.type === 'appointment' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
                        <input
                          type="text"
                          placeholder="Ex: Dr. Smith"
                          value={timelineEvent.doctor}
                          onChange={(e) => setTimelineEvent({...timelineEvent, doctor: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                          type="text"
                          placeholder="Ex: Main Hospital, Cardiology Dept."
                          value={timelineEvent.location}
                          onChange={(e) => setTimelineEvent({...timelineEvent, location: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                        <input
                          type="text"
                          placeholder="Ex: 30 minutes, 1 hour"
                          value={timelineEvent.duration}
                          onChange={(e) => setTimelineEvent({...timelineEvent, duration: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </>
                  )}
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea
                      rows="2"
                      placeholder="Additional notes..."
                      value={timelineEvent.notes}
                      onChange={(e) => setTimelineEvent({...timelineEvent, notes: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleSaveTimelineEvent}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Add to Timeline
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  };
  
  export default AddMedicalData;