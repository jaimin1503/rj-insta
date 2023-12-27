import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState(null); // Set default values
  const [user, setUser] = useState(null); // Set default values
  const [notification, setNotification] = useState([]); // Set default values
  const [chats, setChats] = useState([]); // Set default values

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5555/user/getuser", { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        // Redirect to an error page or handle the error accordingly
      });
  }, []); // Removed unnecessary dependency

  useEffect(() => {
    if (!user) {
      navigate("/"); // Redirect if user is not available
    }
  }, [user, navigate]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
