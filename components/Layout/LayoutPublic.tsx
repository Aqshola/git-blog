import React from "react";
import { Flex, Heading, Input } from "@chakra-ui/react";
import NextLink from "next/link";

type Props = {
  children: React.ReactNode;
  searchProps?:{
    change:(e:any)=>void;
    value:string;
  }
};
export default function LayoutPublic({ children,searchProps={
  value:"",
  change:()=>{}
} }: Props) {
  return (
    <>
      <Flex p={"10"} justifyContent="space-between" alignItems={"center"}>
        <NextLink href={"/"}>
          <Heading textColor={"facebook.700"} fontSize={"2xl"}>
            Git-Blog
          </Heading>
        </NextLink>
        <Input value={searchProps.value} onChange={searchProps.change} w="48" placeholder="Search" />
      </Flex>
      {children}
    </>
  );
}
