import { useLayoutEffect } from "react";
import { ActivityIndicator, Text } from "react-native";
import { Flex, Fab, Icon, SectionList, Divider } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

import ItemList from "./components/ItemList";
import ItemHeader from "./components/ItemHeader";

import useContacts from "./hooks/useContacts";

export default function Home() {
  const { sections, isLoading, getContacts } = useContacts();

  useLayoutEffect(() => {
    getContacts();
  }, []);

  console.log(sections);

  if (isLoading)
    return (
      <Flex flex={1} justify="center" align="center">
        <ActivityIndicator />
        <Text>Carregando</Text>
      </Flex>
    );

  return (
    <>
      {sections?.length ? (
        <SectionList
          sections={sections}
          renderItem={({ item }) => <ItemList contact={item} />}
          keyExtractor={(item) => item.email}
          ItemSeparatorComponent={Divider}
          renderSectionHeader={({ section: { title } }) => (
            <ItemHeader title={title} />
          )}
        />
      ) : (
        <Flex flex={1} justify="center" align="center">
          <Text>Não existem contatos cadastrados</Text>
        </Flex>
      )}
      <Fab
        onPress={() => router.push("/modal")}
        renderInPortal={false}
        shadow={2}
        size="sm"
        icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />}
        mb={8}
        mr={4}
      />
    </>
  );
}
