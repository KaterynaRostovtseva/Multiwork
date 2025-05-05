import React from "react";
import { Button, Typography, Container, Box, CircularProgress } from '@mui/material';
import { textStylesH2, buttonStyles, } from '../components/Styles/styles';
import CheckIcon from "../assets/icons/check-circle.svg";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PageSuccessfulJoining = () => {
    const navigate = useNavigate();
  const { id } = useParams();

  const { projects } = useSelector((state) => state.projects);
  const project = projects?.data?.find((i) => i.id === Number(id));



    return (
        <Container component="main" maxWidth="xs">
            <Box display="flex" flexDirection="column" alignItems="center" textAlign="center"
                sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', }}>
                <Box component="img" src={CheckIcon} sx={{ width: '160px', height: '160px', textAlign: 'center' }} />
                <Typography variant="h6" component="h2" gutterBottom sx={{ ...textStylesH2, color: '#12B76A', margin:'24px 0' }}>
                    Congratulations! You have successfully joined the project {project?.title}
                </Typography>

                <Button variant="outlined" onClick={() => navigate(`/pageProjectId/${project?.id} `)} sx={{ ...buttonStyles, border: '1px solid #171717', width: '136px', height: '54px'  }}>
                    Continue
                </Button>
            </Box>
        </Container>

    );
};
export default PageSuccessfulJoining;