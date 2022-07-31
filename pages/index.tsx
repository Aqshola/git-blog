import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import type { NextPage } from "next";
import useSWR from "swr";
import fetcher from "utils/fetcher";
import NextLink from "next/link";
import LayoutPublic from "components/Layout/LayoutPublic";
import { useState } from "react";
import usePaging from "components/Pagination/Paging";
import NextHead from "next/head";

const Home: NextPage = () => {
  const { data } = useSWR("/api/admin/post/get", fetcher);
  const [Paging, dataPaging] = usePaging();
  const [search, setsearch] = useState("");

  return (
    <LayoutPublic
      displaySearch={true}
      searchProps={{
        value: search,
        change: (e) => setsearch(e.target.value),
      }}
    >
      <NextHead>
        <title>Git Blog</title>
      </NextHead>
      <Box px="10">
        <Box
          textColor={"white"}
          w={"full"}
          display="flex"
          justifyContent={"center"}
          alignItems="center"
          flexDir={"column"}
          h="64"
          rounded={"md"}
          bg={"facebook.500"}
        >
          <Heading fontSize={"5xl"}>Git Blog</Heading>
          <Text mt={"2"}>Blog but with github</Text>
        </Box>
        <Box
          justifyContent={"center"}
          display={"flex"}
          flexDir={["column", "column", "row"]}
          gap={5}
          mt="10"
          flexWrap={"wrap"}
        >
          {!data && (
            <Box w={"full"} display="flex" justifyContent={"center"} py="10">
              <Spinner mx={"auto"} my="auto" />
            </Box>
          )}

          {data && data.data.length == 0 && (
            <Heading mt={10} size="xl" fontWeight={"medium"}>
              No Post Yet 😟
            </Heading>
          )}

          {data &&
            data.data.length > 0 &&
            data.data
              .filter((el: any) =>
                el.title.toLowerCase().includes(search.toLowerCase())
              )
              .slice(dataPaging.active, dataPaging.active + dataPaging.length)
              .map((el: any, i: number) => (
                <NextLink passHref href={`/post/${el.slug}`} key={el.slug}>
                  <Link style={{ textDecoration: 'none' }} w={["full", "full", "72"]}>
                    <Card slug={el.slug} title={el.title} />
                  </Link>
                </NextLink>
              ))}
        </Box>
        {data && (
          <Paging
            data={data.data.filter((el: any) =>
              el.title.toLowerCase().includes(search.toLowerCase())
            )}
          />
        )}
      </Box>
    </LayoutPublic>
  );
};

export default Home;
