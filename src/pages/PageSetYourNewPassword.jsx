import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box, IconButton, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { textStylesH2, textStylesBodyL2, buttonStyles } from '../components/Styles/styles';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../store/Slice/authSlice';

const PageSetYourNewPassword = () => {
  
  const query = new URLSearchParams(window.location.search);
  const code = query.get('code');
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const [newPassword, setNewPassword] = useState({ password: '', passwordConfirmation:'', code });
  const [errors, setErrors] = useState({ password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeStep, ] = useState(2);
  const navigate = useNavigate(); 
  const dispatch =useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPassword((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.password = newPassword.password.length >= 10 ? '' : 'Password must be at least 10 characters long';
    tempErrors.passwordConfirmation = newPassword.passwordConfirmation === newPassword.password ? '' : 'Passwords do not match';

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
        console.log(newPassword);
        dispatch(resetPassword(newPassword))
            .then(() => {
              navigate('/login');
            })
            .catch((error) => {
              console.error("Error resetting password:", error);
              setErrors((prevErrors) => ({
                  ...prevErrors,
                  password: 'Failed to reset password. Please try again.', 
              }));
            });
    }
};

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography component="h1" variant="h5" sx={{ ...textStylesH2, textAlign: 'center', width: '100%' }}>
          Set your new password
        </Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid size={12} sx={{ marginTop: '4px' }}>
            <Typography sx={{ ...textStylesBodyL2, textAlign: 'left' }}>Create password*</Typography>
            <TextField
              required
              sx={{ marginTop: '8px','& .MuiInputLabel-root.Mui-focused': {color: '#814AEB',  },'& .MuiInputBase-root.Mui-focused': { borderColor: '#814AEB'},'& .MuiOutlinedInput-root': {'&:hover fieldset': {borderColor: '#814AEB',}, '&.Mui-focused fieldset': { borderColor: '#814AEB'},}, }}
              fullWidth
              label="Use at least 10 characters"
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={newPassword.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
              }}
               autoComplete="off"
            />
          </Grid>
          <Grid size={12} sx={{ marginTop: '4px' }}>
            <Typography sx={{ ...textStylesBodyL2, textAlign: 'left' }}>Repeat the password*</Typography>
            <TextField
              required
              sx={{ marginTop: '8px','& .MuiInputLabel-root.Mui-focused': {color: '#814AEB',  },'& .MuiInputBase-root.Mui-focused': { borderColor: '#814AEB'},'& .MuiOutlinedInput-root': {'&:hover fieldset': {borderColor: '#814AEB',}, '&.Mui-focused fieldset': { borderColor: '#814AEB'},}, }}
              fullWidth
              label="Use at least 10 characters"
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirm-password"
              name="passwordConfirmation"
              value={newPassword.passwordConfirmation}
              onChange={handleChange}
              error={!!errors.passwordConfirmation}
              helperText={errors.passwordConfirmation}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
              }}
               autoComplete="off"
            />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" sx={{ ...buttonStyles, borderRadius: '4px', padding: '10px 18px', marginTop: '20px', background: '#814AEB', color: '#FFF', textTransform: 'capitalize'}} aria-label="Save and return to login">
          Save and return to login
        </Button>

        {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', marginY: 2 }}>
              <CircularProgress />
            </Box>
          )}

          {error && <Typography sx={{ color: 'red', textAlign: 'center' }}>{error}</Typography>} {/* Error message */}

        <Box sx={{ display: 'flex', flexDirection: 'row',  alignItems: 'center', marginTop: '100px' }}>
          <ArrowBackIcon />
          <Button variant="text" sx={{ textTransform: 'capitalize', color: '#0A0A0A' }} onClick={handleBack}>
            Back
          </Button>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
          {[0, 1, 2].map((step) => (
            <Box key={step} sx={{height: '8px', width: '118px',  borderRadius: '4px', backgroundColor: activeStep === step ? '#12B76A' : '#D0D5DD', margin: '0 4px', display: 'inline-block', transition: 'background-color 0.3s', }} />
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default PageSetYourNewPassword;

