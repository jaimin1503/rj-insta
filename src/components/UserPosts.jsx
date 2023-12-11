import jatu from "./assets/jatuu.jpg";
import "./UserPost.css";

const UserPosts = () => {
  return (
    <div>
      <div className="posts flex flex-wrap">
        <div className="w-1/3 p-[2px]">
          <div className="aspect-square">
            <img
              className="w-full h-full object-cover"
              src={jatu}
              alt="Your Image"
            />
          </div>
        </div>
        <div className="w-1/3 p-[2px]">
          <div className="aspect-square">
            <img
              className="w-full h-full object-cover"
              src={jatu}
              alt="Your Image"
            />
          </div>
        </div>
        <div className="w-1/3 p-[2px]">
          <div className="aspect-square">
            <img
              className="w-full h-full object-cover"
              src={jatu}
              alt="Your Image"
            />
          </div>
        </div>
        <div className="w-1/3 p-[2px]">
          <div className="aspect-square">
            <img
              className="w-full h-full object-cover"
              src={jatu}
              alt="Your Image"
            />
          </div>
        </div>
        <div className="w-1/3 p-[2px]">
          <div className="aspect-square">
            <img
              className="w-full h-full object-cover"
              src={jatu}
              alt="Your Image"
            />
          </div>
        </div>
        <div className="w-1/3 p-[2px]">
          <div className="aspect-square">
            <img
              className="w-full h-full object-cover"
              src={jatu}
              alt="Your Image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserPosts;
