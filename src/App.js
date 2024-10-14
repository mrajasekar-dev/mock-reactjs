import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainComponent from './MainComponent'; // Main component that includes the Accordion and other details
import JSONViewer from './JSONViewer'; // Component for displaying JSON data

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainComponent />} />
        <Route path="/concept" element={<JSONViewer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
