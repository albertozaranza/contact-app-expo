import { Box, Heading } from "native-base";

type ItemHeaderProps = {
  title: string;
};

export default function ItemHeader({ title }: ItemHeaderProps) {
  return (
    <Box padding={4} backgroundColor="#fff">
      <Heading>{title}</Heading>
    </Box>
  );
}
