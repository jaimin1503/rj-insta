import React from "react";
import axios from "axios";

export const Home = () => {
  const getuser = () => {
    axios
      .get("http://localhost:5555/user/getuser")
      .then((res) => {
        console.log(res.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <h1>This is home pages</h1>

      <button onClick={getuser}>click</button>
    </div>
  );
};
