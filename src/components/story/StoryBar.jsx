import Story from "./Story";
import "../UserPost.css";
import { useState, useEffect } from "react";
import axios from "axios";
const StoryBar = () => {
  const [storys, setstorys] = useState([])
  useEffect(() => {
    axios
      .get(`http://localhost:5555/user/getallstory`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res)
        setstorys(res.data.storys)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className=" w-full overflow-x-auto">
      <div className=" whitespace-nowrap w-full  overflow-x-scroll flex webkit-scrollbar">
        {storys?.map((story, index) => {
          // console.log("inside map",story);
         return <div key={index} className=" m-2">
            <Story story={story} />
          </div>
        })


        }

      </div>
    </div>
  );
};
export default StoryBar;
