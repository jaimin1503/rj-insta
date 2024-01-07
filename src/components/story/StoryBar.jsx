import Story from "./Story";
import "../UserPost.css";
import { useState, useEffect } from "react";
import axios from "axios";

const StoryBar = () => {
  const [stories, setstories] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/user/getallstory`, {
        withCredentials: true,
      })
      .then((res) => {
        setstories(res.data.storys);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className=" w-full overflow-x-auto">
      <div className=" whitespace-nowrap w-full overflow-x-scroll flex webkit-scrollbar items-start">
        {stories?.map((story, index) => {
          return (
            <div key={index} className=" m-2 mx-3">
              <Story story={story} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default StoryBar;
