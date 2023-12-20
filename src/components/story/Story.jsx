import photo from "./assets/jatuu.jpg";
import { Link } from "react-router-dom";
const Story = () => {
  return (
    <div>
      <div className="container cursor-pointer">
        <Link to="/viewstory">
          <img
            style={{ borderColor: "#a12a4c" }}
            className=" h-[60px] w-[60px] rounded-full object-cover border-[3px]"
            src={photo}
            alt=""
          />
        </Link>
      </div>
    </div>
  );
};
export default Story;
