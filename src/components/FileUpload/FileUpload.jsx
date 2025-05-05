import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography } from '@mui/material';
import DownloadCloud from '../../assets/icons/DownloadCloud.svg';

export const FileUpload = () => {
    const onDrop = useCallback((acceptedFiles) => {
        console.log(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <Box {...getRootProps()} sx={{ display: 'flex', flexDirection: 'row',
                alignItems: 'center', justifyContent: 'center', margin:'8px 0 0 40px', padding: 3, width: 180,  height: 180, borderRadius: '50%', backgroundColor: isDragActive ? '#f0f0f0' : '#9F9F9F', cursor: 'pointer', textAlign: 'center'}}>
            <input {...getInputProps()} />
            <Box component="img" src={DownloadCloud} alt="Upload Icon" style={{ width: 20, marginRight:'8px' }} />
            {isDragActive ? (
                <Typography variant="body2" sx={{ color: '#666' }}>
                    Drop the files here ...
                </Typography>
            ) : (
                <Typography variant="body2" sx={{ color: '#fff', }}>
                    Upload
                </Typography>
            )}
        </Box>
    );
};