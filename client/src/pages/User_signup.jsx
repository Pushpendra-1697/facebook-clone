import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  userAuthSignUP } from "../redux/userAuth/auth.actions";
import axios from "axios";

const initState = {
  username:"",
  email: "",
  password: "",
};
function User_signup() {
  // const { data, loading, error } = useSelector((store) => store.userMangerdata);
  // const { isAuthenticated } = data;
  // const [loginCreds, setLoginCreds] = useState({});
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initState);
  const navigate = useNavigate();
  // console.log(formData)

  const toast = useToast();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch(userAuthSignUP(formData));


    try{
      let res=await axios.post('https://graceful-fox-apron.cyclic.app/user/register',formData)


      console.log(res.data)

  }


  catch(err){
    console.log(err)


  }



      toast({
        position: "top",
        title:"You are Successfully created your account",
        // description: "done",
        status: "success",
        duration: 4000,
        isClosable: false,
      });
      console.log(formData)
      // navigate("/userLogin");
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={10}
          
        >
          <Stack spacing={4}>
            
            {/* <FormControl id="image" isRequired>
              <FormLabel>Upload Image</FormLabel>
              <Input 
              type="file"
              name="image"
              onChange={imageuploder}
              required
              />
            </FormControl> */}


                <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter Username"
                required
                // w={10}
              />
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"

                required
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>

              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                placeholder="Enter Password"

                  required
                />

                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                onClick={handleSubmit}
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link to="/userLogin" style={{ color: "blue" }}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>



        </Box>
      </Stack>
    </Flex>
  );
}

export default User_signup;
