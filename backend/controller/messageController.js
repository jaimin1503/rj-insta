import asyncHandler from "express-async-handler";
import Message from "../model/messageModel.js";
import Chat from "../model/ChatModel.js";
import User from "../model/user.model.js";

const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate({
        path: "sender",
        select: "username email",
        populate: {
          path: "profile",
          select: "profilephoto",
        },
      })
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  const newMessage = {
    sender: req.user.userid,
    content: content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);

    message = await Message.findById(message._id)
      .populate({
        path: "sender",
        select: "username",
        populate: {
          path: "profile",
          select: "profilephoto",
        },
      })
      .populate("chat");

    message = await User.populate(message, {
      path: "chat.users",
      select: "username email",
      populate: {
        path: "profile",
        select: "profilephoto",
      }, // Populate profilephoto within profile
    });

    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

export { allMessages, sendMessage };
