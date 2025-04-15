import { useState } from 'react';
import DoctorRegister from '../AddDoctors.jsx';

const TableComponent = () => {
  // Sample patient data
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "Arthur Melo",
      email: "arthurmelo@example.com",
      phone: "+977 9803692900",
      priority: "Low",
      appointmentDate: "12th July 2025",
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology"
    },
    {
      id: 2,
      name: "Emily Parker",
      email: "emilyparker@example.com",
      phone: "+977 9845123078",
      priority: "Medium",
      appointmentDate: "15th July 2025",
      doctor: "Dr. Michael Chen",
      specialty: "Neurology"
    },
    {
      id: 3,
      name: "Robert Wilson",
      email: "robertwilson@example.com",
      phone: "+977 9812456789",
      priority: "High",
      appointmentDate: "10th July 2025",
      doctor: "Dr. Lisa Adams",
      specialty: "Pediatrics"
    }
  ]);
  
  // State for modals
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddDoctorModalOpen, setIsAddDoctorModalOpen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);

  // Handle edit button click
  const handleEdit = (patient) => {
    setCurrentPatient(patient);
    setIsEditModalOpen(true);
  };

  // Handle delete button click
  const handleDelete = (patient) => {
    setCurrentPatient(patient);
    setIsDeleteModalOpen(true);
  };

  // Confirm deletion
  const confirmDelete = () => {
    setPatients(patients.filter(p => p.id !== currentPatient.id));
    setIsDeleteModalOpen(false);
  };

  // Update patient data
  const updatePatient = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedPatient = {
      ...currentPatient,
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      priority: formData.get('priority'),
      appointmentDate: formData.get('appointmentDate'),
      doctor: formData.get('doctor'),
      specialty: formData.get('specialty')
    };

    setPatients(patients.map(p => p.id === currentPatient.id ? updatedPatient : p));
    setIsEditModalOpen(false);
  };

  // Get priority style based on level
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "Low":
        return "text-green-500 bg-green-100";
      case "Medium":
        return "text-yellow-500 bg-yellow-100";
      case "High":
        return "text-red-500 bg-red-100";
      default:
        return "text-green-500 bg-green-100";
    }
  };

  return (
    <section className="container px-4 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800">Patient Appointments</h1>
        <button
          onClick={() => setIsAddDoctorModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Doctor
        </button>
      </div>
      
      {/* Desktop Table (hidden on mobile) */}
      <div className="hidden md:flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {['Sn', 'Patient', 'Phone', 'Priority', 'Appointment Date', 'Doctor', 'Actions'].map((heading, index) => (
                      <th
                        key={index}
                        className="px-3 py-3 text-xs font-medium text-left text-gray-500 sm:px-4 sm:text-sm"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {patients.map((patient, index) => (
                    <tr key={patient.id}>
                      <td className="px-3 py-3 text-sm font-medium text-gray-700 sm:px-4 sm:py-4">
                        {index + 1}
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-500 sm:px-4 sm:py-4">
                        <div className="flex items-center gap-x-2">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            {patient.name.charAt(0)}
                          </div>
                          <div>
                            <h2 className="text-xs font-medium text-gray-800 sm:text-sm">{patient.name}</h2>
                            <p className="text-xs text-gray-600">{patient.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-500 sm:px-4 sm:py-4">
                        {patient.phone}
                      </td>
                      <td className="px-3 py-3 text-sm font-medium text-gray-700 sm:px-4 sm:py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${getPriorityStyle(patient.priority)} sm:text-sm`}>
                          {patient.priority}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-500 sm:px-4 sm:py-4">
                        {patient.appointmentDate}
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-500 sm:px-4 sm:py-4">
                        <div>
                          <p className="font-medium">{patient.doctor}</p>
                          <p className="text-xs">{patient.specialty}</p>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-sm sm:px-4 sm:py-4">
                        <div className="flex items-center gap-x-4">
                          <button 
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => handleEdit(patient)}
                          >
                            Edit
                          </button>
                          <button 
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(patient)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Cards (shown on mobile) */}
      <div className="md:hidden space-y-4">
        {patients.map((patient, index) => (
          <div key={patient.id} className="p-4 bg-white rounded-lg shadow border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-x-3">
                <span className="text-sm font-medium text-gray-700">{index + 1}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${getPriorityStyle(patient.priority)}`}>
                  {patient.priority}
                </span>
              </div>
              <div className="text-sm text-gray-500">{patient.appointmentDate}</div>
            </div>
            
            <div className="mt-3 flex items-center gap-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                {patient.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-800">{patient.name}</h2>
                <p className="text-xs text-gray-600">{patient.email}</p>
                <p className="text-xs text-gray-600 mt-1">{patient.phone}</p>
              </div>
            </div>
            
            <div className="mt-3">
              <div className="text-sm text-gray-800 font-medium">Doctor:</div>
              <div className="text-sm text-gray-600">{patient.doctor}</div>
              <div className="text-xs text-gray-500">{patient.specialty}</div>
            </div>
            
            <div className="mt-3 flex justify-between items-center">
              <div className="flex gap-x-3">
                <button 
                  className="text-sm text-blue-500 hover:text-blue-700"
                  onClick={() => handleEdit(patient)}
                >
                  Edit
                </button>
                <button 
                  className="text-sm text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(patient)}
                >
                  Delete
                </button>
              </div>
              <div className="flex gap-x-3">
                <button className="text-sm text-gray-500 hover:text-indigo-500">View</button>
                <button className="text-sm text-blue-500 hover:text-indigo-500">Download</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && currentPatient && (
        <div className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl w-full max-w-md mx-4">
            <form onSubmit={updatePatient}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Patient</h3>
                <div className="grid grid-cols-1 gap-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      id="name" 
                      defaultValue={currentPatient.name} 
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                      type="email" 
                      name="email" 
                      id="email" 
                      defaultValue={currentPatient.email} 
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                    <input 
                      type="text" 
                      name="phone" 
                      id="phone" 
                      defaultValue={currentPatient.phone} 
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                    <select 
                      name="priority" 
                      id="priority" 
                      defaultValue={currentPatient.priority} 
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700">Appointment Date</label>
                    <input 
                      type="text" 
                      name="appointmentDate" 
                      id="appointmentDate" 
                      defaultValue={currentPatient.appointmentDate} 
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">Doctor</label>
                    <input 
                      type="text" 
                      name="doctor" 
                      id="doctor" 
                      defaultValue={currentPatient.doctor} 
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">Specialty</label>
                    <input 
                      type="text" 
                      name="specialty" 
                      id="specialty" 
                      defaultValue={currentPatient.specialty} 
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-row-reverse">
                <button 
                  type="submit"
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:w-auto sm:text-sm"
                >
                  Save Changes
                </button>
                <button 
                  type="button"
                  className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:w-auto sm:text-sm"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && currentPatient && (
        <div className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl w-full max-w-md mx-4">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  {/* Warning icon */}
                  <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Patient</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete {currentPatient.name}&apos;s record? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-row-reverse">
              <button 
                type="button"
                className="ml-3 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:w-auto sm:text-sm"
                onClick={confirmDelete}
              >
                Delete
              </button>
              <button 
                type="button"
                className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:w-auto sm:text-sm"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Doctor Modal */}
      {isAddDoctorModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl w-full max-w-2xl mx-4 my-8">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Add New Doctor</h3>
                <button
                  onClick={() => setIsAddDoctorModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="max-h-[80vh] overflow-y-auto">
                <DoctorRegister />
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-end">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:w-auto sm:text-sm"
                onClick={() => setIsAddDoctorModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TableComponent;