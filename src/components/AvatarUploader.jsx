import React, { useState, useCallback, useEffect } from 'react';
import { Box, Avatar, IconButton, Button, Typography, Modal, Slider,} from '@mui/material';
import { textStylesBodyMLeft } from '../components/Styles/styles';
import Cropper from 'react-easy-crop';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import bannerZoomPlus from '../assets/icons/bannerZoomPlus.svg';
import bannerZoomMinus from '../assets/icons/bannerZoomMinus.svg';
import uploadIcon from '../assets/icons/DownloadCloud.svg';
import editBannerClose from '../assets/icons/editBannerClose.svg';
import editBannerPencil from '../assets/icons/editBannerPencil.svg';


const getCroppedImg = async (imageSrc, croppedAreaPixels) => {
  try {
    const image = new Image();
    image.src = imageSrc;
    await new Promise((resolve) => (image.onload = resolve));

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Ошибка: Canvas не поддерживается');
      return null;
    }

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    return canvas.toDataURL('image/jpeg');
  } catch (error) {
    console.error('Image cropping error:', error);
    return null;
  }
};

const AvatarUploader = () => {
  const [avatar, setAvatar] = useState(null);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [openCropModal, setOpenCropModal] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropping, setIsCropping] = useState(false);

  useEffect(() => {
    const savedAvatar = localStorage.getItem('avatar');
    if (savedAvatar && savedAvatar !== 'null') {
      setAvatar(savedAvatar);
    }
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
      setOpenCropModal(true);
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSaveCroppedImage = async () => {
    setIsCropping(true);
    const croppedImg = await getCroppedImg(imageSrc, croppedAreaPixels);
    if (!croppedImg) {
      console.error('Error: Cropped image not created.');
      setIsCropping(false);
      return;
    }

    setAvatar(croppedImg);
    localStorage.setItem('avatar', croppedImg);
    setOpenCropModal(false);
    setIsCropping(false);
  };
  return (
    <Box
      sx={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      
      <IconButton color="primary" onClick={() => setOpenUploadModal(true)}>
        <Avatar
          sx={{
            width: 180,
            height: 180,
            background: 'rgba(159, 159, 159, 1)',
            boxShadow:
              '0 4px 6px -2px rgba(16, 24, 40, 0.03), 0 12px 16px -4px rgba(16, 24, 40, 0.08);',
            padding: 0,
           
          }}
        >
          {avatar ? (
            <img
              src={avatar}
              alt="Avatar"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '100%',
              }}
            />
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img
                src={uploadIcon}
                alt="Upload Icon"
                style={{ width: 24, height: 24 }}
              />
              <Typography sx={{ color: 'white', fontSize: '16px' }}>
                Upload
              </Typography>
            </Box>
          )}
        </Avatar>
      </IconButton>

     
      <Modal open={openUploadModal} onClose={() => setOpenUploadModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'calc(100% - 30px)',
            maxWidth: '680px',
            borderRadius: '16px',
            padding: '20px 40px 40px 40px', // тут
            backgroundColor: 'rgba(255, 255, 255, 1)',
            
          }}
        >
          
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '60px', 
            }}
          >
           
            <Box>
              <Typography sx={{ ...textStylesBodyMLeft }}>
                Profile Photo
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                m: 0,
                p: 0,
              }}
            >
              <Button
                onClick={() => setOpenUploadModal(false)}
                sx={{ minWidth: 'auto', p: 0, m: 0 }}
              >
                <Box
                  component="img"
                  src={editBannerClose}
                  alt="Edit Icon Close"
                  sx={{ width: '37px', height: '41px', p: 0, m: 0 }}
                />
              </Button>
            </Box>
          </Box>
          
          <label htmlFor="avatar-upload" style={{ cursor: 'pointer' }}>
            <Avatar
              sx={{
                width: 300,
                height: 300,
                marginInline: 'auto',
                mb: '40px',
                background: 'rgba(159, 159, 159, 1)',
                boxShadow:
                  '0 4px 6px -2px rgba(16, 24, 40, 0.03), 0 12px 16px -4px rgba(16, 24, 40, 0.08);',
                padding: 0,
                '@media (max-width: 420px)': {
                  width: '200px',
                  height: '200px',
                },
              }}
            >
              {avatar ? (
                <img
                  src={avatar}
                  alt="Avatar"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '100%',
                  }}
                />
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img
                    src={uploadIcon}
                    alt="Upload Icon"
                    style={{ width: 24, height: 24 }}
                  />
                  <Typography sx={{ color: 'white', fontSize: '16px' }}>
                    Upload
                  </Typography>
                </Box>
              )}
            </Avatar>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </label>

         
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '16px',
              padding: 0,
              position: 'relative',
              zIndex: 2,
            }}
          >
            <Button
              sx={{ ...bannerButtonAll, ...bannerButtonDelete }}
              onClick={() => {
                localStorage.removeItem('avatar');
                setAvatar(null);
                setImageSrc(null);
                setCroppedAreaPixels(null);
              }}
            >
              <Typography>Delete</Typography>
            </Button>

            <Button
              sx={{ ...buttonStyles, ...bannerButtonSave }}
              onClick={async () => {
                if (!imageSrc || !croppedAreaPixels) {
                  console.error(
                    'Error: Uploaded or cropped image is missing.'
                  );
                  return;
                }

                try {
                  const croppedImg = await getCroppedImg(
                    imageSrc,
                    croppedAreaPixels
                  );
                  if (!croppedImg) {
                    throw new Error(
                      'Error: Cropped image not created.'
                    );
                  }

                  setAvatar(croppedImg); 
                  localStorage.setItem('avatar', croppedImg); 
                  setOpenUploadModal(false); 
                } catch (error) {
                  console.error('Saving error:', error);
                }
              }}
            >
              <Typography>Save</Typography>
            </Button>

            <Button
              onClick={() => {
                setOpenCropModal(true);
              }}
            >
              <Box
                component="img"
                src={editBannerPencil}
                alt="Edit Icon"
                sx={{ width: 21, height: 21 }}
              />
            </Button>
          </Box>
        </Box>
      </Modal>

      
      <Modal open={openCropModal} onClose={() => setOpenCropModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'calc(100% - 30px)',
            maxWidth: '680px',
            borderRadius: '16px',
            padding: '40px',
            backgroundColor: 'rgba(255, 255, 255, 1)',
            
          }}
        >
        
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '400px',
              overflow: 'hidden',
              backgroundColor: 'rgba(99, 72, 152, 1)',
            }}
          >
            {imageSrc && (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1} 
                cropShape="round" 
                showGrid={false} 
                minZoom={0.5} 
                maxZoom={6} 
                zoomSpeed={0.1} 
                cropSize={{ width: 250, height: 250 }} 
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            )}
          </Box>

         
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '24px',
            }}
          >
            <IconButton
              onClick={() => setZoom(zoom - 0.1)}
              disabled={zoom <= 1}
            >
              <Box
                component="img"
                src={bannerZoomMinus}
                alt="Zoom out"
                sx={{ width: '24px', height: '24px' }}
              />
            </IconButton>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={(e, newZoom) => setZoom(newZoom)}
              sx={{
                width: '400px',
                mx: 2,
                '& .MuiSlider-thumb': {
                  backgroundColor: 'rgba(129, 74, 235, 1)',
                  width: '16px',
                  height: '16px',
                },
                '& .MuiSlider-track': {
                  backgroundColor: 'rgba(204, 180, 254, 1)',
                  height: '8px',
                },
                '& .MuiSlider-rail': {
                  backgroundColor: '#D1D1D1',
                  height: '8px',
                },
              }}
            />
            <IconButton
              onClick={() => setZoom(zoom + 0.1)}
              disabled={zoom >= 3}
            >
              <Box
                component="img"
                src={bannerZoomPlus}
                alt="Zoom in"
                sx={{ width: '24px', height: '24px' }}
              />
            </IconButton>
          </Box>

        
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '16px',
              marginTop: '24px',
            }}
          >
            <Button
              sx={{
                ...bannerButtonAll,
                ...bannerButtonDelete,
                color: 'rgba(23, 23, 23, 1)',
              }}
              onClick={() => setOpenCropModal(false)}
            >
              <Typography>Cancel</Typography>
            </Button>
            <Button
              sx={{
                ...buttonStyles,
                ...bannerButtonSave,
                padding: '10px 18px',
              }}
              onClick={async () => {
                setIsCropping(true);
                await handleSaveCroppedImage();
                setOpenUploadModal(false); 
              }}
              disabled={isCropping}
            >
              <Typography>
                {isCropping ? 'Cropping...' : 'Crop and Save'}
              </Typography>
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
export const bannerButtonAll = {
  padding: '10px 18px',
  borderRadius: '4px',
  textTransform: 'capitalize',
  fontWeight: 600,
};
export const bannerButtonDelete = {
  '&:hover': {
    backgroundColor: '#EFE8FF',
  },
};
export const bannerButtonSave = {
  backgroundColor: 'rgba(129, 74, 235, 1)',
  color: 'rgba(255, 255, 255, 1)',
  fontSize: '14px',
};
export const buttonStyles = {
  color: '#0A0A0A',
  textTransform: 'none',
  fontFamily: 'Open Sans, sans-serif ',
  fontWeight: '600',
  fontSize: '16px',
  lineHeight: '120%',
  '&:hover': {
    backgroundColor: '#7533EA',
    border: 'none',
    color: '#fff',
  },
};
export default AvatarUploader;
