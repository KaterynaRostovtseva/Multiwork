import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, Box, GlobalStyles } from "@mui/material";


export default function DateCalendar({ value, onChange }) {

  const handleClear = () => {
    onChange(null);
  };

  return (
    <>
      <GlobalStyles
        styles={{
          ".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#814AEB !important",
          },
          ".MuiInputLabel-root.Mui-focused": {
            color: "#814AEB !important",
          },
          ".MuiPickersDay-root:hover": {
            backgroundColor: "#F2E8FF !important",
          },
          ".MuiPickersDay-root.Mui-selected": {
            backgroundColor: "#814AEB !important",
            color: "#FFFFFF !important",
          },
          ".MuiPickersDay-root.Mui-selected:hover": {
            backgroundColor: "#814AEB !important",
          },
        }}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1 }}>
          <MuiDatePicker label="Start date" value={value} onChange={onChange} format="DD/MM/YYYY"/>
          {value && (
            <Button variant="text" size="small" onClick={handleClear} sx={{ color: '#814AEB', textTransform: 'none', padding: 0, minHeight: '24px' }}>
              Clear date
            </Button>
          )}
        </Box>
      </LocalizationProvider>
    </>
  );
}