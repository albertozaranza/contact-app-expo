import { Text, View } from "react-native";

import { useSession } from "../context/auth";

export default function Home() {
  const { signOut } = useSession();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ccc",
      }}
    >
      <Text>HOME</Text>
    </View>
  );
}
