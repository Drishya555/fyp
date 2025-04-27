/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import axios from 'axios';
import Authstore from '../../../hooks/authStore.js';
import {host} from '../../../host.js';
import {
  Heart,
  FileText,
  AlertCircle,
  Save,
  Search,
  User,
  Users,
} from 'lucide-react';

const AddMedicalData = () => {
  const [activeSection, setActiveSection] = useState('vitals');
  const [savedMessage, setSavedMessage] = useState(null);
  const [patientSearchQuery, setPatientSearchQuery] = useState('');
  const [showPatientSelector, setShowPatientSelector] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const [patients, setPatients] = useState([]);
  const [issaving, setIsSaving] = useState(false);
  const token = Authstore.getToken();  

  useEffect(() => {
    const getdocbyid = async () => {
      const docid = Authstore.getUser()?.userid;
      const response = await axios.get(`${host}/api/doctors/getselecteddoc/${docid}`,{
        headers: {
          Authorization: token ? `Bearer ${token}` : '',  
        },
      })
      setDoctor(response.data.doctor)
    }
    getdocbyid()
  }, [])
  
  const [selectedPatient, setSelectedPatient] = useState({
    id: '',
    name: '',
    age: '',
    photo: '/api/placeholder/40/40'
  });

  useEffect(() => {
    const getpatientsbydocid = async () => {
      const docid = Authstore.getUser()?.userid;
      const response = await axios.get(`${host}/api/appointment/getappointmentbydoctor/${docid}`,{
        headers: {
          Authorization: token ? `Bearer ${token}` : '',  
        },
      })
      setPatients(response.data.appointments)
      
      if (response.data.appointments.length > 0) {
        setSelectedPatient({
          id: response.data.appointments[0].user._id,
          name: response.data.appointments[0].user?.name,
          age: response.data.appointments[0].user?.age || '',
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
  
  const [timelineEvent, setTimelineEvent] = useState({
    type: 'appointment',
    date: new Date().toISOString().split('T')[0],
    title: '',
    details: '',
    doctor: doctor?.name || '',
    location: '',
    duration: '',
    notes: ''
  });

  useEffect(() => {
    if (doctor) {
      setTimelineEvent(prev => ({
        ...prev,
        doctor: doctor.name // Auto-fill doctor name when available
      }));
    }
  }, [doctor]);
  
  const handleSaveVitals = async () => {
    if (!selectedPatient.id || !doctor?._id) {
      setSavedMessage('Please select a patient');
      setTimeout(() => setSavedMessage(null), 3000);
      return;
    }

    setIsSaving(true);
    try {
      const vitalsData = {
        heartRate: Number(vitals.heartRate),
        bloodPressure: {
          systolic: Number(vitals.systolic),
          diastolic: Number(vitals.diastolic)
        },
        date: new Date(vitals.date)
      };

      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(`${host}/api/medical-records`, {
        patientId: selectedPatient.id,
        doctorId: doctor._id,
        vitals: vitalsData
      },{
        headers: {
          Authorization: token ? `Bearer ${token}` : '',  
        },
      });

      setSavedMessage(`Vitals saved for ${selectedPatient.name}`);
      setTimeout(() => setSavedMessage(null), 3000);
    } catch (error) {
      console.error('Error saving vitals:', error);
      setSavedMessage('Failed to save vitals');
      setTimeout(() => setSavedMessage(null), 3000);
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleSaveTimelineEvent = async () => {
    if (!selectedPatient.id || !doctor?._id) {
      setSavedMessage('Please select a patient');
      setTimeout(() => setSavedMessage(null), 3000);
      return;
    }
  
    setIsSaving(true);
    try {
      const eventData = {
        type: timelineEvent.type,
        date: new Date(timelineEvent.date),
        title: timelineEvent.title,
        details: timelineEvent.details,
        doctor: timelineEvent.doctor || doctor.name, // Fallback to doctor's name if empty
        location: timelineEvent.location,
        duration: timelineEvent.duration ? `${timelineEvent.duration} minutes` : '',
        notes: timelineEvent.notes
      };
  
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(`${host}/api/medical-records`, {
        patientId: selectedPatient.id,
        doctorId: doctor._id,
        timelineEvent: eventData
      },{headers: {
        Authorization: token ? `Bearer ${token}` : '',  
      },});
  
      setSavedMessage(`Timeline event added for ${selectedPatient.name}`);
      setTimeout(() => setSavedMessage(null), 3000);
      
      // Reset form but keep the doctor name
      setTimelineEvent({
        type: 'appointment',
        date: new Date().toISOString().split('T')[0],
        title: '',
        details: '',
        doctor: doctor.name, // Keep doctor name on reset
        location: '',
        duration: '',
        notes: ''
      });
    } catch (error) {
      console.error('Error saving timeline event:', error);
      setSavedMessage('Failed to save timeline event');
      setTimeout(() => setSavedMessage(null), 3000);
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleSaveAllData = async () => {
    if (!selectedPatient.id || !doctor?._id) {
      setSavedMessage('Please select a patient');
      setTimeout(() => setSavedMessage(null), 3000);
      return;
    }

    setIsSaving(true);
    try {
      const vitalsData = {
        heartRate: Number(vitals.heartRate),
        bloodPressure: {
          systolic: Number(vitals.systolic),
          diastolic: Number(vitals.diastolic)
        },
        date: new Date(vitals.date)
      };

      const eventData = {
        type: timelineEvent.type,
        date: new Date(timelineEvent.date),
        title: timelineEvent.title,
        details: timelineEvent.details,
        doctor: timelineEvent.doctor,
        location: timelineEvent.location,
        duration: timelineEvent.duration,
        notes: timelineEvent.notes
      };

      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(`${host}/api/medical-records`, {
        patientId: selectedPatient.id,
        doctorId: doctor._id,
        vitals: vitalsData,
        timelineEvent: eventData
      });

      setSavedMessage(`All data saved for ${selectedPatient.name}`);
      setTimeout(() => setSavedMessage(null), 3000);
      
      // Reset forms
      setVitals({
        heartRate: '',
        systolic: '',
        diastolic: '',
        date: new Date().toISOString().split('T')[0]
      });
      
      setTimelineEvent({
        type: 'appointment',
        date: new Date().toISOString().split('T')[0],
        title: '',
        details: '',
        doctor: '',
        location: '',
        duration: '',
        notes: ''
      });
    } catch (error) {
      console.error('Error saving all data:', error);
      setSavedMessage('Failed to save data');
      setTimeout(() => setSavedMessage(null), 3000);
    } finally {
      setIsSaving(false);
    }
  };
  
  const handlePatientSelect = (patient) => {
    setSelectedPatient({
      id: patient.user?._id,
      name: patient.user?.name,
      age: patient.user?.age || '',
      photo: patient.user?.image || '/api/placeholder/40/40'
    });
    setShowPatientSelector(false);
    setSavedMessage(`Selected patient: ${patient?.user?.name}`);
    setTimeout(() => setSavedMessage(null), 3000);
  };
  
  const filteredPatients = patientSearchQuery 
    ? patients.filter(patient => 
        patient?.user?.name.toLowerCase().includes(patientSearchQuery.toLowerCase()) ||
        patient?.user?._id?.toLowerCase().includes(patientSearchQuery.toLowerCase()))
    : patients;

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
          
         
            
            
            
            {/* Timeline Section */}
            {activeSection === 'timeline' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Add Medical Event to {selectedPatient.name}&apos;s Timeline
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
                          <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                          <input
                            type="number"
                            placeholder="Ex: 30"
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







