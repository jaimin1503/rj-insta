import { toast } from "react-hot-toast";
import axios from "axios";
import { getuser } from "../reducers/userReducer";

export function updateDisplayPicture(formData, pId) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      await axios
        .put(`${import.meta.env.VITE_BASE_URL}/user/editProfilePicture/${pId}`, formData, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data.message);
          toast.success("Display Picture Updated Successfully");
          dispatch(getuser(res?.data?.data));
        })
        .catch((error) => {
          console.log("error accure in update display", error);
          toast.error("Could Not Update Display Picture");
        });

      console.log("UPDATE_DISPLAY_PICTURE_API API RESPONSE............");
    } catch (error) {
      console.error("UPDATE_DISPLAY_PICTURE_API API ERROR............", error);
      toast.error("Could Not Update Display Picture");
    } finally {
      toast.dismiss(toastId);
    }
  };
}
