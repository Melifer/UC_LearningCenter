import React from 'react';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';

const Dashboard = ({ user }) => {
  if (!user) {
    return <div className="container">Please log in</div>;
  }

  // Rozdzielenie widoków na podstawie roli
  switch (user.role) {
    case 'admin':
      return <AdminDashboard user={user} />;
    case 'user':
    default:
      return <UserDashboard user={user} />;
  }
};

export default Dashboard;
