import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { buttonStylesSideBar, textStylesBodyL2, buttonStyles,} from './Styles/styles';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, Button, useMediaQuery, Drawer, IconButton,} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CreateProjectModal from './CreateProjectModal/CreateProjectModal';
import HomeIcon from '../assets/icons/Home.svg';
import InProcessIcon from '../assets/icons/InProcess.svg';
import CompletedIcon from '../assets/icons/Completed.svg';
import ActiveIcon from '../assets/icons/Active.svg';
import logo from '../assets/images/Logo.svg';



const SideBar = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 900px)');
  const location = useLocation();

  const handleOpenFromSidebar = () => {
    setDrawerOpen(false);
    setTimeout(() => setOpenModal(true), 300);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const menuItems = [
    { icon: HomeIcon, label: 'Home', path: '/home/WithRegistration' },
    { type: 'divider', label: 'Projects' },
    { icon: ActiveIcon, label: 'Active', path: '/pageActiveAllProjects', disabled: !user },
    { icon: InProcessIcon, label: 'In Process', path: '/pageInProccesAllProjects', disabled: !user },
    { icon: CompletedIcon, label: 'Completed', path: '/pageCompletedAllProjects', disabled: !user },
  ];

  const sidebarContent = (
    <Box
      sx={{width: 260, height: '100%', padding: '16px', backgroundColor: '#F9F6FF', display: 'flex', flexDirection: 'column', }} role="presentation" onClick={() => isMobile && setDrawerOpen(false)}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Box component="img" src={logo} alt="logo" sx={{ width: '190px', height: '36px' }} />
      </Box>

      {user && (
        <Button variant="contained" onClick={handleOpenFromSidebar} endIcon={<AddIcon />} sx={{ ...buttonStyles, borderRadius: '8px', padding: '8px',  width: '100%', height: '52px', marginBottom: '24px', background: '#814AEB', color: '#FFF', }} >
          Create a project
        </Button>
      )}

      <List component="nav">
        {menuItems.map((item, index) => {
          if (item.type === 'divider') {
            return (
              <Typography key={index} sx={{ ...textStylesBodyL2, textAlign: 'left', color: '#5D5D5D', mx: 1, mb: 3, mt: 3, }}>
                {item.label}
              </Typography>
            );
          }

          const isActive = location.pathname === item.path;

          return (
            <ListItem key={item.path} component={item.disabled ? 'div' : NavLink} to={item.disabled ? undefined : item.path} sx={{ ...buttonStylesSideBar,  display: 'flex', alignItems: 'center', backgroundColor: isActive ? '#E2D5FF' : 'transparent', borderRadius: '8px', padding: '12px', }} >
              <ListItemIcon>
                <Box component="img" src={item.icon} alt={item.label} sx={{ width: '24px', height: '24px' }} />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <IconButton onClick={() => setDrawerOpen(true)} sx={{ position: 'absolute', left: 16, top: 30, zIndex: 1200 }}>
          <MenuIcon fontSize="Small" />
        </IconButton>
      )}

      {!isMobile && (
        <Box sx={{ width: '260px',height: '1040px', backgroundColor: '#F9F6FF', display: 'flex', flexDirection: 'column',}}>
          {sidebarContent}
        </Box>
      )}

      {isMobile && (
        <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)} sx={{ zIndex: 1200 }}>
          {sidebarContent}
        </Drawer>
      )}

      <CreateProjectModal onClick={() => navigate('/PageMyProject')} showModal={openModal} closeModal={handleCloseModal}/>
    </>
  );
};

export default SideBar;
