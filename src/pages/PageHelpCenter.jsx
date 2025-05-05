import React, { useState, useEffect } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, IconButton, CircularProgress, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, } from '@mui/material';
import Grid from '@mui/material/Grid2';
import SideBar from '../components/SideBar';
import { textStylesH1, textStylesH2, textStylesH3, textStylesBody2, textStylesBodyL2, buttonStylesModal, textStylesBody1 } from '../components/Styles/styles';
import { Add, Remove } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { sendHelpRequest, resetHelpRequestState } from '../store/Slice/helpRequestSlice';
import { useDispatch, useSelector } from 'react-redux';


const items = [
    {
        title: "How can I join a project?",
        content: "To join a project, go to the 'Active Projects' tab, find the project you need, and click the 'View' button to access the project page. Then, click 'Join the project.' The project administrator will review your request and send a response."
    },
    {
        title: "How do I delete a project?",
        content: "To delete a project, go to the project settings, scroll down, and click the 'Delete Project' button."
    },
    {
        title: "What should I do if I haven't received a response to my project request?",
        content: "First, check the 'Other' section in your notifications. If there's no response, you can contact the project administrator via the social media links in their profile to follow up on your request."
    },
    {
        title: "How can I hide a project from other users in my profile?",
        content: "To hide a project from others, go to your profile editing page, select the Projects tab, and click 'Hide' on the relevant project card. You can always undo this action in the Hidden tab."
    },
    {
        title: "What should I do if I'm not receiving notifications?",
        content: "Check your notification settings under the Settings tab and make sure push notifications are enabled. Also, verify your device’s system notification settings."
    },
    {
        title: "How do I deactivate my account?",
        content: "To deactivate your account, go to your profile settings, scroll down to the 'My Account' section, and click 'Account Deactivation.' You’ll be asked to confirm, and your account will be temporarily disabled. You can reactivate it anytime by logging in again."
    },
    {
        title: "What happens if a project is marked as 'Completed'?",
        content: "When a project is marked as completed, it moves to the 'Completed Projects' tab in your profile. Other users will not be able to join, but they can still view the project’s details."
    },
    {
        title: "How can I reset my password if I forgot it?",
        content: "If you forget your password, click 'Forgot Password' on the login page and follow the instructions to reset it via email."
    }
];

const leftColumn = items.slice(0, 4);
const rightColumn = items.slice(4);

const PageHelpCenter = () => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(null);
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const { loading, success, error } = useSelector((state) => state.helpRequest);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (index) => (_, isExpanded) => {
        setExpanded(isExpanded ? index : null);
    };

    const handleMessageChange = (event) => {
        const { value } = event.target;
        if (value.length <= 1000) {
            setMessage(value);
        }
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const formatButtonText = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    };

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const isFormValid = Boolean(message.trim() && email.trim() && validateEmail(email));


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting || !isFormValid) return;
        setIsSubmitting(true);
        await dispatch(sendHelpRequest({ email, message }));
        setIsSubmitting(false);
    };

    useEffect(() => {
        if (success) {
            setEmail('');
            setMessage('');
            dispatch(resetHelpRequestState());
            navigate('/pageSuccessHelpCenter');
        }
    }, [success, dispatch, navigate]);

    return (
        <Grid container sx={{ flexDirection: { xs: 'column', md: 'row' }, marginTop: { xs: '0', md: '-108px' } }}>
            <SideBar />

            <Grid sx={{ flex: 1, margin: { xs: '40px 16px 0 16px', md: '138px 80px 80px 80px' } }}>

                <Typography sx={{ ...textStylesH1, textAlign: 'left' }}>Help Center</Typography>
                <Typography sx={{ ...textStylesH2, margin: '40px 0', textAlign: 'center' }}>How can we help you?</Typography>

                <Grid container spacing={4} sx={{ marginTop: '24px', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, flexWrap: 'wrap', gap: { xs: '12px', md: '24px' } }}>
                    <Grid sx={{ flex: 1, minWidth: { xs: '100%', md: '40%' } }} key="left-column">
                        {leftColumn.map((item, index) => (
                            <Accordion key={index} expanded={expanded === index} onChange={handleChange(index)} sx={{ boxShadow: "none", borderBottom: "1px solid #ccc", '&:before': { display: 'none' } }}>
                                <AccordionSummary expandIcon={<IconButton sx={{ backgroundColor: '#F4EBFF', borderRadius: '50%', marginLeft: '8px', }}>{expanded === index ? <Remove sx={{ color: '#814AEB' }} /> : <Add sx={{ color: '#814AEB' }} />}</IconButton>}>
                                    <Typography sx={{ ...textStylesH3, marginRight: '8px' }}>{item.title}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography sx={{ ...textStylesBody2, textAlign: 'left' }}>{item.content}</Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Grid>

                    <Grid sx={{ flex: 1, minWidth: { xs: '100%', md: '40%' } }} key="right-column">
                        {rightColumn.map((item, index) => (
                            <Accordion key={index + 4} expanded={expanded === index + 4} onChange={handleChange(index + 4)} sx={{ boxShadow: "none", borderBottom: "1px solid #ccc", '&:before': { display: 'none' } }}>
                                <AccordionSummary expandIcon={<IconButton sx={{ backgroundColor: '#F4EBFF', borderRadius: '50%', marginLeft: '8px', }}>{expanded === index + 4 ? <Remove sx={{ color: '#814AEB' }} /> : <Add sx={{ color: '#814AEB' }} />}</IconButton>}>
                                    <Typography sx={{ ...textStylesH3, marginRight: '8px' }}>{item.title}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography sx={{ ...textStylesBody2, textAlign: 'left', }}>{item.content}</Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Grid>
                </Grid>
                <Grid container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '100px 0', }}>
                    <Typography sx={{ fontWeight: '600', fontSize: { xs: '16px', sm: '20px', md: '24px' }, textAlign: 'center', }}>
                        Can't find what you're looking for?
                    </Typography>

                    <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '620px' }}>
                        <Box sx={{ margin: '40px 0', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                            <Typography variant="body1" sx={{ ...textStylesBodyL2, textAlign: 'left', marginBottom: 1 }}>
                                Email*
                            </Typography>
                            <TextField placeholder="Enter your email address" variant="outlined" fullWidth
                                sx={{ ...textStylesBody2, width: '100%', marginBottom: 2, color: '#667085', '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#814AEB', }, }}
                                required name="Email" value={email} onChange={handleEmailChange} />
                            <Typography variant="body1" sx={{ ...textStylesBodyL2, textAlign: 'left', marginBottom: 1 }}>
                                Message
                            </Typography>
                            <TextField placeholder="Enter a message..." variant="outlined" fullWidth multiline rows={4}
                                sx={{ ...textStylesBody2, width: '100%', marginBottom: 1, color: '#667085', '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#814AEB', }, }}
                                required value={message} onChange={handleMessageChange} inputProps={{ maxLength: 1000 }} name="Message" />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 1 }}>
                                <Typography variant="caption" sx={{ ...textStylesBody2, color: '#667085', fontSize: '14px' }} >
                                    {message.length}/1000
                                </Typography>
                            </Box>

                            <Button variant="contained" type="submit" disabled={!isFormValid || loading} sx={{ ...buttonStylesModal, width: '169px', height: '44px' }}>
                                {loading ? ( (<> <CircularProgress size={20} sx={{ color: '#814AEB', marginRight: 1 }} /> Creating... </>)) : ( formatButtonText('Submit a request') )}
                            </Button>
                        </Box>
                    </form>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default PageHelpCenter;




