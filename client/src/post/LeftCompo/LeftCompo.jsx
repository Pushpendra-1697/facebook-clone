import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Heading,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const LeftCompo = () => {
  const [userdata, setuserdata] = useState();

  let userId = localStorage.getItem("id");

  const getUser = async () => {
    try {
      const res = await axios(
        `https://graceful-fox-apron.cyclic.app/user/${userId}`
      );
      setuserdata(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  // console.log("userdata", userdata?.username);


 

  return (
    <>
     


      <Box>
        <Card
          h="max-content"
          boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
          mt="20px"
          border={"1px"}
          borderColor={"gray.400"}
        >
          <CardBody>
            <Box display={"flex"} justifyContent="center" alignItems={"center"}>
              <Avatar
                size="0.5x0.5"
                name="Segun Adebayo"
                w={300}
                src={userdata?.profilePicture}
              />
            </Box>
            <Stack mt="6" spacing="3">
              <Divider />
              <NavLink to="/log_profile">

              <Text size="md" textAlign={"center"} fontWeight="bold">
                {userdata?.username}
              </Text>
              </NavLink>

              <NavLink to="/log_profile">


              <Text
                textAlign={"center"}
                color={"#666666"}
                _hover={{ textDecoration: "underline", cursor: "pointer" }}
              >
                 {userdata?.email}
              </Text>
              </NavLink>

              <Divider />
            
            </Stack>
         
          </CardBody>
        </Card>
      </Box>
    </>
  );
};

export default LeftCompo;
