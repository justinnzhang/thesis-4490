import { SkeletonText, Box, Stack, Skeleton } from '@chakra-ui/react';

export const BaseContent = () => {
  return (
    <Stack mt={16} spacing={8}>
      <Skeleton variant='text' width='90%' height={4} />
      <SkeletonText noOfLines={16} spacing='4' />
    </Stack>
  );
};
