import { ArrowBack } from "@mui/icons-material";

const PostOverView = ({ image, upload }) => {
  const imageUrl = URL.createObjectURL(image);

  const handlePost = async () => {
    await upload();
  };

  return (
    <div className=" absolute">
      <div className="navebar p-2 ml-1 cursor-pointer flex justify-between">
        <ArrowBack />
        <button onClick={handlePost} className=" text-blue-600 mr-3">
          Post
        </button>
      </div>

      <div className="image max-w-sm ">
        <img
          className="h-[50vh] w-[80vw] object-cover"
          src={imageUrl}
          alt="selected img"
        />
        {/* <textarea
          className=" w-full p-3 bg-gray-100 border border-gray-300 mt-2  outline-none"
          placeholder="Add Caption..."
          name="caption"
          id="caption"
          rows="4"
          onChange={handleInputChange}
        ></textarea>
        <input
          type="text"
          className="w-full p-3 bg-gray-100 border border-gray-300 outline-none"
          placeholder="Add Location"
          onChange={handleInputChange}
        /> */}
      </div>
    </div>
  );
};
export default PostOverView;
