import { Router } from 'express';
import { getClinics } from '../controllers/clinic.controller.js';

const router = Router();

router.get('/', getClinics);

export default router;