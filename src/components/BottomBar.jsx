import Chat from "./assets/Chat";
import Create from "./assets/Create";
import Home from "./assets/Home";
import Video from "./assets/Video";
import Explore from "./assets/Explore";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const BottomBar = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className=" sm:hidden">
      <div className="icons flex justify-around ">
        <div className=" cursor-pointer">
          <Link to="/home">
            <Home />
          </Link>
        </div>
        <div className=" cursor-pointer">
          <Link to="/explore">
            <Explore />
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
              alt=""
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default BottomBar;
