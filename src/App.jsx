import SignIn from "./Forms/SignIn";
import SignUp from "./Forms/SignUp";
import { Route, Routes } from "react-router-dom";
import {Home} from "./pages/Home"
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignIn />}></Route>

        <Route path="/home" element={<Home/>}></Route>


        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
    </div>
  );
}
export default App;
