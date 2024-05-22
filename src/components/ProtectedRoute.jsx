import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { notification } from 'antd';

const ProtectedRoute = ({ role, children }) => {
  const userRole = localStorage.getItem('userRole');
  const navigate = useNavigate();

  if (role !== userRole) {
    // Display an Ant Design notification for unauthorized access
    notification.error({
      message: 'Access Denied',
      description: 'You are not allowed to access this page.',
      duration: 2, // Duration the notification stays open
      onClose: () => {
        // Redirect to a specific page after the notification
        navigate('/'); // Change '/' to your desired route
      },
    });

    // Optionally, keep users on the current page or redirect immediately
    // return null; // To keep users on the current page
    return <Navigate to="/" replace />; // Immediate redirect, adjust the path as needed
  }

  return children;
};

export default ProtectedRoute;

// // src/components/ProtectedRoute.jsx
// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//   const isAuthenticated = localStorage.getItem('authToken'); // Or your authentication logic here

//   if (!isAuthenticated) {
//     // User is not authenticated, redirect to login page
//     return <Navigate to="/login" />;
//   }

//   return children; // User is authenticated, render the children components
// };

// export default ProtectedRoute;
