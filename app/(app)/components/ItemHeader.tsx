import { Box } from "native-base";
import { Text, View } from "react-native";

type ItemHeaderProps = {
  title: string;
};

export default function ItemHeader({ title }: ItemHeaderProps) {
  return (
    <Box padding={4} backgroundColor="primary.500">
      <Text style={{ color: "#fff" }}>{title}</Text>
    </Box>
  );
}
