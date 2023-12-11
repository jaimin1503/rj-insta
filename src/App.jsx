import SignIn from "./Forms/SignIn";
import SignUp from "./Forms/SignUp";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import Profile from "./pages/Profile";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </div>
  );
}
export default App;
