import { firebaseAuth } from "@/firebaseConfig";
import { Box, Flex, Text } from "native-base";

type ChatMessageProps = {
  origin: string;
  message: string;
};

export default function ChatMessage({ origin, message }: ChatMessageProps) {
  const currentUser = firebaseAuth.currentUser?.email;

  const isCurrentUserOrigin = origin === currentUser;

  return (
    <Flex align={isCurrentUserOrigin ? "flex-end" : "flex-start"}>
      <Box
        my={1}
        mx={4}
        padding={4}
        backgroundColor={isCurrentUserOrigin ? "primary.600" : "gray.300"}
        borderBottomLeftRadius={16}
        borderBottomRightRadius={16}
        borderTopLeftRadius={isCurrentUserOrigin ? 16 : 0}
        borderTopRightRadius={isCurrentUserOrigin ? 0 : 16}
      >
        <Text color={isCurrentUserOrigin ? "white" : "black"}>{message}</Text>
      </Box>
    </Flex>
  );
}
