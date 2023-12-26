import ChatSearch from "../chat/ChatSearch";
import LeftBarLogo from "../components/LeftBarLogo";
import MyChats from "../chat/MyChats";
import ChatBox from "../chat/ChatBox";

const ChatPage = () => {
  return (
    <>
      <div className=" h-screen fixed">
        {" "}
        <LeftBarLogo />
      </div>
      <div className="search ml-16 bg-black">
        <ChatSearch />
        <div className=" box flex justify-between bg-blue-100 w-full">
          <MyChats />
          <ChatBox />
        </div>
      </div>
    </>
  );
};
export default ChatPage;
