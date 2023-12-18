import { ArrowBack } from "@mui/icons-material";
import { useState } from "react";

const PostOverView = ({ image }) => {
  const imageUrl = URL.createObjectURL(image);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setComment(inputValue);
  };

  return (
    <div className=" absolute">
      <div className="navebar p-2 ml-1 cursor-pointer flex justify-between">
        <ArrowBack />
        <button className=" text-blue-600 mr-3">Next</button>
      </div>

      <div className="image max-w-sm ">
        <img
          className="h-[50vh] w-[80vw] object-cover"
          src={imageUrl}
          alt="selected img"
        />
      </div>
      <div className="comment h-[7.5%]  relative">
        <textarea
          className=" border w-[95%] p-3 outline-none bg-gray-100"
          rows={3}
          placeholder="Write Caption..."
          name="comment"
          // value={comment}
          onChange={handleInputChange}
        />
        <input
          type="text"
          className="w-full h-8 bg-gray-100 border outline-none"
        />
      </div>
    </div>
  );
};
export default PostOverView;
