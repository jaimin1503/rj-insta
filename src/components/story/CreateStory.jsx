import { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
import StoryOverView from "./StoryOverView";

const CreateStory = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    setImage(file);
    setShowImage(true);
  }, []);

  const handleImageUpload = useCallback(async () => {
    try {
      setLoading(true);
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "x8ekhtm9");
      data.append("cloud_name", "daqldosvw");

      const response = await fetch(
        "http://api.cloudinary.com/v1_1/daqldosvw/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      if (!response.ok) {
        throw new Error(`Image upload failed with status: ${response.status}`);
      }
      const responseData = await response.json();
      setUrl(responseData.url);
      axios
        .post(
          `http://localhost:5555/user/createstory`,
          { storyurl: responseData.url },
          { withCredentials: true }
        )
        .then((res) => {
          setLoading(false);
          navigate("/home");
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } catch (error) {
      console.error("Error while uploading image:", error);
    }
  }, [image]);

  return (
    <>
      {loading && <Spinner />}
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="createpost max-w-sm h-[80vh] w-[85vw] bg-gray-100 rounded-xl flex justify-center flex-col items-center shadow-xl ">
          <div className="image pb-10">
            <svg
              ariaLabel="Icon to represent media such as images or videos"
              className="x1lliihq x1n2onr6 x5n08af"
              fill="currentColor"
              height="100"
              role="img"
              viewBox="0 0 97.6 77.3"
              width="120"
            >
              <title>Icon to represent media such as images or videos</title>
              <path
                d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                fill="currentColor"
              ></path>
              <path
                d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                fill="currentColor"
              ></path>
              <path
                d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <div className="button bg-blue-500 hover:bg-blue-600 py-2 px-5 rounded-lg">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="profileImageInput"
              name="profilephoto"
            />
            <label
              className="text-white cursor-pointer"
              htmlFor="profileImageInput"
            >
              Select From Computer
            </label>
          </div>
          {showImage && (
            <StoryOverView image={image} upload={handleImageUpload} url={url} />
          )}
        </div>
      </div>
    </>
  );
};
export default CreateStory;
