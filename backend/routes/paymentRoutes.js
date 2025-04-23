import { initializeKhaltiPayment, verifyKhaltiPayment } from "../controllers/khalti.js"
import Payment from "../models/paymentModel.js";
import PurchasedItem from "../models/purchasedItemModel.js";
import Item from '../models/medicineModel.js';
import express from 'express';
import usermodel from "../models/userModel.js";
import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

const app = express.Router();
// route to initilize khalti payment gateway
app.post("/initialize-khali", async (req, res) => {
  try {
    //try catch for error handling
    const { userId, totalPrice, website_url } = req.body;
    const itemData = await usermodel.findOne({
      _id: userId,
    });

    if (!itemData) {
      return res.status(400).send({
        success: false,
        message: "item not found",
      });
    }
    // creating a purchase document to store purchase info
    const purchasedItemData = await PurchasedItem.create({
      user: userId,
      paymentMethod: "khalti",
      totalPrice: totalPrice,
    });

    const paymentInitate = await initializeKhaltiPayment({
      amount: totalPrice * 100, 
      purchase_order_id: purchasedItemData._id, 
      purchase_order_name: itemData.name,
      return_url: `${process.env.BACKEND_URI}`, 
      website_url,
    });

    res.json({
      success: true,
      purchasedItemData,
      payment: paymentInitate,
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
});




export default app;