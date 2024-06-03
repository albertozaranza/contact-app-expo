import { useState } from "react";
import { Pressable } from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Flex, Button, Input, Icon, Text } from "native-base";

import { useSession } from "./context/auth";

export default function SignUp() {
  const [isVisible, setIsVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { signUp, isLoading } = useSession();

  return (
    <Flex flex={1} justify="center" align="center" padding="4">
      <Icon as={<MaterialIcons name="phone" />} size={12} color="primary.600" />
      <Text fontSize="4xl" mb={24}>
        ContactApp
      </Text>
      <Input
        value={email}
        onChangeText={setEmail}
        mb={4}
        InputLeftElement={
          <Icon
            as={<MaterialIcons name="email" />}
            size={5}
            ml="2"
            color="muted.400"
          />
        }
        autoCapitalize="none"
        placeholder="E-mail"
      />
      <Input
        value={password}
        onChangeText={setPassword}
        mb={4}
        type={isVisible ? "text" : "password"}
        InputRightElement={
          <Pressable onPress={() => setIsVisible(!isVisible)}>
            <Icon
              as={
                <MaterialIcons
                  name={isVisible ? "visibility" : "visibility-off"}
                />
              }
              size={5}
              mr="2"
              color="muted.400"
            />
          </Pressable>
        }
        autoCapitalize="none"
        placeholder="Senha"
      />
      <Input
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        mb={4}
        type={isVisible ? "text" : "password"}
        InputRightElement={
          <Pressable onPress={() => setIsVisible(!isVisible)}>
            <Icon
              as={
                <MaterialIcons
                  name={isVisible ? "visibility" : "visibility-off"}
                />
              }
              size={5}
              mr="2"
              color="muted.400"
            />
          </Pressable>
        }
        autoCapitalize="none"
        placeholder="Confirmar senha"
      />

      <Button
        isDisabled={isLoading}
        isLoading={isLoading}
        w="100%"
        mb={4}
        onPress={() => signUp({ email, password, confirmPassword })}
      >
        Criar conta
      </Button>
      <Button
        isDisabled={isLoading}
        w="100%"
        variant="link"
        onPress={() => router.back()}
      >
        Voltar
      </Button>
    </Flex>
  );
}
