import default_pic from "./assets/profilephoto.webp";
import SettingsLogo from "./assets/Settings.svg";
import Saved from "./assets/Saved";
import Video from "./assets/Video.jsx";
import Grid from "./assets/Grid.jsx";
import UserPosts from "../components/UserPosts.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [user, setUser] = useState({});
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

  const handleVideoClick = (index) => {
    setActiveIndex(index);
  };
  const posts = user.profile?.posts || [];
  return (
    <div>
      <div className="profile_row1 flex p-5">
        <div className="profile_photo mr-5">
          <img
            className=" cursor-pointer rounded-full object-cover border-2 sm:w-[20vw] h-[20vw] md:w-[10vw] md:h-[10vw] "
            src={default_pic}
            alt="Profile_Pic"
          />
        </div>
        <div className="profile_info flex flex-col justify-center">
          <div className="user_name flex my-2 items-center">
            <h2 className=" pr-2">{user?.username}</h2>
            <img
              className=" h-8 w-8 cursor-pointer hover:scale-105"
              src={SettingsLogo}
            />
          </div>
          <div className="edit_profile">
            <Link to="/editprofile">
              <button className=" py-2 px-5 rounded-lg bg-gray-300 cursor-pointer hover:bg-gray-400">
                Edit profile
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="profile_row2 mx-5 max-w-[40vw]">
        <h2>{user?.profile?.profilename}</h2>
        <p>kjhdf kshf sha fh kajhfkah kajhdf akjh kah dfas skhf gls</p>
      </div>
      <hr className="my-5" />
      <div className="states flex justify-center">
        <div className="posts px-10 text-center">
          <h2>{user?.profile?.posts.length}</h2>
          <h3>Posts</h3>
        </div>
        <div className="followers px-10 text-center">
          <h2>{user?.profile?.followers.length}</h2>
          <h3>Followers</h3>
        </div>
        <div className="following px-10 text-center">
          <h2>{user?.profile?.following.length}</h2>
          <h3>Following</h3>
        </div>
      </div>
      <hr className="my-5" />
      <div className="center flex justify-center">
        <div className="content_types flex w-full justify-around sm:justify-around sm:w-full items-center md:w-2/4">
          <div className="posts px-10">
            <Grid
              isActive={activeIndex === 0}
              onClick={() => handleVideoClick(0)}
            />
          </div>
          <div className="videos px-10">
            <Video
              isActive={activeIndex === 1}
              onClick={() => handleVideoClick(1)}
            />
          </div>
          <div className="saved px-10">
            <Saved
              isActive={activeIndex === 2}
              onClick={() => handleVideoClick(2)}
            />
          </div>
        </div>
      </div>
      <div className="posts my-5">
        <UserPosts posts={posts} />
      </div>
      {/* <div className="posts flex flex-wrap">
        {posts.map((post, index) => (
          <div key={index} className="w-1/3 p-[2px]">
            <div className="aspect-square">
              <img
                className="w-full h-full object-cover"
                src={post.posturl}
                alt="Your Image"
              />
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};
export default Profile;
