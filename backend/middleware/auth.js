import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
export const auth = (req, res, next) => {
  try {
    const token = req.body.token || req.cookie.token;
    console.log("inside auth and token is", token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token missing",
      });
    }

    // verify the token
    try {
        const token = req.body.token||req.cookies.token;
        console.log("inside auth and token is",token);
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "token missing"
            })
        }

      console.log(decode);

      req.user = decode;
    } catch (e) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      success: false,
      message: "Something went wrong while verifying token",
    });
  }
};
