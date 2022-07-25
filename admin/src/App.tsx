import { useState } from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';

import { AuthWrapper, Dashboard } from './components';

export const App = () => {
  const [user, setUser] = useState<User>({
    first_name: 'Justin',
    last_name: 'Zhang',
    email: 'jzha365@uwo.ca',
    id: '929b7ab0-395c-4993-bf6d-bf70184938cb',
    password: 'admin',
  });

  return (
    <ChakraProvider theme={theme}>
      <AuthWrapper setUser={setUser}>
        <Dashboard user={user} />
      </AuthWrapper>
    </ChakraProvider>
  );
};
