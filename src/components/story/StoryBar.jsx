import Story from "./Story";
const StoryBar = () => {
  return (
    <div className=" w-screen overflow-x-auto">
      <div className=" whitespace-nowrap w-max overflow-x-scroll flex">
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
