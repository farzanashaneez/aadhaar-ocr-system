import sharp from 'sharp';

export class ImageService {
  static async getImageDimensions(imagePath) {
    try {
      const metadata = await sharp(imagePath).metadata();
      return { 
        width: metadata.width, 
        height: metadata.height 
      };
    } catch (error) {
      console.error('Error getting image dimensions:', error);
      throw new Error('Failed to process image dimensions');
    }
  }
  
  static async preprocessImage(imagePath, outputPath) {
    try {
      // You can add image preprocessing here if needed
      // For example: contrast enhancement, noise reduction, etc.
      await sharp(imagePath)
        .normalize()
        .sharpen()
        .toFile(outputPath);
      return outputPath;
    } catch (error) {
      console.error('Error preprocessing image:', error);
      throw new Error('Failed to preprocess image');
    }
  }
}