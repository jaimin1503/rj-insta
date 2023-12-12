import jatuu from "./assets/jatuu.jpg";
import { Link } from "react-router-dom";

const EditProfile = () => {
  return (
    <div className="border border-gray-700 m-5 p-5 pb-10 max-w-lg mx-auto">
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
            <Link to="#">
              <p className=" text-blue-600 cursor-pointer hover:text-blue-700">
                change profile photo
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div className="form_area">
        <form class="max-w-md mx-auto p-6 border border-gray-500 shadow-md rounded-md">
          <div class="mb-4">
            <label for="name" class="block text-gray-700 font-bold mb-2">
              Display name
            </label>
            <input
              id="name"
              class="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:border-blue-500"
              type="text"
            />
          </div>
          <div class="mb-4">
            <label for="bio" class="block text-gray-700 font-bold mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              class="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:border-blue-500"
              rows="4"
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditProfile;
