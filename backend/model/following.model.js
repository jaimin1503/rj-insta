import mongoose from "mongoose";
const followingSchema = new mongoose.Schema({
  following: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
const Following = mongoose.model("Following", followingSchema);
export default Following;
