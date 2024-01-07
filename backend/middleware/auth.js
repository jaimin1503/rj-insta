import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const auth = (req, res, next) => {
  try {
    const token =
      req.body.token || req.cookies.token || (req.headers['authorization'] && req.headers['authorization'].split(" ")[1]);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (e) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      success: false,
      message: "Something went wrong while verifying the token",
    });
  }
};
