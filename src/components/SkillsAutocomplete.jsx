import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { IMAGES_URL } from "../config";

export default function SkillsAutocomplete({ dataSkillsOptions, selectedOption, handleChange}) {

  return (
    <Autocomplete id="skills-dropdown" options={dataSkillsOptions || []} getOptionLabel={(option) => option?.skillName || ""} value={selectedOption} onChange={handleChange} renderInput={(params) => (
        <TextField {...params} label="Skills" variant="outlined" 
        sx={{  fontFamily: "Open Sans, sans-serif", "& .MuiOutlinedInput-root": {"&.Mui-focused fieldset": {borderColor: "#814AEB"}}, "& .MuiInputLabel-root.Mui-focused": {fontFamily: "Open Sans, sans-serif", color: "#814AEB"} }}/>)}
        renderOption={(props, option) => {
          const iconPath = Array.isArray(option.icon) ? option.icon[0]?.url : option.icon?.url;
          const iconUrl = iconPath ? `${IMAGES_URL}${iconPath}` : '/default-icon.svg';
        
          return (
            <li {...props} key={option.id || option.skillName} style={{ display: 'flex', alignItems: 'center' }}>
              {iconPath && (
                <img
                  src={iconUrl}
                  alt={option?.skillName}
                  style={{ marginRight: '8px', width: '24px', height: '24px' }}
                />
              )}
              {option?.skillName}
            </li>
          );
        }}
        
            sx={{width: 200}}/>
  );
}
