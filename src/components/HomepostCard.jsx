import React, { useRef } from "react";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Heart from "./assets/Heart";
import Comment from "./assets/Comment";
import axios from "axios";
import ViewPost from "./ViewPost";
import jatu from "./assets/jatuu.jpg";
import LikeList from "./LikeList";
import { Context } from "../context/contextApi";
import "./UserPost.css";

function HomepostCard({ postid }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likes, setLikes] = useState([]);
  const [comment, setComment] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [showLikeList, setShowLikeList] = useState(false);
  const { likehome } = useContext(Context);
  const [post, setPost] = useState({});
  const postId = postid;
  const postRef = useRef();
  const likeRef = useRef();

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setComment(inputValue);
    setIsButtonDisabled(inputValue.trim() === "");
  };
  useEffect(() => {
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
        setLikes(res.data.post.like);
      })
      .catch((error) => {
        console.log("error accure in home componets",error);
      });
  }, [postid, liked, likehome]);

  useEffect(() => {
    let handler = (e) => {
      if (!postRef.current.contains(e.target)) {
        setShowPost(false);
      }
      if (!likeRef.current.contains(e.target)) {
        setShowLikeList(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const handleSubmit = () => {
    axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/user/commentpost/${postId}`,
        { postid: postId, comment },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data?.message);
      })
      .catch((error) => {
        console.error(error);
      });

    setComment("");
    setIsButtonDisabled(true);
  };

  const likeClick = async (postId) => {
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
        } else {
          setLiked(!liked);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/user/getlikepost/${postId}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.liked) {
          setLiked(true);
          setLikes(post.like);
        } else {
          setLiked(false);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [likehome, post._id]);
  return (
    <div>
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
                  <h2 className=" mr-2 text-gray-900">
                    {post?.user?.username}
                  </h2>
                </Link>
              </div>
              <div className="location">
                <p className=" text-gray-600 text-sm">Location..</p>
              </div>
            </div>
          </div>
          <div className="image h-[420px] w-[340px] sm:h-[580px] sm:w-[470px]">
            <img
              onDoubleClick={() => {
                likeClick(post?._id);
              }}
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

              <div ref={postRef} className="p-2 cursor-pointer">
                <div
                  onClick={() => {
                    setShowPost(!showPost);
                  }}
                >
                  {" "}
                  <Comment />
                </div>
                <div>
                  {showPost && (
                    <ViewPost setShowPost={setShowPost} postId={postId} />
                  )}
                </div>
              </div>
            </div>

            <div ref={likeRef} className="counts flex items-center mb-2">
              <div className=" flex cursor-pointer">
                {showLikeList && (
                  <LikeList post={post} show={setShowLikeList} />
                )}
                {likes?.length > 2 && (
                  <div
                    onClick={() => {
                      setShowLikeList(!showLikeList);
                    }}
                    className=" flex"
                  >
                    <img
                      className=" h-[18px] w-[18px] object-cover rounded-full ml-2 -mr-2"
                      src={likes[0]?.user?.profile?.profilephoto || jatu}
                      alt="kljhkj"
                    />
                    <img
                      className=" h-[18px] w-[18px] object-cover rounded-full -mr-2"
                      src={likes[1]?.user?.profile?.profilephoto || jatu}
                      alt="kljhkj"
                    />
                    <img
                      className=" h-[18px] w-[18px] object-cover rounded-full mr-2"
                      src={likes[2]?.user?.profile?.profilephoto || jatu}
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
  );
}
export default HomepostCard;
