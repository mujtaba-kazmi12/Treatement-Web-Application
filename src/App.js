import React, { useState } from 'react';
import './App.css'; // Make sure to include your CSS styles
import MainPage from './Components/MainPage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactForm from './Components/FormSubmit';
import Page from './Components/Page';
const App = () => {
return (
   
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/form" element={<ContactForm />} />
          <Route path="/page" element={<Page />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
