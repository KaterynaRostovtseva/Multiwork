import React, { useState } from 'react';
import { Button, Menu, MenuItem, Box, Typography, } from '@mui/material';
import { textStylesBody2 } from '../../components/Styles/styles';
import { ReactComponent as Arrow} from "../../assets/icons/State4.svg";

const CustomSelect = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (language) => {
    if (language) {
      setSelectedLanguage(language);
    }
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        variant="outlined"
        onClick={handleClick}
        sx={{
          width: '172px',
          height: '42px',
          borderRadius: '8px',
          borderColor: '#D0D5DD',
          '&:hover': {
            borderColor: '#E2D5FF', 
          },
          '&.Mui-focused': {
            borderColor: '#E2D5FF',
          },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center', 
          padding: '0 10px',
        }}
      >
        <Typography sx={{ ...textStylesBody2, textTransform:'none', olor: '#171717' }}>{selectedLanguage}</Typography>
        <Arrow />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleClose(null)}
        PaperProps={{
            sx: {
              width: '325px',
              height: '114px', 
              marginTop: '4px',
              overflowY: 'scroll', // Allow vertical scrolling
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#E4E7EC', 
                borderRadius: '8px',
                width:'8px',
                height: '27px',
                margin: '0px auto' 
              },
              '&::-webkit-scrollbar-track': {
                background: 'white', 
                sborderRadius: '8px',
              },
              '& .MuiMenuItem-root': {
                height: '44px',
                width: '100%',
                '&:hover': {
                  backgroundColor: '#E2D5FF', 
                },
              },
            },
          }}
      >
        <MenuItem onClick={() => handleClose('English')} sx={{...textStylesBody2, color: '#171717', paadding:'8px 14px', width:'309px' }}>English</MenuItem>
        <MenuItem onClick={() => handleClose('French')} sx={{...textStylesBody2, color: '#171717',  paadding:'8px 14px', width:'309px' }}>English</MenuItem>
        <MenuItem onClick={() => handleClose('French')} sx={{...textStylesBody2, color: '#171717',  paadding:'8px 14px', width:'309px' }}>English</MenuItem>
        <MenuItem onClick={() => handleClose('French')} sx={{...textStylesBody2, color: '#171717',  paadding:'8px 14px',width:'309px' }}>English</MenuItem>
        <MenuItem onClick={() => handleClose('French')} sx={{...textStylesBody2, color: '#171717',  paadding:'8px 14px', width:'309px' }}>English</MenuItem>
        <MenuItem onClick={() => handleClose('French')} sx={{...textStylesBody2, color: '#171717',  paadding:'8px 14px', width:'309px' }}>English</MenuItem>
        <MenuItem onClick={() => handleClose('French')} sx={{...textStylesBody2, color: '#171717',  paadding:'8px 14px', width:'309px' }}>English</MenuItem>
      </Menu>
    </Box>
  );
};

export default CustomSelect;