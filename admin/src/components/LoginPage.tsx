import { useState } from 'react';

import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Container,
  Stack,
  Heading,
  Text,
  Image,
} from '@chakra-ui/react';

import { checkIfUserExists } from '../functions';

export const LoginPage = ({ setIsAuthenticated, setUser }: any) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [errors, setErrors] = useState<any>({});

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  function handleLogin(e: any) {
    e.preventDefault();

    setErrors({});
    const user = checkIfUserExists(password, email);

    if (user) {
      setUser(user);
      setIsAuthenticated(true);
    } else {
      setErrors({ password: 'Invalid password' });
    }
  }

  return (
    <Container maxW='container.sm' p={8}>
      <Stack spacing={2} mb={4}>
        <Image
          src='https://images.unsplash.com/photo-1658604663578-04634f4cb897?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2970&q=80'
          alt='logo'
          w='100%'
          h='10rem'
          borderRadius='lg'
          mb={2}
          fit='cover'
        />
        <Heading fontSize='xl'>CS4490Z Thesis Admin Dashboard</Heading>
        <Text color='gray.500'>
          If you're having trouble logging in, please contact Justin Zhang
        </Text>
      </Stack>
      <Stack spacing={4}>
        <form onSubmit={(e) => handleLogin(e)}>
          <Stack direction='column'>
            <Input
              value={email}
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
              type='email'
            />
            <InputGroup size='md'>
              <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                name='password'
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors.password && (
              <Text color='red.600'>Please double check your credentials</Text>
            )}
            <Button colorScheme='green' w='100%' type='submit'>
              Login
            </Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
};
