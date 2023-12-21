import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Heart from "./assets/Heart";
import Comment from "./assets/Comment";
import axios from "axios";
import Spinner from "./Spinner";

function HomepostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.like.length);
  const [comment, setComment] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const postId = post._id;

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setComment(inputValue);
    setIsButtonDisabled(inputValue.trim() === "");
  };

  const handleSubmit = () => {
    setLoading(true);
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
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });

    setComment("");
    setIsButtonDisabled(true);
  };

  const likeClick = async (postId) => {
    setLoading(true);
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
          setLoading(false);
        } else {
          setLiked(!liked);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/user/getlikepost/${post?._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setLiked(true);
          setLoading(false);
        } else {
          setLiked(false);
          console.log(res.data.message);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      {loading && <Spinner />}
      <div className="card rounded-lg bg-gray-100 mx-auto">
        <div className=" md:flex flex-col">
          <div className="user_info flex p-5 md:h-[20%] ">
            <Link to={`/viewprofile/${post?.user?._id}`}>
              <div className="profile_photo mr-5 cursor-pointer">
                <img
                  className="object-cover rounded-full w-[44px] h-[44px]"
                  src={post?.user?.profile?.profilephoto}
                  alt="Profile_Pic"
                />
              </div>
            </Link>
            <div className="profile_info flex flex-col justify-center">
              <div className="user_name flex items-center font-medium text-base">
                <Link to={`/viewprofile/${post?.user?._id}`}>
                  <h2 className=" mr-2 text-gray-900">{post?.user?.username}</h2>
                </Link>
              </div>
              <div className="location">
                <p className=" text-gray-600 text-sm">Location..</p>
              </div>
            </div>
          </div>
          <div className="image h-[420px] w-[340px] sm:h-[580px] sm:w-[470px]">
            <img
              className=" object-cover h-full w-full"
              src={post?.posturl}
              alt=""
            />
          </div>
          <div className="postinfo">
            <div className="likes-comments flex">
              <div
                onClick={() => {
                  likeClick(post?._id);
                }}
                className="p-2 cursor-pointer ml-2"
              >
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
}

export default HomepostCard;
