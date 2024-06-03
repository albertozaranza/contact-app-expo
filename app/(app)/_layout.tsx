import { MaterialIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { IconButton } from "native-base";

import { useSession } from "../context/auth";

export default function AppLayout() {
  const { signOut } = useSession();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#0891b2",
        },

        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="home"
        options={{
          headerTitle: "Contatos",
          headerRight: () => (
            <IconButton
              onPress={signOut}
              colorScheme="dark"
              variant="ghost"
              _icon={{
                as: MaterialIcons,
                name: "logout",
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="modal"
        options={{
          headerTitle: "Adicionar contato",
          // presentation: "modal",
        }}
      />
    </Stack>
  );
}
