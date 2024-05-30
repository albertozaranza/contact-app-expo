import { useState } from "react";
import { Pressable } from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Flex, Button, Input, Icon, Text } from "native-base";

import { useSession } from "./context/auth";

export default function SignUp() {
  const [isVisible, setIsVisible] = useState(false);

  const { signIn } = useSession();

  return (
    <Flex flex={1} justify="center" align="center" padding="4">
      <Icon as={<MaterialIcons name="phone" />} size={12} color="primary.600" />
      <Text fontSize="4xl" mb={24}>
        ContactApp
      </Text>
      <Input
        mb={4}
        InputLeftElement={
          <Icon
            as={<MaterialIcons name="email" />}
            size={5}
            ml="2"
            color="muted.400"
          />
        }
        placeholder="E-mail"
      />
      <Input
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
        placeholder="Senha"
      />
      <Input
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
        placeholder="Confirmar senha"
      />

      <Button w="100%" mb={4} onPress={() => {}}>
        Criar conta
      </Button>
      <Button w="100%" variant="link" onPress={() => router.back()}>
        Voltar
      </Button>
    </Flex>
  );
}
