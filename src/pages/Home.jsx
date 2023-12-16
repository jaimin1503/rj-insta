import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {getuser} from "../reducers/userReducer.js"
import { useEffect } from "react";
import Leftnav from "../components/leftnav.jsx"
export const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  console.log("before data",user);

  useEffect(() => {
    axios
      .get("http://localhost:5555/user/getuser", { withCredentials: true })
      .then((res) => {
        // setUser(res.data.user);
        dispatch(getuser(res.data.user))
        console.log("afterdata",user)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className=" h-screen flex overflow-hidden">
     <div className="hidden sm:block">
        {" "}
        <Leftnav />
      </div>
      <h1>This is home pages</h1>
    </div>
  );
};
