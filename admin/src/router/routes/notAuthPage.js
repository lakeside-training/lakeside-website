// ** import pages
import ForgotPassword from "../../pages/ForgotPassword"
import Login from "../../pages/Login"
import ResetPassword from "../../pages/ResetPassword/ResetPassword"
import VerifyOTP from "../../pages/VerifyOTP/VerifyOTP"
// import Signup from "../../pages/Signup"

const notAuthPages = [
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank",
      publicRoute: true
    }
  },
  // {
  //   path: "/signup",
  //   element: <Signup />,
  //   meta: {
  //     layout: "blank",
  //     publicRoute: true
  //   }
  // },
  {
    path: "/forget",
    element: <ForgotPassword />,
    meta: {
      layout: "blank",
      publicRoute: true
    }
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
    meta: {
      layout: "blank",
      publicRoute: true 
    }
  },

  {
    path: "/verify-otp/:token",
    element: <VerifyOTP />,
    meta: {
      layout: "blank",
      publicRoute: true 
    }
  }
]

export default notAuthPages
