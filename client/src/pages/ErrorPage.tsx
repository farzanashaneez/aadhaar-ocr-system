import React from 'react';
import { Container, Box, Typography, Button, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate, useLocation } from 'react-router-dom';

interface LocationState {
  errorMessage?: string;
}

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  
  const errorMessage = state?.errorMessage || 'The page you are looking for does not exist or an error occurred.';

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '100vh',
      }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center', width: '100%' }}>
          <ErrorOutlineIcon sx={{ fontSize: 100, color: 'error.main', mb: 2 }} />
          
          <Typography variant="h4" component="h1" gutterBottom>
            Oops! Something went wrong
          </Typography>
          
          <Typography variant="body1" color="textSecondary" paragraph sx={{ mb: 4 }}>
            {errorMessage}
          </Typography>
          
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={handleGoHome}
          >
            Return to Home
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default ErrorPage;