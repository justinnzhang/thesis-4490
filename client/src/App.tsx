import { ChakraProvider, Box, Container, extendTheme } from '@chakra-ui/react';

import { BottomConsentPopup, BaseContent } from './components';

const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
});

export const App = () => (
  <ChakraProvider theme={theme}>
    <Container maxW='sm'>
      <BaseContent />
      <BottomConsentPopup />
    </Container>
  </ChakraProvider>
);
