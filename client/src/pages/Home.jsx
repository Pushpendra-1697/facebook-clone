import { Box, Button, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import LeftCompo from "../post/LeftCompo/LeftCompo";
import MainPost from "../post/mainpost/MainPost";
import axios from "axios";
import RigthCompo from "../post/RigthCompo/RigthCompo";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";

import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

function Home() {
  const [userdata, setuserdata] = useState();

  const getUser = async () => {
    try {
      const res = await axios(`https://graceful-fox-apron.cyclic.app/user`);
      setuserdata(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  //  userdata.reverse()

  // console.log("Rigth", userdata);

  // Pagination


  return (
    <div>
      <Box w="88%" h="120vh" m="auto" display="flex" gap="5">
        <Box
          w="25%"
          display={{ base: "none", sm: "none", md: "none", lg: "block" }}
        >
          <LeftCompo />
        </Box>

        <Box flex={1} h="100%" overflowY={"scroll"} className="scroll-hidden">
          {/* <HamburgerIcon 
          onClick={handleDisplay}
          display={{ base: "none", sm: "none", md: "none", lg: "block" }}
          className="ham"

          /> */}
          <MainPost />
        </Box>
        <Box
          w="25%"
          display={{ base: "none", sm: "none", md: "none", lg: "block" }}
          id="display"
        >
          <Text mt={5}>
            <b>All Active Users {userdata?.length}</b>
          </Text>
          {/* <CloseIcon 
          onClick={handleDisplayNone}
          display={{ base: "none", sm: "none", md: "none", lg: "block" }}
          className="ham"

          /> */}

          {userdata?.map((el, index) => {
            return <RigthCompo key={index} data={el} />;
          })}
     
        </Box>
      </Box>
    </div>
  );
}

export default Home;
