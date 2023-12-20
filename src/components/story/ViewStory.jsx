import photo from "./assets/jatuu.jpg";
import ProgressBar from "./ProgressBar";

const ViewStory = () => {
  return (
    <div className=" flex justify-center items-center w-screen h-screen">
      <div className="container h-[70vh] w-[350px] md:w-[400px] md:h-[80vh] rounded-xl bg-gray-300 absolute">
        <img
          className=" absolute object-cover h-full w-full rounded-xl "
          src={photo}
          alt=""
        />
        <div className=" opacity-80 pt-5 pb-3 progress_bar relative text-white">
          <ProgressBar />
        </div>
        <div className="user_info">
          <div className="user_photo flex items-center px-5 relative">
            <img
              className=" h-[36px] w-[36px] object-cover rounded-full "
              src={photo}
              alt=""
            />
            <p className=" px-3 text-white">jaimin_15.3</p>
            <p className=" text-gray-400 font-bold">4 h</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewStory;
