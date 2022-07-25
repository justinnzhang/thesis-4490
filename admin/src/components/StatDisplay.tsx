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
  return (
    <Box p={4} bg='gray.50' borderRadius='lg'>
      <Stat>
        <StatLabel>{label}</StatLabel>
        <StatNumber>
          {data} {decorator}
        </StatNumber>
        <StatHelpText>{helpText}</StatHelpText>
      </Stat>
    </Box>
  );
};
