import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

export const createOrder = async (req, res) => {
    try {
      const { userId, items, totalAmount, paymentMethod, shippingAddress } = req.body;
  
      // Validate required fields
      if (!userId || !items || !totalAmount || !paymentMethod) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields"
        });
      }
  
      // Validate items array
      if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid items format"
        });
      }
  
      // Create the order
      const order = new Order({
        user: userId,
        items: items.map(item => ({
          product: item.product,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount,
        paymentMethod,
        paymentStatus: "pending",
        deliveryStatus: "pending",
        shippingAddress: shippingAddress || null
      });
  
      await order.save();
  
      return res.status(201).json({
        success: true,
        message: "Order created successfully",
        order
      });
    } catch (error) {
      console.error("Order creation error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to create order",
        error: error.message
      });
    }
  };




export const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId })
      .populate("items.product")
      .populate("shippingAddress");

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { deliveryStatus: req.body.status },
      { new: true }
    );

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getallorders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email").populate("items.product").sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message
    });
  }
};

// Update order status
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus, deliveryStatus } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      {
        paymentStatus,
        deliveryStatus,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      order
    });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update order",
      error: error.message
    });
  }
};

// Delete order
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Order deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete order",
      error: error.message
    });
  }
};