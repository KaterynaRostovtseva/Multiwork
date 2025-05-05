import React from "react";
import { Button, Typography, Container, Box, } from '@mui/material';
import { textStylesH2, buttonStyles, textStylesBody1, textStylesH1 } from '../components/Styles/styles';
import CheckIcon from "../assets/icons/check-circle.svg";
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import SideBar from '../components/SideBar';



const PageSuccessHelpCenter = () => {
    const navigate = useNavigate();

    return (
        <Grid container sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, marginTop: '-108px' }}>
            <Grid sx={{ width: { xs: '100%', md: '260px' }, height: 'auto', display: { xs: 'none', md: 'block' } }}>
                <SideBar />
            </Grid>

            <Grid sx={{ flex: 1, margin: '138px 80px 80px 80px' }}>
                <Typography sx={{ ...textStylesH1, textAlign: 'left' }}>Help Center</Typography>
                <Grid display="flex" flexDirection="column" alignItems="center" textAlign="center" marginTop="50px">
                    {/* <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', marginTop:'100px' }}> */}
                    <Box component="img" src={CheckIcon} sx={{ width: '160px', height: '160px', textAlign: 'center' }} />
                    < Typography sx={{ ...textStylesH2, color: '#12B76A', marginTop: '24px' }}> Your request has been successfully sent!</Typography>
                    <Typography variant="h6" component="h2" gutterBottom sx={{ ...textStylesBody1, marginTop: '24px' }}>
                        You will receive an answer to the specified email address within 5 working days.
                    </Typography>
                    <Typography variant="h6" component="h2" gutterBottom sx={{ ...textStylesBody1,  marginBottom: '24px'}}>
                        Thank you for contacting us!
                    </Typography>

                    <Button variant="text" onClick={() => navigate(`/pageHelpCenter`)} sx={{ ...buttonStyles, width: '136px', height: '54px' }}>
                        Back
                    </Button>
                    {/* </Box> */}
                </Grid>
            </Grid>
        </Grid>

    );
};
export default PageSuccessHelpCenter;