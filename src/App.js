import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MainComponent from './MainComponent'; // Main component that includes the Accordion and other details
import JSONViewer from './JSONViewer'; // Component for displaying JSON data

const theme = createTheme({
  palette: {
      primary: {
          main: '#3f51b5',
      },
      secondary: {
          main: '#f50057',
      },
  },
});

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/concept" element={<MainComponent />} />
        <Route path="/" element={<ThemeProvider theme={theme}>
            <JSONViewer />
        </ThemeProvider>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
