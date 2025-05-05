import React, { useState, useEffect} from 'react';
import { Modal, Box, Typography, TextField, Button, InputAdornment,  CircularProgress  } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { textStylesBodyL2, textStylesBody2, buttonStylesModalCancel, buttonStylesModal } from '../Styles/styles';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import ImageCropper from '../ImageCropper/ImageCropper';
import up from '../../assets/icons/up.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createProject, fetchProjects } from '../../store/Slice/projectSlice';
import {fetchSkills, getAllSkills} from '../../store/Slice/skillsSlice';
import { IMAGES_URL } from "../../config";
import { useTheme, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';



const CreateProjectModal = ({ showModal,closeModal }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));    
    const token = useSelector(state => state.auth.token);
    const userId = useSelector(state => state.auth?.user?.id);
    const dataSkills = useSelector(getAllSkills);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const [croppedImage, setCroppedImage] = useState('');
    const [, setImgSrc] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
   

    const handleDescriptionChange = (event) => {
        const { value } = event.target;
        if (value.length <= 1000) {
            setDescription(value);
        }
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const formatButtonText = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    };

    const isFormValid = Boolean(title && description && selectedSkills.length > 0 && croppedImage);

    useEffect(() => {
        dispatch(fetchSkills());
    }, [dispatch]);
    

    const handleCancel = () => {
        setDescription('');
        setTitle('');
        setSelectedSkills([]);
        setCroppedImage(null);
        closeModal()
    };

    const handleSkillsChange = (event, newValue) => {

        setSelectedSkills(newValue);
    };

    const handleCropComplete = (croppedImageUrl) => {
        setCroppedImage(croppedImageUrl);
    };

    const getFile = (dataurl, filename) => {
   
        var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});    
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true); 
    
        const projectData = {
            title: event.target.title.value,
            description: event.target.description.value,
            project_status: 'Active',
        };
        const skills = selectedSkills.map(skill => skill.id);
        const coverImage = getFile(croppedImage, "avatar"); 
        try {
            const response = await dispatch(createProject({ projectData, coverImage, skills, token, userId }));
            await dispatch(fetchProjects());
            const projectId = response.payload.data?.id;
            localStorage.setItem('newId', projectId);
            navigate(`/pageMyProject/${projectId}`);
            handleCancel();
        } catch (error) {
            console.error('Failed to create project:', error);
        } finally {
            setIsLoading(false); 
        }
    };

    const handleReplace = () => {
        setCroppedImage(null);
        setImgSrc('');
    };

    return (
        <Modal open={showModal} onClose={closeModal}  sx={{ backgroundColor: 'rgba(65, 66, 65, 0.85)'}}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',  width:{xs:'90%',sm:'90%', md:"80%", lg:'60%'},   height: {xs:'90%',sm:'90%', md:"80%", lg:'80%'}, overflowY: isMobile ? 'auto' : 'visible', bgcolor: '#fff', borderRadius: '16px', boxShadow: 24,   p: isMobile ? 2 : 4,  position: 'relative',}}>
                <IconButton  onClick={closeModal}  sx={{ position: 'absolute', top: 10, right: 10, color: '#814AEB',}}>
                    <CloseIcon />
                </IconButton>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex',  flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row' }, alignItems: { xs: 'flex-start', sm: 'flex-start', lg: 'flex-start' } , marginBottom: 2 }}>
                        {croppedImage ? (
                            <Box sx={{ flexShrink: 0,  margin:{  sm: '0 40px 16px 0', lg: '40px 100px 0 40px'}, alignItems: { xs: 'flex-start', sm: 'flex-start', lg: 'center' } }}>
                                <Typography variant="body1" sx={{...textStylesBodyL2, textAlign: 'left' }}>Project Cover</Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: isMobile ? 0 : '40px', }}>
                                    <img src={croppedImage} alt="Cropped" style={{ margin: '8px 0', width: {xs:180, sm:180, lg:230},   height: isMobile ? 180 : 230, borderRadius:'50%', border:'5px solid #fff', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }} />
                                    <Button variant="text" onClick={handleReplace} onMouseDown={(e) => e.preventDefault()} sx={{ ...buttonStylesModalCancel, color: '#814AEB', display: 'flex', alignItems: 'center', }}>
                                        <Box component="img" src={up} alt="Upload Icon" sx={{ width: 20, marginRight: 1 }} />
                                        Replace
                                    </Button>
                                </Box>
                            </Box>

                        ) : (
                            <Box sx={{ flexShrink: 0, margin: { sm: '0 40px 16px 0', lg: '40px 100px 0 40px'}, alignItems: { xs: 'flex-start', lg: 'center'},}}>
                                <Typography variant="body1" sx={{ marginBottom: 1, ...textStylesBodyL2, textAlign: 'left' }}>Project Cover</Typography>
                                <ImageCropper onCropComplete={handleCropComplete} />
                            </Box>
                        )}

                        <Box sx={{ flexGrow: 1, width: '100%', margin: isMobile ? '0' : '40px 0 40px 0' }}>
                            <Typography variant="body1" sx={{ ...textStylesBodyL2, textAlign: 'left', marginBottom: 1 }}>Project Title</Typography>
                            <TextField
                                placeholder="Give your project a title"
                                variant="outlined"
                                fullWidth
                                sx={{ ...textStylesBody2, marginBottom: 2, color: '#667085', '& .MuiInputLabel-root.Mui-focused': { color: '#814AEB' }, '& .MuiInputBase-root.Mui-focused': { borderColor: '#814AEB' }, '& .MuiOutlinedInput-root': { '&:hover fieldset': { borderColor: '#814AEB' }, '&.Mui-focused fieldset': { borderColor: '#814AEB' },} }}
                                required
                                name="title"
                                value={title}
                                onChange={handleTitleChange}
                            />
                            <Typography variant="body1" sx={{ ...textStylesBodyL2, textAlign: 'left', marginBottom: 1 }}>Description Of Project</Typography>
                            <TextField
                                placeholder="Enter a description..."
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                sx={{ ...textStylesBody2, marginBottom: 1, color: '#667085','& .MuiInputLabel-root.Mui-focused': { color: '#814AEB' }, '& .MuiInputBase-root.Mui-focused': { borderColor: '#814AEB' }, '& .MuiOutlinedInput-root': { '&:hover fieldset': { borderColor: '#814AEB' }, '&.Mui-focused fieldset': { borderColor: '#814AEB' },}  }}
                                required
                                value={description}
                                onChange={handleDescriptionChange}
                                inputProps={{ maxLength: 1000 }}
                                name="description"
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 1 }}>
                                <Typography variant="caption" sx={{ ...textStylesBody2, color: '#667085', fontSize: '14px' }}>
                                    {description.length}/1000
                                </Typography>
                            </Box>
                            <Typography variant="body1" sx={{ ...textStylesBodyL2, textAlign: 'left', marginBottom: 1 }}>Skills</Typography>
                            <Autocomplete
                                sx={{'& .MuiInputLabel-root.Mui-focused': { color: '#814AEB' }, '& .MuiInputBase-root.Mui-focused': { borderColor: '#814AEB' }, '& .MuiOutlinedInput-root': { '&:hover fieldset': { borderColor: '#814AEB' }, '&.Mui-focused fieldset': { borderColor: '#814AEB' },} }}
                                multiple
                                id="skills-select"
                                options={dataSkills || []}
                                getOptionLabel={(option) => option.skillName || option.documentId || `Skill ${option.id}`}
                                value={selectedSkills}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                onChange={handleSkillsChange}
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => {
                                        const tagProps = getTagProps({ index });
                                        return (
                                            <Chip
                                                key={option.id || index} 
                                                label={option.skillName}
                                                onDelete={getTagProps({ index }).onDelete}
                                                className={getTagProps({ index }).className}
                                                sx={{
                                                    fontFamily: 'Open Sans, sans-serif ',
                                                    fontSize: '14px',
                                                    backgroundColor: '#E2D5FF',
                                                    '& .MuiChip-deleteIcon': {
                                                        color: '#F97066',
                                                    },
                                                }}
                                            />
                                        );
                                    })
                                }
                                renderOption={(props, option) => {
                                    const { key, ...restProps } = props;
                                    const iconPath = option?.icon?.url;
                                    const iconUrl = iconPath ?`${IMAGES_URL}${iconPath}` : '/path/to/default-icon.svg';
    
                                    return (
                                        <li {...restProps} key={option.id || option.skillName} style={{ display: 'flex', alignItems: 'center' }}>
                                            {iconUrl && (
                                                <img src={iconUrl} alt={option?.skillName} style={{ marginRight: '8px', width: '24px', height: '24px' }} />
                                            )}
                                            {option?.skillName}
                                        </li>
                                    );
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        placeholder={!isFocused && selectedSkills.length === 0 ? "Search skills" : ""}
                                        InputProps={{
                                            ...params.InputProps,
                                            startAdornment: (
                                                <>
                                                    <InputAdornment position="start">
                                                        <SearchIcon />
                                                    </InputAdornment>
                                                    {params.InputProps.startAdornment}
                                                </>
                                            ),
                                        }}
                                    />
                                )}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end',   flexDirection: { xs: 'column', sm:'row', lg: 'row' }, gap: 2}}>
                        <Button variant="text" type="button" onClick={handleCancel} sx={{ marginRight: 2, ...buttonStylesModalCancel }}>
                            Cancel
                        </Button>
                        <Button variant="contained" type="submit" disabled={!isFormValid || isLoading} sx={{ ...buttonStylesModal }}>
                        {isLoading ? (<> <CircularProgress size={20} sx={{ color: '#814AEB', marginRight: 1 }} /> Creating... </>) : formatButtonText("Create a project")}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default CreateProjectModal;

