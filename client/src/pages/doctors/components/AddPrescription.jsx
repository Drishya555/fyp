

import { useState, useEffect } from 'react';
import axios from 'axios';
import Authstore from '../../../hooks/authStore.js';
import { host } from '../../../host.js';
import {
  FileText,
  Plus,
  Trash2,
  AlertCircle,
  Save,
  Search,
  User,
  Users,
  ArrowLeft,
  Pill
} from 'lucide-react';


const AddPrescription = () => {
  const [savedMessage, setSavedMessage] = useState(null);
  const [patientSearchQuery, setPatientSearchQuery] = useState('');
  const [showPatientSelector, setShowPatientSelector] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
 
  // Form state
  const [prescriptionForm, setPrescriptionForm] = useState({
    user: '',
    appointment: '',
    doctor: '',
    medicine: '',
    prescription: '',
    medication: [
      {
        medicineName: '',
        dosage: '',
        frequency: '',
        duration: ''
      }
    ]
  });


  useEffect(() => {
    const getdocbyid = async () => {
      const docid = Authstore.getUser()?.userid;
      const response = await axios.get(`${host}/api/doctors/getselecteddoc/${docid}`);
      setDoctor(response.data.doctor);
    }


    getdocbyid();
  }, []);


  useEffect(() => {
    const getpatientsbydocid = async () => {
      const docid = Authstore.getUser()?.userid;
      const response = await axios.get(`${host}/api/appointment/getappointmentbydoctor/${docid}`);
      setPatients(response.data.appointments);
     
      // Set the first patient as selected by default if available
      if (response.data.appointments.length > 0) {
        const firstPatient = {
          id: response.data.appointments[0].user._id,
          name: response.data.appointments[0].user?.name,
          email: response.data.appointments[0].user?.email,
          photo: response.data.appointments[0].user?.image || '/api/placeholder/40/40'
        };
       
        setSelectedPatient(firstPatient);
        setPrescriptionForm(prev => ({
          ...prev,
          user: firstPatient.id,
          doctor: docid
        }));
      }
    }


    getpatientsbydocid();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrescriptionForm({
      ...prescriptionForm,
      [name]: value
    });
  };


  const handleMedicationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMedication = [...prescriptionForm.medication];
    updatedMedication[index] = {
      ...updatedMedication[index],
      [name]: value
    };
   
    setPrescriptionForm({
      ...prescriptionForm,
      medication: updatedMedication
    });
  };


  const addMedication = () => {
    setPrescriptionForm({
      ...prescriptionForm,
      medication: [
        ...prescriptionForm.medication,
        { medicineName: '', dosage: '', frequency: '', duration: '' }
      ]
    });
  };


  const removeMedication = (index) => {
    if (prescriptionForm.medication.length <= 1) return;
   
    const updatedMedication = prescriptionForm.medication.filter((_, i) => i !== index);
    setPrescriptionForm({
      ...prescriptionForm,
      medication: updatedMedication
    });
  };


  const handlePatientSelect = (patient) => {
    const patientData = {
      id: patient.user?._id,
      name: patient.user?.name,
      email: patient.user?.email,
      photo: patient.user?.image || '/api/placeholder/40/40'
    };
   
    setSelectedPatient(patientData);
    setPrescriptionForm(prev => ({
      ...prev,
      user: patientData.id,
      appointment: patient._id || ''
    }));
   
    setShowPatientSelector(false);
   
    setSavedMessage(`Selected patient: ${patient.user?.name}`);
    setTimeout(() => setSavedMessage(null), 3000);
  };


  const handleSavePrescription = async (e) => {
    e.preventDefault();
   
    try {
      // Prepare the data for API
      const prescriptionData = {
        user: prescriptionForm.user,
        doctor: prescriptionForm.doctor,
        appointment: prescriptionForm.appointment || null,
        prescription: prescriptionForm.prescription,
        medication: prescriptionForm.medication
      };


      // Make API call to save prescription
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(`${host}/api/prescriptions`, prescriptionData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });


      // Handle success
      setSavedMessage(`Prescription saved successfully for ${selectedPatient?.name}`);
     
      // Reset form (optional)
      setPrescriptionForm({
        user: selectedPatient.id,
        appointment: '',
        doctor: Authstore.getUser()?.userid,
        prescription: '',
        medication: [{
          medicineName: '',
          dosage: '',
          frequency: '',
          duration: ''
        }]
      });


    } catch (error) {
      console.error('Error saving prescription:', error);
      setSavedMessage(error.response?.data?.error || 'Error saving prescription. Please try again.');
    } finally {
      setTimeout(() => setSavedMessage(null), 3000);
    }
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
            <Pill  className="h-6 w-6 text-blue-600 mr-2" />
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
              <h2 className="text-2xl font-bold text-gray-900">Add Prescription</h2>
            </div>
            <p className="mt-1 text-sm text-gray-600">
              Create new prescription for patient with medication details
            </p>
          </div>
          <button
            onClick={handleSavePrescription}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
          >
            <Save size={18} className="mr-2" />
            Save Prescription
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
       
        {/* Save Message */}
        {savedMessage && (
          <div className="mb-6 p-3 bg-green-100 text-green-800 rounded-lg flex items-center">
            <AlertCircle size={18} className="mr-2" />
            {savedMessage}
          </div>
        )}
       
        {/* Prescription Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="border-b border-gray-200 px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-900">
              <FileText size={18} className="inline mr-2" />
              Prescription Details
            </h3>
          </div>
         
          <form onSubmit={handleSavePrescription} className="p-6">
            {/* Appointment Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Appointment</label>
              <select
                name="appointment"
                value={prescriptionForm.appointment}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Related Appointment</option>
                {patients
                  .filter(patient => patient?.user?._id === selectedPatient?.id)
                  .map(appointment => (
                    <option key={appointment._id} value={appointment._id}>
                      {new Date(appointment.date).toLocaleDateString()} - {appointment.time}
                    </option>
                  ))
                }
              </select>
            </div>
           
            {/* Prescription Notes */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Prescription Notes</label>
              <textarea
                name="prescription"
                value={prescriptionForm.prescription}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter prescription details, diagnosis, instructions, or notes..."
                required
              ></textarea>
            </div>
           
            {/* Primary Medicine */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Medicine (Optional)</label>
              <select
                name="medicine"
                value={prescriptionForm.medicine}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Primary Medicine</option>
                <option value="med1">Amoxicillin</option>
                <option value="med2">Lisinopril</option>
                <option value="med3">Metformin</option>
                <option value="med4">Atorvastatin</option>
                <option value="med5">Levothyroxine</option>
              </select>
            </div>
           
            {/* Medications List */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-md font-medium text-gray-800">Medications</h4>
                <button
                  type="button"
                  onClick={addMedication}
                  className="flex items-center px-3 py-1.5 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors"
                >
                  <Plus size={16} className="mr-1" />
                  <span className="text-sm">Add Medication</span>
                </button>
              </div>
             
              {prescriptionForm.medication.map((med, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="font-medium text-gray-700">Medication {index + 1}</h5>
                    <button
                      type="button"
                      onClick={() => removeMedication(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      disabled={prescriptionForm.medication.length <= 1}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                 
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Medicine Name</label>
                      <input
                        type="text"
                        name="medicineName"
                        value={med.medicineName}
                        onChange={(e) => handleMedicationChange(index, e)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Medicine name"
                        required
                      />
                    </div>
                   
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Dosage</label>
                      <input
                        type="text"
                        name="dosage"
                        value={med.dosage}
                        onChange={(e) => handleMedicationChange(index, e)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., 500mg"
                        required
                      />
                    </div>
                   
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Frequency</label>
                      <input
                        type="text"
                        name="frequency"
                        value={med.frequency}
                        onChange={(e) => handleMedicationChange(index, e)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Twice daily"
                        required
                      />
                    </div>
                   
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Duration</label>
                      <input
                        type="text"
                        name="duration"
                        value={med.duration}
                        onChange={(e) => handleMedicationChange(index, e)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., 7 days"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};


export default AddPrescription;

