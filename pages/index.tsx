import { Box, Flex, Heading, Input } from "@chakra-ui/react";
import type { NextPage } from "next";


const Home: NextPage = () => {
  return (
    <>
      <Flex p={"10"} justifyContent="space-between" alignItems={"center"}>
        <Heading textColor={"facebook.700"} fontSize={"2xl"}>
          Git-Blog
        </Heading>
        <Input w="48" placeholder="Search" />
      </Flex>
      <Box p="10" >
        <Heading as="h2" size={"lg"}>
          Post List
        </Heading>
        <Box display={"flex"} flexDir={["column", "column", "row"]} mt="10" gap={10}>
          <Box
            w={["full", "full", "64"]}
            border="solid black"
            p="5"
            rounded={"lg"}
            borderWidth={2}
          >
            <Heading as="h3" size={"md"}>
              Heading 1
            </Heading>
          </Box>
          <Box
            w={["full", "full", "64"]}
            border="solid black"
            p="5"
            rounded={"lg"}
            borderWidth={2}
          >
            <Heading as="h3" size={"md"}>
              Heading 1
            </Heading>
          </Box>
          <Box
            w={["full", "full", "64"]}
            border="solid black"
            p="5"
            rounded={"lg"}
            borderWidth={2}
          >
            <Heading as="h3" size={"md"}>
              Heading 1
            </Heading>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
