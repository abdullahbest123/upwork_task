// routes/commentRoutes.ts
import express from 'express';
import { createUser, postData, getData } from '../controllers/UserController';

const router = express.Router();
router.post('', createUser);
router.post(':id/data', postData);
router.get(':id/data', getData);


export default router;
