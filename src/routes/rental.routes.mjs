import express from 'express';

import {
    createRental,
    getAllRentals,
    getRentalById,
    removeRentalById,
    updateRentalById
} from '../controller/rental.controller.mjs';
import { authUser } from '../middlewares/auth-user.middleware.mjs';

const router = express.Router();

router.post('/api/rental', authUser, createRental);
router.get('/api/rental', authUser, getAllRentals);
router.get('/api/rental/:id', authUser, getRentalById);
router.delete('/api/rental/:id', authUser, removeRentalById);
router.patch('/api/rental/:id', authUser, updateRentalById);

export default router;