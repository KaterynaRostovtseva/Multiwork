import React from 'react';
import { TextField, InputAdornment, Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onChange, isHeader = false }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
  const isExtraSmall = useMediaQuery('(max-width: 600px)'); 

  return (
    <Box sx={{ maxWidth: isHeader ? '500px' : '400px' }}>
      {isExtraSmall ? (
        <IconButton>
          <SearchIcon />
        </IconButton>
      ) : (
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder={isMobile ? "" : "Search"}
          onChange={onChange}
          autoComplete="off"
          autoCorrect="off"
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#fff',
              borderRadius: '50px',
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#814AEB',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      )}
    </Box>
  );
};

export default SearchBar;

