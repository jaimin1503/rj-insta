import Story from "./Story";
import "../UserPost.css";

const StoryBar = () => {
  return (
    <div className=" w-full overflow-x-auto">
      <div className=" whitespace-nowrap w-full  overflow-x-scroll flex webkit-scrollbar">
        <div className=" m-2">
          <Story />
        </div>
        <div className=" m-2">
          <Story />
        </div>
        <div className=" m-2">
          <Story />
        </div>
        <div className=" m-2">
          <Story />
        </div>
        <div className=" m-2">
          <Story />
        </div>
        <div className=" m-2">
          <Story />
        </div>
        <div className=" m-2">
          <Story />
        </div>
        <div className=" m-2">
          <Story />
        </div>
        <div className=" m-2">
          <Story />
        </div>
        <div className=" m-2">
          <Story />
        </div>
        <div className=" m-2">
          <Story />
        </div>
        <div className=" m-2">
          <Story />
        </div>
        <div className=" m-2">
          <Story />
        </div>
      </div>
    </div>
  );
};
export default StoryBar;
