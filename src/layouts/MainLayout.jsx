import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";


// Those contant which are remains in every page at same place use this function to implement
const MainLayout = () => {
  const {user} = useSelector((state)=>state.auth);   // from redux/store.js
console.log("MainLayout User=>",user);
  return (
    <div>   
    <Outlet/>   
    </div>
  )
}

export default MainLayout