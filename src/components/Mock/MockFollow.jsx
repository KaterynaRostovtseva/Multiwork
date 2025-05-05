import React from 'react';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { buttonStyles, textStylesBody2, textStylesBodyL, } from '../../components/Styles/styles';
import MockDataAvatars from '../Mock/MockDataAvatars';
import Avatar from '@mui/material/Avatar';


function MockFollow(prop) {
  const itemData = prop?.prop;
  console.log(itemData)
  const status = itemData?.project_status?.trim().replace(/;$/, '') || 'Active';
  const mockAvatar = MockDataAvatars();

  return (
    <Grid container >
      <Card sx={{ boxShadow: '0 4px 15px 0 rgba(16, 24, 40, 0.05)', borderRadius: '12px', width: '334px', padding: '8px', flexDirection: "column", }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
          {itemData?.avatar ? (
            <Box component="img" src={itemData?.avatar} alt="avatar" sx={{ marginTop: '24px', width: { xs: 30, sm: 50, md: 80 }, height: { xs: 30, sm: 50, md: 80 }, borderRadius: '50%', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', marginBottom: { xs: '16px', sm: '0' }, marginRight: { sm: '8px' } }} />) : (<Box sx={{ width: { xs: 30, sm: 50, md: 80 }, height: { xs: 30, sm: 50, md: 80 }, borderRadius: '50%', backgroundColor: '#blue', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', marginBottom: { xs: '16px', sm: '0' }, marginRight: { sm: '8px' } }}></Box>)}
          <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
            <Box>
              <Typography sx={{ ...textStylesBodyL, textAlign: 'left', marginBottom: '8px' }}>{itemData?.title}</Typography>
              <Box sx={{ ...textStylesBody2, marginTop: '12px', backgroundColor: '#DDF7EF', color: '#027A48', fontWeight: 'bold', borderRadius: '50px', padding: '4px 12px', display: 'inline-block', textTransform: 'capitalize' }}>
                {status}
              </Box>
            </Box>
          </Box>
        </Box>
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Box sx={{ position: 'relative', display: 'flex' }}>
              {mockAvatar.dataAvatar.map((avatar, idx) => (
                <Avatar key={idx} src={avatar.avatar} sx={{ width: 24, height: 24, position: 'relative', marginLeft: idx === 0 ? 0 : '-12px', zIndex: mockAvatar.dataAvatar.length - idx, border: '1px solid white' }} />))}
            </Box>
            <Typography sx={{ ...textStylesBody2 }}>{mockAvatar.plusNum}</Typography>
          </Box>
          <Button sx={{ ...buttonStyles, borderRadius: '4px', padding: '10px 18px', width: '73px', height: '44px', color: '#0A0A0A', border: '1px solid #0A0A0A' }} >
            View
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default MockFollow;

