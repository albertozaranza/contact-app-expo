import { getDatabase, ref, push, onValue } from "firebase/database";
import { firebaseAuth } from "@/firebaseConfig";
import { useState } from "react";

type Contact = {
  email: string;
};

export type UseContactsType = {
  contacts: Contact[];
  createContact: ({ email }: Contact) => void;
  getContacts: () => void;
};

export default function useContacts(): UseContactsType {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const createContact = ({ email }: Contact) => {
    const database = getDatabase();

    if (firebaseAuth.currentUser?.email) {
      push(ref(database, `contacts/${btoa(firebaseAuth.currentUser.email)}`), {
        email,
      });
    }
  };

  const getContacts = async () => {
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
  };

  return {
    contacts,
    createContact,
    getContacts,
  };
}
