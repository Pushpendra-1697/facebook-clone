import { Flex, HStack, Heading, Image, Stack } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

function SearchModal({data,handleProfile}) {
   
  return (
    <div>
      <Stack>
      <NavLink to="/profile">

       
            <HStack
              key={data.id}
              gap={"10px"}
              p={"10px"}
              borderRadius={"20px"}
              _hover={{
                backgroundColor: "rgb(0, 0, 0, 0.2)",
                color: "white",
              }}
              onClick={() => handleProfile(data._id)}

            >
              <Image src={data.profilePicture} maxHeight={"70px"} w={"40px"} />
              <Flex textAlign={"left"} direction={"column"}>
                <Heading size={"sm"} textAlign="left" m={"0"}>
                  {data.username}
                </Heading>
              </Flex>
            </HStack>
            </NavLink>

      </Stack>
    </div>
  );
}

export default SearchModal;
