import { useState } from 'react';
import {
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Stack,
  Switch,
  Flex,
  Spacer,
  Box,
  Text,
  Button,
  SlideFade,
  Alert,
  AlertIcon,
  AlertDescription,
  Link,
} from '@chakra-ui/react';

import { FcHighPriority } from 'react-icons/fc';
import { FiExternalLink } from 'react-icons/fi';

const COOKIE_OPTIONS = [
  {
    name: 'Essential browser cookies',
    description:
      'These are cookies that your browser uses. This cannot be disabled.',
    state: true,
    clicks: 0,
    isRequired: true,
    touched: true,
  },
  {
    name: 'Website cookies',
    description:
      "These are essential in ensuring that you're able to use this site properly, powering many of the different features.",
    link: "https://www.google.com/search?q=what's+a+cookie",
    state: true,
    clicks: 0,
    isRequired: false,
    touched: false,
  },
  {
    name: 'Performance logging',
    description:
      "These are essential in ensuring that you're able to use this site properly",
    link: "https://www.google.com/search?q=what's+a+cookie",
    state: true,
    clicks: 0,
    isRequired: false,
    touched: false,
  },
  {
    name: 'Facebook Pixel',
    description:
      "Powers this website's infrastructure. This is essential in ensuring that you're able to use this site properly.",
    link: 'https://www.facebook.com/business/tools/meta-pixel',
    state: true,
    clicks: 0,
    isRequired: false,
    touched: true,
  },
  {
    name: 'Google Analytics',
    description:
      "Provides important insights into the usage of the site, anonymously aggregated. This is essential in ensuring that you're able to use this site properly.",
    link: 'https://analytics.google.com/analytics/web/',
    state: true,
    clicks: 0,
    isRequired: false,
    touched: false,
  },
  {
    name: 'Web Advertising Setting',
    description:
      'By turning this on, your browsing or usage data will not be used. This setting overrides all other cookie settings.',
    state: true,
    clicks: 0,
    isRequired: false,
    touched: false,
  },
  {
    name: 'Third Party Advertisers',
    description:
      "Allows this site to be used free of charge. This is essential in ensuring that you're able to use this site properly.",
    link: "https://www.google.com/search?q=what's+a+cookie",
    state: true,
    clicks: 0,
    isRequired: false,
    touched: false,
  },
  {
    name: 'University Policies',
    description:
      "As part of a research project, you must agree to the University's policies.",
    link: "https://www.google.com/search?q=what's+a+cookie",
    state: true,
    clicks: 0,
    isRequired: false,
    touched: false,
  },
];

interface Props {
  sessionData: Session;
  setSessionData: any;
  handleAccept: any;
}

export const CookieConsentPage = ({
  sessionData,
  setSessionData,
  handleAccept,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  const [options, setOptions] = useState(COOKIE_OPTIONS);
  const [canUpdate, setCanUpdate] = useState(false);
  const [existsDisabled, setExistsDisabled] = useState(false);

  // Check if all cookies have been toggled with
  function checkForAllTouched() {
    return options.every(({ touched }) => touched);
  }

  // If there any disabled cookies, this returns true
  function checkForDisabledCookies() {
    return options.some(({ state }) => !state);
  }

  /**
   * Handles the case where the user successfully updates their consent
   */
  function handleUpdate() {
    const updated_session_data: Session = {
      ...sessionData,
      options_payload: options,
      updated_clicked: true,
    };
    handleAccept(updated_session_data);
    onClose();
  }

  /**
   * Handle the case if the user just clicks on the Continue button - nothing is changed
   */
  function handleContinue() {
    const updated_session_data: Session = {
      ...sessionData,
      options_payload: COOKIE_OPTIONS,
      continue_clicked: true,
    };

    handleAccept(updated_session_data);
    onClose();
  }

  return (
    <>
      <Drawer
        onClose={onClose}
        isOpen={isOpen}
        size='full'
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader bg={'gray.100'}>
            Manage your cookie settings
          </DrawerHeader>
          <DrawerBody>
            <Stack spacing={6} mt={4}>
              <Alert status='warning'>
                <AlertIcon />
                Before updating, please ensure you read and understand what each
                type of cookie and setting does.
              </Alert>
              {options.map(
                ({ name, description, state, isRequired, link }, index) => (
                  <Flex key={`cookie-options-${index}`} alignContent='top'>
                    <Stack spacing={1}>
                      <Stack direction='row' alignItems='center'>
                        <Text fontSize='lg' noOfLines={1}>
                          {name}
                        </Text>
                        {!state && <FcHighPriority />}
                      </Stack>
                      <Stack direction='column'>
                        <Text fontSize='md' color='gray.500'>
                          {description}
                        </Text>
                        {link && (
                          <Stack direction='row' alignItems='center'>
                            <Link
                              href={link}
                              isExternal
                              onClick={() => {
                                const newOptions = [...options];
                                newOptions[index].clicks += 1;
                                newOptions[index].touched = true;
                                setOptions(newOptions);
                              }}
                            >
                              Learn more
                            </Link>
                            <FiExternalLink />
                          </Stack>
                        )}
                      </Stack>
                    </Stack>
                    <Spacer />
                    <Box>
                      <Switch
                        isChecked={state}
                        onChange={() => {
                          const newOptions = [...options];
                          newOptions[index].state = !newOptions[index].state;
                          newOptions[index].touched = true;
                          setOptions(newOptions);
                          setCanUpdate(checkForAllTouched());
                          setExistsDisabled(checkForDisabledCookies());
                        }}
                        isDisabled={isRequired}
                        colorScheme='green'
                      />
                    </Box>
                  </Flex>
                )
              )}
            </Stack>
            <Box mt={4} mb={4}>
              <SlideFade in={existsDisabled} offsetY='20px'>
                <Alert status='error'>
                  <AlertIcon />
                  <AlertDescription>
                    Disabling these settings can cause issues with the way the
                    application operates. For the best experience, please enable
                    all cookies.
                  </AlertDescription>
                </Alert>
              </SlideFade>
            </Box>
            <Text fontSize='sm' color='gray.400' mb={4}>
              To update your preferences, you will need to either learn more
              about every setting or enable all cookies.
            </Text>
            <Flex pb={4}>
              <Spacer />
              <Stack direction='row' spacing={8}>
                <Button
                  variant='link'
                  isDisabled={!canUpdate}
                  onClick={handleUpdate}
                >
                  Update
                </Button>
                <Button
                  variant='solid'
                  colorScheme='green'
                  onClick={handleContinue}
                >
                  Continue
                </Button>
              </Stack>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
