import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { buttonStyles, textStylesBody2, textStylesBodyL, textStylesBody3 } from '../components/Styles/styles';
import ShareProjectModal from './ShareProjectModal';
import { IMAGES_URL } from "../config";
import { useNavigate } from 'react-router-dom';

function CardDataTopProjects({ prop }) {
  const itemDataProjects = prop;
  // console.log('itemDataProjects:', itemDataProjects);
  const navigate = useNavigate();
  const status = itemDataProjects.project_status?.trim().replace(/;$/, '') || 'Active';
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleShareOpen = () => setIsShareModalOpen(true);
  const handleShareClose = () => setIsShareModalOpen(false);

  return (
    <Grid sx={{ marginTop: '32px' }}>
      <Card sx={{position: 'relative', boxShadow: '0 4px 15px 0 rgba(16, 24, 40, 0.05)', borderRadius: '12px', padding: '8px' }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'start', marginLeft: '16px' }}>
          <Box component="img"src={`${IMAGES_URL}${itemDataProjects?.coverImg?.url}`} alt="avatar" sx={{ borderRadius: '100%', width: {xs: 120, sm: 150, md: 180  }, height: { xs: 120, sm: 150, md: 180 }, marginBottom: { xs: '16px', sm: '0' }, marginRight: { sm: '16px' } }} />
          <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', }}>
              <Box sx={{ display: 'flex', alignItems: 'center', margin: '8px 0', flexWrap: 'wrap', }}>
                {itemDataProjects?.skills?.slice(0, 2).map((tag, idx) => (
                  <Box
                    key={tag.id || idx}
                    display="flex"
                    alignItems="center"
                    sx={{ padding: '8px', borderRadius: '4px', backgroundColor: '#EFE8FF', margin: '0 4px 4px 0', }}>
                    {tag.icon && (
                      <img
                      src={`${IMAGES_URL}${tag?.icon?.url}`}
                        alt={tag?.skillName}
                        style={{ marginRight: '8px', width: '24px', height: '24px' }}
                      />
                    )}
                    <Typography component="span" sx={{ ...textStylesBody3 }}>{tag.skillName}</Typography>
                  </Box>
                ))}

                {itemDataProjects.skills?.length > 2 && (
                  <Typography variant="caption" sx={{ ...textStylesBody3 }}>
                    +{itemDataProjects?.skills?.length - 2}
                  </Typography>
                )}
                <Typography variant="caption" sx={{ ...textStylesBody3 }}>{itemDataProjects?.plusNumber}</Typography>
              </Box>

              <Box>
                <Typography sx={{ ...textStylesBody2, color: "#667085", textAlign: 'left' }}>
                  {/* {new Date(itemDataProjects?.createdAt).getFullYear()} year */}
                  {itemDataProjects?.createdAt ? new Date(itemDataProjects.createdAt).toISOString().slice(0, 10).split('-').reverse().join('.') : 'Date not specified'}
                </Typography>
                <Box sx={{ ...textStylesBody2, marginTop: '12px', backgroundColor: '#DDF7EF', color: '#027A48', fontWeight: 'bold', borderRadius: '50px', padding: '4px 12px', display: 'inline-block', textTransform: 'capitalize' }}>
                  {status}
                </Box>
              </Box>
            </Box>
          </Box>

          <IconButton aria-label="share" sx={{ position: 'absolute',  top: '16px',  right: '16px', marginLeft: 'auto', marginTop: '0', zIndex: 1, }} onClick={handleShareOpen} >
            <ShareIcon />
          </IconButton>
          <ShareProjectModal isOpen={isShareModalOpen} onClose={handleShareClose} />
        </Box>

        <CardContent >
          <Box >
            <Typography sx={{ ...textStylesBodyL, textAlign: 'left', marginBottom: '16px' }}>{itemDataProjects?.title}</Typography>
          </Box>
          <Box>
            <Typography sx={{ ...textStylesBody2, marginBottom: '16px', textAlign: 'left' }}>
              {itemDataProjects?.description}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', sm: 'column', md: 'row', }, justifyContent: 'space-between', }}>
            <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative', }}>
              {itemDataProjects?.dataAvatar?.map((avatar, idx) => (
                <Avatar
                  key={idx}
                  src={avatar.avatar}
                  sx={{ width: 24, height: 24, position: 'absolute', left: `${idx * 17}px`, zIndex: itemDataProjects?.dataAvatar?.length - idx, border: '1px solid white' }}
                />
              ))}
              <Typography sx={{ marginLeft: `${itemDataProjects?.dataAvatar?.length * 17 + 10}px`, ...textStylesBody2 }}>
                {itemDataProjects?.plusNum}
              </Typography>
            </Box>

            <Button onClick={() => navigate(`/pageMyProject/${itemDataProjects.id}`)} sx={{ ...buttonStyles, borderRadius: '4px', padding: '10px 18px', height: '44px', width: { xs: '100%', sm: '212px' }, marginTop: '16px', color: '#0A0A0A', border: '1px solid #0A0A0A', textTransform: 'none' }}>
              View
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default CardDataTopProjects;

