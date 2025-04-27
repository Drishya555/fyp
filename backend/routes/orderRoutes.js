import express from "express";
import authenticateToken from '../middlewares/authMiddleware.js';
import {
  createOrder,
  getOrdersByUser,
  updateOrderStatus,
  getallorders,
  updateOrder,
  deleteOrder
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", authenticateToken, createOrder);
router.get("/user/:userId", authenticateToken, getOrdersByUser);
router.put("/:orderId/status", authenticateToken, updateOrderStatus);
router.get('/', authenticateToken, getallorders);
router.put("/:id", authenticateToken, updateOrder);
router.delete("/:id", authenticateToken, deleteOrder);

export default router;