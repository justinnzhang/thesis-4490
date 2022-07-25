import { useState } from 'react';

import { LoginPage } from './LoginPage';

export const AuthWrapper = ({ setUser, children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  if (!isAuthenticated) {
    return (
      <LoginPage setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
    );
  }

  return children;
};
