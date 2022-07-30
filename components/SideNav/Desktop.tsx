import React from "react";
import {
  Box,
  Flex,
  GridItem,
  Heading,
  Stack,
  Text,
  Button,
  Divider,
} from "@chakra-ui/react";

import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";

type Props = {};

export default function Desktop({}: Props) {
  return (
    <GridItem
      colSpan={2}
      display={["none", "none", "flex"]}
      flexDir="column"
      paddingX="5"
      borderRightWidth={2}
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
      <Divider mt="5" />
      <Stack spacing={5} mt="5">
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
      <Button mt={"auto"} width="fit-content">Log out</Button>
    </GridItem>
  );
}
