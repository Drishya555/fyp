import { useState, useEffect } from 'react';
import axios from 'axios';
import Authstore from '../../../hooks/authStore.js';
import { host } from '../../../host.js';
import {
  FileText,
  Save,
  Search,
  Users,
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Stethoscope
} from 'lucide-react';

const AddAppointmentNotes = () => {
  const [savedMessage, setSavedMessage] = useState(null);
  const [patientSearchQuery, setPatientSearchQuery] = useState('');
  const [showPatientSelector, setShowPatientSelector] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const [completedAppointments, setCompletedAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const token = Authstore.getToken();

  useEffect(() => {
    const getdocbyid = async () => {
      const docid = Authstore.getUser()?.userid;
      const response = await axios.get(`${host}/api/doctors/getselecteddoc/${docid}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      setDoctor(response.data.doctor);
    };

    getdocbyid();
  }, []);

  useEffect(() => {
    const getCompletedAppointments = async () => {
      const docid = Authstore.getUser()?.userid;
      const response = await axios.get(`${host}/api/appointment/getallappointmentsbydoctor/${docid}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      
      const completed = response.data.appointments.filter(
        appointment => appointment.status === 'Completed'
      );
      setCompletedAppointments(completed);

      if (completed.length > 0) {
        setSelectedAppointment(completed[0]);
        setNotes(completed[0].notes || '');
      }
    };

    getCompletedAppointments();
  }, []);

  const handleAppointmentSelect = (appointment) => {
    setSelectedAppointment(appointment);
    setNotes(appointment.notes || '');
    setShowPatientSelector(false);
    
    setSavedMessage(`Selected appointment for ${appointment.user?.name}`);
    setTimeout(() => setSavedMessage(null), 3000);
  };

  const handleSaveNotes = async (e) => {
    e.preventDefault();
    
    if (!selectedAppointment) {
      setSavedMessage('Please select an appointment first.');
      setTimeout(() => setSavedMessage(null), 3000);
      return;
    }

    setIsLoading(true);
    
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.put(
        `${host}/api/appointment/notes/${selectedAppointment._id}`,
        { notes },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
          },
        }
      );

      setCompletedAppointments(prev =>
        prev.map(apt =>
          apt._id === selectedAppointment._id
            ? { ...apt, notes }
            : apt
        )
      );

      setSavedMessage(`Notes saved successfully for ${selectedAppointment.user?.name}`);
    } catch (error) {
      console.error('Error saving notes:', error);
      setSavedMessage(error.response?.data?.error || 'Error saving notes. Please try again.');
    } finally {
      setIsLoading(false);
      setTimeout(() => setSavedMessage(null), 3000);
    }
  };

  const filteredAppointments = patientSearchQuery
    ? completedAppointments.filter(appointment =>
        appointment?.user?.name?.toLowerCase().includes(patientSearchQuery.toLowerCase()) ||
        appointment?.user?._id?.toLowerCase().includes(patientSearchQuery.toLowerCase())
      )
    : completedAppointments;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 font-sans text-gray-900 antialiased">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white shadow-sm backdrop-blur-lg bg-white/90">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Stethoscope className="h-6 w-6 text-blue-600 mr-2" />
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
              <h2 className="text-2xl font-bold text-gray-900">Appointment Notes</h2>
            </div>
            <p className="mt-1 text-sm text-gray-600">
              Add or update notes for completed appointments
            </p>
          </div>
          <button
            onClick={handleSaveNotes}
            disabled={isLoading || !selectedAppointment}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center"
          >
            <Save size={18} className="mr-2" />
            {isLoading ? 'Saving...' : 'Save Notes'}
          </button>
        </div>

        {/* Appointment Selection */}
        <div className="mb-6 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-4 bg-green-100 p-3 rounded-full">
                <CheckCircle size={20} className="text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Completed Appointment</h3>
                {selectedAppointment ? (
                  <div className="flex items-center mt-2">
                    <img
                      src={selectedAppointment.user?.image || '/api/placeholder/40/40'}
                      alt={selectedAppointment.user?.name}
                      className="w-10 h-10 rounded-full mr-3 ring-2 ring-green-100"
                    />
                    <div>
                      <p className="font-medium">{selectedAppointment.user?.name}</p>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar size={14} className="mr-1" />
                        <span className="mr-3">{formatDate(selectedAppointment.date)}</span>
                        <Clock size={14} className="mr-1" />
                        <span>{selectedAppointment.time}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 mt-2">No appointment selected</p>
                )}
              </div>
            </div>
            <button
              onClick={() => setShowPatientSelector(!showPatientSelector)}
              className="px-4 py-2 bg-green-100 text-green-700 font-medium rounded-lg hover:bg-green-200 transition-colors duration-200 flex items-center"
            >
              <Users size={18} className="mr-2" />
              {selectedAppointment ? 'Change Appointment' : 'Select Appointment'}
            </button>
          </div>

          {/* Appointment Selector Dropdown */}
          {showPatientSelector && (
            <div className="mt-4 border-t pt-4">
              <div className="mb-3">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by patient name or ID..."
                    value={patientSearchQuery}
                    onChange={(e) => setPatientSearchQuery(e.target.value)}
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {filteredAppointments.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <CheckCircle size={48} className="mx-auto mb-3 text-gray-300" />
                    <p>No completed appointments found</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {filteredAppointments.map(appointment => (
                      <div
                        key={appointment._id}
                        onClick={() => handleAppointmentSelect(appointment)}
                        className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
                          selectedAppointment?._id === appointment._id
                            ? 'bg-green-50 border border-green-200'
                            : 'hover:bg-gray-100 border border-gray-100'
                        }`}
                      >
                        <div className="flex items-center">
                          <img
                            src={appointment.user?.image || '/api/placeholder/40/40'}
                            alt={appointment.user?.name || "Patient"}
                            className="w-12 h-12 rounded-full mr-4"
                          />
                          <div>
                            <p className="font-medium">{appointment.user?.name}</p>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Calendar size={14} className="mr-1" />
                              <span className="mr-3">{formatDate(appointment.date)}</span>
                              <Clock size={14} className="mr-1" />
                              <span>{appointment.time}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                            Completed
                          </span>
                          {appointment.notes && (
                            <FileText size={16} className="ml-2 text-blue-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Save Message */}
        {savedMessage && (
          <div className={`mb-6 p-3 rounded-lg flex items-center ${
            savedMessage.includes('Error') || savedMessage.includes('Please')
              ? 'bg-red-100 text-red-800'
              : 'bg-green-100 text-green-800'
          }`}>
            <AlertCircle size={18} className="mr-2" />
            {savedMessage}
          </div>
        )}

        {/* Notes Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="border-b border-gray-200 px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-900">
              <FileText size={18} className="inline mr-2" />
              Appointment Notes
            </h3>
            {selectedAppointment && (
              <p className="text-sm text-gray-600 mt-1">
                Notes for {selectedAppointment.user?.name} - {formatDate(selectedAppointment.date)} at {selectedAppointment.time}
              </p>
            )}
          </div>

          <div onSubmit={handleSaveNotes} className="p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Clinical Notes & Observations
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows="12"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                placeholder={selectedAppointment 
                  ? "Enter detailed notes about the appointment, patient's condition, treatment provided, observations, recommendations, and follow-up instructions..."
                  : "Please select a completed appointment to add notes..."
                }
                disabled={!selectedAppointment}
              />
              <div className="mt-2 text-sm text-gray-500">
                Include: Patient symptoms, examination findings, diagnosis, treatment given, patient response, and any follow-up recommendations.
              </div>
            </div>

            {selectedAppointment && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-2">Appointment Details:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Patient:</span>
                    <p className="font-medium">{selectedAppointment.user?.name}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Date & Time:</span>
                    <p className="font-medium">
                      {formatDate(selectedAppointment.date)} at {selectedAppointment.time}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                      Completed
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddAppointmentNotes;