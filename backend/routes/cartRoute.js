import express from 'express';
import { addCartController, getCartbyId } from '../controllers/cartController.js';
import authenticateToken from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/addtocart', authenticateToken, addCartController);
router.get('/getcartdetails/:id', authenticateToken, getCartbyId);

export default router;