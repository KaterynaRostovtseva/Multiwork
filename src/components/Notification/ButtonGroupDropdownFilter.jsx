import React, { useState } from 'react';
import { ButtonGroup, Button } from '@mui/material';

const ButtonGroupDropdownFilter = ({ activeFilter, onFilterChange }) => {


  const handleClick = (label ) => {
    onFilterChange(label);
  };

  const labels = ['All', 'Followers', 'Invites', 'Join requests', 'Other']; 

  return (
    <ButtonGroup sx={{'& .MuiButton-root': { borderColor: '#D0D5DD', textTransform: 'capitalize',}}}>
     {labels.map((label) => (
        <Button key={label} onClick={() => handleClick( label)} sx={{ color: activeFilter ===label ? '#814AEB !important' : 'inherit', fontWeight: activeFilter === label ? 'bold' : 'semiBold',}}>
          {label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default ButtonGroupDropdownFilter;
