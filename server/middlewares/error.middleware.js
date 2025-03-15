import multer from 'multer';

export const errorHandler = (err, req, res, next) => {

    
    // Handle multer errors
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          error: 'File too large. Maximum size is 5MB.'
        });
      }
      return res.status(400).json({
        error: `Upload error: ${err.message}`
      });
    }
    
    // Handle other errors
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      error: err.message || 'Internal Server Error'
    });
  };