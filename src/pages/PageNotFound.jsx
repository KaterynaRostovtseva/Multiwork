import React from 'react';
import { Typography, Box } from '@mui/material';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { buttonStyles } from '../components/Styles/styles';

function PageNotFound() {
  const navigate = useNavigate(); 

  const handleBack = () => {
   navigate('/')
  };

  return (
    <Box sx={{ textAlign: 'center', marginTop: '100px' }}>
      <Typography variant="h3">404 Not Found</Typography>
      <Typography variant="h6">The page you are looking for does not exist.</Typography>
      <Button  variant="contained" onClick={handleBack} 
        sx={{...buttonStyles, borderRadius: '8px', padding: '16px 24px',marginTop: '24px', background: '#814AEB', color: '#FFF', textTransform: 'capitalize',
        }} aria-label="Get started">
          Return to the main page 
     </Button>
    </Box>
  );
}

export default PageNotFound;