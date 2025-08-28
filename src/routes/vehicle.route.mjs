import express from 'express';

import {
    createVehicle,
    getAllVehicles,
    getVehicleById,
    removeVehicleById,
    updateVehicleById
} from '../controller/vehicle.controller.mjs';
import { authUser } from '../middlewares/auth-user.middleware.mjs';

const router = express.Router();

router.post('/api/vehicle', authUser, createVehicle);
router.get('/api/vehicle', authUser, getAllVehicles);
router.get('/api/vehicle/:id', authUser, getVehicleById);
router.delete('/api/vehicle/:id', authUser, removeVehicleById);

export default router;