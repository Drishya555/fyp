import express from 'express';
import { addCartController, getCartbyId } from '../controllers/cartController.js';

const router = express.Router();

router.post('/addtocart',addCartController)
router.get('/getcartdetails/:id',getCartbyId)

export default router;