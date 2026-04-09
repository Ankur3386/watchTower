import { BrowserRouter, Route, Routes } from "react-router-dom"

import ProtectedRoutes from "./components/ProtectedRoutes.tsx"
import Home from "./pages/Home.tsx"
import Login from "./pages/Login.tsx"
import SignUp from "./pages/SignUp.tsx"
import Dashboard from "./pages/Dashboard.tsx"
import CreateProject from "./pages/CreateProject.tsx"
import ProjectPage from "./pages/ProjectPage.tsx"
import Layout from "./components/Layout.tsx"
import Alert from "./pages/Alert.tsx"
import Profile from "./pages/Profile.tsx"
import Upgrade_Now from "./pages/Upgrade_Now.tsx"
import Inbox from "./pages/Inbox.tsx"
import Local_Setup from "./pages/Local_Setup.tsx"
import ApiKey from "./pages/ApiKey.tsx"

function App() {
  
return(
    <BrowserRouter>
      <Routes>
        {/* public routes  */}
           <Route path="/sign-in" element={<Login/>} />
          <Route path="/sign-up" element={<SignUp/>} />
          <Route path="/" element={<Home/>} />
        {/* Layout wrapper */}
         <Route element={<ProtectedRoutes/>}>

        <Route element={<Layout/>}>
          <Route path="/dashboard" element={<Dashboard/>} />
        
          <Route path="/project" element={<CreateProject/>} />
          <Route path="/alert" element={<Alert/>} />
          <Route path="/getAllApi" element={<ApiKey/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/inbox" element={<Inbox/>} />
          <Route path="/upgrade-now" element={<Upgrade_Now/>} />
          <Route path="/local-setup" element={<Local_Setup/>} />
          <Route path="/project/:projectName/:projectId" element={<ProjectPage/>} />
         

        </Route>
         </Route>
       

      </Routes>
    </BrowserRouter>
)
}

export default App
