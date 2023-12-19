import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
function FollowersList({followers}) {
const [followbtn, setFollow] = useState(true);

const handleFollow = (id) => {
  axios
    .post(
      `http://localhost:5555/user/removefollow/${id}`,
      { userid: id },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      if (res.status === 200) {
        setFollow(!followbtn);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
  return (
    <div>
      <div className="following absolute top-[50%] left-[50%] w-[65vw] translate-x-[-50%] translate-y-[-50%] z-10 bg-white rounded-lg shadow-xl sm:w-[350px] ">
        <div className=" border-b p-2 row1 flex justify-center items-center">
          <p className="p-2">Followers</p>
        </div>
        <div className="list">
          {followers?.map((follower) => (
            <div key={follower._id}>
              <div className="container flex items-center py-1 m-3">
                <div className="image flex justify-center items-center w-[20%] ">
                  <img
                    className=" h-[38px] w-[38px] object-cover rounded-full "
                    src={follower?.profile?.profilephoto}
                    alt="photo"
                  />
                </div>
                <div className="leading-4 w-[35%] ">
                  <Link to={`/viewprofile/${follower._id}`}>
                    {follower.username}
                  </Link>
                  <p className=" text-sm text-gray-600">
                    {follower.profile.profilename}
                  </p>
                </div>
                <div className="followButton w-[45%] flex justify-center">
                  <button
                    onClick={() => {
                      handleFollow(follower._id);
                    }}
                    className={`py-1 px-5 text-white rounded-lg cursor-pointer mr-2 ${
                      !followbtn
                        ? " bg-blue-500 hover:bg-blue-600 "
                        : "bg-gray-400 hover:bg-gray-500"
                    }`}
                  >
                    {!followbtn? "Follow" : "Remove"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default FollowersList;
