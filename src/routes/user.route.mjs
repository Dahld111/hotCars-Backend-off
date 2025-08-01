import express from 'express';

import {
    createUser,
    getAllUsers,
    getUserById,
    removeUserById
} from '../controller/user.controller.mjs';
import { authUser } from '../middlewares/auth-user.middleware.mjs';

const router = express.Router();

router.post('/api/user', createUser);
router.get('/api/user', authUser, getAllUsers);
router.get('/api/user/:id', authUser, getUserById);
router.delete('/api/user/:id', authUser, removeUserById);

export default router;