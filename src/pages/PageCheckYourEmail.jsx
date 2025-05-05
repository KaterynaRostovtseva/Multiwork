import React, { useState } from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import { textStylesH2, textStylesBody2 } from '../components/Styles/styles';
import IconSend from '../../src/assets/icons/IconSend.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import axios from 'axios';
import { API_URL } from '../config'
import { logoutUser } from '../store/Slice/authSlice'

const PageCheckYourEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Получаем email из location.state или localStorage
  const myEmail = localStorage.getItem('email') || '';
  const { email: emailFromState } = location.state || {};
  const emailToShow = emailFromState || myEmail || 'your email';

  const handleResendEmail = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      console.log('Resending email to:', emailToShow);

      // Отправляем запрос на повторную отправку письма подтверждения
      await axios.get(`${API_URL}/auth/send-email-confirmation`, {
        email: emailToShow,
      });
      setSuccess('Email resent successfully! Please check your inbox.');
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to resend email. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    dispatch(logoutUser()); // Очищаем состояние аутентификации
    navigate('/signup'); // Перенаправляем на страницу регистрации
  };


  return (
    <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', height: '100vh' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography component="h1" variant="h5" sx={{ ...textStylesH2, textAlign: 'center', width: '100%' }}>
          Check your email
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: '50px' }}>
          <Box component="img" src={IconSend} alt="Iconsend" aria-label="Email sent icon" />
          <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="body2" sx={{ ...textStylesBody2, textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              An email has been sent to you at <strong>{emailToShow}</strong>
            </Typography>
            {/* <Typography variant="body2" sx={{ ...textStylesBody2, textAlign: 'left', textDecoration: 'none', '&:hover': { color: '#1565c0' }}} component="a" href={`mailto:${myEmail}`} target="_blank">
              Click on the link to access your account.
            </Typography> */}
          </Box>
          {/* <Button variant="text" sx={{ textTransform: 'capitalize', color: '#0A0A0A', marginTop: '24px',  fontWeight: '700', }}  onClick={handleResendEmail}  >
            Resend email
          </Button> */}
          <Button variant="text" sx={{ textTransform: 'capitalize', color: '#0A0A0A', marginTop: '24px', fontWeight: '700' }} onClick={handleResendEmail} disabled={loading}>
            {loading ? 'Sending...' : 'Resend email'}
          </Button>
          <Button variant="text" sx={{ textTransform: 'capitalize', color: '#0A0A0A', marginTop: '24px', fontWeight: '700', }} onClick={handleGoBack}>
            Go Back
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default PageCheckYourEmail;
