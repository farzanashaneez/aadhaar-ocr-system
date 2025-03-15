import { OcrService } from '../services/ocr.service.js';

export class OcrController {
  static async processAadhaarCard(req, res, next) {
    try {
      if (!req.files || !req.files.frontImage || !req.files.backImage) {
        return res.status(400).json({ 
          error: 'Both front and back images are required' 
        });
      }

      const frontImagePath = req.files.frontImage[0].path;
      const backImagePath = req.files.backImage[0].path;

      const aadhaarData = await OcrService.processAadhaarImages(
        frontImagePath, 
        backImagePath
      );

      res.json(aadhaarData.toJSON());
    } catch (error) {
      next(error);
    }
  }
}