import React from 'react';
import { useDropzone } from 'react-dropzone';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import { Box, Typography, Button, Modal, Slider } from '@mui/material';
import { useState } from 'react';
import { useRef } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import './ImageCropper.css';
import DownloadCloud from '../../assets/icons/DownloadCloud.svg';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { buttonStylesModalCancel, buttonStylesModal } from '../Styles/styles';

export default function ImageCropper({ onCropComplete }) {
    const [imgSrc, setImgSrc] = useState('');
    const [open, setOpen] = useState(false);
    const [crop, setCrop] = useState(null);
    const [completedCrop, setCompletedCrop] = useState(null);
    const [scale, setScale] = useState(1);
    const [aspect, setAspect] = useState(1);
    const imgRef = useRef(null);

    const onSelectFile = (file) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''));
        reader.readAsDataURL(file);
        setOpen(true);
    };

    const onImageLoad = (e) => {
        if (aspect) {
            const { width, height } = e.currentTarget;
            setCrop(centerCrop(makeAspectCrop({ unit: '%', width: 70, }, aspect, width, height), width, height));
        }
    };
    
    const handleCropComplete = (pixelCrop) => {
        setCompletedCrop(pixelCrop);
    };

    const handleScaleChange = (_, newValue) => {
        setScale(newValue);
    };

    const handleCancel = () => {
        setOpen(false);
        setImgSrc('');
        setCrop(null);
        setCompletedCrop(null);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept:  { 'image/*': ['.jpeg', '.jpg', '.png', '.gif'] },
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 0) onSelectFile(acceptedFiles[0]);
        }
    });
   
  
    const handleCrop = async () => {
        if (completedCrop && imgRef.current) {
            const canvas = document.createElement('canvas');
            const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
            const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
            canvas.width = completedCrop.width;
            canvas.height = completedCrop.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(
                imgRef.current,
                completedCrop.x * scaleX,
                completedCrop.y * scaleY,
                completedCrop.width * scaleX,
                completedCrop.height * scaleY,
                0,
                0,
                completedCrop.width,
                completedCrop.height,
            );

            const croppedImageUrl = canvas.toDataURL('image/jpeg');
            onCropComplete(croppedImageUrl); 
            handleCancel(); 
        }
    };

    return (
        <Box>
            <Box {...getRootProps()} sx={{
                display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: '8px 0 0 40px',
                padding: 3, width: 180, height: 180, borderRadius: '50%', backgroundColor: isDragActive ? '#f0f0f0' : '#9F9F9F', cursor: 'pointer', textAlign: 'center',
            }}>
                <input {...getInputProps()} />
                <Box component="img" src={DownloadCloud} alt="Upload Icon" style={{ width: 20, marginRight: '8px' }} />
                <Typography variant="body2" sx={{ color: '#fff' }}>Upload</Typography>
            </Box>

            <Modal open={open} onClose={handleCancel} sx={{ backgroundColor: 'rgba(65, 66, 65, 0.85)' }}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: '#fff', boxShadow: 24,
                            borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', padding: 2, height: 'auto',}}>
                    <Box sx={{  position: 'relative', width: '100%', height: '400px', bgcolor: '#000', overflow: 'hidden', display: 'flex', alignItems: 'center',justifyContent: 'center',  }} >
                        {!!imgSrc && (
                            <ReactCrop crop={crop} onChange={(newCrop) => setCrop(newCrop)} onComplete={(c) => handleCropComplete(c)} aspect={aspect} style={{ border: 'none', boxShadow: 'none' }}>
                                <img ref={imgRef} alt="Crop me" src={imgSrc} onLoad={onImageLoad} style={{ transform: ` scale(${scale})`,display: 'block'}} />
                            </ReactCrop>
                        )}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: 2 }}>
                        <Button variant="text" onClick={() => setScale(scale > 1 ? scale - 0.1 : 1)} sx={{ marginRight: 1, color: '#747474' }}>
                            <RemoveIcon />
                        </Button>
                        <Slider value={scale} min={1} max={4} step={0.1} onChange={handleScaleChange} valueLabelDisplay="auto" sx={{ flexGrow: 1, marginX: 1, color: '#814AEB' }}/>
                        <Button variant="text" onClick={() => setScale(scale < 4 ? scale + 0.1 : 4)} sx={{ marginLeft: 1, color: '#747474' }}>
                            <AddIcon />
                        </Button>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'baseline', marginBottom: 1 }}>
                        <Button variant="text" onClick={handleCancel} sx={{ marginRight: 2, ...buttonStylesModalCancel }}>Cancel</Button>
                        <Button variant="contained" onClick={handleCrop} sx={{ ...buttonStylesModal, marginTop: 2 }}>Crop</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};