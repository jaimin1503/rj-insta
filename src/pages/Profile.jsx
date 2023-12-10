import default_pic from "./assets/profilephoto.webp";

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
          <div className="user_name flex my-2">
            <h2 className=" pr-2">Jaimin_15.3</h2>
            <h2>SL</h2>
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
        <div className="posts px-10">
          <h2>20</h2>
          <h3>Posts</h3>
        </div>
        <div className="posts px-10">
          <h2>202</h2>
          <h3>Followers</h3>
        </div>
        <div className="posts px-10">
          <h2>203</h2>
          <h3>Following</h3>
        </div>
      </div>
    </div>
  );
};
export default Profile;
