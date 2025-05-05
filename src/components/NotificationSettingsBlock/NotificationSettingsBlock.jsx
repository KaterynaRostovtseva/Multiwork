import React from 'react';
import { Box, Typography, Card, CardContent, Divider, Button } from '@mui/material';
import CustomSwitch from '../../common/CustomSwitch/CustomSwitch';
import { textStylesH3, textStylesBodyL, textStylesBody1 , textStylesBodyL3 } from '../Styles/styles';
import { useNavigate } from 'react-router-dom';

const NotificationSettingsBlock = ({userId, token}) => {
    const [allNotifications, setAllNotifications] = React.useState(false);
    const [newInvites, setNewInvites] = React.useState(false);
    const [newMessages, setNewMessages] = React.useState(false);
    const [newFollowers, setNewFollowers] = React.useState(false);
    const [joinRequests, setJoinRequests] = React.useState(false);
     const navigate = useNavigate();

     const handleConfirmation = (action) => {
      navigate("/confirmPassword", {
        state: { token: token, userId: userId, action: action }
      });
    };
    
    return (
      <div>
        <Typography variant="h3" sx={{...textStylesH3}}>
           My Account
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
          <Typography sx={{...textStylesBodyL, color:'#000000', textAlign:'start', margin:'30px 0 8px 0'}}>Account Deactivation</Typography>
          <Typography sx={{textStylesBody1}}>If you want to temporarily suspend the use of your recording, you can deactivate it. 
            All your data <br/>and settings are saved, but the account will be inactive until you decide to restore it</Typography>
            <Button  onClick={() => handleConfirmation('deactivate')} variant="contained" sx={{...textStylesBodyL,  width: '252px', height: '44px',  background: 'transparent', letterSpacing: '0.03rem',
            color: '#000000', textTransform:'none', marginTop:'24px', padding:'18px 10px', border:' solid 1px #171717',  boxShadow: 'none', }}> 
            Account deactivation 
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
          <Typography sx={{...textStylesBodyL, color:'#000000', textAlign:'start', margin:'40px 0 8px 0'}}>Delete my account</Typography>
          <Typography sx={{textStylesBody1}}>This action will completely delete your electronic record and all data associated with it. Once <br/>
          deleted, it will not be possible to regain access to the digital recording or any information.</Typography>
            <Button onClick={() => handleConfirmation('delete')} sx={{...textStylesBodyL3, width: '252px', height: '44px',  background: 'transparent', 
            textTransform:'none', marginTop:'24px', padding:'18px 10px', border:' solid 1px #171717',  boxShadow: 'none', }}> 
            Delete my account 
          </Button>
        </Box>
        <Typography variant="h3" sx={{...textStylesH3, paddingTop: '66px' }}>
          Notifications
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{...textStylesBodyL, color:'#000000', textAlign:'start', margin:'30px 0 20px 0'}}>Personalize notifications</Typography>
        </Box>
        <Card sx={{ width: 439, height: 283 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography sx={{ ...textStylesBody1, padding:'0 0 14px 14px' }}>All notifications</Typography>
              <CustomSwitch checked={allNotifications} onChange={() => setAllNotifications(!allNotifications)} />
            </Box>
            <Divider sx={{ margin: '0 82px 0 14px', borderColor: '#D0D5DD' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography sx={{ ...textStylesBody1,  padding:'14px 0 14px 14px'  }}>Notifications about new invites</Typography>
              <CustomSwitch checked={newInvites} onChange={() => setNewInvites(!newInvites)} />
            </Box>
            <Divider sx={{ margin: '0 82px 0 14px', borderColor: '#D0D5DD' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography sx={{ ...textStylesBody1,  padding:'14px 0 14px 14px'  }}>Notifications about new messages</Typography>
              <CustomSwitch checked={newMessages} onChange={() => setNewMessages(!newMessages)} />
            </Box>
            <Divider sx={{ margin: '0 82px 0 14px', borderColor: '#D0D5DD' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography sx={{ ...textStylesBody1, padding:'14px 0 14px 14px'  }}>Notifications about new followers</Typography>
              <CustomSwitch checked={newFollowers} onChange={() => setNewFollowers(!newFollowers)} />
            </Box>
            <Divider sx={{ margin: '0 82px 0 14px' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '24px' }}>
              <Typography sx={{ ...textStylesBody1,  padding:'14px 0 14px 14px',}}>Join requests</Typography>
              <CustomSwitch checked={joinRequests} onChange={() => setJoinRequests(!joinRequests)} />
            </Box>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  export default NotificationSettingsBlock;