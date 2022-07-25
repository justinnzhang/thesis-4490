import { Badge } from '@chakra-ui/react';

export const ActionBadge = (session: any) => {
  const action_status = session.session;

  if (action_status.first_accept) {
    return <Badge colorScheme='gray'>Accepted</Badge>;
  } else if (action_status.continue_clicked) {
    return <Badge colorScheme='yellow'>Continued</Badge>;
  } else if (action_status.updated_clicked) {
    return <Badge colorScheme='green'>Updated</Badge>;
  }
  return <Badge>N/A</Badge>;
};
