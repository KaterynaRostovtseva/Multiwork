import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Container, Box, CircularProgress } from '@mui/material';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid2';
import { textStylesH2, textStylesBody2, textStylesBody3, textStylesBodyL2, buttonStyles } from '../components/Styles/styles';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginUser, clearError } from '../store/Slice/authSlice';

const PageLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const [credentials, setCredentials] = useState({ identifier: '', password: '', });
  const [errors, setErrors] = useState({ identifier: '', password: '', serverError: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const confirmed = queryParams.get('confirmed');
    if (confirmed === 'true') {
      alert('Email confirmed, please log in!');
    }
  }, [location]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home/WithRegistration');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      setErrors((prev) => ({ ...prev, serverError: error }));
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.identifier = credentials.identifier
      ? /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(credentials.identifier)
        ? ''
        : 'Invalid email'
      : 'Email is required';
    tempErrors.password = credentials.password
      ? credentials.password.length >= 8
        ? ''
        : 'Password must be at least 8 characters long'
      : 'Password is required';
    setErrors((prev) => ({ ...prev, ...tempErrors }));
    return Object.values(tempErrors).every((x) => x === '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Submitting login with credentials:', credentials, 'Remember me:', rememberMe);
      const action = await dispatch(loginUser({ ...credentials, rememberMe }));
      console.log('Login action result:', action);
      if (action.type === 'auth/loginUser/rejected') {
        setErrors((prev) => ({
          ...prev,
          serverError: action.payload || 'Invalid email or password',
        }));
      }
    }
  };



  return (
    <>
      {loading && (
        <Box sx={{ display: 'flex', width: '258px', height: '148px', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000, }}>
          <CircularProgress sx={{ marginRight: '8px', color: '#814AEB' }} />
          <Typography>Loading... Please wait...</Typography>
        </Box>
      )}
      {!loading && (
        <Container component="main" maxWidth="xs">
          <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography component="h1" variant="h5" sx={{ ...textStylesH2, textAlign: 'center', width: '100%' }}> Log In </Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid size={12} sx={{ marginTop: '4px' }}>
                <Typography sx={{ ...textStylesBodyL2, textAlign: 'left' }}>Email*</Typography>
                <TextField
                  sx={{ marginTop: '8px', '& .MuiInputLabel-root.Mui-focused': { color: '#814AEB' }, '& .MuiInputBase-root.Mui-focused': { borderColor: '#814AEB' }, '& .MuiOutlinedInput-root': { '&:hover fieldset': { borderColor: '#814AEB' }, '&.Mui-focused fieldset': { borderColor: '#814AEB' }, }, }}
                  required
                  fullWidth
                  label="Enter your email address"
                  id="identifier"
                  name="identifier"
                  value={credentials.identifier}
                  onChange={handleChange}
                  error={!!errors.identifier}
                  helperText={errors.identifier}
                  autoComplete="off"
                />
              </Grid>
              <Grid size={12} sx={{ marginTop: '4px' }}>
                <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography sx={{ ...textStylesBodyL2, textAlign: 'left' }}>Password*</Typography>
                  <Typography sx={{ ...textStylesBody3 }}>
                    <Link href="/forgotPassword" variant="body2" sx={{ color: '#814AEB', textDecoration: 'none' }}>
                      Forgot password?
                    </Link>
                  </Typography>
                </Grid>
                <TextField
                  required
                  sx={{ marginTop: '8px', '& .MuiInputLabel-root.Mui-focused': { color: '#814AEB' }, '& .MuiInputBase-root.Mui-focused': { borderColor: '#814AEB' }, '& .MuiOutlinedInput-root': { '&:hover fieldset': { borderColor: '#814AEB' }, '&.Mui-focused fieldset': { borderColor: '#814AEB' }, }, }}
                  fullWidth
                  label="Enter your password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={credentials.password}
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
              <Grid size={12} sx={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={<Checkbox checked={rememberMe} onChange={handleRememberMeChange} sx={{ color: '#D0D5DD', '&.Mui-checked': { color: '#814AEB', }, }} />}
                  label={<Typography sx={{ ...textStylesBody2 }}> Remember me </Typography>} />
              </Grid>
            </Grid>
            {errors.serverError && (
              <Typography sx={{ color: 'red', textAlign: 'center', mt: 2 }}> {errors.serverError} </Typography>
            )}
            <Button type="submit" fullWidth variant="contained" sx={{ ...buttonStyles, borderRadius: '4px', padding: '10px 18px', marginTop: '8px', background: '#814AEB', color: '#FFF', textTransform: 'capitalize', }} aria-label="Log In" disabled={loading}>
              Log In
            </Button>
            <Typography sx={{ textAlign: 'center', marginTop: '30px', fontSize: { xs: '14px', sm: '16px' } }}>
              New to MultyWork?{' '}
              <span>
                <Link href="/signup" variant="body2" sx={{ ...textStylesBodyL2, color: '#814AEB', textDecoration: 'none' }}>
                  Create an account
                </Link>
              </span>
            </Typography>
          </Box>
        </Container>
      )}
    </>
  );
};

export default PageLogin;