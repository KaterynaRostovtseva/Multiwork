import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import SideBar from '../components/SideBar';
import CardDataTopProjects from '../components/CardDataTopProjects';
import { fetchSkills } from '../store/Slice/skillsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { textStylesH2 } from '../components/Styles/styles';
import DateCalendar from '../components/DateCalendar';
import SkillsAutocomplete from '../components/SkillsAutocomplete';
import { fetchProjects } from "../store/Slice/projectSlice";
import dayjs from 'dayjs';

const PageCompletedAllProjects = () => {
    const dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const dataAllProjects = useSelector((state) => {
        return Array.isArray(state.projects?.projects) ? state.projects.projects : [];
    });

    const skills = useSelector((state) => state.skills?.skills || []);

    useEffect(() => {
        dispatch(fetchProjects());
        dispatch(fetchSkills());
    }, [dispatch]);

    const dataSkillsOptions = Array.isArray(skills) ? skills.map(skill => ({ label: skill.skillName, value: skill.id, icon: skill.icon, skillName: skill.skillName, })) : [];

    const completedProjects = dataAllProjects
        .filter(i => i.project_status === 'Completed')
        .filter(project => {
            if (!selectedOption) return true;
            return project.skills?.some(skill => skill.id === selectedOption.value);
        })
        .filter(project => {
            if (!selectedDate) return true;

            if (!dayjs(selectedDate).isValid()) {
                console.error('Invalid selectedDate');
                return true;
            }

            if (!dayjs(project.createdAt).isValid()) {
                console.error('Invalid project.createdAt');
                return false;
            }

            const projectDate = dayjs(project.createdAt).startOf('day');
            const filterDate = dayjs(selectedDate).startOf('day');

            return projectDate.isSame(filterDate, 'day');
        });


    const totalPages = Math.ceil(completedProjects.length / itemsPerPage);
    const currentData = completedProjects.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleChange = (event, option) => {
        setSelectedOption(option);
        setCurrentPage(1);
    };

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
        setCurrentPage(1);
    };

    return (
        <Grid container sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, marginTop: '-108px' }}>
            <SideBar />
        <Grid sx={{ flex: 1, margin: { xs: '138px 16px 0 16px', md: '138px 80px 80px 80px' } }}>
                <Grid sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', md: 'row' } }}>
                    <Typography sx={{ ...textStylesH2, marginBottom: '40px' }}> Completed projects</Typography>
                    <Grid sx={{ display: 'flex', gap: 2 }}>
                        <SkillsAutocomplete dataSkillsOptions={dataSkillsOptions} selectedOption={selectedOption} handleChange={handleChange} />
                        <DateCalendar value={selectedDate} onChange={handleDateChange} />
                    </Grid>
                </Grid>

                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {currentData.length === 0 ? (
                        <Typography>No projects found.</Typography>
                    ) : (
                        currentData.map((item, index) => (
                            <Box key={index}>
                                <CardDataTopProjects prop={item} />
                            </Box>
                        ))
                    )}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e0e0e0', margin: '32px 0' }}>
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

export default PageCompletedAllProjects;

