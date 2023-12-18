import { ArrowBack } from "@mui/icons-material";

const PostOverView = ({ image }) => {
  return (
    <div>
      <div className="navebar">
        <ArrowBack />
      </div>

      <div className="image">
        <img src={image?.File?.name} alt="s,jak" />
      </div>
    </div>
  );
};
export default PostOverView;
