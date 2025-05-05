import React, {useState} from 'react';
import { Modal, Box, Typography, IconButton, Button, TextField, Snackbar} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { textStylesH2, textStylesH3 } from '../components/Styles/styles';
import LinkIcon from '@mui/icons-material/Link';
import LinkedIn from '../assets/icons/LinkedIn.svg';
import Behance from '../assets/icons/Behance.svg';
import Instagram from '../assets/icons/Instagram.svg';
import Dribbble from '../assets/icons/Dribbble.svg';


const ShareProjectModal = ({ isOpen, onClose }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleCopyLink = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText('https://www.multiwork.com/5d6ab9ea');
            setSnackbarOpen(true);
        } else {
            alert('Clipboard API is not supported in your browser.');
        }
    };

    const socialMedia = [
        { name: 'Behance', icon: Behance, action: () => alert('Share on Behance') },
        { name: 'Instagram', icon: Instagram, action: () => alert('Share on Instagram') },
        { name: 'LinkedIn', icon: LinkedIn, action: () => alert('Share on LinkedIn') },
        { name: 'Dribbble', icon: Dribbble, action: () => alert('Share on Dribbble') },
    ];

    return (
        <>
            <Modal open={isOpen} onClose={onClose} aria-labelledby="share-modal-title" aria-describedby="share-modal-description">
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',  width: 700, bgcolor: 'background.paper',  boxShadow: 24,  borderRadius: '12px', p: 4, textAlign: 'center', }} >
                  
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Typography id="share-modal-title" variant="h6" component="h2" sx={{ margin: '60px 150px', textAlign: 'left' }}>
                        Share this project
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3,  margin: '0 100px', flexWrap: 'wrap'}}>
                        {socialMedia.map((media) => (
                            <Button key={media.name} variant="text" sx={{ display: 'flex',  flexDirection: 'column', alignItems: 'center', textTransform: 'none', color: '#000', '&:hover': {  transform: 'scale(1.05)', transition: 'transform 0.3s',}, }} onClick={media.action}>
                                <img src={media.icon} alt={media.name} style={{ width: 75, height: 75, marginBottom: 8 }} />
                                {media.name}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ margin: '60px 150px' }}>
                        <Typography id="share-modal-description" sx={{ marginBottom: '20px', textAlign: 'left' }}>
                            Or copy link
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <TextField fullWidth variant="outlined" value="https://www.multiwork.com/5d6ab9ea" InputProps={{ readOnly: true }} sx={{ marginBottom: 1 }}/>
                            <IconButton onClick={handleCopyLink} sx={{ marginLeft: 4 }}>
                                <LinkIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            </Modal>

            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)} message="Link copied to clipboard!" anchorOrigin={{ vertical: 'top', horizontal: 'center' }}/>
        </>
    );
};

export default ShareProjectModal;