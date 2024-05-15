import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import DemandeProdPage from './pages/DemandeProdPage';
import Admin_systemPage from "./pages/Admin_systemPage";
import DemandePage from "./pages/DemandePage";
import ReponsePage from "./pages/ReponsePage";
import Layout from "./layouts/Layout";
import MainLayout from "./layouts/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* <Route path="/demande-prod/*" element={<DemandeProdPage />} /> */}
          <Route path="/demande/*" element={<DemandePage />} />
          <Route path="/reponse/*" element={<ReponsePage />} />
          <Route path="/check-collection/*" element={<Admin_systemPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
