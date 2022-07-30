import React from "react";
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  Button,
  Divider,
} from "@chakra-ui/react";

import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import SideDesktop from "../SideNav/Desktop";
import { HamburgerIcon } from "@chakra-ui/icons";
import SideMobile from "../SideNav/Mobile";
import Card from "../Card/Card";

type Props = {
  children: React.ReactNode;
};

export default function LayouDashboard({ ...props }: Props) {
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
