import { Search, Close } from "@mui/icons-material";
import { useState } from "react";
import { useSelector } from "react-redux";

const SearchCompo = () => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { user } = useSelector((state) => state.user);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    const usernames = [
      "Ashish007",
      "ranjeet_61",
      "jaimin_15.3",
      "chirag__25.10",
      "hardik_18",
      "daxil_10",
      "jatu_31",
    ];

    const filteredSuggestions = usernames.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  return (
    <div className="container absolute top-[50%] left-[50%] w-full h-full translate-x-[-50%] translate-y-[-50%] bg-gray-200 ">
      <input
        type="text"
        className=" w-full rounded-lg p-2 outline-none absolute pl-10"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <div className=" flex justify-between">
        <div className=" relative p-2 cursor-pointer w-[25px] h-[25px]">
          <Search />
        </div>
        <div
          onClick={() => setInputValue("")}
          className=" relative p-2 cursor-pointer float-right text-gray-500"
        >
          <Close />
        </div>
      </div>
      <ul className=" mt-5">
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </div>
  );
};
export default SearchCompo;
