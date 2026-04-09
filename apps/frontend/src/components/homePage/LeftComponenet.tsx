import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router"

const words = ["THINKS", "LEARNS", "ADAPTS"];
const LeftComponent = () => {
    const navigate=useNavigate()
    const [index, setIndex] = useState(0);
      useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-[65%] h-full bg-[#f2f1e6] flex items-center">
          <div className="fixed top-0 left-2 ">
            <img className="w-[240px] h-[150px]" src="/logo.png" alt="logo" />
        </div>
      <div style={{ marginLeft: '28px' }} className="flex flex-col gap-5">
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold">OBSERVABILITY</h1>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold">THAT&nbsp;   
            <AnimatePresence mode="wait">
              <motion.span
                key={words[index]}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.3 }}
              >
                {words[index]}
              </motion.span>
            </AnimatePresence></h1>
        </div>
        <div>
          <div className="text-2xl font-bold">Intelligent Observability resolves issues at</div>
          <div className="text-2xl font-bold">scale----before they impact your bottom line.</div>
        </div>
        <div>
          <button className="bg-black text-[#f2f1e6] rounded-3xl w-48 h-12 cursor-pointer"onClick={()=>{
            navigate('/sign-up')
          }}>Get Started Free</button>
        </div>
      </div>
    </div>
  )
}

export default LeftComponent