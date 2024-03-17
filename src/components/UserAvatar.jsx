import image from "./assets/jatuu.jpg";

export default function UserAvatar({profile}) {
  return (
    <>
      <div className=" flex items-center p-3">
        <div className="image pr-2">
          <img
            className=" w-[44px] h-[44px] object-cover rounded-full"
            src={image}
            alt="image"
          />
        </div>
        <div className="info">
          <p>Jaimin_15</p>
          <p className=" text-sm">Jaimin Viramgama</p>
        </div>
      </div>
    </>
  );
}
