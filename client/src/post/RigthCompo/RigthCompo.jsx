import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  HStack,
  Heading,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const RigthCompo = ({ data }) => {
  //profile

  const handleProfile = () => {
    console.log(data);
    localStorage.setItem("profile", data._id);
  };
  return (
    <>
      <Box>
        <NavLink to="/profile">
          <Card
            h="max-content"
            boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
            mt="20px"
            border={"1px"}
            borderColor={"gray.400"}
            onClick={handleProfile}
          >
            <CardBody>
              <Box display={"flex"} alignItems={"center"}>
                <Avatar
                  size="0.5x0.5"
                  name="Segun Adebayo"
                  w={50}
                  src={data?.profilePicture}
                />

                <Stack ml={5}>
                  <Divider />
                  <Text size="md" textAlign={"center"} fontWeight="bold">
                    {data?.username}
                  </Text>
                </Stack>
              </Box>
            </CardBody>
          </Card>
        </NavLink>
      
      </Box>
    </>
  );
};

export default RigthCompo;
