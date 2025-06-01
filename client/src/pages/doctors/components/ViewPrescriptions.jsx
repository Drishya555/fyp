import { useState, useEffect } from 'react';
import axios from 'axios';
import Authstore from '../../../hooks/authStore.js';
import { host } from '../../../host.js';
import {
  FileText,
  Search,
  User,
  Users,
  ArrowLeft,
  Pill,
  Calendar,
  Clock,
  AlertCircle,
  Eye,
  ChevronDown,
  ChevronUp,
  Stethoscope,
  Activity
} from 'lucide-react';

const ViewPrescriptions = () => {
  const [savedMessage, setSavedMessage] = useState(null);
  const [patientSearchQuery, setPatientSearchQuery] = useState('');
  const [showPatientSelector, setShowPatientSelector] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedPrescriptions, setExpandedPrescriptions] = useState(new Set());
  const token = Authstore.getToken();

  // Fetch doctor and patients data
  useEffect(() => {
    const getdocbyid = async () => {
      const docid = Authstore.getUser()?.userid;
      const response = await axios.get(`${host}/api/doctors/getselecteddoc/${docid}`,{
        headers: {
          Authorization: token ? `Bearer ${token}` : '',  
        },
      });
      setDoctor(response.data.doctor);
    }

    const getpatientsbydocid = async () => {
      const docid = Authstore.getUser()?.userid;
      const response = await axios.get(`${host}/api/appointment/getappointmentbydoctor/${docid}`,{
        headers: {
          Authorization: token ? `Bearer ${token}` : '',  
        },
      });
      setPatients(response.data.appointments);
     
      if (response.data.appointments.length > 0) {
        const firstPatient = {
          id: response.data.appointments[0].user._id,
          name: response.data.appointments[0].user?.name,
          email: response.data.appointments[0].user?.email,
          photo: response.data.appointments[0].user?.image || '/api/placeholder/40/40'
        };
       
        setSelectedPatient(firstPatient);
        // Auto-load prescriptions for first patient
        fetchPrescriptions(firstPatient.id);
      }
    }

    getdocbyid();
    getpatientsbydocid();
  }, []);

  const fetchPrescriptions = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${host}/api/prescriptions/user/${userId}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      
      setPrescriptions(response.data.data);
      setSavedMessage(`Loaded ${response.data.count} prescriptions for ${selectedPatient?.name}`);
      setTimeout(() => setSavedMessage(null), 3000);
      
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
      setSavedMessage(error.response?.data?.message || 'Error loading prescriptions. Please try again.');
      setTimeout(() => setSavedMessage(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handlePatientSelect = (patient) => {
    const patientData = {
      id: patient.user?._id,
      name: patient.user?.name,
      email: patient.user?.email,
      photo: patient.user?.image || '/api/placeholder/40/40'
    };
    
    setSelectedPatient(patientData);
    setShowPatientSelector(false);
    setPrescriptions([]);
    
    // Fetch prescriptions for selected patient
    fetchPrescriptions(patientData.id);
  };

  const togglePrescriptionExpansion = (prescriptionId) => {
    const newExpanded = new Set(expandedPrescriptions);
    if (newExpanded.has(prescriptionId)) {
      newExpanded.delete(prescriptionId);
    } else {
      newExpanded.add(prescriptionId);
    }
    setExpandedPrescriptions(newExpanded);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  

  const filteredPatients = patientSearchQuery
    ? patients.filter(patient =>
        patient?.user?.name?.toLowerCase().includes(patientSearchQuery.toLowerCase()) ||
        patient?.user?._id?.toLowerCase().includes(patientSearchQuery.toLowerCase()))
    : patients;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 font-sans text-gray-900 antialiased">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white shadow-sm backdrop-blur-lg bg-white/90">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Pill className="h-6 w-6 text-blue-600 mr-2" />
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">MediTrack</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-gray-900">Dr. {doctor?.name}</p>
                <p className="text-xs text-gray-500">{doctor?.specialization?.specialization}</p>
              </div>
              <div className="relative">
                <img
                  src={doctor?.image || '/api/placeholder/40/40'}
                  alt={doctor?.name || "Doctor"}
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
            <div className="flex items-center">
              <button className="mr-4 text-gray-500 hover:text-gray-700">
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-2xl font-bold text-gray-900">View Prescriptions</h2>
            </div>
            <p className="mt-1 text-sm text-gray-600">
              View patient prescription history and medication details
            </p>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Activity size={16} className="mr-2" />
            {prescriptions.length} prescriptions found
          </div>
        </div>
        
        {/* Patient Selection */}
        <div className="mb-6 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-4 bg-blue-100 p-3 rounded-full">
                <User size={20} className="text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Patient Information</h3>
                {selectedPatient ? (
                  <div className="flex items-center mt-2">
                    <img
                      src={selectedPatient.photo}
                      alt={selectedPatient.name}
                      className="w-10 h-10 rounded-full mr-3 ring-2 ring-blue-100"
                    />
                    <div>
                      <p className="font-medium">{selectedPatient.name}</p>
                      <p className="text-sm text-gray-500">ID: {selectedPatient.id}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 mt-2">No patient selected</p>
                )}
              </div>
            </div>
            <button
              onClick={() => setShowPatientSelector(!showPatientSelector)}
              className="px-4 py-2 bg-blue-100 text-blue-700 font-medium rounded-lg hover:bg-blue-200 transition-colors duration-200 flex items-center"
            >
              <Users size={18} className="mr-2" />
              {selectedPatient ? 'Change Patient' : 'Select Patient'}
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
                      key={patient?.user?._id || patient?.id}
                      onClick={() => handlePatientSelect(patient)}
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedPatient?.id === patient.user?._id
                          ? 'bg-blue-50 border border-blue-200'
                          : 'hover:bg-gray-100 border border-gray-100'
                      }`}
                    >
                      <img
                        src={patient?.user?.image || '/api/placeholder/40/40'}
                        alt={patient?.user?.name || "Patient"}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <p className="font-medium">{patient?.user?.name}</p>
                        <p className="text-xs text-gray-500">ID: {patient?.user?._id}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Status Message */}
        {savedMessage && (
          <div className="mb-6 p-3 bg-green-100 text-green-800 rounded-lg flex items-center">
            <AlertCircle size={18} className="mr-2" />
            {savedMessage}
          </div>
        )}
        
        {/* Loading State */}
        {loading && (
          <div className="mb-6 p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-600">Loading prescriptions...</p>
          </div>
        )}
        
        {/* Prescriptions List */}
        {!loading && selectedPatient && (
          <div className="space-y-4">
            {prescriptions.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 text-center">
                <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Prescriptions Found</h3>
                <p className="text-gray-600">No prescriptions have been created for this patient yet.</p>
              </div>
            ) : (
              prescriptions.map((prescription) => (
                <div key={prescription._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  {/* Prescription Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-lg mr-4">
                          <FileText size={20} className="text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Prescription - {formatDate(prescription.createdAt)}
                          </h3>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <Stethoscope size={14} className="mr-1" />
                            <span className="mr-4">{prescription.doctor.name}</span>
                            {prescription.appointment && (
                              <>
                                <Calendar size={14} className="mr-1" />
                                <span className="mr-2">{formatDate(prescription.appointment.date)}</span>
                                <Clock size={14} className="mr-1" />
                                <span>{prescription.appointment.time}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => togglePrescriptionExpansion(prescription._id)}
                        className="flex items-center px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye size={16} className="mr-2" />
                        <span className="text-sm font-medium">
                          {expandedPrescriptions.has(prescription._id) ? 'Collapse' : 'View Details'}
                        </span>
                        {expandedPrescriptions.has(prescription._id) ? (
                          <ChevronUp size={16} className="ml-1" />
                        ) : (
                          <ChevronDown size={16} className="ml-1" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {/* Prescription Details */}
                  {expandedPrescriptions.has(prescription._id) && (
                    <div className="p-6">
                      {/* Prescription Notes */}
                      <div className="mb-6">
                        <h4 className="font-medium text-gray-900 mb-2">Prescription Notes</h4>
                        <p className="text-gray-700 bg-gray-50 p-4 rounded-lg leading-relaxed">
                          {prescription.prescription}
                        </p>
                      </div>
                      
                      {/* Medications */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Medications ({prescription.medication.length})</h4>
                        <div className="space-y-3">
                          {prescription.medication.map((med, index) => (
                            <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Medicine</p>
                                  <p className="font-semibold text-gray-900">{med.medicineName}</p>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Dosage</p>
                                  <p className="text-gray-800">{med.dosage}</p>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Frequency</p>
                                  <p className="text-gray-800">{med.frequency}</p>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Duration</p>
                                  <p className="text-gray-800">{med.duration}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
        
        {/* Empty State - No Patient Selected */}
        {!selectedPatient && !loading && (
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 text-center">
            <Users size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Select Patient</h3>
            <p className="text-gray-600 mb-4">Choose a patient to view their prescription history.</p>
            <button
              onClick={() => setShowPatientSelector(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center mx-auto"
            >
              <Users size={18} className="mr-2" />
              Select Patient
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ViewPrescriptions;