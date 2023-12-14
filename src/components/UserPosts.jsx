import { useState, useRef, useEffect } from "react";
import ViewPost from "./ViewPost";

const UserPosts = ({ posts ,userid,user}) => {
  const [showComponent, setShowComponent] = useState(false);
  const componentRef = useRef(null);
  const [postId, setPostId] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target)
        
      ) {
        console.log("userid inside userpost",userid)
        setShowComponent(false);
        console.log(showComponent)
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [postId,userid]);

  const handlePostClick = (postId) => {
    {
      !showComponent ? setShowComponent(true) : null;
    }
    setPostId(postId);
  };

  return (
    <div>
      <div className="posts flex flex-wrap">
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
      {showComponent && (
        <div
          className=" rounded-lg"
          ref={componentRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          <ViewPost postId={postId} setShowComponent={setShowComponent} user={user}/>
        </div>
      )}
    </div>
  );
};

export default UserPosts;
