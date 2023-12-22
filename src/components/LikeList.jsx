import { Close } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const LikeList = ({ show, post }) => {
  const [likes, setLikes] = useState([]);
  useEffect(() => {
    setLikes(post.like);
  }, []);
  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className="container h-[50vh] w-[55vw] max-w-xs bg-white rounded-xl z-50"
      >
        <div className="row1 justify-center border-b">
          <div
            onClick={() => {
              show(false);
            }}
            className=" float-right p-2 cursor-pointer "
          >
            <Close />
          </div>
          <p className=" text-center py-2 pl-5 font-bold">Likes</p>
        </div>

        <div>
          {likes.map((like, index) => (
            <div
              key={index}
              className="likes flex justify-between w-full items-center my-2"
            >
              <Link to={`/viewprofile/${like?.user?._id}`}>
                <div className="flex gap-2 coursor-pointer w-34">
                  <div className="photo sm:mx-2">
                    <img
                      className=" h-[40px] w-[40px] object-cover rounded-full"
                      src={like?.user?.profile?.profilephoto}
                      alt="sdd"
                    />
                  </div>
                  <div className="info items-start bg-yello">
                    <p className=" text-sm font-bold">{like?.user?.username}</p>
                    <p className=" text-sm text-gray-500">
                      {like?.user?.username}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="button py-1 px-2 bg-gray-200 rounded-xl font-bold sm:mx-2">
                <button>Following</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default LikeList;
