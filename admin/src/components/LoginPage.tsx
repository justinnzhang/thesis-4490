import { useState } from 'react';

import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Container,
  Stack,
} from '@chakra-ui/react';

import { checkIfUserExists } from '../functions';

export const LoginPage = ({ setIsAuthenticated, setUser }: any) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [errors, setErrors] = useState<any>({});

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  function handleLogin() {
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
      <Stack spacing={4}>
        <form>
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
                placeholder='Enter password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                name='password'
                isInvalid={errors?.password}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Stack>
        </form>
        <Button onClick={handleLogin} colorScheme='green' w='100%'>
          Login
        </Button>
      </Stack>
    </Container>
  );
};
