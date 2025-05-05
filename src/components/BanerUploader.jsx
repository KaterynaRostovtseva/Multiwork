import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { textStylesBodyMLeft, buttonStyles } from '../components/Styles/styles';
import editBannerPencil from '../assets/icons/editBannerPencil.svg';
import editBannerClose from '../assets/icons/editBannerClose.svg';
import { Box, Typography, IconButton,Button, Modal, Slider} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DownloadCloudBaner from '../assets/icons/DownloadCloudBaner.svg';
import Cropper from 'react-easy-crop';
import bannerZoomPlus from '../assets/icons/bannerZoomPlus.svg';
import bannerZoomMinus from '../assets/icons/bannerZoomMinus.svg';



const BanerUploader = ({ onDrop }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const [openCropModal, setOpenCropModal] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);
  const [isCropping, setIsCropping] = useState(false);

  const getCroppedImg = async (imageSrc, croppedAreaPixels) => {
    try {
      const image = new Image();
      image.src = imageSrc;

      await new Promise((resolve) => (image.onload = resolve));

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        console.error('Error: Canvas is not supported');
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

 
  const getCroppedImage = async () => {
    try {
      if (!uploadedImage || !croppedImage) {
        console.error('Error: No trim data.');
        return;
      }
  
      const croppedImg = await getCroppedImg(uploadedImage, croppedImage);
      if (croppedImg) {
        console.log('Cropped image:', croppedImg);
        setUploadedImage(croppedImg);
        localStorage.setItem('baner', croppedImg);
  
        setOpenCropModal(false);
        setOpenModal(false);
      }
    } catch (error) {
      console.error('Error while trimming:', error);
    } finally {
      setIsCropping(false);
    }
  };


  useEffect(() => {
    const savedImage = localStorage.getItem('baner');
    if (savedImage) {
      setUploadedImage(savedImage);
    }
  }, []);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const banerImageUrl = reader.result;
          setUploadedImage(banerImageUrl);
          onDrop(banerImageUrl);
          localStorage.setItem('baner', banerImageUrl);
  
          setOpenModal(false);
          setOpenCropModal(true);
        };
        reader.readAsDataURL(file);
      }
    },
    [onDrop]
  );
  

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.gif'] },
    multiple: false,
    noClick: false,
  });
  
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log('Обрезка завершена:', croppedAreaPixels);
    setCroppedImage(croppedAreaPixels);
  };

  return (
    <>
      <Box
        {...getRootProps()}
        sx={{
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: uploadedImage ? 'transparent' : '#D1D1D1',
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          borderRadius: '8px',
          minHeight: '240px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          

          '@media (max-width: 1024px)': { minHeight: '200px' },
          '@media (max-width: 768px)': { minHeight: '160px' },
          '@media (max-width: 480px)': { minHeight: '120px' },
        }}
        onClick={() => setOpenModal(true)}
      >
        <input {...getInputProps()} />

        {!uploadedImage ? (
          <>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                
              }}
            >
              <Box
                component="img"
                src={DownloadCloudBaner}
                alt="Upload Icon"
                sx={{
                  width: { xs: 40, md: 60 },
                  marginBottom: 1,
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '14px', md: '18px' },
                  fontWeight: '700',
                  marginBottom: 1,
                }}
              >
                Add a Banner image
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: '700',
                  fontSize: { xs: '14px', md: '18px' },
                }}
              >
                Recommended image size: 1500 x 240 px
              </Typography>
            </Box>
          </>
        ) : (
          <>
            <Box
              component="img"
              src={uploadedImage}
              alt="Uploaded banner"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            />
            <IconButton
              sx={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                zIndex: 2,
                backgroundColor: '#FFFFFF',
                '&:hover': { backgroundColor: '#f0f0f0' },
                color: '#814AEB',
                width: { xs: '30px', md: '40px' },
                height: { xs: '30px', md: '40px' },
              }}
              onClick={(e) => {
                e.stopPropagation();
                setOpenModal(true);
              }}
            >
              <EditIcon sx={{ fontSize: { xs: '18px', md: '24px' } }} />
            </IconButton>
          </>
        )}
      </Box>
    
      <Modal open={openModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'calc(100% - 30px)',
            maxWidth: '1282px',
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
              <Typography sx={{ ...textStylesBodyMLeft }}>Banner</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                m: 0,
                p:0
              }}
            >
              <Button
                onClick={() => setOpenModal(false)}
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
       
          {!uploadedImage ? (
            <>
              <Box
                sx={{
                  borderRadius: '8px',
                  backgroundColor: 'rgba(209, 209, 209, 1)',
                  height: '240px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mb: '20px',
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <Box
                  sx={{
                    display: 'flex',
                    gap: '20px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    
                  }}
                >
                  <Box
                    component="img"
                    src={DownloadCloudBaner}
                    alt="Upload Icon"
                    sx={{
                      width: { xs: 60, md: 60, },
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: '20px', md: '20px' },
                      fontWeight: '700',
                    }}
                  >
                    Upload
                  </Typography>
                </Box>
              </Box>
            </>
          ) : (
            <>
              <Box
                component="img"
                src={uploadedImage}
                alt="Uploaded banner"
                sx={{
                  width: '100%',
                  height: '240px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom:'20px'
                }}
                
              />
            </>
          )}

        

       
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '16px',
              padding: 0,
              position: 'relative',
              zIndex: 2,
              mt:'20px'
            }}
          >
            <Button
              sx={{
                ...bannerButtonAll,
                ...bannerButtonDelete,
                backgroundColor: 'rgba(249, 250, 251, 1)',
                color: 'rgba(23, 23, 23, 1)',
              }}
              onClick={() => {
                setUploadedImage(null);
                localStorage.removeItem('baner');
              }}
            >
              <Typography>Delete</Typography>
            </Button>
            <Button
              sx={{ ...buttonStyles, ...bannerButtonSave }}
              onClick={async () => {
                if (!uploadedImage || !croppedImage) {
                  console.error(
                    'Ошибка: загруженное или обрезанное изображение отсутствует.'
                  );
                  return;
                }

                try {
                  const croppedImg = await getCroppedImg(
                    uploadedImage,
                    croppedImage
                  );
                  if (!croppedImg)
                    throw new Error(
                      'Ошибка: обрезанное изображение не создано.'
                    );

                  setUploadedImage(croppedImg);
                  localStorage.setItem('baner', croppedImg);
                  setOpenModal(false);
                } catch (error) {
                  console.error('Ошибка сохранения:', error);
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
            maxWidth: '1282px',
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
              backgroundColor: 'rgba(99, 72, 152, 1)',
            }}
          >
            {uploadedImage && (
              <Cropper
                image={uploadedImage}
                crop={crop}
                zoom={zoom}
                aspect={4 / 1}
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
                await getCroppedImage(); 
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
    </>
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
export default BanerUploader;
