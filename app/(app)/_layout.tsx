import { MaterialIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { IconButton } from "native-base";

import { useSession } from "../context/auth";

export default function AppLayout() {
  const { signOut } = useSession();

  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <IconButton
            onPress={signOut}
            color="primary.600"
            variant="ghost"
            _icon={{
              as: MaterialIcons,
              name: "logout",
            }}
          />
        ),
      }}
    />
  );
}
