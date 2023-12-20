import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getuser } from "../reducers/userReducer.js";
import { useEffect, useContext } from "react";
import Leftnav from "../components/leftnav.jsx";
import BottomBar from "../components/BottomBar.jsx";
import { Context } from "../context/contextApi.jsx";
import StoryBar from "../components/story/StoryBar.jsx";
export const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { loading } = useContext(Context);
  console.log("afterdata", user);

  useEffect(() => {
    axios
      .get("http://localhost:5555/user/getuser", { withCredentials: true })
      .then((res) => {
        dispatch(getuser(res.data.user));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [loading]);
  return (
    <div className=" h-screen flex overflow-hidden">
      <div className="hidden sm:block">
        {" "}
        <Leftnav />
      </div>
      <StoryBar />
      <div className="fixed w-screen bottom-0 bg-gray-100 py-2 block sm:hidden">
        <BottomBar />
      </div>
    </div>
  );
};
