import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Button } from "@chakra-ui/react";
import { ChatState } from "../context/chatProvider";
import "./styles.css";
import { IonSpinner, IonItem } from "@ionic/react";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState({});
  const [loading, setLoading] = useState(false);
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const toast = useToast();

  const fetchChats = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/chat`,
        {
          withCredentials: true,
        }
      );
      setChats(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      // Check the type of error and display a specific message accordingly
      if (error.response) {
        // The request was made and the server responded with a status code
        toast({
          title: "Server Error!",
          description: `Status: ${error.response.status}`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      } else if (error.request) {
        // The request was made but no response was received
        toast({
          title: "Network Error!",
          description:
            "Failed to fetch data. Please check your internet connection.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      } else {
        console.log(error);
        // Something happened in setting up the request that triggered an error
        toast({
          title: "Error!",
          description: "Failed to fetch data. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/user/getuser`, {
        withCredentials: true,
      })
      .then((res) => setLoggedUser(res.data.user))
      .catch((error) => console.log(error));
    setLoading(false);
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      {loading && (
        <div className=" flex justify-center items-center w-full h-full">
          <IonItem>{loading && <IonSpinner />}</IonItem>
        </div>
      )}
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        className=" flex"
      >
        <p>My Chats</p>
        <GroupChatModal>
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="90%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats?.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
                d="flex"
              >
                <Text fontSize={"lg"} fontWeight={"600"}>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users) || "Sender"
                    : chat.chatName || "Group Chat"}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs" zIndex={100}>
                    <b>
                      {chat.latestMessage?.sender?.username ||
                        "FriendsFlock User"}{" "}
                    </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content || "hii"}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};
export default MyChats;
