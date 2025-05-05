import React from 'react';
import { Box, List, ListItem, ListItemAvatar, ListItemText, Avatar, Button, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import SearchBar from '../SearchBar';
import { textStylesBodyL2, buttonStyles, textStylesBody3 } from '../Styles/styles';
import { IMAGES_URL } from "../../config";
import { useState } from 'react';

const ProjectListDropdown = ({ projects, onSearch, onSelect, selectedId }) => {

  const status = projects.project_status?.trim().replace(/;$/, '') || 'Active';


  const selectedProject = (id) =>{
    localStorage.setItem('selectedId', id)
  }
  return (
    <>
      <Box sx={{ position: 'relative', width: '100%', }}>
        <SearchBar onChange={onSearch} />
      </Box>
      <>
      <List sx={{ position: 'relative', width: '100%', maxHeight: '50vh', overflowX: 'auto', marginTop: 3, }}>
        {projects.map((project) => (
          <ListItem key={project.id} sx={{ mb: 2, p: 2, borderRadius: '12px', bgcolor: project.id === selectedId ? '#EFE8FF' : '#FFFFFF', boxShadow: project.id === selectedId ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none', }} onClick={() => onSelect(project.id)}>
            <ListItemAvatar>
              <Avatar src={`${IMAGES_URL}${project?.coverImg.url}`} alt="avatar" sx={{ width: 40, height: 40 }} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography sx={{ ...textStylesBodyL2, textAlign: 'left' }} component="div">
                  {project.title}
                </Typography>
              }
              secondary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box  sx={{ marginTop: '12px', backgroundColor: '#DDF7EF', color: '#027A48', fontWeight: 'bold', borderRadius: '50px', padding: '4px 12px', textTransform: 'capitalize', }}>
                    {status}
                  </Box>
                  <Typography sx={{ ...textStylesBody3 }} component="span">
                    {project.plusNumber}
                  </Typography>
                </Box>
              }
            />
            {project.id === selectedId ? (
              <CheckIcon sx={{ color: '#7533EA', width: '32px', height: '32px' }} />
            ) : (
              <Button variant="outlined" onClick={() => selectedProject(project.id)} sx={{ ...buttonStyles, border: '1px solid #171717' }}>Choose</Button>
            )}
          </ListItem>
        ))}
      </List>
      </>
    </>
  );
};

export default ProjectListDropdown;
