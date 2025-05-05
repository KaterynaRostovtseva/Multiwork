import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import {textStylesH2 } from '../components/Styles/styles';
import Grid from '@mui/material/Grid2';
import CardDataMembers from '../components/CardDataMembers';

function Carousel({ data }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleCards, setVisibleCards] = useState(3);

    const updateVisibleCards = () => {
        if (window.innerWidth < 600) {
            setVisibleCards(1); 
        } else if (window.innerWidth < 960) {
            setVisibleCards(2);
        } else {
            setVisibleCards(3); 
        }
    };

    useEffect(() => {
        updateVisibleCards();
        window.addEventListener('resize', updateVisibleCards);

        return () => {
            window.removeEventListener('resize', updateVisibleCards);
        };
    }, []);

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };
   

    return (
        <Box sx={{ position: 'relative', maxWidth: '1200px', margin: '0 auto' }}>

            <Typography sx={{ ...textStylesH2, margin: '24px 0' }}>Projects for you</Typography>

            <Box
                sx={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', flexDirection: 'row', gap: '10px', }}>
                {data.length > 0 && data.map((_, index) => (
                    <IconButton key={index} onClick={() => handleDotClick(index)} sx={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: currentIndex === index ? '#CCB4FE' : '#E8E8E8', transition: 'background-color 0.3s ease' }} />
                ))}
            </Box>

            <Grid container spacing={2} sx={{ overflow: 'hidden', display: 'flex', flexWrap: 'nowrap' }}>
                {data.slice(currentIndex, currentIndex + visibleCards).map((item, index) => (
                    < CardDataMembers key={index} prop={item} />
                ))}
            </Grid>
        </Box>
    );
}


export default Carousel;