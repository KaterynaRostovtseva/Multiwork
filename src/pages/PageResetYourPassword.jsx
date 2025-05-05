import React, { useState } from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import { textStylesH2, textStylesBody2 } from '../components/Styles/styles';
import IconSend from '../../src/assets/icons/IconSend.svg';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PageResetYourPassword = () => {
  const navigate = useNavigate();
  const [activeStep] = useState(1);
  const myEmail = localStorage.getItem('email');
  console.log('Email from localStorage:', myEmail);

  const handleBack = () => {
    navigate(-1);
  };

  const handleResend = () => {
    // Здесь можно добавить логику для повторной отправки письма
    navigate('/forgotPassword');
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', height: '100vh' }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography component="h1" variant="h5" sx={{ ...textStylesH2, textAlign: 'center', width: '100%' }}>
          Reset your password
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '50px' }}>
          <Box component="img" src={IconSend} alt="Iconsend" />
          <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column' }}>
            <Typography
              variant="body2"
              sx={{ ...textStylesBody2, textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              An email has been sent to you at {myEmail}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                ...textStylesBody2,
                textAlign: 'left',
                color: '#1976d2',
                textDecoration: 'none',
                '&:hover': { color: '#1565c0' },
              }}
              component="a"
              href="https://mail.google.com"
              target="_blank"
            >
              Click here to check your email and create a new password.
            </Typography>
          </Box>
          <Button
            variant="text"
            sx={{ textTransform: 'capitalize', color: '#0A0A0A', marginTop: '24px' }}
            onClick={handleResend}
          >
            Resend email
          </Button>

          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '50px', width: '100%' }}>
            <ArrowBackIcon />
            <Button variant="text" sx={{ textTransform: 'capitalize', color: '#0A0A0A', marginLeft: '4px' }} onClick={handleBack}>
              Back
            </Button>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            {[0, 1, 2].map((step) => (
              <Box
                key={step}
                sx={{
                  height: '8px',
                  width: '118px',
                  borderRadius: '4px',
                  backgroundColor: activeStep === step ? '#12B76A' : '#D0D5DD',
                  margin: '0 4px',
                  display: 'inline-block',
                  transition: 'background-color 0.3s',
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default PageResetYourPassword;