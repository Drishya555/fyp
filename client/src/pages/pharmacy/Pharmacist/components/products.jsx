import { useState, useEffect } from 'react';
import axios from 'axios';
import { host } from '../../../../host.js';
import { FiEdit, FiTrash2, FiPlus, FiX, FiUpload, FiImage } from 'react-icons/fi';
import { toast } from 'react-toastify';
import AuthStore from '../../../../hooks/authStore.js';
const MedicineManagement = () => {
  const [medicines, setMedicines] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMedicine, setCurrentMedicine] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = AuthStore.getToken();
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    discountprice: '',
    rating: '',
    description: '',
    strength: '',
    manufacturer: '',
    stock: '',
    medicineimg: null,
  });
  const [previewImage, setPreviewImage] = useState('');

  // Fetch medicines and categories on mount
  useEffect(() => {
    fetchMedicines();
    fetchCategories();
  }, []);

  const fetchMedicines = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${host}/api/pharmacy/getallmedicines`,{
        headers: {
          Authorization: token ? `Bearer ${token}` : '',  
        },
      });
      setMedicines(response.data.medicines);
    } catch (error) {
      console.error('Error fetching medicines:', error);
      toast.error('Failed to fetch medicines');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${host}/api/pharmacy/getallcategories`,{
        headers: {
          Authorization: token ? `Bearer ${token}` : '',  
        },
      });
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, medicineimg: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        data.append(key, formData[key]);
      }
    });

    try {
      if (isEditing) {
        await axios.put(
          `${host}/api/pharmacy/editmedicinecontroller/${currentMedicine._id}`,
          data,
          {
            headers: { 'Content-Type': 'multipart/form-data',             Authorization: token ? `Bearer ${token}` : '',  
            },
          }
        );
        toast.success('Medicine updated successfully');
      } else {
        await axios.post(`${host}/api/pharmacy/addmedicine`, data, {
          headers: { 'Content-Type': 'multipart/form-data', Authorization: token ? `Bearer ${token}` : '' },
        });
        toast.success('Medicine added successfully');
      }
      fetchMedicines();
      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(`Failed to ${isEditing ? 'update' : 'add'} medicine`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (medicine) => {
    console.log("Edit button clicked", medicine);
    
    // Check if medicine.category exists and has an _id property
    if (!medicine.category || !medicine.category._id) {
      console.error("Medicine category is undefined or doesn't have _id", medicine);
      // Handle the case where category is missing
      const categoryId = medicine.category?._id || "";
      
      setIsEditing(true);
      setCurrentMedicine(medicine);
      setFormData({
        name: medicine.name,
        category: categoryId,
        price: medicine.price,
        discountprice: medicine.discountprice || "",
        rating: medicine.rating || "",
        description: medicine.description || "",
        strength: medicine.strength || "",
        manufacturer: medicine.manufacturer || "",
        stock: medicine.stock || 0,
        medicineimg: null,
      });
      setPreviewImage(medicine.medicineimg || "");
      setShowModal(true);
      return;
    }
    
    // Original code
    setIsEditing(true);
    setCurrentMedicine(medicine);
    setFormData({
      name: medicine.name,
      category: medicine.category._id,
      price: medicine.price,
      discountprice: medicine.discountprice || "",
      rating: medicine.rating || "",
      description: medicine.description || "",
      strength: medicine.strength || "",
      manufacturer: medicine.manufacturer || "",
      stock: medicine.stock || 0,
      medicineimg: null,
    });
    setPreviewImage(medicine.medicineimg || "");
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      try {
        setIsLoading(true);
        await axios.delete(`${host}/api/pharmacy/deletemedicine/${id}`,{
          headers: {
            Authorization: token ? `Bearer ${token}` : '',  
          },
        });
        toast.success('Medicine deleted successfully');
        fetchMedicines();
      } catch (error) {
        console.error('Error deleting medicine:', error);
        toast.error('Failed to delete medicine');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      price: '',
      discountprice: '',
      rating: '',
      description: '',
      strength: '',
      manufacturer: '',
      stock: '',
      medicineimg: null,
    });
    setPreviewImage('');
    setIsEditing(false);
    setCurrentMedicine(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Medicine Management</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Medicines List</h2>
            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 shadow-sm"
            >
              <FiPlus /> Add New Medicine
            </button>
          </div>

          {isLoading && !showModal ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : medicines.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500">No medicines found. Add your first medicine!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {medicines.map((medicine) => (
                <div
                  key={medicine._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 border border-gray-100 flex flex-col"
                >
                  <div className="relative h-48 bg-gray-50 flex items-center justify-center">
                    {medicine.medicineimg ? (
                      <img
                        src={medicine.medicineimg}
                        alt={medicine.name}
                        className="w-full h-full object-contain p-4"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                        }}
                      />
                    ) : (
                      <div className="text-gray-400 flex flex-col items-center">
                        <FiImage size={48} />
                        <span className="mt-2 text-sm">No Image</span>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        onClick={() => handleEdit(medicine)}
                        className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition shadow-sm"
                        title="Edit"
                      >
                        <FiEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(medicine._id)}
                        className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition shadow-sm"
                        title="Delete"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">{medicine.name}</h3>
                    <p className="text-gray-600 text-sm mb-1">
                      <span className="font-medium">Category:</span> {medicine.category?.categoryName || 'Uncategorized'}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <div>
                        {medicine.discountprice ? (
                          <>
                            <span className="text-red-500 font-medium">
                              ${medicine.discountprice}
                            </span>
                            <span className="text-gray-400 text-sm line-through ml-2">
                              ${medicine.price}
                            </span>
                          </>
                        ) : (
                          <span className="text-gray-800 font-medium">${medicine.price}</span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="text-gray-600 text-sm ml-1">
                          {medicine.rating || 'N/A'}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-end">
                      <span
                        className={`text-sm px-2 py-1 rounded ${
                          medicine.stock > 0
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {medicine.stock > 0 ? `${medicine.stock} in stock` : 'Out of stock'}
                      </span>
                      <span className="text-xs text-gray-500 truncate max-w-[120px]">
                        {medicine.manufacturer || 'Unknown manufacturer'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-200 p-4 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">
                {isEditing ? 'Edit Medicine' : 'Add New Medicine'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                      placeholder="Enter medicine name"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.categoryName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">
                        Price ($) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">
                        Discount Price ($)
                      </label>
                      <input
                        type="number"
                        name="discountprice"
                        value={formData.discountprice}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="0"
                        step="0.01"
                        placeholder="Optional"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">Rating</label>
                      <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="0"
                        max="5"
                        step="0.1"
                        placeholder="0-5"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">
                        Stock <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                        min="0"
                        placeholder="Quantity"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Strength</label>
                    <input
                      type="text"
                      name="strength"
                      value={formData.strength}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 500mg"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      Manufacturer
                    </label>
                    <input
                      type="text"
                      name="manufacturer"
                      value={formData.manufacturer}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Company name"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="3"
                      placeholder="Enter medicine description"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Image</label>
                    <div className="flex items-center gap-4">
                      <div className="relative flex-1">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <FiUpload className="w-8 h-8 text-gray-400" />
                            <p className="text-sm text-gray-500 mt-2">
                              {formData.medicineimg?.name || 'Click to upload'}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG (max 5MB)</p>
                          </div>
                          <input
                            type="file"
                            name="medicineimg"
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/*"
                          />
                        </label>
                      </div>
                      {previewImage && (
                        <div className="w-20 h-20 rounded border border-gray-200 overflow-hidden">
                          <img
                            src={previewImage}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3 border-t border-gray-200 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-md transition duration-300 border border-gray-300 hover:bg-gray-50"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 flex items-center gap-2 shadow-sm disabled:opacity-70"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : isEditing ? (
                    'Update Medicine'
                  ) : (
                    'Add Medicine'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicineManagement;