import image from "./assets/jatuu.jpg";

export default function UserAvatar({ profile }) {
  

return (
  <>
    <div className=" flex items-center p-3">
      <div className="image pr-2">
        <img
          className=" w-[44px] h-[44px] object-cover rounded-full"
          src={profile.image}
          alt="image"
        />
      </div>
      <div className="info">
        <p>{profile.username}</p>
        <p className=" text-sm">{profile.name}</p>
      </div>
    </div>
  </>
);
}