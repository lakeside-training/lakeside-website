import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { animateScroll } from "react-scroll"
import { AnimatePresence } from "framer-motion"
// ** Router imports
import { useRoutes } from "react-router-dom"

// ** GetRoutes
import { getRoutes } from "./routes"

const Router = () => {
  let location = useLocation()

  // below this func for scroll to top when navigate new page
  useEffect(() => {
    animateScroll.scrollToTop({
      duration: 0,
      delay: 100,
      smooth: true,
      offset: 50
    })
  }, [location])

  const allRoutes = getRoutes()

  const routes = useRoutes([...allRoutes])

  return <AnimatePresence mode='wait'>{routes}</AnimatePresence>
}

export default Router
