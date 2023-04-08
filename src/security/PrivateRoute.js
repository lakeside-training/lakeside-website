import { Suspense, useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

// ** import spinner
import SpinnerComponent from "../components/spinner/Spinner"

// ** import axios
import axios from "../axios"

// ** import redux
import { useSelector, useDispatch } from "react-redux"
import { login } from "../redux/slices/auth"

const PrivateRoute = ({ children, route }) => {
  // ** Hooks & Vars

  const navigate = useNavigate()
  const userToken = localStorage.getItem("userToken")

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const getUser = async () => {
    try {
      if (userToken) {
        const { data } = await axios.get("/admin/getUser", {
          headers: { authorization: userToken }
        })

        if (!data.success) {
          navigate("/login")
          return
        }
        setIsAuthenticated(true)
        dispatch(login(data?.data[0]))
      }
    } catch (error) {
      console.error(error)
      navigate("/login")
    }
  }

  // ** check user token is here or not
  useEffect(() => {
    if (userToken) getUser()
  }, [])

  useEffect(() => {
    if (userToken && user) {
      setIsAuthenticated(true)
    }
  }, [user])

  if (route) {
    // let action = null
    // let resource = null
    let restrictedRoute = false

    if (route.meta) {
      // action = route.meta.action
      // resource = route.meta.resource
      restrictedRoute = route.meta.restricted
    }

    if (!userToken) return <Navigate to="/login" />

    if (!isAuthenticated) {
      return (
        <Suspense>
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <SpinnerComponent />
          </div>
        </Suspense>
      )
    }

    if (!user) return <Navigate to="/login" />
    if (userToken && user && restrictedRoute) return <Navigate to="/" />
    if (user && restrictedRoute && user.role !== 1) return <Navigate to="/" />
    // if (user && !ability.can(action || "read", resource)) {
    //   return <Navigate to="/misc/not-authorized" replace />
    // }
  }

  return <Suspense fallback={null}>{children}</Suspense>
}

export default PrivateRoute
