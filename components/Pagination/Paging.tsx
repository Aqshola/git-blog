import React, { useState } from "react";
import { Button, Flex } from "@chakra-ui/react";

type Props = {
  data: any[];
};

export default function usePaging(): [
  ({ data }: Props) => JSX.Element,
  {
    length: number;
    active: number;
  }
] {
  const [paging, setpaging] = useState({
    length: 6,
    active: 0,
  });
  const Element = React.useMemo(() => {
    const PageList = ({ data }: Props) => (
      <Flex mt={"10"} w="full" justifyContent={"center"} gap="5">
        {Array.from(Array(Math.round(data.length / paging.length)).keys()).map(
          (el) => (
            <Button
              key={el}
              colorScheme={paging.active === el ? "facebook" : "gray"}
              onClick={() => {
                setpaging({ ...paging, active: el });
              }}
            >
              {el + 1}
            </Button>
          )
        )}
      </Flex>
    );

    return PageList;
  }, [paging]);
  return [Element, paging];
}
