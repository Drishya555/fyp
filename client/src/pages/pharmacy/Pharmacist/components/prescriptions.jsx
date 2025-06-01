import { useState, useEffect } from 'react';
import { Search, Filter, Calendar, Clock, User, Pill, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import {host} from '../../../../host';
import AuthStore from '../../../../hooks/authStore.js';

const PrescriptionPharmacist = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedPrescriptions, setExpandedPrescriptions] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
      const token = AuthStore.getToken();

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${host}/api/prescriptions`,{
          headers: {
            Authorization: token ? `Bearer ${token}` : '',  
          },
        });
        const result = await response.json();
        
        if (result.success) {
          setPrescriptions(result.data);
        } else {
          throw new Error(result.message || 'Failed to fetch prescriptions');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching prescriptions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  const togglePrescriptionDetails = (id) => {
    setExpandedPrescriptions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesSearch = 
      prescription.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.doctor?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.medication.some(med => 
        med.medicineName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    if (filterStatus === 'all') return matchesSearch;
    // Add more filter options as needed
    
    return matchesSearch;
  });

  const statusBadge = (dateCreated) => {
    // This is a placeholder - you would implement actual status logic based on your requirements
    const daysAgo = Math.floor((new Date() - new Date(dateCreated)) / (1000 * 60 * 60 * 24));
    
    if (daysAgo < 3) {
      return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">New</span>;
    } else if (daysAgo < 7) {
      return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Active</span>;
    } else {
      return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Archived</span>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading prescriptions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center text-red-500">
          <h3 className="text-xl font-semibold">Error Loading Prescriptions</h3>
          <p className="mt-2">{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Pill className="mr-2 text-blue-500" />
            Pharmacy Prescription Dashboard
          </h1>
          <div className="flex items-center">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
              {filteredPrescriptions.length} Prescriptions
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 block w-full rounded-md border border-gray-300 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Search by patient, doctor, or medication..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  className="pl-10 block w-full rounded-md border border-gray-300 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="active">Active</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Prescriptions List */}
        {filteredPrescriptions.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No prescriptions found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPrescriptions.map((prescription) => (
              <div key={prescription._id} className="bg-white rounded-lg shadow overflow-hidden">
                {/* Prescription Header */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div className="flex items-center mb-2 sm:mb-0">
                      <User className="h-5 w-5 text-gray-400 mr-2" />
                      <h3 className="text-lg font-medium text-gray-900 mr-3">
                        {prescription.user?.name || 'Unknown Patient'}
                      </h3>
                      {statusBadge(prescription.createdAt)}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="mr-4">
                        {prescription.appointment 
                          ? new Date(prescription.appointment.date).toLocaleDateString() 
                          : new Date(prescription.createdAt).toLocaleDateString()}
                      </span>
                      <Clock className="h-4 w-4 mr-1" />
                      <span>
                        {prescription.appointment 
                          ? prescription.appointment.time 
                          : new Date(prescription.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-col sm:flex-row sm:justify-between">
                    <div className="text-sm text-gray-500 mb-2 sm:mb-0">
                      <span className="font-medium">Doctor:</span> {prescription.doctor?.name || 'Unknown'} 
                      {prescription.doctor?.specialization && ` (${prescription.doctor.specialization})`}
                    </div>
                    <button 
                      className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                      onClick={() => togglePrescriptionDetails(prescription._id)}
                    >
                      {expandedPrescriptions[prescription._id] ? (
                        <>Hide Details <ChevronUp className="ml-1 h-4 w-4" /></>
                      ) : (
                        <>View Details <ChevronDown className="ml-1 h-4 w-4" /></>
                      )}
                    </button>
                  </div>
                </div>

                {/* Prescription Details */}
                {expandedPrescriptions[prescription._id] && (
                  <div className="p-4 bg-gray-50">
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-700 mb-2">Prescription Notes</h4>
                      <p className="text-gray-600 whitespace-pre-line">{prescription.prescription}</p>
                    </div>
                    
                    <h4 className="font-medium text-gray-700 mb-2">Medications</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Medicine
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Dosage
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Frequency
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Duration
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {prescription.medication.map((med, idx) => (
                            <tr key={idx}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {med.medicineName}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {med.dosage}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {med.frequency}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {med.duration}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default PrescriptionPharmacist;