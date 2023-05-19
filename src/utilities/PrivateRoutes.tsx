import { Outlet, Navigate } from "react-router-dom"
import { useAppSelector } from "../app/hooks.js"

const PrivateRoutes = () => {
  const auth = useAppSelector((state) => state.auth.userSignedIn)
  return auth ? <Outlet /> : <Navigate to="/sign-in" />
}

export default PrivateRoutes
