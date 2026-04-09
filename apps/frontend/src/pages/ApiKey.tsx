import axios from "axios";
import { useEffect, useState } from "react"
import { MdContentCopy } from "react-icons/md";
 type key={
  apiKey:string,
  name:string
}
const ApiKey = () => {

const [allKeys,setAllKeys]=useState<key[]>([]);
const [error,setError]=useState("");
 const [showTick,setShowTick]=useState(-1)
const token= localStorage.getItem("token")
   const showTickInterval=()=>{
        setTimeout(()=>{
          setShowTick(-1)
        },3000)
    }
  useEffect(()=>{
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api-key`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
     }).then(res=>setAllKeys(res.data)).catch(err=>setError(err.message))
     },[token])
console.log(allKeys)
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-[#111217] min-w-[90%] min-h-[90%] rounded-lg  ">
       <div>
        <h1 className="text-white text-3xl ">API Keys</h1>
        <p className="text-white "
        style={{marginTop:"5px"}}>Manage your project api keys</p>
       </div>
       <div className="w-[80%] text-white flex gap-4 border border-gray-500 bg-[#191b1f] rounded-md h-9"
       style={{marginTop:"70px"
       }}>
                <div className="w-[15%] flex items-center">Sno.</div>
                <div className=" w-[30%] truncate flex items-center">Name</div>
                <div className=" w-[60%] truncate flex items-center"> Key</div>
       </div>
  { allKeys!=null &&
       allKeys.map((item,id)=>(
        <div key={id} className="w-[80%] text-white flex gap-2 border border-gray-500 rounded-md bg-[#191b1f] h-9">
                <div className="w-[15%] flex items-center">{id+1}</div>
                <div className=" w-[30%] truncate flex items-center">{item.name|| "Unamed"}</div>
                <div className=" w-[60%]  flex items-center">
                <div className="truncate" >{item.apiKey}</div>
                 { showTick==id ? (
                            <div className="text-gray-100 w-8 bg-gray-400 rounded-full flex items-center justify-center">
                                 ✓
                            </div>
                        ):(
                     <div className=" text-gray-100 hover:text-gray-500 rounded-xl " onClick={() => {navigator.clipboard.writeText(item.apiKey),
                        setShowTick(id),
                        showTickInterval()
                     }}>
                        <MdContentCopy/></div>
                        )
                    }
                </div>

        </div>
       ))
       }
      
     
      </div>
    </div>
  )
}

export default ApiKey