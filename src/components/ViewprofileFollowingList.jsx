import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useContext, useEffect, useRef } from "react";
import { Context } from "../context/contextApi";
import { getuser } from "../reducers/userReducer";
import Spinner from "./Spinner";

function ViewprofileFollowingList({ following, show }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [followbtn, setFollow] = useState(true);
  const { loading, setLoading } = useContext(Context);
  const follwRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (follwRef.current && !follwRef.current.contains(event.target)) {
        show(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/user/getuser`, {
        withCredentials: true,
      })
      .then((res) => {
        // setUser(res.data.user);
        dispatch(getuser(res.data.user));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [followbtn]);
  const handleFollow = (id) => {
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
          setFollow(!followbtn);
          setLoading(!loading);
        }
        console.log(res.data.message);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="overlay">
      {/* {loading && <Spinner />} */}
      <div
        ref={follwRef}
        className="following absolute top-[50%] left-[50%] w-[340px] h-[450px] overflow-y-scroll translate-x-[-50%] translate-y-[-50%] z-10 bg-white rounded-lg shadow-xl sm:w-[350px] "
      >
        <div className=" border-b p-2 row1 flex justify-center items-center">
          <p className="p-2">Following</p>
        </div>
        <div className="list">
          {following?.map((follow) => (
            <div key={follow._id}>
              <div className="container flex items-center py-1 m-3 whitespace-nowrap">
                <div className="image flex justify-center items-center w-[20%] ">
                  {user._id !== follow._id ? (
                    <Link to={`/viewprofile/${follow._id}`}>
                      <img
                        className=" h-[38px] w-[38px] object-cover rounded-full "
                        src={follow?.profile?.profilephoto}
                        alt="photo"
                      />
                    </Link>
                  ) : (
                    <Link to={`/profile`}>
                      <img
                        className=" h-[38px] w-[38px] object-cover rounded-full "
                        src={follow?.profile?.profilephoto}
                        alt="photo"
                      />
                    </Link>
                  )}
                </div>
                <div className="leading-4 w-[35%] ">
                  {user._id !== follow._id ? (
                    <Link to={`/viewprofile/${follow._id}`}>
                      {follow.username}
                    </Link>
                  ) : (
                    <Link to={`/profile`}>{follow.username}</Link>
                  )}
                  <p className=" text-sm text-gray-600">
                    {follow.profile.profilename}
                  </p>
                </div>
                <div className="followButton w-[45%] flex justify-center">
                  {user?.profile?.following &&
                  user.profile.following.some(
                    (userfollow) => userfollow._id === follow._id
                  ) ? (
                    <button
                      onClick={() => {
                        handleFollow(follow._id);
                      }}
                      className={`py-1 px-5 text-white rounded-lg cursor-pointer mr-2 bg-gray-400 hover:bg-gray-500`}
                    >
                      Following
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleFollow(follow._id);
                      }}
                      className={`py-1 px-5 text-white rounded-lg cursor-pointer mr-2 bg-blue-500 hover:bg-blue-600`}
                    >
                      Follow
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default ViewprofileFollowingList;
