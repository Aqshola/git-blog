import React from "react";
import { Box, Flex, Heading, Input, Text } from "@chakra-ui/react";
import useTipTap from "components/Editor.tsx/useTipTap";

type Props = {};

export default function Detail() {
    const [Editor, content] = useTipTap("lalatina",false);
  return (
    <>
      <Flex p={"10"} justifyContent="space-between" alignItems={"center"}>
        <Heading textColor={"facebook.700"} fontSize={"2xl"}>
          Git-Blog
        </Heading>
        <Input w="48" placeholder="Search" />
      </Flex>
      <Box p="10">
        <Heading as="h2" size={"lg"} textAlign="center">
          Kenapa Banteng Menangis?
        </Heading>
        <Text textAlign={"center"} mt="5" fontSize={"lg"}>20 januari 2022</Text>
      </Box>
      <Box w={"full"} px={["10","10","20"]} mt={10}>
        <Editor  border={false} toolbar={false}/>
      </Box>
    </>
  );
}
