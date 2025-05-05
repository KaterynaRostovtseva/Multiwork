import React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { textStylesH5, textStylesH1, textStylesBody1, textStylesH4 } from '../Styles/styles';
import Professional from '../../assets/icons/Professional.svg';
import Beginners from '../../assets/icons/Beginners.svg';
import Startups from '../../assets/icons/Startups.svg';
import Companies from '../../assets/icons/Companies.svg';
import Businesses from '../../assets/icons/Businesses.svg';

function ForWhom() {

    return (
        <Grid container sx={{ justifyContent: 'center', margin: { xs: '50px 16px', md: '100px' } }}>
            <Grid sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', maxWidth: '700px' }} >
                <Typography sx={{ ...textStylesH5 }}>For whom?</Typography>
                <Typography sx={{ ...textStylesH1, marginTop: '20px' }}>MultyWork can meet the needs of every user group</Typography>
                <Typography sx={{ ...textStylesBody1, marginTop: '20px' }}>Our platform helps businesses and IT companies reduce recruitment costs by up to 50%, while ensuring access to the best specialists for your projects.</Typography>
            </Grid>

            <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: { xs: '40px', md: '60px' }, padding: { xs: '0 16px', md: '0 110px' } }} >
                <Grid size={{xs: 12, sm: 6, md: 4}} sx={{ display: 'flex', flexDirection: 'column', backgroundColor: '#F9F6FF', padding: '20px', borderRadius: '8px' }}>
                    <Box component="img" src={Professional} alt="Professional" sx={{ width: 80, height: 80 }} />
                    <Typography sx={{ ...textStylesH4, margin: '20px 0' }}>Professionals</Typography>
                    <Typography sx={{ ...textStylesBody1, textAlign: 'left' }}>Our platform provides experts in their field with opportunities to collaborate, develop skills, participate in projects, network and grow.</Typography>
                </Grid>
                <Grid size={{xs: 12, sm: 6, md: 4}} sx={{ display: 'flex', flexDirection: 'column', backgroundColor: '#F9F6FF', padding: '20px', borderRadius: '8px' }}>
                    <Box component="img" src={Beginners} alt="Beginners" sx={{ width: 80, height: 80 }} />
                    <Typography sx={{ ...textStylesH4, margin: '20px 0' }}>Beginners</Typography>
                    <Typography sx={{ ...textStylesBody1, textAlign: 'left' }}>Our platform provides startups with access to educational tools to rapidly develop skills and foster collaboration for a successful career launch.</Typography>
                </Grid>
                <Grid size={{xs: 12, sm: 6, md: 4}} sx={{ display: 'flex', flexDirection: 'column', backgroundColor: '#F9F6FF', padding: '20px', borderRadius: '8px' }}>
                    <Box component="img" src={Startups} alt="Startups" sx={{ width: 80, height: 80 }} />
                    <Typography sx={{ ...textStylesH4, margin: '20px 0' }}>Startups</Typography>
                    <Typography sx={{ ...textStylesBody1, textAlign: 'left' }}>Our platform enables startups to collaborate with others, find talent and work on projects, accelerating their development and success.</Typography>
                </Grid>
                <Grid size={{xs: 12, sm: 6, md: 4}} sx={{ display: 'flex', flexDirection: 'column', backgroundColor: '#F9F6FF', padding: '20px', borderRadius: '8px' }}>
                    <Box component="img" src={Companies} alt="Companies" sx={{ width: 80, height: 80 }} />
                    <Typography sx={{ ...textStylesH4, margin: '20px 0' }}>Companies</Typography>
                    <Typography sx={{ ...textStylesBody1, textAlign: 'left' }}>Our platform provides companies with access to talented IT professionals, facilitating collaboration and project success.</Typography>
                </Grid>
                <Grid size={{xs: 12, sm: 6, md: 4}} sx={{ display: 'flex', flexDirection: 'column', backgroundColor: '#F9F6FF', padding: '20px', borderRadius: '8px' }}>
                    <Box component="img" src={Businesses} alt="Businesses" sx={{ width: 80, height: 80 }} />
                    <Typography sx={{ ...textStylesH4, margin: '20px 0' }}>Businesses</Typography>
                    <Typography sx={{ ...textStylesBody1, textAlign: 'left' }}>Our platform helps small and large businesses find qualified specialists, collaborate effectively and achieve better results in projects.</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ForWhom;

