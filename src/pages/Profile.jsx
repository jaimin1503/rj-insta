import Saved from "./assets/Saved";
import Video from "./assets/Video.jsx";
import Grid from "./assets/Grid.jsx";
import UserPosts from "../components/UserPosts.jsx";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import BottomBar from "../components/BottomBar.jsx";
import Leftnav from "../components/leftnav.jsx";
import VideoPage from "./VideoPage.jsx";
import FollowingList from "../components/FollowingList.jsx";
import FollowersList from "../components/FollowersList.jsx";
import default_pic from "./assets/profilephoto.webp";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getuser } from "../reducers/userReducer.js";
import axios from "axios";
import Spinner from "../components/Spinner.jsx";
import SavedPost from "../components/SavedPost.jsx";
import NavbarSs from "../components/NavbarSs.jsx";
const Profile = () => {
  const allpost=useSelector((state)=>state.post)
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  let followingRef = useRef();
  let followersRef = useRef();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/user/getuser`, { withCredentials: true })
      .then((res) => {
        dispatch(getuser(res.data.user));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [showFollowers, showFollowing]);

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
  }, [location]);

  const formatBioWithLineBreaks = (bio) => {
    return bio?.replace(/\n/g, "<br>");
  };

  const handleVideoClick = (index) => {
    setActiveIndex(index);
  };
  const posts = user.profile?.posts || [];
  return (
    <>
      <div className=" absolute w-screen top-0 bg-white border-b block sm:hidden">
        <NavbarSs />
      </div>
      {/* {loading && <Spinner />} */}
      <div className=" h-screen flex overflow-hidden pt-10 pb-7 sm:pt-0 sm:pb-0">
        <div className="hidden sm:block">
          {" "}
          <Leftnav />
        </div>
        <div className="w-full sm:w-[85vw] overflow-y-scroll">
          <div className="profile_row1 flex p-5 ">
            <div className="profile_photo mr-5">
              <img
                className=" cursor-pointer rounded-full object-cover border-2 h-[110px] w-[110px] "
                src={user?.profile?.profilephoto || default_pic}
                alt="Profile_Pic"
              />
            </div>
            <div className="profile_info flex flex-col justify-center">
              <div className="user_name flex items-center pb-2">
                <h2 className=" pr-2">{user?.username}</h2>
              </div>
              <div className="edit_profile">
                <Link to={`/editprofile/${user._id}`}>
                  <button className=" py-2 px-5 rounded-lg bg-gray-300 cursor-pointer hover:bg-gray-400">
                    Edit profile
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="profile_row2 mx-5 max-w-[60vw]">
            <h2 className=" mb-2">{user?.profile?.profilename}</h2>
            <p
              className=" leading-4"
              dangerouslySetInnerHTML={{
                __html: formatBioWithLineBreaks(user?.profile?.bio),
              }}
            />
          </div>
          <hr className="my-5" />
          <div className="states flex justify-center">
            <div className="posts px-10 text-center leading-4">
              <h2>{user?.profile?.posts.length}</h2>
              <h3>Posts</h3>
            </div>
            <div ref={followersRef}>
              {showFollowers ? (
                <FollowersList
                  setShowFollowers={setShowFollowers}
                  followers={user.profile.followers}
                />
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
              {showFollowing && (
                <FollowingList
                  setShowFollowing={setShowFollowing}
                  following={user.profile.following}
                />
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
          {activeIndex === 0 ? (
            <div className="posts my-5">
              <UserPosts posts={posts} />
            </div>
          ) : (
            ""
          )}
          {activeIndex === 1 ? (
            <div className="posts my-5">
              <VideoPage />
            </div>
          ) : (
            ""
          )}
          {activeIndex === 2 ? (
            <div className="posts my-5">
              <SavedPost />
            </div>
          ) : (
            ""
          )}
          <div className="absolute w-screen bottom-0 bg-gray-100 py-2 block sm:hidden">
            <BottomBar />
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
