import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MainComponent from './MainComponent';
import JSONViewer from './JSONViewer';

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
