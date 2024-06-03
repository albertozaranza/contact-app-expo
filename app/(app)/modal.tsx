import { useState } from "react";
import { router } from "expo-router";
import { Heading, Flex, Input, Button, Text } from "native-base";

import useContacts from "./hooks/useContacts";
import { Alert } from "react-native";

export default function Modal() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { createContact } = useContacts();

  const handleCreateContact = () => {
    if (name.length === 0)
      return Alert.alert("Erro!", "Informe o nome do contato");
    if (email.length === 0)
      return Alert.alert("Erro!", "Informe o email do contato");

    createContact({ email, name });

    return router.back();
  };

  return (
    <Flex flex={1} padding={4}>
      <Heading>Adicionar contato</Heading>
      <Flex flex={1}>
        <Text my={3}>Nome</Text>
        <Input value={name} onChangeText={setName} />
        <Text my={3}>Email</Text>
        <Input value={email} onChangeText={setEmail} autoCapitalize="none" />
      </Flex>
      <Button.Group space={2} padding={4}>
        <Button
          flex={1}
          variant="ghost"
          colorScheme="blueGray"
          onPress={() => {
            router.back();
          }}
        >
          Cancelar
        </Button>
        <Button flex={1} onPress={handleCreateContact}>
          Salvar
        </Button>
      </Button.Group>
    </Flex>
  );
}
