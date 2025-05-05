import { Typography, Box, TextField,InputLabel,Select, MenuItem, Button} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { textStylesBodyL2, textStylesH3, textStylesBody1} from '../../components/Styles/styles';
import CustomSelect from '../../common/CustomSelect/CustomSelect';
import { useState } from 'react';
import { useEffect } from 'react';

const PersonalInfoSettings = ({personalInfo, setPersonalInfo}) => {

  const [isEditing, setIsEditing] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleFieldClick = () => {
    setIsEditing(true);
  };

  return (
    <div>   
      <Typography variant="h3" sx={{...textStylesH3}}>
        Personal Information
    </Typography>
                   
      <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', paddingTop: '30px', paddingBottom: '24px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: '60px' }}>
          <InputLabel>
            <Typography sx={{ ...textStylesBodyL2, color: '#171717', lineHeight: '150%', textAlign: 'start', paddingBottom: '6px' }}>First name</Typography>
          </InputLabel>
          <TextField
            name="firstName"
            value={personalInfo.firstName}
            onChange={handleInputChange}
            onFocus={handleFieldClick}
            variant="outlined"
            sx={{
              width: '400px',
              '& .MuiInputLabel-root': { color: '#171717', top: '50%', transform: 'translateY(-50%)', padding: '0 14px' },
              '& .MuiInputLabel-root.Mui-focused': { color: '#171717' },
              '& .MuiOutlinedInput-root': {
                height: '44px',
                '&:hover fieldset': { borderColor: '#E2D5FF' },
                '&.Mui-focused fieldset': { borderColor: '#E2D5FF' },
              },
            }}
            InputProps={{ readOnly: !isEditing }}
            inputProps={{ style: { padding: '0 14px', borderColor: '#D0D5DD' } }}
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <InputLabel>
            <Typography sx={{ ...textStylesBodyL2, color: '#171717', lineHeight: '150%', textAlign: 'start', paddingBottom: '6px' }}>Last name</Typography>
          </InputLabel>
          <TextField
            name="lastName"
            value={personalInfo.lastName}
            onChange={handleInputChange}
            onFocus={handleFieldClick}
            variant="outlined"
            sx={{
              width: '400px',
              '& .MuiInputLabel-root': { color: '#171717', top: '50%', transform: 'translateY(-50%)', padding: '0 14px' },
              '& .MuiInputLabel-root.Mui-focused': { color: '#171717' },
              '& .MuiOutlinedInput-root': {
                height: '44px',
                '&:hover fieldset': { borderColor: '#E2D5FF' },
                '&.Mui-focused fieldset': { borderColor: '#E2D5FF' },
              },
            }}
            InputProps={{ readOnly: !isEditing }}
            inputProps={{ style: { padding: '0 14px', borderColor: '#D0D5DD' } }}
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', paddingBottom: '24px' }}>
          <InputLabel>
            <Typography sx={{ ...textStylesBodyL2, color: '#171717', lineHeight: '150%', textAlign: 'start', paddingBottom: '6px' }}>Email</Typography>
          </InputLabel>
          <TextField
            name="email"
            value={personalInfo.email}
            onChange={handleInputChange}
            onFocus={handleFieldClick}
            variant="outlined"
            sx={{
              width: '861px',
              '& .MuiInputLabel-root': { color: '#171717', top: '50%', transform: 'translateY(-50%)', padding: '0 14px' },
              '& .MuiInputLabel-root.Mui-focused': { color: '#171717' },
              '& .MuiOutlinedInput-root': {
                height: '44px',
                '&:hover fieldset': { borderColor: '#E2D5FF' },
                '&.Mui-focused fieldset': { borderColor: '#E2D5FF' },
              },
            }}
            InputProps={{ readOnly: !isEditing }}
            inputProps={{ style: { padding: '0 14px', borderColor: '#D0D5DD' } }}
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', width: '172px', paddingBottom: '6px' }}>
          <InputLabel>
            <Typography sx={{ ...textStylesBodyL2, color: '#171717', textAlign: 'start', paddingBottom: '6px' }}>Language</Typography>
          </InputLabel>
          <CustomSelect />
        </Box>
    </Box> 
      </div>
    
  );
};

export default PersonalInfoSettings;