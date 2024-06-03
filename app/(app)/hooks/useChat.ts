import { useState } from "react";
import { child, get, getDatabase, onValue, push, ref } from "firebase/database";

import { firebaseAuth } from "@/firebaseConfig";

type Message = {
  origin: string;
  message: string;
};

type SendMessageParams = {
  message: string;
  email: string;
};

export type UseChatType = {
  messages: Message[];
  getMessages: (email: string) => void;
  sendMessage: ({ message, email }: SendMessageParams) => void;
};

export default function useChat(): UseChatType {
  const [messages, setMessages] = useState<Message[]>([]);

  const getMessages = (email: string) => {
    const database = getDatabase();

    if (firebaseAuth.currentUser?.email) {
      try {
        const messagesRef = ref(
          database,
          `messages/${btoa(firebaseAuth.currentUser.email)}/${btoa(email)}`
        );

        onValue(messagesRef, (snapshot) => {
          if (snapshot.exists()) {
            let databaseMessages: Message[] = [];

            snapshot.forEach((item) => {
              databaseMessages.push(item.val());
            });

            setMessages(databaseMessages);
          }
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const sendMessage = async ({ message, email }: SendMessageParams) => {
    const database = getDatabase();

    if (firebaseAuth.currentUser?.email) {
      push(
        ref(
          database,
          `messages/${btoa(firebaseAuth.currentUser.email)}/${btoa(email)}`
        ),
        {
          origin: firebaseAuth.currentUser.email,
          message,
        }
      );

      push(
        ref(
          database,
          `messages/${btoa(email)}/${btoa(firebaseAuth.currentUser.email)}`
        ),
        {
          origin: firebaseAuth.currentUser.email,
          message,
        }
      );
    }
  };

  return { messages, getMessages, sendMessage };
}
