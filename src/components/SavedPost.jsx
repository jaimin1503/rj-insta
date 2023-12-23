import { useState, useRef, useEffect } from "react";
import ViewPost from "./ViewPost";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const SavedPost = () => {
  const [showComponent, setShowComponent] = useState(false);
  const [postId, setPostId] = useState(null);
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const imgRef = useRef();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    setPosts(user.profile.saved);
  }, []);

  useEffect(() => {
    let handler = (e) => {
      if (!imgRef.current.contains(e.target)) {
        setShowComponent(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  useEffect(() => {
    // Hide the component when the route changes
    setShowComponent(false);
  }, [location]);

  const handlePostClick = (postId) => {
    setShowComponent(!showComponent);
    setPostId(postId);
  };

  return (
    <div ref={imgRef}>
      <div
        onClick={() => setShowComponent(!showComponent)}
        className="posts flex flex-wrap"
      >
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
        {showComponent && (
          <div>
            <div
              className=" rounded-lg"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
              }}
            >
              <ViewPost
                postId={postId}
                setShowComponent={setShowComponent}
                user={user}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedPost;
