import { createContext, useContext, useState } from "react";
import { Alert } from "react-native";
import { router } from "expo-router";

import { firebaseAuth } from "@/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

type AuthParams = {
  email: string;
  password: string;
  confirmPassword?: string;
};

type AuthContextType = {
  signIn: ({ email, password }: AuthParams) => void;
  signUp: ({ email, password, confirmPassword }: AuthParams) => void;
  signOut: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  signIn: () => null,
  signUp: () => null,
  signOut: () => null,
  isLoading: false,
});

export function useSession() {
  const value = useContext(AuthContext);

  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(false);

  firebaseAuth.onAuthStateChanged((user) => {
    if (!user) {
      router.replace("/sign-in");
    }
  });

  const handleSignIn = async ({ email, password }: AuthParams) => {
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);

      router.replace("/home");
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
  };

  const handleSignUp = async ({
    email,
    password,
    confirmPassword,
  }: AuthParams) => {
    if (email.length === 0) return Alert.alert("Erro!", "Informe o email");
    if (password.length === 0) return Alert.alert("Erro!", "Informe a senha");
    if (password !== confirmPassword)
      return Alert.alert("Erro!", "As senhas precisam ser iguais");

    setIsLoading(true);

    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);

      router.replace("/home");
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
  };

  const handleSignOut = () => {
    firebaseAuth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        signIn: handleSignIn,
        signUp: handleSignUp,
        signOut: handleSignOut,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
