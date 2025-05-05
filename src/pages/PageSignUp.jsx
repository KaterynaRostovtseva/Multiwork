import React, { useState } from 'react';
import { Button, Typography, Container, Box, CircularProgress } from '@mui/material';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid2';
import { textStylesH2, textStylesBody1, textStylesBodyL2, buttonStyles } from '../components/Styles/styles';
import Hello from '../../src/assets/icons/Hello.svg';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../store/Slice/authSlice';

const PageSignUp = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const loading = useSelector((state) => state.auth.loading);
  // // console.log(loading)
  // const error = useSelector((state) => state.auth.error);
  // // console.log(error)
  // const [email, setEmail] = useState('');
  // const [privacyPolicy, setPrivacyPolicy] = useState(false);

  // const [userData, setUserData] = useState({ firstName: '', lastName: '', email: "", password: '', privacyPolicyAccepted: false });

  // const [errors, setErrors] = useState({ firstName: '', lastName: '', email: '', password: '', privatePolicy: '' });
  const [showPassword, setShowPassword] = useState(false);

  const { loading } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({ firstName: '', lastName: '', email: '', password: '', privacyPolicyAccepted: false, });
  const [errors, setErrors] = useState({ firstName: '', lastName: '', email: '', password: '', privacyPolicyAccepted: '', serverError: '', });


  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   // If email changes, update both email and username
  //   if (name === 'email') {
  //     setEmail(value);
  //   }
  //   setUserData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //     username: name === 'email' ? value : prevState.username,
  //   }));
  // };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };


  // const handlePrivacyPolicyChange = () => {
  //   setPrivacyPolicy(!privacyPolicy);
  //   setUserData((prevState) => ({
  //     ...prevState,
  //     privacyPolicyAccepted: !privacyPolicy,
  //   }));
  // };

  const validate = () => {
    let tempErrors = {};
    tempErrors.firstName = userData.firstName ? '' : 'Name is required';
    tempErrors.lastName = userData.lastName ? '' : 'Last name is required';
    tempErrors.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(userData.email) ? '' : 'Invalid email';
    tempErrors.password = userData.password.length >= 10 ? '' : 'Password must be at least 10 characters long';
    tempErrors.privacyPolicyAccepted = userData.privacyPolicyAccepted ? '' : 'Please, accept the privacy policy';

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === '');
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  // // Логируем перед отправкой, чтобы проверить значения
  // console.log('Sending user data:', userData);
  //   // Validate the input data
  //   if (validate()) {
  //     try {
  //       const action = await dispatch(registerUser(userData));
  //       console.log(action);

  //       if (registerUser.fulfilled.match(action)) {
  //         navigate('/checkYourEmail', {
  //           state: {
  //             email: userData.email,
  //           },
  //         });
  //         localStorage.setItem('email',email)
  //       } else {
  //         console.error('Registration failed:', action.error.message);
  //       }
  //     } catch (error) {
  //       console.error('Error during registration:', error);
  //     }
  //   } else {
  //     console.error('Email sending failed, please try again later.');
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const registerData = {
        username: userData.email, // Strapi использует email как username
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName, // Передаём кастомные поля
        lastName: userData.lastName,
        privacyPolicyAccepted: userData.privacyPolicyAccepted ? 1 : 0,
      };
      try {
        console.log('Sending for registration:', registerData);
        const action = await dispatch(registerUser(registerData));
        console.log('Result:', action);
        if (registerUser.fulfilled.match(action)) {
          // Сохраняем email в localStorage для отображения на странице CheckYourEmail
          localStorage.setItem('email', userData.email);

          // Перенаправляем на страницу CheckYourEmail
          navigate('/checkYourEmail', { state: { email: userData.email } });
        } else {
          setErrors((prev) => ({
            ...prev,
            serverError: action.payload || 'Registration failed. Please try again.',
          }));
        }
      } catch (err) {
        setErrors((prev) => ({
          ...prev,
          serverError: err.message || 'An unexpected error occurred.',
        }));
      }
    }
  };



  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography component="h1" variant="h5" sx={{ ...textStylesH2, textAlign: 'center', width: '100%' }}>
          Sign Up
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '12px' }}>
          <Box component="img" src={Hello} alt="Hello" sx={{ marginRight: '8px' }} />
          <Typography variant="h2" sx={{ ...textStylesBody1, fontWeight: '600' }}>
            Welcome to MultyWork!
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }} >
          <Grid container spacing={2}>
            <Grid size={12} >
              <Typography sx={{ ...textStylesBodyL2, textAlign: 'left' }}>First name*</Typography>
              <TextField
                required
                sx={{ marginTop: '8px', '& .MuiInputLabel-root.Mui-focused': { color: '#814AEB', }, '& .MuiInputBase-root.Mui-focused': { borderColor: '#814AEB' }, '& .MuiOutlinedInput-root': { '&:hover fieldset': { borderColor: '#814AEB', }, '&.Mui-focused fieldset': { borderColor: '#814AEB' }, }, }}
                fullWidth
                label="Enter your first name"
                id="first-name"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                autoComplete="off"
              />
            </Grid>
            <Grid size={12} >
              <Typography sx={{ ...textStylesBodyL2, textAlign: 'left' }}>Last name*</Typography>
              <TextField
                required
                sx={{ marginTop: '8px', '& .MuiInputLabel-root.Mui-focused': { color: '#814AEB', }, '& .MuiInputBase-root.Mui-focused': { borderColor: '#814AEB' }, '& .MuiOutlinedInput-root': { '&:hover fieldset': { borderColor: '#814AEB', }, '&.Mui-focused fieldset': { borderColor: '#814AEB' }, }, }}
                fullWidth
                label="Enter your last name"
                id="last-name"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
                autoComplete="off"
              />
            </Grid>
            <Grid size={12} >
              <Typography sx={{ ...textStylesBodyL2, textAlign: 'left' }}>Email*</Typography>
              <TextField
                required
                sx={{ marginTop: '8px', '& .MuiInputLabel-root.Mui-focused': { color: '#814AEB', }, '& .MuiInputBase-root.Mui-focused': { borderColor: '#814AEB' }, '& .MuiOutlinedInput-root': { '&:hover fieldset': { borderColor: '#814AEB', }, '&.Mui-focused fieldset': { borderColor: '#814AEB' }, }, }}
                fullWidth
                label="Enter your email address"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                autoComplete="off"
              />
            </Grid>
            <Grid size={12} >
              <Typography sx={{ ...textStylesBodyL2, textAlign: 'left' }}>Create password*</Typography>
              <TextField
                required
                sx={{ marginTop: '8px', '& .MuiInputLabel-root.Mui-focused': { color: '#814AEB', }, '& .MuiInputBase-root.Mui-focused': { borderColor: '#814AEB' }, '& .MuiOutlinedInput-root': { '&:hover fieldset': { borderColor: '#814AEB', }, '&.Mui-focused fieldset': { borderColor: '#814AEB' }, }, }}
                fullWidth
                label="Use at least 10 characters"
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={userData.password}
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
            {/* Privacy Policy */}
            <Grid size={12} sx={{ display: 'flex', alignItems: 'center' }}>
              <FormControlLabel
                control={
                  <Checkbox  name="privacyPolicyAccepted" checked={userData.privacyPolicyAccepted} onChange={handleChange} sx={{ color: '#D0D5DD', '&.Mui-checked': { color: '#814AEB' }, }} />}
                label={
                  <Typography>
                    I agree to the <Link href="#">Privacy Policy</Link>
                  </Typography>
                }
              />
              {errors.privatePolicy && <Typography color="error">{errors.privatePolicy}</Typography>}
            </Grid>
            {errors.privacyPolicyAccepted && (
              <Typography sx={{ color: 'red', fontSize: '12px', mt: 1 }}>{errors.privacyPolicyAccepted}</Typography>
            )}
          </Grid>

          {/* Loading Spinner */}
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', marginY: 2 }}>
              <CircularProgress />
            </Box>
          )}

          {errors.serverError && <Typography sx={{ color: 'red', textAlign: 'center' }}>{errors.serverError}</Typography>} {/* Error message */}

          <Button type="submit" fullWidth variant="contained" sx={{ ...buttonStyles, borderRadius: '4px', padding: '10px 18px', marginTop: '8px', background: '#814AEB', color: '#FFF', textTransform: 'capitalize', }} aria-label="Sign Up"  disabled={loading}>
            Sign Up
          </Button>
          <Typography sx={{ textAlign: 'center', margin: '12px 0 24px 0' }}>
            Have an account?{' '}
            <span>
              <Link href="/login" variant="body2" sx={{ ...textStylesBodyL2, color: '#814AEB', textDecoration: 'none' }}>
                Log in
              </Link>
            </span>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default PageSignUp;


