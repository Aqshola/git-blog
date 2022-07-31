import React from "react";
import { Box, Flex, Heading, Input, Text } from "@chakra-ui/react";
import useTipTap from "components/Editor/useTipTap";
import LayoutPublic from "components/Layout/LayoutPublic";

type Props = {};

export default function Detail() {
  const [Editor] = useTipTap("lalatina",false);
  return (
    <LayoutPublic>
      <Box p="10">
        <Heading as="h2" size={"lg"} textAlign="center">
          Kenapa Banteng Menangis?
        </Heading>
        <Text textAlign={"center"} mt="5" fontSize={"lg"}>20 januari 2022</Text>
      </Box>
      <Box w={"full"} px={["10","10","20"]} mt={10}>
        <Editor  border={false} toolbar={false}/>
      </Box>
    </LayoutPublic>
  );
}
