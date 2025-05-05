import React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { textStylesH5, textStylesH1, textStylesBody1, textStylesH4 } from '../Styles/styles';
import ImageCollaborate from '../../assets/images/ImageCollaborate.svg';
import ImageDesign from '../../assets/images/ImageDesign.svg';
import ImageSkills from '../../assets/images/ImageSkills.svg';
import ImageTeamWork from '../../assets/images/ImageTeamWork.svg';

function Features() {
    return (
        <Grid container justifyContent="center" sx={{ marginTop: { xs: '50px', md: '100px' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', maxWidth: { xs: '90%', md: '70%' } }}>
                <Typography sx={{ ...textStylesH5 }}>Features</Typography>
                <Typography sx={{ ...textStylesH1, marginTop: '20px', textAlign: 'center' }}>
                    Everything you need for successful collaboration and development
                </Typography>
                <Typography sx={{ ...textStylesBody1, textAlign: 'center', marginTop: '20px', width: { xs: '90%', md: '45%' } }}>
                    Get access to talented specialists and significantly save on recruiting costs with our innovative solutions.
                </Typography>
            </Box>

            <Grid container sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', margin: { xs: '30px 16px 20px 16px', md: '60px 110px 20px 110px' }, backgroundColor: '#E2D5FF', borderRadius: '8px', width: '100%' }}>
                <Typography sx={{ ...textStylesH5, marginTop: '40px' }}>Soon</Typography>
                <Typography sx={{ ...textStylesH4, color: '#0A0A0A', marginTop: '20px' }}>Mobile adaptation</Typography>
                <Typography sx={{ ...textStylesBody1, textAlign: 'center', margin: '20px 0 40px 0', width: { xs: '60%',   md: '27%' } }}>
                    Our platform is fully mobile-optimized for a seamless experience on the go.
                </Typography>
            </Grid>

            <Grid container spacing={2} sx={{ margin: { xs: '0 16px', md: '0 110px' } }}>
                <Grid size={{xs: 12, sm: 7, md: 7}} sx={{ display: 'flex', flexDirection: 'column', backgroundColor: '#F9F6FF', padding: '40px', borderRadius: '8px', marginBottom: { xs: '20px', md: '0' } }}>
                    <Typography sx={{ ...textStylesH4, color: '#0A0A0A', marginTop: '20px' }}>Design</Typography>
                    <Typography sx={{ ...textStylesBody1, textAlign: 'left', margin: '20px 0 40px 0' }}>
                        Our design focuses on simplicity and cleanliness, making it easy to navigate and stay focused on what matters.
                    </Typography>
                    <Box component="img" src={ImageDesign} alt="ImageDesign" sx={{ marginLeft: { xs: '0', md: '-20px' } }} />
                </Grid>

                <Grid size={{xs: 12, sm: 5, md: 5}} sx={{ display: 'flex', flexDirection: 'column', backgroundColor: '#F9F6FF', padding: '40px', borderRadius: '8px', marginBottom: { xs: '20px', md: '0' } }}>
                    <Typography sx={{ ...textStylesH4, color: '#0A0A0A', marginTop: '20px' }}>Collaborate</Typography>
                    <Typography sx={{ ...textStylesBody1, textAlign: 'left', margin: '20px 0 40px 0' }}>
                        Our platform facilitates seamless collaboration, allowing teams to work together effectively on projects.
                    </Typography>
                    <Box component="img" src={ImageCollaborate} alt="ImageCollaborate" />
                </Grid>

                <Grid size={{xs: 12, sm: 5, md: 5}} sx={{ display: 'flex', flexDirection: 'column', backgroundColor: '#F9F6FF', padding: '40px', borderRadius: '8px', marginBottom: { xs: '20px', md: '0' } }}>
                    <Typography sx={{ ...textStylesH4, color: '#0A0A0A', marginTop: '20px' }}>Team work on the project</Typography>
                    <Typography sx={{ ...textStylesBody1, textAlign: 'left', margin: '20px 0 30px 0' }}>
                        In MultiWork, you can join teams to work on projects or create your own and involve a team to implement them.
                    </Typography>
                    <Box component="img" src={ImageTeamWork} alt="ImageTeamWork" sx={{ marginLeft: { xs: '0', md: '-20px' } }} />
                </Grid>

                <Grid size={{xs: 12, sm: 7, md: 7}} sx={{ display: 'flex', flexDirection: 'column', backgroundColor: '#F9F6FF', padding: '40px', borderRadius: '8px' }}>
                    <Typography sx={{ ...textStylesH4, color: '#0A0A0A', marginTop: '20px' }}>Skills</Typography>
                    <Typography sx={{ ...textStylesBody1, textAlign: 'left', margin: '20px 0 40px 0' }}>
                        Each user specifies their skills during registration, making it easier to find professionals with different skills.
                    </Typography>
                    <Box component="img" src={ImageSkills} alt="ImageSkills" />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Features;
