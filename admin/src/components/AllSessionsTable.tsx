import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  Box,
  Badge,
} from '@chakra-ui/react';

import { getMasterSwitchSetting } from '../functions';
import { ActionBadge } from './ActionBadge';

interface Props {
  loading: boolean;
  data: Session[];
}

export const AllSessionsTable = ({ loading, data }: Props) => {
  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <Box pt={8} pb={8}>
      <Text fontSize='lg' fontWeight='medium'>
        All Sessions
      </Text>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Session Date</Th>
              <Th>Action</Th>
              <Th>Master Enabled?</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((session, index: any) => (
              <Tr key={index}>
                <Td>{session.id}</Td>
                <Td>
                  {new Date(session.created_at || new Date()).toLocaleString()}
                </Td>
                <Td>
                  <ActionBadge session={session} />
                </Td>
                <Td>
                  <MasterSwitchBadge session={session} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const MasterSwitchBadge = (session: any) => {
  if (!session.session.options_payload) return <p>loading...</p>;

  if (!session.session.options_payload.length) return <p>N/A</p>;

  const master_switch = session.session.options_payload?.find(
    (el: any) => el.name === 'Web Advertising Setting'
  );

  if (master_switch.state) return <Badge colorScheme='green'>Yes</Badge>;
  return <Badge colorScheme='yellow'>No</Badge>;
};
