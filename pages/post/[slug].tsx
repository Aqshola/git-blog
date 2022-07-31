import React from "react";
import { Box, Flex, Heading, Input, Spinner, Text } from "@chakra-ui/react";
import useTipTap from "components/Editor/useTipTap";
import LayoutPublic from "components/Layout/LayoutPublic";
import { useRouter } from "next/router";
import useSWR from "swr";
import { POST_TYPE, RESPONSE_POST } from "types/types";
import fetcher from "utils/fetcher";
import NextHead from "next/head";

export default function Detail() {
  const router = useRouter();
  const { slug } = router.query;
  const { data: dataPost, error: errorPost } = useSWR<RESPONSE_POST<POST_TYPE>>(
    slug ? `/api/admin/post/${slug}` : null,
    fetcher
  );
  const [Editor] = useTipTap(dataPost?.data.content, false);

  function parseDate(date: Date) {
    return Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      weekday: "long",
      day: "2-digit",
    }).format(new Date(date));
  }

  return (
    <LayoutPublic>
      {!dataPost && <Spinner />}
      {dataPost && (
        <>
          <NextHead>
            <title>{dataPost.data.title}</title>
          </NextHead>
          <Box p="10">
            <Heading as="h2" size={"lg"} textAlign="center">
              {dataPost.data.title}
            </Heading>
            <Text textAlign={"center"} mt="5" fontSize={"lg"}>
              {parseDate(dataPost.data.createAt)}
            </Text>
          </Box>
          <Box w={"full"} px={["10", "10", "20"]} mt={10}>
            <Editor border={false} toolbar={false} />
          </Box>
        </>
      )}
    </LayoutPublic>
  );
}
