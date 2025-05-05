import React from 'react';
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
import { buttonStyles, textStylesBody2, textStylesBodyL, textStylesBody3 } from './Styles/styles';
import Avatar from '@mui/material/Avatar';
import MockDataAvatars from './Mock/MockDataAvatars';
import { useParams } from 'react-router-dom';
import { IMAGES_URL } from "../config";



function CardDataMembers(prop) {
  const { id } = useParams();
  console.log(prop)
  const navigate = useNavigate();
  const itemData = prop.prop;
  const status = itemData.project_status?.trim().replace(/;$/, '') || 'Active';
  const mockAvatar = MockDataAvatars();

  
  return (
    <Grid container>
      <Card sx={{ boxShadow: '0 4px 15px 0 rgba(16, 24, 40, 0.05)', borderRadius: '12px', padding: '8px', width: '350px', minHeight: "400px", flexDirection: "column", }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
          {itemData?.coverImg ? (
            // <Box component="img" src={`${itemData.coverImg}`} alt="avatar" sx={{ marginTop: '24px', width: { xs: 80, sm: 100, md: 120 }, height: { xs: 80, sm: 100, md: 120 }, borderRadius: '50%', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', marginBottom: { xs: '16px', sm: '0' }, marginRight: { sm: '8px' } }} />) : (<Box sx={{ width: { xs: 80, sm: 100, md: 120 }, height: { xs: 80, sm: 100, md: 120 }, borderRadius: '50%', backgroundColor: '#blue', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', marginBottom: { xs: '16px', sm: '0' }, marginRight: { sm: '8px' } }}></Box>)}
            <Box component="img" src={`${IMAGES_URL}${itemData.coverImg.url}`} alt="avatar" sx={{ marginTop: '24px', width: { xs: 80, sm: 100, md: 120 }, height: { xs: 80, sm: 100, md: 120 }, borderRadius: '50%', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', marginBottom: { xs: '16px', sm: '0' }, marginRight: { sm: '8px' } }} />) : (<Box sx={{ width: { xs: 80, sm: 100, md: 120 }, height: { xs: 80, sm: 100, md: 120 }, borderRadius: '50%', backgroundColor: '#blue', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', marginBottom: { xs: '16px', sm: '0' }, marginRight: { sm: '8px' } }}></Box>)}
          <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
            <Box>
              <Typography sx={{ ...textStylesBodyL, textAlign: 'left', marginBottom: '8px',  }}>{itemData.title}</Typography>
              <Typography sx={{ ...textStylesBody2, color: "#667085", textAlign: 'left', }}>{itemData.createdAt ? new Date(itemData.createdAt).toISOString().slice(0, 10).split('-').reverse().join('.') : 'Date not specified'}</Typography>
              <Box sx={{ ...textStylesBody2, marginTop: '12px', backgroundColor: '#DDF7EF', color: '#027A48', fontWeight: 'bold', borderRadius: '50px', padding: '4px 12px', display: 'inline-block', textTransform: 'capitalize' }}>
                {status}
              </Box>
            </Box>
            <Box sx={{ marginLeft: '8px' }} >
              <IconButton aria-label="add to favorites"  >
                <FavoriteBorderIcon />
              </IconButton>
              <IconButton aria-label="share">
                <LinkIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", }}>
          <Box>
            <Typography sx={{ ...textStylesBody2, marginBottom: '16px', textAlign: 'left', height: '50px', display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden', WebkitLineClamp: 2, textOverflow: 'ellipsis', }}>
              {itemData.description}
            </Typography>

          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', margin: '16px 0' }}>
            {itemData.skills?.slice(0, 2).map((tag, idx) => (
              <Box
                key={tag.id || idx}
                display="flex"
                alignItems="center"
                sx={{ padding: '8px', borderRadius: '4px',backgroundColor: '#EFE8FF', margin: '0 4px 4px 0',}}>
                {tag.icon?.url && (
                  <img
                    src={`${IMAGES_URL}${tag.icon.url}`}
                    alt={tag.skillName}
                    style={{ marginRight: '8px', width: '24px', height: '24px' }}
                  />
                )}
                <Typography sx={{ ...textStylesBody3 }}>{tag.skillName}</Typography>
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
              <Typography sx={{ ...textStylesBody2 }}>{mockAvatar.plusNum}</Typography>
              {/* <Typography sx={{ ...textStylesBody2 }}>{mockAvatar.members}</Typography> */}
            </Box>
          </Box>

          <Grid sx={{ display: 'flex', marginTop: '24px' }}>
            <Button onClick={() => navigate(`/pageProjectId/${itemData.id}`)}  sx={{ ...buttonStyles, borderRadius: '4px', padding: '10px 18px', width: '100%', height: '44px', color: '#0A0A0A', border: '1px solid #0A0A0A' }}>View</Button>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default CardDataMembers;

