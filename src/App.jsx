import SignIn from "./Forms/SignIn";
import SignUp from "./Forms/SignUp";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import Profile from "./pages/Profile";
import EditProfile from "./Forms/EditProfile";
import ViewPost from "./components/ViewPost";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/editprofile" element={<EditProfile />}></Route>
        <Route path="/viewpost/:id" element={<ViewPost />}></Route>
      </Routes>
    </div>
  );
}
export default App;
