import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Avatar } from '@mui/material';
import Grid from '@mui/material/Grid2';
import SideBar from '../components/SideBar';
import BanerUploader from '../components/BanerUploader';
import ShareSharpIcon from '@mui/icons-material/ShareSharp';
import IconButton from '@mui/material/IconButton';
import ModeEditOutlineSharpIcon from '@mui/icons-material/ModeEditOutlineSharp';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buttonStyles, textStylesH2, textStylesBody1, textStylesBody2,textStylesBody3  } from '../components/Styles/styles';
import { Button } from '@mui/material';
import { IMAGES_URL } from "../config";
import { mockFetchFollowersCount, fetchFollowersCount } from '../components/Mock/mockFetchFollowersCount';
import CardDataTopUsers from '../components/CardDataTopUsers';
import { fetchProjects, getAllProjects } from '../store/Slice/projectSlice';

const PageMyProject = () => {
    const { id } = useParams();
    const [baner, setBaner] = useState(null);
    const navigate = useNavigate();
    const [followersCount, setFollowersCount] = useState(0);
    const [followersLoading, setFollowersLoading] = useState(true);
    const [members, setMembers] = useState([]);
    const dispatch = useDispatch();
    const projects = useSelector(getAllProjects);
    // console.log('projects',projects)
    const loading = useSelector((state) => state.projects.loading);
    const currentUser = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (projects.length === 0) {
            dispatch(fetchProjects());
        }
    }, [dispatch]);

    const numericId = Number(id);

    const foundProject = projects.find((p) => p.id === numericId);


    const isCurrentUserProjectOwner = foundProject?.user.id === currentUser?.id;
  

    const status = foundProject?.project_status?.trim().replace(/;$/, '') || 'Active';

    useEffect(() => {
        const fetchFollowers = async () => {
            setFollowersLoading(true);
            try {
                const count = await mockFetchFollowersCount(); 
                setFollowersCount(count);
            } catch (error) {
                setFollowersCount(0);
            } finally {
                setFollowersLoading(false);
            }
        };

        fetchFollowers();
    }, []);

    const getBanner = () => {
        const storedBanner = localStorage.getItem(`baner`);
        if (storedBanner) {
            setBaner(storedBanner);
        }
    };

    useEffect(() => {
        getBanner();
    }, []);

    const handleBanerDrop = (imageData) => {
        setBaner(imageData);
        localStorage.setItem('baner', imageData);
    };

    const addMember = (newMember) => {
        setMembers([...members, newMember]);
    };

    useEffect(() => {
        localStorage.setItem('members', JSON.stringify(members));
    }, [members]);

    useEffect(() => {
        const savedMembers = JSON.parse(localStorage.getItem('members')) || [];
        setMembers(savedMembers);
    }, []);

    if (loading || followersLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!foundProject) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h6" color="error">Project not found.</Typography>
            </Box>
        );
    }


    return (
        <Grid container sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, marginTop: '-108px' }}>
            <SideBar />
            <Grid sx={{ flex: 1, margin: { xs: '138px 16px 0 16px', md: '138px 80px 80px 80px' } }}>
                <Box sx={{ backgroundColor: '#D1D1D1', width: '100%', position: 'relative', borderRadius: '8px' }}>
                    <BanerUploader onDrop={handleBanerDrop} />
                    {baner && (
                        <Box component="img" src={baner} alt="baner" sx={{ width: '100%', height: '240px', position: 'absolute', top: 0, left: 0, borderRadius: '8px' }} />
                    )}
                </Box>

                <Grid sx={{ marginBottom: '40px', display: 'flex', flexWrap: 'nowrap' }}>
                    {foundProject?.coverImg?.url && (
                        <Box component="img" src={`${IMAGES_URL}${foundProject?.coverImg.url}`} alt="Cropped" sx={{ marginTop: { xs: '-8px', sm: '-20px', md: '-20px' }, zIndex: 5, width: { xs: 120, sm: 150, md: 180 }, height: { xs: 120, sm: 150, md: 180 }, borderRadius: '50%', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', marginBottom: { xs: '16px', sm: '0' }, marginRight: { sm: '16px' } }} />
                    )}
                    <Box sx={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexDirection: { xs: 'column', md: 'row' }, flexWrap: 'wrap', width: '100%', }}>

                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', marginBottom: { xs: '24px', md: 0 }, }}>
                            <Typography variant="h6" sx={{ ...textStylesH2 }}> {foundProject?.title} </Typography>
                            <Typography sx={{ ...textStylesBody2, color: '#667085', textAlign: 'left', marginTop: '8px' }} >
                                Start: {foundProject?.createdAt ? new Date(foundProject.createdAt).toISOString().slice(0, 10).split('-').reverse().join('.') : 'Date not specified'}
                            </Typography>
                            <Box sx={{ ...textStylesBody2, marginTop: '12px', backgroundColor: '#DDF7EF', color: '#027A48', fontWeight: 'bold', borderRadius: '50px', padding: '4px 12px', display: 'inline-block', textTransform: 'capitalize', }}>
                                {status}
                            </Box>
                        </Box>
                        {isCurrentUserProjectOwner ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column',alignItems: { xs: 'flex-start', sm: 'flex-end' }, flexWrap: 'wrap', width: '100%', gap: 2, }}>
                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'flex-end', alignItems: 'flex-end', flexWrap: 'wrap', gap: 2, }}>
                                <Button variant="text" onClick={() => navigate('/pageAllMyProject')} sx={{ ...buttonStyles, borderRadius: '8px', padding: '8px 8px', minWidth: '160px', maxWidth: '222px', height: '56px', color: '#814AEB', }}>
                                    View my created projects
                                </Button>
                                <Button variant="contained" onClick={() => navigate('/profileEditProjects')} startIcon={<ModeEditOutlineSharpIcon />} sx={{ ...buttonStyles, borderRadius: '8px', padding: '8px 12px', minWidth: '160px', maxWidth: '222px', height: '56px',  width: { xs: '100%', lg: 'auto' }, background: '#814AEB', color: '#FFF', }}>
                                    Edit the project
                                </Button>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                                {followersCount > 0 ? (
                                    <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                                        {[...Array(Math.min(followersCount, 4))].map((_, idx) => (
                                            <Avatar key={idx} sx={{ width: 24, height: 24, position: 'absolute', left: `${idx * 17}px`, zIndex: followersCount - idx, border: '1px solid white', }}/>))}
                                        <Typography component="span" sx={{ marginLeft: `${Math.min(followersCount, 4) * 17 + 10}px`, ...textStylesBody2,}}>
                                            +{followersCount} followers
                                        </Typography>
                                    </Box>
                                ) : (
                                    <Typography component="span" sx={{ ...textStylesBody2 }}>
                                        No followers
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                         ) :(
                         <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                            {followersCount > 0 ? (
                                <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                                    {[...Array(Math.min(followersCount, 4))].map((_, idx) => (
                                        <Avatar key={idx} sx={{ width: 24, height: 24, position: 'absolute', left: `${idx * 17}px`, zIndex: followersCount - idx, border: '1px solid white', }}/>))}
                                    <Typography component="span" sx={{ marginLeft: `${Math.min(followersCount, 4) * 17 + 10}px`, ...textStylesBody2,}}>
                                        +{followersCount} followers
                                    </Typography>
                                </Box>
                            ) : (
                                <Typography component="span" sx={{ ...textStylesBody2 }}>
                                    No followers
                                </Typography>
                            )}
                        </Box>
                    )}
                    </Box>
                </Grid>

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 1, md: 3 } }}>
                    <Box sx={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: 3, width: { xs: '100%', md: '50%' } }}>
                        <Box sx={{ backgroundColor: '#EFE8FF', borderRadius: '12px', padding: '40px' }}>
                            <Typography sx={{ ...textStylesH2, marginBottom: '24px' }}> Description </Typography>
                            <Typography sx={{ ...textStylesBody1, textAlign: 'left' }} >{foundProject?.description} </Typography>
                        </Box>
                        <Box sx={{ backgroundColor: '#EFE8FF', borderRadius: '12px', padding: '40px' }}>
                            <Typography sx={{ ...textStylesH2, marginBottom: '24px' }}>Skills</Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }} >
                                {foundProject?.skills?.map((skills) => (
                                 <Box key={skills.id } display="flex" alignItems="center" sx={{ border: '1px solid #000', backgroundColor: '#fff', borderRadius: '8px', textAlign: 'center', padding: '12px 16px', margin: '0 4px 4px 0', }}>
                                    {skills.icon && ( <img src={`${IMAGES_URL}${skills?.icon?.url}`} alt={skills?.skillName} style={{ marginRight: '8px', width: '24px', height: '24px' }} />)}
                                    <Typography>{skills.skillName}</Typography>
                                 </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ backgroundColor: '#EFE8FF', borderRadius: '12px', width: { xs: '100%', md: '50%' }, height: 'auto', padding: '40px' }}>

                        <Typography sx={{ ...textStylesH2, marginBottom: '24px' }}>Members</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton aria-label="Add" onClick={() => navigate('/pageMembers')} sx={{ padding: '8px', width: '40px', height: '40px', backgroundColor: '#fff', color: '#000', borderRadius: '100%', marginRight: '16px' }}>
                                <AddIcon />
                            </IconButton>
                            <Typography sx={{ ...textStylesBody2, color: "#667085", marginTop: '10px' }}>Add members to the project</Typography>
                        </Box>
                        <Box sx={{ marginTop: '16px' }}>
                            {members.length > 0 ? (
                                members?.slice(0, 3).map((member) => (
                                    <Grid key={member.id} sx={{ margin: '8px 8px' }}>
                                        <CardDataTopUsers prop={member} />
                                    </Grid>
                                ))
                            ) : (
                                <Typography sx={{ ...textStylesBody2, marginTop: '50px' }}>No members found</Typography>
                            )}
                        </Box>
                    </Box>

                </Box>
            </Grid>
        </Grid >
    );
};

export default PageMyProject;
