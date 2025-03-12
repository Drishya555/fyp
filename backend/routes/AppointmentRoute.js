import express from 'express';
import { createappointment, getallappointment,getsingleappointment } from '../controllers/appointmentController.js';

const router = express.Router();

router.post('/createappointment', createappointment)
router.get('/viewallappointments',getallappointment )
router.get('/viewsingleappointment/:id',getsingleappointment)
router.put('/updateappointment/:id')
router.put('/deleteappointment/:id')

export default router;