import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { userAuthLogin } from "../redux/userAuth/auth.actions";
import { useDispatch, useSelector } from "react-redux";

const initState = {
  email: "",
  password: "",
};

let url = "https://graceful-fox-apron.cyclic.app/"

function User_login() {
  const { data, loading, error } = useSelector((store) => store.userMangerdata);
  const [formData, setFormData] = useState(initState);
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(`https://graceful-fox-apron.cyclic.app/user/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          email: formData.email,
        },
      });
      res = await res.json();
      if (res.msg == "Blocked") {
        alert(`You are Blocked for 24 Hours`);
        return;
      }
    } catch (err) {
      console.log(err);
    }

    dispatch(userAuthLogin(formData));
  };

  if (data.massege === "login successful") {

    setTimeout(() => {
      navigate("/");
    }, 2000);
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </FormControl>

            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
              </Stack>
              <Button
                onClick={handleSubmit}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign in
              </Button>

              <NavLink to="/userSignup">
                <Button
                  bg={"green"}
                  color={"white"}
                  _hover={{
                    bg: "green",
                  }}
                >
                  Sign up
                </Button>
              </NavLink>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default User_login;
