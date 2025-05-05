import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const LetterAvatar = ({ firstName, lastName }) => {
    const boxRef = useRef(null);
    const [boxHeight, setBoxHeight] = useState(0);

    useEffect(() => {
        if (boxRef.current) {
            setBoxHeight(boxRef.current.offsetHeight);
        }
    }, []);

    return (
        <Box
            ref={boxRef}
            sx={{
                height: '100%',
                width: '100%',
                borderRadius: '100%',
                backgroundColor: '#AAA',
                color: '#FDFDFD',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Typography sx={{ fontSize: boxHeight/2 }}>
                {firstName?.charAt(0)}{lastName?.charAt(0)}
            </Typography>
        </Box>
    );
};

export default LetterAvatar;
