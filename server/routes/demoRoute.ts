// demoRoute.ts
import { Router } from 'express';
import handleDemo from './demo';

const router = Router();
router.get('/', handleDemo);
export default router;