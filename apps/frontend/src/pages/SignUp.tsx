import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const SignUp = () => {
const [name,setName]=useState("")
const [username,setUsername]=useState("")
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const [error,setError]=useState("")
const [loading, setLoading] = useState(false)
const navigate=useNavigate()
const handleSubmit=async()=>{

   setLoading(true)
    setError("")
try {
   await axios.post(`${import.meta.env.VITE_BACKEND_URL}/sign-up`,{
    name,
    username,
    email,
    password
   })
   setName("")
   setUsername("")
   setEmail("")
   setPassword("")
   navigate('/sign-in')
} catch (error) {
  setError("Please enter correct credentials")
} finally {
    setLoading(false)
  }

}
  return (
   <div className="fixed inset-0">
  
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: "url('/signUp-background.jpg')" }}
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-amber-50/20 backdrop-blur-sm" />

  {/* Content */}
  <div className="relative z-10 w-full h-full flex flex-col">
    
    <header className="h-[18%] w-full flex items-center justify-center">
      <img src="/logo.png" alt="WatchTower" className="h-full object-contain" />
    </header>

    <main className="flex-1 flex  justify-center">
      <div className="w-[65%] min-h-[500px] md:w-[35%] bg-[#f2f1e6]/90 backdrop-blur-md rounded-3xl p-6 pt-12 flex flex-col gap-5">
        
        <div className="  flex gap-3 md:flex-col items-start justify-center  "
        style={{marginLeft:"10px"}}>
          <h1 className="text-4xl md:text-6xl font-medium text-black text-center">
            Create your </h1>
       <h1 className=" text-4xl md:text-6xl font-medium text-black text-center">
  <span className="relative inline-block">
  free

  <svg
    className="absolute top-1/2 left-1/2 w-[120%] h-[130%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    viewBox="0 0 160 100"
    fill="none"
    preserveAspectRatio="none"
  >
    <path
      d="M18,52 
         C10,10 150,15 135,50 
         C155,90 20,92 18,52 Z"
      stroke="#22c55e"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22,50 
         C12,8 148,20 130,48 
         C150,88 25,90 22,50 Z"
      stroke="#22c55e"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.8"
    />
  </svg>
</span>{" "}
  account.
</h1>
        </div>
        

<div className="w-[90%] ">
  <div className="flex items-center gap-2"
  style={{marginLeft:"10px"}}>

    <span className="text-green-500 text-lg">✓</span>
    <span>No credit card required</span>
  </div>

  <div className="flex items-center gap-2"
  style={{marginLeft:"10px"}}>
    <span className="text-green-500 text-lg">✓</span>
    <span>Project observability made better</span>
  </div>
  <div className="flex items-center gap-2"
  style={{marginLeft:"10px"}}>
    <span className="text-green-500 text-lg">✓</span>
    <span>Get Realtime Alert </span>
  </div>
</div>

          {/* Form */}
          <div className="flex flex-col items-center gap-4">
            <input
              placeholder=" Name"
              value={name}
              className="w-[90%] h-10 px-3 rounded-md bg-[#fcfbf0] border border-transparent shadow-sm focus:outline-none focus:border-gray-300 focus:shadow-md transition-all duration-200 "
              onChange={(e)=>{
                setName(e.target.value)
              }}
            />
            <input
              placeholder=" Username"
              value={username}
              className="w-[90%] h-10 px-3 rounded-md bg-[#fcfbf0] border border-transparent shadow-sm focus:outline-none focus:border-gray-300 focus:shadow-md transition-all duration-200"
                onChange={(e)=>{
                setUsername(e.target.value)
              }}
            />
            <input
              placeholder=" Email"
              className="w-[90%] h-10 px-3 rounded-md bg-[#fcfbf0] border border-transparent shadow-sm focus:outline-none focus:border-gray-300 focus:shadow-md transition-all duration-200"
                value={email} 
              onChange={(e)=>{
                setEmail(e.target.value)
              }}
             />
            <input
              placeholder=" Password"
                value={password}
              className="w-[90%] h-10 px-3 rounded-md bg-[#fcfbf0] border border-transparent shadow-sm focus:outline-none focus:border-gray-300 focus:shadow-md transition-all duration-200"
                 onChange={(e)=>{
                setPassword(e.target.value)
              }}
             />
             {
              error!="" && (
                <div className="w-[90%] h-7 px-3 text-red-500">{error}</div>
              )
             }
            <button className="w-[85%] h-9 rounded-lg bg-green-400 hover:bg-green-500 cursor-pointer transition"
            onClick={
              handleSubmit
            }>
             {loading ? (
                  <span className="flex items-center gap-2 justify-center">
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                    Creating account...
                  </span>
                ) : (
                  "Get Started Free"
                )}
            </button>
          </div>

          {/* Footer Text */}
          <div className="text-gray-400 text-sm text-center mt-auto">
            <p>
              By signing up you're agreeing to{" "}
              <span className="underline cursor-pointer">Terms of Service</span>{" "}
              and{" "}
              <span className="underline cursor-pointer">Privacy Notice</span>
            </p>

            <p className="mt-2">
              Already have an account?{" "}
              <span className="underline cursor-pointer">Log in</span>
            </p>
          </div>

        </div>
      </main>

    </div>
    </div>
  );
};

export default SignUp;