import { useState } from 'react';
import {
  SkeletonText,
  Stack,
  Skeleton,
  Heading,
  Text,
  Textarea,
  useToast,
  Button,
  Link,
} from '@chakra-ui/react';

import { createClient } from '@supabase/supabase-js';

interface Props {
  isComplete: boolean;
  sessionId: string;
}

export const BaseContent = ({ isComplete, sessionId }: Props) => {
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  if (!isComplete) {
    return (
      <Stack mt={16} spacing={8}>
        <Skeleton variant='text' width='90%' height={4} />
        <SkeletonText noOfLines={16} spacing='4' />
      </Stack>
    );
  }

  console.log('sessionId', sessionId);

  const supabaseUrl = 'https://oqumrrcnkhqbzsnbrsri.supabase.co';
  const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || 'supabase-key';
  const supabase = createClient(supabaseUrl, supabaseKey);

  async function handleSubmit() {
    setIsLoading(true);

    const { data, error } = await supabase
      .from('Sessions')
      .update({ notes: feedback })
      .eq('id', sessionId);

    if (error) {
      toast({
        title: 'An error occured',
        description: 'Something went wrong, pleaes try again',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Your thougths have been recorded!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
    setIsLoading(false);
  }

  return (
    <Stack mt={16} spacing={4}>
      <Heading>Welcome!</Heading>
      <Text color='gray.600'>
        This site was created by{' '}
        <Link href='https://justinzha.ng' textDecoration='underline' isExternal>
          Justin Zhang
        </Link>{' '}
        for Isam Faik. Part of CS4490Z Thesis Course at{' '}
        <Link href='uwo.ca' textDecoration='underline' isExternal>
          Western University
        </Link>{' '}
        in Canada.
      </Text>
      <Text color='gray.600'>
        You just experienced an example of{' '}
        <Link
          href='https://www.deceptive.design/'
          textDecoration='underline'
          isExternal
        >
          Dark Patterns
        </Link>{' '}
        - intentional digital design that may cause a user to unknowingly engage
        in a behavior that they may not want to do. A common example is
        frustrating and complicated subscription processes online!
      </Text>
      <Text color='gray.600'>
        If you clicked the Accept button immediately, why did you do so? If you
        went into the settings and made changes, what prompted you to?
      </Text>
      <Text color='gray.600'>
        To help with my research, I'd love to collect some thoughts about when
        you've run into dark patterns in the wild. How did they make you feel.
        How do you avoid them?
      </Text>
      <Textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder='Please leave your thoughts here'
      />
      <Button onClick={handleSubmit}>Submit your thoughts</Button>
      <Text color='gray.600'>Thank you for taking the time! 💜</Text>
    </Stack>
  );
};
