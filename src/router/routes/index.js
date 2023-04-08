// ** React Imports
import { Fragment } from "react"

// ** Route Components
import PublicRoute from "../../security/PublicRoute"
import PrivateRoute from "../../security/PrivateRoute"

// ** import Route Pages
import notAuthPageRoutes from "./notAuthPage"
import dashboradRoutes from "./dashboard"

// ** Layouts
import BlankLayout from "../../layouts/BlankLayout"
import VerticalLayout from "../../layouts/VerticalLayout"

// ** hooks
import { isObjEmpty } from "../../utils"

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />
}
// TODO: Add 404 Page
// [x]: Add Public Routes
// [ ]
// ** Merge Routes
const Routes = [...notAuthPageRoutes, ...dashboradRoutes]

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta }
    } else {
      return {}
    }
  }
}

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = []

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        let RouteTag = PrivateRoute

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false)
          RouteTag = route.meta.publicRoute ? PublicRoute : PrivateRoute
        }

        if (route.element) {
          const Wrapper = Fragment

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          )
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route)
      }
      return LayoutRoutes
    })
  }
  return LayoutRoutes
}

const getRoutes = () => {
  const defaultLayout = "vertical"
  const layouts = ["vertical", "blank"]

  const AllRoutes = []

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout)

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes
    })
  })
  return AllRoutes
}

export { Routes, getRoutes }
