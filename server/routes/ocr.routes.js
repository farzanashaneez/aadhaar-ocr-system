import express from 'express';
import { OcrController } from '../controllers/ocr.controller.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = express.Router();

router.post(
  '/',
  upload.fields([
    { name: 'frontImage', maxCount: 1 },
    { name: 'backImage', maxCount: 1 }
  ]),
  OcrController.processAadhaarCard
);

export default router;