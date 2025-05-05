import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Avatar } from '@mui/material';
import Grid from '@mui/material/Grid2';
import SideBar from '../components/SideBar';
import BanerUploader from '../components/BanerUploader';
import ShareSharpIcon from '@mui/icons-material/ShareSharp';
import IconButton from '@mui/material/IconButton';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { buttonStyles, textStylesH2, textStylesBody1, textStylesBody2 } from '../components/Styles/styles';
import { Button } from '@mui/material';
import { IMAGES_URL } from "../config";
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchProjectById } from '../store/Slice/projectSlice';
import MockDataUsers from "../components/Mock/MockDataUsers";
import CardDataTopUsers from '../components/CardDataTopUsers';
import { mockFetchFollowersCount, fetchFollowersCount } from '../components/Mock/mockFetchFollowersCount';


const PageProjectId = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [baner, setBaner] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [members, setMembers] = useState([]);
    const navigate = useNavigate();
    const mockMembers = MockDataUsers() || [];
    const [followersCount, setFollowersCount] = useState(0);
    const [followersLoading, setFollowersLoading] = useState(true);
    const [error, setError] = useState(null);
    const { projects } = useSelector((state) => state.projects);

    const project = projects?.data?.find((i) => i.id === Number(id));
    const status = project?.project_status?.trim().replace(/;$/, '') || 'Active';

    // Загрузка подписчиков
    useEffect(() => {
        const fetchFollowers = async () => {
            setFollowersLoading(true);
            try {
                // const count = await fetchFollowersCount(); // Использование реального API-запроса
                const count = await mockFetchFollowersCount();
                setFollowersCount(count);
            } catch (error) {
                setFollowersCount(0);
                setError("Error loading subscribers");
            } finally {
                setFollowersLoading(false);
            }
        };

        fetchFollowers();
    }, []);

    useEffect(() => {
        const storedBanner = localStorage.getItem('baner');
        if (storedBanner) {
            setBaner(storedBanner);
        }
        setLoading(false);
    }, []);

    const handleBanerDrop = (imageData) => {
        setBaner(imageData);
        localStorage.setItem('baner', imageData);
    };

    useEffect(() => {
        if (id) {
            dispatch(fetchProjectById(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        // Имитируем задержку загрузки данных (например, как будто это запрос к API)
        setTimeout(() => {
            setMembers(mockMembers);
            setLoading(false);
        }, 1000); // Задержка 1 секунда
    }, []);

    if (!project && loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    };


    const handleAccept = () => {
        if (!project || !project.id) {
            console.error('Project or Project ID is undefined:', project);
            return;
        }

        setIsConfirmed(true);
        setMembers((prev) => [...prev, { id: project.id }]);
        navigate(`/pageSuccessfulJoining/${project.id}`);
       
    };

    const handleDecline = () => {
        if (!project || !project.id) {
            console.error('Project or Project ID is undefined:', project);
            return;
        }

        setIsConfirmed(true);
        navigate(`/pageDeclined/${project.id}`);
    };

    return (
        <Grid container sx={{ display: 'flex',  flexDirection: { xs: 'column', md: 'row' }, marginTop: '-108px' }}>
            <SideBar />

            <Grid sx={{ flex: 1, margin: { xs: '138px 16px 0 16px', md: '138px 80px 80px 80px' } }}>
                <Box sx={{ backgroundColor: '#D1D1D1', width: '100%', position: 'relative', borderRadius: '8px' }}>
                    <BanerUploader onDrop={handleBanerDrop} />
                    {baner && (
                        <Box component="img" src={baner} alt="baner" sx={{ width: '100%', height: '240px', position: 'absolute', top: 0, left: 0, borderRadius: '8px' }} />
                    )}
                </Box>

                <Grid sx={{ marginBottom: '40px', display: 'flex', flexWrap: 'nowrap' }}>
                    {project?.coverImg?.url && (
                        <Box component="img" src={`${IMAGES_URL}${project?.coverImg.url}`} alt="Cropped" sx={{ marginTop: '-20px', zIndex: 5, width: { xs: 80, sm: 100, md: 180 }, height: { xs: 80, sm: 100, md: 180 }, borderRadius: '50%', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', marginBottom: { xs: '16px', sm: '0' }, marginRight: { sm: '16px' } }} />
                    )}
                    <Box sx={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', width: '100%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-evenly', marginLeft: '40px' }}>
                                <Typography variant="h6" sx={{ ...textStylesH2 }}>{project?.title}</Typography>
                                <Typography sx={{ ...textStylesBody2, color: "#667085", textAlign: 'left', marginTop: '8px' }}>
                                    {project?.createdAt ? new Date(project.createdAt).toISOString().slice(0, 10).split('-').reverse().join('.') : 'Date not specified'}
                                </Typography>
                                <Box sx={{ ...textStylesBody2, marginTop: '12px', backgroundColor: '#DDF7EF', color: '#027A48', fontWeight: 'bold', borderRadius: '50px', padding: '4px 12px', display: 'inline-block', textTransform: 'capitalize' }}>
                                    {status}
                                </Box>
                            </Box>
                            <IconButton aria-label="share">
                                <ShareSharpIcon />
                            </IconButton>
                        </Box>


                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', height: '70px', alignItems: 'center' }}>
                                {!isConfirmed && (
                                    <>
                                        <Button variant="contained" onClick={handleAccept} sx={{ ...buttonStyles, marginRight: '16px', borderRadius: '8px', padding: '8px 8px', width: '101px', height: '44px', marginBottom: '24px', background: '#814AEB', color: '#FFF' }}>
                                            Accept
                                        </Button>
                                        <Button variant="text" onClick={handleDecline} sx={{ ...buttonStyles, borderRadius: '8px', padding: '8px 8px', width: '101px', height: '44px', marginBottom: '24px', border: '1px solid #000' }}>
                                            Decline
                                        </Button>
                                    </>
                                )}
                            </Box>

                            {followersCount > 0 ? (
                                <Box sx={{ display: "flex", alignItems: "center", position: "relative" }}>
                                    {[...Array(Math.min(followersCount, 4))].map((_, idx) => (
                                        <Avatar key={idx} sx={{width: 24, height: 24,position: "absolute", left: `${idx * 17}px`, zIndex: followersCount - idx, border: "1px solid white",}} />
                                    ))}

                                    <Typography component="span" sx={{ marginLeft: `${Math.min(followersCount, 4) * 17 + 10}px`, ...textStylesBody2 }}>
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
                </Grid>

                <Box sx={{ display: 'flex', gap: 3 }}>
                    <Box sx={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: 3, width: '50%' }}>
                        <Box sx={{ backgroundColor: '#EFE8FF', borderRadius: '12px', padding: '40px' }}>
                            <Typography sx={{ ...textStylesH2, marginBottom: '24px' }}>Description</Typography>
                            <Typography sx={{ ...textStylesBody1, textAlign: 'left' }} >{project?.description} </Typography>
                        </Box>
                        <Box sx={{ backgroundColor: '#EFE8FF', borderRadius: '12px', padding: '40px' }}>
                            <Typography sx={{ ...textStylesH2, marginBottom: '24px' }}>Skills</Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                {project?.skills?.map((skills) => (
                                    <Box key={skills.id} sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                        {skills.icon ? (
                                            <>
                                                {console.log(skills.icon)}
                                                <img
                                                    src={`${IMAGES_URL}${skills.icon.url}`}
                                                    alt={skills.skillName}
                                                    style={{ marginRight: '8px', width: '24px', height: '24px' }}
                                                />
                                            </>
                                        ) : null}
                                        <Typography sx={{ border: '1px solid #000', backgroundColor: '#fff', borderRadius: '8px', textAlign: 'center', padding: '12px 16px' }}>
                                            {skills.skillName}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ backgroundColor: '#EFE8FF', borderRadius: '12px', width: '50%', height: 'auto', padding: '40px' }}>
                        <Typography sx={{ ...textStylesH2, marginBottom: '24px' }}>Members</Typography>

                        <Box sx={{ marginTop: '32px', bgcolor: '#EFE8FF', overflowX: 'auto', display: 'flex', flexDirection: 'column', borderRadius: '14px' }}>
                            {members.length > 0 ? (
                                members.slice(0, 3).map((member) => (
                                    <Grid key={member.id} sx={{ margin: '8px 8px' }}>
                                        <CardDataTopUsers prop={member} />
                                    </Grid>
                                ))
                            ) : (
                                <Typography>No members found</Typography>
                            )}
                        </Box>
                    </Box>

                </Box>
            </Grid>
        </Grid >
    );
};

export default PageProjectId;

