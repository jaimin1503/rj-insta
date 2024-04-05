import axios from "axios";
import Search from "./assets/Search";
import instaLogo from "./assets/writtenlogo.jpg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import logo from "./assets/logoff.svg";

const NavbarSs = () => {
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
    <div className=" sm:hidden">
      <div className="nav flex justify-between items-center">
        <div className="logo">
          <img className=" h-[30px] m-3" src={logo} alt="Instagram" />
        </div>
        <div className="search">
          <div className=" fixed ml-6 mt-4  m-3">
            <Search />
          </div>
          <input
            type="text"
            className=" p-2 pl-10 m-2 mx-4 bg-gray-100 rounded-xl outline-none"
            placeholder="Search..."
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
        {/* {loading && <Spinner />} */}
        {inputValue && (
          <div className="fixed bg-gray-100 m-10 w-[50%] rounded-xl top-[5%] right-0">
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
        )}
      </div>
    </div>
  );
};
export default NavbarSs;
