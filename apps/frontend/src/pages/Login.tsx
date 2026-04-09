import {useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const Login = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
 const handleSubmit = async () => {
  try {
    setError("")
    setLoading(true)
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/sign-in`,
      { email, password }
    );
      
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("username", res.data.username);
    navigate("/dashboard");
  } catch (err:any) {
   setError("Please enter correct credentials")
  }finally{
        setLoading(false)
  }
};
  return (
   <div className="w-full h-full bg-[#1f2429] flex items-center justify-center ">
  {/* Content */}
  <div className="w-[70%] md:w-[40%] h-[70%]  bg-white rounded-2xl flex flex-col gap-3">
    
    <div className="h-[18%] w-full flex items-center justify-center">
      <img src="/logo.png" alt="WatchTower" className="h-full object-contain" />
    </div>
    
      <div className="flex justify-center">
      <h2 className="text-3xl">
          Log in to see your data.
      </h2>
      </div>
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="w-[80%]">
          <label htmlFor="Email">Email</label>
          <input type="text"
          value={email}
          placeholder="Enter Email" className="w-full h-10 px-3 rounded-md bg-[#fafafa] border border-transparent shadow-sm focus:outline-none focus:border-gray-300 focus:shadow-md transition-all duration-200"
          onChange={(e)=>{
            setEmail(e.target.value)
          }}/>
          </div>
         <div className="w-[80%]">
          <label htmlFor="Password">Password</label>
          <input type="text"
          value={password}
          placeholder="Password" className="w-full h-10 px-3 rounded-md bg-[#fafafa] border border-transparent shadow-sm focus:outline-none focus:border-gray-300 focus:shadow-md transition-all duration-200 "
           onChange={(e)=>{
            setPassword(e.target.value)
          }}
          />
          </div>
          {
            error!="" && (
            <div className="w-[80%] px-3 rounded-md text-red-500">
            {error}
            </div>
            )
          }
         
          <button className="w-[70%] h-10 px-3 rounded-md  border border-transparent shadow-sm focus:outline-none focus:border-gray-300 focus:shadow-md transition-all duration-200 bg-[#2e3438] text-white cursor-pointer" onClick={
          handleSubmit}> {loading ? (
                  <span className="flex items-center gap-2 justify-center">
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                    Loging In...
                  </span>
                ) : (
                  "Login in"
                )}</button>
        </div>
    </div>
    </div>
  );
};

export default Login;