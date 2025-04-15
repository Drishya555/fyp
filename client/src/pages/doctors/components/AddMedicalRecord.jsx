import { useState } from 'react';
import {
  Calendar,
  Heart,
  Pill,
  FileText,
  ChevronLeft,
  Plus,
  Trash2,
  AlertCircle,
  Save,
  Search,
  User,
  Users
} from 'lucide-react';

const AddMedicalData = () => {
  const [activeSection, setActiveSection] = useState('vitals');
  const [savedMessage, setSavedMessage] = useState(null);
  const [patientSearchQuery, setPatientSearchQuery] = useState('');
  const [showPatientSelector, setShowPatientSelector] = useState(false);
  
  // Selected patient state
  const [selectedPatient, setSelectedPatient] = useState({
    id: '9834A-43',
    name: 'Ethan Miller',
    age: 55,
    photo: '/api/placeholder/40/40'
  });
  
  // Mock patient data
  const patientsList = [
    { id: '9834A-43', name: 'Ethan Miller', age: 55, photo: '/api/placeholder/40/40' },
    { id: '7621B-52', name: 'Sarah Johnson', age: 42, photo: '/api/placeholder/40/40' },
    { id: '5489C-38', name: 'Michael Chen', age: 67, photo: '/api/placeholder/40/40' },
    { id: '3256D-19', name: 'Lisa Garcia', age: 31, photo: '/api/placeholder/40/40' },
    { id: '9012E-27', name: 'Robert Williams', age: 58, photo: '/api/placeholder/40/40' }
  ];
  
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
    setSelectedPatient(patient);
    setShowPatientSelector(false);
    
    // Reset form data when changing patients (optional)
    setMedications([]);
    setAppointments([]);
    setSavedMessage(`Selected patient: ${patient.name}`);
    setTimeout(() => setSavedMessage(null), 3000);
  };
  
  const filteredPatients = patientSearchQuery 
    ? patientsList.filter(patient => 
        patient.name.toLowerCase().includes(patientSearchQuery.toLowerCase()) ||
        patient.id.toLowerCase().includes(patientSearchQuery.toLowerCase()))
    : patientsList;

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
                <p className="text-sm font-medium text-gray-900">Dr. James Wilson</p>
                <p className="text-xs text-gray-500">Physician</p>
              </div>
              <div className="relative">
                <img
                  src="/api/placeholder/35/35"
                  alt="Dr. James Wilson"
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
            <div className="flex items-center mb-2">
              <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                <ChevronLeft size={16} className="mr-1" />
                <span className="text-sm font-medium">Back to Dashboard</span>
              </a>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Add Medical Data</h2>
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
                      key={patient.id}
                      onClick={() => handlePatientSelect(patient)}
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedPatient.id === patient.id 
                          ? 'bg-blue-50 border border-blue-200' 
                          : 'hover:bg-gray-100 border border-gray-100'
                      }`}
                    >
                      <img 
                        src={patient.photo} 
                        alt={patient.name}
                        className="w-10 h-10 rounded-full mr-3" 
                      />
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-xs text-gray-500">ID: {patient.id} • Age: {patient.age}</p>
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
          
          {/* Medications Section */}
          {activeSection === 'medications' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Add Medications for {selectedPatient.name}
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
              
              {/* List of added medications */}
              {medications.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-md font-medium text-gray-700 mb-3">Added Medications</h4>
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
              
              {/* List of added appointments */}
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
                Add Medical Timeline Event for {selectedPatient.name}
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