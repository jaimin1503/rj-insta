import { Link } from "react-router-dom";
import "./story.css";

const Story = ({ story }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="container frame rounded-full cursor-pointer h-[60px] w-[60px] flex justify-center items-center">
        <Link to={`/viewstory/${story._id}`}>
          <img
            className=" h-[56px] w-[56px] frame rounded-full object-cover border-2 "
            src={story?.user?.profile?.profilephoto}
            alt="profilePic"
          />
        </Link>
      </div>
      <p className="">{story?.user?.username}</p>

    </div>
  );
};
export default Story;
