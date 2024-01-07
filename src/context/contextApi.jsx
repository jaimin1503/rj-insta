import React, { createContext, useState, useEffect } from "react";
export const Context = createContext();

export const AppContext = (props) => {
  const [loading, setLoading] = useState(false);
  // const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("home");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [likehome,setlikehome]=useState(false)
  const [savedpost,setsavedpost]=useState(false);
  const [story,setstory]=useState({});
  const [isstory, setisstory] = useState(false);

 

  return (
    <Context.Provider
      value={{
        loading,
        setLoading,
        // searchResults,
        selectedCategory,
        setSelectedCategory,
        mobileMenu,
        setMobileMenu,
        likehome,
        setlikehome,
        savedpost,
        setsavedpost,
        setstory,
        story,
        isstory, 
        setisstory
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
