import Grid from '@mui/material/Grid2';
import SideBar from '../components/SideBar';

import { Typography, Box, Button, CircularProgress} from '@mui/material';
import { textStylesH3, textStylesBodyL2 } from '../components/Styles/styles';

import NotificationSettingsBlock from '../components/NotificationSettingsBlock/NotificationSettingsBlock';
import PersonalInfoSettings from '../components/PersonaInfoSettings/PersonalInfoSettings';
import { ButtonGroup } from '@mui/material';
import SecurityBlockSettings from '../components/SecurityBlockSettings/SecurityBlockSettings';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// import { updateSettingsUserInfo, resetSuccess } from '../store/Slice/authSlice';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const [selectedBlock, setSelectedBlock] = useState('personalInfo'); 
  const { id: userId, firstName, lastName, email} = useSelector((state) => state.auth.user);
  const { token: token, loading, success, error, user} = useSelector((state) => state.auth);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: firstName || '',
    lastName: lastName || '',
    email: email || '',
  });
  const [isEditing, setIsEditing] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const savePersonalInfo = async () => {
    try {
 
      // await dispatch(updateSettingsUserInfo({ userId, personalInfo, token }));
   
      navigate('/confirmation', {
        state: {
          message: 'Data has been successfully updated',
          button: 'Continue',
          to: '/settings', 
        },
      });
    } catch (error) {
      console.error('Error updating personal information:', error);
    }
  };
  const cancelEditing = () => {
    setIsEditing(false);
    setPersonalInfo({ firstName, lastName, email });
  };
  useEffect(() => {
    if (user) {
      setPersonalInfo({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
      });
    }
  }, [user]);
 
  
  return (
    <div>
      {/* Loading, Success, and Error Messages */}
      <div>
        {loading && (
          <Box 
          sx={{
            display: 'flex', 
            width:'258px',
            height:'148px',
            justifyContent: 'center', 
            alignItems: 'center',  
            position: 'absolute',
            top: '50%', 
            left: '50%',
            transform: 'translate(-50%, -50%)', 
            zIndex: 1000, 
          }}
        >
          <CircularProgress sx={{ marginRight: '8px', color: '#814AEB', }} />
          <Typography>Loading... Please wait...</Typography>
          </Box>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      {/* Settings Form */}
      {!loading && !success && user && (
        <Grid sx={{ display: 'flex', marginTop: '-108px',  background:'white'}}>
          <SideBar sx={{width:"auto"}} />
          <Grid sx={{ margin: '120px 80px 82px 80px'}}>
            <ButtonGroup
              variant="outlined"
              aria-label="Settings button group"
              sx={{
                marginBottom: '60px',
                top: '120px',
                height: '44px',
                border: '1.5px solid #D0D5DD',
                borderRadius:'8px',
                '& .MuiButton-outlined': { border: '1.5px solid', borderColor: '#D0D5DD' },
              }}
            >
              <Button
                sx={{
                  ...textStylesBodyL2,
                  textTransform: 'none',
                  lineHeight: '24px',
                  color: selectedBlock === 'personalInfo' ? '#814AEB' : '#171717',
                }}
                onClick={() => setSelectedBlock('personalInfo')}
              >
                Personal Information
              </Button>
              <Button
                sx={{
                  textTransform: 'none',
                  ...textStylesBodyL2,
                  color: selectedBlock === 'securityPrivacy' ? '#814AEB' : '#171717',
                  padding: '10px 16px',
                }}
                onClick={() => setSelectedBlock('securityPrivacy')}
              >
                Security and Privacy
              </Button>
              <Button
                sx={{
                  textTransform: 'none',
                  ...textStylesBodyL2,
                  color: selectedBlock === 'accountManagement' ? '#814AEB' : '#171717',
                  padding: '10px 16px',
                }}
                onClick={() => setSelectedBlock('accountManagement')}
              >
                Account Management
              </Button>
          </ButtonGroup>
            <Box sx={{ display: 'flex', flexDirection: 'row',  alignItems: 'flex-start',}}>
             
              <Box  sx={{  position: 'absolute', right: 0, display: 'flex', flexDirection: 'row', paddingRight: '110px', marginTop:'-110px'   }}>
          
                <Box sx={{ display: 'flex', flexDirection: 'column',  }}>
                  <Button  variant="contained"   onClick={cancelEditing} sx={{...textStylesBodyL2, width: '100px', height: '44px',  background: '#E8E8E8', fontSize:'16px', fontWeight:'500',
                      color: '#A2A2A2', textTransform: 'capitalize', padding:'8px 24px', marginRight:'20px', borderRadius: '4px', boxShadow:'none', }}> 
                      Cancel
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Button  variant="contained" onClick={savePersonalInfo} sx={{...textStylesBodyL2, width: '72px', height: '44px',  background: '#814AEB', fontSize:'16px', fontWeight:'500',
                      color: '#FFFFFF', textTransform: 'capitalize', padding:'8px 18px',  borderRadius: '4px', boxShadow:'none',}}> 
                    Save
                  </Button>
              </Box>
                
            </Box>
           </Box>
          {selectedBlock === 'personalInfo' && <PersonalInfoSettings personalInfo={personalInfo} setPersonalInfo={setPersonalInfo}/>}
          {selectedBlock === 'securityPrivacy' && <SecurityBlockSettings  token={token}/>}
          {selectedBlock === 'accountManagement' && <NotificationSettingsBlock />}
        </Grid>
      
      </Grid>
      )}
    </div>

  );
}

export default SettingsPage;