import React, { useState } from 'react';
import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { buttonStylesModal, textStylesH2, textStylesBody1 } from '../components/Styles/styles';




const DeleteModal = ({ isOpen, onClose, onDelete, loading, projectId  }) => {


  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="delete-modal-title" aria-describedby="delete-modal-description" >
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: 700, bgcolor: 'background.paper', boxShadow: 24, borderRadius: '12px', p: 4, }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={onClose} sx={{ justifyContent: 'flex-end' }}>
            <CloseIcon  />
          </IconButton>
        </Box>
        <Typography id="delete-modal-title" variant="h6" component="h2" sx={{ ...textStylesH2, marginBottom: '40px', textAlign: 'center' }}>
          Delete project
        </Typography>
        <Typography id="delete-modal-description" sx={{ ...textStylesBody1, marginBottom: '40px' }}>
          This action will completely delete your project and all associated data. After deletion, it will be impossible to regain access to the project or any information.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" disabled={loading} onClick={() => onDelete()} sx={{ ...buttonStylesModal }}>
            {loading ? 'Removing...' : 'Delete project'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
