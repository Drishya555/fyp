/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import {
  Heart,
  Calendar,
  ChevronDown,
  Clock,
  Pill,
  Activity,
  Download,
  FileText,
  AlertTriangle 
} from 'lucide-react';
import Authstore from '../hooks/authStore.js';
import { host } from '../host.js';
import axios from 'axios';

const MedicalRecord = ({ id }) => {
  const [expandedTimelineItem, setExpandedTimelineItem] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [medRecord, setMedicalRecord] = useState(null);
  const [user, setUser] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [nextAppointment, setNextAppointment] = useState(null);
  const token = Authstore.getToken();
  const [allergies, setAllergies] = useState([]);

  useEffect(() => {
    const getuser = async () => {
      const userid = Authstore.getUser()?.userid || null;
      const response = await axios.get(`${host}/api/auth/getselecteduser/${userid}`,{
        headers: {
          Authorization: token ? `Bearer ${token}` : '',  
        },
      });
      setUser(response.data?.user);
    };

    const getuserappointments = async () => {
      const userid = Authstore.getUser()?.userid || null;
      const response = await axios.get(`${host}/api/appointment/getappointmentbyuser/${userid}`,{
        headers: {
          Authorization: token ? `Bearer ${token}` : '',  
        },
      });
      
      const sortedAppointments = response.data?.appointments?.sort((a, b) => 
        new Date(a.date) - new Date(b.date)
      );
      
      setAppointments(sortedAppointments || []);
      
      const now = new Date();
      const upcoming = sortedAppointments?.find(appt => new Date(appt.date) >= now);
      setNextAppointment(upcoming || null);
    };

    const getuserprescriptions = async () => {
      const userid = Authstore.getUser()?.userid || null;
      const response = await axios.get(`${host}/api/prescriptions/user/${userid}`,{
        headers: {
          Authorization: token ? `Bearer ${token}` : '',  
        },
      });
      const allMedications = response.data.prescriptions.flatMap(prescription =>
        prescription.medication.map(med => ({
          ...med,
          prescriptionId: prescription._id,
          prescribedBy: prescription.doctor.name,
          prescribedDate: prescription.createdAt
        }))
      );
      setMedicines(allMedications);
    };

    const getmedicalrecord = async () => {
    const userid = Authstore.getUser()?.userid || null;
    const response = await axios.get(`${host}/api/medical-records/${userid}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',  
      },
    });
    setMedicalRecord(response.data?.medicalRecord);
    
    if (response.data?.medicalRecord?.allergies) {
      const formattedAllergies = response.data.medicalRecord.allergies.map(item => 
        typeof item === 'string' ? { name: item } : item
      );
      setAllergies(formattedAllergies);
    }
  };

    getuser();
    getuserappointments();
    getuserprescriptions();
    getmedicalrecord();
  }, []);

  const formatAppointmentDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const toggleTimelineItem = (id) => setExpandedTimelineItem(expandedTimelineItem === id ? null : id);

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
                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">HealthTrack</h1>
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
                Welcome back, {user?.name}. Here&apos;s your health overview
              </p>
            </div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
              {/* Current Vitals Cards */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center">
                <div className="rounded-full bg-red-100 p-3 mr-4">
                  <Heart className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Heart Rate</p>
                  <div className="flex items-baseline">
                    <h3 className="text-2xl font-bold text-gray-900">{medRecord?.vitals?.heartRate || '--'}</h3>
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
                    <h3 className="text-2xl font-bold text-gray-900">
                      {medRecord?.vitals?.bloodPressure?.systolic || '--'}/{medRecord?.vitals?.bloodPressure?.diastolic || '--'}
                    </h3>
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
                    {nextAppointment ? (
                      <>
                        <h3 className="text-base font-bold text-gray-900">
                          {formatAppointmentDate(nextAppointment.date)}, {nextAppointment.time}
                        </h3>
                        <p className="text-xs text-gray-500">Dr. {nextAppointment.doctor?.name || 'Unknown'}</p>
                      </>
                    ) : (
                      <h3 className="text-base font-bold text-gray-900">No upcoming appointments</h3>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Patient Summary */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Patient Profile</h3>
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
                      <p className="text-sm font-medium">{user?.age}</p>
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
                    {allergies.map((allergyItem) => (
                      <div 
                        key={allergyItem.name}
                        className="flex items-center gap-1 px-3 py-1 bg-red-50 text-red-700 text-xs font-medium rounded-full"
                      >
                        <span>{allergyItem.name}</span>
                        {allergyItem.severity && (
                          <span className="text-[0.6rem] opacity-75">
                            ({allergyItem.severity})
                          </span>
                        )}
                      </div>
                    ))}
                    {allergies.length === 0 && (
                      <span className="text-gray-500 text-sm">No allergies recorded</span>
                    )}
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
                        <span className="text-gray-600">{user?.phone}</span>
                      </p>
                      <p className="text-sm text-gray-700 flex items-center">
                        <span className="font-medium w-20">Address:</span>
                        <span className="text-gray-600">{user?.address}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions & Medications */}
              <div className="lg:col-span-2 space-y-6">
                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <a href="/doctors">
                    <button className="flex items-center justify-center w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      <Calendar size={20} className="mr-3" />
                      Schedule Appointment
                    </button>
                   </a>
                   <a href='/hospitals'>
                    <button className="flex items-center justify-center w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                      <Download size={20} className="mr-3" />
                      View Hospitals
                    </button>
                    </a>
                    <button className="flex items-center justify-center w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                      <FileText size={20} className="mr-3" />
                      Check Prescriptions
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
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700">View All</button>
              </div>
              <div className="mt-2 space-y-4">
                {appointments
                  .filter(appointment => {
                    const appointmentDate = new Date(appointment.date);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return appointmentDate >= today;
                  })
                  .slice(0, 3) // Show only the next 3 appointments
                  .map((appointment) => {
                    const formattedDate = formatAppointmentDate(appointment.date);

                    return (
                      <div key={appointment._id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-medium text-gray-900">Dr. {appointment.doctor?.name || 'Unknown'}</p>
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
                          <a
                            href={`/viewdoctor/${appointment.doctor?._id}`}
                            className="flex-1 text-center px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                          >
                            View
                          </a>
                        </div>

                      </div>
                    );
                  })}
                {appointments.filter(appointment => new Date(appointment.date) >= new Date()).length === 0 && (
                  <div className="p-4 text-center text-gray-500">
                    No upcoming appointments
                  </div>
                )}
                <button
                  className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium"
                  onClick={() => {
                    console.log('New appointment button clicked');
                  }}
                >
                  + New Appointment
                </button>
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
                    const formattedDate = formatAppointmentDate(appointment.date);

                    const timelineItem = {
                      id: appointment._id,
                      type: 'appointment',
                      date: formattedDate,
                      title: `Appointment with Dr. ${appointment.doctor?.name || 'Unknown'}`,
                      details: appointment.purpose || 'Scheduled appointment',
                      doctor: `Dr. ${appointment.doctor?.name || 'Unknown'}`,
                      location: appointment.doctor?.hospital ? `Hospital ID: ${appointment.doctor.hospital}` : 'Clinic',
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







































