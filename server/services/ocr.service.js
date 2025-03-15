import fs from 'fs';
import { createWorker } from 'tesseract.js';
import { config } from '../config/app.config.js';
import { ImageService } from './image.service.js';
import { TextParser } from '../utils/text-parser.util.js';
import { AadhaarModel } from '../models/aadhaar.model.js';

export class OcrService {
  static async performOCR(imagePath, lang, rectangle = null) {
    const worker = await createWorker(lang);
    try {
      const options = rectangle ? { rectangle } : {};
      await worker.setParameters({
        preserve_interword_spaces: '1',
      });
      const { data } = await worker.recognize(imagePath, options);
      return data.text;
    } finally {
      await worker.terminate();
    }
  }

  static async extractTextFromSections(imagePath) {
    try {
      const { width, height } = await ImageService.getImageDimensions(imagePath);

      // Define regions for different languages (assuming left half is Malayalam, right half is English)
      const rectangles = {
        malayalam: { left: 0, top: 0, width: Math.floor(width / 2), height },
        english: { left: Math.floor(width / 2), top: 0, width: Math.floor(width / 2), height }
      };

      // Extract text from each section with the appropriate language model
      const malayalamText = await this.performOCR(
        imagePath, 
        config.languages.malayalam, 
        rectangles.malayalam
      );
      
      const englishText = await this.performOCR(
        imagePath, 
        config.languages.english, 
        rectangles.english
      );

      return { malayalamText, englishText };
    } catch (error) {
      console.error('Error extracting text from sections:', error);
      throw new Error('Failed to extract text from image sections');
    }
  }

  static async processAadhaarImages(frontImagePath, backImagePath) {
    try {
      // Process front image with combined languages
      const frontText = await this.performOCR(frontImagePath, config.languages.combined);
      
      // Process back image with section extraction (for address with dual language)
      const { englishText } = await this.extractTextFromSections(backImagePath);
      
      // Combine the texts
      const combinedText = `${frontText}\n${englishText}`;
      
      // Parse the combined text
      const aadhaarData = TextParser.parseAadhaarData(combinedText);
      
      // Create and return a model instance
      return new AadhaarModel(aadhaarData);
    } catch (error) {
      console.error('Error processing Aadhaar images:', error);
      throw new Error('Failed to process Aadhaar card images');
    } finally {
      // Clean up temporary files
      this.cleanupFiles([frontImagePath, backImagePath]);
    }
  }
  
  static cleanupFiles(filePaths) {
    filePaths.forEach(path => {
      if (fs.existsSync(path)) {
        try {
          fs.unlinkSync(path);
        } catch (error) {
          console.error(`Error deleting file ${path}:`, error);
        }
      }
    });
  }
}