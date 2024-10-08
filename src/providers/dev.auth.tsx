import React, { ReactNode, useState } from 'react';

export const DevProtect: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const correctPassword = 'pswd';

  const handlePassword = () => {
    const password = prompt('Enter the password:');
    if (password === correctPassword) {
      setIsAuthenticated(true);
    }
  };

  if (!isAuthenticated) {
    handlePassword();
  }

  return (
    <div>
      {isAuthenticated ? (
        children
      ) : (
        <div style={{ textAlign: 'center', marginTop: '20%' }}>
          <p>Login required. You entered the wrong password.</p>
        </div>
      )}
    </div>
  );
};

export default DevProtect;
