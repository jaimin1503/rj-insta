import ChatSearch from "../chat/ChatSearch";
import LeftBarLogo from "../components/LeftBarLogo";
import MyChats from "../chat/MyChats";
import ChatBox from "../chat/ChatBox";
import { ChatState } from "../context/chatProvider";
import { useState } from "react";
import BottomBar from "../components/BottomBar";

const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user, selectedChat } = ChatState();
  return (
    <div className=" h-screen">
      <div className=" h-screen fixed hidden md:block">
        {" "}
        <LeftBarLogo />
      </div>
      <div className="search md:ml-16 ml-0 hidden md:block pb-7">
        <ChatSearch />
        <div className=" box flex justify-between w-full h-[85vh] pt-10">
          {user && <MyChats fetchAgain={fetchAgain} />}
          {user && (
            <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </div>
      </div>
      <div className="search md:ml-16 ml-0 block md:hidden">
        <ChatSearch />
        <div className=" box flex justify-between w-full h-[85vh] md:pt-10">
          {user && !selectedChat && <MyChats fetchAgain={fetchAgain} />}
          {user && selectedChat && (
            <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </div>
      </div>
      <div className="absolute w-screen bottom-0 bg-gray-100 py-2 block md:hidden">
        <BottomBar />
      </div>
    </div>
  );
};
export default ChatPage;
