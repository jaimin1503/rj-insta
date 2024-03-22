import mongoose from "mongoose";
import { mailSender } from "../utils/mailSender.js";
import { otpTemplate } from "../utils/emailtemplet.js";
const OtpScema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});
const sendVerificationEmail = async (email, otp) => {
  try {
    const mailresponse = await mailSender(
      email,
      "Verification Email",
      otpTemplate(otp)
    );
    console.log("mailresponse is", mailresponse);
    console.log("Email sent successfully: ", mailresponse?.response);
  } catch (error) {
    console.log("error occurred while sending email and error is", error);
    throw error;
  }
};
OtpScema.pre("save", async function (next) {
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});
const OTP = mongoose.model("OTP", OtpScema);
export default OTP;
