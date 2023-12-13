import { useEffect, useState } from "react";
import axios from "axios";
import jatu from "./assets/jatuu.jpg";
import Heart from "./assets/Heart";
import Comment from "./assets/Comment";

const ViewPost = ({ postId }) => {
  const [post, setPost] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:5555/user/getPostByid/${postId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setPost(res.data.post.posturl);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postId]);

  const [liked, setLinked] = useState(false);

  const likeClick = () => {
    setLinked(!liked);
  };

  return (
    <div>
      <div className="card rounded-lg bg-gray-100 mx-auto">
        <div className="user_info flex p-5">
          <div className="profile_photo mr-5">
            <img
              className=" rounded-full object-cover h-[40px] w-[40px] "
              src={jatu}
              alt="Profile_Pic"
            />
          </div>
          <div className="profile_info flex flex-col justify-center">
            <div className="user_name flex items-center">
              <h2 className=" pr-2 text-gray-900">Jaimin</h2>
            </div>
            <div className="location">
              <p className=" text-gray-600 text-sm">Location..</p>
            </div>
          </div>
        </div>
        <div className="image w-[350px] md:w-[400px]">
          <img
            className=" object-cover h-[400px] md:h-[450px] w-full"
            src={post}
            alt=""
          />
        </div>
        <div className="postinfo">
          <div className="likes-comments flex">
            <div onClick={likeClick} className="p-2 cursor-pointer ml-2">
              <Heart liked={liked} />
            </div>
            <div className="p-2 cursor-pointer">
              <Comment />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewPost;
