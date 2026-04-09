import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoutes = () => {
  
    const token = localStorage.getItem("token")
//Conditional redirect in JSX use Naviagte and for event use useNaviagte and replace use to replace current  history
  return token?<Outlet/>: <Navigate to="/sign-in" replace />
}

export default ProtectedRoutes