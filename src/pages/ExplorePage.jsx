import { useSelector } from "react-redux"
import Leftnav from "../components/leftnav"
const ExplorePage = () => {
  const {user}=useSelector((state)=>state.user)
  return (
    <div className=" h-screen flex overflow-hidden">
    <div className="hidden sm:block">
       {" "}
       <Leftnav user={user} />
     </div>
     <h1>This is ExplorePage </h1>
   </div>
  )
}
export default ExplorePage