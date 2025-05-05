import React from "react";
import { Box, Typography, Button,  Modal, } from "@mui/material";
import CheckIcon from "../../assets/icons/check-circle.svg";
import { textStylesH1,buttonStylesModal, textStylesBody1 } from '../../components/Styles/styles';
import { useNavigate } from 'react-router-dom';

function InviteModal({ open }) { 
    const navigate = useNavigate();
    const projectId = localStorage.getItem('selectedId')
    return (
        <Modal open={open} >
            <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" padding={4} width={900}
                sx={{ position: 'absolute', top: '50%',left: '50%',transform: 'translate(-50%, -50%)', backgroundColor: 'white',boxShadow: 24, borderRadius:'16px'}}>
                <Box component="img" src={CheckIcon} sx={{ width: '160px', height: '160px', textAlign: 'center' }} />
                <Typography variant="h6" component="h1" gutterBottom sx={{ ...textStylesH1, color: '#12B76A' }}>
                    Invite sent successfully
                </Typography>
                <Typography variant="body1" gutterBottom sx={{ ...textStylesBody1 }}>
                    We will let you know when it is approved.<br />
                    Please watch for notifications.
                </Typography>
                <Button variant="contained" onClick={() => navigate(`/pageMyProject/${projectId}`)} sx={{ ...buttonStylesModal, width:'218px', marginTop:'18px' }}>
                    OK
                </Button>
            </Box>
        </Modal>
    );
}

export default InviteModal;

