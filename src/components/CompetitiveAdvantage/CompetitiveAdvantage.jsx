import React from 'react';
import Browser from '../../assets/images/Browser.svg';
import ContentCompetitiveAdvantage from '../../assets/images/ContentCompetitiveAdvantage.svg';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import { textStylesH5, textStylesH1, textStylesBody1, buttonStyles } from '../Styles/styles';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CompetitiveAdvantage() {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/home/WithoutRegistration')
       }

    return (
        <Grid container sx={{ justifyContent: 'center', marginTop: { xs: '50px', md: '100px' } }}>
           
            <Grid size={12} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', backgroundColor: '#F9F6FF', padding: { xs: '32px' } }}>
                <Typography sx={{ ...textStylesH5, marginTop: '80px' }}>Compare</Typography>
                <Typography sx={{ ...textStylesH1, margin: '20px 0 60px 0' }}>Competitive advantage</Typography>
                <Box component="img" src={ContentCompetitiveAdvantage} alt="ContentCompetitiveAdvantage" sx={{ width: { xs: '100%', md: '900px' }, height: { xs: 'auto', md: '500px' }, marginBottom: { xs: ' 50px ', md: '80px' } }} />
            </Grid>
           
            <Grid container sx={{ display: 'flex', margin: { xs: '20px 16px', md: '100px 110px' }, flexDirection: { xs: 'column', md: 'row' } }}>
                <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', flexDirection: 'column', marginRight: { xs: '0', md: '20px' }, marginBottom: { xs: '20px', md: '0' } }}>
                    <Typography sx={{ ...textStylesH1, textAlign: 'left' }}>Collaborate more effectively, achieve more</Typography>
                    <Typography sx={{ ...textStylesBody1, margin: '20px 0', textAlign: 'left', width: { xs: '100%', md: '70%' } }}>
                        Create successful teams and projects, collaborate with other participants in MultyWork now. Discover new opportunities for the development and growth of your business.
                    </Typography>
                    <Button variant="contained" onClick={handleGetStarted} sx={{...buttonStyles, borderRadius: '8px', padding: { xs: '12px 20px', md: '16px 24px' }, width: { xs: '100%', sm: '180px', md:'155px' },height: { xs: '50px', sm: '60px' },marginTop: '24px', background: '#814AEB',  color: '#FFF', textTransform: 'capitalize', }} aria-label="Get started"> 
                    Get started </Button>
                </Grid>
                <Box component="img" src={Browser} alt="Browser" sx={{ width: { xs: '100%', md: '600px' }, height: { xs: 'auto', md: '400px' } }} />
            </Grid>
        </Grid>
    );
}

export default CompetitiveAdvantage;
