import { Box } from "@chakra-ui/react"; // Changed import path to Chakra UI
import { useState } from "react";
import Chatbox from "../Chatbox";
import MyChats from "../MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { useChatState } from "../context/ChatProvider"; // Updated the import for ChatState

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = useChatState(); // Changed to useChatState to access user

  return (
    <div style={{ width: "100%" }} className=" bg-black">
      {user && <SideDrawer />}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {/* {user && <MyChats fetchAgain={fetchAgain} />} */}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chatpage;
