import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin_login from "../pages/Admin_login";
import Admin_signup from "../pages/Admin_signup";
import Home from "../pages/Home";
import Message from "../pages/Message";
import Notification from "../pages/Notification";
import Profile from "../pages/Profile";
import User_login from "../pages/User_login";
import User_signup from "../pages/User_signup";
import PrivetRouts from "./PrivetRouts";
import LogProfile from "../pages/LogProfile";
import RigthCompo from "../post/RigthCompo/RigthCompo";
import Search from "../pages/Search";
import Lobby from "../screens/Lobby";
import Room from "../screens/Room";

function All_route() {
  return (
    <div>
      {/* LogProfile */}
      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route
          path="/message"
          element={
            <PrivetRouts>
              <Message />
            </PrivetRouts>
          }
        ></Route>

        <Route
          path="/profile"
          element={
            <PrivetRouts>
              <Profile />
            </PrivetRouts>
          }
        ></Route>

        <Route
          path="/log_profile"
          element={
            <PrivetRouts>
              <LogProfile />
            </PrivetRouts>
          }
        ></Route>

        <Route
          path="/all_user"
          element={
            <PrivetRouts>
              <RigthCompo />
            </PrivetRouts>
          }
        ></Route>

        <Route
          path="/notification"
          element={
            <PrivetRouts>
              <Notification />
            </PrivetRouts>
          }
        ></Route>
        <Route path="/adminLogin" element={<Admin_login />}></Route>
        <Route path="/adminSignup" element={<Admin_signup />}></Route>
        <Route path="/userLogin" element={<User_login />}></Route>
        <Route path="/userSignup" element={<User_signup />}></Route>
        <Route path="/lobby" element={<Lobby />}></Route>
        <Route path="/room/:roomId" element={<Room />}></Route>
      </Routes>
    </div>
  );
}

export default All_route;
