import { useState } from 'react';

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Text,
  Button,
  Stack,
  Container,
} from '@chakra-ui/react';

import { CookieConsentPage } from './CookieConsentPage';
import { createNewSession } from '../functions';

const SESSION_DATA_DEFAULTS = {
  first_accept: false,
  options_payload: {},
  updated_clicked: false,
  continue_clicked: false,
};

interface Props {
  setIsComplete: any;
  setSessionId: any;
}

export const BottomConsentPopup = ({ setIsComplete, setSessionId }: Props) => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  const [consentPageOpen, setConsentPageOpen] = useState(false);
  const [sessionData, setSessionData] = useState(SESSION_DATA_DEFAULTS);
  const [isLoading, setIsLoading] = useState(false);

  async function handleAccept(session_data: Session) {
    setIsLoading(true);
    const res = await createNewSession(session_data);
    setSessionId(res?.[0].id);

    const timer = setTimeout(() => {
      onClose();
      setIsComplete(true);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }

  async function handleFirstAccept(session_data: Session) {
    setIsLoading(true);
    const res = await createNewSession({ ...session_data, first_accept: true });
    setSessionId(res?.[0].id);

    const timer = setTimeout(() => {
      onClose();
      setIsComplete(true);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }

  return (
    <>
      {consentPageOpen && (
        <CookieConsentPage
          sessionData={sessionData}
          setSessionData={setSessionData}
          handleAccept={handleAccept}
        />
      )}
      <Drawer
        placement='bottom'
        onClose={onClose}
        isOpen={isOpen}
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
        <DrawerOverlay />
        <DrawerContent>
          <Container maxW='container.sm'>
            <DrawerHeader borderBottomWidth='1px'>
              Accept all cookie settings?
            </DrawerHeader>
            <DrawerBody>
              <Text>
                These are essential in ensuring that you're able to use this
                site properly
              </Text>
            </DrawerBody>
          </Container>
          <Container maxW='container.sm'>
            <DrawerFooter>
              <Stack direction='row' spacing={8}>
                <Button
                  variant='link'
                  onClick={() => setConsentPageOpen(true)}
                  isDisabled={isLoading}
                >
                  Manage settings
                </Button>
                <Button
                  variant='solid'
                  colorScheme='green'
                  onClick={() => handleFirstAccept(sessionData)}
                  isLoading={isLoading}
                >
                  Accept
                </Button>
              </Stack>
            </DrawerFooter>
          </Container>
        </DrawerContent>
      </Drawer>
    </>
  );
};
