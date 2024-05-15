import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import DemandeProdPage from './pages/DemandeProdPage';
import Admin_systemPage from './pages/Admin_systemPage';
import DemandePage from './pages/DemandePage';
import ReponsePage from './pages/ReponsePage';


function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/demande-prod/*" element={<DemandeProdPage />} /> */}
        <Route path="/demande/*" element={<DemandePage />} />
        <Route path="/reponse/*" element={<ReponsePage />} />
        <Route path="/check-collection/*" element={<Admin_systemPage />} />
      </Routes>
    </Router>
  );
}

export default App;
