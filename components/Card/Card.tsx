import React from "react";
import { Flex, Heading } from "@chakra-ui/react";

type Props = {
  slug: string;
  title: string;
};

export default function Card({ ...props }: Props) {
  return (
    
      <Flex
      cursor={"pointer"}
        justifyContent={"space-between"}
        borderColor="WindowFrame"
        transition={"all 0.2s ease-in-out"}
        _hover={{
          borderColor: "green",
          textColor: "green",
          transform: "translateY(-10px)",
        }}
        w="full"
        borderWidth={2}
        padding="5"
        rounded="md"
      >
        <Heading w={"full"} textOverflow="ellipsis" size={"md"}>{props.title}</Heading>
      </Flex>
    
  );
}
