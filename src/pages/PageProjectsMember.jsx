import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
import SideBar from '../components/SideBar';
import BanerUploader from '../components/BanerUploader';
import ModeEditOutlineSharpIcon from '@mui/icons-material/ModeEditOutlineSharp';
import { useSelector,   useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  buttonStyles } from '../components/Styles/styles';
import { Button } from '@mui/material';
import ProfileTabs from "../components/ProfileTabs";
import ButtonGroupProjectsFilter from '../components/ButtonGroupProjectsFilter';
import SearchBar from '../components/SearchBar';
import CardData from "../components/CardData";
import { deleteProject, fetchProjects} from "../store/Slice/projectSlice";
import { setActiveTab } from '../store/Slice/userProfileSlice';


const PageProjectsMember = () => {
    const [activeFilter, setActiveFilter] = useState('All projects');
    const storageBanner = localStorage.getItem(`baner`);
    const [baner, setBaner] = useState(storageBanner);
    const [currentPage, setCurrentPage] = useState(1); 
    const itemsPerPage = 9; 
    const navigate = useNavigate();
    // const state = useSelector((state) => state);
    const dataAllProjects= useSelector((state) => {
        return Array.isArray(state.projects?.projects?.data) ? state.projects.projects.data : [];
    });
    // console.log('Состояние проектов:', state.projects);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    
    const filteredData = dataAllProjects?.filter((project) => {
        if (activeFilter === 'All projects') return true;
        if (activeFilter === 'Own') return project.isOwn; 
        if (activeFilter === 'Collaborate') return project.isCollaborate;
        if (activeFilter === 'Completed') return project.isCompleted;
        if (activeFilter === 'Follow') return project.isFollow;
        if (activeFilter === 'Hidden') return project.isHidden;
        return true;
    });

    const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
    const currentData = dataAllProjects?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

  useEffect(() => {
        dispatch(setActiveTab('project'));
        console.log('Установлен activeTab: project');
    }, [dispatch]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const getBanner = () => {
        const storedBanner = localStorage.getItem(`baner`);
        if (storedBanner) {
            setBaner(storedBanner)
        }
        setLoading(false); 
    };

    useEffect(() => {
        getBanner();  
    }, []);

    const handleBanerDrop = (imageData) => {
        setBaner(imageData);
        localStorage.setItem(`baner`, imageData);
    };
  

    const handleFilterChange = (newFilter) => {
        setActiveFilter(newFilter); 
        // console.log(`Текущий фильтр: ${newFilter}`);
        setCurrentPage(1);
      };

      const handleDelete = async (projectId) => {
        const token = state.auth.token;
        const state = state;
     
        if (!projectId) {
          console.error('Error: projectId not passed');
          return;
        }
        const res = await dispatch(deleteProject({ projectId, token, state }));
        await dispatch(fetchProjects())
        window.location.reload();
        console.log(`wwww`, res);
      };


      if (loading) {
        return (
            <Box sx={{ position: 'absolute', top: '70%', left: '60%', transform: 'translate(-50%, -50%)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Grid container sx={{ display: 'flex',  flexDirection: { xs: 'column', md: 'row' }, marginTop: '-108px' }}>
            <SideBar />

            <Grid sx={{ flex: 1,margin: { xs: '138px 16px 0 16px', md: '138px 80px 80px 80px' } }}>

                <Box sx={{ backgroundColor: '#D1D1D1', width: '100%', position: 'relative', borderRadius: '8px' }}>
                    <BanerUploader onDrop={handleBanerDrop}   />
                    {baner && (
                        <Box component="img" src={baner} alt="baner" sx={{ width: '100%', height: '240px', position: 'absolute', top: 0, left: 0, borderRadius: '8px' }} />
                    )}
                </Box>
               
                <Grid sx={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between', flexWrap: 'nowrap', }}>
                    <ProfileTabs/>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                        <Button variant="contained" startIcon={<ModeEditOutlineSharpIcon />} sx={{ ...buttonStyles, borderRadius: '8px', padding: '8px 8px', width: '183px', height: '56px', marginBottom: '24px', background: '#814AEB', color: '#FFF', }}>
                            Edit profile
                        </Button>
                    </Box>
                </Grid>

                <Grid sx={{display:'flex', justifyContent:'space-between'}}>
                    <SearchBar />
                    <ButtonGroupProjectsFilter  activeFilter={activeFilter} onFilterChange={handleFilterChange} />
                </Grid>
               
                    <Grid  sx={{ overflow: 'hidden', display:'flex', flexWrap: 'wrap', gap:3, margin:'40px 0'}}>
                        { currentData?.map((item, index) => (
                        
                            <CardData key={index} prop={item} onDelete={handleDelete}/>
                    
                        ))}
                    </Grid> 
               
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',   borderTop: '1px solid #e0e0e0',}}>
                        <Typography sx={{fontFamily: 'Open Sans, sans-serif ', marginTop: '20px',}}>
                            Page {currentPage} of {totalPages}
                        </Typography>

                        <Box sx={{display:'flex', }}>
                            <Button sx={{textTransform:'capitalize', marginTop: '20px', color: currentPage === 1 ? '#9e9e9e' : '#000', }}
                                variant="text"
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                Previous
                            </Button>
                            
                            <Button sx={{textTransform:'capitalize',marginTop: '20px',  color: currentPage === totalPages ? '#9e9e9e' : '#000', }}
                                variant="text"
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                Next
                            </Button>
                        </Box>
                    </Box>
            </Grid>
        </Grid>
    );
};

export default PageProjectsMember;
