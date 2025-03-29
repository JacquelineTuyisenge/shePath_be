import express from 'express';
import { handleUssdRequest } from "../controllers/ussd";

const router = express.Router();
router.post('/', handleUssdRequest);

export default router;