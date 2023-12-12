import jatu from "./assets/jatuu.jpg";
import "./UserPost.css";
import { Link } from "react-router-dom";

const UserPosts = ({ posts }) => {
  // console.log(posts[0][0])
  return (
    <div>
      <div className="posts flex flex-wrap">
        {posts.map((post, index) => (
          <div key={index} className="w-1/3 p-[2px]">
            <div className="aspect-square">
              <Link to={`/viewpost/${post._id}`}>
                <img
                  className="w-full h-full object-cover"
                  src={post.posturl}
                  alt="Your Image"
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default UserPosts;
