import { CgProfile } from "react-icons/cg"
import { GrUpgrade } from "react-icons/gr"
import { IoAlertCircleOutline, IoSettingsOutline } from "react-icons/io5"
import { MdOutlineDashboardCustomize } from "react-icons/md"
import { PiSignOutBold } from "react-icons/pi"
import { RiProjectorLine } from "react-icons/ri"

const userNavigation = () => {
  const info=["Profile","Dashboard","Project","Upgrade Now","Alert","Setting","Sign out"]
  const infoIcon=[<CgProfile />,<MdOutlineDashboardCustomize/>,<RiProjectorLine/>,<GrUpgrade />,<IoAlertCircleOutline/>,<IoSettingsOutline/>,<PiSignOutBold/>]
  const username=localStorage.getItem("username");
  return (
    <div>
      <div>
       {username}
      </div>
    <div>
      {
        info.map((item,id)=>(
          <div>
             <div> {infoIcon[id]} </div>
            <div> {item} </div>
          </div>
        ))
      }
    </div>
    </div>
  )
}

export default userNavigation