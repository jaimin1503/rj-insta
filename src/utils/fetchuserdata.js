import axios from "axios";
export const fetchuserdata=async()=>{
 
        const data=axios
          .get("http://localhost:5555/user/getuser", { withCredentials: true })
          .then((res) => {
            return  res.data.user;
          })
          .catch((error) => {
            console.log(error);
          });
          return data
  
}