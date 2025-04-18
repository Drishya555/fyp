/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';
import Authstore from '../hooks/authStore.js';
import {host} from '../host.js'
import {
  Calendar,
  Heart,
  Pill,
  FileText,
  Plus,
  Trash2,
  AlertCircle,
  Save,
  User
} from 'lucide-react';

const UpdateMedicalData = ({id}) => {
  const [activeSection, setActiveSection] = useState('vitals');
  const [savedMessage, setSavedMessage] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [patient, setPatient] = useState(null);
  console.log(id)
  useEffect(() => {
    const getdocbyid = async () => {
      const docid = Authstore.getUser()?.userid;
      const response = await axios.get(`${host}/api/doctors/getselecteddoc/${docid}`)
      setDoctor(response.data.doctor)
    }

    getdocbyid();
    
    // Fetch patient details - assuming patient ID is available via URL params or context
    const fetchPatientData = async () => {
      // In a real implementation, you would get the patient ID from URL params or context
      // const patientId = // get from URL or context
      // For demo purposes, using a hardcoded patient
      setPatient({
        id: '9834A-43',
        name: 'Ethan Miller',
        age: 55,
        photo: '/api/placeholder/40/40'
      });
      
      // Fetch existing patient data to populate the form
      // const response = await axios.get(`${host}/api/patients/${patientId}`);
      // setPatient(response.data.patient);
      // You could also pre-populate the form data with the patient's existing records
    }
    
    fetchPatientData();
  }, []);
  
  // Form states
  const [vitals, setVitals] = useState({
    heartRate: '72',
    systolic: '120',
    diastolic: '80',
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
  
  // Pre-populated data for demonstration purposes
  const [medications, setMedications] = useState([
    {
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      purpose: 'Blood Pressure'
    },
    {
      name: 'Atorvastatin',
      dosage: '20mg',
      frequency: 'Once daily at night',
      purpose: 'Cholesterol'
    }
  ]);
  
  const [appointments, setAppointments] = useState([
    {
      date: '2025-04-25',
      time: '10:00',
      doctor: 'Dr. Emily Smith',
      department: 'Cardiology'
    }
  ]);
  
  const handleUpdateVitals = () => {
    // Logic to update vitals data
    setSavedMessage(`Vitals data updated for ${patient?.name}`);
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
  
  const handleUpdateTimelineEvent = () => {
    // Logic to update timeline event
    setSavedMessage(`Medical event updated in ${patient?.name}'s timeline`);
    setTimeout(() => setSavedMessage(null), 3000);
  };
  
  const handleUpdateAllData = () => {
    // Logic to update all collected data
    setSavedMessage(`All data updated for patient ${patient?.name}`);
    setTimeout(() => setSavedMessage(null), 3000);
  };

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
            <h2 className="text-2xl font-bold text-gray-900">Update Medical Record</h2>
            <p className="mt-1 text-sm text-gray-600">
              Update patient health data and keep medical records current
            </p>
          </div>
          <button 
            onClick={handleUpdateAllData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
          >
            <Save size={18} className="mr-2" />
            Update All Data
          </button>
        </div>
        
        {/* Patient Info Section */}
        <div className="mb-6 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="mr-4 bg-blue-100 p-3 rounded-full">
              <User size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Patient Information</h3>
              <div className="flex items-center mt-2">
                <img 
                  src={patient?.photo} 
                  alt={patient?.name}
                  className="w-10 h-10 rounded-full mr-3 ring-2 ring-blue-100" 
                />
                <div>
                  <p className="font-medium">{patient?.name}</p>
                  <p className="text-sm text-gray-500">ID: {patient?.id} • Age: {patient?.age}</p>
                </div>
              </div>
            </div>
          </div>
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
          <nav className="flex space-x-8" aria-label="Tabs">
            {[
              { id: 'vitals', label: 'Vitals', icon: Heart },
              { id: 'medications', label: 'Medications', icon: Pill },
              { id: 'appointments', label: 'Appointments', icon: Calendar },
              { id: 'timeline', label: 'Timeline Events', icon: FileText }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex items-center pb-4 px-1 ${
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
                Update Vital Signs for {patient?.name}
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
                  onClick={handleUpdateVitals}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Update Vitals
                </button>
              </div>
            </div>
          )}
          
          {/* Medications Section */}
          {activeSection === 'medications' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Update Medications for {patient?.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Medication Name</label>
                  <input
                    type="text"
                    placeholder="Ex: Lisinopril"
                    value={medication.name}
                    onChange={(e) => setMedication({...medication, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
                  <input
                    type="text"
                    placeholder="Ex: 10mg"
                    value={medication.dosage}
                    onChange={(e) => setMedication({...medication, dosage: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                  <input
                    type="text"
                    placeholder="Ex: Once daily"
                    value={medication.frequency}
                    onChange={(e) => setMedication({...medication, frequency: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
                  <input
                    type="text"
                    placeholder="Ex: Blood Pressure"
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
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{med.name} ({med.dosage})</p>
                          <p className="text-sm text-gray-600">{med.frequency}, Purpose: {med.purpose}</p>
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
                Update Appointments for {patient?.name}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Doctor Name</label>
                  <input
                    type="text"
                    placeholder="Ex: Dr. Emily Smith"
                    value={appointment.doctor}
                    onChange={(e) => setAppointment({...appointment, doctor: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select
                    value={appointment.department}
                    onChange={(e) => setAppointment({...appointment, department: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Department</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="General Practice">General Practice</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Dermatology">Dermatology</option>
                  </select>
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
                    {appointments.map((apt, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{apt.doctor}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(apt.date).toLocaleDateString()}, {apt.time} - {apt.department}
                          </p>
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
          
          {/* Timeline Events Section */}
          {activeSection === 'timeline' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Update Medical Timeline for {patient?.name}
              </h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="eventType"
                      value="appointment"
                      checked={timelineEvent.type === 'appointment'}
                      onChange={() => setTimelineEvent({...timelineEvent, type: 'appointment'})}
                      className="mr-2"
                    />
                    <span>Appointment</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="eventType"
                      value="diagnosis"
                      checked={timelineEvent.type === 'diagnosis'}
                      onChange={() => setTimelineEvent({...timelineEvent, type: 'diagnosis'})}
                      className="mr-2"
                    />
                    <span>Diagnosis</span>
                  </label>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={timelineEvent.date}
                    onChange={(e) => setTimelineEvent({...timelineEvent, date: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    placeholder="Ex: Cardiology Checkup"
                    value={timelineEvent.title}
                    onChange={(e) => setTimelineEvent({...timelineEvent, title: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
                  <textarea
                    rows="3"
                    placeholder="Describe the event..."
                    value={timelineEvent.details}
                    onChange={(e) => setTimelineEvent({...timelineEvent, details: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
                  <input
                    type="text"
                    placeholder="Ex: Dr. Emily Smith"
                    value={timelineEvent.doctor}
                    onChange={(e) => setTimelineEvent({...timelineEvent, doctor: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                {timelineEvent.type === 'appointment' ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        placeholder="Ex: Central Medical Center, Room 305"
                        value={timelineEvent.location}
                        onChange={(e) => setTimelineEvent({...timelineEvent, location: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                      <input
                        type="text"
                        placeholder="Ex: 45 minutes"
                        value={timelineEvent.duration}
                        onChange={(e) => setTimelineEvent({...timelineEvent, duration: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <input
                      type="text"
                      placeholder="Additional notes..."
                      value={timelineEvent.notes}
                      onChange={(e) => setTimelineEvent({...timelineEvent, notes: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleUpdateTimelineEvent}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Update Timeline
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UpdateMedicalData;