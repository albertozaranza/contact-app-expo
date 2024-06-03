import { TouchableOpacity } from "react-native";
import { Box, Text } from "native-base";
import { router } from "expo-router";

import { Contact } from "../@types/contact";

type ItemListProps = {
  contact: Contact;
};

export default function ItemList({ contact }: ItemListProps) {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/chat",
          params: { name: contact.name, email: contact.email },
        })
      }
    >
      <Box padding="4">
        <Text fontSize="md">{contact.name}</Text>
        <Text color="gray.400">{contact.email}</Text>
      </Box>
    </TouchableOpacity>
  );
}
