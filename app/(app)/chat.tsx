import { useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import { Flex, IconButton, Input } from "native-base";
import { useLocalSearchParams, useNavigation } from "expo-router";

import ChatMessage from "./components/ChatMessage";
import { MaterialIcons } from "@expo/vector-icons";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const navigation = useNavigation();
  const params = useLocalSearchParams();

  const { name } = params;

  useEffect(() => {
    navigation.setOptions({ headerTitle: name });
  }, [navigation]);

  console.log(message);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {messages.length === 0 ? (
        <Flex flex={1} justify="center" align="center">
          <Text>Ainda não há mensagens aqui</Text>
          <Text>Inicie uma nova conversa</Text>
        </Flex>
      ) : (
        <Flex flex={1} justify="flex-end" mb={4}>
          {messages.map((message) => (
            <ChatMessage message={message} origin="teste@teste.com" />
          ))}
        </Flex>
      )}
      <Flex flexDirection="row" px={4}>
        <Input flex={1} mr={2} value={message} onChangeText={setMessage} />
        <IconButton
          onPress={() => {
            setMessages((prevState) => [...prevState, message]);
            setMessage("");
          }}
          variant="solid"
          _icon={{
            as: MaterialIcons,
            name: "send",
          }}
        />
      </Flex>
    </SafeAreaView>
  );
}
