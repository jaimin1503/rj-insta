import { useState, useRef, useEffect, useContext } from "react";
import ViewPost from "./ViewPost";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Context } from "../context/contextApi";
import axios from "axios";
import { getuser } from "../reducers/userReducer";
const SavedPost = () => {
  const [showPost, setShowPost] = useState(false);
  const [postId, setPostId] = useState(null);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();
  const imgRef = useRef();
  const { user } = useSelector((state) => state.user);
  const { savedpost } = useContext(Context);
  useEffect(() => {
    // setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/user/getuser`, { withCredentials: true })
      .then((res) => {
        dispatch(getuser(res.data.user));
        setPosts(res.data.user.profile.saved);
        // setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [savedpost]);
  // useEffect(() => {

  // }, [user.profile?.saved?.length]);

  useEffect(() => {
    let handler = (e) => {
      if (!imgRef.current.contains(e.target)) {
        setShowPost(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  useEffect(() => {
    // Hide the component when the route changes
    setShowPost(false);
  }, [location]);

  const handlePostClick = (postId) => {
    setShowPost(!showPost);
    setPostId(postId);
  };

  return (
    <div ref={imgRef}>
      <div onClick={() => setShowPost(!showPost)} className="posts flex flex-wrap">
        {posts.map((post, index) => (
          <div key={index} className="w-1/3 p-[2px]">
            <div className="aspect-square cursor-pointer">
              <img
                onClick={() => handlePostClick(post._id)}
                className="w-full h-full object-cover"
                src={post.posturl}
                alt="Your Image"
              />
            </div>
          </div>
        ))}
      </div>
      <div>
        {showPost && (
          <div className="">
            <div className=" rounded-lg">
              <ViewPost postId={postId} setShowPost={setShowPost} user={user} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedPost;
