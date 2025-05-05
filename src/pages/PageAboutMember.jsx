import React, { useState, useEffect } from 'react';
import { Box, Typography, Modal, Avatar, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
import SideBar from '../components/SideBar';
import { buttonStylesModalCancel, textStylesBody2, textStylesBodyL, textStylesBody1, textStylesH2, buttonStylesModal, buttonStyles } from '../components/Styles/styles';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Behance from '../assets/icons/Behance.svg';
import Instagram from '../assets/icons/Instagram.svg';
import LinkedIn from '../assets/icons/LinkedIn.svg';
import Dribbble from '../assets/icons/Dribbble.svg';
import CardDataMembers from '../components/CardDataMembers';
import { useDispatch, useSelector } from 'react-redux';
import MockDataUsers from '../components/Mock/MockDataUsers';
import MockFollow from '../components/Mock/MockFollow';
import ProjectListDropdown from '../components/Notification/ProjectListDropdown';
import ProfileTabs from "../components/ProfileTabs";
import InviteModal from '../components/Notification/InviteModal';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { fetchUserById } from '../store/Slice/authSlice';
import { mockFetchFollowersCount, fetchFollowersCount } from '../components/Mock/mockFetchFollowersCount';

const PageAboutMember = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);
    console.log(user)
    const projects = useSelector((state) => state.projects?.projects?.data || []);
    const mockUser = MockDataUsers();
    const [openDialog, setOpenDialog] = useState(false);
    const [search, setSearch] = useState('');
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [activeTab, setActiveTab] = useState('about');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const selectedProject = filteredProjects.find((project) => project.isSelected);
    const selectedProjectId = selectedProject ? selectedProject.id : null;
    const [isInviteModalOpen, setInviteModalOpen] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const mockUserId = mockUser?.find((i) => i.id === Number(id));
    const [followersCount, setFollowersCount] = useState(0);
    const [followersLoading, setFollowersLoading] = useState(true);
    const [error, setError] = useState(null);

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


    if (!user) {
        return (
            <Box sx={{ position: 'absolute', top: '70%', left: '60%', transform: 'translate(-50%, -50%)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }



    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);
    const handleOpenInviteModal = () => {
        setInviteModalOpen(true);
    };

    const handleCloseInviteModal = () => {
        setInviteModalOpen(false);
    };


    const handleSearchChange = (event) => {
        const searchValue = event.target.value;
        setSearch(searchValue);

        if (searchValue) {
            const results = projects.filter((project) =>
                project.title.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredProjects(results);
            setIsDropdownOpen(true);
        } else {
            setFilteredProjects([]);
            setIsDropdownOpen(false);
        }
    };


    const handleSelect = (id) => {
        setFilteredProjects((prevProjects) =>
            prevProjects.map((project) =>
                project.id === id
                    ? { ...project, isSelected: !project.isSelected }
                    : project
            )
        );
    };



    return (
        <Grid container sx={{ display: 'flex',  flexDirection: { xs: 'column', md: 'row' }, marginTop: '-108px' }}>
            <SideBar />
         
            <Grid sx={{ flex: 1, margin: { xs: '138px 16px 0 16px', md: '138px 80px 80px 80px' } }}>

                <Box sx={{ backgroundColor: '#D1D1D1', width: '100%', position: 'relative', borderRadius: '8px' }}>
                    <Box component="img" src={mockUserId?.baner} alt="baner" sx={{ width: '100%', position: 'absolute', top: 0, left: 0, borderRadius: '8px' }} />
                </Box>

                <Box sx={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

                        <Avatar src={mockUserId?.avatar} alt="avatar" sx={{ width: 180, height: 180, border: '2px solid white', marginTop: '120px' }} />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography sx={{ ...textStylesBodyL, textAlign: 'left', marginLeft: '8px', marginTop: '200px' }}>{mockUserId?.title}</Typography>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "20px", }}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {followersCount > 0 ? (
                                        <Box sx={{ display: "flex", alignItems: "center", position: "relative" }}>
                                            {[...Array(Math.min(followersCount, 4))].map((_, idx) => (
                                                <Avatar
                                                    key={idx}
                                                    sx={{
                                                        width: 24,
                                                        height: 24,
                                                        position: "absolute",
                                                        left: `${idx * 17}px`,
                                                        zIndex: followersCount - idx,
                                                        border: "1px solid white",
                                                    }}
                                                />
                                            ))}

                                            <Typography
                                                component="span"
                                                sx={{ marginLeft: `${Math.min(followersCount, 4) * 17 + 10}px`, ...textStylesBody2 }}
                                            >
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
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '210px' }}>
                        <Button  endIcon={<AddIcon />} sx={{ ...buttonStyles, borderRadius: '8px', border: '1px solid #0A0A0A', padding: '8px 8px', width: '145px', height: '56px', marginBottom: '24px', '&:hover': { backgroundColor: '#f0f0f0', }, }}>
                            Follow
                        </Button>
                        <Button onClick={handleOpenDialog} variant="contained" sx={{ ...buttonStyles, marginLeft: '16px', borderRadius: '8px', padding: '8px 8px', width: '145px', height: '56px', marginBottom: '24px', background: '#814AEB', color: '#FFF' }}>
                            Invite
                        </Button>
                    </Box>

                </Box>

                <Modal open={openDialog} onClose={handleCloseDialog}>
                    <Box sx={{ maxHeight: '80vh', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, bgcolor: 'background.paper', boxShadow: 24, p: 5, borderRadius: '16px' }}>
                        <Box sx={{ display: 'flex', width: 650 }}>
                            <Box sx={{ flex: 1 }} >
                                <Avatar src={mockUserId?.avatar} alt="avatar" sx={{ width: 180, height: 180, margin: '0 auto', border: '2px solid white' }} />
                                <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 2 }}>
                                    {mockUserId?.title}
                                </Typography>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <ProjectListDropdown projects={filteredProjects} onSearch={handleSearchChange} onSelect={handleSelect} selectedId={selectedProjectId} />
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, marginTop: '32px' }}>
                            <Button onClick={handleCloseDialog} variant="text" sx={{ ...buttonStylesModalCancel, }}>
                                Cancel
                            </Button>
                            <Button variant="contained" sx={{ ...buttonStylesModal, }} disabled={!selectedProjectId} onClick={handleOpenInviteModal}>
                                Invite
                                <InviteModal open={isInviteModalOpen} onClose={handleCloseInviteModal} />
                            </Button>
                        </Box>
                    </Box>
                </Modal>



                <Box sx={{ display: 'flex', gap: '24px' }}>
                <ProfileTabs />
                </Box>
                    <Box sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}>
                        <Box sx={{ marginBottom: '20px', display: 'flex', flexDirection: 'row', gap: 3, }}>
                            <Box sx={{ backgroundColor: '#EFE8FF', borderRadius: '12px', padding: '40px', width: '100%' }}>
                                <Typography sx={{ ...textStylesH2, marginBottom: '24px', }}>UX/UI Designer</Typography>
                                <Typography component="span" sx={{ ...textStylesBody1, textAlign: 'left' }} >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.  </Typography>
                            </Box>
                            <Box sx={{ backgroundColor: '#EFE8FF', borderRadius: '12px', padding: '40px', width: '100%' }}>
                                <Typography sx={{ ...textStylesH2, marginBottom: '24px' }}>Social media</Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Box sx={{ display: 'flex', gap: '140px' }}>
                                        <Box sx={{ display: 'flex', marginBottom: '20px' }}>
                                            <Box component="img" src={Behance} alt="icon" style={{ width: 48, height: 48, marginRight: '4px' }} />
                                            <Typography component="span" sx={{ textAlign: 'center', padding: '12px 16px' }}>
                                                Behance
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', }}>
                                            <Box component="img" src={Instagram} alt="icon" style={{ width: 48, height: 48, marginRight: '4px' }} />
                                            <Typography component="span" sx={{ textAlign: 'center', padding: '12px 16px' }}>
                                                Instagram
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: '140px' }}>
                                        <Box sx={{ display: 'flex', }}>
                                            <Box component="img" src={LinkedIn} alt="icon" style={{ width: 48, height: 48, marginRight: '4px' }} />
                                            <Typography component="span" sx={{ textAlign: 'center', padding: '12px 16px' }}>
                                                LinkedIn
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', }}>
                                            <Box component="img" src={Dribbble} alt="icon" style={{ width: 48, height: 48, marginRight: '4px' }} />
                                            <Typography component="span" sx={{ textAlign: 'center', padding: '12px 16px' }}>
                                                Dribbble
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Grid sx={{ display: 'flex', flexDirection: 'row', bgcolor: '#EFE8FF', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexDirection: 'row', margin: '40px' }}>
                                <Typography variant="H2" sx={{ ...textStylesH2 }}>Projects</Typography>
                                <Button onClick={() => navigate(`/projects/${mockUserId.id}`)} sx={{ ...buttonStyles, textDecoration: 'underline', }}>
                                    View all projects
                                </Button>
                            </Box>

                            <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: 2, margin: '0 40px 40px 40px', }}>
                                {projects.slice(0, 3).map((project, index) =>
                                    <CardDataMembers key={index} prop={project} />
                                )}
                            </Box>
                        </Grid>

                        <Grid sx={{ display: 'flex', flexDirection: 'row', bgcolor: '#EFE8FF', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexDirection: 'row', margin: '40px' }}>
                                <Typography variant="H2" sx={{ ...textStylesH2 }}>Follow</Typography>
                                <Button sx={{ ...buttonStyles, textDecoration: 'underline', }}>
                                    View all Follow
                                </Button>
                            </Box>

                            <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: 2, margin: '0 40px 40px 40px', }}>
                                {mockUser.slice(0, 3).map((user, index) =>
                                    <MockFollow key={index} prop={user} />
                                )}
                            </Box>
                        </Grid>
                    </Box>
            </Grid>
        </Grid>

    )
}

export default PageAboutMember;