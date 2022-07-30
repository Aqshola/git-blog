import { Box, Button, FormLabel, Stack } from "@chakra-ui/react";
import React from "react";
import NextImage from "next/image";

export default function Login() {
  async function _login() {
    await fetch("/api/admin/auth/github", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  return (
    <Stack as="form" h={"100vh"} py="20" alignItems={"center"} spacing={5}>
      <Box width={200}>
        <NextImage
          src={"/github.png"}
          layout="responsive"
          width={600}
          height={250}
        />
      </Box>
      <Button colorScheme={"facebook"} w={"fit-content"} onClick={_login}>
        Login dengan Github admin
      </Button>
    </Stack>
  );
}
