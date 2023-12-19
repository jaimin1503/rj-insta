import React, { useContext, useState, useEffect } from "react";
import { categories } from "../context/constant";
import Leftnavitem from "./leftnavitem";
import { useNavigate } from "react-router";
import { Context } from "../context/contextApi";
import instagramlogo from "./assets/writtenlogo.jpg";
import axios from "axios";
function Leftnav() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { selectedCategory, setSelectedCategory, mobileMenu } =
    useContext(Context);
  useEffect(() => {
    axios
      .get("http://localhost:5555/user/getuser", { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
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
    <div
      className={` w-[240px] overflow-y-auto h-full py-4 text-black z-10 translate-x-[-240px] sm:translate-x-0 transition-all border-r-2`}
    >
      <div className="flex px-5 flex-col mx-auto gap-4    ">
        <img
          src={instagramlogo}
          className="bg-white h-10 w-24 object-contain "
        ></img>
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
            <p className=" text-xl">Profile</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leftnav;
