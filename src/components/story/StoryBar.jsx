import Story from "./Story";
const StoryBar = () => {
  return (
    <div className=" w-screen overflow-x-auto">
      <div className=" whitespace-nowrap w-max overflow-x-scroll flex">
        <div className=" mx-2">
          <Story />
        </div>
        <div className=" mx-2">
          <Story />
        </div>
        <div className=" mx-2">
          <Story />
        </div>
        <div className=" mx-2">
          <Story />
        </div>
        <div className=" mx-2">
          <Story />
        </div>
        <div className=" mx-2">
          <Story />
        </div>
        <div className=" mx-2">
          <Story />
        </div>
        <div className=" mx-2">
          <Story />
        </div>
        <div className=" mx-2">
          <Story />
        </div>
      </div>
    </div>
  );
};
export default StoryBar;
