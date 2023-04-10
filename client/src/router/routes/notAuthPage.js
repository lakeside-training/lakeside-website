// ** import pages
import AboutUs from "../../pages/AboutUs"
import LandingPage from "../../pages/LandingPage"
import Login from "../../pages/Login"
import Signup from "../../pages/Signup"
import Contact from "../../pages/Contact"
import Steps from "../../pages/Steps"
import CoursesPage from "../../pages/CoursesPage"
import LabsPage from "../../pages/labsPage/LabsPage"
import Corporate from "../../pages/Corporate"
import Laps from '../../pages/Laps'
import Policy from "../../pages/Policy"
// import Forget from '../../pages/Forget'
import PasswordChange from "../../components/passwordChange"
import PrivacyPolicy from "../../pages/PrivacyPolicy"
import CookiePolicy from "../../pages/CookiePolicy"
import Refund from "../../pages/Refund"
import CopyRight from "../../pages/Copyright"
import Forgot from '../../pages/ForgotPassword'

const notAuthPages = [
  {
    path: "/",
    element: <LandingPage />,
    meta: {
      publicRoute: true
    }
  },
  {
    path: "/password-change",
    element: <PasswordChange />,
    meta: {
      publicRoute: true,
      isNotNavbar: true,
			isNotFooter: true,
    }
  },
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
    path: "/about-us",
    element: <AboutUs />,
    meta: {
      publicRoute: true
    }
  },
  {
    path: "/contact-us",
    element: <Contact />,
    meta: {
      publicRoute: true
    }
  },
  {
    path: "/steps",
    element: <Steps />,
    meta: {
      layout: "blank",
      publicRoute: true
    }
  },
  {
    path: "/courses",
    element: <CoursesPage />,
    meta: {
      publicRoute: true
    }
  },
  {
    path: "/labPage",
    element: <LabsPage />,
    meta: {
      publicRoute: true
    }
  },
  {
    path: "/corporate",
    element: <Corporate />,
    meta: {
      publicRoute: true
    }
  },
  {
    path: "/laps",
    element: <Laps />,
    meta: {
      publicRoute: true
    }
  },
  {
    path: "/policy",
    element: <Policy />,
    meta: {
      publicRoute: true
    }
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
    meta: {
      publicRoute: true
    }
  },
  {
    path: "/cookie-policy",
    element: <CookiePolicy />,
    meta: {
      publicRoute: true
    }
  },
  {
    path: "/refund",
    element: <Refund />,
    meta: {
      publicRoute: true
    }
  },
  {
    path: "/copy_right",
    element: <CopyRight />,
    meta: {
      publicRoute: true
    }
  },

  {
    path: "/forgot",
    element: <Forgot />,
    meta: {
      layout: "blank",
      publicRoute: true
    }
  },
]

export default notAuthPages
