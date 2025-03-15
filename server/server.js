import express from 'express';
import cors from 'cors';
import { config } from './config/app.config.js';
import ocrRoutes from './routes/ocr.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';
import fs from 'fs';
import helmet from 'helmet';


// Ensure uploads directory exists
if (!fs.existsSync(config.uploadDir)) {
  fs.mkdirSync(config.uploadDir);
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());


// Routes
app.use('/api/ocr', ocrRoutes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});