import { useState } from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';

import { AuthWrapper, Dashboard } from './components';

export const App = () => {
  const [user, setUser] = useState<User>();

  return (
    <ChakraProvider theme={theme}>
      <AuthWrapper setUser={setUser}>
        <Dashboard user={user} />
      </AuthWrapper>
    </ChakraProvider>
  );
};
