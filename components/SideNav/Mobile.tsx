import React, { useState } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  Button,
  Divider,
  Slide,
} from "@chakra-ui/react";

import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
type Props = {};

export default function Mobile({}: Props) {
  const [show, setshow] = useState<boolean>(false);

  function _handleShow(value: boolean) {
    setshow(value);
    if (document) {
      if (value) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }
  }

  return (
    <>
      <Button
        display={["auto", "auto", "none"]}
        ml={10}
        mt={10}
        position={show ? "sticky" : "relative"}
        top={0}
        onClick={() => +_handleShow(!show)}
      >
        <HamburgerIcon
          transition={"all 0.1s"}
          transform={show ? "rotate(90deg)" : "rotate(0deg)"}
        />
      </Button>

      <Slide
        direction="left"
        in={show}
        style={{
          zIndex: 10,
          top: 100,
        }}
      >
        <Box
          bgColor={"white"}
          position="absolute"
          display={["flex", "flex", "none"]}
          flexDir="column"
          left="0"
          w={"full"}
          paddingX="10"
          paddingY={"10"}
          h={"full"}
          zIndex="10"
          
        >
          <Heading size={"lg"}>Git-Blog</Heading>
          <Box>
            <Text>Welcome Back</Text>
            <Flex mt={5} alignItems="center" gap={2}>
              <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
              <Heading size={"md"} as="h3">
                Aqshola
              </Heading>
            </Flex>
          </Box>
          <Divider mt="10" />
          <Stack spacing={5} mt="5" mb="auto">
            <Button
              justifyContent={"start"}
              variant="solid"
              isActive={true}
              colorScheme={"facebook"}
              size="lg"
            >
              Post
            </Button>
          </Stack>
          <Button w="fit-content" >
            Log out
          </Button>
        </Box>
      </Slide>
    </>
  );
}
