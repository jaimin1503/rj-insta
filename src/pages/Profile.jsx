import default_pic from "./assets/profilephoto.webp";
import SetttingsLogo from "./assets/Settings.svg";
import Saved from "./assets/Saved";
import Video from "./assets/Video.jsx";
import Grid from "./assets/Grid.jsx";

const Profile = () => {
  return (
    <div>
      <div className="profile_row1 flex p-5">
        <div className="profile_photo mr-5">
          <img
            className=" rounded-full object-cover border-2 sm:w-[20vw] h-[20vw] md:w-[10vw] md:h-[10vw] "
            src={default_pic}
            alt="Profile_Pic"
          />
        </div>
        <div className="profile_info flex flex-col justify-center">
          <div className="user_name flex my-2 items-center">
            <h2 className=" pr-2">Jaimin_15.3</h2>
            <img
              className=" h-8 w-8 cursor-pointer hover:scale-105"
              src={SetttingsLogo}
            />
          </div>
          <div className="edit_profile">
            <button className=" py-2 px-5 rounded-lg bg-gray-300 cursor-pointer hover:bg-gray-400">
              Edit profile
            </button>
          </div>
        </div>
      </div>
      <div className="profile_row2 mx-5 max-w-[40vw]">
        <h2>Jaimin Viramgama</h2>
        <p>kjhdf kshf sha fh kajhfkah kajhdf akjh kah dfas skhf gls</p>
      </div>
      <hr className="my-5" />
      <div className="states flex justify-center">
        <div className="posts px-10 text-center">
          <h2>20</h2>
          <h3>Posts</h3>
        </div>
        <div className="followers px-10 text-center">
          <h2>202</h2>
          <h3>Followers</h3>
        </div>
        <div className="following px-10 text-center">
          <h2>203</h2>
          <h3>Following</h3>
        </div>
      </div>
      <hr className="my-5" />
      <div className="center flex justify-center">
        <div className="content_types flex w-full justify-around sm:justify-around sm:w-full items-center md:w-2/4">
          <div className="posts px-10">
            <Grid stroke="gray" />
          </div>
          <div className="videos px-10">
            <Video />
          </div>
          <div className="saved px-10">
            <Saved stroke="gray" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
