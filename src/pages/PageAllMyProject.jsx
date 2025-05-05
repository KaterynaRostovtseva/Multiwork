import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
import SideBar from '../components/SideBar';
import BanerUploader from '../components/BanerUploader';
import ModeEditOutlineSharpIcon from '@mui/icons-material/ModeEditOutlineSharp';
import { useSelector, useDispatch } from 'react-redux';
import { buttonStyles } from '../components/Styles/styles';
import { Button } from '@mui/material';
import ButtonGroupProjectsFilter from '../components/ButtonGroupProjectsFilter';
import SearchBar from '../components/SearchBar';
import CardDataMyProject from "../components/CardDataMyProject";
import { deleteProject, fetchProjects } from "../store/Slice/projectSlice";
import { useNavigate } from 'react-router-dom';
import ProfileTabs from "../components/ProfileTabs";
import { setActiveTab } from '../store/Slice/userProfileSlice';

const PageAllMyProject = () => {
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState('All projects');
    const storageBanner = localStorage.getItem(`baner-${user?.id}`);
    const [baner, setBaner] = useState(storageBanner);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const dataAllProjects = useSelector((state) => {
        return Array.isArray(state.projects?.projects) ? state.projects.projects : [];
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setActiveTab('project'));
    }, [dispatch]);
    const filteredData = dataAllProjects?.filter((project) => {
        if (activeFilter === 'All projects') return true;
        if (activeFilter === 'Own') return project.isOwn === true; 
        if (activeFilter === 'Collaborate') return project.isCollaborate === true;  
        if (activeFilter === 'Completed') return project.isCompleted === true;
        if (activeFilter === 'Follow') return project.isFollow === true;  
        if (activeFilter === 'Hidden') return project.isHidden === true;  
        return true;
    });

    const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
    const currentData = filteredData?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        if (dataAllProjects.length > 0) {
            setLoading(false);
        }
    }, [dataAllProjects]);

    const handleBanerDrop = (imageData) => {
        setBaner(imageData);
        localStorage.setItem(`baner-${user?.id}`, imageData);

    };


    const handleFilterChange = (newFilter) => {
        setLoading(true);
        setActiveFilter(newFilter);
        setCurrentPage(1);

        setTimeout(() => {
            setLoading(false);
        }, 300);
    };

    const handleDelete = async (projectId) => {
        const token = localStorage.getItem('token');
        if (!projectId) {
            console.error('Error: projectId not passed');
            return;
        }

        try {
            setLoading(true);

            await dispatch(deleteProject({ projectId, token })); 
            await dispatch(fetchProjects())
            setLoading(false); 
            window.location.reload();
        } catch (error) {
            console.error('Ошибка при удалении проекта:', error);
            setLoading(false); 
        }
    };

    if (loading) {
        return (
            <Box sx={{ position: 'absolute', top: '70%', left: '60%', transform: 'translate(-50%, -50%)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', }}> <CircularProgress /> </Box>);
    }

    return (
        <Grid container sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, marginTop: '-108px' }}>
            <SideBar />
            <Grid sx={{ flex: 1, margin: { xs: '138px 16px 0 16px', sm: '138px 32px 0 32px', md: '138px 80px 80px 80px' } }}>
                <Box sx={{ backgroundColor: '#D1D1D1', width: '100%', position: 'relative', borderRadius: '8px' }}>
                    <BanerUploader onDrop={handleBanerDrop} />
                    {baner && (
                        <Box component="img" src={baner} alt="baner" sx={{ width: '100%', height: '240px', position: 'absolute', top: 0, left: 0, borderRadius: '8px' }} />
                    )}
                </Box>
                <Grid sx={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', flexWrap: { xs: 'wrap', sm: 'nowrap' }, }}>
                    <ProfileTabs />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                        <Button variant="contained" onClick={() => navigate('/profileEditAbout')} startIcon={<ModeEditOutlineSharpIcon />} sx={{ ...buttonStyles, textAlign: 'center', borderRadius: '8px', padding: '8px 8px', width: { xs: '100%', sm: '183px' }, height: '56px', marginBottom: '24px', background: '#814AEB', color: '#FFF', }}>
                            Edit profile
                        </Button>
                    </Box>
                </Grid>
                <Grid sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }} >
                    <SearchBar />
                    <ButtonGroupProjectsFilter activeFilter={activeFilter} onFilterChange={handleFilterChange} />
                </Grid>
                <Grid sx={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap', gap: 3, margin: '40px 0' }}>
                    {currentData?.map((item, index) => (
                        <CardDataMyProject key={index} prop={item} onDelete={handleDelete} />
                    ))}
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e0e0e0', }}>
                    <Typography sx={{ fontFamily: 'Open Sans, sans-serif ', marginTop: '20px', }}>
                        Page {currentPage} of {totalPages}
                    </Typography>
                    <Box sx={{ display: 'flex', }}>
                        <Button sx={{ textTransform: 'capitalize', marginTop: '20px', color: currentPage === 1 ? '#9e9e9e' : '#000', }} variant="text" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} >
                            Previous
                        </Button>
                        <Button sx={{ textTransform: 'capitalize', marginTop: '20px', color: currentPage === totalPages ? '#9e9e9e' : '#000', }} variant="text" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} >
                            Next
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default PageAllMyProject;
