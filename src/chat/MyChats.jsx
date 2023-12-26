import photo from "../components/assets/jatuu.jpg";

const MyChats = () => {
  return (
    <div>
      <div className="box w-[225px] h-[90vh] bg-gray-100 mx-5 rounded-xl">
        <div className="Chats flex items-center p-5">
          <img
            className=" h-[36px] w-[36px] rounded-full object-cover"
            src={photo}
            alt=""
          />
          <div className="inf px-2">
            <p className=" text-sm leading-3">Jaimin_15.3</p>
            <p className=" text-xs text-gray-400">Jaimin_</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyChats;
