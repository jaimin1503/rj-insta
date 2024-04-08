import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { updateDisplayPicture } from "../utils/profile";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getuser } from "../reducers/userReducer";
const EditProfile = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [url, setUrl] = useState("");
  const [File, setFile] = useState(null);
  const dispatch = useDispatch();
  const [previewSource, setPreviewSource] = useState(null);
  const [image, setImage] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    profilename: "",
    bio: "",
  });

  const navigate = useNavigate();

  const toggleVisibility = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  const handleUpdateClick = useCallback((event) => {
    event.stopPropagation();
    // Your logic for handling the update click here
  }, []);

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      setIsDisabled(false);
    };
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/user/getprofile`, {
        withCredentials: true,
      })
      .then((res) => {
        setFormData(res.data.profile);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleUpload = () => {
    try {
      if (!File) return;
      console.log("uploading...");
      const formData = new FormData();
      formData.append("displayPicture", File);
      console.log("formdata", formData);
      dispatch(updateDisplayPicture(formData, id,setLoading)).then(() => {
        console.log("image uploaded")
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  const handleInputChange = useCallback((e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  }, []);

  const handleSubmit = useCallback(() => {
    setLoading(true);
    axios
      .put(
        `${import.meta.env.VITE_BASE_URL}/user/editprofile`,
        {formData },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("edite profile inpute",res.data)
        dispatch(getuser(res?.data?.data));
        navigate("/profile");
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [url, formData, navigate]);

  const handleRemove = () => {
    setUrl(" ");
  };

  return (
    <>
      {loading && <Spinner />}
      <div
        onClick={isVisible ? toggleVisibility : null}
        className="border border-gray-700 m-5 p-5 pb-10 max-w-lg mx-auto"
      >
        <div className="profile_row1 max-w-md mx-auto flex p-5 items-center">
          <div className="profile_photo mr-5">
            <img
              className="rounded-full object-cover border-2 w-[50px] h-[50px]"
              src={previewSource ? previewSource : user?.profile?.profilephoto}
              alt="Profile_Pic"
            />
          </div>
          <div className="profile_info flex flex-col justify-center">
            <div className="user_name flex items-center">
              <h2 className="pr-2">{user?.username}</h2>
            </div>
            <div className="change_photo">
              <p
                onClick={toggleVisibility}
                className="text-blue-600 cursor-pointer hover:text-blue-700"
              >
                Change Profile Photo
              </p>
            </div>
            {isVisible && (
              <div onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-col border rounded-lg bg-gray-300 top-[15%] absolute max-w-xs items-center z-20">
                  <div onClick={(e) => e.stopPropagation()} className="p-5">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                      id="profileImageInput"
                      name="profilephoto"
                    />
                    <label
                      className="text-blue-600 cursor-pointer"
                      htmlFor="profileImageInput"
                    >
                      Update Profile Picture
                    </label>
                  </div>
                  <h2
                    onClick={() => {
                      handleRemove;
                    }}
                    className="p-5 text-red-600 border-t border-gray-500 cursor-pointer"
                  >
                    Remove Profile Picture
                  </h2>
                </div>
              </div>
            )}
          </div>
          <div className="upload_button ml-2">
            <button
              disabled={isDisabled}
              onClick={handleUpload}
              className={"py-2 px-5 bg-blue-500 rounded-lg cursor-pointer"}
            >
              Upload Photo
            </button>
          </div>
        </div>
        <div className="form_area">
          <form
            className="max-w-md mx-auto p-6 border border-gray-500 shadow-md rounded-md"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="mb-4">
              <label
                htmlFor="profilename"
                className="block text-gray-700 font-bold mb-2"
              >
                Profile name
              </label>
              <input
                id="profilename"
                name="profilename"
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:border-blue-500"
                type="text"
                onChange={handleInputChange}
                value={formData.profilename}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="bio"
                className="block text-gray-700 font-bold mb-2"
              >
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:border-blue-500"
                rows="4"
                onChange={handleInputChange}
                value={formData.bio}
              ></textarea>
            </div>
          </form>
        </div>
        <div className="button py-2 rounded-lg bg-blue-500 hover:bg-blue-600 mt-5 flex justify-center items-center cursor-pointer">
          <div>
            <button
              className="mx-auto max-w-xs text-white"
              type="button"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
