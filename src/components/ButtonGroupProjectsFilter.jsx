// import React from 'react';
// import { ButtonGroup, Button } from '@mui/material';


// const ButtonGroupFilter = ({ activeFilter, onFilterChange }) => {
//   // console.log(activeFilter)
//   const handleClick = (label) => {
//     onFilterChange(label);
//   };

//   const labels = ['All projects', 'Own', 'Collaborate', 'Completed', 'Follow', 'Hidden'];

//   return (
//     <ButtonGroup sx={{ flexWrap: 'wrap', '& .MuiButton-root': { borderColor: '#D0D5DD', textTransform: 'capitalize', fontSize: { xs: '9px', sm: '12px', md: '14px', }, padding: { xs: '4px 8px', md: '6px 12px', }, }, }}>
//       {labels.map((label) => (
//         <Button key={label} onClick={() => handleClick(label)} sx={{ color: activeFilter === label ? '#814AEB !important' : 'inherit', fontWeight: activeFilter === label ? 'bold' : 'normal', }}>
//           {label}
//         </Button>
//       ))}
//     </ButtonGroup>
//   );
// };

// export default ButtonGroupFilter;

import React, { useState } from 'react';
import { ButtonGroup, Button, IconButton, Menu, MenuItem, useMediaQuery } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTheme } from '@mui/material/styles';

const ButtonGroupFilter = ({ activeFilter, onFilterChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const labels = ['All projects', 'Own', 'Collaborate', 'Completed', 'Follow', 'Hidden'];

  const handleClick = (label) => {
    onFilterChange(label);
    setAnchorEl(null);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isMobile ? (
        <>
          <IconButton onClick={handleMenuOpen} sx={{ border: '1px solid #D0D5DD' }}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                borderRadius: 2,
                minWidth: 160,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                padding: '4px 0',
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {labels.map((label) => (
              <MenuItem
                key={label}
                onClick={() => handleClick(label)}
                selected={activeFilter === label}
                sx={{
                  fontSize: '14px',
                  color: activeFilter === label ? '#814AEB' : 'inherit',
                  fontWeight: activeFilter === label ? 'bold' : 'normal',
                  '&:hover': {
                    backgroundColor: '#f3eaff',
                  },
                }}
              >
                {label}
              </MenuItem>
            ))}
          </Menu>
        </>
      ) : (
        <ButtonGroup
          sx={{
            flexWrap: 'wrap',
            '& .MuiButton-root': {
              borderColor: '#D0D5DD',
              textTransform: 'capitalize',
              fontSize: { xs: '9px', sm: '12px', md: '14px' },
              padding: { xs: '4px 8px', md: '6px 16px' },
            },
          }}
        >
          {labels.map((label) => (
            <Button
              key={label}
              onClick={() => handleClick(label)}
              sx={{
                color: activeFilter === label ? '#814AEB !important' : 'inherit',
                fontWeight: activeFilter === label ? 'bold' : 'normal',
              }}
            >
              {label}
            </Button>
          ))}
        </ButtonGroup>
      )}
    </>
  );
};

export default ButtonGroupFilter;
