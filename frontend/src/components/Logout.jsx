import React from 'react';

const Logout = () => {
  const handleLogout = () => {
    sessionStorage.removeItem('userData');
    window.location.href = '/';
  };

  return (
    <button className="dropdown-item"  onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
