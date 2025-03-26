import React, { useState } from 'react';
import { Container, Box, Typography, Button, Grid, Paper, CircularProgress, Snackbar, Alert } from '@mui/material';
import ImageUploader from '../components/ImageUploader';
import ResultDisplay from '../components/ResultDisplay';
import {fetchData} from '../services/api'

// Define types for our state
interface OcrResults {
  name?: string;
  dob?: string;
  gender?: string;
  aadhaarNumber?: string;
  address?: string;
  // Add other result fields as needed
}

interface AlertState {
  open: boolean;
  message: string;
  severity: 'error' | 'warning' | 'info' | 'success';
}

function Home() {
  // State with proper TypeScript types
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState<string>('');
  const [backPreview, setBackPreview] = useState<string>('');
  const [results, setResults] = useState<OcrResults | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertState>({
    open: false,
    message: '',
    severity: 'error'
  });

  const handleFrontImageChange = (file: File | null): void => {
    setFrontImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFrontPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFrontPreview('');
    }
  };

  const handleBackImageChange = (file: File | null): void => {
    setBackImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setBackPreview('');
    }
  };

  const handleProcessImages = async (): Promise<void> => {
    if (!frontImage || !backImage) {
      setAlert({
        open: true,
        message: 'Please upload both front and back images of Aadhaar card',
        severity: 'warning'
      });
      return;
    }

    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('frontImage', frontImage);
      formData.append('backImage', backImage);
      
      // const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ocr`, {
      //   method: 'POST',
      //   body: formData,
      // });
      const response=await fetchData(formData)
      console.log(response)
      if (!response||response.status>=400) {
        throw new Error('Failed to process the images');
      }
      
      const data: OcrResults = await response.json();
      setResults(data);
      
      setAlert({
        open: true,
        message: 'Aadhaar card processed successfully',
        severity: 'success'
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during processing';
      setAlert({
        open: true,
        message: errorMessage,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlert = (_?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({...alert, open: false});
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Aadhaar Card OCR System
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Front Side 
              </Typography>
              <ImageUploader
                onImageChange={handleFrontImageChange}
                previewUrl={frontPreview}
              />
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Back Side 
              </Typography>
              <ImageUploader
                onImageChange={handleBackImageChange}
                previewUrl={backPreview}
              />
            </Paper>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleProcessImages}
            disabled={loading || !frontImage || !backImage}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Process Aadhaar Card'}
          </Button>
        </Box>
        
        {results && (
          <Box sx={{ mt: 4 }}>
            <ResultDisplay results={results} />
          </Box>
        )}
        
        <Snackbar 
          open={alert.open} 
          autoHideDuration={6000} 
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
            {alert.message}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
}

export default Home;