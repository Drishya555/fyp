/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';
import Authstore from '../hooks/authStore.js';
import {host} from '../host.js';
import {
  Heart,
  AlertTriangle,
  Plus,
  Trash2,
  AlertCircle,
  Save,
  User,
  Edit,
  X
} from 'lucide-react';

const UpdateMedicalData = () => {
  const [activeSection, setActiveSection] = useState('vitals');
  const [savedMessage, setSavedMessage] = useState(null);
  const [medicalRecord, setMedicalRecord] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form states
  const [vitals, setVitals] = useState({
    heartRate: '',
    systolic: '',
    diastolic: '',
    temperature: '',
    respiratoryRate: '',
    oxygenSaturation: '',
    date: new Date().toISOString().split('T')[0]
  });
  
  const [allergy, setAllergy] = useState({
    name: '',
    reaction: '',
    severity: 'mild',
    notes: ''
  });

  const [editingAllergyIndex, setEditingAllergyIndex] = useState(null);
  const [allergies, setAllergies] = useState([]);
  const token = Authstore.getToken();

  useEffect(() => {
    const fetchMedicalRecord = async () => {
      try {
        setIsLoading(true);
        const patientId = Authstore.getUser()?.userid;
        const doctorId = Authstore.getUser()?.userid;

        // Get medical record for the current user
        const recordResponse = await axios.get(`${host}/api/medical-records/${patientId}/${doctorId}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : '',  
            },
          }
        );
        
        if (recordResponse.data) {
          setMedicalRecord(recordResponse.data);
          
          // Initialize vitals from medical record
          if (recordResponse.data.vitals) {
            setVitals({
              heartRate: recordResponse.data.vitals.heartRate || '',
              systolic: recordResponse.data.vitals.bloodPressure?.systolic || '',
              diastolic: recordResponse.data.vitals.bloodPressure?.diastolic || '',
              temperature: recordResponse.data.vitals.temperature || '',
              respiratoryRate: recordResponse.data.vitals.respiratoryRate || '',
              oxygenSaturation: recordResponse.data.vitals.oxygenSaturation || '',
              date: recordResponse.data.vitals.date || new Date().toISOString().split('T')[0]
            });
          }
          
          // Initialize allergies from medical record
          if (recordResponse.data.allergies && recordResponse.data.allergies.length > 0) {
            // If allergies are stored as strings, convert to objects
            if (typeof recordResponse.data.allergies[0] === 'string') {
              const allergyObjects = recordResponse.data.allergies.map(name => ({
                name,
                reaction: '',
                severity: 'mild',
                notes: ''
              }));
              setAllergies(allergyObjects);
            } else {
              // If already objects, use as-is
              setAllergies(recordResponse.data.allergies);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching medical record:', error);
        setSavedMessage('Failed to load medical record');
        setTimeout(() => setSavedMessage(null), 3000);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMedicalRecord();
  }, []);
  
  const handleUpdateVitals = async () => {
    try {
      const patientId = Authstore.getUser()?.userid;
      const doctorId = Authstore.getUser()?.userid;
      
      const vitalsData = {
        heartRate: Number(vitals.heartRate),
        bloodPressure: {
          systolic: Number(vitals.systolic),
          diastolic: Number(vitals.diastolic)
        },
        temperature: Number(vitals.temperature),
        respiratoryRate: Number(vitals.respiratoryRate),
        oxygenSaturation: Number(vitals.oxygenSaturation),
        date: vitals.date
      };

      await axios.post(`${host}/api/medical-records`, {
        patientId,
        doctorId,
        vitals: vitalsData
      },{
        headers: {
          Authorization: token ? `Bearer ${token}` : '',  
        },
      });

      setSavedMessage('Vitals data updated successfully');
      setTimeout(() => setSavedMessage(null), 3000);
    } catch (error) {
      console.error('Error updating vitals:', error);
      setSavedMessage('Failed to update vitals');
      setTimeout(() => setSavedMessage(null), 3000);
    }
  };
  
  const handleAddAllergy = async () => {
    if (!allergy.name.trim()) {
      setSavedMessage('Allergen name is required');
      setTimeout(() => setSavedMessage(null), 3000);
      return;
    }

    try {
      let updatedAllergies;
      
      if (editingAllergyIndex !== null) {
        // Update existing allergy
        updatedAllergies = [...allergies];
        updatedAllergies[editingAllergyIndex] = allergy;
      } else {
        // Add new allergy
        updatedAllergies = [...allergies, allergy];
      }
      
      setAllergies(updatedAllergies);
      setAllergy({ name: '', reaction: '', severity: 'mild', notes: '' });
      setEditingAllergyIndex(null);
      
      // Save to backend
      await saveAllergies(updatedAllergies);
    } catch (error) {
      console.error('Error adding allergy:', error);
      setSavedMessage('Failed to save allergy');
      setTimeout(() => setSavedMessage(null), 3000);
    }
  };
  
  const saveAllergies = async (allergiesToSave) => {
    try {
      const patientId = Authstore.getUser()?.userid;
      const doctorId = Authstore.getUser()?.userid;
      
      await axios.post(`${host}/api/medical-records`, {
        patientId,
        doctorId,
        allergies: allergiesToSave
      },{
        headers: {
          Authorization: token ? `Bearer ${token}` : '',  
        },
      });

      setSavedMessage('Allergies updated successfully');
      setTimeout(() => setSavedMessage(null), 3000);
    } catch (error) {
      console.error('Error saving allergies:', error);
      setSavedMessage('Failed to update allergies');
      setTimeout(() => setSavedMessage(null), 3000);
      throw error;
    }
  };

  const handleRemoveAllergy = async (index) => {
    try {
      const updatedAllergies = [...allergies];
      updatedAllergies.splice(index, 1);
      setAllergies(updatedAllergies);
      
      // Save to backend
      await saveAllergies(updatedAllergies);
    } catch (error) {
      console.error('Error removing allergy:', error);
    }
  };

  const handleEditAllergy = (index) => {
    setAllergy({...allergies[index]});
    setEditingAllergyIndex(index);
  };

  const handleCancelEdit = () => {
    setAllergy({ name: '', reaction: '', severity: 'mild', notes: '' });
    setEditingAllergyIndex(null);
  };
  
  const handleUpdateAllData = async () => {
    try {
      const patientId = Authstore.getUser()?.userid;
      const doctorId = Authstore.getUser()?.userid;
      
      // Prepare vitals data
      const vitalsData = {
        heartRate: Number(vitals.heartRate),
        bloodPressure: {
          systolic: Number(vitals.systolic),
          diastolic: Number(vitals.diastolic)
        },
        temperature: Number(vitals.temperature),
        respiratoryRate: Number(vitals.respiratoryRate),
        oxygenSaturation: Number(vitals.oxygenSaturation),
        date: vitals.date
      };

      // Update both vitals and allergies in one call
      await axios.post(`${host}/api/medical-records`, {
        patientId,
        doctorId,
        vitals: vitalsData,
        allergies: allergies
      },{
        headers: {
          Authorization: token ? `Bearer ${token}` : '',  
        },
      });

      setSavedMessage('Medical data updated successfully');
      setTimeout(() => setSavedMessage(null), 3000);
    } catch (error) {
      console.error('Error updating all data:', error);
      setSavedMessage('Failed to update data');
      setTimeout(() => setSavedMessage(null), 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading medical data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 font-sans text-gray-900 antialiased">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white shadow-sm backdrop-blur-lg bg-white/90">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Heart className="h-6 w-6 text-blue-600 mr-2" />
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">HealthTrack</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Update Your Medical Record</h2>
            <p className="mt-1 text-sm text-gray-600">
              Keep your health information up to date
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
              { id: 'allergies', label: 'Allergies', icon: AlertTriangle },
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
                Update Your Vital Signs
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
                    min="0"
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
                    min="0"
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
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Temperature (°F)</label>
                  <input
                    type="number"
                    placeholder="Ex: 98.6"
                    value={vitals.temperature}
                    onChange={(e) => setVitals({...vitals, temperature: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    step="0.1"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Respiratory Rate (breaths/min)</label>
                  <input
                    type="number"
                    placeholder="Ex: 16"
                    value={vitals.respiratoryRate}
                    onChange={(e) => setVitals({...vitals, respiratoryRate: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Oxygen Saturation (%)</label>
                  <input
                    type="number"
                    placeholder="Ex: 98"
                    value={vitals.oxygenSaturation}
                    onChange={(e) => setVitals({...vitals, oxygenSaturation: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    max="100"
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
          
          {/* Allergies Section */}
          {activeSection === 'allergies' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Manage Your Allergies
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Allergen Name*</label>
                  <input
                    type="text"
                    placeholder="Ex: Penicillin"
                    value={allergy.name}
                    onChange={(e) => setAllergy({...allergy, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reaction</label>
                  <input
                    type="text"
                    placeholder="Ex: Rash, difficulty breathing"
                    value={allergy.reaction}
                    onChange={(e) => setAllergy({...allergy, reaction: e.target.value})}
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
                    <option value="mild">Mild</option>
                    <option value="moderate">Moderate</option>
                    <option value="severe">Severe</option>
                    <option value="life-threatening">Life-threatening</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <input
                    type="text"
                    placeholder="Additional notes (e.g., treatment)"
                    value={allergy.notes}
                    onChange={(e) => setAllergy({...allergy, notes: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                {editingAllergyIndex !== null && (
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 flex items-center"
                  >
                    <X size={18} className="mr-2" />
                    Cancel
                  </button>
                )}
                <button
                  onClick={handleAddAllergy}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
                >
                  <Plus size={18} className="mr-2" />
                  {editingAllergyIndex !== null ? 'Update Allergy' : 'Add Allergy'}
                </button>
              </div>
              
              {/* List of allergies */}
              {allergies.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-md font-medium text-gray-700 mb-3">Your Allergies</h4>
                  <div className="space-y-3">
                    {allergies.map((allergyItem, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="flex items-center">
                            <p className="font-medium text-gray-900">{allergyItem.name}</p>
                            <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                              allergyItem.severity === 'mild' ? 'bg-yellow-100 text-yellow-800' :
                              allergyItem.severity === 'moderate' ? 'bg-orange-100 text-orange-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {allergyItem.severity}
                            </span>
                          </div>
                          {allergyItem.reaction && (
                            <p className="text-sm text-gray-600">Reaction: {allergyItem.reaction}</p>
                          )}
                          {allergyItem.notes && (
                            <p className="text-xs text-gray-500 mt-1">Notes: {allergyItem.notes}</p>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleEditAllergy(index)}
                            className="p-1 text-blue-600 hover:text-blue-800"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => handleRemoveAllergy(index)}
                            className="p-1 text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UpdateMedicalData;