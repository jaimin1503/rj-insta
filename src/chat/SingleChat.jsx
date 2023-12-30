import io from "socket.io-client";
import { useState, useEffect } from "react";
import axios from "axios";
import { getSender, getSenderFull } from "../config/ChatLogics.js";
import ProfileModal from "./miscellaneous/ProfileModal.jsx";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import { ChatState } from "../context/chatProvider.jsx";
const ENDPOINT = "http://localhost:5555";
var socket, selectedChatCompare;
import { ArrowBack } from "@mui/icons-material";
import Spinner from "../components/Spinner.jsx";
import { useToast } from "@chakra-ui/react";
import ScrollableChat from "./ScrollableChat.jsx";
import "./styles.css";
import { Input } from "@chakra-ui/input";
import typingGif from "./assets/typing.gif";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const toast = useToast();

  console.log(istyping);

  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);

      const { data } = await axios.get(
        `http://localhost:5555/api/message/${selectedChat._id}`,
        {
          withCredentials: true,
          params: {
            chatId: selectedChat._id,
          },
        }
      );
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      event.preventDefault();
      socket.emit("stop typing", selectedChat._id);
      try {
        setNewMessage("");
        const { data } = await axios.post(
          "http://localhost:5555/api/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          { withCredentials: true }
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        console.log(error);
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        console.log(error);
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => {
      setTyping(true);
      setIsTyping(true);
    });

    socket.on("stop typing", () => {
      setTyping(false);
      setIsTyping(false);
    });

    // eslint-disable-next-line
    return () => {
      socket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat, fetchAgain, setFetchAgain]);

  useEffect(() => {
    if (socket) {
      socket.on("message received", (newMessageReceived) => {
        if (
          !selectedChatCompare || // if chat is not selected or doesn't match current chat
          selectedChatCompare._id !== newMessageReceived.chat._id
        ) {
          if (!notification.includes(newMessageReceived)) {
            setNotification([newMessageReceived, ...notification]);
            setFetchAgain(!fetchAgain);
          }
        } else {
          setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
        }
      });
    }

    return () => {
      if (socket) {
        socket.off("message received");
      }
    };
  }, [socket, selectedChatCompare, notification]);

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 2000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };
  return (
    <>
      {selectedChat ? (
        <div className=" h-[70vh]">
          <h1 className=" text-sm pb-3 px-2 w-full font-sans flex justify-between items-center">
            <div
              onClick={() => setSelectedChat("")}
              className="icon flex md:hidden"
            >
              <ArrowBack />
            </div>
            {messages &&
              (!selectedChat.isGroupChat ? (
                <>
                  {getSender(user, selectedChat.users)}
                  <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                  />
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModal
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                </>
              ))}
          </h1>
          <div className="box flex flex-col justify-end p-3 bg-blue-400 h-full w-full rounded-lg overflow-y-hidden">
            {loading ? (
              <Spinner />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
            <form onKeyDown={sendMessage} id="first-name" className=" mt-3">
              {istyping ? (
                <div>
                  <img className=" h-[25px] m-5" src={typingGif} alt="" />
                </div>
              ) : (
                <></>
              )}
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </form>
          </div>
        </div>
      ) : (
        // JSX when no chat is selected
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <p style={{ fontSize: "24px", fontFamily: "Arial, sans-serif" }}>
            Click on a user to start chatting
          </p>
        </div>
      )}
    </>
  );
};
export default SingleChat;
