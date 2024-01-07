import axios from "axios";

export const fetchuserdata = async () => {
  const data = axios
    .get(`${import.meta.env.VITE_BASE_URL}/user/getuser`, { withCredentials: true })
    .then((res) => {
      return res.data.user;
    })
    .catch((error) => {
      console.log(error);
    });
  return data;
};
