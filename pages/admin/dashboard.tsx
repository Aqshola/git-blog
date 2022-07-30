import {
  Heading,
  Stack,
  Button,
  Skeleton,
  Spinner,
  Box,
} from "@chakra-ui/react";

import React, { useState } from "react";
import Card from "../../components/Card/Card";
import LayouDashboard from "../../components/Layout/LayouDashboard";
import NextLink from "next/link";
import useSWR from "swr";
import fetcher from "utils/fetcher";

type Props = {};

export default function Dashboard({}: Props) {
  const { data, error } = useSWR("/api/admin/post/get", fetcher);

  return (
    <LayouDashboard>
      <Heading size={"2xl"}>Post</Heading>
      <NextLink href={"/admin/post/create"} passHref aria-label="New Post">
        <Button colorScheme={"green"} mt="10">
          New Post
        </Button>
      </NextLink>

      {!data && (
        <Box mt={10}>
          <Spinner size={"lg"} />
        </Box>
      )}
      <Stack w={["full", "full", "xl"]} cursor="pointer" spacing={5}>
        {data && data.data.length == 0 && (
          <Heading mt={10} size="xl" fontWeight={"medium"}>
            No Post Yet 😟
          </Heading>
        )}

        {data &&
          data.data.length > 0 &&
          data.data
            .slice(0, 5)
            .map((el: any, i: number) => (
              <Card slug={el.slug} key={i} title={el.title} />
            ))}
      </Stack>
    </LayouDashboard>
  );
}
