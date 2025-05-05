import React, { useState } from 'react';
import { Chip, Grid, IconButton, InputBase, Typography } from '@mui/material';
import { textStylesBody3, textStylesBodyM } from '../components/Styles/styles';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import testIconBlack from '../assets/icons/testIconCubeBlack.svg';
import testIconWhite from '../assets/icons/tetsIconCubeWhite.svg';

import Box from '@mui/material/Box';
const skillsData = [
  '3D Design',
  'Art',
  'Copywriting',
  'Web Development',
  'Graphic Design',
  'Data Analysis',
  'Digital Marketing',
  'Project Management',
  'UI/UX Design',
  'Photography',
  'Video Editing',
  'Content Creation',
  'SEO Optimization',
  'Software Engineering',
  'Machine Learning',
  'Cybersecurity',
  'Mobile Development',
  'Cloud Computing',
  'Blockchain',
  'Game Development',
  'Social Media Management',
  'Financial Analysis',
  'Customer Service',
  'Technical Writing',
  'Product Design',
  'Public Speaking',
  'Business Strategy',
  'Network Security',
  'Artificial Intelligence',
  'DevOps',
  'Content Strategy',
  'E-commerce',
  'Human Resources',
  'Sales',
  'Accounting',
  'Legal Research',
  'Event Planning',
  'Brand Management',
  'Software Testing',
  'Supply Chain Management',
  'Animation',
  'Music Production',
  'Biomedical Engineering',
  'Environmental Science',
  'Physics Research',
  'Data Visualization',
  'CRM Management',
  'Quantum Computing',
  'Agriculture Technology',
  'Robotics',
];
const selectableSkills = ['3D Design', 'Art', 'Copywriting']; // Example selected skills

const SkillsSlider = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 24; // Количество элементов на одной странице

  const handleSelectSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((e) => e !== skill) : [...prev, skill]
    );
  };

  const handleRemoveSkill = (skill) => {
    setSelectedSkills((prev) => prev.filter((s) => s !== skill));
  };

  const handleChangePage = (_, value) => {
    setPage(value);
  };

  const displayedSkills = skillsData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <>
      {/* search input Start  */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: '24px',
          px: 0,
          position: 'relative',
        }}
      >
        <InputBase
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search"
          sx={{
            flex: 1,
            ml: 0,
            border: '1px solid rgba(208, 213, 221, 1)',
            padding: '8px 50px 8px 14px',
            borderRadius: '4px',
          }}
        />
        <IconButton sx={{ position: 'absolute', right: '10px' }}>
          <SearchIcon />
        </IconButton>
      </Box>
      {/* search input END  */}
      {/* Стрелки PREV NEXT START  */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <IconButton
          onClick={() => handleChangePage(null, page - 1)}
          disabled={page === 1}
        >
          <ArrowBackIosNewIcon sx={{ fontSize: '16px' }} />
          <Typography
            sx={{
              ml: '8px',
              ...textStylesBodyM,
              fontSize: '16px',
              lineHeight: '120%',
              color: page === 1 ? '#a2a2a2' : 'black',
            }}
          >
            Previous
          </Typography>
        </IconButton>
        <IconButton
          onClick={() => handleChangePage(null, page + 1)}
          disabled={page === Math.ceil(skillsData.length / itemsPerPage)}
        >
          <Typography
            sx={{
              mr: '8px',
              ...textStylesBodyM,
              fontSize: '16px',
              lineHeight: '120%',
              color:
                page === Math.ceil(skillsData.length / itemsPerPage)
                  ? '#a2a2a2'
                  : 'black',
            }}
          >
            Next
          </Typography>
          <ArrowForwardIosIcon sx={{ fontSize: '16px' }} />
        </IconButton>
      </Box>
      {/* Стрелки PREV NEXT START  */}
      {/* skills start  */}
      <Grid
        container
        spacing={0}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          gap: '15px',
          width: '100%',
          maxWidth: '875px',
          minHeight: '492px',
          marginBottom: '16px',
          marginTop: 0,
          marginLeft: 0,
          boxSizing: 'border-box',

          '@media (max-width: 768px)': {
            maxWidth: '100%',
          },
        }}
      >
        {displayedSkills
          .filter((e) =>
            e.toLocaleUpperCase().includes(filter.toLocaleUpperCase())
          )
          .map((skill, index) => (
            <Grid
              item
              xs="auto"
              key={index}
              sx={{
                flexGrow: 1,
                minWidth: '100px',
                '@media (max-width: 768px)': {
                  minWidth: '80px',
                },
              }}
            >
              <Box
                onClick={() => handleSelectSkill(skill)}
                sx={{
                  userSelect: 'none',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '8px',
                  padding: '10px 24px',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease-in-out',
                  backgroundColor: selectedSkills.includes(skill)
                    ? '#814aeb'
                    : '#efe8ff',
                  height: '96px',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: selectedSkills.includes(skill)
                      ? '#814aeb'
                      : '#efe8ff',
                  },
                }}
              >
                <img
                  src={
                    selectedSkills.includes(skill)
                      ? testIconWhite
                      : testIconBlack
                  }
                  alt=""
                  style={{ width: '40px', height: '40px' }}
                />
                <Typography
                  sx={{
                    ...textStylesBodyM,
                    textAlign: 'left',
                    verticalAlign: 'end',
                    color: selectedSkills.includes(skill) ? '#e8e8e8' : '#000',
                    fontSize: '16px',
                    textWrap: 'nowrap',
                  }}
                >
                  {skill}
                </Typography>
              </Box>
            </Grid>
          ))}
      </Grid>

      {/* skills END  */}
      {/* Selected skills section START */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          mt: 3,
          gap: '12px',
          marginBottom: '40px',
          ...textStylesBody3,
          fontSize: '18px',
        }}
      >
        {selectedSkills.map((skill, index) => (
          <Chip
            key={index}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', padding: 0 }}>
                <img
                  src={testIconBlack}
                  alt=""
                  style={{ width: '24px', height: '24px', marginRight: '10px' }}
                />
                {skill}
              </Box>
            }
            onDelete={() => handleRemoveSkill(skill)}
            sx={{
              ...textStylesBody3,
              fontSize: '18px',
              border: '1px solid black',
              borderRadius: '8px',

              height: '44px',
              backgroundColor: 'white',
              justifyContent: 'space-between',
            }}
            deleteIcon={
              <CancelIcon sx={{ fill: '#FDA29B', width: '24', height: '24' }} />
            }
          />
        ))}
      </Box>
      {/* Selected skills section END */}
    </>
  );
};
export default SkillsSlider;
