import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Link,
  Spinner,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import type { NextPage } from "next";
import useSWR from "swr";
import fetcher from "utils/fetcher";
import NextLink from "next/link";
import LayoutPublic from "components/Layout/LayoutPublic";
import { useState } from "react";
import usePaging from "components/Pagination/Paging";
import NextHead from "next/head"

const Home: NextPage = () => {
  const { data } = useSWR("/api/admin/post/get", fetcher);
  const [Paging, dataPaging] = usePaging();
  const [search, setsearch] = useState("")
  
  

  return (
    <LayoutPublic displaySearch={true} searchProps={{
      value:search,
      change:(e=>setsearch(e.target.value))
    }}>
      <NextHead>
        <title>Git Blog</title>
      </NextHead>
      <Box p="10">
        <Heading as="h2" size={"lg"}>
          Post List
        </Heading>
        <Box
          display={"flex"}
          flexDir={["column", "column", "row"]}
          gap={5}
          mt="10"
          flexWrap={"wrap"}
        >
          {!data && <Spinner />}
          {data &&
            data.data.length > 0 &&
            data.data
              .filter((el:any)=>el.title.toLowerCase().includes(search.toLowerCase()))
              .slice(dataPaging.active, dataPaging.active + dataPaging.length)
              .map((el: any, i: number) => (
                <NextLink passHref href={`/post/${el.slug}`} key={el.slug}>
                  <Link w={["full", "full", "64"]}>
                    <Card slug={el.slug} title={el.title} />
                  </Link>
                </NextLink>
              ))}
        </Box>
        {data && <Paging data={data.data.filter((el:any)=>el.title.toLowerCase().includes(search.toLowerCase()))} />}
      </Box>
    </LayoutPublic>
  );
};

export default Home;
