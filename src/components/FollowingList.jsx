import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function FollowingList() {
  const { user } = useSelector((state) => state.user);

  return (
    <div>
      <div className="following absolute top-[50%] left-[50%] w-[65vw] translate-x-[-50%] translate-y-[-50%] z-10 bg-white rounded-lg shadow-xl">
        <div className=" border-b p-2 row1 flex justify-center items-center">
          <p className="p-2">Following</p>
        </div>
        <div className="list">
          {user?.profile?.following?.map((follow) => (
            <div key={follow._id}>
              <div className="container flex items-center py-1 m-3">
                <div className="image flex justify-center items-center w-[20%] ">
                  <img
                    className=" h-[38px] w-[38px] object-cover rounded-full "
                    src={follow?.profile?.profilephoto}
                    alt="photo"
                  />
                </div>
                <div className="leading-4 w-[35%] ">
                  <Link to={`/viewprofile/${follow._id}`}>
                    {follow.username}
                  </Link>
                  <p className=" text-sm text-gray-600">
                    {follow.profile.profilename}
                  </p>
                </div>
                <div className="followButton w-[45%] flex justify-center">
                  <button className=" cursor-pointer py-2 px-5 bg-gray-300 rounded-lg">
                    Following
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
export default FollowingList;
