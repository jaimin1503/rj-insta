import { Close } from "@mui/icons-material";
import { useEffect, useState } from "react";
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
        className="container h-[50vh] w-[55vw] max-w-xs bg-white rounded-xl"
      >
        <div className="row1  justify-center border-b">
          <div
            onClick={() => {
              show(false);
            }}
            className=" float-right m-2 cursor-pointer "
          >
            <Close />
          </div>
          <p className=" mx-28 py-2 font-bold">Likes</p>
        </div>

        <div>
          {likes.map((like, index) => (
            <div
              key={index}
              className="likes flex justify-center items-center my-2"
            >
              <div className="photo mx-2">
                <img
                  className=" h-[40px] w-[40px] object-cover rounded-full"
                  src={like?.user?.profile?.profilephoto}
                  alt="sdd"
                />
              </div>
              <div className="info">
                <p className=" text-sm font-bold">{like?.user?.username}</p>
                <p className=" text-sm text-gray-500">{like?.user?.username}</p>
              </div>
              <div className="button py-1 px-3 bg-gray-200 rounded-xl font-bold mx-2">
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
