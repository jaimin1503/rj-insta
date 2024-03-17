import SignIn from "./Forms/SignIn";
import SignUp from "./Forms/SignUp";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import Profile from "./pages/Profile";
import EditProfile from "./Forms/EditProfile";
import ViewProfile from "./pages/ViewProfile";
import ExplorePage from "./pages/ExplorePage";
import ChatPage from "./pages/ChatPage";
import VideoPage from "./pages/VideoPage";
import { AppContext } from "./context/contextApi";
import CreatePost from "./components/createpost/CreatePost";
import ViewStory from "./components/story/ViewStory";
import { StoryCreate } from "./components/createpost/Storycreate";
import VerifyEmail from "./Forms/VerifyEmail"
function App() {
  return (
    <AppContext>
      <div>
        <Routes>
          <Route path="/" element={<SignIn />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/explore" element={<ExplorePage />}></Route>
          <Route path="/chat" element={<ChatPage />}></Route>
          <Route path="/video" element={<VideoPage />}></Route>
          <Route path="/createpost" element={<CreatePost />}></Route>
          <Route path="/editprofile/:id" element={<EditProfile />}></Route>
          <Route path="/viewprofile/:id" element={<ViewProfile />}></Route>
          <Route path="/viewstory/:id" element={<ViewStory />}></Route>
          <Route path="/storycreate" element={<StoryCreate />}></Route>
          <Route path="/verify-email" element={<VerifyEmail />}></Route>
        </Routes>
      </div>
    </AppContext>
  );
}
export default App;
