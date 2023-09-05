import { useEffect } from "react"
import { useAppDispatch } from "./app/hooks.js"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase/init"
import { setCurrentUser } from "./features/auth/authSlice"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PrivateRoutes from "./utilities/PrivateRoutes"
import Home from "./pages/Home"
import UpdateProfile from "./pages/UpdateProfile"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import ForgotPassword from "./pages/ForgotPassword"
import Lists from "./pages/Lists"
import AOS from "aos"
import "aos/dist/aos.css"

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setCurrentUser(user))
    })

    return unsubscribe
  }, [])

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/lists" element={<Lists />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  )
}

export default App
