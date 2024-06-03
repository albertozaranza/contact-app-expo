import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
} from "react-native";
import { Flex, IconButton, Input } from "native-base";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

import ChatMessage from "./components/ChatMessage";
import useChat from "./hooks/useChat";

export default function Chat() {
  const [message, setMessage] = useState("");

  const { messages, getMessages, sendMessage } = useChat();

  const navigation = useNavigation();
  const params = useLocalSearchParams();

  const { name, email } = params;

  useEffect(() => {
    navigation.setOptions({ headerTitle: name });
  }, [navigation]);

  useEffect(() => {
    getMessages(email as string);
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {messages.length === 0 ? (
          <Flex flex={1} justify="center" align="center">
            <Text>Ainda não há mensagens aqui</Text>
            <Text>Inicie uma nova conversa</Text>
          </Flex>
        ) : (
          <Flex flex={1} justify="flex-end" mb={4}>
            {messages.map((message) => (
              <ChatMessage message={message.message} origin={message.origin} />
            ))}
          </Flex>
        )}
        <Flex flexDirection="row" px={4}>
          <Input flex={1} mr={2} value={message} onChangeText={setMessage} />
          <IconButton
            disabled={message.length === 0}
            onPress={() => {
              sendMessage({ message, email } as {
                message: string;
                email: string;
              });
              setMessage("");
            }}
            variant={message.length === 0 ? "ghost" : "solid"}
            _icon={{
              as: MaterialIcons,
              name: "send",
            }}
          />
        </Flex>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
