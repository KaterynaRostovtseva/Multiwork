import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { Button, Box, Typography, TextField, useMediaQuery, useTheme } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import logo from '../../assets/images/Logo.svg';
import { buttonStyles, textStylesBody1, textStylesBody2 } from '../Styles/styles';

const navItems = ['Features', 'Audience', 'Compare'];
const navItemsFooter = ['Terms', 'Privacy'];

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

function Footer() {
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const formatText = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    };

    return (
        <Box component="footer" sx={{ marginTop: '50px', padding: { xs: '24px 20px', md: '24px 110px' } }}>
            <Grid container spacing={4} justifyContent="space-between" alignItems="center">
                <Grid size={isMobile ? 12 : 5} sx={{ display: 'flex', flexDirection: 'column', }}>
                    <Box component="img" src={logo} alt="logo" sx={{ width: { xs: '150px', md: '190px' }, height: '36px', marginBottom: { xs: '20px', md: ' 40px' } }} />
                    <Grid sx={{ display: { xs: 'flex', md: 'block' } }}>
                        {navItems.map((item) => (
                            location.pathname === '/' ? (
                                <ScrollLink
                                    key={item}
                                    to={item.toLowerCase()}
                                    smooth={true}
                                    duration={500}
                                    offset={-100} 
                                    spy={true}
                                    activeClass="active"
                                    style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}
                                >
                                    <Button sx={{ ...buttonStyles, fontSize: { xs: '14px', sm: '14px', md: '16px' }, marginRight: { xs: '8px', md: ' 24px' }, textTransform: 'none' }}>
                                        {formatText(item)}
                                    </Button>
                                </ScrollLink>
                            ) : (
                                <RouterLink key={item} to={`/#${item.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                                    <Button sx={{ ...buttonStyles, fontSize: { xs: '14px', sm: '14px', md: '16px' }, marginRight: { xs: '8px', sm: '8px', md: ' 24px' }, textTransform: 'none' }}>
                                        {formatText(item)}
                                    </Button>
                                </RouterLink>
                            )
                        ))}
                    </Grid>
                </Grid>

                <Grid size={12} sx={{ display: 'flex', justifyContent: 'space-between', marginTop: { xs: '4px', sm: '12px', md: '40px' }, borderTop: '1px solid #e0e0e0', paddingTop: '20px', }}>
                    <Grid size={12} sm={6}>
                        <Typography sx={{ ...textStylesBody2, fontSize: { xs: '14px', sm: '14px', md: '16px' }, margin: { xs: '8px 0', sm: '8px 0', md: '20px 0' }, color: '#747474' }}>
                            © 2024 MultiWork. All rights reserved.
                        </Typography>
                    </Grid>

                    <Grid size={6} sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'flex-end', alignItems: 'center', }}>
                        {navItemsFooter.map((item) => (
                            <Button key={item} component={RouterLink}
                                sx={{ ...buttonStyles, margin: '0 12px', color: '#747474', textTransform: 'none' }} >
                                {formatText(item)}
                            </Button>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Footer;