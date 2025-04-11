// routes/index.js
import { Router } from 'express';
import authRoutes from './auth.routes.js';
import streamerRoutes from './streamer.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/streamer', streamerRoutes);

export default router;
