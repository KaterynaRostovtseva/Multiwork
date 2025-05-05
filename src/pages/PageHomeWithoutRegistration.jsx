import React, { useState, useEffect } from "react";
import SideBar from '../components/SideBar';
import { Box, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { textStylesH2, buttonStyles, textStylesBody1, textStylesBody2 } from '../components/Styles/styles';
import CardDataTopUsers from '../components/CardDataTopUsers';
import CardDataTopProjects from '../components/CardDataTopProjects';
import { useNavigate } from 'react-router-dom';
import CreateProjectModal from "../components/CreateProjectModal/CreateProjectModal";
import { useSelector } from "react-redux";
import MockDataUsers from "../components/Mock/MockDataUsers";
import { getAllProjects } from '../store/Slice/projectSlice';




const PageHomeWithoutRegistration = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const [openModal, setOpenModal] = useState(false);
    const dataProjects = useSelector(getAllProjects) ||  { data: [] };
   
  const handleOpenModal = () => {
    setOpenModal(true);
  
};

  const handleCloseModal = () => {
    setOpenModal(false);
  }

    const dataUsers = MockDataUsers()
    // const dataProjects = MockDataProjects();

    const handleCreateAProject = () => {
        handleOpenModal();
    }

    const handleJoinTheProject = () => {
        navigate('/joinTheProject')
    }

    const handleCompleteProfile = () => {
        navigate('/profile')
    }


    return (
        <Grid sx={{ display: 'flex', marginTop: '-108px' }}>
            <SideBar />
            <CreateProjectModal showModal={openModal} closeModal={handleCloseModal} />
            <Grid sx={{ flex: 1, margin: { xs: '138px 16px 0 16px', sm: '138px 32px 0 32px', md: '138px 80px 80px 80px' } }}>
                {user && (
                    <Grid sx={{ backgroundColor: '#fff', margin: { xs: '20px 0', sm: '40px 0', md: '60px 0' }, display: 'flex', flexDirection: { xs: 'column', sm: 'column', lg: 'row' }, justifyContent: 'space-between', alignItems: 'flex-start', gap: { xs: 4, md: 0 }, }}>

                        <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: { xs: '0', sm: '50px', md: '100px' }, flex: { xs: 'none', md: 1 }, textAlign: { xs: 'center', md: 'left' }, }} >
                            <Typography variant="h2" sx={{ ...textStylesH2, textAlign: { xs: 'center', md: 'left' }, }}>
                                Welcome to MultiWork!
                            </Typography>
                            <Typography variant="body1" sx={{ ...textStylesBody1, textAlign: { xs: 'center', md: 'left' }, margin: '16px 0', }} >
                                At MultiWork you will be able to find like-minded people and join forces to achieve common goals.
                                Start by creating your first project or completing a profile.
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', transition: 'all 0.3s ease-in-out', flexDirection: { xs: 'column', sm: 'column', lg: 'row' },  gap: { xs: 2, sm: 2, lg: 3 }, flex: { xs: 'none', sm: 'none', lg: 1 }, justifyContent: 'center',  alignItems: 'center', width: '100%',}}>
                            {[
                                {
                                    text: 'Launch your own project on MultyWork and gather a team of specialists to implement it.',
                                    buttonText: 'Create a project',
                                    onClick: handleCreateAProject,
                                },
                                {
                                    text: 'Become part of a project on MultyWork and work with specialists to turn ideas into reality.',
                                    buttonText: 'Join the project',
                                    onClick: handleJoinTheProject,
                                },
                                {
                                    text: 'Get approved answers to collaborate with other users. Start by filling out your profile.',
                                    buttonText: 'Complete profile',
                                    onClick: handleCompleteProfile,
                                },].map(({ text, buttonText, onClick }, index) => (
                                    <Box key={index} sx={{ borderRadius: '4px', width: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#EFE8FF', padding: '16px', minHeight: { xs: '100%', lg: '259px' }, maxWidth: { xs: '100%', lg: '245px' }, }}>
                                        <Typography variant="body2" sx={{ ...textStylesBody2, textAlign: 'left', }} >
                                            {text}
                                        </Typography>
                                        <Button variant="contained" onClick={onClick} sx={{ ...buttonStyles, alignSelf: 'center', borderRadius: '8px', padding: '8px', width: '178px', height: '44px', marginTop: index === 2 ? '92px' : '70px', background: '#FFF', color: '#814AEB', alignSelf: { xs: 'center', lg: 'flex-start' }, }}>
                                            {buttonText}
                                        </Button>
                                    </Box>
                                ))}
                        </Box>
                    </Grid>
                )}

                <Grid sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row', sm: 'column' }, gap: '32px', width: '100%' }} >
                    <Grid sx={{ minWidth: 0, display: 'flex', flexDirection: 'column', width: '100%', }}>
                        <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' }, }} >
                            <Typography variant="H2" sx={{ ...textStylesH2 }}>Top users</Typography>
                            <Button onClick={() => navigate('/pageMembers')} sx={{ ...buttonStyles, textDecoration: 'underline', mt: { xs: 2, sm: 0 }, }}>
                                View all users
                            </Button>
                        </Box>

                        <Box sx={{ marginTop: '32px', bgcolor: '#EFE8FF', overflowX: 'auto', display: 'flex', flexDirection: 'column', borderRadius: '14px', width: '100%', }}>
                            {dataUsers.slice(0, 3).map((item, index) => (
                                <Grid key={index} sx={{ margin: '16px 16px' }}>
                                    <CardDataTopUsers prop={item} />
                                </Grid>
                            ))}
                        </Box>
                    </Grid>
                    <Grid sx={{ flex: { xs: '1 0 100%', sm: '0 0 68%' }, minWidth: 0, display: 'flex', flexDirection: 'column', mt: { xs: '32px', sm: 0 }, width: '100%', }}>
                        <Box sx={{
                            display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' },
                        }}>
                            <Typography variant="H2" sx={{ ...textStylesH2 }}>Top projects</Typography>
                            <Button onClick={() => navigate('/pageTopProjects')} sx={{ ...buttonStyles, textDecoration: 'underline', mt: { xs: 2, sm: 0 }, }}>
                                View all projects
                            </Button>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '32px', width: '100%', }}>
                            {/* {(dataProjects.data || []).slice(0, 3).map((item, index) => ( */}
                            {dataProjects.slice(0, 3).map((item, index) => (
                                <Grid key={index}>
                                    <CardDataTopProjects prop={item} />
                                </Grid>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};


export default PageHomeWithoutRegistration;

