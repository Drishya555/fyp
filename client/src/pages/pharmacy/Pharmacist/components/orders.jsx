import { useState, useEffect } from "react";
import axios from "axios";
import { host } from "../../../../host.js";
import { FiEdit, FiTrash2, FiSearch, FiFilter, FiChevronDown, FiChevronUp, FiPackage, FiDollarSign, FiCalendar, FiUser, FiShoppingBag } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [editingOrder, setEditingOrder] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState({
    paymentStatus: "",
    deliveryStatus: ""
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${host}/api/orders`);
      setOrders(response.data.orders);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`${host}/api/orders/${orderId}`);
      setDeleteConfirmation(null);
      fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleStatusUpdate = async (orderId) => {
    try {
      await axios.put(`${host}/api/orders/${orderId}`, statusUpdate);
      setEditingOrder(null);
      fetchOrders();
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.user?.name && order.user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      order.user?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || 
      order.paymentStatus === filterStatus || 
      order.deliveryStatus === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const statusBadge = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 border border-yellow-200",
      completed: "bg-green-100 text-green-800 border border-green-200",
      failed: "bg-red-100 text-red-800 border border-red-200",
      shipped: "bg-blue-100 text-blue-800 border border-blue-200",
      delivered: "bg-purple-100 text-purple-800 border border-purple-200",
      cancelled: "bg-gray-100 text-gray-800 border border-gray-200"
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[status] || "bg-gray-100 text-gray-800"}`}>
        {status}
      </span>
    );
  };

  const toggleOrderDetails = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  const getProductIdShort = (productId) => {
    return productId ? productId.substring(0, 6) + "..." : "N/A";
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm mb-6 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <FiShoppingBag className="text-indigo-600 text-2xl" />
              <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Total Orders: {orders.length}</span>
              <button 
                onClick={fetchOrders}
                className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-all text-sm font-medium"
              >
                Refresh
              </button>
            </div>
          </div>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Order ID or User ID"
                className="pl-10 pr-4 py-3 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
                <FiFilter className="text-gray-500" />
                <select 
                  className="bg-transparent focus:outline-none"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-16 text-center">
            <FiShoppingBag className="text-gray-300 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Orders Found</h3>
            <p className="text-gray-500">Try adjusting your search or filter to find what you&apos;re looking for.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <motion.div 
                key={order._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div 
                  className="px-6 py-4 flex flex-wrap items-center justify-between gap-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleOrderDetails(order._id)}
                >
                  <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <FiPackage className="text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">#{order._id.substring(0, 8)}</h3>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <FiUser size={12} />
                          <span>{typeof order.user === 'string' ? order.user.substring(0, 8) + "..." : (order.user?.name || "Unknown User")}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FiCalendar size={14} />
                      <span>{formatDate(order.createdAt)}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2">
                      <FiDollarSign className="text-green-600" />
                      <span className="font-medium">₹{order.totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Payment:</span>
                      {statusBadge(order.paymentStatus)}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Delivery:</span>
                      {statusBadge(order.deliveryStatus)}
                    </div>
                    <div className="flex items-center gap-1">
                      {expandedOrder === order._id ? (
                        <FiChevronUp className="text-gray-500" />
                      ) : (
                        <FiChevronDown className="text-gray-500" />
                      )}
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedOrder === order._id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden border-t border-gray-100"
                    >
                      <div className="p-6">
                        <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
                        <div className="bg-gray-50 rounded-lg overflow-hidden">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product ID</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {order.items.map((item) => (
                                <tr key={item._id}>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {getProductIdShort(item.product?.name)}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                    {item.quantity}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                    ₹{item.price.toLocaleString()}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                    ₹{(item.price * item.quantity).toLocaleString()}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                            <tfoot className="bg-gray-50">
                              <tr>
                                <td colSpan="3" className="px-4 py-3 text-right text-sm font-medium text-gray-900">
                                  Total Amount:
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                  ₹{order.totalAmount.toLocaleString()}
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>

                        <div className="flex items-center justify-end mt-4 gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingOrder(order);
                              setStatusUpdate({
                                paymentStatus: order.paymentStatus,
                                deliveryStatus: order.deliveryStatus
                              });
                            }}
                            className="px-4 py-2 border border-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-50"
                          >
                            <FiEdit size={16} />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteConfirmation(order._id);
                            }}
                            className="px-4 py-2 border border-red-200 text-red-600 rounded-lg flex items-center gap-2 hover:bg-red-50"
                          >
                            <FiTrash2 size={16} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl"
            >
              <h2 className="text-xl font-bold mb-6 text-gray-800">Update Order Status</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Status
                  </label>
                  <select
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={statusUpdate.paymentStatus}
                    onChange={(e) => setStatusUpdate({...statusUpdate, paymentStatus: e.target.value})}
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Status
                  </label>
                  <select
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={statusUpdate.deliveryStatus}
                    onChange={(e) => setStatusUpdate({...statusUpdate, deliveryStatus: e.target.value})}
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setEditingOrder(null)}
                    className="px-5 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(editingOrder._id)}
                    className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Update Status
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl"
            >
              <div className="text-center mb-4">
                <div className="mx-auto h-16 w-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <FiTrash2 className="text-red-600 text-2xl" />
                </div>
                <h2 className="text-xl font-bold mb-2 text-gray-800">Confirm Deletion</h2>
                <p className="text-gray-600">Are you sure you want to delete this order? This action cannot be undone.</p>
              </div>
              <div className="flex justify-center gap-3 pt-4">
                <button
                  onClick={() => setDeleteConfirmation(null)}
                  className="px-5 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirmation)}
                  className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete Order
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrderManagement;