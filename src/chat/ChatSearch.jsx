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
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useState, useEffect } from "react";
import axios from "axios";
import { IonItem, IonSpinner } from "@ionic/react";
import Search from "../components/assets/Search";
import { Close } from "@mui/icons-material";
import { useDisclosure, useToast } from "@chakra-ui/react";
import ProfileModal from "./miscellaneous/ProfileModal";
import { getSender } from "../config/ChatLogics";
import UserListItem from "./userAvatar/UserListItem";
import { ChatState } from "../context/chatProvider";
import { useNavigate } from "react-router-dom";

const ChatSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
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
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/user/getalluser`, {
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
    console.log(userId);

    try {
      setLoadingChat(true);

      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  return (
    <div>
      <div className="header px-5 border-r">
        <div className="search">
          <div className=" flex flex-col">
            <input
              type="text"
              className=" rounded-lg p-2 outline-none absolute pl-10 bg-gray-100 my-2"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type to Search..."
            />
            <div className=" flex justify-between w-[225px]">
              <div className="relative p-2 cursor-pointer w-[25px] h-[25px] my-2">
                <Search />
              </div>
              {!loading && (
                <div
                  onClick={() => setInputValue("")}
                  className="relative p-2 cursor-pointer float-right text-gray-500 my-[6px]"
                >
                  <Close />
                </div>
              )}
              {loading && (
                <div className="p-2">
                  <IonItem>
                    <IonSpinner name="lines-sharp-small"></IonSpinner>
                  </IonItem>
                </div>
              )}
            </div>
          </div>
          <Menu>
            <MenuButton p={1}>
              <p>{notification.length}</p>
              <BellIcon fontSize="2xl" m={1} />
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
                src={user?.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>{" "}
              </ProfileModal>
              <MenuDivider />
            </MenuList>
          </Menu>
          <ul className="mt-2 mx-5">
            {suggestions.map((user) => (
              <div key={user._id} className=" py-2">
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
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default ChatSearch;
