import React from 'react';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';

const Dashboard = ({ user, showToast }) => {
  if (!user) {
    return <div className="container">Please log in</div>;
  }

  // Rozdzielenie widoków na podstawie roli
  switch (user.role) {
    case 'admin':
      return <AdminDashboard user={user} showToast={showToast} />;
    case 'user':
    default:
      return <UserDashboard user={user} showToast={showToast} />;
  }
};

export default Dashboard;
