import React, { useState, useMemo } from 'react';
import { Link as RouterLink, useLocation, matchPath } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import logo from '../../assets/images/Logo.svg';
import { Button, Box, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery,} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { buttonStyles } from '../Styles/styles';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import SearchBar from '../SearchBar';
import { useSelector } from 'react-redux';
import UserDropdown from '../UserDropdown/UserDropdown';
import NotificationDropdown from '../Notification/NotificationDropdown';

const navItems = [
  { name: 'Features', to: 'features' },
  { name: 'Audience', to: 'audience' },
  { name: 'Compare', to: 'compare' },
];

const hideNavigationPages = ['/pageDeclined', '/pageSuccessfulJoining', '/signup', '/login', '/checkYourEmail', '/forgotPassword', '/resetYourPassword', '/newPassword', '/404', '/confirmPassword', '/confirmation'];

const noLogoPages = ['/home/WithoutRegistration'];

const doesPathMatch = (path, patterns) => {
  return patterns.some((pattern) =>
    matchPath({ path: pattern, end: false }, path)
  );
};

const specialSignUpPages = ['/home/WithoutRegistration'];



function Header() {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMobile = isSmallScreen || isTablet;

  const authState = useSelector((state) => state.auth);
  const loggedInUser = authState?.user || null;
  const notificationsState = useSelector((state) => state.notifications);
  const isAuthenticated = authState?.isAuthenticated || false;
  const notifications = notificationsState?.data || [];

  const currentPath = location.pathname;

  const isSimpleHeader = useMemo(
    () => doesPathMatch(currentPath, hideNavigationPages),
    [currentPath]
  );
  const isNoLogoPage = useMemo(
    () => doesPathMatch(currentPath, noLogoPages),
    [currentPath]
  );

  const isSpecialSignUpPage = useMemo(
    () => doesPathMatch(currentPath, specialSignUpPages),
    [currentPath]
  );

  const formatText = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const loginButtonStyles = {
    ...buttonStyles,
    marginLeft: { xs: '0', sm: '8px', md: '40px' },
    marginTop: { xs: '8px', sm: '0' },
    width: { xs: '100%', sm: 'auto' },
    padding: { xs: '6px 12px', sm: '8px 16px' },
    fontSize: { xs: '14px', sm: '16px' },
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  };

  const signUpButtonStyles = {
    ...buttonStyles,
    marginLeft: { xs: '0', sm: '8px' },
    marginTop: { xs: '8px', sm: '0' },
    border: isSpecialSignUpPage ? '1px solid #814AEB' : '1px solid #0A0A0A',
    backgroundColor: isSpecialSignUpPage ? '#814AEB' : 'transparent',
    color: isSpecialSignUpPage ? '#fff' : 'inherit',
    borderRadius: '8px',
    padding: { xs: '6px 12px', sm: '8px 16px' },
    width: { xs: '100%', sm: '122px' },
    height: { xs: '40px', sm: '48px', md: '60px' },
    fontSize: { xs: '14px', sm: '16px' },
    '&:hover': {
      backgroundColor: isSpecialSignUpPage ? '#6b3cc9' : '#f5f5f5',
    },
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const renderDrawerList = () => (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        {!isSimpleHeader && currentPath === '/' && 
          navItems.map((item) => (
            <ScrollLink key={item.name} to={item.to} smooth={true} duration={500} offset={-100} spy={true} activeClass="active" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem button>
                <ListItemText primary={formatText(item.name)} />
              </ListItem>
            </ScrollLink>
          ))
        }
  
        {!isSimpleHeader && !isNoLogoPage && !loggedInUser && (
          <>
            <RouterLink to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem button>
                <ListItemText primary="Log in" />
              </ListItem>
            </RouterLink>
            <RouterLink to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem button>
                <ListItemText primary="Sign Up" />
              </ListItem>
            </RouterLink>
          </>
        )}
      </List>
    </Box>
  );
  

  const handleSearch = (event) => {
    const query = event.target.value;
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ padding: { xs:'24px 16px', sm: '24px 40px', md: '24px 80px' }, maxWidth: '100%', height: '108px', boxShadow: isSimpleHeader ? 'none' : '1px 0 24px 0 rgba(105, 65, 198, 0.05)', }}>
       
        {loggedInUser && !isSimpleHeader && (
          <Grid size={12} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: isMobile ? '50px' : isTablet ? '100px' : '255px', marginTop: isMobile ? '0' : '-20px', }}>
            <Box sx={{ flexGrow: 1, maxWidth: '600px' }}>
              <SearchBar onChange={handleSearch} isHeader={true} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '16px', }}>
              <NotificationDropdown />
              <UserDropdown name={loggedInUser?.firstName || 'User'} lastName={loggedInUser?.lastName || ''} email={loggedInUser?.email || ''}/>
            </Box>
          </Grid>
        )}
       
        {isSimpleHeader && !isNoLogoPage && (
          <Grid xs={isMobile ? 6 : 5} sx={{ display: 'flex', alignItems: 'center',justifyContent: 'flex-start',}}>
            <Box component="img" src={logo} alt="logo" sx={{ width: isMobile ? '150px' : '190px', height: '36px' }} />
          </Grid>
        )}

   
        {!isSimpleHeader && !isNoLogoPage && !loggedInUser && (
          <>
           
            <Grid xs={isMobile ? 6 : 5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
              <Box component="img" src={logo} alt="logo" sx={{ width: isMobile ? '150px' : '190px', height: '36px' }} />
            </Grid>

       
            {!isMobile && !loggedInUser && (
              <Grid size={7} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', }}>
                {navItems.map((item) =>
                  currentPath === '/' ? (
                    <ScrollLink key={item.name} to={item.to} smooth={true}  duration={500} offset={-100} spy={true} activeClass="active" style={{ textDecoration: 'none' }} >
                      <Button sx={{ ...buttonStyles, marginRight: '24px' }}>{formatText(item.name)}</Button>
                    </ScrollLink>
                  ) : (
                    <RouterLink key={item.name} to={`/#${item.to}`} style={{ textDecoration: 'none' }}>
                      <Button sx={{ ...buttonStyles, marginRight: '24px' }}>{formatText(item.name)} </Button>
                    </RouterLink>
                  )
                )}
                <Button sx={loginButtonStyles} component={RouterLink} to="/login">
                  {formatText('Log in')}
                </Button>
                <Button sx={signUpButtonStyles} component={RouterLink} to="/signup">
                  {formatText('Sign Up')}
                </Button>
              </Grid>
            )}
          </>
        )}

       
        {!isMobile && isNoLogoPage && !loggedInUser && (
          <Grid size={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginLeft: '230px', }}>
            <Box sx={{ width: '100%', maxWidth: '600px' }}>
              <SearchBar onChange={handleSearch} isHeader={true} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button sx={loginButtonStyles} component={RouterLink} to="/login">
                {formatText('Log in')}
              </Button>
              <Button sx={signUpButtonStyles} component={RouterLink} to="/signup">
                {formatText('Sign Up')}
              </Button>
            </Box>
          </Grid>
        )}

      
        {isMobile && !isSimpleHeader && !isNoLogoPage && !loggedInUser && (
          <Grid size={5} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', }}>
            <IconButton edge="end" color="inherit" aria-label="menu"  onClick={toggleDrawer(true)} >
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              {renderDrawerList()}
            </Drawer>
          </Grid>
        )}

       
        <Grid size={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', }}>
          {isMobile && isNoLogoPage && !loggedInUser && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <SearchBar onChange={handleSearch} isHeader={true} />
              <Button sx={loginButtonStyles} component={RouterLink} to="/login">{' '}{formatText('Log in')}{' '} </Button>
              <Button sx={signUpButtonStyles} component={RouterLink} to="/signup"> {' '} {formatText('Sign Up')}</Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Header;
