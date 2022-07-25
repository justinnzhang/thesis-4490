import { users } from '../constants';

export function checkIfUserExists(password: string, email: string) {
  return users.find(
    (user) => user.password === password && user.email === email
  );
}
