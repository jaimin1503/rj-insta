import React from "react";

import Chat from "../components/assets/Chat";
import Create from "../components/assets/Create";
import Home from "../components/assets/Home";
import Video from "../components/assets/Video";
import Explore from "../components/assets/Explore";

export const categories = [
  { name: "Home", icon: <Home />, type: "home" },
  // { name: "Explore", icon: <Explore />, type: "explore" },
  // { name: "Video", icon: <Video />, type: "video" },
  { name: "Create", icon: <Create />, type: "createpost" },
  { name: "Chat", icon: <Chat />, type: "chat" },
];
// export const restcategories=[
//     { name: "Settings", icon: <FiSettings />, type: "menu" },

// ];
