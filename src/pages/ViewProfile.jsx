
import Saved from "./assets/Saved";
import Video from "./assets/Video.jsx";
import Grid from "./assets/Grid.jsx";
import UserPosts from "../components/UserPosts.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const Profile = () => {
  const [activeIndex, setActiveIndex] = useState(0);

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

  const handleVideoClick = (index) => {
    setActiveIndex(index);
  };
  const posts = user.profile?.posts || [];
  return (
    <div>
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
        <UserPosts posts={posts} user={user} />
      </div>
    </div>
  );
};
export default Profile;
