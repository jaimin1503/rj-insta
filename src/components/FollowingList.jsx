import { Link } from "react-router-dom";

function FollowingList({ following }) {
  return (
    <div>
      <div className="following absolute top-[50%] left-[50%] max-w-xs translate-x-[-50%] translate-y-[-50%] z-10 bg-white rounded-lg shadow-xl">
        <div className=" border-b p-2 row1 flex justify-center items-center">
          <p className="p-2">Following</p>
        </div>
        <div className="list">
          {following?.map((follow) => (
            <div className=" px-5 py-3" key={follow._id}>
              <Link to={`/viewprofile/${follow._id}`}>{follow.username}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default FollowingList;
