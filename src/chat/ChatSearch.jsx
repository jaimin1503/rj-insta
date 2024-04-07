import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";

import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon, Icon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import { Spinner } from "@chakra-ui/spinner";
import ProfileModal from "./miscellaneous/ProfileModal";
import { getSender } from "../config/ChatLogics";
import "./styles.css";
import { ChatState } from "../context/chatProvider";
import { useNavigate } from "react-router-dom";
import { Search } from "@mui/icons-material";
import Badge from "@mui/material/Badge";

function ChatSearch() {
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    // Fetch all users once when the component mounts
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/user/getalluser`, {
        withCredentials: true,
      })
      .then((res) => {
        setUsers(res.data.alluser);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // Filter users locally instead of making an API call on each change
    const filteredUsers = users.filter(
      (user) =>
        value && user.username.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredUsers);
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/chat`,
        { userId, id: user._id },
        { withCredentials: true }
      );
      setLoading(false);

      // console.log(data);

      // console.log(chats);

      if (!chats?.find((c) => c._id === data._id)) {
        // Using a functional update to correctly update chats state
        setChats((prevChats) => [data, ...prevChats]);
      }
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        className=" flex justify-between items-center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <Search />
            <Text d={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans" fontWeight="600">
          Chats
        </Text>
        <div className="test flex">
          <Menu>
            <MenuButton p={1}>
              <div className=" flex items-center">
                <p>{notification.length}</p>
                <BellIcon fontSize="2xl" m={1} />
              </div>
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user?.username}
                src={user?.profile?.profilephoto}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>{" "}
              </ProfileModal>
              <MenuDivider />
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box d="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={inputValue}
                onChange={handleInputChange}
              />
              {/* <Button onClick={handleSearch}>Go</Button> */}
            </Box>
            {loading ? (
              <Spinner />
            ) : (
              suggestions.map((user) => (
                <div
                  key={user._id}
                  className=" py-2 cursor-pointer"
                  onClick={() => accessChat(user._id)}
                >
                  <div className=" flex items-center">
                    <div className="profile_pic">
                      <img
                        className=" h-[36px] w-[36px] object-cover rounded-full mx-2"
                        src={user?.profile?.profilephoto}
                        alt="profilepic"
                      />
                    </div>
                    <div className="userinfo">
                      <p className="">{user?.username}</p>
                      <p className=" text-gray-400 text-xs">
                        {user?.profile?.profilename}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default ChatSearch;
