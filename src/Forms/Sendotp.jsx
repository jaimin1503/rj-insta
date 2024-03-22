import axios from "axios"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
export function sendOtp(email,navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      
      try {
        console.log("inside sendotp function")
        axios
          .post(`${import.meta.env.VITE_BASE_URL}/user/sendotp`, {email}, {
            withCredentials: true,
          })
          .then((res) => {
            console.log("SENDOTP API RESPONSE............", res)
          })
          .catch((error) => {
            alert("Error occurred");
            console.log(error);
          });
       
  
        toast.success("OTP Sent Successfully")
        navigate("/verify-email")
      } catch (error) {
        console.log("SENDOTP API ERROR............", error)
        toast.error("Could Not Send OTP")
      }
      toast.dismiss(toastId)
    }
  }
export function signUp(data,navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      try {
        axios
          .post(`${import.meta.env.VITE_BASE_URL}/user/signup`, data, {
            withCredentials: true,
          })
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            alert("Error occurred");
            console.log(error);
          });
  
        
        toast.success("Signup Successful")
        // navigate("/login")
      } catch (error) {
        console.log("SIGNUP API ERROR............", error)
        toast.error("Signup Failed")
        navigate("/signup")
      }
      toast.dismiss(toastId)
    }
  }
  