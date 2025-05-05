import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppContent from './AppContent';
import './App.css';


const theme = createTheme({
  typography: {
    fontFamily: '"Open Sans", sans-serif', 
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;


