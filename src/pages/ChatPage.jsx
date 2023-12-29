import ChatSearch from "../chat/ChatSearch";
import LeftBarLogo from "../components/LeftBarLogo";
import MyChats from "../chat/MyChats";
import ChatBox from "../chat/ChatBox";
import { ChatState } from "../context/chatProvider";
import { useState } from "react";

const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
  return (
    <>
      <div className=" h-screen fixed">
        {" "}
        <LeftBarLogo />
      </div>
      <div className="search ml-16">
        <ChatSearch />
        <div className=" box flex justify-between w-full h-[80vh]">
          {user && <MyChats fetchAgain={fetchAgain} />}
          {user && (
            <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </div>
      </div>
    </>
  );
};
export default ChatPage;
