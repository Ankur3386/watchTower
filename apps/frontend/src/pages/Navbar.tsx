import { CgProfile } from "react-icons/cg"
import { GrUpgrade } from "react-icons/gr"
import { IoAlertCircleOutline } from "react-icons/io5"
import { MdOutlineDashboardCustomize, MdOutlineForwardToInbox, MdOutlineWifiProtectedSetup } from "react-icons/md"
import { RiProjectorLine } from "react-icons/ri"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const navigate=useNavigate()
  const components=["Dashboard","Alert","Project","Local Setup","Inbox"]
  const profileComponent=["Upgrade Now","Profile"]
  const componentSign=[<MdOutlineDashboardCustomize/>,<IoAlertCircleOutline/>,<RiProjectorLine/>,<MdOutlineWifiProtectedSetup/>,<MdOutlineForwardToInbox/>]
  const profileComponentSign=[<GrUpgrade />,<CgProfile />]
    
  return (
    <div className="h-full min-w-[150px] max-w-[170px] shrink-0 bg-[#141a1c] flex flex-col ">
        <div className=" ">
            <img className="" src="/logo.png" alt="logo" />
        </div>
  <div className="flex flex-col justify-between h-full m-3">
       <div className="flex flex-col gap-4  mt-4">
  {
    components.map((item, id) => (
      <div key={id} className="flex  gap-2 px-3 py-2  items-center ">
        <div className="w-7 h-7 flex items-center justify-center text-xl text-gray-400  ">
              {componentSign[id]}
            </div>
        <div className="text-white text-sm cursor-pointer" onClick={()=>{
          const path=item.toLowerCase().replace(/\s+/g,"-")
          navigate(`${path}`)
        }}>
          {item}
        </div>
      </div>
    ))
  }
       </div> 

       {/*Separator */}
       <div>
<div className="w-full h-0.5 bg-gray-600"></div>
       <div className="flex flex-col gap-4 ">
  {
    profileComponent.map((item, id) => (
      <div key={id} className="flex  gap-2 px-3 py-2  items-center " >
        <div className="w-7 h-7 flex items-center justify-center text-xl text-gray-400 ">
              {profileComponentSign[id]}
            </div>
        <div className="text-white text-sm cursor-pointer" onClick={() => {
    const path = item.toLowerCase().replace(/\s+/g, "-");
    navigate(`/${path}`);
    
  }}>
          {item}
        </div>
      </div>
    ))
  }
       </div>
       </div>
        </div>
    </div>
  )
}

export default Navbar