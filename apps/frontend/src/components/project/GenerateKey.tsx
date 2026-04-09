import axios from "axios"
import { useState } from "react"
import { MdContentCopy } from "react-icons/md"
import { RxCross2 } from "react-icons/rx"
const GenerateKey = ({onClose}:{onClose:()=>void}) => {
    const [projectName,setProjectName]=useState("")
    const [apiKey,setApiKey]=useState("")
    const [error,setError]=useState("")
    const [showTick,setShowTick]=useState(false)
    const handleSubmit=async()=>{
  try {
    const token =localStorage.getItem("token")
      const res= await axios.post(`${import.meta.env.VITE_BACKEND_URL}/project/createProject`,{
     name:projectName
      },{
        headers:{
            Authorization:`Bearer ${token}`
        }
      })
     setApiKey(res.data.apiKey)
     setError("")
    
  } catch (error) {
       setError("Please enter the correct credentials")
       setProjectName("")
  }

    }
    const showTickInterval=()=>{
        setTimeout(()=>{
          setShowTick(false)
        },3000)
    }
  return (
    <>
         <div className="fixed top-5 right-82 text-gray-600 text-2xl z-50" onClick={onClose}><RxCross2 /></div>
    <div className=" fixed top-5 right-1 h-screen min-w-[320px] bg-[#151a1c] border rounded-md z-50">
        
            <div className="h-[50%]  w-full flex flex-col items-center justify-center gap-2 ">
                <div className=" flex flex-col gap-2">
                <h3 className="text-gray-100">Enter Your Project Name </h3>
                <div>
                <input type="text" placeholder="Project Name" value={projectName} 
            className="h-6 w-[180px] bg-gray-800 rounded-xs text-gray-100 text-xs p-2 mx-4 "
            onChange={(e)=>{
                setProjectName(e.target.value)
            }} />
              {error!="" &&  (
                <div className="text-red-500 text-xs "> {error}</div>
            )}
                </div>
            
                </div>

            <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white rounded-md w-[70px]">Submit</button>
        </div>
        <div>
                {
            apiKey!="" && (
            <div className="flex flex-col gap-2 items-center ">
                <div className="text-gray-100"> Your Api Key Is</div>
                <div className="flex items-center ">
                    <div className="h-6 w-[180px] bg-gray-800 rounded-xs text-gray-100 text-xs p-2 truncate">{apiKey}</div>
                    {
                        !showTick ? (
                     <div className=" text-gray-100 hover:text-gray-500 rounded-xl " onClick={() => {navigator.clipboard.writeText(apiKey),
                        setShowTick(true),
                        showTickInterval()
                     }}>
                        <MdContentCopy/></div>
                        ): (
                            <div className="text-gray-100 w-6 bg-gray-400 rounded-full flex items-center justify-center">
                                 ✓
                            </div>
                        )
                    }
                
               </div>
            </div>
            )
        }
        </div>

       
     
    
    </div>
    </>
    
  )
}

export default GenerateKey