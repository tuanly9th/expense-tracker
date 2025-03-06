import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../../services/userService';
import AuthForm from './AuthForm';
import UserProfile from './UserProfile';

const UserManagement = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error('Error checking user:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
  };

  if (loading) {
    return <div className="user-management-loading">Đang tải...</div>;
  }

  return (
    <div className="user-management-container">
      {currentUser ? (
        <UserProfile userId={currentUser.id} onSignOut={handleSignOut} />
      ) : (
        <AuthForm onAuthSuccess={handleAuthSuccess} />
      )}
    </div>
  );
};

export default UserManagement; 