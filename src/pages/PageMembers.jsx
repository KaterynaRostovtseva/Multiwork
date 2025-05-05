import React, { useState,  } from "react";
import { Box, Typography, } from '@mui/material';
import Grid from '@mui/material/Grid2';
import SideBar from '../components/SideBar';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import MockDataUsers from "../components/Mock/MockDataUsers";
import CardDataTopUsers from '../components/CardDataTopUsers';
import { getAllSkills} from '../store/Slice/skillsSlice';
import { useSelector } from 'react-redux';
import SkillsAutocomplete from '../components/SkillsAutocomplete';




const PageMembers = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const dataUsers = MockDataUsers() || [];
    const state = useSelector((state) => state);
    const dataSkills = getAllSkills(state);
    const dataSkillsOptions = dataSkills.data;

    const totalPages = Math.ceil(dataUsers.length / itemsPerPage);
    const currentData = dataUsers.slice(
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
                <Grid sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '40px', }}>
                    <Grid sx={{ display: 'flex', gap: 2 }}>
                        <SkillsAutocomplete dataSkillsOptions={dataSkillsOptions} selectedOption={selectedOption} handleChange={handleChange} />
                    </Grid>
                </Grid>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, width: '100%' }}>
                    {currentData.map((item, index) => (
                        <Box key={index} sx={{ flex: '1 1 calc(33.333% - 24px)', maxWidth: '360px' }}>
                            <CardDataTopUsers prop={item} />
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

export default PageMembers;

