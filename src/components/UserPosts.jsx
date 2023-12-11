import jatu from "./assets/jatuu.jpg";
import "./UserPost.css";

const UserPosts = () => {
  return (
    <div>
      <div className="posts flex flex-wrap">
        <div class="w-1/3 p-[2px]">
          <div class="aspect-square">
            <img
              class="w-full h-full object-cover"
              src={jatu}
              alt="Your Image"
            />
          </div>
        </div>
        <div class="w-1/3 p-[2px]">
          <div class="aspect-square">
            <img
              class="w-full h-full object-cover"
              src={jatu}
              alt="Your Image"
            />
          </div>
        </div>
        <div class="w-1/3 p-[2px]">
          <div class="aspect-square">
            <img
              class="w-full h-full object-cover"
              src={jatu}
              alt="Your Image"
            />
          </div>
        </div>
        <div class="w-1/3 p-[2px]">
          <div class="aspect-square">
            <img
              class="w-full h-full object-cover"
              src={jatu}
              alt="Your Image"
            />
          </div>
        </div>
        <div class="w-1/3 p-[2px]">
          <div class="aspect-square">
            <img
              class="w-full h-full object-cover"
              src={jatu}
              alt="Your Image"
            />
          </div>
        </div>
        <div class="w-1/3 p-[2px]">
          <div class="aspect-square">
            <img
              class="w-full h-full object-cover"
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
