import React from 'react';
import { Box, Typography, Card, CardContent, Divider, Switch } from '@mui/material';
import { useState } from 'react';

// CustomSwitch component
const CustomSwitch = () => {
  const [checked, setChecked] = useState(false);

  const toggleSwitch = () => {
    setChecked((prev) => !prev);
  };

  return (
    <div
      onClick={toggleSwitch}
      style={{
       // display: 'inline-block',
        cursor: 'pointer',
        width: '48px', 
        height: '20px', 
        borderRadius: '12px', 
        backgroundColor: checked ? 'white' : 'white', 
        border: checked ? '1px solid #CCB4FE' : '1px solid #D0D5DD', 
        position: 'relative',
        transition: 'background-color 0.5s',
      }}
    >
      <div
        style={{
          backgroundColor: checked ? '#CCB4FE' : '#D0D5DD', 
          width: '16px', 
          height: '16px',
          borderRadius: '50%', 
          position: 'absolute', 
          top: '2px',
          left: checked ? '28px' : '1px', 
          transition: 'transform 0.3s', // Transition for thumb movement
        }}
      />
    </div>
  );
};

export default CustomSwitch;