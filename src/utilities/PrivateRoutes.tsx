import { Outlet, Navigate, useLocation } from "react-router-dom"
import { useAppSelector } from "../app/hooks.js"

const PrivateRoutes = () => {
  const location = useLocation()
  const auth = useAppSelector((state) => state.auth.currentUser)

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" state={location.pathname} />
  )
}

export default PrivateRoutes
