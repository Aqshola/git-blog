import React from "react";
import { Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";

type Props = {
  slug: string;
  title: string;
};

export default function Card({ ...props }: Props) {
  return (
    <Link href={`/admin/post/${props.slug}`}>
      <Flex
        justifyContent={"space-between"}
        borderColor="WindowFrame"
        transition={"all 0.2s ease-in-out"}
        _hover={{
          borderColor: "green",
          textColor: "green",
          transform: "translateY(-10px)",
        }}
        borderWidth={2}
        mt={"10"}
        padding="5"
        rounded="md"
      >
        <Heading size={"md"}>{props.title}</Heading>
      </Flex>
    </Link>
  );
}
