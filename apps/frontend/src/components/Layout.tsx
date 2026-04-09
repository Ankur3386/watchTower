
import { Outlet } from "react-router-dom"
import Navbar from "../pages/Navbar"



const Layout = () => {
  return (
<div className="flex h-screen w-screen bg-[#0e1212] p-4 gap-4">
  <Navbar/>

  <div className="flex-1 overflow-y-auto">
    <Outlet />
  </div>
</div>
  )
}

export default Layout