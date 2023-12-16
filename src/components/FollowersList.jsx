import axios from "axios";
import { useEffect, useState } from "react";

function FollowersList({ userId }) {
  const [followers, setFollowers] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5555/user/getuserbyid/${userId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setFollowers(res.data.user.profile.followers);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  return (
    <div>
      <div className="following absolute top-[50%] left-[50%] max-w-xs translate-x-[-50%] translate-y-[-50%] z-10 bg-white rounded-lg shadow-xl">
        <div className=" border-b p-2 row1 flex justify-center items-center">
          <p className="p-2">Followers</p>
        </div>
        <div className="list">
          {followers.map((follower) => (
            <div className=" px-5 py-3" key={follower}>
              {follower}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default FollowersList;
