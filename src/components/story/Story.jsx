import photo from "./assets/jatuu.jpg";
import { Link } from "react-router-dom";
import "./story.css";

const Story = ({story}) => {
  console.log("inside story",story)
  return (
    <div>
      <div className="container frame rounded-full cursor-pointer h-[60px] w-[60px] flex justify-center items-center">
        <Link to="/viewstory">
          <img
            className=" h-[56px] w-[56px] frame rounded-full object-cover border-2 "
            src={story?.user?.profile?.profilephoto}
            alt=""
          />
        </Link>
      </div>
    </div>
  );
};
export default Story;
