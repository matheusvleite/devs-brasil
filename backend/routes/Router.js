import express from 'express';
import { userRoutes } from './UserRoutes.js';

export const router = express();

router.get('/', (req, res) => (
    res.send("API Working!")
));
router.use('/api/users', userRoutes);