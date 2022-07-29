import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Box,
  Badge,
  Spinner,
} from '@chakra-ui/react';
import { SupabaseClient } from '@supabase/supabase-js';

import { ActionBadge } from './ActionBadge';
import { NotesDrawer } from './NotesDrawer';

interface Props {
  loading: boolean;
  data: Session[];
  supabase: SupabaseClient;
}

export const AllSessionsTable = ({ loading, data, supabase }: Props) => {
  if (loading) {
    return (
      <Box pt={8} pb={8}>
        <Text>Loading...</Text>
        <Spinner />
      </Box>
    );
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
              <Th>Notes</Th>
              <Th>Edit</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((session: Session, index: number) => (
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
                <Td maxW='10rem'>
                  {session.notes !== 'Add your notes here' && (
                    <Text noOfLines={1}>{session.notes}</Text>
                  )}
                </Td>
                <Td>
                  <NotesDrawer session={session} supabase={supabase} />
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

  if (!session.session.options_payload.length)
    return <Badge colorScheme='green'>Yes</Badge>;

  const master_switch = session.session.options_payload?.find(
    (el: any) => el.name === 'Web Advertising Setting'
  );

  if (master_switch.state) return <Badge colorScheme='green'>Yes</Badge>;
  return <Badge colorScheme='yellow'>No</Badge>;
};
