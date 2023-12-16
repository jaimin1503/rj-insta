import Saved from "./assets/Saved";
import Video from "./assets/Video.jsx";
import Grid from "./assets/Grid.jsx";
import UserPosts from "../components/UserPosts.jsx";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Leftnav from "../components/leftnav.jsx";
const ViewProfile = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5555/user/getuserbyid/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  let followingRef = useRef();
  let followersRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!followingRef.current.contains(e.target)) {
        setShowFollowing(false);
      }
      if (!followersRef.current.contains(e.target)) {
        setShowFollowers(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const handleVideoClick = (index) => {
    setActiveIndex(index);
  };
  const posts = user.profile?.posts || [];
  return (
    <div className=" h-screen flex overflow-hidden">
      <div className="hidden sm:block">
        {" "}
        <Leftnav />
      </div>
      <div className="w-full sm:w-[85vw] overflow-y-scroll">
      <div className="profile_row1 flex p-5">
        <div className="profile_photo mr-5">
          <img
            className=" cursor-pointer rounded-full object-cover border-2 h-[110px] w-[110px] "
            src={user?.profile?.profilephoto}
            alt="Profile_Pic"
          />
        </div>
        <div className="profile_info flex flex-col justify-center">
          <div className="user_name flex items-center pb-2">
            <h2 className=" pr-2">{user?.username}</h2>
          </div>
          <div className="buttons flex">
            <button className=" py-1 px-5 bg-blue-400 hover:bg-blue-500 text-white rounded-lg cursor-pointer mr-2">
              Follow
            </button>
            <div className="message  py-1 px-5 bg-gray-300 hover:bg-gray-400 text-black rounded-lg cursor-pointer">
              <Link to="/chat">
                <button>Message</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="profile_row2 mx-5 max-w-[40vw]">
        <h2>{user?.profile?.profilename}</h2>
        <p>{user?.profile?.bio}</p>
      </div>
      <hr className="my-5" />
      <div className="states flex justify-center">
        <div className="posts px-10 text-center">
          <h2>{user?.profile?.posts.length}</h2>
          <h3>Posts</h3>
        </div>
        <div ref={followersRef}>
          {showFollowers ? (
            <FollowersList followers={user.profile.followers} />
          ) : (
            ""
          )}
          <div
            onClick={() => setShowFollowers(!showFollowers)}
            className="followers px-10 text-center leading-4 cursor-pointer"
          >
            <h2>{user?.profile?.followers.length}</h2>
            <h3>Followers</h3>
          </div>
        </div>
        <div ref={followingRef}>
          {showFollowing ? (
            <FollowingList following={user.profile.following} />
          ) : (
            ""
          )}
          <div
            onClick={() => setShowFollowing(!showFollowing)}
            className="following px-10 text-center leading-4 cursor-pointer"
          >
            <h2>{user?.profile?.following.length}</h2>
            <h3>Following</h3>
          </div>
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
        <UserPosts posts={posts} user={user} />
      </div>
    </div>
    </div>
  );
};
export default ViewProfile;
