import React, { useState } from "react";
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LinkIcon from '@mui/icons-material/Link';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { buttonStylesDelete, buttonStyles, textStylesBody2, textStylesBodyL, textStylesBodyL2, textStylesBody3 } from './Styles/styles';
import { IMAGES_URL } from "../config";
import MockDataAvatars from './Mock/MockDataAvatars';
import Avatar from '@mui/material/Avatar';
import DeleteModal from '../components/DeleteModal';
import { deleteProject,  hideProject  } from '../store/Slice/projectSlice';
import { useDispatch, useSelector } from 'react-redux';
import ShareIcon from '@mui/icons-material/Share';


function CardDataMyProject(prop) {
 
  const navigate = useNavigate();
  const itemData = prop.prop;
  console.log(itemData)
  const status = itemData.project_status?.trim().replace(/;$/, '') || 'Active';
  const mockAvatar = MockDataAvatars();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token)
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isProjectHidden, setIsProjectHidden] = useState(false);
  
  const handleHideProject = async () => {
    if (itemData.isHidden) {
      console.log("Project is already hidden");
      return;
    }
    console.log('Hiding project', itemData.id);
    await dispatch(hideProject({ projectId: itemData.id, token }));
    setIsProjectHidden(true); 
  };
  

  const handleOpenModal = (projectId) => {
    setSelectedProjectId(projectId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProjectId(null);
    setModalOpen(false);
  };

  const handleDeleteProject = async (projectId) => {
    setLoading(true); 
    await dispatch(deleteProject({ projectId, token })); 
    setLoading(false); 
    handleCloseModal(); 
    window.location.reload();
};
  return (
    <Grid container >
       {!isProjectHidden && (
      <Card sx={{ boxShadow: '0 4px 15px 0 rgba(16, 24, 40, 0.05)', borderRadius: '12px', width: { xs: '100%', sm: '334px' }, minHeight: "400px", padding: '8px', flexDirection: "column", }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, flexWrap: { xs: 'wrap', sm: 'nowrap' }, alignItems: 'center', justifyContent: 'space-evenly' }}>
          {itemData?.coverImg?.url ? (
            <Box component="img" src={`${IMAGES_URL}${itemData?.coverImg?.url}`} alt="avatar" sx={{ marginTop: '24px', width: { xs: 80, sm: 100, md: 120 }, height: { xs: 80, sm: 100, md: 120 }, borderRadius: '50%', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', marginBottom: { xs: '16px', sm: '0' }, marginRight: { sm: '16px' } }} />) : (<Box sx={{ width: { xs: 80, sm: 100, md: 120 }, height: { xs: 80, sm: 100, md: 120 }, borderRadius: '50%', backgroundColor: '#blue', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', marginBottom: { xs: '16px', sm: '0' }, marginRight: { sm: '16px' } }}></Box>)}
          <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography component="span" sx={{ ...textStylesBodyL, textAlign: 'left', marginBottom: '8px' }}>{itemData.title}</Typography>
              <Typography component="span" sx={{ ...textStylesBody2, color: "#667085", textAlign: 'left', }}>{itemData.createdAt ? new Date(itemData.createdAt).toISOString().slice(0, 10).split('-').reverse().join('.') : 'Date not specified'}</Typography>
              <Box component="div" sx={{ ...textStylesBody2, marginTop: '12px', backgroundColor: '#DDF7EF', color: '#027A48', fontWeight: 'bold', borderRadius: '50px', padding: '4px 12px', display: 'inline-block', textTransform: 'capitalize' }}>
                {status}
              </Box>
            </Box>
          </Box>
          <Box sx={{ marginLeft: '8px' }} >
            <IconButton aria-label="share" sx={{ marginLeft: 'auto', alignItems: 'flex-start', height: '40px', width: '40px', }}>
              <ShareIcon />
            </IconButton>
          </Box>
        </Box>


        <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", }}>
          <Box>
            <Typography component="span" sx={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: showFullDescription ? 'unset' : 3, overflow: 'hidden', textOverflow: 'ellipsis', fontSize: { xs: '12px', sm: '14px' }, lineHeight: '1.5em', maxHeight: showFullDescription ? 'none' : '4.5em', marginTop: '16px', textAlign: 'left', }}>
              {itemData?.description}
            </Typography>
            <Button onClick={() => setShowFullDescription(prev => !prev)} sx={{ fontSize: '12px', padding: 0, textTransform: 'none', minWidth: 'fit-content' }}>
              {showFullDescription ? 'Hide' : 'Show'}
            </Button>

          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', margin: '16px 0' }}>
            {itemData?.skills?.slice(0, 2).map((tag, idx) => (
              <Box
                key={tag.id || idx}
                display="flex"
                alignItems="center"
                sx={{ padding: '8px', borderRadius: '4px', backgroundColor: '#EFE8FF', margin: '0 4px 4px 0', }}>
                {tag.icon?.url && (
                  <img src={`${IMAGES_URL}${tag.icon?.url}`} alt={tag.skillName} style={{ marginRight: '8px', width: '24px', height: '24px' }} />)}
                <Typography component="span" sx={{ ...textStylesBody3 }}>{tag.skillName}</Typography>
              </Box>
            ))}

            {itemData.skills?.length > 2 && (
              <Typography variant="caption" sx={{ ...textStylesBody3 }}>
                +{itemData.skills.length - 2}
              </Typography>
            )}

            <Typography variant="caption" sx={{ ...textStylesBody3 }}>
              {itemData.plusNumber}
            </Typography>
          </Box>

          <Box sx={{ marginBottom: '24px' }}>
            <Box sx={{ position: 'relative', }}>
              {mockAvatar.dataAvatar.map((avatar, idx) => (
                <Avatar
                  key={idx}
                  src={avatar.avatar}
                  sx={{ width: 24, height: 24, position: 'absolute', left: `${idx * 17}px`, zIndex: mockAvatar.dataAvatar.length - idx, border: '1px solid white' }}
                />
              ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <Typography component="span" sx={{ ...textStylesBody2 }}>{mockAvatar.plusNum}</Typography>
              {/* <Typography sx={{ ...textStylesBody2 }}>{mockAvatar.members}</Typography> */}
            </Box>
          </Box>

          <Grid sx={{ display: "flex", flexDirection: { xs: 'column', sm: 'row' }, gap: "12px" }}>
            <Button onClick={() => navigate(`/pageMyProject/${itemData.id}`)} sx={{ ...buttonStyles, borderRadius: '4px', padding: '10px 18px', width: '100%', height: '44px', color: '#0A0A0A', border: '1px solid #0A0A0A', }}>View</Button>
            <Button onClick={handleHideProject}  sx={{ ...buttonStyles, borderRadius: '4px', padding: '10px 18px', width: '100%', height: '44px', color: '#0A0A0A', border: '1px solid #0A0A0A' }}>  Hide</Button>
            <Button onClick={() => handleOpenModal(itemData.documentId)} sx={{ ...buttonStylesDelete, borderRadius: '4px', padding: '10px 18px', width: '100%', height: '44px', }}>Delete</Button>
          </Grid>
        </CardContent>

        <DeleteModal isOpen={isModalOpen} onClose={handleCloseModal} loading={loading} onDelete={() => handleDeleteProject(selectedProjectId)} />
      </Card>
      )}
    </Grid >
  );
}

export default CardDataMyProject;