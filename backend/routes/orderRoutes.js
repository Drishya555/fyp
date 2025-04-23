import express from "express";
import {
  createOrder,
  getOrdersByUser,
  updateOrderStatus,
  getallorders,
  updateOrder,
  deleteOrder
} from "../controllers/orderController.js";

const router = express.Router();
router.post("/", createOrder);
router.get("/user/:userId", getOrdersByUser);
router.put("/:orderId/status", updateOrderStatus);
router.get('/', getallorders)
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);
export default router;