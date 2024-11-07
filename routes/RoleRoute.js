import express from 'express';
import { addnewrole, getAllRoles, getRole } from '../controllers/roleController.js';

const router = express.Router();


router.post('/new-role', addnewrole);
router.get('/get-roles', getRole)
router.get('/get-all-roles', getAllRoles)

export default router;