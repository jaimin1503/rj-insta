import jatu from "./assets/jatuu.jpg";
import "./UserPost.css";

const UserPosts = ({ posts }) => {
  // console.log(posts[0][0])
  return (
    <div>
      <div className="posts flex flex-wrap">
        {posts.map((post, index) => (
          <div key={index} className="w-1/3 p-[2px]">
            <div className="aspect-square">
              <img
                className="w-full h-full object-cover"
                src={post.posturl}
                alt="Your Image"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default UserPosts;
