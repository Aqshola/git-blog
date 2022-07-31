import { Box, Button, Flex, FormLabel, Heading, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useTipTap from "components/Editor/useTipTap";
import LayouDashboard from "components/Layout/LayouDashboard";
import { useSWRConfig } from "swr";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import useCreate from "hooks/post/create";

type Props = {};

export default function Create({}: Props) {
  const [Editor, content] = useTipTap();
  const [title, settitle] = useState<string>("");
  const toast = useToast();
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [create, status, error, loading] = useCreate();

  useEffect(() => {
    if (!loading && status === "success") {
      router.push("/dashboard");
      toast({
        title: "Post Created Successfuly",
        isClosable: true,
        status: "success",
        duration: 5000,
      });
    }
  }, [loading]);

  async function _submit() {
    create(title, content || "", () => mutate("/admin/dashboard"));
  }

  return (
    <LayouDashboard>
      <Heading size={"2xl"}>Create Post</Heading>

      <Box
        as="form"
        w={["full", "full", "2xl"]}
        px={[0, 0, 5]}
        onSubmit={(e) => {
          e.preventDefault();
          _submit();
        }}
      >
        <Box mt={10}>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input
            onChange={(e: any) => settitle(e.target.value)}
            required
            id="title"
            placeholder="Title"
            size={"lg"}
          />
        </Box>
        <Editor />
        <Flex mt={5} gap={5} justifyContent="right">
          <Button
            type="submit"
            colorScheme={"green"}
            isLoading={loading}
            disabled={loading}
          >
            Submit
          </Button>
        </Flex>
      </Box>
    </LayouDashboard>
  );
}
