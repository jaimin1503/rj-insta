import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Heart from "./assets/Heart";
import Comment from "./assets/Comment";
import { Link } from "react-router-dom";
import "./UserPost.css";
import Spinner from "./Spinner";
import LikeList from "../components/LikeList";
import { Context } from "../context/contextApi";
import SavePostLogo from "./assets/SavePostLogo";
import { useSelector, useDispatch } from "react-redux";

const ViewPost = ({ postId, setShowPost }) => {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [comment, setComment] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [commentsuccess, setcommentsucess] = useState(false);
  const [showLikeList, setShowLikeList] = useState(false);
  const { likehome, setlikehome, savedpost, setsavedpost } =
    useContext(Context);
  const [isSaved, setIsSaved] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const viewPostRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (viewPostRef.current && !viewPostRef.current.contains(event.target)) {
        setShowPost(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowPost]);
  const likeRef = useRef();

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/user/${postId}/isSaved`, {
        params: { postid: postId }, // Use 'params' instead of a separate object
        withCredentials: true,
      })
      .then((res) => {
        setIsSaved(res.data.Saved);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    let handler = (e) => {
      if (!likeRef.current.contains(e.target)) {
        setShowLikeList(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${import.meta.env.VITE_BASE_URL}/user/getPostByid/${postId}`,

        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setPost(res.data.post);
        setLikeCount(res.data.post.like.length);
        setComments(res.data.post.comment);
        setLikes(res.data.post.like);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postId, liked, commentsuccess]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/user/getlikepost/${postId}`, {
        params: { postid: postId },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.liked) {
          setLiked(true);
          setLikeCount(res?.data?.post?.like?.length);
        } else {
          setLiked(false);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postId]);

  const likeClick = async () => {
    axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/user/likepost/${postId}`,
        { postid: postId },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setLiked(!liked);
          setLikeCount(res.data.post.like.length);
          setlikehome(!likehome);
        } else {
          setLiked(!liked);
        }
        // setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handelSave = () => {
    setLoading(true);
    axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/user/savedpost/${postId}`,
        { postid: postId },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data.message);
        setIsSaved(!isSaved);
        setsavedpost(!savedpost);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setComment(inputValue);
    setIsButtonDisabled(inputValue.trim() === "");
  };

  const handleSubmit = () => {
    setLoading(true);
    axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/user/commentpost/${postId}`,
        { postid: postId, comment },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setLoading(false);
        setcommentsucess(!commentsuccess);
      })
      .catch((error) => {
        console.error(error);
      });

    setComment("");
    setIsButtonDisabled(true);
  };

  return windowSize.width > 670 ? (
    <div className=" filter-none overlay">
      {/* {loading && <Spinner />} */}
      <div
        ref={viewPostRef}
        className="card rounded-lg bg-gray-100"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="flex flex-row justify-center items-center shadow-xl bg-gray-100 h-[360px]  md:h-[480px] w-[82vw] overflow-y-scroll webkit-scrollbar">
          <div className="h-[320px] md:h-[480px]  w-[50%] flex justify-center items-center bg-black">
            <div className="image h-[320px] w-[240px] md:h-[480px] md:w-[360px]  flex items-center justify-center">
              <img
                onDoubleClick={() => {
                  likeClick();
                }}
                className=" object-cover h-full w-full"
                src={post.posturl}
                alt="post"
              />
            </div>
          </div>
          <div className="comment section h-[350px] md:h-[480px] w-[50%]">
            {/*//info*/}
            <div className="user_info flex items-center p-5 h-[10%]  ">
              <div className=" flex">
                <div className="profile_photo min-h-[44px] min-w-[44px] mr-5 my-auto">
                  <img
                    className="object-cover rounded-full w-[44px] h-[44px]"
                    src={post.user?.profile?.profilephoto}
                    alt="Profile_Pic"
                  />
                </div>
                <div className="profile_info flex flex-col justify-center">
                  <div className="user_name flex items-center font-medium text-base">
                    <h2 className=" mr-2 text-gray-900">
                      {post?.user?.username}
                    </h2>
                  </div>
                  <div className="location">
                    <p className=" text-gray-600 text-sm">Location..</p>
                  </div>
                </div>
              </div>
            </div>
            <hr className=" mt-3 font-medium border-gray-200 border"></hr>
            {/*show comment commpoment*/}
            <div className="comments p-5  h-[56%] md:h-[65%] flex flex-col gap-5 overflow-y-scroll webkit-scrollbar">
              {comments.map((comment, index) => (
                <div className="p-1 flex " key={index}>
                  <div
                    onClick={() => {
                      setShowPost(false);
                    }}
                  >
                    <Link to={`/viewprofile/${comment?.user?._id}`}>
                      <div className="flex items-center">
                        <div className="profile_photo mr-5 my-auto min-w-[44px] ">
                          <img
                            className="object-cover rounded-full w-[44px] h-[44px]"
                            src={comment?.user?.profile?.profilephoto}
                            alt="Profile_Pic"
                          />
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div>
                    {comment?.user?.username === user.username ? (
                      <span
                        className="block cursor-pointer font-medium text-base"
                        onClick={() => {
                          navigate(`/profile`);
                        }}
                      >
                        {comment?.user?.username}
                      </span>
                    ) : (
                      // <Link to={`/viewprofile/${comment?.user?._id}`}>
                      <span
                        className="block cursor-pointer font-medium text-base"
                        onClick={() => {
                          navigate(`/viewprofile/${comment?.user?._id}`);
                        }}
                      >
                        {comment?.user?.username}
                      </span>
                      // </Link>
                    )}
                    <h2 className=" text-sm">{comment?.comment}</h2>
                  </div>
                </div>
              ))}
            </div>
            <hr className="font-medium border-gray-200 border"></hr>

            {/*postinfo*/}
            <div className="postinfo h-[14%] md:h-[10%]">
              <div className="likes-comments justify-between flex">
                <div className=" flex">
                  <div onClick={likeClick} className="p-2 cursor-pointer ml-2">
                    <Heart liked={liked} />
                  </div>
                  <div className="p-2 cursor-pointer">
                    <Comment />
                  </div>
                </div>
                <div onClick={handelSave} className="p-2 cursor-pointer">
                  <SavePostLogo isSaved={isSaved} />
                </div>
              </div>
              <div ref={likeRef} className="counts flex items-center mb-2">
                <div className=" flex cursor-pointer">
                  {showLikeList && (
                    <LikeList post={post} show={setShowLikeList} />
                  )}
                  {likes.length > 2 && (
                    <div
                      onClick={() => {
                        setShowLikeList(!showLikeList);
                      }}
                      className=" flex"
                    >
                      <img
                        className=" h-[18px] w-[18px] object-cover rounded-full ml-2 -mr-2"
                        src={likes[0]?.user?.profile?.profilephoto}
                        alt="kljhkj"
                      />
                      <img
                        className=" h-[18px] w-[18px] object-cover rounded-full -mr-2"
                        src={likes[1]?.user?.profile?.profilephoto}
                        alt="kljhkj"
                      />
                      <img
                        className=" h-[18px] w-[18px] object-cover rounded-full mr-2"
                        src={likes[2]?.user?.profile?.profilephoto}
                        alt="kljhkj"
                      />
                    </div>
                  )}
                </div>
                <p className=" text-sm mr-5">
                  Liked by <span>{likeCount}</span> people
                </p>
              </div>
            </div>
            {/*comment input*/}
            <div className="comment h-[7%] w-full border-t  flex relative m-4">
              <input
                className="  p-2 pl-5 outline-none bg-gray-100 w-[90%]  "
                type="text"
                placeholder="Add a comment..."
                name="comment"
                value={comment}
                onChange={handleInputChange}
              />
              <button
                className={`${
                  isButtonDisabled
                    ? "hidden"
                    : "p-2 cursor-pointer text-blue-600 font-medium"
                }  top-0 bottom-0 right-0 border-l-2`}
                onClick={handleSubmit}
                disabled={isButtonDisabled}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="overlay">
      <div
        ref={viewPostRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className="card rounded-lg bg-gray-100 mx-auto"
      >
        <div className=" md:flex flex-col">
          <div className="user_info flex p-5 md:h-[20%] ">
            <div className="profile_photo mr-5">
              <img
                className="object-cover rounded-full w-[44px] h-[44px]"
                src={post?.user?.profile?.profilephoto}
                alt="Profile_Pic"
              />
            </div>
            <div className="profile_info flex flex-col justify-center">
              <div className="user_name flex items-center font-medium text-base">
                <h2 className=" mr-2 text-gray-900">{post?.user?.username}</h2>
              </div>
              <div className="location">
                <p className=" text-gray-600 text-sm">Location..</p>
              </div>
            </div>
          </div>
          <div className="image h-[420px] w-[340px] sm:h-[420px] sm:w-[340px]">
            <img
              onDoubleClick={() => {
                likeClick();
              }}
              className=" object-cover h-full w-full"
              src={post.posturl}
              alt=""
            />
          </div>
          <div className="postinfo">
            <div className="likes-comments justify-between flex">
              <div className=" flex">
                <div onClick={likeClick} className="p-2 cursor-pointer ml-2">
                  <Heart liked={liked} />
                </div>
                <div className="p-2 cursor-pointer">
                  <Comment />
                </div>
              </div>
              <div onClick={handelSave} className="p-2 cursor-pointer">
                <SavePostLogo isSaved={isSaved} />
              </div>
            </div>
            <div className="counts flex pb-2">
              <div ref={likeRef} className=" flex cursor-pointer">
                {showLikeList && (
                  <LikeList post={post} show={setShowLikeList} />
                )}
                {likes.length > 2 && (
                  <div
                    onClick={() => {
                      setShowLikeList(!showLikeList);
                    }}
                    className="flex"
                  >
                    <img
                      className=" h-[18px] w-[18px] object-cover rounded-full ml-2 -mr-2"
                      src={likes[0]?.user?.profile?.profilephoto}
                      alt="kljhkj"
                    />
                    <img
                      className=" h-[18px] w-[18px] object-cover rounded-full -mr-2"
                      src={likes[1]?.user?.profile?.profilephoto}
                      alt="kljhkj"
                    />
                    <img
                      className=" h-[18px] w-[18px] object-cover rounded-full mr-2"
                      src={likes[2]?.user?.profile?.profilephoto}
                      alt="kljhkj"
                    />
                  </div>
                )}
              </div>
              <p className=" text-sm">
                Liked by <span>{likeCount}</span> people
              </p>
            </div>
          </div>

          <div className="comment border-t border-gray-300 flex">
            <input
              className=" w-full p-2 rounded-b-lg pl-5 bg-gray-100 outline-none"
              type="text"
              placeholder="Add a comment..."
              name="comment"
              value={comment}
              onChange={handleInputChange}
            />

            <button
              className={
                isButtonDisabled
                  ? "pr-5 cursor-pointer text-gray-300"
                  : "pr-5 cursor-pointer text-blue-600"
              }
              onClick={handleSubmit}
              disabled={isButtonDisabled}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
