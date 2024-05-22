// import React from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import LoginPage from "./pages/LoginPage";
// import MainLayout from "./layouts/Layout";
// import Admin_systemPage from "./pages/Admin_systemPage";
// import DemandePage from "./pages/DemandePage.jsx";
// import ReponsePage from "./pages/ReponsePage";
// import DeployPage from "./pages/DeployPage";
// import Moa_testPage from "./pages/Moa_testPage.jsx";
// import SuiviePage from "./pages/SuiviePage.jsx";
// // import ProtectedRoute from './components/ProtectedRoute';


// function App() {
//   const isAuthenticated = localStorage.getItem('authToken'); // Check if the user is authenticated

//   return (
//     <Router>
//       <Routes>
//         <Route path="/login/*" element={<LoginPage />} />
//         <Route path="/" element={isAuthenticated ? <MainLayout /> : <Navigate replace to="/login" />}>
//           <Route path="/demande/*" element={<DemandePage />} />
//           <Route path="/reponse/*" element={<ReponsePage />} />
//           <Route path="/Check-MOA/*" element={<Moa_testPage />} />
//           <Route path="/check-collection/*" element={<Admin_systemPage />} />
//           <Route path="/deploiement/*" element={<DeployPage />} />
//           <Route path="/suivie_d_etat/*" element={<SuiviePage />} />
//           {/* Redirect to login if not authenticated */}
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./layouts/Layout";
import Admin_systemPage from "./pages/Admin_systemPage";
import DemandePage from "./pages/DemandePage.jsx";
import ReponsePage from "./pages/ReponsePage";
import DeployPage from "./pages/DeployPage";
import Moa_testPage from "./pages/Moa_testPage.jsx";
import Unauthorized from "./pages/Unauthorized"; // Import the Unauthorized component
import ProtectedRoute from './components/ProtectedRoute';
import SuiviePage from "./pages/SuiviePage.jsx";



// import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const isAuthenticated = localStorage.getItem('authToken'); // Check if the user is authenticated

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/" element={isAuthenticated ? <MainLayout /> : <Navigate replace to="/login" />}>
          <Route path="/demande" element={
            <ProtectedRoute role="team_lead">
              <DemandePage />
            </ProtectedRoute>
          } />
          <Route path="/reponse" element={
            <ProtectedRoute role="team_lead">
              <ReponsePage />
            </ProtectedRoute>
          } />
          <Route path="/check-collection" element={
            <ProtectedRoute role="admin">
              <Admin_systemPage />
            </ProtectedRoute>
          } />
          <Route path="/Check-MOA" element={
            <ProtectedRoute role="amoa">
              <Moa_testPage />
            </ProtectedRoute>
          } />
          <Route path="/deploiement" element={
            <ProtectedRoute role="admin">
              <DeployPage />
            </ProtectedRoute>
          } />
          <Route path="/suivie_d_etat/*" element={<SuiviePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

