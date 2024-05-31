import { useEffect } from "react";
import { Text, View } from "react-native";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { firebaseAuth } from "@/firebaseConfig";
import { Button } from "native-base";

export default function Home() {
  const writeUserData = () => {
    const db = getDatabase();

    if (firebaseAuth.currentUser?.email) {
      set(ref(db, `contacts/${btoa(firebaseAuth.currentUser.email)}`), {
        username: "contato",
      });
    }
  };

  const handleRealTimeDatabaseData = async () => {
    const dbRef = ref(getDatabase());

    if (firebaseAuth.currentUser?.email) {
      try {
        const snapshot = await get(
          child(dbRef, `contacts/${btoa(firebaseAuth.currentUser.email)}`)
        );

        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    handleRealTimeDatabaseData();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ccc",
      }}
    >
      <Button onPress={writeUserData}>Criar contato</Button>
    </View>
  );
}
