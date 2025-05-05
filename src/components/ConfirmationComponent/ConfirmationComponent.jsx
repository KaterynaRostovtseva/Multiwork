import React from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import { textStylesH2, textStylesBody2, textStylesBodyL2 } from '../../components/Styles/styles';
import CheckIcon from "../../assets/icons/check-circle.svg";
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

const ConfirmationComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { message, button, to, text, text2 } = location.state || {};
  const handleContinue = () => {
    navigate(to)
    window.location.reload(); 
  };


  return (
    <Container component="main">
      <Box sx={{  display: 'flex', flexDirection: 'column',  alignItems: 'center' }}>
        <Box component="img" src={CheckIcon}  sx={{width:'160px', height:'160px', textAlign:'center', marginTop:'50px'}} />
        <Typography component="h1" variant="h5" sx={{ ...textStylesH2, textAlign: 'center', width: '100%', color:'#12B76A', marginTop:'24px' }}>
          {message}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', }}>
            {(text || text2) && (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ ...textStylesBody2, textAlign: 'center', marginTop: '24px' }}>
                  {text}
                  {text && text2 && <br />}
                  {text2}
                </Typography>
              </Box>
            )}
          <Button  variant="contained"  onClick={handleContinue}  sx={{...textStylesBodyL2, width: '100px', height: '44px',  background: 'white', fontSize:'16px', fontWeight:'500',
              textTransform: 'capitalize', padding:'8px 24px', marginTop:'24px', borderRadius: '4px', border:'1px solid black',boxShadow:'none', }}> 
            {button}
        </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default ConfirmationComponent;