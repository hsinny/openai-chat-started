import express from 'express';
import { line, config } from '../utils/lineClient.js';
import { lineController } from '../controllers/lineController.js';
console.log('line', line);

const router = express.Router();

// register a webhook handler with middleware
router.post('/', line.middleware(config), lineController);

export default router;