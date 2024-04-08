import React, { useContext, useState, useEffect, useRef } from "react";
import { categories } from "../context/constant";
import Leftnavitem from "./leftnavitem";
import { useNavigate } from "react-router";
import { Context } from "../context/contextApi";
import axios from "axios";
import Spinner from "./Spinner";
import Search from "./assets/Search";
import SearchCompo from "./SearchCompo";
import FriendsFlock from "./assets/UntitledFriendsFlock.svg";
import { useDispatch, useSelector } from "react-redux";
import { getuser } from "../reducers/userReducer";
function Leftnav() {
  const navigate = useNavigate();
  // const dispatch=useDispatch
  const [user, setUser] = useState(null);
  // const {user}=useSelector((state)=>state.user)
  const [loading, setLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef();
  const { selectedCategory, setSelectedCategory, mobileMenu } =
    useContext(Context);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/user/getuser`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    let handler = (e) => {
      if (!searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const clickHandler = (name, type) => {
    switch (type) {
      case "explore":
        setSelectedCategory("explore");
        break;
      case "home":
        setSelectedCategory("home");
        break;

      default:
        return false;
    }
  };
  return (
    <>
      {/* {loading && <Spinner />} */}
      <div className=" h-screen border-r-2">
        <div
          className={` w-[240px] overflow-y-auto h-full py-4 text-black z-10 translate-x-[-240px] sm:translate-x-0 transition-all`}
        >
          <div ref={searchRef} className="flex px-5 flex-col mx-auto gap-4    ">
            <div className="logo flex items-center">
              <img
                src={FriendsFlock}
                className="bg-white h-12 w-12 object-contain "
              ></img>
              <p className=" font-mono">FriendsFlock</p>
            </div>
            {categories.map((navitem) => {
              return (
                <Leftnavitem
                  key={navitem.name}
                  icon={navitem.icon}
                  name={navitem.name}
                  action={() => {
                    clickHandler(navitem.name, navitem.type);
                    navigate(`/${navitem.type}`);
                  }}
                />
              );
            })}
            <div
              onClick={() => setShowSearch(!showSearch)}
              className=" flex mb-3 cursor-pointer py-3 "
            >
              <div>
                <Search />
              </div>
              <p className="px-5 text-xl">Search</p>
            </div>
            {showSearch && <SearchCompo />}
            <div className="user_info flex  items-start   ">
              <div
                className=" flex cursor-pointer "
                onClick={() => {
                  navigate("/profile");
                }}
              >
                <div className="profile_photo mr-5 my-auto ">
                  <img
                    className="object-cover rounded-full w-[35px] h-[35px]"
                    src={user?.profile?.profilephoto}
                    alt="Profile_Pic"
                  />
                </div>
                <p className="text-xl">Profile</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Leftnav;
