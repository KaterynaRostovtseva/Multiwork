import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Box, Tabs, Tab} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { setActiveTab } from '../store/Slice/userProfileSlice'; 




const ProfileTabs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeTab = useSelector(state => state.user?.activeTab);

  const tabStyles = {
    padding: '12px 20px',
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: '400',
    fontSize: '24px',
    cursor: 'pointer',
    lineHeight: 1.5,
    marginBottom: '55px',
    '@media (max-width: 600px)': { 
        fontSize: '20px', 
        padding: '8px 16px', 
        marginBottom: '30px', 
      }
  };

  const tabSelectedStyles = {
    ...tabStyles,
    borderBottom: '2px solid black',
    color: 'black',
  };

  const tabRootStyles = {
    ...tabStyles,
    color: '#667085',
    textTransform: 'none',
    '&.Mui-selected': tabSelectedStyles,
  };

  const safeActiveTab = activeTab ?? 'about';

  const handleChange = (event, newValue) => {
    dispatch(setActiveTab(newValue));
    if (newValue === 'about') {
      navigate('/profileAbout');
    } else {
      navigate('/profileProjects');
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={safeActiveTab} onChange={handleChange} TabIndicatorProps={{ style: { display: 'none' } }}>
        <Tab label="About" value="about" sx={tabRootStyles} />
        <Tab label="Project" value="project" sx={tabRootStyles} />
      </Tabs>
    </Box>
  );
};

export default ProfileTabs;
