import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getuser } from "../reducers/userReducer.js";
import { useEffect, useContext } from "react";
import Leftnav from "../components/leftnav.jsx";
import BottomBar from "../components/BottomBar.jsx";
import { Context } from "../context/contextApi.jsx";
import StoryBar from "../components/story/StoryBar.jsx";
import HomepostCard from "../components/HomepostCard.jsx";
import shuffleArray from "../utils/suffleArray.js";
import NavbarSs from "../components/NavbarSs.jsx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Suggestion from "../components/suggestions/Suggestion.jsx";
import { setpost } from "../reducers/postReducer.js";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [allpost, setallpost] = useState([]);
  const allpost = useSelector((state) => state.post);
  const [isloading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { story, setstory, isstory, setisstory } = useContext(Context);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/user/getuser`, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(getuser(res.data.user));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);
  useEffect(() => {
    if (allpost.length > 0) {
      console.log("inside if");
      return;
    } else {
      console.log("inside else");
      setIsLoading(true);
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/user/getallpost`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log("post of ", res.data);
          dispatch(setpost(shuffleArray(res.data.posts)));
          // setallpost(res.data.posts);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  }, []);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/user/getuserstory`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          setisstory(true);
          setstory(res.data.story);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      <div className=" absolute w-screen top-0 border-b bg-white block sm:hidden">
        <NavbarSs />
      </div>
      <div className=" h-screen flex overflow-hidden pt-10 pb-10 sm:pt-0 sm:pb-0">
        <div className="hidden sm:block">
          {" "}
          <Leftnav />
        </div>
        <div className="w-full sm:w-[85vw] overflow-y-scroll pt-10 md:pt-3">
          <div className="container flex flex-col items-center ">
            <div className=" max-w-sm md:max-w-lg lg:max-w-xl flex items-center ">
              <div>
                {isstory ? (
                  <div className="flex flex-col justify-center items-center">
                    <div className="container frame rounded-full cursor-pointer h-[60px] w-[60px] flex justify-center items-center">
                      <Link to={`/viewstory/${story._id}`}>
                        <img
                          className="h-[56px] w-[56px] frame rounded-full object-cover border-2"
                          src={user?.profile?.profilephoto}
                          alt="profilePic"
                        />
                      </Link>
                    </div>
                    <p className=" ">{user?.username}</p>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center">
                    <div className="container frame rounded-full cursor-pointer h-[60px] w-[60px] flex justify-center items-center">
                      <img
                        className="h-[56px] w-[56px] frame rounded-full object-cover border-2"
                        src={user?.profile?.profilephoto}
                        alt="profilePic"
                        onClick={() => {
                          navigate("/storycreate");
                        }}
                      />
                    </div>
                    <p className=" font-semibold">{user?.username}</p>
                  </div>
                )}
              </div>
              <StoryBar />
            </div>
            <div className="allposts w-[50%] flex justify-center">
              <div className="">
                {allpost[0]?.map((post, index) => {
                  return (
                    <div className="mt-4" key={index}>
                      <HomepostCard postid={post._id} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className=" hidden lg:block">
          <Suggestion />
        </div>
        <div className="fixed w-screen bottom-0 bg-gray-100 py-2 block sm:hidden">
          <BottomBar />
        </div>
      </div>
    </>
  );
};
