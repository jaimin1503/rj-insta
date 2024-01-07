import photo from "./assets/jatuu.jpg";
import ProgressBar from "./ProgressBar";
import { Close } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { PlayArrow, Pause } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../Spinner";

const ViewStory = () => {
  const [play, setPlay] = useState(true);
  const [story, setStory] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/user/getstorybyid/${id}`, { storyid: id })
      .then((res) => {
        setStory(res.data.story);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      {loading && <Spinner />}
      <div className="close m-5 absolute right-0 cursor-pointer">
        <Link to="/home">
          <Close />
        </Link>
      </div>
      <div className=" flex justify-center items-center w-screen h-screen">
        <div className="container h-[70vh] w-[350px] md:w-[400px] md:h-[80vh] rounded-xl bg-gray-300 absolute">
          <img
            className=" absolute object-cover h-full w-full rounded-xl "
            src={story?.storyurl}
            alt="pp"
          />
          <div className=" opacity-80 pt-5 pb-3 progress_bar relative text-white">
            <ProgressBar play={play} />
          </div>
          <div className="user_info">
            <div className="user_photo flex items-center px-5 relative">
              <img
                className=" h-[36px] w-[36px] object-cover rounded-full "
                src={story?.user?.profile?.profilephoto}
                alt="story"
              />
              <p className=" px-3 text-white">{story?.user?.username}</p>
              <p className=" text-gray-400 font-bold">4 h</p>
              <div className=" ml-28 md:ml-36">
                {play ? (
                  <div
                    className=" cursor-pointer text-white"
                    onClick={() => {
                      setPlay(!play);
                    }}
                  >
                    <Pause />
                  </div>
                ) : (
                  <div
                    className=" cursor-pointer text-white"
                    onClick={() => {
                      setPlay(!play);
                    }}
                  >
                    <PlayArrow />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewStory;
