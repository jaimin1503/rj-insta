import { useState, useRef, useEffect, useContext } from "react";
import ViewPost from "./ViewPost";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Context } from "../context/contextApi";

const UserPosts = ({ posts }) => {
  const [showPost, setShowPost] = useState(false);
  const [postId, setPostId] = useState(null);
  const location = useLocation();
  const imgRef = useRef();
  const { user } = useSelector((state) => state.user);
  const { likehome, setlikehome } = useContext(Context);

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
    <div ref={imgRef} className="userpost">
      <div
        onClick={() => setShowPost(!showPost)}
        className="posts flex flex-wrap"
      >
        {posts
          .slice()
          .reverse()
          .map((post) => (
            <div key={post._id} className="w-1/3 p-[2px]">
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
          <div>
            <div
              className=" rounded-lg"
              // style={{
              //   position: "absolute",
              //   top: "50%",
              //   left: "50%",
              //   transform: "translate(-50%, -50%)",
              //   backgroundColor: "white",
              //   boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
              // }}
            >
              <ViewPost
                postId={postId}
                setShowPost={setShowPost}
                user={user}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPosts;
