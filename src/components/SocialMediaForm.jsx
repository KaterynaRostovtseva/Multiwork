import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSocialLink } from '../reduxToolkit/socialLinksRedux';
import { Box, Typography, Grid, TextField } from '@mui/material';
import { styled } from '@mui/system';
import behanceIcon from '../assets/icons/Behance.svg';
import dribbleIcon from '../assets/icons/Dribbble.svg';
import instagramIcon from '../assets/icons/Instagram-black.svg';
import linkedInIcon from '../assets/icons/LinkedIn.svg';

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '4px',
  },
  '& .MuiOutlinedInput-input': {
    padding: '12px',
  },
});

const socialLinks = [
  {
    platform: 'behance',
    icon: behanceIcon,
    label: 'Behance',
    placeholder: 'behance.net/yourusername',
  },
  {
    platform: 'linkedIn',
    icon: linkedInIcon,
    label: 'LinkedIn',
    placeholder: 'linkedin.com/in/yourusername',
  },
  {
    platform: 'dribbble',
    icon: dribbleIcon,
    label: 'Dribbble',
    placeholder: 'dribbble.com/yourusername',
  },
  {
    platform: 'instagram',
    icon: instagramIcon,
    label: 'Instagram',
    placeholder: 'instagram.com/yourusername',
  },
];

const SocialMediaForm = () => {
  const dispatch = useDispatch();
  const socialLinksState = useSelector((state) => state.socialLinks);

  const handleChange = (platform, value) => {
    dispatch(updateSocialLink({ platform, value }));
  };
  return (
    <Box sx={{ maxWidth: '100%' }}>
      <Grid
        container
        spacing={0}
        columnSpacing={3}
        alignItems="flex-start"
        rowGap="32px"
        sx={{ mt: 0, p: 0, mb: 0, pb: 0 }}
      >
        {socialLinks.map((link, index) => (
          <Grid item xs={12} sm={6} key={index} sx={{ pb: 0 }}>
            <Box display="flex" alignItems="flex-start" gap={1} mb={1}>
              <img src={link.icon} alt={link.label} width={24} height={24} />
              <Typography fontWeight="bold">{link.label}</Typography>
            </Box>
            <StyledTextField
              fullWidth
              placeholder={link.placeholder}
              variant="outlined"
              value={socialLinksState[link.platform] || ''}
              onChange={(e) => handleChange(link.platform, e.target.value)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SocialMediaForm;
