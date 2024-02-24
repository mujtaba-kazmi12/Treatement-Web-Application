import React, { useState } from 'react';
import './App.css'; // Make sure to include your CSS styles
import MainPage from './Components/MainPage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
return (
    
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
