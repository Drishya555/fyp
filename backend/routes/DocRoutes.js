import express from 'express';
import { getAllDoctors,addDoctors, addSpecialization,changeSpecialization} from '../controllers/docControllers.js';

const router = express.Router();

router.get('/getalldoctors', getAllDoctors)
router.put('/adddocdetails', addDoctors)
router.post('/addspecialization', addSpecialization)
router.put('/changesp', changeSpecialization)

export default router;