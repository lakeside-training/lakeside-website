// ** React Imports
import { Navigate } from "react-router-dom"
import { Suspense } from "react"
import { useSelector } from "react-redux"


const PrivateRoute = ({ children, route }) => {
  const { auth } = useSelector((state) => state.auth) 
    if (!auth) return <Navigate to="/login" />
  

  return <Suspense fallback={null}>{children}</Suspense>
}

export default PrivateRoute
