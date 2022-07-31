import { Heading, Stack, Button, Spinner, Box } from "@chakra-ui/react";

import React, { useState } from "react";
import Card from "../../components/Card/Card";
import LayouDashboard from "../../components/Layout/LayouDashboard";
import NextLink from "next/link";
import useSWR from "swr";
import fetcher from "utils/fetcher";
import usePaging from "components/Pagination/Paging";
import NextHead from "next/head"



export default function Dashboard() {
  const { data } = useSWR("/api/admin/post/get", fetcher);
  const [Paging, dataPaging] = usePaging();

  return (
    <LayouDashboard>
      <NextHead>
        <title>Dashboard</title>1
      </NextHead>
      <Heading size={"2xl"}>Post</Heading>
      <NextLink href={"/admin/post/create"} passHref aria-label="New Post">
        <Button mb={"10"} colorScheme={"green"} mt="10">
          New Post
        </Button>
      </NextLink>

      {!data && (
        <Box mt={10}>
          <Spinner size={"lg"} />
        </Box>
      )}
      <Stack w={["full", "full", "xl"]} spacing={5}>
        {data && data.data.length == 0 && (
          <Heading mt={10} size="xl" fontWeight={"medium"}>
            No Post Yet 😟
          </Heading>
        )}

        {data &&
          data.data.length > 0 &&
          data.data
            .slice(dataPaging.active, dataPaging.active + dataPaging.length)
            .map((el: any, i: number) => (
              <NextLink passHref href={`/admin/post/${el.slug}`} key={el.slug}>
                <a>
                  <Card slug={el.slug} title={el.title} />
                </a>
              </NextLink>
            ))}
      </Stack>
      <Box w={["full", "full", "xl"]} >
        {data && <Paging data={data.data} />}
      </Box>
    </LayouDashboard>
  );
}
