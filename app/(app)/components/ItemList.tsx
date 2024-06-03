import { Text, TouchableOpacity } from "react-native";
import { Box } from "native-base";

type ItemListProps = {
  email: string;
};

export default function ItemList({ email }: ItemListProps) {
  return (
    <TouchableOpacity>
      <Box padding="4">
        <Text>{email}</Text>
      </Box>
    </TouchableOpacity>
  );
}
