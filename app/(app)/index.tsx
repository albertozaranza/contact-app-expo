import { useEffect } from "react";
import { Text } from "react-native";
import { Flex, Fab, Icon, FlatList } from "native-base";
import { AntDesign } from "@expo/vector-icons";

import useContacts from "./hooks/useContacts";

export default function Home() {
  const { contacts, createContact, getContacts } = useContacts();

  const hasContact = contacts.length > 0;

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <>
      {hasContact ? (
        <FlatList
          data={contacts}
          renderItem={({ item }) => <Text>{item.email}</Text>}
          keyExtractor={(item) => item.email}
        />
      ) : (
        <Flex flex={1} justify="center" align="center">
          <Text>Não existem contatos cadastrados</Text>
        </Flex>
      )}
      <Fab
        onPress={() => createContact({ email: "jamille@teste.com" })}
        renderInPortal={false}
        shadow={2}
        size="sm"
        icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />}
        mb={8}
        mr={4}
      />
    </>
  );
}
