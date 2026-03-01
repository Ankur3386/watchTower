import axios from "axios"
import { useEffect, useState } from "react"
import type { project } from "../utils/types"

const Dashboard = () => {
  const [project,setProject]= useState<project[]>([])
const token=""
    useEffect(()=>{
      const dashboard=async()=>{
        //@ts-ignore
      const response = await axios.post(`${process.env.Backend_Url}/dashboard`,{},{
        headers:{
          Authorization:`Bearer ${token}`
        }
       })
       setProject(response.data.data)
     
      }
       
        })
  return (
    <div className="w-full h-full bg-gray-900">
    <div className="h-[40%] w-full">

    </div>
    <div className="h-[60%] w-full">
      {
       project &&  project.map((x,id)=>{
         return(
          <div key={id}>{x.projectId }</div>
         )
        })
      }
    </div>
    </div>
  )
}

export default Dashboard