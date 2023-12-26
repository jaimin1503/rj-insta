import { useState, useEffect } from "react";
import axios from "axios";
import { IonItem, IonSpinner } from "@ionic/react";
import Search from "../components/assets/Search";
import { Close } from "@mui/icons-material";

const ChatSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/user/getalluser`, {
        withCredentials: true,
      })
      .then((res) => {
        setUsers(res.data.alluser);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // Filter users locally instead of making an API call on each change
    const filteredUsers = users.filter(
      (user) =>
        value && user.username.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredUsers);
  };
  return (
    <div>
      <div className="header px-5 border-r">
        <div className="search">
          <div className=" flex flex-col">
            <input
              type="text"
              className=" rounded-lg p-2 outline-none absolute pl-10 bg-gray-100 my-2"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type to Search..."
            />
            <div className=" flex justify-between w-[225px]">
              <div className="relative p-2 cursor-pointer w-[25px] h-[25px] my-2">
                <Search />
              </div>
              {!loading && (
                <div
                  onClick={() => setInputValue("")}
                  className="relative p-2 cursor-pointer float-right text-gray-500 my-[6px]"
                >
                  <Close />
                </div>
              )}
              {loading && (
                <div className="p-2">
                  <IonItem>
                    <IonSpinner name="lines-sharp-small"></IonSpinner>
                  </IonItem>
                </div>
              )}
            </div>
          </div>
          <ul className="mt-2 mx-5">
            {suggestions.map((user) => (
              <div key={user._id} className=" py-2">
                <div className=" flex items-center">
                  <div className="profile_pic">
                    <img
                      className=" h-[36px] w-[36px] object-cover rounded-full mx-2"
                      src={user?.profile?.profilephoto}
                      alt="profilepic"
                    />
                  </div>
                  <div className="userinfo">
                    <p className="">{user?.username}</p>
                    <p className=" text-gray-400 text-xs">
                      {user?.profile?.profilename}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default ChatSearch;
