import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainComponent from './MainComponent'; // Main component that includes the Accordion and other details
import JSONViewer from './JSONViewer'; // Component for displaying JSON data

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/concept" element={<MainComponent />} />
        <Route path="/" element={<JSONViewer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
