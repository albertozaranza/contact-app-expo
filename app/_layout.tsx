import { Slot } from "expo-router";
import { NativeBaseProvider } from "native-base";

import { SessionProvider } from "./context/auth";

export default function Root() {
  return (
    <NativeBaseProvider>
      <SessionProvider>
        <Slot />
      </SessionProvider>
    </NativeBaseProvider>
  );
}
