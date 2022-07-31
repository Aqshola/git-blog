import React, { useEffect } from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";

import SideDesktop from "../SideNav/Desktop";
import SideMobile from "../SideNav/Mobile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

type Props = {
  children: React.ReactNode;
};

export default function LayouDashboard({ ...props }: Props) {
  const { data, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!data) {
        router.push("/admin/login?error=true");
      }
    }
  }, [loading]);

  if (typeof window !== undefined && loading) {
    return null;
  }

  return (
    <Box width={"full"}>
      <SideMobile />
      <Grid
        templateColumns={"repeat(12,1fr)"}
        padding="10"
        minH="100vh"
        paddingTop={[10, 10, 24]}
      >
        <SideDesktop />
        <GridItem colSpan={[12, 12, 10]} paddingX={["0", "0", "10"]}>
          {props.children}
        </GridItem>
      </Grid>
    </Box>
  );
}
