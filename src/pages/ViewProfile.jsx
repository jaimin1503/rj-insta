import Saved from "./assets/Saved";
import Video from "./assets/Video.jsx";
import Grid from "./assets/Grid.jsx";
import UserPosts from "../components/UserPosts.jsx";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Leftnav from "../components/leftnav.jsx";
import ViewprofileFollowingList from "../components/ViewprofileFollowingList.jsx";
import ViewprofileFollowersList from "../components/ViewprofileFollowersList.jsx";
import Spinner from "../components/Spinner.jsx";
import NavbarSs from "../components/NavbarSs.jsx";
import BottomBar from "../components/BottomBar.jsx";

const ViewProfile = () => {
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [viewUser, setViewUser] = useState({});
  const { id } = useParams();
  const location = useLocation();
  const [follow, setFollow] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/user/getuserbyid/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setViewUser(res.data.newuser);
        setFollow(res.data.following);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [id, follow]);

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
  }, [location]);

  const handleFollow = () => {
    setLoading(true);
    axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/user/follow/${id}`,
        { userid: id },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setFollow(!follow);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleVideoClick = (index) => {
    setActiveIndex(index);
  };

  const formatBioWithLineBreaks = (bio) => {
    return bio?.replace(/\n/g, "<br>");
  };

  const posts = viewUser.profile?.posts || [];
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
          <div className="profile_row1 flex p-5">
            <div className="profile_photo mr-5">
              <img
                className=" cursor-pointer rounded-full object-cover border-2 h-[90px] w-[90px] sm:h-[110px] sm:w-[110px] "
                src={viewUser?.profile?.profilephoto}
                alt="Profile_Pic"
              />
            </div>
            <div className="profile_info flex flex-col justify-center">
              <div className="user_name flex items-center pb-2">
                <h2 className=" pr-2">{viewUser?.username}</h2>
              </div>
              <div className="buttons flex">
                <button
                  onClick={() => {
                    handleFollow();
                  }}
                  className={`py-1 px-5 text-white rounded-lg cursor-pointer mr-2 ${
                    !follow
                      ? " bg-blue-500 hover:bg-blue-600 "
                      : "bg-gray-500 hover:bg-gray-600"
                  }`}
                >
                  {!follow ? "Follow" : "Following"}
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
            <h2>{viewUser?.profile?.profilename}</h2>
            <p
              className=" leading-4"
              dangerouslySetInnerHTML={{
                __html: formatBioWithLineBreaks(viewUser?.profile?.bio),
              }}
            />
          </div>
          <hr className="my-5" />
          <div className="states flex justify-center">
            <div className="posts px-10 text-center">
              <h2>{viewUser?.profile?.posts.length}</h2>
              <h3>Posts</h3>
            </div>
            <div ref={followersRef}>
              {showFollowers ? (
                <ViewprofileFollowersList
                  show={setShowFollowers}
                  followers={viewUser.profile.followers}
                />
              ) : (
                ""
              )}
              <div
                onClick={() => setShowFollowers(!showFollowers)}
                className="followers px-10 text-center leading-4 cursor-pointer"
              >
                <h2>{viewUser?.profile?.followers?.length}</h2>
                <h3>Followers</h3>
              </div>
            </div>
            <div ref={followingRef}>
              {showFollowing ? (
                <ViewprofileFollowingList
                  show={setShowFollowing}
                  following={viewUser.profile.following}
                />
              ) : (
                ""
              )}
              <div
                onClick={() => setShowFollowing(!showFollowing)}
                className="following px-10 text-center leading-4 cursor-pointer"
              >
                <h2>{viewUser?.profile?.following.length}</h2>
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
            <UserPosts posts={posts} />
          </div>
          <div className="absolute w-screen bottom-0 bg-gray-100 py-2 block sm:hidden">
            <BottomBar />
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewProfile;
