import { Skeleton } from '@chakra-ui/react';

export const CalculationLoading = ({ children, value, loading }: any) => {
  if (loading) {
    return <Skeleton />;
  }

  return value;
};
