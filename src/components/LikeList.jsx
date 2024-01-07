import { Close } from "@mui/icons-material";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getuser } from "../reducers/userReducer";
import "./UserPost.css";
import axios from "axios";
const LikeList = ({ show, post, setShowLikeList }) => {
  const [likes, setLikes] = useState([]);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [followbtn, setFollow] = useState(true);
  const likeRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (likeRef.current && !likeRef.current.contains(event.target)) {
        show(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  useEffect(() => {
    setLikes(post.like);
  }, []);
  useEffect(() => {
    // setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/user/getuser`, { withCredentials: true })
      .then((res) => {
        dispatch(getuser(res.data.user));
        // setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [followbtn]);
  const handleFollow = (id) => {
    // setLoading(true)
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
          // setLoading(false)
        }
        console.log(res.data.message);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="overlay">
      <div
        ref={likeRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className="container h-[50vh] w-[70vw] sm:w-[55vw] max-w-xs bg-white rounded-xl z-50"
      >
        <div className="row1 justify-center border-b">
          <div
            onClick={() => {
              show(false);
            }}
            className=" float-right p-2 cursor-pointer "
          >
            <Close />
          </div>
          <p className=" text-center py-2 pl-5 font-bold">Likes</p>
        </div>

        <div>
          {likes.map((like, index) => (
            <div
              key={index}
              className="likes flex justify-between w-full items-center my-2"
            >
              {like?.user?._id !== user._id ? (
                <Link to={`/viewprofile/${like?.user?._id}`}>
                  <div className="flex gap-2 coursor-pointer w-34">
                    <div className="photo mx-2">
                      <img
                        className=" h-[40px] w-[40px] object-cover rounded-full"
                        src={like?.user?.profile?.profilephoto}
                        alt="sdd"
                      />
                    </div>
                    <div className="info items-start bg-yello">
                      <p className=" text-sm font-bold">
                        {like?.user?.username}
                      </p>
                      <p className=" text-sm text-gray-500">
                        {like?.user?.profile?.profilename}
                      </p>
                    </div>
                  </div>
                </Link>
              ) : (
                <Link to={`/profile`}>
                  <div className="flex gap-2 coursor-pointer w-34">
                    <div className="photo mx-2">
                      <img
                        className=" h-[40px] w-[40px] object-cover rounded-full"
                        src={like?.user?.profile?.profilephoto}
                        alt="sdd"
                      />
                    </div>
                    <div className="info items-start bg-yello">
                      <p className=" text-sm font-bold">
                        {like?.user?.username}
                      </p>
                      <p className=" text-sm text-gray-500">
                        {like?.user?.profile?.profilename}
                      </p>
                    </div>
                  </div>
                </Link>
              )}

              <div className="followButton w-[45%] flex justify-center">
                {user._id !== like?.user?._id ? (
                  user.profile.following &&
                  user.profile.following.some(
                    (userfollow) => userfollow._id === like?.user?._id
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
                        handleFollow(like?.user?._id);
                      }}
                      className={`py-1 px-5 text-white rounded-lg cursor-pointer mr-2 bg-blue-500 hover:bg-blue-600`}
                    >
                      Follow
                    </button>
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default LikeList;
