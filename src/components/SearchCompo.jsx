import { Search, Close } from "@mui/icons-material";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { IonItem, IonSpinner } from "@ionic/react";

const SearchCompo = () => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch all users once when the component mounts
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/user/getalluser`, {
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
  }, []); // This runs only once on component mount

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
    <>
      {/* {loading && <Spinner />} */}
      <div className="container absolute top-[50%] left-[50%] w-full h-full translate-x-[-50%] translate-y-[-50%] bg-gray-50 ">
        <div className="h1 text-2xl p-5 font-semibold">Search</div>
        <div className=" flex flex-col">
          <input
            type="text"
            className="w-full rounded-lg p-2 outline-none absolute pl-10 bg-gray-100 my-2"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type to Search..."
          />
          <div className="flex justify-between">
            <div className="relative p-2 cursor-pointer w-[25px] h-[25px] my-2">
              <Search />
            </div>
            {!loading && (
              <div
                onClick={() => setInputValue("")}
                className="relative p-2 cursor-pointer float-right text-gray-500 my-2"
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
            <Link to={`/viewprofile/${user._id}`}>
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
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};
export default SearchCompo;
