import {
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react';

interface Props {
  data: any;
  loading: boolean;
  label: string;
  helpText: string;
  decorator: string;
}

export const StatDisplay = ({
  data,
  loading,
  label,
  helpText,
  decorator,
}: Props) => {
  const statNumberMarkup = loading ? (
    'loading...'
  ) : (
    <>
      {data} {decorator}
    </>
  );

  return (
    <Box p={4} bg='gray.50' borderRadius='lg'>
      <Stat>
        <StatLabel>{label}</StatLabel>
        <StatNumber>{statNumberMarkup}</StatNumber>
        <StatHelpText>{helpText}</StatHelpText>
      </Stat>
    </Box>
  );
};
