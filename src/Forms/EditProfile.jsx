import jatuu from "./assets/jatuu.jpg";
import { useState } from "react";

const EditProfile = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleUpdateClick = (event) => {
    event.stopPropagation(); // Prevent click event from propagating to the parent container
    // Your logic for handling the update click here
  };

  const handleRemoveClick = (event) => {
    event.stopPropagation(); // Prevent click event from propagating to the parent container
    // Your logic for handling the remove click here
  };
  const [url, setUrl] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const handleImageUpload = async () => {
    try {
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
      console.log(responseData.url);
    } catch (error) {
      console.error("Error while uploading image:", error);
    }
  };

  console.log(url);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  return (
    <div
      onClick={isVisible ? toggleVisibility : null} // Nullify the onClick event when isVisible is true
      className="border border-gray-700 m-5 p-5 pb-10 max-w-lg mx-auto"
    >
      <div className="profile_row1 max-w-md mx-auto flex p-5 items-center ">
        <div className="profile_photo mr-5">
          <img
            className=" rounded-full object-cover border-2 w-[50px] h-[50px] "
            src={jatuu}
            alt="Profile_Pic"
          />
        </div>
        <div className="profile_info flex flex-col justify-center">
          <div className="user_name flex items-center">
            <h2 className=" pr-2">Jaimin_15.3</h2>
          </div>
          <div className="change_photo">
            <p
              onClick={toggleVisibility}
              className=" text-blue-600 cursor-pointer hover:text-blue-700"
            >
              change profile photo
            </p>
          </div>
          {isVisible && (
            <div onClick={(e) => e.stopPropagation()}>
              <div className=" flex flex-col border rounded-lg bg-gray-300 top-[15%] absolute max-w-xs items-center z-20">
                {!isVisible && (
                  <h2
                    onClick={handleUpdateClick}
                    className="p-5 text-blue-600 border-b border-gray-400"
                  >
                    Update Profile Picture
                  </h2>
                )}
                {isVisible && (
                  <div onClick={(e) => e.stopPropagation()} className=" p-5">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e)}
                      style={{ display: "none" }}
                      id="profileImageInput"
                    />
                    <label
                      className=" text-blue-600"
                      htmlFor="profileImageInput"
                    >
                      Update Profile picture
                    </label>
                  </div>
                )}

                <h2 className=" p-5 text-red-600 border-t border-gray-500">
                  Remove Profile Picture
                </h2>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="form_area">
        <form className="max-w-md mx-auto p-6 border border-gray-500 shadow-md rounded-md">
          <div className="mb-4">
            <label
              htmlhtmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Display name
            </label>
            <input
              id="name"
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:border-blue-500"
              type="text"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bio" className="block text-gray-700 font-bold mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:border-blue-500"
              rows="4"
            ></textarea>
          </div>
        </form>
      </div>
      <button onClick={handleImageUpload}>upload</button>
    </div>
  );
};
export default EditProfile;
