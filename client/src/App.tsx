import { useState } from 'react';

import { ChakraProvider, Box, Container, extendTheme } from '@chakra-ui/react';

import { BottomConsentPopup, BaseContent } from './components';

const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
});

export const App = () => {
  const [isComplete, setIsComplete] = useState(false);
  const [sessionId, setSessionId] = useState('');

  return (
    <ChakraProvider theme={theme}>
      <Container maxW='sm'>
        <BaseContent isComplete={isComplete} sessionId={sessionId} />
        <BottomConsentPopup
          setIsComplete={setIsComplete}
          setSessionId={setSessionId}
        />
      </Container>
    </ChakraProvider>
  );
};
