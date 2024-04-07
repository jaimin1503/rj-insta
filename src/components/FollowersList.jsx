import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Spinner from "./Spinner";
import { useRef } from "react";
import { useEffect } from "react";

function FollowersList({ followers, setShowFollowers }) {
  const [followbtn, setFollow] = useState(true);
  const [loading, setLoading] = useState(false);
  const followersListRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        followersListRef.current &&
        !followersListRef.current.contains(event.target)
      ) {
        setShowFollowers(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowFollowers]);

  const handleFollow = (id) => {
    setLoading(true);
    axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/user/removefollow/${id}`,
        { userid: id },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setFollow(!followbtn);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="overlay">
      {/* {loading && <Spinner />} */}
      <div
        ref={followersListRef}
        className="following absolute top-[50%] left-[50%] w-[340px] h-[450px] overflow-y-scroll translate-x-[-50%] translate-y-[-50%] z-10 bg-white rounded-lg shadow-xl sm:w-[350px] "
      >
        <div className=" border-b p-2 row1 flex justify-center items-center">
          <p className="p-2">Followers</p>
        </div>
        <div className="list ">
          {followers?.map((follower) => (
            <div key={follower._id}>
              <div className="container flex items-center py-1 m-3 whitespace-nowrap">
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
                    className={`py-1 px-5 text-white rounded-lg cursor-pointer mr-2  bg-gray-400 hover:bg-gray-500"
                    `}
                  >
                    Remove
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
