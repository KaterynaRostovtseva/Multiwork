import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Autocomplete } from '@mui/material';
import Grid from '@mui/material/Grid2';
import SideBar from '../components/SideBar';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { Button } from '@mui/material';
import MockDataProject from "../components/Mock/MockDataProject";
import CardDataTopProjects from '../components/CardDataTopProjects';
import { getAllSkills} from '../store/Slice/skillsSlice';
import { useSelector } from 'react-redux';
import { textStylesH2} from '../components/Styles/styles';
import SkillsAutocomplete from '../components/SkillsAutocomplete';
import DateCalendar from '../components/DateCalendar';

const PageTopProjects = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const dataProject = MockDataProject() || [];
    const state = useSelector((state) => state);
    const dataSkills = getAllSkills(state);
    const dataSkillsOptions = dataSkills.data;

    const totalPages = Math.ceil(dataProject.length / itemsPerPage);
    const currentData = dataProject.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const handleChange = (event, newValue) => {
        setSelectedOption(newValue);
    };



    return (
        <Grid container sx={{ display: 'flex',  flexDirection: { xs: 'column', md: 'row' }, marginTop: '-108px' }}>
            <SideBar />

            <Grid sx={{ flex: 1, margin: { xs: '138px 16px 0 16px', md: '138px 80px 80px 80px' } }}>
            <Grid sx={{ display: 'flex', justifyContent: 'space-between', }}>
                    <Typography sx={{ ...textStylesH2, marginBottom: '40px' }}>Top projects</Typography>
                    <Grid sx={{ display: 'flex', gap: 2 }}>
                        <SkillsAutocomplete dataSkillsOptions={dataSkillsOptions} selectedOption={selectedOption} handleChange={handleChange} />
                        <DateCalendar />
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2,  }}>
                    {currentData.slice(0, 3).map((item, index) => (
                        <Box key={index} sx={{  }}>
                            <CardDataTopProjects prop={item} />
                        </Box>
                    ))}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e0e0e0', paddingTop: '20px' }}>
                    <Typography>
                        Page {currentPage} of {totalPages}
                    </Typography>

                    <Box sx={{ display: 'flex' }}>
                        <Button sx={{ textTransform: 'capitalize', color: currentPage === 1 ? '#9e9e9e' : '#000', }} variant="text" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                            Previous
                        </Button>

                        <Button sx={{ textTransform: 'capitalize', color: currentPage === totalPages ? '#9e9e9e' : '#000', }} variant="text" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                            Next
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default PageTopProjects;

