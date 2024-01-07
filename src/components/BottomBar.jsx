import Chat from "./assets/Chat";
import Create from "./assets/Create";
import Home from "./assets/Home";
import Video from "./assets/Video";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const BottomBar = () => {
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
    <div className=" sm:hidden">
      <div className="icons flex justify-around ">
        <div className=" cursor-pointer">
          <Link to="/home">
            <Home />
          </Link>
        </div>

        <div className=" cursor-pointer">
          <Link to="/createpost">
            <Create />
          </Link>
        </div>
        <div className=" cursor-pointer">
          <Link to="/video">
            <Video />
          </Link>
        </div>
        <div className=" cursor-pointer">
          <Link to="/chat">
            <Chat />
          </Link>
        </div>
        <div className=" cursor-pointer">
          <Link to="/profile">
            <img
              className=" h-[26px] w-[26px] object-cover rounded-full"
              src={user?.profile?.profilephoto}
              alt="img"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default BottomBar;
