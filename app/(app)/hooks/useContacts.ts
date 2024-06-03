import { useMemo, useState } from "react";
import { getDatabase, ref, push, onValue } from "firebase/database";

import { firebaseAuth } from "@/firebaseConfig";
import { Alert } from "react-native";

type Contact = {
  name: string;
  email: string;
};

export type UseContactsType = {
  sections: { title: string; data: Contact[] }[] | null;
  isLoading: boolean;
  createContact: ({ name, email }: Contact) => void;
  getContacts: () => void;
};

export default function useContacts(): UseContactsType {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const createContact = ({ name, email }: Contact) => {
    const userExists = contacts.find((contact) => contact.email === email);

    if (userExists) return Alert.alert("Erro!", "O usuário já existe");

    const database = getDatabase();

    if (firebaseAuth.currentUser?.email) {
      push(ref(database, `contacts/${btoa(firebaseAuth.currentUser.email)}`), {
        name,
        email,
      });
    }
  };

  const getContacts = async () => {
    setIsLoading(true);

    const database = getDatabase();

    if (firebaseAuth.currentUser?.email) {
      try {
        const contactsRef = ref(
          database,
          `contacts/${btoa(firebaseAuth.currentUser.email)}`
        );

        onValue(contactsRef, (snapshot) => {
          if (snapshot.exists()) {
            let databaseContacts: Contact[] = [];

            snapshot.forEach((item) => {
              databaseContacts.push(item.val());
            });

            setContacts(databaseContacts);
          }
        });
      } catch (e) {
        console.error(e);
      }
    }

    setIsLoading(false);
  };

  const sections = useMemo(() => {
    if (!contacts) {
      return null;
    }

    const sectionsMap = contacts.reduce<Record<string, Contact[]>>(
      (acc, contact) => {
        const { name } = contact;
        const [firstLetter] = name;

        return Object.assign(acc, {
          [firstLetter]: [...(acc[firstLetter] || []), contact],
        });
      },
      {}
    );

    return Object.entries(sectionsMap)
      .map(([letter, items]) => ({
        title: letter,
        data: items.sort((a, b) => a.name.localeCompare(b.name)),
      }))
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [contacts]);

  return {
    sections,
    isLoading,
    createContact,
    getContacts,
  };
}
