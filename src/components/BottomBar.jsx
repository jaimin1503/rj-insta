import { Create, Explore, Home, Chat } from "@mui/icons-material";
import Video from "./assets/Video";

const BottomBar = () => {
  return (
    <div>
      <div className="icons flex justify-around">
        <Home />
        <Explore />
        <Create />
        <Video />
        <Chat />
      </div>
    </div>
  );
};
export default BottomBar;
