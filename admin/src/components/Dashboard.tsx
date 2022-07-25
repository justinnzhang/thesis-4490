import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

import {
  Container,
  Heading,
  IconButton,
  SimpleGrid,
  Stack,
  Spinner,
} from '@chakra-ui/react';

import {
  getPercentageOfAcceptUsers,
  getPercentageOfContinueUsers,
  getPercentageOfUpdatedClicked,
  getPercentageOfMasterSwitchDisabled,
} from '../functions';
import { StatDisplay } from './StatDisplay';
import { AllSessionsTable } from './AllSessionsTable';

import { FiRefreshCw } from 'react-icons/fi';

interface Props {
  user?: User;
}

export const Dashboard = ({ user }: Props) => {
  const [errors, setErrors] = useState<any>({});

  const [allSessionData, setAllSessionData] = useState<any>();
  const [allSessionLoading, setAllSessionLoading] = useState(true);

  const supabaseUrl = 'https://oqumrrcnkhqbzsnbrsri.supabase.co';
  const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || '';
  const supabase = createClient(supabaseUrl, supabaseKey);

  useEffect(() => {
    getAllSessionData();
  }, []);

  async function getAllSessionData() {
    setAllSessionLoading(true);
    let { data: SessionData, error } = await supabase
      .from('Sessions')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      setErrors({ ...errors, allSessionData: error.message });
    } else {
      setAllSessionData(SessionData);
    }
    setAllSessionLoading(false);
  }

  return (
    <Container maxW='container.md' pt={8}>
      <Heading mb={4}>Welcome {user?.first_name}</Heading>
      <IconButton
        isLoading={allSessionLoading}
        icon={<FiRefreshCw />}
        aria-label='reload'
        onClick={getAllSessionData}
        mb={2}
      />
      <SimpleGrid columns={[1, 2, 2, 3]} spacing={4}>
        <StatDisplay
          loading={allSessionLoading}
          label='Total Sessions'
          data={allSessionLoading ? 'loading...' : allSessionData?.length}
          decorator=''
          helpText='Number of users'
        />
        <StatDisplay
          loading={allSessionLoading}
          label='% Accepted'
          data={getPercentageOfAcceptUsers(allSessionData)}
          decorator='%'
          helpText='Users that immediately clicked Accept'
        />
        <StatDisplay
          loading={allSessionLoading}
          label='% Continued'
          data={getPercentageOfContinueUsers(allSessionData)}
          decorator='%'
          helpText='Users that continued without updating preferences'
        />
        <StatDisplay
          loading={allSessionLoading}
          label='% Updated'
          data={getPercentageOfUpdatedClicked(allSessionData)}
          decorator='%'
          helpText='Users that updated their preferences'
        />
        <StatDisplay
          loading={allSessionLoading}
          label='% Master Switch Disabled'
          data={getPercentageOfMasterSwitchDisabled(allSessionData)}
          decorator='%'
          helpText='Users that disabled private mode'
        />
      </SimpleGrid>
      <AllSessionsTable
        loading={allSessionLoading}
        data={allSessionData}
        supabase={supabase}
      />
    </Container>
  );
};
