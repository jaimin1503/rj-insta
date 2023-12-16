import React, { useEffect, useState } from "react";
import axios from "axios";
import Heart from "./assets/Heart";
import Comment from "./assets/Comment";
import { Link } from "react-router-dom";
import "./UserPost.css";
const ViewPost = ({ postId, setShowComponent, user }) => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comment, setComment] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loginId, setLoginId] = useState("");

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

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
    axios
      .get(`http://localhost:5555/user/getPostByid/${postId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setPost(res.data.post);
        setLikeCount(res.data.post.like.length);
        setComments(res.data.post.comment);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postId, liked]);

  useEffect(() => {
    axios
      .get(`http://localhost:5555/user/getlikepost/${postId}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setLiked(true);
          setLikeCount(res?.data?.post?.like?.length);
        } else {
          setLiked(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postId]);

  const likeClick = async () => {
    axios
      .post(
        `http://localhost:5555/user/likepost/${postId}`,
        { postid: postId },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setLiked(!liked);
          setLikeCount(res.data.post.like.length);
        } else {
          setLiked(!liked);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setComment(inputValue);
    setIsButtonDisabled(inputValue.trim() === "");
  };

  const handleSubmit = () => {
    console.log("Submitted Comment:", comment);
    axios
      .post(
        `http://localhost:5555/user/commentpost/${postId}`,
        { postid: postId, comment },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.message);
      })
      .catch((error) => {
        console.error(error);
      });

    setComment("");
    setIsButtonDisabled(true);
  };

  return windowSize.width > 670 ? (
    <div className=" filter-none">
      <div className="card rounded-lg bg-gray-100 mx-auto ">
        <div className="flex flex-row justify-center items-center shadow-xl bg-gray-100 h-[320px]  md:h-[480px] w-[82vw] overflow-y-scroll webkit-scrollbar">
          {/*post*/}
          <div className="h-[320px] md:h-[480px]  w-[50%] flex justify-center items-center bg-black">
            <div className="image h-[320px] w-[240px] md:h-[480px] md:w-[360px]  flex items-center justify-center">
              <img
                className=" object-cover h-full w-full"
                src={post.posturl}
                alt=""
              />
            </div>
          </div>
          <div className="comment section h-[320px] md:h-[480px] w-[50%]">
            {/*//info*/}
            <div className="user_info flex items-center p-5 h-[10%]  ">
              <div className=" flex">
                <div className="profile_photo mr-5 my-auto">
                  <img
                    className="object-cover rounded-full w-[44px] h-[44px]"
                    src={user?.profile?.profilephoto}
                    alt="Profile_Pic"
                  />
                </div>
                <div className="profile_info flex flex-col justify-center">
                  <div className="user_name flex items-center font-medium text-base">
                    <h2 className=" mr-2 text-gray-900">{user?.username}</h2>
                  </div>
                  <div className="location">
                    <p className=" text-gray-600 text-sm">Location..</p>
                  </div>
                </div>
              </div>
            </div>
            <hr className=" mt-3 font-medium border-gray-300 border"></hr>
            {/*show comment commpoment*/}
            <div className="comments p-5  h-[65%] flex flex-col gap-5 overflow-y-scroll webkit-scrollbar">
              {comments.map((comment, index) => (
                <div className="p-1 flex " key={index}>
                  <div
                    onClick={() => {
                      setShowComponent(false);
                    }}
                  >
                    <Link to={`/viewprofile/${comment?.user?._id}`}>
                      <div className="flex items-center">
                        <div className="profile_photo mr-5 my-auto ">
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
                    <Link to={`/viewprofile/${comment?.user?._id}`}>
                      <span className="block cursor-pointer font-medium text-base">
                        {comment?.user?.username}
                      </span>
                    </Link>
                    <h2 className=" text-sm">{comment?.comment}</h2>
                  </div>
                </div>
              ))}
            </div>
            {/*postinfo*/}
            <div className="postinfo h[10%]">
              <div className="likes-comments flex">
                <div onClick={likeClick} className="p-2 cursor-pointer ml-2">
                  <Heart liked={liked} />
                </div>
                <div className="p-2 cursor-pointer">
                  <Comment />
                </div>
              </div>
              <div className="counts">
                <p className=" text-sm mx-5 pb-2">
                  Liked by <span>{likeCount}</span> people
                </p>
              </div>
            </div>
            {/*comment input*/}
            <div className="comment h-[7.5%] w-full border-t  flex relative">
              <input
                className="  p-2 rounded-b-lg pl-5 outline-none bg-gray-100 w-[90%]  "
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
    <div>
      <div className="card rounded-lg bg-gray-100 mx-auto">
        <div className=" md:flex flex-col">
          <div className="user_info flex p-5 md:h-[20%] ">
            <div className="profile_photo mr-5">
              <img
                className="object-cover rounded-full w-[44px] h-[44px]"
                src={user?.profile?.profilephoto}
                alt="Profile_Pic"
              />
            </div>
            <div className="profile_info flex flex-col justify-center">
              <div className="user_name flex items-center font-medium text-base">
                <h2 className=" mr-2 text-gray-900">{user?.username}</h2>
              </div>
              <div className="location">
                <p className=" text-gray-600 text-sm">Location..</p>
              </div>
            </div>
          </div>
          <div className="image h-[420px] w-[340px] sm:h-[420px] sm:w-[340px]">
            <img
              className=" object-cover h-full w-full"
              src={post.posturl}
              alt=""
            />
          </div>
          <div className="postinfo">
            <div className="likes-comments flex">
              <div onClick={likeClick} className="p-2 cursor-pointer ml-2">
                <Heart liked={liked} />
              </div>
              <div className="p-2 cursor-pointer">
                <Comment />
              </div>
            </div>
            <div className="counts">
              <p className=" text-sm mx-5 pb-2">
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
