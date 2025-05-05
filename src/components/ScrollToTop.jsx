import React, { useState, useEffect } from 'react';
import { Fab } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Zoom } from '@mui/material';

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);

  // Показ кнопки при прокрутке вниз
  const handleScroll = () => {
    if (window.scrollY > 450) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  // Прокрутка наверх
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Zoom in={showButton}>
      <Fab onClick={scrollToTop} sx={{ position: 'fixed', bottom: 200, right: 50,  backgroundColor:'#EFE8FF'}}>
        <ArrowUpwardIcon />
      </Fab>
    </Zoom>
  );
};

export default ScrollToTop;
