import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Container, Box, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { textStylesH2, textStylesBodyL2, buttonStyles } from '../components/Styles/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, clearError } from '../store/Slice/authSlice'; // Предполагаем, что это правильный путь

const PageForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ email: '', serverError: '' });
  const [activeStep, ] = useState(0);

  useEffect(() => {
    if (error) {
      setErrors((prev) => ({ ...prev, serverError: error }));
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    
    setEmail(e.target.value);
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.email = email
      ? /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
        ? ''
        : 'Invalid email'
      : 'Email is required';

    setErrors({ ...tempErrors, serverError: '' });
    return Object.values(tempErrors).every((x) => x === '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Submitting forgot password with email:', email);
      const action = await dispatch(forgotPassword({ email }));
      // Сохраняем email в localStoragelo
      localStorage.setItem('email', email);
      if (action.type === 'auth/forgotPassword/fulfilled') {
        navigate('/resetYourPassword');
      }
    }
  };

  const handleBack = () => {
    navigate('/login');
  };

  return (
    <Container component="main" maxWidth="xs">
      {loading && (
        <Box
          sx={{
            display: 'flex',
            width: '258px',
            height: '148px',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
          }}
        >
          <CircularProgress sx={{ marginRight: '8px', color: '#814AEB' }} />
          <Typography>Loading... Please wait...</Typography>
        </Box>
      )}
      {!loading && (
        <>
          <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography component="h1" variant="h5" sx={{ ...textStylesH2, textAlign: 'center', width: '100%' }}>
              Can’t log in?
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid size={12} sx={{ marginTop: '40px' }}>
                <Typography sx={{ ...textStylesBodyL2, textAlign: 'left' }}>Email*</Typography>
                <TextField
                  required
                  sx={{
                    marginTop: '8px',
                    '& .MuiInputLabel-root.Mui-focused': { color: '#814AEB' },
                    '& .MuiInputBase-root.Mui-focused': { borderColor: '#814AEB' },
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': { borderColor: '#814AEB' },
                      '&.Mui-focused fieldset': { borderColor: '#814AEB' },
                    },
                  }}
                  fullWidth
                  label="Enter your email address"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  autoComplete="off"
                />
              </Grid>
            </Grid>
            {errors.serverError && (
              <Typography sx={{ color: 'red', textAlign: 'center', mt: 2 }}>
                {errors.serverError}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                ...buttonStyles,
                borderRadius: '4px',
                padding: '10px 18px',
                marginTop: '20px',
                background: '#814AEB',
                color: '#FFF',
                textTransform: 'capitalize',
              }}
              aria-label="Reset password"
              disabled={loading}
            >
              Reset password
            </Button>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
              <Button variant="text" sx={{ textTransform: 'capitalize', color: '#0A0A0A' }} onClick={handleBack}>
                Return to login
              </Button>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '150px' }}>
              {[0, 1, 2].map((step) => (
                <Box
                  key={step}
                  className={`dot ${activeStep === step ? 'active' : ''}`}
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
        </>
      )}
    </Container>
  );
};

export default PageForgotPassword;