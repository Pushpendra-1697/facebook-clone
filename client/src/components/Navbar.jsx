import React from "react";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  HStack,
  IconButton,
  InputGroup,
  InputLeftAddon,
  Input,
  InputLeftElement,
} from "@chakra-ui/react";
import {
  AddIcon,
  AtSignIcon,
  BellIcon,
  ChatIcon,
  CloseIcon,
  HamburgerIcon,
  MoonIcon,
  PlusSquareIcon,
  Search2Icon,
  SunIcon,
} from "@chakra-ui/icons";
import User_Auth from "./User_Auth";
import Search from "../pages/Search";

const Links = [
  { url: "profile", title: "Profile" },
  { url: "message", title: "Message" },
  { url: "all_user", title: "All User" },


];

let Auth = true;

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box bg={useColorModeValue("#DADBDD", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <NavLink to="/">
              <Box mr={100}>Logo</Box>
            </NavLink>
            <HStack
              as={"nav"}
              spacing={30}
              display={{ base: "none", md: "flex" }}
              // border='1px' borderColor='gray.200'
              ml={50}
            >
              <NavLink to="/">
                <PlusSquareIcon className="icon" />
              </NavLink>

              <NavLink to="/message">
                <ChatIcon className="icon" />
              </NavLink>
              <NavLink to="/log_profile">
                <AtSignIcon className="icon" />
              </NavLink>

              <NavLink to="/notification">
                <BellIcon className="icon" />
              </NavLink>
            </HStack>
          </HStack>

          {/* <InputGroup w="500">
            <InputLeftElement
              pointerEvents="none"
              children={<Search2Icon color="gray.300" />}
            />
            <Input type="tel" placeholder="Search people"  />
          </InputGroup> */}

              <Search />



          <Flex alignItems={"center"}>
            <Button mr={4} onClick={toggleColorMode}>
              {colorMode === "light" ? (
                <MoonIcon className="icon" />
              ) : (
                <SunIcon className="icon" />
              )}
            </Button>
            <Menu>
              <User_Auth />
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink
                  key={link.url}
                  to={`/${link.url}`}
                  onClick={() => {
                    onClose();
                  }}
                >
                  {link.title}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}

export default Navbar;
