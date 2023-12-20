import photo from "./assets/jatuu.jpg";

const Story = () => {
  return (
    <div>
      <div className="container">
        <img
          style={{ borderColor: "#a12a4c" }}
          className=" h-[60px] w-[60px] rounded-full object-cover border-[3px]"
          src={photo}
          alt=""
        />
      </div>
    </div>
  );
};
export default Story;
