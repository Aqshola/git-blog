import React, { useState } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  Button,
  Divider,
  Slide,
} from "@chakra-ui/react";

import { Avatar } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";

export default function Mobile() {
  const [show, setshow] = useState<boolean>(false);
  const { data } = useSession();

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
              <Avatar
                name={data?.user?.name || ""}
                src={data?.user?.image || ""}
              />
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

          <Button
            mt={"auto"}
            width="fit-content"
            type="submit"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
          >
            Log out
          </Button>
        </Box>
      </Slide>
    </>
  );
}
