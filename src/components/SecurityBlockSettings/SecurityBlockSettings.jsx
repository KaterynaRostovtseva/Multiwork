// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Typography, Box, TextField,InputLabel, Button, OutlinedInput, FormControl, FormHelperText, CircularProgress} from '@mui/material';
// import { textStylesBodyL2, textStylesH3, textStylesBodyL } from '../../components/Styles/styles';
// import{ IconButton } from '@mui/material';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import { useDispatch } from 'react-redux';
// import { setToken, setError, setSuccess } from '../../store/Slice/authSlice';

// const SecurityBlockSettings = ({token}) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [errorsInput, setInputErrors] = useState({ newPassword: '', confirmPassword: '' });
   
//   const validate = () => {
//     let tempErrors = {};
//     tempErrors.newPassword = newPassword.length >= 10 ? '' : 'Password must be at least 10 characters long';
//     tempErrors.confirmPassword = newPassword === confirmPassword ? '' : 'The Passwords do not match';

//     setInputErrors(tempErrors);
//     return Object.values(tempErrors).every((x) => x === '');
//   };

//   const handleSetPassword = async () => {
//     if (!validate()) {
//       return; 
//     }
//     const passwords = {
//       currentPassword: currentPassword,
//       password: newPassword,
//       passwordConfirmation: confirmPassword,
//     };
    
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         'http://localhost:1337/api/auth/change-password',
//         passwords,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         if (response.data.token) {
//           dispatch(setToken(response.data.token));
//         }

//         navigate('/confirmation', {
//           state: {
//             message: 'Password changed successfully',
//             button: 'Continue',
//             to: '/settings',
//           },
//         });

//         setCurrentPassword('');
//         setNewPassword('');
//         setConfirmPassword('');
//         dispatch(setSuccess(true)); 
//       } else {
//         dispatch(setError(response.data.message)); 
//         dispatch(setSuccess(false));
//       }
//     } catch (error) {
//       dispatch(setError('An error occurred during password update')); 
//       dispatch(setSuccess(false));
//     }
//   };

//   return (
//     <div>
//         <div>
//             {loading && (
//                 <Box 
//                 sx={{
//                     display: 'flex', 
//                     width:'258px',
//                     height:'148px',
//                     justifyContent: 'center', 
//                     alignItems: 'center',  
//                     position: 'absolute',
//                     top: '50%', 
//                     left: '50%',
//                     transform: 'translate(-50%, -50%)', 
//                     zIndex: 1000, 
//                 }}
//                 >
//                 <CircularProgress sx={{ marginRight: '8px', color: '#814AEB', }} />
//                 <Typography>Loading... Please wait...</Typography>
//                 </Box>
//                 )}
//         </div>
//  {!loading && (
//     <div>
   
//       <Typography variant="h3" sx={{ ...textStylesH3 }}>
//         Security and privacy
//       </Typography>

//       <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//         <Typography sx={{ ...textStylesBodyL, color: '#000000', textAlign: 'start', margin: '30px 0 20px 0' }}>
//           Password
//         </Typography>
//         <InputLabel>
//           <Typography sx={{ ...textStylesBodyL2, color: '#000000', textAlign: 'start', paddingBottom: '6px' }}>
//             Current Password
//           </Typography>
//         </InputLabel>
//         <TextField
//           id="currentPassword"
//           value={currentPassword}
//           onChange={(e) => setCurrentPassword(e.target.value)}
//           type={showPassword ? 'text' : 'password'}
//           variant="outlined"
//           sx={{
//             '& .MuiInputLabel-root.Mui-focused': { color: '#171717' },
//             '& .MuiOutlinedInput-root': { height: '44px', '&:hover fieldset': { borderColor: '#E2D5FF' }, '&.Mui-focused fieldset': { borderColor: '#E2D5FF' } },
//           }}
//           InputProps={{
//             sx: { height: '44px', width: '400px', borderColor: '#D0D5DD' },
//             endAdornment: (
//               <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: '#000000' }}>
//                 {showPassword ? <Visibility /> : <VisibilityOff />}
//               </IconButton>
//             ),
//           }}
//         />
//       </Box>

//       <Typography sx={{ ...textStylesBodyL, color: '#000000', textAlign: 'start', margin: '40px 0 20px 0' }}>Change Password</Typography>
//       <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
//         <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: '60px' }}>
//           <InputLabel>
//             <Typography sx={{ ...textStylesBodyL2, color: '#171717', textAlign: 'start', paddingBottom: '6px' }}>
//               New Password
//             </Typography>
//           </InputLabel>

//           <FormControl sx={{ width: '400px' }} error={!!errorsInput.newPassword}>
//             <OutlinedInput
//               placeholder="Enter your password"
//               value={newPassword}
//               type="password" 
//               onChange={(e) => setNewPassword(e.target.value)}
//               onClick={() => setShowPassword(!showPassword)} 
//               sx={{
//                 '& .MuiOutlinedInput-root': {
//                   height: '44px',
//                   '& fieldset': {
//                     borderColor: '#D0D5DD',
//                     borderWidth: '2px',
//                   },
//                   '&:hover fieldset': {
//                     borderColor: '#E2D5FF',
//                   },
//                   '&.Mui-focused fieldset': {
//                     borderColor: '#E2D5FF',
//                   },
//                 },
//                 '& input': {
//                   padding: '0 14px',
//                   height: '44px',
//                   borderColor: '#D0D5DD',
//                 },
//               }}
//             />
//              <FormHelperText sx={{color:'red'}}>{errorsInput.newPassword}</FormHelperText>
//           </FormControl>
//         </Box>
//         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//           <InputLabel>
//             <Typography sx={{ ...textStylesBodyL2, color: '#171717', textAlign: 'start', paddingBottom: '6px' }}>
//               Confirm Password
//             </Typography>
//           </InputLabel>
//           <FormControl sx={{ width: '400px' }} error={!!errorsInput.confirmPassword}>
//             <OutlinedInput
//               placeholder="Enter your password"
//               value={confirmPassword}
//               type="password" 
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               sx={{
//                 '& .MuiOutlinedInput-root': {
//                   height: '44px',
//                   '& fieldset': {
//                     borderColor: '#D0D5DD',
//                     borderWidth: '2px',
//                   },
//                   '&:hover fieldset': {
//                     borderColor: '#E2D5FF',
//                   },
//                   '&.Mui-focused fieldset': {
//                     borderColor: '#E2D5FF',
//                   },
//                 },
//                 '& input': {
//                   padding: '0 14px',
//                   height: '44px',
//                   borderColor: '#D0D5DD',
//                 },
//               }}
//             />
//              <FormHelperText sx={{color:'red'}}>{errorsInput.confirmPassword}</FormHelperText>
//           </FormControl>
//         </Box>
//       </Box>

//       <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//         <Button
//           variant="contained"
//           sx={{
//             ...textStylesBodyL2,
//             width: '196px',
//             height: '42px',
//             background: '#814AEB',
//             fontSize: '18px',
//             fontWeight: '500',
//             color: '#FFFFFF',
//             textTransform: 'capitalize',
//             padding: '18px 10px',
//             marginTop: '32px',
//             borderRadius: '4px',
//           }}
//           onClick={handleSetPassword}
//         >
//           Set New Password
//         </Button>
//       </Box>

//     </div>
//   )}
//     </div>
        
//   );
// };

// export default SecurityBlockSettings;