import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Input,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useTipTap from "../../../components/Editor.tsx/useTipTap";
import LayouDashboard from "../../../components/Layout/LayouDashboard";
import useSwr, { useSWRConfig } from "swr";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { POST_TYPE, RESPONSE_POST } from "../../../types/types";
import useUpdate from "hooks/post/update";
import useRemove from "hooks/post/remove";
import fetcher from "utils/fetcher";
type Props = {};

export default function UpdatePost({}: Props) {
  const [title, settitle] = useState<string>("");
  const toast = useToast();
  const router = useRouter();
  const { slug } = router.query;

  
  const { data: dataPost, error: errorPost } = useSwr<RESPONSE_POST<POST_TYPE>>(
    slug ? `/api/admin/post/${slug}` : null,
    fetcher
  );
  const { mutate } = useSWRConfig();

  const [Editor, content] = useTipTap(dataPost?.data.content);
  const [update, statusUpdate, errorUpdate, loadingUpdate] = useUpdate();
  const [remove, statusRemove, errorRemove, loadingRemove] = useRemove();

  useEffect(() => {
    if (!loadingUpdate && statusUpdate!=null) {
      if (statusUpdate === "success") {
        router.push("/dashboard");
        toast({
          title: `Post ${title} Updated`,
          isClosable: true,
          status: "success",
          duration: 5000,
        });
      }else{
        toast({
          title: `Post ${title} Failed to Removed`,
          isClosable: true,
          status: "error",
          duration: 5000,
        });
      }
    }
  }, [loadingUpdate]);

  useEffect(() => {
    if (!loadingRemove && statusRemove !=null)
     {
      if (statusRemove === "success") {
        router.push("/dashboard");
        toast({
          title: `Post ${title} Removed`,
          isClosable: true,
          status: "success",
          duration: 5000,
        });
      } else {
        toast({
          title: `Post ${title} Failed to Removed`,
          isClosable: true,
          status: "error",
          duration: 5000,
        });
      }
    }
  }, [loadingRemove]);

  async function _submit(titleParam: string) {
    await update(titleParam, content || "", () => {
      mutate(`/api/admin/post/${slug}`);
    });
  }

  async function _delete(titleParam: string) {
    remove(titleParam, () => mutate("/admin/dashboard"));
  }

  return (
    <LayouDashboard>
      <Heading size={"2xl"}>Update Post</Heading>

      {!dataPost && (
        <Box mt={10}>
          <Spinner size={"lg"} />
        </Box>
      )}

      {dataPost && dataPost.data && (
        <Box
          as="form"
          w={["full", "full", "2xl"]}
          px={[0, 0, 5]}
          onSubmit={(e) => {
            e.preventDefault();
            _submit(dataPost.data.title);
          }}
        >
          <Box mt={10}>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              isDisabled={true}
              value={dataPost.data.title}
              onChange={(e: any) => settitle(e.target.value)}
              required
              id="title"
              placeholder="Title"
              size={"lg"}
            />
          </Box>
          <Editor />
          <Flex mt={5} gap={2} justifyContent="right">
            <NextLink href={"/dashboard"}>
              <Button type="button" colorScheme={"gray"}>
                Cancel
              </Button>
            </NextLink>
            <Button
              type="button"
              colorScheme={"red"}
              isLoading={loadingRemove}
              disabled={loadingUpdate||loadingRemove}
              onClick={() => _delete(dataPost.data.title)}
            >
              Delete
            </Button>
            <Button
              type="submit"
              colorScheme={"green"}
              isLoading={loadingUpdate}
              disabled={loadingUpdate||loadingRemove}
            >
              Update
            </Button>
          </Flex>
        </Box>
      )}
    </LayouDashboard>
  );
}
