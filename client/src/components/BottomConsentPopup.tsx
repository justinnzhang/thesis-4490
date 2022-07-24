import { useContext, useState } from 'react';

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Text,
  Button,
  Stack,
} from '@chakra-ui/react';

import { CookieConsentPage } from './CookieConsentPage';
import { createNewSession } from '../functions';

const SESSION_DATA_DEFAULTS = {
  first_accept: false,
  options_payload: {},
  updated_clicked: false,
  continue_clicked: false,
};

export const BottomConsentPopup = () => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  const [consentPageOpen, setConsentPageOpen] = useState(false);
  const [sessionData, setSessionData] = useState(SESSION_DATA_DEFAULTS);

  function handleAccept(session_data: Session) {
    createNewSession(session_data);

    const timer = setTimeout(() => {
      onClose();
    }, 1000);
    return () => clearTimeout(timer);
  }

  function handleFirstAccept(session_data: Session) {
    createNewSession({ ...session_data, first_accept: true });

    const timer = setTimeout(() => {
      onClose();
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
          <DrawerHeader borderBottomWidth='1px'>
            Accept all cookie settings?
          </DrawerHeader>
          <DrawerBody>
            <Text>
              These are essential in ensuring that you're able to use this site
              properly
            </Text>
          </DrawerBody>
          <DrawerFooter>
            <Stack direction='row' spacing={8}>
              <Button variant='link' onClick={() => setConsentPageOpen(true)}>
                Manage settings
              </Button>
              <Button
                variant='solid'
                colorScheme='green'
                onClick={() => handleFirstAccept(sessionData)}
              >
                Accept
              </Button>
            </Stack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
