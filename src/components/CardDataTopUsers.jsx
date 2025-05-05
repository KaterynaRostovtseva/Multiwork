import React from 'react';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { buttonStyles, textStylesBody2, textStylesBodyL, textStylesBody3 } from '../components/Styles/styles';
import { useNavigate } from 'react-router-dom';




function CardDataTopUsers({ prop }) {
  const itemDataUsers = prop;
  const navigate = useNavigate();
  return (
    <Grid >
      <Card sx={{ boxShadow: '0 4px 15px 0 rgba(16, 24, 40, 0.05)', borderRadius: '12px'}}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', padding: '8px' }}>
          <Box component="img" src={itemDataUsers.baner} alt={`${itemDataUsers?.title} banner`} sx={{ borderRadius: '8px', width: '100%', height: '70px', objectFit: 'cover' }} />
          <Avatar
            src={itemDataUsers.avatar}
            alt={`${itemDataUsers.title} avatar`}
            sx={{ width: 80, height: 80, border: '2px solid white', marginTop: '-40px' }}
          />
          <Box sx={{ width: '100%', marginTop: '10px' }}>
            <Typography sx={{ ...textStylesBodyL, textAlign: 'left', marginLeft: '8px' }}>{itemDataUsers?.title}</Typography>
          </Box>
        </Box>

        <CardContent >
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', margin: '8px 0' }}>
            {itemDataUsers?.skills?.map((tag, idx) => (
              <Box
                key={idx}
                display="flex"
                alignItems="center"
                sx={{ padding: '4px 4px', borderRadius: '4px', backgroundColor: '#EFE8FF', margin: '0 4px 4px 0' }}
              >
                <Box component="img" src={tag.icon} alt={`${tag.teg} icon`} sx={{ width: 16, height: 16, marginRight: '4px' }} />
                <Typography sx={{ ...textStylesBody3 }}>{tag.teg}</Typography>
              </Box>
            ))}
            {itemDataUsers.plusNumber && (
              <Typography variant="caption" sx={{ ...textStylesBody3 }}>
                {itemDataUsers.plusNumber}
              </Typography>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            {itemDataUsers?.dataProjects && itemDataUsers?.dataProjects?.length > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {itemDataUsers.dataProjects.map((project, idx) => (
                  <Avatar
                    key={idx}
                    src={project.projects}
                    alt={`Project ${idx + 1}`}
                    sx={{
                      width: 30,
                      height: 30,
                      marginLeft: idx === 0 ? 0 : '-15px',
                      border: '1px solid white',
                      zIndex: itemDataUsers?.dataProjects?.length - idx,
                    }}
                  />
                ))}
              </Box>
            )}
            <Typography sx={{ ...textStylesBody2, marginLeft: itemDataUsers?.dataProjects?.length > 0 ? '4px' : 0 }}>
              {itemDataUsers.plusNum}
            </Typography>
          </Box>

          <Button onClick={() => navigate(`/pageAboutMember/${itemDataUsers.id}`)} sx={{...buttonStyles,borderRadius: '4px', padding: '10px 18px', width: '100%', height: '44px', marginTop: '16px', color: '#0A0A0A', border: '1px solid #0A0A0A', textTransform: 'none','&:hover': { backgroundColor: '#f0f0f0', }, }}>
            View
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default CardDataTopUsers;
