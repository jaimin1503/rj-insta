import Chat from "./assets/Chat";
import Create from "./assets/Create";
import Home from "./assets/Home";
import Video from "./assets/Video";
import Explore from "./assets/Explore";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const LeftBarLogo = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/user/getuser`, { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className=" h-screen w-[60px] border-r">
      <div className=" flex flex-col items-center">
        <div className=" cursor-pointer my-5">
          <Link to="/home">
            <Home />
          </Link>
        </div>
        <div className=" cursor-pointer my-5">
          <Link to="/explore">
            <Explore />
          </Link>
        </div>
        <div className=" cursor-pointer my-5">
          <Link to="/createpost">
            <Create />
          </Link>
        </div>
        <div className=" cursor-pointer my-5">
          <Link to="/video">
            <Video />
          </Link>
        </div>
        <div className=" cursor-pointer my-5">
          <Link to="/chat">
            <Chat />
          </Link>
        </div>
        <div className=" cursor-pointer my-5">
          <Link to="/profile">
            <img
              className=" h-[26px] w-[26px] object-cover rounded-full"
              src={user?.profile?.profilephoto}
              alt=""
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LeftBarLogo;
