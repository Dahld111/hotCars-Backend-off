import express from 'express';

import {
    createReservation,
    getAllReservations,
    getReservationById,
    removeReservationById
} from '../controller/reservation.controller.mjs';
import { authUser } from '../middlewares/auth-user.middleware.mjs';

const router = express.Router();

router.post('/api/reservation', authUser, createReservation);
router.get('/api/reservation', authUser, getAllReservations);
router.get('/api/reservation/:id', authUser, getReservationById);
router.delete('/api/reservation/:id', authUser, removeReservationById);

export default router;