import React, { useState} from 'react';
import { Button, TextField, Typography, Container, Box, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { textStylesH2, textStylesBodyL2, buttonStyles } from '../components/Styles/styles';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser, setError, setSuccess, setUser} from "../store/Slice/authSlice"
import axios from 'axios';
import { persistor } from '../store';
import { useLocation } from 'react-router-dom';

const PageConfirmPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token, error } = useSelector((state) => state.auth);
  const { id} = useSelector((state) => state.auth.user);
  const { action } = location.state;
  const [errors, setErrors] = useState({  email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('')

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    }
    setCredentials((prevState) => ({
      ...credentials,
      [name]: value,
    }));
  };
  const validate = () => {
    let tempErrors = {};
    tempErrors.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(credentials.email) ? '' : 'Invalid email';
    tempErrors.password = credentials.password.length >= 6 ? '' : 'Please enter correct you password';

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === '');
  };

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(`http://localhost:1337/api/users/${id}`, {
        data: { id: id, password: credentials.password },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        await navigate('/confirmation', {
          state: {
            message: 'Your account has been successfully deleted',
            text: 'We are very sorry to see you leave MultiWork.',
            button: 'Continue',
            to: '/',
          },
        });
  
    
        setTimeout(async () => {
          dispatch(logoutUser()); 
          await persistor.purge(); 
          dispatch(setSuccess(true)); 
        }, 400);
  
      } else {
        dispatch(setError(response.data.message || 'Failed to connect with server'));
        dispatch(setSuccess(false));
      }
    } catch (error) {
      console.error('Error during account deletion:', error);
      dispatch(setError('Error during deleting of the account'));
      dispatch(setSuccess(false));
    } finally {
      setLoading(false); 
    }
  };

  const handleDeactivateAccount = async () => {
    try {
      setLoading(true);

      const response = await axios.put(
        `http://localhost:1337/api/users/${id}`, 
        {
          password: credentials.password,
          isActive: false
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      if (response.status === 200) {
        await navigate('/confirmation', {
          state: {
            message: 'Your account has been successfully deactivated',
            text: 'All your data was saved',
            button: 'Continue',
            to: '/homeWithoutRegistration',
          },
        });

       
        setTimeout(async () => {
          dispatch(logoutUser()); 
          await persistor.purge(); 
          dispatch(setSuccess(true)); 
        }, 400);

      } else {
        dispatch(setError(response.data.message || 'Failed to connect with server'));
        dispatch(setSuccess(false));
      }
    } catch (error) {
      console.error('Error during account deactivation:', error)
    }
  }
  const handleConfirmAction = () => {
    if (validate()) {
      if (action === 'delete') {
        handleDeleteAccount();
      } else if (action === 'deactivate') {
        handleDeactivateAccount();
      }
    }
  };


  return (
    <>
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
    {!loading &&  (
    <Container component="main" maxWidth="xs">
        <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography component="h1" variant="h5" sx={{ ...textStylesH2, textAlign: 'center', width:'100%' }}>
           Confirm  your password for security
            </Typography>
        </Box>
        <Box  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid size={12} sx={{ marginTop: '4px' }}>
                <Typography sx={{ ...textStylesBodyL2, textAlign: 'left' }}>Email*</Typography>
                <TextField
                    required
                    sx={{ marginTop: '8px','& .MuiInputLabel-root.Mui-focused': {color: '#814AEB',  },'& .MuiInputBase-root.Mui-focused': { borderColor: '#814AEB'},'& .MuiOutlinedInput-root': {'&:hover fieldset': {borderColor: '#814AEB',}, '&.Mui-focused fieldset': { borderColor: '#814AEB'},}, }}
                    fullWidth
                    label="Enter your email address"
                    id="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    autoComplete="off"
                />
                </Grid>
                <Grid size={12} sx={{ marginTop: '4px' }}>
                  <Typography sx={{ ...textStylesBodyL2, textAlign: 'left' }}>Password*</Typography>
                    <TextField
                        required
                        sx={{ marginTop: '8px' }}
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
                
                    </Grid>

                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                        ...buttonStyles,
                        borderRadius: '4px',
                        padding: '10px 18px',
                        height: '44px',
                        marginTop: '28px',
                        background: '#814AEB',
                        color: '#FFF',
                        textTransform: 'capitalize',
                        }}
                        aria-label="Log In"
                        onClick={handleConfirmAction}
                    >
                        Continue
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                        ...buttonStyles,
                        borderRadius: '4px',
                        padding: '10px 18px',
                        height: '44px',
                        marginTop: '28px',
                        background: '#EFE8FF',
                        textTransform: 'capitalize',
                        }}
                        aria-label="Log In"
                    >
                        Back
                    </Button>
               </Box>
    </Container>
    )}
    </>
  );
};

export default PageConfirmPassword;


