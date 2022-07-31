import {
  Alert,
  Box,
  Button,
  AlertDescription,
  AlertTitle,
  AlertIcon,
  CloseButton,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import NextImage from "next/image";
import fetcher from "utils/fetcher";
import useSWR from "swr";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
export default function Login() {
  const router = useRouter();
  const { error } = router.query;
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });
  const { data, status } = useSession();
  const loading = status === "loading";
  
  useEffect(() => {
    if (error) {
      onOpen();
    }
  }, [error]);

  useEffect(() => {
    if (!loading) {
      if (data) {
        router.push("/admin/dashboard");
      }
    }
  }, [loading]);

  if (typeof window !== undefined && loading) {
    return null;
  }



  return (
    <Stack
      method="POST"
      action="/api/auth/signin/github"
      as="form"
      h={"100vh"}
      py="20"
      alignItems={"center"}
      spacing={5}
      px={5}
    >
      {isOpen && (
        <Alert status="error">
          <AlertIcon />
          <Box>
            <AlertDescription>
              You didnt have permission to access
            </AlertDescription>
          </Box>
          <CloseButton ml={"auto"} position="relative" onClick={onClose} />
        </Alert>
      )}
      <Box width={200}>
        <NextImage
          src={"/github.png"}
          layout="responsive"
          width={600}
          height={250}
        />
      </Box>
      <Button
        colorScheme={"facebook"}
        w={"fit-content"}
        onClick={() => {
          signIn("github",{
            callbackUrl:"/admin/dashboard"
          });
        }}
      >
        Login dengan Github admin
      </Button>
    </Stack>
  );
}
