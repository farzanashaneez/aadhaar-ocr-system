// import { Box, Button, Typography } from '@mui/material';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// function ImageUploader({ onImageChange, previewUrl }:any) {
//   const handleFileChange = (e:any) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Validate file type
//       if (!file.type.match('image.*')) {
//         alert('Please upload an image file');
//         return;
//       }
      
//       // Validate file size (max 5MB)
//       if (file.size > 5 * 1024 * 1024) {
//         alert('File size should not exceed 5MB');
//         return;
//       }
      
//       onImageChange(file);
//     }
//   };

//   return (
//     <Box>
//       <Box 
//         sx={{
//           border: '2px dashed #ccc',
//           borderRadius: 2,
//           p: 2,
//           textAlign: 'center',
//           mb: 2,
//           minHeight: '200px',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//           backgroundColor: '#f8f8f8'
//         }}
//       >
//         {previewUrl ? (
//           <img 
//             src={previewUrl} 
//             alt="Preview" 
//             style={{ maxWidth: '100%', maxHeight: '200px' }} 
//           />
//         ) : (
//           <>
//             <CloudUploadIcon sx={{ fontSize: 48, color: '#aaa', mb: 1 }} />
//             <Typography variant="body1" color="textSecondary">
//               Drag and drop an image here or click to upload
//             </Typography>
//           </>
//         )}
//       </Box>
      
//       <Button
//         variant="outlined"
//         component="label"
//         fullWidth
//       >
//         {previewUrl ? 'Change Image' : 'Upload Image'}
//         <input
//           type="file"
//           hidden
//           accept="image/*"
//           onChange={handleFileChange}
//         />
//       </Button>
//     </Box>
//   );
// }

// export default ImageUploader;

import React, { useRef, ChangeEvent } from 'react';
import { Box, Button, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

interface ImageUploaderProps {
  onImageChange: (file: File | null) => void;
  previewUrl: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageChange, previewUrl }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files && event.target.files[0];
    onImageChange(file || null);
  };

  const handleBrowseClick = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveImage = (): void => {
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      
      {previewUrl ? (
        <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Centers both img and button horizontally
          textAlign: 'center'
        }}
      >
        <Box
          component="img"
          src={previewUrl}
          alt="Preview"
          sx={{
            maxWidth: '100%',
            maxHeight: '200px',
            objectFit: 'contain',
            mb: 2
          }}
        />
        <Button
          variant="text"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleRemoveImage}
          sx={{ mt: 1 }}
        >
          Remove
        </Button>
      </Box>
      
      ) : (
        <Box
          sx={{
            border: '2px dashed #ccc',
            borderRadius: 2,
            p: 3,
            textAlign: 'center',
            backgroundColor: '#f8f8f8',
            cursor: 'pointer',
            width: '100%',
            mb: 2
          }}
          onClick={handleBrowseClick}
        >
          <CloudUploadIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
          <Typography variant="body1" gutterBottom>
            Click to upload image
          </Typography>
          <Typography variant="body2" color="textSecondary">
            or drag and drop
          </Typography>
        </Box>
      )}
      
      {!previewUrl && (
        <Button
          variant="contained"
          onClick={handleBrowseClick}
          sx={{ mt: 1 }}
        >
          Browse Files
        </Button>
      )}
    </Box>
  );
};

export default ImageUploader;